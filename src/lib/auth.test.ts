import { describe, it, expect, vi, beforeEach } from "vitest";
import { signSession, verifySessionCryptographically, verifySession } from "./auth";

// Mock AUTH_SECRET env var
process.env.AUTH_SECRET = "supersecretkeyatleast32characterslongforjwt";

// Mock DB
const mockGet = vi.fn();
const mockPrepare = vi.fn().mockReturnValue({ get: mockGet });
const mockDb = { prepare: mockPrepare };

vi.mock("./db", () => ({
  getDb: () => mockDb,
}));

describe("auth session", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should sign and cryptographically verify session payload", async () => {
    const payload = {
      uid: 42,
      email: "test@rizquna.id",
      name: "Test User",
      pwdHashPart: "abc123xyz",
    };
    
    const token = await signSession(payload);
    expect(token).toBeTypeOf("string");

    const verified = await verifySessionCryptographically(token);
    expect(verified).not.toBeNull();
    expect(verified?.uid).toBe(payload.uid);
    expect(verified?.email).toBe(payload.email);
    expect(verified?.name).toBe(payload.name);
    expect(verified?.pwdHashPart).toBe(payload.pwdHashPart);
  });

  it("should verify full session with database check if pwdHashPart matches", async () => {
    const payload = {
      uid: 42,
      email: "test@rizquna.id",
      name: "Test User",
      pwdHashPart: "abc123xyz_",
    };
    
    const token = await signSession(payload);

    // Mock DB response for user password hash
    mockGet.mockReturnValue({ password_hash: "abc123xyz_hashed_pwd" });

    const verified = await verifySession(token);
    expect(verified).not.toBeNull();
    expect(verified?.uid).toBe(payload.uid);
    expect(mockPrepare).toHaveBeenCalledWith("SELECT password_hash FROM users WHERE id = ?");
    expect(mockGet).toHaveBeenCalledWith(payload.uid);
  });

  it("should reject full session if pwdHashPart does not match database", async () => {
    const payload = {
      uid: 42,
      email: "test@rizquna.id",
      name: "Test User",
      pwdHashPart: "abc123xyz_",
    };
    
    const token = await signSession(payload);

    // Mock DB response with DIFFERENT hash
    mockGet.mockReturnValue({ password_hash: "different_hash" });

    const verified = await verifySession(token);
    expect(verified).toBeNull();
  });
});
