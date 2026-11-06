"use client";
// Live price figures that tween and flash when the 30-second quote changes.
import { useEffect, useState, type CSSProperties } from "react";
import { usePrices } from "./PriceProvider";
import { Tween } from "./Motion";
import { usd } from "@/lib/format";
import { localeOf } from "@/lib/i18n";
import { useLang } from "./Lang";
import type { Quote } from "@/lib/pricing";

type Field = "mid" | "sell" | "buy" | "ounce" | "kilo";

export function LiveNum({ field, times = 1, dp = 2, className = "", style }: { field: Field; times?: number; dp?: number; className?: string; style?: CSSProperties }) {
  const { quote, prev } = usePrices();
  const value = quote[field] * times;
  const [flash, setFlash] = useState("");
  useEffect(() => {
    if (!prev) return;
    const d = quote[field] - prev[field];
    if (!d) return;
    setFlash(d > 0 ? "flash-up" : "flash-down");
    const t = setTimeout(() => setFlash(""), 1400);
    return () => clearTimeout(t);
  }, [quote, prev, field]);
  return <Tween value={value} format={(n) => usd(n, dp)} className={`num ${flash} ${className}`} style={style} />;
}

export function LiveChange({ className = "", style, withAmount = false }: { className?: string; style?: CSSProperties; withAmount?: boolean }) {
  const { quote } = usePrices();
  const up = quote.change >= 0;
  const pct = `${up ? "+" : "−"}${Math.abs(quote.changePct).toFixed(2)}%`;
  return <span className={`num ${className}`} style={{ color: up ? "var(--up-on-dark)" : "#F3A6A6", ...style }}>{withAmount ? `${up ? "+" : "−"}${usd(Math.abs(quote.change))} · ${pct}` : pct}</span>;
}

export function LiveTime({ prefix }: { prefix?: string }) {
  const { quote } = usePrices();
  const lang = useLang();
  prefix ??= lang === "ar" ? "آخر تحديث " : "Updated ";
  const t = new Date(quote.updatedAt).toLocaleTimeString(localeOf(lang), { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Baghdad" });
  return <span suppressHydrationWarning>{prefix}{t}</span>;
}

export function useQuote(): Quote {
  return usePrices().quote;
}
