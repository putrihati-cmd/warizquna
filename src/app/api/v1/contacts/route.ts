import { NextResponse } from "next/server";
import { authenticateApiKey } from "@/lib/api-auth";
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
  const auth = authenticateApiKey(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const url = new URL(req.url);
  const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit") || 50)));
  const offset = Math.max(0, Number(url.searchParams.get("offset") || 0));
  
  const rows = listContacts(auth.key.user_id, limit, offset);
  const total = countContacts(auth.key.user_id);
  
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

  const parsed = await parseBody(req, ContactValidationSchema);
  if (!parsed.success) return parsed.response;

  try {
    const lastId = insertContact(auth.key.user_id, parsed.data);
    auditLog({
      user_id: auth.key.user_id,
      api_key_id: auth.key.id,
      action: "contacts.create",
      target: parsed.data.phone,
      status: "ok",
    });
    const row = getContact(auth.key.user_id, lastId);
    return NextResponse.json({ ok: true, contact: row ? rowToJson(row) : null }, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      return NextResponse.json({ error: "Kontak dengan nomor ini sudah ada" }, { status: 409 });
    }
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }
}