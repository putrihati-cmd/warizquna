import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb, type UserRow } from "@/lib/db";
import { signSession, setSessionCookie } from "@/lib/auth";
import { rateLimit, clientIpFromRequest } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const Schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  phone: z.string().min(8).max(20).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  password: z.string().min(8).max(120),
});

export async function POST(req: Request) {
  const ip = clientIpFromRequest(req);
  const rl = rateLimit({ key: `register:${ip}`, capacity: 5, refillPerSecond: 0.05 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Terlalu banyak pendaftaran. Coba lagi nanti." },
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
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  }

  const db = getDb();
  const exists = db.prepare<{ email: string }, UserRow>("SELECT * FROM users WHERE email = @email").get({ email: parsed.data.email });
  if (exists) {
    return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
  }

  const hash = await bcrypt.hash(parsed.data.password, 12);
  const stmt = db.prepare(`
    INSERT INTO users (email, name, phone, company, password_hash, plan)
    VALUES (@email, @name, @phone, @company, @password_hash, 'free')
  `);
  const result = stmt.run({
    email: parsed.data.email,
    name: parsed.data.name,
    phone: parsed.data.phone || null,
    company: parsed.data.company || null,
    password_hash: hash,
  });

  const uid = Number(result.lastInsertRowid);
  const token = await signSession({ uid, email: parsed.data.email, name: parsed.data.name });
  await setSessionCookie(token);
  return NextResponse.json({ ok: true, uid });
}
