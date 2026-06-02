type Bucket = { tokens: number; updatedAt: number };
const buckets = new Map<string, Bucket>();
export function rateLimit(opts: { key: string; capacity?: number; refillPerSecond?: number }) {
  const capacity = opts.capacity ?? 20;
  const refill = opts.refillPerSecond ?? capacity / 60;
  const now = Date.now();
  const prev = buckets.get(opts.key) ?? { tokens: capacity, updatedAt: now };
  const tokens = Math.min(capacity, prev.tokens + ((now - prev.updatedAt) / 1000) * refill);
  if (tokens < 1) { buckets.set(opts.key, { tokens, updatedAt: now }); return { ok: false, retryAfterMs: Math.ceil(((1 - tokens) / refill) * 1000) }; }
  buckets.set(opts.key, { tokens: tokens - 1, updatedAt: now });
  return { ok: true, retryAfterMs: 0 };
}
export function clientIpFromRequest(req: Request) { return req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"; }
