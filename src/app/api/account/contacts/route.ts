import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { auditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ContactRow = {
  id: number;
  user_id: number;
  phone: string;
  name: string;
  tags: string | null;
  attributes: string | null;
  created_at: string;
  updated_at: string;
};

const ContactSchema = z.object({
  phone: z.string().regex(/^[0-9]{8,18}$/),
  name: z.string().min(1).max(120),
  tags: z.array(z.string().max(40)).max(20).optional(),
});

function rowToJson(r: ContactRow) {
  return {
    id: r.id,
    phone: r.phone,
    name: r.name,
    tags: r.tags ? (JSON.parse(r.tags) as string[]) : [],
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit") || 100)));
  const rows = getDb()
    .prepare<{ uid: number; lim: number }, ContactRow>(
      `SELECT * FROM contacts WHERE user_id = @uid ORDER BY id DESC LIMIT @lim`
    )
    .all({ uid: session.uid, lim: limit });
  return NextResponse.json({ contacts: rows.map(rowToJson) });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  try {
    const r = getDb()
      .prepare(`INSERT INTO contacts (user_id, phone, name, tags) VALUES (?, ?, ?, ?)`)
      .run(
        session.uid,
        parsed.data.phone,
        parsed.data.name,
        parsed.data.tags ? JSON.stringify(parsed.data.tags) : null
      );
    auditLog({ user_id: session.uid, action: "contacts.create", target: parsed.data.phone, status: "ok" });
    const row = getDb()
      .prepare<{ id: number }, ContactRow>("SELECT * FROM contacts WHERE id = @id")
      .get({ id: Number(r.lastInsertRowid) });
    return NextResponse.json({ ok: true, contact: row ? rowToJson(row) : null }, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      return NextResponse.json({ error: "Kontak dengan nomor ini sudah ada" }, { status: 409 });
    }
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }
}