import { describe, it, expect, beforeEach, vi } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rate-limit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should allow requests up to capacity", () => {
    const key = "test-key-1";
    for (let i = 0; i < 5; i++) {
      const res = rateLimit({ key, capacity: 5 });
      expect(res.ok).toBe(true);
    }
    const res = rateLimit({ key, capacity: 5 });
    expect(res.ok).toBe(false);
    expect(res.retryAfterMs).toBeGreaterThan(0);
  });

  it("should refill tokens over time", () => {
    const key = "test-key-2";
    // Consume 5 tokens
    for (let i = 0; i < 5; i++) {
      rateLimit({ key, capacity: 5, refillPerSecond: 1 });
    }
    // Blocked
    expect(rateLimit({ key, capacity: 5, refillPerSecond: 1 }).ok).toBe(false);

    // Wait 2 seconds
    vi.advanceTimersByTime(2000);

    // Should have refilled 2 tokens
    expect(rateLimit({ key, capacity: 5, refillPerSecond: 1 }).ok).toBe(true);
    expect(rateLimit({ key, capacity: 5, refillPerSecond: 1 }).ok).toBe(true);
    expect(rateLimit({ key, capacity: 5, refillPerSecond: 1 }).ok).toBe(false);
  });
});
