import { NextResponse } from "next/server";
import { getT } from "@/lib/i18n-server";
import { getFactory, isAction } from "@/lib/factories";

// Checks a factory request and returns a reference.
// Demo only: nothing is stored and nothing is sent to the factory yet.
export async function POST(req: Request) {
  const { t } = await getT();
  const b = await req.json().catch(() => null);
  const factory = getFactory(String(b?.factory ?? ""));
  if (!factory || !isAction(b?.action)) return NextResponse.json({ error: t("Choose a factory and a request type.", "اختر مصنعاً ونوع الطلب.") }, { status: 400 });

  const s = (k: string, max = 200) => (typeof b?.[k] === "string" ? b[k].trim().slice(0, max) : "");
  const n = (k: string) => Number(String(b?.[k] ?? "").replace(/,/g, ""));
  const errors: Record<string, string> = {};

  if (s("fullName").length < 3) errors.fullName = t("Enter your full name.", "أدخل اسمك الكامل.");
  if (s("phone").replace(/\D/g, "").length < 8) errors.phone = t("Enter a phone number we can call, with at least 8 digits.", "أدخل رقم هاتف يمكننا الاتصال به، من 8 أرقام على الأقل.");
  if (s("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s("email"))) errors.email = t("Check the email address, for example name@example.com.", "تحقّق من البريد الإلكتروني، مثلاً name@example.com.");
  if (b?.consent !== true) errors.consent = t("Tick the box so the factory can contact you.", "ضع علامة في المربع ليتمكن المصنع من التواصل معك.");

  if (b.action === "invest") {
    const amt = n("amount");
    if (!Number.isFinite(amt) || amt < factory.minInvestUsd) errors.amount = t(`The minimum at this factory is $${factory.minInvestUsd.toLocaleString("en-US")}.`, `الحد الأدنى في هذا المصنع ${factory.minInvestUsd.toLocaleString("en-US")} دولار.`);
    if (!["6", "12", "24", "36"].includes(s("term"))) errors.term = t("Choose a term.", "اختر المدة.");
  }
  if (b.action === "buy") {
    if (!factory.products.some((p) => p.en === s("product"))) errors.product = t("Choose a product.", "اختر منتجاً.");
    const q = n("quantity");
    if (!Number.isInteger(q) || q < 1 || q > 10000) errors.quantity = t("Enter a quantity from 1 to 10,000.", "أدخل كمية من 1 إلى 10,000.");
  }
  if (b.action === "sell") {
    const g = n("weight");
    if (!Number.isFinite(g) || g <= 0 || g > 1_000_000) errors.weight = t("Enter the weight in grams, for example 25.5.", "أدخل الوزن بالغرام، مثلاً 25.5.");
    if (!["24", "22", "21", "18"].includes(s("karat"))) errors.karat = t("Choose the karat.", "اختر العيار.");
    if (s("visitDate") && s("visitDate") < new Date().toISOString().slice(0, 10)) errors.visitDate = t("Choose today or a later date.", "اختر تاريخ اليوم أو تاريخاً لاحقاً.");
  }

  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });
  return NextResponse.json({ demo: true, reference: `FR-${Date.now().toString(36).toUpperCase()}`, replyHours: factory.replyHours });
}
