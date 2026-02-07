import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Only run on /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 2. Allow access to the login page (to avoid infinite redirects)
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 3. Check for the auth cookie
  const session = request.cookies.get("admin_session");

  // 4. If no cookie, redirect to login page
  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match all admin routes
  matcher: ["/admin/:path*"],
};