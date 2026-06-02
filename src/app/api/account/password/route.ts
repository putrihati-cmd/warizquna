import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb, type UserRow } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { auditLog } from "@/lib/audit";
import { rateLimit, clientIpFromRequest } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const Schema = z.object({
  current: z.string().min(1),
  next: z.string().min(8).max(120),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const ip = clientIpFromRequest(req);
  const rl = rateLimit({ key: `pw-change:${session.uid}:${ip}`, capacity: 5, refillPerSecond: 0.05 });
  if (!rl.ok) return NextResponse.json({ error: "Terlalu banyak percobaan" }, { status: 429 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Kata sandi baru minimal 8 karakter" }, { status: 400 });
  }

  const db = getDb();
  const user = db
    .prepare<{ id: number }, UserRow>("SELECT * FROM users WHERE id = @id")
    .get({ id: session.uid });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const ok = await bcrypt.compare(parsed.data.current, user.password_hash);
  if (!ok) {
    auditLog({ user_id: session.uid, action: "account.change_password", status: "fail", message: "wrong current" });
    return NextResponse.json({ error: "Kata sandi saat ini salah" }, { status: 401 });
  }

  const hash = await bcrypt.hash(parsed.data.next, 12);
  db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, user.id);

  // Re-sign session to keep current session logged in
  const { signSession, setSessionCookie } = await import("@/lib/auth");
  const newToken = await signSession({
    uid: user.id,
    email: user.email,
    name: user.name,
    pwdHashPart: hash.substring(0, 10),
  });
  await setSessionCookie(newToken);

  auditLog({ user_id: session.uid, action: "account.change_password", status: "ok" });
  return NextResponse.json({ ok: true });

}