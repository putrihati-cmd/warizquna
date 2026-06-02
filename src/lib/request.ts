import { NextResponse } from "next/server";
import { z } from "zod";

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
