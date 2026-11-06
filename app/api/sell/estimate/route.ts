import { getT } from "@/lib/i18n-server";
import { NextResponse } from "next/server";
import { quoteAt } from "@/lib/pricing";

export async function POST(req: Request) {
  const { t } = await getT();
  const body = await req.json().catch(() => null);
  const grams = Number(body?.grams);
  const qty = Math.max(1, Math.floor(Number(body?.quantity) || 1));
  if (!Number.isFinite(grams) || grams <= 0) return NextResponse.json({ error: t("Choose a bar weight.", "اختر وزن السبيكة.") }, { status: 400 });
  const { buy } = quoteAt();
  return NextResponse.json({ demo: true, buyPerGram: buy, total: Math.round(buy * grams * qty * 100) / 100, heldForMinutes: 10 });
}
