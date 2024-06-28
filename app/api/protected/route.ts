import { NextResponse } from "next/server";
import { CustomRequest } from "../types";
import { verify } from "@/helpers/jwt";

export async function GET(req: CustomRequest) {
  const token = req.headers.get("Authorization");
  const decoded = await verify(token?.split(" ")[1] || "");
  return NextResponse.json({
    data: "Very Protected Data",
    user: decoded.username,
  });
}
