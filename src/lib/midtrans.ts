// @ts-ignore
import midtransClient from "midtrans-client";

export function getSnapClient() {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.MIDTRANS_CLIENT_KEY;

  if (!serverKey || !clientKey) {
    throw new Error("Midtrans keys not configured. Set MIDTRANS_SERVER_KEY and MIDTRANS_CLIENT_KEY environment variables.");
  }

  const isProd = process.env.MIDTRANS_IS_PRODUCTION === "true";
  return new midtransClient.Snap({
    isProduction: isProd,
    serverKey,
    clientKey,
  });
}
