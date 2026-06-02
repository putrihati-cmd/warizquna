// @ts-ignore
import midtransClient from "midtrans-client";

export function getSnapClient() {
  const isProd = process.env.MIDTRANS_IS_PRODUCTION === "true";
  return new midtransClient.Snap({
    isProduction: isProd,
    serverKey: process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-placeholder",
    clientKey: process.env.MIDTRANS_CLIENT_KEY || "SB-Mid-client-placeholder",
  });
}
