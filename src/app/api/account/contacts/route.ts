import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { auditLog } from "@/lib/audit";
import { parseBody } from "@/lib/request";
import {
  ContactValidationSchema,
  listContacts,
  countContacts,
  insertContact,
  getContact,
  rowToJson,
} from "@/lib/contacts";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit") || 50)));
  const offset = Math.max(0, Number(url.searchParams.get("offset") || 0));
  const rows = listContacts(session.uid, limit, offset);
  const total = countContacts(session.uid);
  return NextResponse.json({
    total,
    limit,
    offset,
    contacts: rows.map(rowToJson),
  });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = await parseBody(req, ContactValidationSchema);
  if (!parsed.success) return parsed.response;

  try {
    const lastId = insertContact(session.uid, parsed.data);
    auditLog({ user_id: session.uid, action: "contacts.create", target: parsed.data.phone, status: "ok" });
    const row = getContact(session.uid, lastId);
    return NextResponse.json({ ok: true, contact: row ? rowToJson(row) : null }, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      return NextResponse.json({ error: "Kontak dengan nomor ini sudah ada" }, { status: 409 });
    }
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }
}