import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/utils/auth/auth";
import { protectedRoutes, publicRoutes } from "@/lib/constants/routes";

export async function authMiddleware(request: NextRequest) {
  const session = await auth();
  const token = session?.user;

  const { pathname } = request.nextUrl;

  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    const url = new URL("/", request.url);
    url.searchParams.set("error", "You must be logged in to access this page.");
    return NextResponse.redirect(url);
  }

  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin")) {
    if (!token?.admin) {
      const url = new URL("/", request.url);
      url.searchParams.set(
        "error",
        "You do not have permission to access this page."
      );
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
