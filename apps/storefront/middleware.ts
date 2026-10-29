import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RETIRED = /^\/products\/(?:orp[-_])?semaglutide(?:[-_].*)?$/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (RETIRED.test(pathname)) {
    return NextResponse.redirect(new URL("/shop", request.url), 301);
  }
  const response = NextResponse.next();
  if (process.env.NEXT_PUBLIC_STAGING === "true") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
