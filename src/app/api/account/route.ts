import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, type UserRow } from "@/lib/db";
import { getSession, signSession, setSessionCookie } from "@/lib/auth";
import { auditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const Schema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(20).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
});

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  const u = db
    .prepare<{ id: number }, UserRow>("SELECT * FROM users WHERE id = @id")
    .get({ id: session.uid });
  if (!u) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({
    id: u.id,
    email: u.email,
    name: u.name,
    phone: u.phone,
    company: u.company,
    plan: u.plan,
    created_at: u.created_at,
  });
}

export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  const db = getDb();
  db.prepare(`UPDATE users SET name = ?, phone = ?, company = ? WHERE id = ?`).run(
    parsed.data.name,
    parsed.data.phone || null,
    parsed.data.company || null,
    session.uid
  );

  const u = db.prepare("SELECT password_hash FROM users WHERE id = ?").get(session.uid) as { password_hash: string } | undefined;
  const pwdHashPart = u?.password_hash ? u.password_hash.substring(0, 10) : "google_auth";

  // Refresh session token (name may have changed)
  const token = await signSession({
    uid: session.uid,
    email: session.email,
    name: parsed.data.name,
    pwdHashPart,
  });
  await setSessionCookie(token);

  auditLog({
    user_id: session.uid,
    action: "account.update",
    status: "ok",
    message: `name=${parsed.data.name}`,
  });
  return NextResponse.json({ ok: true });
}