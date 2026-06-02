import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateApiKey } from "@/lib/api-auth";
import { auditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TextMessage = z.object({
  to: z.string().regex(/^[0-9]{8,18}$/, "to must be 8-18 digits"),
  type: z.literal("text"),
  text: z.object({ body: z.string().min(1).max(4096) }),
});

const TemplateMessage = z.object({
  to: z.string().regex(/^[0-9]{8,18}$/, "to must be 8-18 digits"),
  type: z.literal("template"),
  template: z.object({
    name: z.string().min(1).max(100),
    language: z.object({ code: z.string().min(2).max(10) }).optional(),
    components: z.array(z.unknown()).optional(),
  }),
});

const Body = z.discriminatedUnion("type", [TextMessage, TemplateMessage]);

export async function POST(req: Request) {
  const auth = authenticateApiKey(req);
  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.error },
      { status: auth.status, headers: auth.rateLimitHeaders }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const baseUrl = process.env.WA_GATEWAY_URL || "http://wa_gateway:3000";
  const gwApiKey = process.env.WA_GATEWAY_API_KEY || "rizquna-api-key-2026";
  const sessionName = process.env.WA_GATEWAY_SESSION || "session-1779285324109";

  // wa-gateway expects /api/send-message {sessionName, to, message}.
  // For text: send body directly. Template messages are flattened into a string fallback
  // until the upstream supports template-aware payloads.
  const targetMessage =
    parsed.data.type === "text"
      ? parsed.data.text.body
      : `[template:${parsed.data.template.name}] ${
          (parsed.data.template.components ?? []).map((c) => JSON.stringify(c)).join(" ")
        }`;

  let upstreamStatus = 0;
  let upstreamBody = "";
  try {
    const res = await fetch(`${baseUrl}/api/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": gwApiKey,
      },
      body: JSON.stringify({
        sessionName,
        to: parsed.data.to,
        message: targetMessage,
      }),
      signal: AbortSignal.timeout(15000),
    });
    upstreamStatus = res.status;
    upstreamBody = (await res.text()).slice(0, 500);
  } catch (e) {
    auditLog({
      user_id: auth.key.user_id,
      api_key_id: auth.key.id,
      action: "messages.send",
      target: parsed.data.to,
      status: "fail",
      message: e instanceof Error ? e.message : "Gateway error",
    });
    return NextResponse.json({ error: "Gateway unreachable" }, { status: 502 });
  }

  if (upstreamStatus < 200 || upstreamStatus >= 300) {
    auditLog({
      user_id: auth.key.user_id,
      api_key_id: auth.key.id,
      action: "messages.send",
      target: parsed.data.to,
      status: "fail",
      message: `Gateway ${upstreamStatus}: ${upstreamBody.slice(0, 120)}`,
    });
    return NextResponse.json(
      { error: `Gateway ${upstreamStatus}`, body: upstreamBody },
      { status: 502 }
    );
  }

  auditLog({
    user_id: auth.key.user_id,
    api_key_id: auth.key.id,
    action: "messages.send",
    target: parsed.data.to,
    status: "ok",
    message: `type=${parsed.data.type}`,
  });
  return NextResponse.json(
    {
      ok: true,
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type: parsed.data.type,
      upstream_status: upstreamStatus,
    },
    { headers: auth.rateLimitHeaders }
  );
}