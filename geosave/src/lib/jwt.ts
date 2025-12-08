import jwt, { SignOptions } from "jsonwebtoken";

export interface payload {
  id: string;
  role: "user" | "admin";
  email?: string;
  // добавь, что нужно
}

const SECRET = process.env.JWT_SECRET;

export function generateToken(
  payload: payload,
  expiresIn: string | number = "1h"
): string {
  const options: SignOptions = { expiresIn: expiresIn };
  return jwt.sign(payload, SECRET!, options);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET!);
  } catch (error) {
    return error;
  }
}
