import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import bcrypt from "bcrypt";
import { generateToken } from "@/src/lib/jwt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { login, password } = body;

  if (!login || !password) {
    return NextResponse.json(
      { error: "Login und Passwort sind erforderlich" },
      { status: 400 },
    );
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", login)
    .single();

  if (error || !user) {
    return NextResponse.json(
      { error: "Benutzer nicht gefunden" },
      { status: 401 },
    );
  }

  if (user.role === "admin") {
    if (password !== user.password) {
      return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
    }
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
    }
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
    email: user.email,
  });
  const response = NextResponse.json({
    success: true,
    id: user.id,
    role: user.role,
    email: user.email,
  });
  response.cookies.set({
    name: "jwt",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}
