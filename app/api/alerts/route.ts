import { getT } from "@/lib/i18n-server";
import { NextResponse } from "next/server";

// Demo only: alerts are echoed back, not stored or sent.
export async function POST(req: Request) {
  const { t } = await getT();
  const body = await req.json().catch(() => null);
  const price = Number(body?.price);
  const direction = body?.direction === "below" ? "below" : "above";
  if (!Number.isFinite(price) || price <= 0) return NextResponse.json({ error: t("Enter a price per gram, for example 150.00.", "أدخل سعراً للغرام، مثلاً 150.00.") }, { status: 400 });
  return NextResponse.json({ demo: true, alert: { direction, price: Math.round(price * 100) / 100 } });
}
