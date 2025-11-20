import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value || null;

  if (token) {
    try {
      verifyToken(token);
      return NextResponse.next();
    } catch (err) {
      console.log("Invalid token");
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = "/sign-in";
  url.searchParams.set("from", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/logged-in/:path*", "/dashboard/:path*"],
};
