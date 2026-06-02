import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "rzq_session";
const ALG = "HS256";

function getSecret() {
  const raw = process.env.AUTH_SECRET;
  if (!raw || raw.length < 32) {
    throw new Error("AUTH_SECRET env var must be set and at least 32 chars long");
  }
  return new TextEncoder().encode(raw);
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicRoute = ["/login", "/register", "/forgot-password", "/reset-password"].some(
    (p) => path === p || path.startsWith(p + "/")
  );
  const isProtectedRoute = ["/dashboard", "/account", "/admin", "/contacts"].some(
    (p) => path === p || path.startsWith(p + "/")
  );

  if (!isPublicRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  let sessionValid = false;
  if (token) {
    try {
      const secret = getSecret();
      await jwtVerify(token, secret, { algorithms: [ALG] });
      sessionValid = true;
    } catch {
      sessionValid = false;
    }
  }

  if (isProtectedRoute && !sessionValid) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(redirectUrl);
  }

  if (isPublicRoute && sessionValid) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/admin/:path*",
    "/contacts/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password"
  ],
};
