import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { getSnapClient } from "@/lib/midtrans";
import { auditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BodySchema = z.object({
  plan: z.enum(["starter", "growth"]),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { plan } = parsed.data;
  const amount = plan === "starter" ? 99000 : 249000;
  const orderId = `rzq_${Date.now()}_${session.uid}_${Math.random().toString(36).substring(2, 6)}`;

  try {
    const snap = getSnapClient();
    const planLabel = plan === "starter" ? "Starter Plan (30 hari)" : "Growth Plan (30 hari)";
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      item_details: [
        {
          id: plan,
          price: amount,
          quantity: 1,
          name: planLabel,
        },
      ],
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: session.name,
        email: session.email,
      },
    });

    const db = getDb();
    db.prepare(`
      INSERT INTO transactions (id, user_id, amount, plan, status, payment_type)
      VALUES (?, ?, ?, ?, 'pending', NULL)
    `).run(orderId, session.uid, amount, plan);

    auditLog({
      user_id: session.uid,
      action: "payment.checkout",
      target: orderId,
      status: "ok",
      message: `Created snap token for plan ${plan.toUpperCase()} (amount: ${amount})`,
    });

    return NextResponse.json({
      ok: true,
      order_id: orderId,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (e) {
    console.error("[checkout api error]:", e);
    auditLog({
      user_id: session.uid,
      action: "payment.checkout",
      target: orderId,
      status: "fail",
      message: e instanceof Error ? e.message : "Midtrans initialization failed",
    });
    return NextResponse.json(
      { error: "Gagal menghubungi gateway pembayaran Midtrans" },
      { status: 502 }
    );
  }
}
