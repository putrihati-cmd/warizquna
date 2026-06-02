import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "node:crypto";
import { authenticateApiKey } from "@/lib/api-auth";
import { auditLog } from "@/lib/audit";
import { getDb } from "@/lib/db";
import { PLAN_LIMITS } from "@/data/plans";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const cleanPhone = (val: unknown) => {
  if (typeof val !== "string") return val;
  let cleaned = val.replace(/[^0-9+]/g, "");
  if (cleaned.startsWith("+")) cleaned = cleaned.slice(1);
  if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
  return cleaned;
};

const TextMessage = z.object({
  to: z.preprocess(cleanPhone, z.string().regex(/^[0-9]{8,18}$/, "to must be 8-18 digits")),
  type: z.literal("text"),
  text: z.object({ body: z.string().min(1).max(4096) }),
});

const TemplateMessage = z.object({
  to: z.preprocess(cleanPhone, z.string().regex(/^[0-9]{8,18}$/, "to must be 8-18 digits")),
  type: z.literal("template"),
  template: z.object({
    name: z.string().min(1).max(100),
    language: z.object({ code: z.string().min(2).max(10) }).optional(),
    components: z.array(z.unknown()).optional(),
  }),
});

const Body = z.discriminatedUnion("type", [TextMessage, TemplateMessage]);

export async function POST(req: Request) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.error },
      { status: auth.status, headers: auth.rateLimitHeaders }
    );
  }

  const db = getDb();
  const plan = (auth.user.plan || "free").toLowerCase() as "free" | "starter" | "growth" | "enterprise";
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;

  if (limits.maxMessagesPerMonth !== Infinity) {
    const row = db.prepare(`
      SELECT COUNT(*) as count 
      FROM messages 
      WHERE user_id = ? 
        AND direction = 'outbound' 
        AND created_at >= date('now', 'start of month')
    `).get(auth.user.id) as { count: number } | undefined;
    
    const sentCount = row?.count ?? 0;
    if (sentCount >= limits.maxMessagesPerMonth) {
      return NextResponse.json(
        { error: `Monthly message quota exceeded for plan ${plan.toUpperCase()} (limit: ${limits.maxMessagesPerMonth} messages)` },
        { status: 403 }
      );
    }
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const baseUrl = process.env.WA_GATEWAY_URL;
  const gwApiKey = process.env.WA_GATEWAY_API_KEY;
  const sessionName = process.env.WA_GATEWAY_SESSION;

  if (!baseUrl || !gwApiKey || !sessionName) {
    return NextResponse.json(
      { error: "Service Unavailable: Gateway keys or session not configured" },
      { status: 503, headers: auth.rateLimitHeaders }
    );
  }

  // wa-gateway expects /api/send-message {sessionName, to, message}.
  // For text: send body directly. Template messages are flattened into a string fallback
  // until the upstream supports template-aware payloads.
  const adminEmail = process.env.ADMIN_EMAIL || "admin@rizquna.id";
  const isFreeUser = plan === "free" && auth.user.email !== adminEmail;

  let targetMessage =
    parsed.data.type === "text"
      ? parsed.data.text.body
      : `[template:${parsed.data.template.name}] ${
          (parsed.data.template.components ?? []).map((c) => JSON.stringify(c)).join(" ")
        }`;

  if (isFreeUser) {
    targetMessage += "\n\n---\nKirim WhatsApp API gratis via wa.rizquna.id";
  }

  let upstreamStatus = 0;
  let upstreamBody = "";
  try {
    const res = await fetch(`${baseUrl}/api/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": gwApiKey,
      },
      body: JSON.stringify({
        sessionName,
        to: parsed.data.to,
        message: targetMessage,
      }),
      signal: AbortSignal.timeout(15000),
    });
    upstreamStatus = res.status;
    upstreamBody = (await res.text()).slice(0, 500);
  } catch (e) {
    auditLog({
      user_id: auth.key.user_id,
      api_key_id: auth.key.id,
      action: "messages.send",
      target: parsed.data.to,
      status: "fail",
      message: e instanceof Error ? e.message : "Gateway error",
    });
    return NextResponse.json({ error: "Gateway unreachable" }, { status: 502 });
  }

  if (upstreamStatus < 200 || upstreamStatus >= 300) {
    auditLog({
      user_id: auth.key.user_id,
      api_key_id: auth.key.id,
      action: "messages.send",
      target: parsed.data.to,
      status: "fail",
      message: `Gateway ${upstreamStatus}: ${upstreamBody.slice(0, 120)}`,
    });
    return NextResponse.json(
      { error: `Gateway ${upstreamStatus}`, body: upstreamBody },
      { status: 502 }
    );
  }

  const msgId = `msg_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
  
  try {
    db.prepare(`
      INSERT INTO messages (user_id, remote_jid, direction, content, status, external_id)
      VALUES (?, ?, 'outbound', ?, 'sent', ?)
    `).run(auth.user.id, parsed.data.to, targetMessage, msgId);
  } catch (dbErr) {
    console.error("[api/messages] failed to log outgoing message to db:", dbErr);
  }

  auditLog({
    user_id: auth.key.user_id,
    api_key_id: auth.key.id,
    action: "messages.send",
    target: parsed.data.to,
    status: "ok",
    message: `type=${parsed.data.type}`,
  });

  return NextResponse.json(
    {
      ok: true,
      id: msgId,
      type: parsed.data.type,
      upstream_status: upstreamStatus,
    },
    { headers: auth.rateLimitHeaders }
  );
}