import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_SIGN_IN_PATH = "/sign-in";
const DASHBOARD_ROOT_PATH = "/dashboard";

function isAuthRoute(pathname: string): boolean {
  return pathname === AUTH_SIGN_IN_PATH;
}

function isProtectedRoute(pathname: string): boolean {
  return (
    pathname.startsWith(DASHBOARD_ROOT_PATH) ||
    pathname.startsWith("/devices") ||
    pathname.startsWith("/attendance-records")
  );
}

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname, origin } = req.nextUrl;

  const requestingAuth = isAuthRoute(pathname);
  const requestingProtected = isProtectedRoute(pathname);

  if (!token && requestingProtected) {
    return NextResponse.redirect(new URL(AUTH_SIGN_IN_PATH, origin));
  }

  if (token && requestingAuth) {
    return NextResponse.redirect(new URL(DASHBOARD_ROOT_PATH, origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/dashboard/:path*",
    "/devices/:path*",
    "/attendance-records/:path*",
  ],
};
