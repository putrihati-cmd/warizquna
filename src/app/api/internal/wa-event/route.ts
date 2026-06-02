import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "node:crypto";
import { getDb } from "@/lib/db";
import { auditLog } from "@/lib/audit";
import { deliverWebhook, listWebhooks, type WebhookEvent } from "@/lib/webhooks";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Internal ingress. The wa-gateway container POSTs WhatsApp events here,
 * authenticated with a shared secret token (constant-time compared).
 * For every recipient user, we fan out signed deliveries to their
 * subscribed webhooks. We also persist the message for analytics.
 */

const Schema = z.object({
  // raw event from wa-gateway
  deviceId: z.number().optional(),
  sessionName: z.string().optional(),
  from: z.string().min(1),
  body: z.string().optional().default(""),
  timestamp: z.number().optional(),
  id: z.string().optional(),
  // optional: which Rizquna user does this device belong to?
  userId: z.number().int().positive().optional(),
  event: z.string().optional(),
});

export async function POST(req: Request) {
  const expected = process.env.GATEWAY_INGRESS_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "Ingress not configured" }, { status: 503 });
  }
  const provided = req.headers.get("x-rizquna-ingress-token") || "";
  if (
    provided.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected))
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  }

  const event = (parsed.data.event as WebhookEvent | undefined) ?? "message.received";
  const remoteJid = parsed.data.from;
  const content = parsed.data.body ?? "";

  // Persist message if userId provided
  if (parsed.data.userId) {
    try {
      getDb()
        .prepare(
          `INSERT INTO messages (user_id, remote_jid, direction, content, status, external_id)
           VALUES (?, ?, 'inbound', ?, 'received', ?)`
        )
        .run(parsed.data.userId, remoteJid, content, parsed.data.id ?? null);
    } catch (e) {
      console.error("[ingress] persist failed:", e instanceof Error ? e.message : e);
    }
  }

  // Fan out to user webhooks (only when userId is provided)
  let delivered = 0;
  if (parsed.data.userId) {
    const hooks = listWebhooks(parsed.data.userId).filter((h) => {
      if (!h.enabled) return false;
      try {
        const evs = JSON.parse(h.events) as string[];
        return evs.includes(event);
      } catch {
        return false;
      }
    });
    for (const h of hooks) {
      const status = await deliverWebhook({
        webhook: h,
        event,
        payload: {
          from: remoteJid,
          body: content,
          external_id: parsed.data.id,
          session: parsed.data.sessionName,
          device_id: parsed.data.deviceId,
        },
      });
      delivered++;
      auditLog({
        user_id: parsed.data.userId,
        action: "webhooks.deliver",
        target: h.url,
        status: status >= 200 && status < 300 ? "ok" : "fail",
        message: `event=${event} status=${status}`,
      });
    }
  }

  return NextResponse.json({ ok: true, delivered });
}