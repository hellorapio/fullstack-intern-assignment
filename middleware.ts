import { NextRequest, NextResponse } from "next/server";
import { verify } from "./helpers/jwt";
import { JOSEError } from "jose/errors";

interface CustomRequest extends NextRequest {
  user?: { username: string };
}

export async function middleware(req: CustomRequest) {
  const token = req.headers.get("Authorization");

  if (!token || !token?.startsWith("Bearer"))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const decoded = await verify(token.split(" ")[1]);
    //@ts-ignore
    req.user = decoded;
  } catch (error) {
    return NextResponse.json(
      { message: (error as JOSEError).message },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/protected/:path*",
};
