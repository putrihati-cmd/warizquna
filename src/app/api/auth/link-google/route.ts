import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb, type UserRow } from "@/lib/db";
import { signSession, setSessionCookie, verifyPendingLinkToken } from "@/lib/auth";
import { auditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const Schema = z.object({
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const pendingToken = cookieStore.get("pending_oauth_link")?.value;

  if (!pendingToken) {
    return NextResponse.json(
      { error: "Sesi tautan tidak valid atau telah kedaluwarsa. Silakan ulangi login Google." },
      { status: 400 }
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
    return NextResponse.json({ error: "Kata sandi harus diisi" }, { status: 400 });
  }

  const payload = await verifyPendingLinkToken(pendingToken);
  if (!payload) {
    return NextResponse.json(
      { error: "Sesi tautan tidak valid atau telah kedaluwarsa. Silakan ulangi login Google." },
      { status: 400 }
    );
  }

  const db = getDb();
  const user = db
    .prepare<{ email: string }, UserRow>("SELECT * FROM users WHERE email = @email")
    .get({ email: payload.email });

  if (!user) {
    return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 404 });
  }

  const passwordOk = await bcrypt.compare(parsed.data.password, user.password_hash);
  if (!passwordOk) {
    auditLog({
      user_id: user.id,
      action: "auth.oauth_link",
      status: "fail",
      message: "wrong password for link",
    });
    return NextResponse.json({ error: "Kata sandi yang Anda masukkan salah." }, { status: 401 });
  }

  // Update google_id for the user
  db.prepare<{ google_id: string; id: number }>(
    "UPDATE users SET google_id = @google_id WHERE id = @id"
  ).run({ google_id: payload.googleId, id: user.id });

  // Clear pending link cookie
  cookieStore.delete("pending_oauth_link");

  // Sign and set session cookie
  const token = await signSession({
    uid: user.id,
    email: user.email,
    name: user.name,
    pwdHashPart: user.password_hash.substring(0, 10),
  });
  await setSessionCookie(token);

  auditLog({
    user_id: user.id,
    action: "auth.oauth_link",
    status: "ok",
    message: "Linked Google account to existing email via password confirmation",
  });

  auditLog({
    user_id: user.id,
    action: "auth.login",
    status: "ok",
    message: "Logged in via Google after linking",
  });

  const redirectTarget = cookieStore.get("oauth_redirect")?.value || "/dashboard";
  cookieStore.delete("oauth_redirect");

  return NextResponse.json({ ok: true, redirect: redirectTarget });
}

export async function GET() {
  const cookieStore = await cookies();
  const pendingToken = cookieStore.get("pending_oauth_link")?.value;
  if (!pendingToken) {
    return NextResponse.json({ email: null });
  }
  const payload = await verifyPendingLinkToken(pendingToken);
  return NextResponse.json({ email: payload?.email || null });
}
