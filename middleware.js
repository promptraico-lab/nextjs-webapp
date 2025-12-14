// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get JWT token from cookie
  const token = request.cookies.get("promptr-auth-token")?.value;
  const isAuthenticated = !!token;

  // Always allow /api routes through
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Pages that unauthenticated users can access
  const publicPages = ["/login", "/register", "/404", "/verify-email"];

  if (!isAuthenticated) {
    // If not authenticated and not accessing a public page, redirect to /login
    // Also allow verify-email routes (including /verify-email/[token])
    if (
      !publicPages.includes(pathname) &&
      !pathname.startsWith("/verify-email")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Allow access to public pages and verify-email routes
    return NextResponse.next();
  }

  // If authenticated and accessing /login, /register, /verify-email, or /404, redirect to dashboard
  if (
    pathname !== "/404" &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/verify-email")
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Otherwise, allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
