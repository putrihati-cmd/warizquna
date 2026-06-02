import crypto from "node:crypto";
import { getDb, type ApiKeyRow } from "./db";

/**
 * Generate a fresh API key. Returns the plaintext (shown once) and
 * the row written to the DB. The DB only stores the SHA-256 hash.
 */
export function createApiKey(userId: number, label: string) {
  const random = crypto.randomBytes(24).toString("base64url"); // ~32 chars
  const plaintext = `rzq_${random}`;
  const hash = sha256Hex(plaintext);
  const prefix = plaintext.slice(0, 12); // safe to display
  const db = getDb();
  const result = db
    .prepare(
      "INSERT INTO api_keys (user_id, label, key_prefix, key_hash) VALUES (?, ?, ?, ?)"
    )
    .run(userId, label, prefix, hash);
  return { id: Number(result.lastInsertRowid), plaintext, prefix, label };
}

export function listApiKeys(userId: number): ApiKeyRow[] {
  const db = getDb();
  return db
    .prepare<{ uid: number }, ApiKeyRow>(
      "SELECT * FROM api_keys WHERE user_id = @uid AND revoked_at IS NULL ORDER BY id DESC"
    )
    .all({ uid: userId });
}

export function revokeApiKey(userId: number, id: number) {
  const db = getDb();
  return db
    .prepare(
      "UPDATE api_keys SET revoked_at = datetime('now') WHERE id = ? AND user_id = ? AND revoked_at IS NULL"
    )
    .run(id, userId);
}

export function findApiKey(plaintext: string): ApiKeyRow | undefined {
  const hash = sha256Hex(plaintext);
  const db = getDb();
  return db
    .prepare<{ h: string }, ApiKeyRow>(
      "SELECT * FROM api_keys WHERE key_hash = @h AND revoked_at IS NULL"
    )
    .get({ h: hash });
}

export function touchApiKey(id: number) {
  const db = getDb();
  db.prepare("UPDATE api_keys SET last_used_at = datetime('now') WHERE id = ?").run(id);
}

export function sha256Hex(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}