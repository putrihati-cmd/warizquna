import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;
let resolved: { from: string; configured: boolean } | null = null;

function init() {
  if (resolved) return resolved;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `Rizquna <no-reply@rizquna.id>`;
  const secure = (process.env.SMTP_SECURE || "false").toLowerCase() === "true";

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
    resolved = { from, configured: true };
  } else {
    resolved = { from, configured: false };
  }
  return resolved;
}

export type MailOptions = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export type MailResult =
  | { ok: true; messageId: string; mode: "smtp" }
  | { ok: true; mode: "logged" } // SMTP not configured — payload logged instead
  | { ok: false; error: string };

export async function sendMail(opts: MailOptions): Promise<MailResult> {
  const cfg = init();
  if (!cfg.configured || !transporter) {
    console.log("[mail] SMTP not configured. Payload:", JSON.stringify(opts));
    return { ok: true, mode: "logged" };
  }
  try {
    const info = await transporter.sendMail({
      from: cfg.from,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    return { ok: true, messageId: info.messageId, mode: "smtp" };
  } catch (e) {
    console.error("[mail] sendMail error:", e instanceof Error ? e.message : e);
    return { ok: false, error: e instanceof Error ? e.message : "Unknown SMTP error" };
  }
}

export function isMailConfigured() {
  const cfg = init();
  return cfg.configured;
}