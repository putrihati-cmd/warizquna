import { NextResponse } from "next/server";
import { authenticateApiKey } from "@/lib/api-auth";
import { auditLog } from "@/lib/audit";
import { parseBody } from "@/lib/request";
import {
  ContactPatchValidationSchema,
  getContact,
  modifyContact,
  deleteContact,
  rowToJson,
} from "@/lib/contacts";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function readId(params: { id: string }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return null;
  return id;
}

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  const row = getContact(auth.key.user_id, id);
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ contact: rowToJson(row) });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });

  const existing = getContact(auth.key.user_id, id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const parsed = await parseBody(req, ContactPatchValidationSchema);
  if (!parsed.success) return parsed.response;

  const next = {
    name: parsed.data.name ?? existing.name,
    phone: typeof parsed.data.phone === "string" ? parsed.data.phone : existing.phone,
    tags: parsed.data.tags ? JSON.stringify(parsed.data.tags) : existing.tags,
    attributes: parsed.data.attributes ? JSON.stringify(parsed.data.attributes) : existing.attributes,
  };

  try {
    modifyContact(auth.key.user_id, id, next);
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
  const row = getContact(auth.key.user_id, id);
  return NextResponse.json({ ok: true, contact: row ? rowToJson(row) : null });
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });

  const r = deleteContact(auth.key.user_id, id);
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