import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getDb } from "@/lib/db";
import { auditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
    payment_type,
    fraud_status,
  } = body;

  if (!order_id || !status_code || !gross_amount || !signature_key) {
    console.warn("[midtrans webhook] Missing required params:", { order_id, status_code, gross_amount, has_sig: !!signature_key });
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  // 1. Verify Midtrans signature
  const serverKey = process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-placeholder";
  const verificationString = order_id + status_code + gross_amount + serverKey;
  const expectedSignature = crypto
    .createHash("sha512")
    .update(verificationString)
    .digest("hex");

  if (signature_key !== expectedSignature) {
    console.error("[midtrans webhook] Invalid signature for order:", order_id);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = getDb();
  
  // 2. Fetch corresponding transaction
  const tx = db.prepare("SELECT * FROM transactions WHERE id = ?").get(order_id) as any;
  if (!tx) {
    console.error(`[midtrans webhook] Transaction not found for order_id: ${order_id}`);
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  // 3. Idempotency: don't re-process already settled/finalized transactions
  if (["settlement", "cancel", "deny", "expire", "refund"].includes(tx.status)) {
    console.log(`[midtrans webhook] Skipping already finalized tx ${order_id} (status: ${tx.status})`);
    return NextResponse.json({ ok: true, status: tx.status, message: "Already processed" });
  }

  // 4. Determine final status
  let finalStatus = "pending";
  let isSuccess = false;

  if (transaction_status === "capture") {
    if (fraud_status === "challenge") {
      finalStatus = "challenge";
    } else if (fraud_status === "accept") {
      finalStatus = "settlement";
      isSuccess = true;
    }
  } else if (transaction_status === "settlement") {
    finalStatus = "settlement";
    isSuccess = true;
  } else if (["cancel", "deny", "expire"].includes(transaction_status)) {
    finalStatus = transaction_status;
  } else if (transaction_status === "pending") {
    finalStatus = "pending";
  } else if (["refund", "partial_refund"].includes(transaction_status)) {
    finalStatus = "refund";
  }

  // 5. Update transaction status
  db.prepare(`
    UPDATE transactions
    SET status = ?, payment_type = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(finalStatus, payment_type || null, order_id);

  // 6. If payment was successful, upgrade user plan + set expiry
  if (isSuccess) {
    db.prepare(`
      UPDATE users
      SET plan = ?, plan_expires_at = datetime('now', '+30 days')
      WHERE id = ?
    `).run(tx.plan.toLowerCase(), tx.user_id);

    auditLog({
      user_id: tx.user_id,
      action: "payment.success",
      target: order_id,
      status: "ok",
      message: `Payment successful. Plan upgraded to ${tx.plan.toUpperCase()}. Amount: Rp${tx.amount.toLocaleString()}. Expires in 30 days.`,
    });

    console.log(`[midtrans webhook] ✅ Payment OK: ${order_id} → ${tx.plan} plan for user ${tx.user_id}`);
  } else if (finalStatus === "refund") {
    // On refund, downgrade user back to free
    db.prepare(`
      UPDATE users
      SET plan = 'free', plan_expires_at = NULL
      WHERE id = ?
    `).run(tx.user_id);

    auditLog({
      user_id: tx.user_id,
      action: "payment.refund",
      target: order_id,
      status: "ok",
      message: `Payment refunded. Plan downgraded to FREE. (order_id: ${order_id})`,
    });

    console.log(`[midtrans webhook] 🔄 Refund: ${order_id} → free plan for user ${tx.user_id}`);
  } else if (["cancel", "deny", "expire"].includes(finalStatus)) {
    auditLog({
      user_id: tx.user_id,
      action: "payment.failed",
      target: order_id,
      status: "fail",
      message: `Payment ${finalStatus.toUpperCase()} (order_id: ${order_id})`,
    });

    console.log(`[midtrans webhook] ❌ Payment ${finalStatus}: ${order_id}`);
  }

  return NextResponse.json({ ok: true, status: finalStatus });
}
