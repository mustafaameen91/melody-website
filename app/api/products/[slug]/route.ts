import { getT } from "@/lib/i18n-server";
import { NextResponse } from "next/server";
import { getProduct, productPrice } from "@/lib/data";
import { quoteAt } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { t } = await getT();
  const p = getProduct((await params).slug);
  if (!p) return NextResponse.json({ error: t("Product not found.", "المنتج غير موجود.") }, { status: 404 });
  const q = quoteAt();
  return NextResponse.json({ ...p, ...productPrice(p, q.sell), buyBack: Math.round(q.buy * p.weightG * 100) / 100, sample: true });
}
