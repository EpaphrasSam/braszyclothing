import { NextRequest, NextResponse } from "next/server";
import { categoryMiddleware } from "@/middlewares/categoryMiddleware";

export const config = {
  matcher: "/:path*",
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/categories")) {
    const response = categoryMiddleware(request);
    if (response) return response;
  }

  return NextResponse.next();
}
