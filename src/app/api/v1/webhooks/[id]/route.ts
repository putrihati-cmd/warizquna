import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateApiKey } from "@/lib/api-auth";
import { auditLog } from "@/lib/audit";
import {
  SUPPORTED_EVENTS,
  deleteWebhook,
  listWebhooks,
  rotateSecret,
  rowToJson,
  updateWebhook,
  type WebhookEvent,
} from "@/lib/webhooks";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function readId(p: { id: string }) {
  const id = Number(p.id);
  if (!Number.isFinite(id)) return null;
  return id;
}

function getOwned(userId: number, id: number) {
  return listWebhooks(userId).find((w) => w.id === id);
}

const PatchSchema = z.object({
  label: z.string().min(1).max(60).optional(),
  url: z.string().url().max(500).optional(),
  events: z.array(z.enum(SUPPORTED_EVENTS)).min(1).max(20).optional(),
  enabled: z.boolean().optional(),
});

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = authenticateApiKey(req);
  if (!auth.ok)
    return NextResponse.json({ error: auth.error }, { status: auth.status, headers: auth.rateLimitHeaders });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  const row = getOwned(auth.key.user_id, id);
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ webhook: rowToJson(row) }, { headers: auth.rateLimitHeaders });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = authenticateApiKey(req);
  if (!auth.ok)
    return NextResponse.json({ error: auth.error }, { status: auth.status, headers: auth.rateLimitHeaders });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = PatchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  }
  const r = updateWebhook({
    userId: auth.key.user_id,
    id,
    label: parsed.data.label,
    url: parsed.data.url,
    events: parsed.data.events as WebhookEvent[] | undefined,
    enabled: parsed.data.enabled,
  });
  if (r.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  auditLog({
    user_id: auth.key.user_id,
    api_key_id: auth.key.id,
    action: "webhooks.update",
    target: String(id),
    status: "ok",
  });
  const row = getOwned(auth.key.user_id, id);
  return NextResponse.json({ ok: true, webhook: row ? rowToJson(row) : null }, { headers: auth.rateLimitHeaders });
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = authenticateApiKey(req);
  if (!auth.ok)
    return NextResponse.json({ error: auth.error }, { status: auth.status, headers: auth.rateLimitHeaders });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  const r = deleteWebhook(auth.key.user_id, id);
  if (r.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  auditLog({
    user_id: auth.key.user_id,
    api_key_id: auth.key.id,
    action: "webhooks.delete",
    target: String(id),
    status: "ok",
  });
  return NextResponse.json({ ok: true }, { headers: auth.rateLimitHeaders });
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  // Rotate secret
  const auth = authenticateApiKey(req);
  if (!auth.ok)
    return NextResponse.json({ error: auth.error }, { status: auth.status, headers: auth.rateLimitHeaders });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  if (action !== "rotate-secret") {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
  const secret = rotateSecret(auth.key.user_id, id);
  if (!secret) return NextResponse.json({ error: "Not found" }, { status: 404 });
  auditLog({
    user_id: auth.key.user_id,
    api_key_id: auth.key.id,
    action: "webhooks.rotate_secret",
    target: String(id),
    status: "ok",
  });
  return NextResponse.json({ ok: true, secret }, { headers: auth.rateLimitHeaders });
}