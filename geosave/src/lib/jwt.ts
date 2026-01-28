import jwt, { SignOptions } from "jsonwebtoken";

export interface Payload {
  id: number;
  role: "user" | "admin";
  email?: string;
}

const SECRET = process.env.JWT_SECRET;

export function generateToken(
  payload: Payload,
  expiresIn: `${number}${"s" | "m" | "h" | "d" | "w"}` | number = "1h",
): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET!, options);
}

export function verifyToken(token: string) {
  if (!SECRET) throw new Error("JWT_SECRET is not defined");
  try {
    return jwt.verify(token, SECRET!) as {
      id: number;
      username: string;
      role: string;
    };
  } catch (error) {
    throw new Error("Invalid token", { cause: error });
  }
}
