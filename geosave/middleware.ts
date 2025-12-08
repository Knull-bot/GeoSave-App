import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;

  if (!token) {
    if (path === "/savebutton" || path === "/all-tasks") {
      url.pathname = "/sign-in";
      url.searchParams.set("from", path);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (path.startsWith("/all-tasks") && payload.role !== "admin") {
      url.pathname = "/forbidden";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT error:", err);
    url.pathname = "/sign-in";
    url.searchParams.set("from", path);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/savebutton", "/all-tasks", "/admin/:path*"],
};
