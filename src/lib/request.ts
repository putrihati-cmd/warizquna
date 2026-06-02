import { NextResponse } from "next/server";
import { z } from "zod";

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

type ParsedRequest<T> =
  | { success: true; data: T }
  | { success: false; response: NextResponse };

export async function parseBody<T extends z.ZodTypeAny>(req: Request, schema: T): Promise<ParsedRequest<z.output<T>>> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return {
      success: false,
      response: NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }),
    };
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      ),
    };
  }

  return { success: true, data: parsed.data };
}
