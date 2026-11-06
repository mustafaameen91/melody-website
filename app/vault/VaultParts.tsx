"use client";
import { motion } from "motion/react";
import { Tween } from "@/components/Motion";
import { usePrices } from "@/components/PriceProvider";
import { usd } from "@/lib/format";
import { useLang, useT } from "@/components/Lang";

export function VaultValue({ grams, started }: { grams: number; started: number }) {
  const { quote } = usePrices();
  const t = useT();
  const ar = useLang() === "ar";
  const value = grams * quote.buy;
  const gain = value - started;
  return (
    <div style={{ display: "flex", gap: 28, marginTop: 16, fontSize: 15, color: "var(--on-dark-muted)", flexWrap: "wrap" }}>
      <span>{t("Value at buy-back price", "القيمة بسعر الاسترداد")} <Tween value={value} format={(n) => usd(n)} className="num" style={{ color: "var(--on-dark)", fontWeight: 500 }} /></span>
      {ar
        ? <span style={{ color: gain >= 0 ? "var(--up-on-dark)" : "#F3A6A6" }}><span className="num">{gain >= 0 ? "+" : "−"}{usd(Math.abs(gain))} ({((gain / started) * 100).toFixed(1)}%)</span> منذ أن بدأت</span>
        : <span className="num" style={{ color: gain >= 0 ? "var(--up-on-dark)" : "#F3A6A6" }}>{gain >= 0 ? "+" : "−"}{usd(Math.abs(gain))} ({((gain / started) * 100).toFixed(1)}%) since you started</span>}
    </div>
  );
}

const DATA = [11.6, 11.8, 11.7, 12.0, 11.9, 12.2, 12.1, 12.4, 12.3, 12.6, 12.7, 12.98];

export function VaultSpark() {
  const W = 300, H = 120, min = Math.min(...DATA), max = Math.max(...DATA);
  const d = DATA.map((v, i) => `${i ? "L" : "M"}${(i / (DATA.length - 1)) * W} ${4 + (1 - (v - min) / (max - min)) * (H - 8)}`).join(" ");
  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <motion.path d={d} fill="none" stroke="#F2C98A" strokeWidth="1.8" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.6, ease: [0.2, 0.7, 0.2, 1] }} />
    </svg>
  );
}
