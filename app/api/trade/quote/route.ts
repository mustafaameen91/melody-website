import { getT } from "@/lib/i18n-server";
import { NextResponse } from "next/server";
import { quoteAt } from "@/lib/pricing";

// Prices an order. Demo only: orders are never executed.
export async function POST(req: Request) {
  const { t } = await getT();
  const body = await req.json().catch(() => null);
  const side = body?.side === "sell" ? "sell" : "buy";
  const grams = Number(body?.grams);
  if (!Number.isFinite(grams) || grams < 1) return NextResponse.json({ error: t("The minimum order is 1 g.", "الحد الأدنى للطلب 1 غ.") }, { status: 400 });
  const q = quoteAt();
  const price = side === "buy" ? q.sell : q.buy;
  return NextResponse.json({ demo: true, side, grams, pricePerGram: price, total: Math.round(price * grams * 100) / 100, heldForSeconds: 60 });
}
