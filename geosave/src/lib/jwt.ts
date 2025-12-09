import jwt, { SignOptions } from "jsonwebtoken";

export interface payload {
  id: string;
  role: "user" | "admin";
  email?: string;
}

const SECRET = process.env.JWT_SECRET;

export function generateToken(
  payload: payload,
  expiresIn: string | number = "1h",
  username: string,
  role: string
): string {
  const options: SignOptions = { expiresIn: expiresIn };
  return jwt.sign(payload, SECRET!, options);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET!) as {
      id: number;
      username: string;
      role: string;
    };
  } catch (error) {
    return null;
  }
}
