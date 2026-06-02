import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { createApiKey, listApiKeys, revokeApiKey } from "@/lib/api-keys";
import { rateLimit, clientIpFromRequest } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CreateSchema = z.object({ label: z.string().min(1).max(40) });

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const keys = listApiKeys(session.uid).map((k) => ({
    id: k.id,
    label: k.label,
    prefix: k.key_prefix,
    last_used_at: k.last_used_at,
    created_at: k.created_at,
  }));
  return NextResponse.json({ keys });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const ip = clientIpFromRequest(req);
  const rl = rateLimit({ key: `apikey-create:${session.uid}:${ip}`, capacity: 5, refillPerSecond: 0.05 });
  if (!rl.ok) return NextResponse.json({ error: "Rate limited" }, { status: 429 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid label" }, { status: 400 });
  const k = createApiKey(session.uid, parsed.data.label);
  return NextResponse.json({ ok: true, key: k.plaintext, id: k.id, label: k.label, prefix: k.prefix });
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const idStr = url.searchParams.get("id");
  if (!idStr) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const id = Number(idStr);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  const r = revokeApiKey(session.uid, id);
  return NextResponse.json({ ok: r.changes > 0 });
}