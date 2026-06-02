import { proxyOtp } from "@/lib/otp-proxy";
export const dynamic = "force-dynamic";
export async function POST(req: Request) { return proxyOtp(req, "/api/v1/otp/send"); }
