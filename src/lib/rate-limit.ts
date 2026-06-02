type Bucket = { tokens: number; updatedAt: number };
const buckets = new Map<string, Bucket>();
const MAX_MAP_SIZE = 5000;
let lastCleanup = Date.now();

function cleanup(now: number) {
  // Evict entries older than 10 minutes (600,000 ms)
  for (const [key, bucket] of buckets.entries()) {
    if (now - bucket.updatedAt > 600000) {
      buckets.delete(key);
    }
  }

  // Bounded size eviction
  if (buckets.size > MAX_MAP_SIZE) {
    const sorted = Array.from(buckets.entries()).sort((a, b) => a[1].updatedAt - b[1].updatedAt);
    const toRemove = buckets.size - MAX_MAP_SIZE + 1000;
    for (let i = 0; i < Math.min(toRemove, sorted.length); i++) {
      buckets.delete(sorted[i][0]);
    }
  }
}

export function rateLimit(opts: { key: string; capacity?: number; refillPerSecond?: number }) {
  const capacity = opts.capacity ?? 20;
  const refill = opts.refillPerSecond ?? capacity / 60;
  const now = Date.now();

  if (now - lastCleanup > 30000 || buckets.size > MAX_MAP_SIZE) {
    cleanup(now);
    lastCleanup = now;
  }

  const prev = buckets.get(opts.key) ?? { tokens: capacity, updatedAt: now };
  const tokens = Math.min(capacity, prev.tokens + ((now - prev.updatedAt) / 1000) * refill);

  if (tokens < 1) {
    buckets.set(opts.key, { tokens, updatedAt: now });
    return { ok: false, retryAfterMs: Math.ceil(((1 - tokens) / refill) * 1000) };
  }

  buckets.set(opts.key, { tokens: tokens - 1, updatedAt: now });
  return { ok: true, retryAfterMs: 0 };
}

export function clientIpFromRequest(req: Request) {
  return (
    (req as any).ip ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    "unknown"
  );
}
