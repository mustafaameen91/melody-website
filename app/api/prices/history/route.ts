import { getT } from "@/lib/i18n-server";
import { NextRequest, NextResponse } from "next/server";
import { historyFor, RANGES, type Range } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { t } = await getT();
  const r = (req.nextUrl.searchParams.get("range") ?? "1M").toUpperCase();
  if (!(r in RANGES)) return NextResponse.json({ error: t(`Unknown range. Use one of ${Object.keys(RANGES).join(", ")}.`, `فترة غير معروفة. استخدم إحدى: ${Object.keys(RANGES).join("، ")}.`) }, { status: 400 });
  return NextResponse.json({ range: r, points: historyFor(r as Range), sample: true });
}
