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
    console.error("[midtrans webhook] Invalid signature verification failed.");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = getDb();
  
  // 2. Fetch corresponding transaction
  const tx = db.prepare("SELECT * FROM transactions WHERE id = ?").get(order_id) as any;
  if (!tx) {
    console.error(`[midtrans webhook] Transaction not found for order_id: ${order_id}`);
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  // Determine final status
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
  }

  // 3. Update transaction status
  db.prepare(`
    UPDATE transactions
    SET status = ?, payment_type = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(finalStatus, payment_type || null, order_id);

  // 4. If payment was successful, upgrade user plan
  if (isSuccess) {
    db.prepare(`
      UPDATE users
      SET plan = ?
      WHERE id = ?
    `).run(tx.plan.toLowerCase(), tx.user_id);

    auditLog({
      user_id: tx.user_id,
      action: "payment.success",
      target: order_id,
      status: "ok",
      message: `Midtrans payment successful. Plan upgraded to ${tx.plan.toUpperCase()}. Amount: ${tx.amount}`,
    });
  } else if (["cancel", "deny", "expire"].includes(finalStatus)) {
    auditLog({
      user_id: tx.user_id,
      action: "payment.failed",
      target: order_id,
      status: "fail",
      message: `Midtrans payment status: ${finalStatus.toUpperCase()} (order_id: ${order_id})`,
    });
  }

  return NextResponse.json({ ok: true, status: finalStatus });
}
