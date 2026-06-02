import { getDb } from "./db";
import { z } from "zod";

export type ContactRow = {
  id: number;
  user_id: number;
  phone: string;
  name: string;
  tags: string | null;
  attributes: string | null;
  created_at: string;
  updated_at: string;
};

const cleanPhone = (val: unknown): string => {
  if (typeof val !== "string") return "";
  let cleaned = val.replace(/[^0-9+]/g, "");
  if (cleaned.startsWith("+")) cleaned = cleaned.slice(1);
  if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
  return cleaned;
};

export const ContactValidationSchema = z.object({
  phone: z.preprocess(cleanPhone, z.string().regex(/^[0-9]{8,18}$/, "Nomor telepon harus berupa 8-18 digit")),
  name: z.string().min(1).max(120),
  tags: z.array(z.string().max(40)).max(20).optional(),
  attributes: z.record(z.string(), z.string().max(500)).optional(),
});

export const ContactPatchValidationSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  phone: z.preprocess((val) => (val === undefined ? undefined : cleanPhone(val)), z.string().regex(/^[0-9]{8,18}$/, "Nomor telepon harus berupa 8-18 digit")).optional(),
  tags: z.array(z.string().max(40)).max(20).optional(),
  attributes: z.record(z.string(), z.string().max(500)).optional(),
});

export function rowToJson(r: ContactRow) {
  return {
    id: r.id,
    phone: r.phone,
    name: r.name,
    tags: (() => {
      if (!r.tags) return [];
      try {
        return JSON.parse(r.tags) as string[];
      } catch {
        return [];
      }
    })(),
    attributes: (() => {
      if (!r.attributes) return {};
      try {
        return JSON.parse(r.attributes) as Record<string, string>;
      } catch {
        return {};
      }
    })(),
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

export function listContacts(userId: number, limit = 100, offset = 0): ContactRow[] {
  return getDb()
    .prepare<{ uid: number; lim: number; off: number }, ContactRow>(
      `SELECT * FROM contacts WHERE user_id = @uid ORDER BY id DESC LIMIT @lim OFFSET @off`
    )
    .all({ uid: userId, lim: limit, off: offset });
}

export function countContacts(userId: number): number {
  const row = getDb()
    .prepare<{ uid: number }, { c: number }>(
      `SELECT COUNT(*) as c FROM contacts WHERE user_id = @uid`
    )
    .get({ uid: userId });
  return row?.c ?? 0;
}

export function getContact(userId: number, id: number): ContactRow | undefined {
  return getDb()
    .prepare<{ uid: number; id: number }, ContactRow>(
      `SELECT * FROM contacts WHERE id = @id AND user_id = @uid`
    )
    .get({ uid: userId, id });
}

export function insertContact(userId: number, data: { phone: string; name: string; tags?: string[]; attributes?: Record<string, string> }) {
  const result = getDb()
    .prepare(
      `INSERT INTO contacts (user_id, phone, name, tags, attributes) VALUES (?, ?, ?, ?, ?)`
    )
    .run(
      userId,
      data.phone,
      data.name,
      data.tags ? JSON.stringify(data.tags) : null,
      data.attributes ? JSON.stringify(data.attributes) : null
    );
  return Number(result.lastInsertRowid);
}

export function modifyContact(userId: number, id: number, next: { phone: string; name: string; tags: string | null; attributes: string | null }) {
  return getDb()
    .prepare(
      `UPDATE contacts SET name = ?, phone = ?, tags = ?, attributes = ?, updated_at = datetime('now')
       WHERE id = ? AND user_id = ?`
    )
    .run(next.name, next.phone, next.tags, next.attributes, id, userId);
}

export function deleteContact(userId: number, id: number) {
  return getDb()
    .prepare(`DELETE FROM contacts WHERE id = ? AND user_id = ?`)
    .run(id, userId);
}
