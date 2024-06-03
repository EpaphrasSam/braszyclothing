import { NextRequest, NextResponse } from "next/server";
import { categoryMiddleware } from "@/middlewares/categoryMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";
import {
  emailProtectedRoutes,
  protectedRoutes,
  publicRoutes,
} from "./lib/constants/routes.tsx";

export const config = {
  matcher: "/:path*",
};

const allAuthRoutes = [
  ...protectedRoutes,
  ...publicRoutes,
  ...emailProtectedRoutes,
];

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
