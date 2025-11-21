import jwt, { SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function generateToken(payload: object, expiresIn: number = 10): string {
  const options: SignOptions = { expiresIn: expiresIn };
  return jwt.sign(payload, SECRET!, options);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET!);
  } catch {
    return null;
  }
}
