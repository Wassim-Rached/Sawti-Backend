import jwt from "jsonwebtoken";

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  const signingKey = process.env.JWT_SECRET || "secret";

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "HS256",
  });
}

export function verifyJwt(token: string) {
  const secretKey = process.env.JWT_SECRET || "secret";

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (e: any) {
    console.error(e);
    return null;
  }
}
