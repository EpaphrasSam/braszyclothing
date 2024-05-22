import { NextRequest, NextResponse } from "next/server";
import { categoryMiddleware } from "@/middlewares/categoryMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";

export const config = {
  matcher: "/:path*",
};

const protectedRoutes = ["/admin"];
const publicRoutes = ["/login", "/register"];
const allAuthRoutes = [...protectedRoutes, ...publicRoutes];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/shop")) {
    const response = categoryMiddleware(request);
    if (response) return response;
  }

  if (allAuthRoutes.some((route) => pathname.startsWith(route))) {
    const response = await authMiddleware(request);
    if (response) return response;
  }

  return NextResponse.next();
}
