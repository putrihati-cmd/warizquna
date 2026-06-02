import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const startedAt = Date.now();
  let dbOk = false;
  let userCount: number | null = null;
  let error: string | null = null;
  try {
    const db = getDb();
    const row = db.prepare<[], { c: number }>("SELECT COUNT(*) as c FROM users").get();
    userCount = row?.c ?? 0;
    dbOk = true;
  } catch (e) {
    error = e instanceof Error ? e.message : "unknown";
  }

  let waOk: boolean | null = null;
  const waUrl = process.env.WA_GATEWAY_URL || "http://wa_gateway:3000";
  try {
    const res = await fetch(`${waUrl}/`, { signal: AbortSignal.timeout(2000) });
    waOk = res.ok || res.status === 401 || res.status === 302;
  } catch {
    waOk = false;
  }

  const ok = dbOk;
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { status: ok ? "ok" : "degraded" },
      { status: ok ? 200 : 503 }
    );
  }

  return NextResponse.json(
    {
      status: ok ? "ok" : "degraded",
      uptimeSeconds: Math.round(process.uptime()),
      checks: { db: dbOk, gateway: waOk },
      userCount,
      latencyMs: Date.now() - startedAt,
      version: process.env.APP_VERSION || "1.4.0",
      timestamp: new Date().toISOString(),
      error,
    },
    { status: ok ? 200 : 503 }
  );
}
