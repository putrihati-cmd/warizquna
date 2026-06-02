import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateApiKey } from "@/lib/api-auth";
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
  attributes: z.record(z.string(), z.string().max(500)).optional(),
});

export async function GET(req: Request) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const url = new URL(req.url);
  const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit") || 50)));
  const offset = Math.max(0, Number(url.searchParams.get("offset") || 0));
  const db = getDb();
  const rows = db
    .prepare<{ uid: number; lim: number; off: number }, ContactRow>(
      `SELECT * FROM contacts WHERE user_id = @uid ORDER BY id DESC LIMIT @lim OFFSET @off`
    )
    .all({ uid: auth.key.user_id, lim: limit, off: offset });
  const total = (
    db.prepare<{ uid: number }, { c: number }>(
      `SELECT COUNT(*) as c FROM contacts WHERE user_id = @uid`
    ).get({ uid: auth.key.user_id }) ?? { c: 0 }
  ).c;
  return NextResponse.json({
    total,
    limit,
    offset,
    contacts: rows.map(rowToJson),
  });
}

export async function POST(req: Request) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  }
  const db = getDb();
  try {
    const result = db
      .prepare(
        `INSERT INTO contacts (user_id, phone, name, tags, attributes) VALUES (?, ?, ?, ?, ?)`
      )
      .run(
        auth.key.user_id,
        parsed.data.phone,
        parsed.data.name,
        parsed.data.tags ? JSON.stringify(parsed.data.tags) : null,
        parsed.data.attributes ? JSON.stringify(parsed.data.attributes) : null
      );
    auditLog({
      user_id: auth.key.user_id,
      api_key_id: auth.key.id,
      action: "contacts.create",
      target: parsed.data.phone,
      status: "ok",
    });
    const row = db
      .prepare<{ id: number }, ContactRow>("SELECT * FROM contacts WHERE id = @id")
      .get({ id: Number(result.lastInsertRowid) });
    return NextResponse.json({ ok: true, contact: row ? rowToJson(row) : null }, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      return NextResponse.json({ error: "Kontak dengan nomor ini sudah ada" }, { status: 409 });
    }
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }
}

function rowToJson(r: ContactRow) {
  return {
    id: r.id,
    phone: r.phone,
    name: r.name,
    tags: r.tags ? (JSON.parse(r.tags) as string[]) : [],
    attributes: r.attributes ? (JSON.parse(r.attributes) as Record<string, string>) : {},
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}