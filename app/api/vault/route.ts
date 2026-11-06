import { NextResponse } from "next/server";
import { VAULT, vaultGrams } from "@/lib/data";
import { quoteAt } from "@/lib/pricing";

export const dynamic = "force-dynamic";

// Sample account until sign-in and the real ledger exist.
export function GET() {
  const { buy } = quoteAt();
  const grams = vaultGrams();
  return NextResponse.json({ ...VAULT, grams, value: Math.round(grams * buy * 100) / 100, buyPerGram: buy, sample: true });
}
