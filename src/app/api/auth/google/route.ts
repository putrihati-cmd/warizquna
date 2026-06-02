import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!clientId || !appUrl) {
    return NextResponse.json(
      { error: "Google OAuth is not configured" },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const redirectParam = url.searchParams.get("redirect");

  const state = crypto.randomBytes(32).toString("hex");

  console.log(`[Google OAuth Sign In] Initiating login. AppUrl: ${appUrl}, State: ${state}, RedirectParam: ${redirectParam}`);

  const redirectUri = `${appUrl}/api/auth/callback/google`;

  const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent("openid email profile")}` +
    `&state=${encodeURIComponent(state)}` +
    `&access_type=offline` +
    `&prompt=consent`;

  const response = NextResponse.redirect(googleAuthUrl);

  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600, // 10 minutes
  });

  if (redirectParam) {
    response.cookies.set("oauth_redirect", redirectParam, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600, // 10 minutes
    });
  }

  return response;
}
