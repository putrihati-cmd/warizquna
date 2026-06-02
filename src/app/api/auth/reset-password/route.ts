import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb, type UserRow } from "@/lib/db";
import { signSession, setSessionCookie } from "@/lib/auth";
import { sha256Hex } from "@/lib/api-keys";
import { rateLimit, clientIpFromRequest } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const Schema = z.object({
  token: z.string().min(8).max(120),
  password: z.string().min(8).max(120),
});

type ResetRow = {
  token_hash: string;
  user_id: number;
  expires_at: string;
  used_at: string | null;
};

export async function POST(req: Request) {
  const ip = clientIpFromRequest(req);
  const rl = rateLimit({ key: `pwreset:${ip}`, capacity: 10, refillPerSecond: 0.1 });
  if (!rl.ok) return NextResponse.json({ error: "Terlalu banyak percobaan." }, { status: 429 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Token atau kata sandi tidak valid" }, { status: 400 });
  }

  const db = getDb();
  const tokenHash = sha256Hex(parsed.data.token);
  const reset = db
    .prepare<{ h: string }, ResetRow>(
      "SELECT * FROM password_resets WHERE token_hash = @h"
    )
    .get({ h: tokenHash });

  if (!reset) return NextResponse.json({ error: "Token tidak valid" }, { status: 400 });
  if (reset.used_at) return NextResponse.json({ error: "Token sudah digunakan" }, { status: 400 });
  if (new Date(reset.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "Token kedaluwarsa" }, { status: 400 });
  }

  const user = db
    .prepare<{ id: number }, UserRow>("SELECT * FROM users WHERE id = @id")
    .get({ id: reset.user_id });
  if (!user) return NextResponse.json({ error: "User tidak ditemukan" }, { status: 400 });

  const hash = await bcrypt.hash(parsed.data.password, 12);

  const tx = db.transaction(() => {
    db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, user.id);
    db.prepare("UPDATE password_resets SET used_at = datetime('now') WHERE token_hash = ?").run(tokenHash);
  });
  tx();

  // Auto-login the user
  const session = await signSession({ uid: user.id, email: user.email, name: user.name });
  await setSessionCookie(session);

  return NextResponse.json({ ok: true });
}