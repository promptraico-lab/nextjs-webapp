// middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // You'll need to install it: npm i jsonwebtoken

export function middleware(request) {
  const token = request.cookies.get("promptr-auth-token")?.value;
  const pathname = request.nextUrl.pathname;

  // If user is on /login and already authenticated, redirect to /admin/dashboard
  if (pathname === "/login" && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } catch (err) {
      // Invalid/expired token, let them see login
      return NextResponse.next();
    }
  }

  // If not authenticated and not on /login, redirect to /login
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated and path does NOT start with /admin or /login, redirect to /admin/dashboard
  if (token && pathname !== "/login") {
    try {
      jwt.verify(token, process.env.JWT_SECRET);

      if (!pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    } catch (err) {
      // Invalid/expired token, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Otherwise, allow request (e.g., /login for unauthenticated users)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
