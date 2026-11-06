import { getT } from "@/lib/i18n-server";
import { NextResponse } from "next/server";
import { CONTACTS, vaultGrams } from "@/lib/data";
import { quoteAt } from "@/lib/pricing";

// Validates a transfer and returns a receipt. Demo only: nothing is stored and no gold moves.
export async function POST(req: Request) {
  const { t } = await getT();
  const body = await req.json().catch(() => null);
  const grams = Number(body?.grams);
  const to = CONTACTS.find((c) => c.id === body?.to);
  if (!to) return NextResponse.json({ error: t("Choose a verified Melody client to send to.", "اختر عميلاً موثَّقاً في ميلودي لترسل إليه.") }, { status: 400 });
  if (!Number.isFinite(grams) || grams < 0.001) return NextResponse.json({ error: t("Enter at least 0.001 g.", "أدخل 0.001 غ على الأقل.") }, { status: 400 });
  const available = vaultGrams();
  if (grams > available) return NextResponse.json({ error: t(`You have ${available.toFixed(3)} g available. Enter a smaller amount.`, `رصيدك المتاح ${available.toFixed(3)} غ. أدخل كمية أقل.`) }, { status: 400 });
  const { mid } = quoteAt();
  return NextResponse.json({
    demo: true,
    reference: `TR-${Date.now().toString(36).toUpperCase()}`,
    to,
    grams: Math.round(grams * 1000) / 1000,
    valueToday: Math.round(grams * mid * 100) / 100,
    remaining: Math.round((available - grams) * 1000) / 1000,
    message: typeof body?.message === "string" ? body.message.slice(0, 140) : "",
  });
}
