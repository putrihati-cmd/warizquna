import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { listAuditLogs } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const limit = Math.min(200, Math.max(10, Number(url.searchParams.get("limit") || 50)));
  const logs = listAuditLogs(session.uid, limit);
  return NextResponse.json({ logs });
}