import { proxyOtp } from "@/lib/otp-proxy";
export const dynamic = "force-dynamic";
export async function GET(req: Request, ctx: { params: Promise<{ requestId: string }> }) { const { requestId } = await ctx.params; return proxyOtp(req, `/api/v1/otp/status/${encodeURIComponent(requestId)}`); }
