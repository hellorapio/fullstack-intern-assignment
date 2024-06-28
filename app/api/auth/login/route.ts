import { sign } from "@/helpers/jwt";
import { loginSchema } from "@/helpers/zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validData = await loginSchema.safeParseAsync(body);

  if (!validData.success)
    return NextResponse.json(
      { message: "Invalid Email or Password" },
      { status: 400 }
    );

  return NextResponse.json({
    token: await sign({ username: body.username }),
  });
}
