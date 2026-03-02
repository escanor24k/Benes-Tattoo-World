import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/session";

const PUBLIC_ROUTES = ["/", "/portfolio", "/kontakt", "/zertifikate", "/impressum", "/datenschutz", "/agb", "/login"];
const API_AUTH_ROUTES = ["/api/auth"];
const INTERNAL_PREFIX = "/control";
const AUTH_ROUTE = "/login";

// has to be named proxy instead of middleware to avoid conflicts with next.js internal middleware!
export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const isPublic =
    PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/")) ||
    API_AUTH_ROUTES.some((r) => pathname.startsWith(r)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".");

  if (isPublic) return NextResponse.next();

  const token = request.cookies.get("session")?.value;
  const session = token ? await verifySession(token) : null;

  if (!session && pathname.startsWith(INTERNAL_PREFIX)) {
    return NextResponse.redirect(new URL(AUTH_ROUTE, request.url));
  }

  if (session && pathname === AUTH_ROUTE) {
    return NextResponse.redirect(new URL(INTERNAL_PREFIX, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
