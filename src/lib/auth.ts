import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "rzq_session";
const ALG = "HS256";

function getSecret() {
  const raw = process.env.AUTH_SECRET;
  if (!raw || raw.length < 32) {
    throw new Error("AUTH_SECRET env var must be set and at least 32 chars long");
  }
  return new TextEncoder().encode(raw);
}

export type SessionPayload = {
  uid: number;
  email: string;
  name: string;
  pwdHashPart?: string;
};

export async function signSession(payload: SessionPayload, maxAgeSeconds = 60 * 60 * 24 * 7) {
  return await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${maxAgeSeconds}s`)
    .sign(getSecret());
}

export async function verifySessionCryptographically(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: [ALG] });
    return {
      uid: payload.uid as number,
      email: payload.email as string,
      name: payload.name as string,
      pwdHashPart: payload.pwdHashPart as string | undefined,
    };
  } catch {
    return null;
  }
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  const payload = await verifySessionCryptographically(token);
  if (!payload) return null;

  try {
    // Dynamic import to avoid loading better-sqlite3 in Edge/middleware runtime
    const { getDb } = await import("./db");
    const db = getDb();
    const user = db.prepare("SELECT password_hash FROM users WHERE id = ?").get(payload.uid) as { password_hash: string } | undefined;
    if (!user) return null;

    const expectedPart = user.password_hash.substring(0, 10);
    if (payload.pwdHashPart !== expectedPart) return null;

    return payload;
  } catch {
    return null;
  }
}


export async function getSession(): Promise<SessionPayload | null> {
  const c = await cookies();
  const token = c.get(COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(token: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const c = await cookies();
  c.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export async function clearSessionCookie() {
  const c = await cookies();
  c.delete(COOKIE);
}

export const SESSION_COOKIE = COOKIE;
