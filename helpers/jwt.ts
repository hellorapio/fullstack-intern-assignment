import { SignJWT, jwtVerify } from "jose";

const secretKey = "VerySecretKeeeey";
const key = new TextEncoder().encode(secretKey);

export async function sign(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour from now")
    .sign(key);
}

export async function verify(token: string) {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
