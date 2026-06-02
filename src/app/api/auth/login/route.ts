import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb, type UserRow } from "@/lib/db";
import { signSession, setSessionCookie } from "@/lib/auth";
import { rateLimit, clientIpFromRequest } from "@/lib/rate-limit";
import { auditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const ip = clientIpFromRequest(req);
  const rl = rateLimit({ key: `login:${ip}`, capacity: 10, refillPerSecond: 0.1 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Coba lagi nanti." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Email atau kata sandi tidak valid" }, { status: 400 });
  }

  const db = getDb();
  const user = db
    .prepare<{ email: string }, UserRow>("SELECT * FROM users WHERE email = @email")
    .get({ email: parsed.data.email });
  if (!user) {
    return NextResponse.json({ error: "Email atau kata sandi salah" }, { status: 401 });
  }
  const ok = await bcrypt.compare(parsed.data.password, user.password_hash);
  if (!ok) {
    auditLog({
      user_id: user.id,
      action: "auth.login",
      status: "fail",
      message: "wrong password",
    });
    return NextResponse.json({ error: "Email atau kata sandi salah" }, { status: 401 });
  }

  const token = await signSession({
    uid: user.id,
    email: user.email,
    name: user.name,
    pwdHashPart: user.password_hash.substring(0, 10),
  });
  await setSessionCookie(token);

  auditLog({
    user_id: user.id,
    action: "auth.login",
    status: "ok",
  });

  return NextResponse.json({ ok: true });
}

