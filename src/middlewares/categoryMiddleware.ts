import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedSlugs = ["men", "women"];

export const categoryMiddleware = (request: NextRequest) => {
  const url = request.nextUrl;
  const pathSegments = url.pathname
    .split("/")
    .filter((segment) => segment !== "");

  let slug;
  if (pathSegments.length > 1) {
    slug = pathSegments.pop();
  }

  if (!slug) {
    return NextResponse.rewrite(
      new URL(`/shop/${allowedSlugs[0]}`, request.url)
    );
  }

  if (!allowedSlugs.includes(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next();
};
