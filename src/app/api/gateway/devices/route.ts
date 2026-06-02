import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const baseUrl = process.env.WA_GATEWAY_URL || "http://wa_gateway:3000";
  const apiKey = process.env.WA_GATEWAY_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "WA_GATEWAY_API_KEY belum diset" }, { status: 500 });
  const res = await fetch(`${baseUrl}/api/devices`, { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": apiKey }, body: JSON.stringify({ name: body.name || "Rizquna WA", webhookUrl: body.webhookUrl || null }) });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
