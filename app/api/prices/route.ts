import { NextResponse } from "next/server";
import { quoteAt } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(quoteAt());
}
