import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function detectLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  return header.toLowerCase().includes("en") ? "en" : "uk";
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = new URL(`/${locale}`, request.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/"],
};
