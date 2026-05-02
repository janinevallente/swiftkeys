// ─────────────────────────────────────────────────────────────
//  Middleware — runs on every matched request before rendering
//  Handles: auth guards, redirects, locale, headers
// ─────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PUBLIC_ROUTES, ROUTES, SESSION_COOKIE } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Auth guard ───────────────────────────────────────────
  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!isPublic && !token) {
    // Not authenticated — redirect to login
    const loginUrl = new URL(ROUTES.login, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && (pathname === ROUTES.login || pathname === ROUTES.register)) {
    // Already authenticated — redirect away from auth pages
    return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
  }

  // ── Security headers ─────────────────────────────────────
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  // Skip static files and Next internals
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
