import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/src/lib/jwt";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("jwt")?.value;

  if (!cookie) {
    return NextResponse.json({ role: null }, { status: 200 });
  }

  const payload = verifyToken(cookie);

  if (!payload) {
    return NextResponse.json({ role: null }, { status: 200 });
  }

  return NextResponse.json({ role: payload.role }, { status: 200 });
}
