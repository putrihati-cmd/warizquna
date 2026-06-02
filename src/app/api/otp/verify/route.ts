import { proxyOtp } from "@/lib/otp-proxy";
import { getSession } from "@/lib/auth";
import { authenticateApiKey } from "@/lib/api-auth";
import { rateLimit, clientIpFromRequest } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const auth = authenticateApiKey(req);
  let userId: number | string | undefined = undefined;
  if (auth.ok) {
    userId = auth.key.user_id;
  } else {
    const session = await getSession();
    if (session) {
      userId = session.uid;
    }
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = clientIpFromRequest(req);
  const rl = rateLimit({ key: `otp-verify:${userId}:${ip}`, capacity: 10, refillPerSecond: 0.2 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );
  }

  return proxyOtp(req, "/api/v1/otp/verify");
}
