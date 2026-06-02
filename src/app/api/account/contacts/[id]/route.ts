import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { auditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PatchSchema = z.object({
  phone: z.string().regex(/^[0-9]{8,18}$/).optional(),
  name: z.string().min(1).max(120).optional(),
  tags: z.array(z.string().max(40)).max(20).optional(),
});

function readId(p: { id: string }) {
  const id = Number(p.id);
  return Number.isFinite(id) ? id : null;
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = readId(await ctx.params);
  if (!id) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = PatchSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 });

  const fields: string[] = [];
  const values: (string | number)[] = [];
  if (parsed.data.phone !== undefined) {
    fields.push("phone = ?");
    values.push(parsed.data.phone);
  }
  if (parsed.data.name !== undefined) {
    fields.push("name = ?");
    values.push(parsed.data.name);
  }
  if (parsed.data.tags !== undefined) {
    fields.push("tags = ?");
    values.push(JSON.stringify(parsed.data.tags));
  }
  if (fields.length === 0) return NextResponse.json({ ok: true });
  fields.push("updated_at = datetime('now')");
  values.push(id, session.uid);
  try {
    const r = getDb()
      .prepare(`UPDATE contacts SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`)
      .run(...values);
    if (r.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
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
  const r = getDb().prepare("DELETE FROM contacts WHERE id = ? AND user_id = ?").run(id, session.uid);
  if (r.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  auditLog({ user_id: session.uid, action: "contacts.delete", target: String(id), status: "ok" });
  return NextResponse.json({ ok: true });
}