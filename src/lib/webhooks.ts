import crypto from "node:crypto";
import dns from "node:dns";
import { promisify } from "node:util";
import { getDb } from "./db";
import { encrypt, decryptSecret } from "./encryption";

const lookupAsync = promisify(dns.lookup);

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

export function getWebhook(userId: number, id: number): WebhookRow | undefined {
  return getDb()
    .prepare<{ uid: number; id: number }, WebhookRow>(
      `SELECT * FROM webhooks WHERE id = @id AND user_id = @uid`
    )
    .get({ uid: userId, id });
}

export function createWebhook(opts: {
  userId: number;
  label: string;
  url: string;
  events: WebhookEvent[];
}) {
  const secret = generateSecret();
  const encryptedSecret = encrypt(secret);
  const result = getDb()
    .prepare(
      `INSERT INTO webhooks (user_id, label, url, secret, events) VALUES (?, ?, ?, ?, ?)`
    )
    .run(opts.userId, opts.label, opts.url, encryptedSecret, JSON.stringify(opts.events));
  return { id: Number(result.lastInsertRowid), secret };
}

export function rotateSecret(userId: number, id: number) {
  const secret = generateSecret();
  const encryptedSecret = encrypt(secret);
  const r = getDb()
    .prepare(`UPDATE webhooks SET secret = ? WHERE id = ? AND user_id = ?`)
    .run(encryptedSecret, id, userId);
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
    events: (() => {
      try {
        return JSON.parse(r.events) as string[];
      } catch {
        return [];
      }
    })(),
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

export function isPrivateIp(ip: string): boolean {
  if (ip.startsWith("127.") || ip.startsWith("10.") || ip.startsWith("169.254.") || ip === "0.0.0.0") {
    return true;
  }
  if (ip.startsWith("192.168.")) {
    return true;
  }
  if (ip.startsWith("172.")) {
    const parts = ip.split(".");
    if (parts.length >= 2) {
      const second = parseInt(parts[1], 10);
      if (second >= 16 && second <= 31) return true;
    }
  }
  const ipLower = ip.toLowerCase();
  if (ipLower === "::1" || ipLower === "0:0:0:0:0:0:0:1") {
    return true;
  }
  if (ipLower.startsWith("fe80:") || ipLower.startsWith("fc00:") || ipLower.startsWith("fd00:")) {
    return true;
  }
  return false;
}

export async function validateWebhookUrl(urlStr: string): Promise<boolean> {
  try {
    const url = new URL(urlStr);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }
    const hostname = url.hostname.toLowerCase();
    
    if (hostname === "localhost" || hostname.endsWith(".local") || hostname.endsWith(".internal") || hostname.endsWith(".lan")) {
      return false;
    }
    
    const isIp = /^[0-9a-f.:]+$/i.test(hostname);
    if (isIp) {
      return !isPrivateIp(hostname);
    }
    
    try {
      const lookupResult = await lookupAsync(hostname);
      if (isPrivateIp(lookupResult.address)) {
        return false;
      }
    } catch {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

export async function deliverWebhook(opts: {
  webhook: WebhookRow;
  event: WebhookEvent;
  payload: Record<string, unknown>;
}) {
  const isValid = await validateWebhookUrl(opts.webhook.url);
  if (!isValid) {
    recordWebhookDelivery(opts.webhook.id, 400);
    return 400;
  }

  const ts = Math.floor(Date.now() / 1000);
  const body = JSON.stringify({ event: opts.event, timestamp: ts, data: opts.payload });
  const plaintextSecret = decryptSecret(opts.webhook.secret);
  const sig = signPayload(plaintextSecret, body, ts);
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