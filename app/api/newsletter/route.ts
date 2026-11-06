import { getT } from "@/lib/i18n-server";
import { NextResponse } from "next/server";

// Demo only: the address is validated but not saved anywhere.
export async function POST(req: Request) {
  const { t } = await getT();
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: t("Enter a valid email address.", "أدخل بريداً إلكترونياً صحيحاً.") }, { status: 400 });
  return NextResponse.json({ demo: true, email });
}
