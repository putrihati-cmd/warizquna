import crypto from "node:crypto";
import { getDb } from "./db";

export type WebhookRow = {
  id: number;
  user_id: number;
  label: string;
  url: string;
  secret: string;
  events: string; // JSON array
  enabled: number;
  last_triggered_at: string | null;
  last_status: number | null;
  created_at: string;
};

export const SUPPORTED_EVENTS = [
  "message.received",
  "message.sent",
  "message.delivered",
  "message.read",
  "message.failed",
] as const;

export type WebhookEvent = (typeof SUPPORTED_EVENTS)[number];

export function generateSecret() {
  return `whsec_${crypto.randomBytes(24).toString("base64url")}`;
}

export function listWebhooks(userId: number): WebhookRow[] {
  return getDb()
    .prepare<{ uid: number }, WebhookRow>(
      `SELECT * FROM webhooks WHERE user_id = @uid ORDER BY id DESC`
    )
    .all({ uid: userId });
}

export function createWebhook(opts: {
  userId: number;
  label: string;
  url: string;
  events: WebhookEvent[];
}) {
  const secret = generateSecret();
  const result = getDb()
    .prepare(
      `INSERT INTO webhooks (user_id, label, url, secret, events) VALUES (?, ?, ?, ?, ?)`
    )
    .run(opts.userId, opts.label, opts.url, secret, JSON.stringify(opts.events));
  return { id: Number(result.lastInsertRowid), secret };
}

export function rotateSecret(userId: number, id: number) {
  const secret = generateSecret();
  const r = getDb()
    .prepare(`UPDATE webhooks SET secret = ? WHERE id = ? AND user_id = ?`)
    .run(secret, id, userId);
  if (r.changes === 0) return null;
  return secret;
}

export function updateWebhook(opts: {
  userId: number;
  id: number;
  label?: string;
  url?: string;
  events?: WebhookEvent[];
  enabled?: boolean;
}) {
  const fields: string[] = [];
  const values: (string | number)[] = [];
  if (opts.label !== undefined) {
    fields.push("label = ?");
    values.push(opts.label);
  }
  if (opts.url !== undefined) {
    fields.push("url = ?");
    values.push(opts.url);
  }
  if (opts.events !== undefined) {
    fields.push("events = ?");
    values.push(JSON.stringify(opts.events));
  }
  if (opts.enabled !== undefined) {
    fields.push("enabled = ?");
    values.push(opts.enabled ? 1 : 0);
  }
  if (fields.length === 0) return { changes: 0 };
  values.push(opts.id, opts.userId);
  return getDb()
    .prepare(`UPDATE webhooks SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`)
    .run(...values);
}

export function deleteWebhook(userId: number, id: number) {
  return getDb()
    .prepare(`DELETE FROM webhooks WHERE id = ? AND user_id = ?`)
    .run(id, userId);
}

export function recordWebhookDelivery(id: number, status: number) {
  getDb()
    .prepare(`UPDATE webhooks SET last_triggered_at = datetime('now'), last_status = ? WHERE id = ?`)
    .run(status, id);
}

export function rowToJson(r: WebhookRow) {
  return {
    id: r.id,
    label: r.label,
    url: r.url,
    events: JSON.parse(r.events) as string[],
    enabled: !!r.enabled,
    last_triggered_at: r.last_triggered_at,
    last_status: r.last_status,
    created_at: r.created_at,
  };
}

export function signPayload(secret: string, body: string, timestamp: number) {
  const data = `${timestamp}.${body}`;
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

export async function deliverWebhook(opts: {
  webhook: WebhookRow;
  event: WebhookEvent;
  payload: Record<string, unknown>;
}) {
  const ts = Math.floor(Date.now() / 1000);
  const body = JSON.stringify({ event: opts.event, timestamp: ts, data: opts.payload });
  const sig = signPayload(opts.webhook.secret, body, ts);
  let status = 0;
  try {
    const res = await fetch(opts.webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Rizquna-Webhook/1.0",
        "X-Rizquna-Event": opts.event,
        "X-Rizquna-Timestamp": String(ts),
        "X-Rizquna-Signature": `t=${ts},v1=${sig}`,
      },
      body,
      signal: AbortSignal.timeout(8000),
    });
    status = res.status;
  } catch {
    status = 0;
  }
  recordWebhookDelivery(opts.webhook.id, status);
  return status;
}