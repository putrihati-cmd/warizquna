import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { auditLog } from "@/lib/audit";
import { parseBody } from "@/lib/request";
import {
  ContactPatchValidationSchema,
  getContact,
  modifyContact,
  deleteContact,
} from "@/lib/contacts";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function readId(p: { id: string }) {
  const id = Number(p.id);
  return Number.isFinite(id) ? id : null;
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });

  const existing = getContact(session.uid, id);
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
    modifyContact(session.uid, id, next);
    auditLog({ user_id: session.uid, action: "contacts.update", target: String(id), status: "ok" });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      return NextResponse.json({ error: "Nomor sudah dipakai kontak lain" }, { status: 409 });
    }
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });

  const r = deleteContact(session.uid, id);
  if (r.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  
  auditLog({ user_id: session.uid, action: "contacts.delete", target: String(id), status: "ok" });
  return NextResponse.json({ ok: true });
}