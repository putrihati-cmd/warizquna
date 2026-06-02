import { NextResponse } from "next/server";
import { getDb, type UserRow } from "@/lib/db";
import { signSession, setSessionCookie, signPendingLinkToken } from "@/lib/auth";
import { auditLog } from "@/lib/audit";
import { cookies } from "next/headers";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${url.protocol}//${url.host}`;

  const cookieStore = await cookies();
  const oauthState = cookieStore.get("oauth_state")?.value;
  cookieStore.delete("oauth_state");

  if (!oauthState || oauthState !== state) {
    console.error("Google OAuth state verification failed.");
    return NextResponse.redirect(`${appUrl}/login?error=csrf_error`);
  }

  if (!code) {
    return NextResponse.redirect(`${appUrl}/login?error=no_code`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Google OAuth client credentials are not configured in environment variables.");
    return NextResponse.redirect(`${appUrl}/login?error=config_error`);
  }

  // Use the canonical app URL so redirect_uri matches what's registered in Google Cloud Console
  const redirectUri = `${appUrl}/api/auth/callback/google`;

  try {
    // 1. Exchange authorization code for token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      console.error("Google token exchange error:", tokenData.error_description || tokenData.error);
      return NextResponse.redirect(`${appUrl}/login?error=token_error`);
    }

    // 2. Fetch user profile details from Google userinfo API
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userRes.json();
    if (!googleUser.email) {
      console.error("Google profile did not contain email address.");
      return NextResponse.redirect(`${appUrl}/login?error=missing_email`);
    }

    const db = getDb();
    let user: UserRow | undefined;

    // A. Check if user already exists by Google ID
    user = db
      .prepare<{ google_id: string }, UserRow>("SELECT * FROM users WHERE google_id = @google_id")
      .get({ google_id: googleUser.sub });

    if (!user) {
      // B. Check if email is already registered by credential signup
      user = db
        .prepare<{ email: string }, UserRow>("SELECT * FROM users WHERE email = @email")
        .get({ email: googleUser.email });

      if (user) {
        const pendingToken = await signPendingLinkToken({
          email: googleUser.email,
          googleId: googleUser.sub,
        });

        const cookieStore = await cookies();
        cookieStore.set("pending_oauth_link", pendingToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 600, // 10 minutes
        });

        return NextResponse.redirect(`${appUrl}/login/verify-link`);
      } else {
        // C. Create a new user account (OAuth Registration)
        const passwordSentinel = `!google_oauth_${crypto.randomBytes(16).toString("hex")}`;
        const result = db
          .prepare(
            "INSERT INTO users (email, name, password_hash, google_id, plan) VALUES (?, ?, ?, ?, ?)"
          )
          .run(googleUser.email, googleUser.name || "Google User", passwordSentinel, googleUser.sub, "free");

        const newId = Number(result.lastInsertRowid);
        user = db
          .prepare<{ id: number }, UserRow>("SELECT * FROM users WHERE id = @id")
          .get({ id: newId });

        if (!user) {
          throw new Error("Failed to retrieve newly created OAuth user");
        }

        auditLog({
          user_id: user.id,
          action: "auth.register",
          status: "ok",
          message: "Registered via Google Login",
        });
      }
    }

    // 3. Issue cryptographic session JWT token
    const token = await signSession({
      uid: user.id,
      email: user.email,
      name: user.name,
      pwdHashPart: user.password_hash ? user.password_hash.substring(0, 10) : "google_auth",
    });

    await setSessionCookie(token);

    auditLog({
      user_id: user.id,
      action: "auth.login",
      status: "ok",
      message: "Logged in via Google Login",
    });

    // 4. Redirect logged-in user to dashboard or redirect target
    const cookieStore = await cookies();
    const target = cookieStore.get("oauth_redirect")?.value || "/dashboard";
    cookieStore.delete("oauth_redirect");
    return NextResponse.redirect(`${appUrl}${target}`);
  } catch (error) {
    console.error("Google Auth Callback Exception:", error);
    return NextResponse.redirect(`${appUrl}/login?error=server_error`);
  }
}
