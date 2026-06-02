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

const PatchSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  phone: z.string().regex(/^[0-9]{8,18}$/).optional(),
  tags: z.array(z.string().max(40)).max(20).optional(),
  attributes: z.record(z.string(), z.string().max(500)).optional(),
});

function readId(params: { id: string }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return null;
  return id;
}

function getOwned(userId: number, id: number) {
  return getDb()
    .prepare<{ uid: number; id: number }, ContactRow>(
      "SELECT * FROM contacts WHERE id = @id AND user_id = @uid"
    )
    .get({ uid: userId, id });
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

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  const row = getOwned(auth.key.user_id, id);
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ contact: rowToJson(row) });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });

  const existing = getOwned(auth.key.user_id, id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = PatchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });
  }

  const next = {
    name: parsed.data.name ?? existing.name,
    phone: parsed.data.phone ?? existing.phone,
    tags: parsed.data.tags ? JSON.stringify(parsed.data.tags) : existing.tags,
    attributes: parsed.data.attributes ? JSON.stringify(parsed.data.attributes) : existing.attributes,
  };

  try {
    getDb()
      .prepare(
        `UPDATE contacts SET name = ?, phone = ?, tags = ?, attributes = ?, updated_at = datetime('now')
         WHERE id = ? AND user_id = ?`
      )
      .run(next.name, next.phone, next.tags, next.attributes, id, auth.key.user_id);
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      return NextResponse.json({ error: "Nomor telepon sudah dipakai kontak lain" }, { status: 409 });
    }
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }

  auditLog({
    user_id: auth.key.user_id,
    api_key_id: auth.key.id,
    action: "contacts.update",
    target: String(id),
    status: "ok",
  });
  const row = getOwned(auth.key.user_id, id);
  return NextResponse.json({ ok: true, contact: row ? rowToJson(row) : null });
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });

  const r = getDb()
    .prepare("DELETE FROM contacts WHERE id = ? AND user_id = ?")
    .run(id, auth.key.user_id);
  if (r.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  auditLog({
    user_id: auth.key.user_id,
    api_key_id: auth.key.id,
    action: "contacts.delete",
    target: String(id),
    status: "ok",
  });
  return NextResponse.json({ ok: true });
}