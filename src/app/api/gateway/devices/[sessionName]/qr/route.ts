import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
export const dynamic = "force-dynamic";
export async function GET(_req: Request, ctx: { params: Promise<{ sessionName: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { sessionName } = await ctx.params;
  const baseUrl = process.env.WA_GATEWAY_URL || "http://wa_gateway:3000";
  const apiKey = process.env.WA_GATEWAY_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "WA_GATEWAY_API_KEY belum diset" }, { status: 500 });
  const res = await fetch(`${baseUrl}/api/devices/${encodeURIComponent(sessionName)}/qr`, { headers: { "x-api-key": apiKey }, cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
