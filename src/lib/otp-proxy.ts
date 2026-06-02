const OTP_BASE = process.env.OTP_INTERNAL_URL || "https://otp.rizquna.id";
const hop = new Set(["host","connection","content-length","accept-encoding"]);
export async function proxyOtp(req: Request, path: string, init?: RequestInit) {
  const headers = new Headers();
  req.headers.forEach((v,k)=>{ if(!hop.has(k.toLowerCase())) headers.set(k,v); });
  headers.set("content-type", headers.get("content-type") || "application/json");
  const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.text();
  const upstream = await fetch(`${OTP_BASE}${path}`, { method: init?.method || req.method, headers, body, cache: "no-store" });
  const text = await upstream.text();
  return new Response(text, { status: upstream.status, headers: { "content-type": upstream.headers.get("content-type") || "application/json" } });
}
