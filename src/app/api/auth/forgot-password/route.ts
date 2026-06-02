import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { getDb, type UserRow } from "@/lib/db";
import { rateLimit, clientIpFromRequest } from "@/lib/rate-limit";
import { sha256Hex } from "@/lib/api-keys";
import { sendMail, isMailConfigured } from "@/lib/mail";
import { auditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const Schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const ip = clientIpFromRequest(req);
  const rl = rateLimit({ key: `pwreset-req:${ip}`, capacity: 5, refillPerSecond: 0.05 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: true, info: "Jika email terdaftar, tautan reset akan dikirim." },
      { status: 200 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: true });
  }

  const db = getDb();
  const user = db
    .prepare<{ email: string }, UserRow>("SELECT * FROM users WHERE email = @email")
    .get({ email: parsed.data.email });

  // Always respond ok to avoid email enumeration
  if (!user) {
    return NextResponse.json({ ok: true, info: "Jika email terdaftar, tautan reset akan dikirim." });
  }

  const token = `rst_${crypto.randomBytes(24).toString("base64url")}`;
  const tokenHash = sha256Hex(token);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 menit

  db.prepare(
    "INSERT INTO password_resets (token_hash, user_id, expires_at) VALUES (?, ?, ?)"
  ).run(tokenHash, user.id, expiresAt);

  const resetUrl = `${getBaseUrl(req)}/reset-password?token=${token}`;

  // Send email if SMTP configured, otherwise log to server
  const subject = "Reset Kata Sandi Rizquna";
  const text = `Halo ${user.name},

Anda meminta reset kata sandi akun Rizquna Anda.

Klik tautan berikut untuk mengatur kata sandi baru:
${resetUrl}

Tautan berlaku selama 30 menit. Jika Anda tidak meminta reset, abaikan email ini.

— Tim Rizquna`;
  const html = `<p>Halo ${escapeHtml(user.name)},</p>
<p>Anda meminta reset kata sandi akun Rizquna Anda.</p>
<p><a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:#25D366;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Setel Ulang Kata Sandi</a></p>
<p style="color:#667781;font-size:13px">Atau salin URL berikut: <br/><code>${resetUrl}</code></p>
<p style="color:#667781;font-size:13px">Tautan berlaku 30 menit. Jika Anda tidak meminta reset, abaikan email ini.</p>
<p>— Tim Rizquna</p>`;

  const mail = await sendMail({ to: user.email, subject, text, html });
  if (!mail.ok) {
    console.error(`[forgot-password] mail send failed: ${mail.error}`);
  }
  auditLog({
    user_id: user.id,
    action: "auth.password_reset_request",
    status: mail.ok ? "ok" : "fail",
    message: mail.ok ? `mode=${mail.mode}` : mail.error,
  });

  // In dev (no SMTP), surface URL to caller for testing.
  const debug = !isMailConfigured() ? { resetUrl, mode: "logged" as const } : undefined;
  return NextResponse.json({
    ok: true,
    info: "Jika email terdaftar, tautan reset akan dikirim.",
    ...(debug ?? {}),
  });
}

function getBaseUrl(req: Request) {
  const url = new URL(req.url);
  const proto = req.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
  const host = req.headers.get("x-forwarded-host") || url.host;
  return `${proto}://${host}`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}