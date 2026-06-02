import { findApiKey, touchApiKey } from "@/lib/api-keys";
import { getDb, type UserRow } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export type ApiAuthResult =
  | { ok: true; user: UserRow; keyId: number; key: { id: number; user_id: number }; rateLimitHeaders: HeadersInit }
  | { ok: false; status: number; error: string; rateLimitHeaders?: HeadersInit };

export function authenticateApiKey(req: Request): ApiAuthResult {
  const auth = req.headers.get("authorization") || "";
  const token = auth.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : (req.headers.get("x-api-key") || "");

  if (!token) {
    return { ok: false, status: 401, error: "API key required" };
  }

  const key = findApiKey(token);
  if (!key) {
    return { ok: false, status: 401, error: "Invalid API key" };
  }

  const user = getDb()
    .prepare<{ id: number }, UserRow>("SELECT * FROM users WHERE id = @id")
    .get({ id: key.user_id });
  if (!user) {
    return { ok: false, status: 401, error: "Invalid API key" };
  }

  // Per-API-key rate limiting: 60 requests/minute for paid, 10/minute for free
  const plan = (user.plan || "free").toLowerCase();
  const capacity = plan === "free" ? 10 : 60;
  const rl = rateLimit({ key: `apikey:${key.id}`, capacity, refillPerSecond: capacity / 60 });

  const rateLimitHeaders: HeadersInit = {
    "X-RateLimit-Limit": String(capacity),
    "X-RateLimit-Remaining": String(Math.max(0, Math.floor(rl.ok ? capacity - 1 : 0))),
  };

  if (!rl.ok) {
    return {
      ok: false,
      status: 429,
      error: `Rate limit exceeded. Try again in ${Math.ceil(rl.retryAfterMs / 1000)}s`,
      rateLimitHeaders: {
        ...rateLimitHeaders,
        "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)),
      },
    };
  }

  touchApiKey(key.id);
  return { ok: true, user, keyId: key.id, key: { id: key.id, user_id: key.user_id }, rateLimitHeaders };
}
