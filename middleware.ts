import { NextRequest, NextResponse } from "next/server";
import { verify } from "./helpers/jwt";
import { JOSEError } from "jose/errors";

export async function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization");

  if (!token || !token?.startsWith("Bearer"))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await verify(token.split(" ")[1]);
  } catch (error) {
    return NextResponse.json({ message: (error as JOSEError).message });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/protected/:path*",
};
