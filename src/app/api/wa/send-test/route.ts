import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { rateLimit, clientIpFromRequest } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const cleanPhone = (val: unknown) => {
  if (typeof val !== "string") return val;
  let cleaned = val.replace(/[^0-9+]/g, "");
  if (cleaned.startsWith("+")) cleaned = cleaned.slice(1);
  if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
  return cleaned;
};

const Schema = z.object({
  to: z.preprocess(cleanPhone, z.string().regex(/^[0-9]{8,18}$/, "Nomor tujuan tidak valid")),
  text: z.string().min(1).max(1000),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ip = clientIpFromRequest(req);
  const rl = rateLimit({ key: `send-test:${session.uid}:${ip}`, capacity: 10, refillPerSecond: 0.2 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Coba lagi nanti." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const apiKey = process.env.WA_GATEWAY_API_KEY;
  const baseUrl = process.env.WA_GATEWAY_URL;
  const sessionName = process.env.WA_GATEWAY_SESSION;

  if (!apiKey || !baseUrl || !sessionName) {
    return NextResponse.json(
      { error: "Service Unavailable: Gateway keys or session not configured" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${baseUrl}/api/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        sessionName,
        to: parsed.data.to,
        message: parsed.data.text,
      }),
      signal: AbortSignal.timeout(15000),
    });
    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { error: `Gateway ${res.status}: ${text.slice(0, 160)}` },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, status: res.status, body: text.slice(0, 200) });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gagal hubungi gateway" },
      { status: 502 }
    );
  }
}