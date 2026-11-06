"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { useLang, useT } from "@/components/Lang";
import { Tween } from "@/components/Motion";
import { usePrices } from "@/components/PriceProvider";
import { PRODUCTS } from "@/lib/data";
import { usd } from "@/lib/format";

const WEIGHTS = PRODUCTS.filter((p) => p.type !== "Gift set");

export function Estimator() {
  const t = useT();
  const ar = useLang() === "ar";
  const { quote } = usePrices();
  const [source, setSource] = useState<"vault" | "bar">("vault");
  const [w, setW] = useState("100g-gold-bar");
  const [qty, setQty] = useState(1);
  const [sealed, setSealed] = useState(true);
  const [locked, setLocked] = useState<number | null>(null);
  const [left, setLeft] = useState(600);
  const grams = WEIGHTS.find((x) => x.slug === w)!.weightG;
  const total = grams * qty * quote.buy;

  useEffect(() => {
    if (locked === null) return;
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [locked]);

  const lock = async () => {
    const res = await fetch("/api/sell/estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ grams, quantity: qty }) }).catch(() => null);
    const data = res?.ok ? await res.json() : null;
    setLocked(data?.total ?? total);
    setLeft(600);
  };

  return (
    <div style={{ background: "var(--paper)", color: "var(--ink)", padding: 36, boxShadow: "0 40px 80px rgba(30,3,6,0.45)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ fontSize: 32 }}>{t("Instant estimate", "تقدير فوري")}</h3><span className="sample muted">{t("SAMPLE", "تجريبي")}</span></div>
      <div className="seg" style={{ marginTop: 22 }}>{([["vault", t("From my vault", "من خزنتي")], ["bar", t("A bar I hold", "سبيكة بحوزتي")]] as const).map(([k, l]) => <span key={k} role="button" tabIndex={0} className={source === k ? "on" : ""} onClick={() => setSource(k)}>{l}</span>)}</div>
      <div className="g2" style={{ gap: 14, marginTop: 20 }}>
        <div className="field"><label htmlFor="bw">{t("Bar weight", "وزن السبيكة")}</label>
          <div className="input"><select id="bw" value={w} onChange={(e) => { setW(e.target.value); setLocked(null); }} style={{ border: 0, background: "transparent", width: "100%", outline: 0, fontSize: 15 }}>{WEIGHTS.map((p) => <option key={p.slug} value={p.slug}>{ar ? p.weightLabelAr : p.weightLabel}</option>)}</select></div>
        </div>
        <div className="field"><label>{t("Quantity", "الكمية")}</label>
          <div className="input" style={{ justifyContent: "space-between" }}><button aria-label={t("One less", "واحدة أقل")} onClick={() => { setQty((q) => Math.max(1, q - 1)); setLocked(null); }}>−</button><span className="num">{qty}</span><button aria-label={t("One more", "واحدة أكثر")} onClick={() => { setQty((q) => q + 1); setLocked(null); }}>+</button></div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {source === "bar" && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
            <div className="field" style={{ marginTop: 16 }}><label>{t("Condition", "الحالة")}</label><div className="seg"><span role="button" tabIndex={0} className={sealed ? "on" : ""} onClick={() => setSealed(true)}>{t("Sealed", "مختومة")}</span><span role="button" tabIndex={0} className={!sealed ? "on" : ""} onClick={() => setSealed(false)}>{t("Unsealed", "غير مختومة")}</span></div><span className="helper">{t("Unsealed bars are assayed at the showroom before payment.", "تُفحص السبائك غير المختومة في صالة العرض قبل الدفع.")}</span></div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="card-surface" style={{ marginTop: 24, padding: "22px 24px", color: "var(--on-dark)" }}>
        <div className="eyebrow plain">{locked !== null ? t("Price locked", "تم تثبيت السعر") : t("We pay you today", "ندفع لك اليوم")}</div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 52, fontWeight: 600, lineHeight: 1.1, marginTop: 4 }}><Tween value={locked ?? total} format={(n) => usd(n)} className="gold-text shimmer num" /></div>
        <div className="num" style={{ fontSize: 12, color: "var(--on-dark-muted)" }}>{usd(quote.buy)} {t("per gram", "للغرام")} · {locked !== null ? <>{t("held for", "محجوز لمدة")} <span dir="ltr">{`${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`}</span></> : t("held for 10 minutes once locked", "يُحجز لمدة 10 دقائق بعد التثبيت")}</div>
      </div>
      <button className="btn btn-dark" style={{ width: "100%", marginTop: 18 }} onClick={lock}>{locked !== null ? t("Lock a new price", "ثبّت سعراً جديداً") : t("Lock this price", "ثبّت هذا السعر")}</button>
      {locked !== null && <div className="demo-note" style={{ marginTop: 12 }}><Icon name="clock" size={15} />{t("Demo: the price is held on this screen only. No sale has been placed.", "تجريبي: السعر محجوز على هذه الشاشة فقط، ولم تُنفَّذ أي عملية بيع.")}</div>}
    </div>
  );
}
