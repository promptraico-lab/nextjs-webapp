// middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // You'll need to install it: npm i jsonwebtoken

export function middleware(request) {
  const token = request.cookies.get("promptr-auth-token")?.value; // read JWT cookie

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify JWT (replace "your-secret-key" with your real secret)
    jwt.verify(token, process.env.JWT_SECRET);

    const pathname = request.nextUrl.pathname;

    // If authenticated and path does NOT start with /admin, redirect to /admin/dashboard
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // Otherwise continue
    return NextResponse.next();
  } catch (err) {
    // Invalid/expired token → redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Run middleware on all routes (or adjust as needed)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // apply to all routes except static assets
};
