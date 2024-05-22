import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { auth } from "@/utils/auth";

const protectedRoutes = ["/admin"];
const publicRoutes = ["/login", "/register"];

export async function authMiddleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET!,
    salt: process.env.NEXTAUTH_SALT || "random_salt",
  });

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
