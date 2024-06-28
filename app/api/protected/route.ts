import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "Very Protected Data" });
}
