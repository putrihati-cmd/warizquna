import { findApiKey, touchApiKey } from "@/lib/api-keys";
import { getDb, type UserRow } from "@/lib/db";
export type ApiAuthResult = { ok: true; user: UserRow; keyId: number; key: { id: number; user_id: number }; rateLimitHeaders?: HeadersInit } | { ok: false; status: number; error: string; rateLimitHeaders?: HeadersInit };
export function authenticateApiKey(req: Request): ApiAuthResult {
  const auth = req.headers.get("authorization") || "";
  const token = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : (req.headers.get("x-api-key") || "");
  if (!token) return { ok: false, status: 401, error: "API key required" };
  const key = findApiKey(token);
  if (!key) return { ok: false, status: 401, error: "Invalid API key" };
  const user = getDb().prepare<{ id: number }, UserRow>("SELECT * FROM users WHERE id = @id").get({ id: key.user_id });
  if (!user) return { ok: false, status: 401, error: "Invalid API key" };
  touchApiKey(key.id);
  return { ok: true, user, keyId: key.id, key: { id: key.id, user_id: key.user_id } };
}
