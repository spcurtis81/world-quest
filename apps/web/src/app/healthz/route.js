import { NextResponse } from "next/server";

// Force Node runtime for maximum compatibility
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ status: "ok", time: new Date().toISOString() });
}
