import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS, productPrice } from "@/lib/data";
import { quoteAt } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const types = q.getAll("type");
  const { sell } = quoteAt();
  let list = PRODUCTS.map((p) => ({ ...p, ...productPrice(p, sell) }));
  if (types.length) list = list.filter((p) => types.includes(p.type));
  if (q.get("inStock") === "1") list = list.filter((p) => p.stock !== "pre");
  const max = Number(q.get("maxPrice"));
  if (max > 0) list = list.filter((p) => p.total <= max);
  const sort = q.get("sort");
  if (sort === "price-desc") list.sort((a, b) => b.total - a.total);
  else if (sort === "per-gram") list.sort((a, b) => a.perGram - b.perGram);
  else list.sort((a, b) => a.weightG - b.weightG);
  return NextResponse.json({ products: list, sellPerGram: sell, sample: true });
}
