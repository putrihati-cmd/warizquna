import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateApiKey } from "@/lib/api-auth";
import { auditLog } from "@/lib/audit";
import { parseBody } from "@/lib/request";
import {
  SUPPORTED_EVENTS,
  createWebhook,
  listWebhooks,
  rowToJson,
  validateWebhookUrl,
  type WebhookEvent,
} from "@/lib/webhooks";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const Schema = z.object({
  label: z.string().min(1).max(60),
  url: z.string().url().max(500),
  events: z.array(z.enum(SUPPORTED_EVENTS)).min(1).max(20),
});

export async function GET(req: Request) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status, headers: auth.rateLimitHeaders });
  }
  const rows = listWebhooks(auth.key.user_id).map(rowToJson);
  return NextResponse.json({ webhooks: rows }, { headers: auth.rateLimitHeaders });
}

export async function POST(req: Request) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status, headers: auth.rateLimitHeaders });
  }

  const parsed = await parseBody(req, Schema);
  if (!parsed.success) return parsed.response;

  const isValidUrl = await validateWebhookUrl(parsed.data.url);
  if (!isValidUrl) {
    return NextResponse.json({ error: "Invalid webhook URL or host not allowed" }, { status: 400 });
  }

  const result = createWebhook({
    userId: auth.key.user_id,
    label: parsed.data.label,
    url: parsed.data.url,
    events: parsed.data.events as WebhookEvent[],
  });

  auditLog({
    user_id: auth.key.user_id,
    api_key_id: auth.key.id,
    action: "webhooks.create",
    target: parsed.data.url,
    status: "ok",
  });
  return NextResponse.json(
    { ok: true, id: result.id, secret: result.secret },
    { status: 201, headers: auth.rateLimitHeaders }
  );
}