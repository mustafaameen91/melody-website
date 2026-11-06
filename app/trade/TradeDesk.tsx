"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { AreaChart, useHistory } from "@/components/Chart";
import { Icon } from "@/components/Icon";
import { LiveNum } from "@/components/Live";
import { Reveal, Tween } from "@/components/Motion";
import { usePrices } from "@/components/PriceProvider";
import { VAULT } from "@/lib/data";
import { grams as g, usd } from "@/lib/format";
import type { Range } from "@/lib/pricing";
import { useLang, useT } from "@/components/Lang";

// Arabic grams ("10.000 غ"): globals.css forces span.num to ltr, which would put the unit on the wrong side.
const RTL = { direction: "rtl" } as const;
const SIDE_AR: Record<string, string> = { Buy: "شراء", Sell: "بيع", "Limit · open": "أمر محدد · مفتوح" };
// Wraps a left-to-right value (e.g. "$1,515.30") so it keeps its order inside Arabic text.
const iso = (v: string) => `\u2066${v}\u2069`;
const RANGE_AR: Partial<Record<Range, string>> = { "1D": "يوم", "1W": "أسبوع", "1M": "شهر", "1Y": "سنة" };

export function TradeDesk() {
  const { quote } = usePrices();
  const t = useT();
  const lang = useLang();
  const ar = lang === "ar";
  const PAY = [["cash", t("Cash balance", "الرصيد النقدي"), usd(VAULT.cash)], ["card", t("Debit or credit card", "بطاقة خصم أو ائتمان"), "•••• 4821"], ["bank", t("Bank transfer", "تحويل مصرفي"), t("1–2 days", "1–2 يوم")]];
  const [range, setRange] = useState<Range>("1W");
  const pts = useHistory(range);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [type, setType] = useState<"market" | "limit">("market");
  const [amount, setAmount] = useState("10.000");
  const [limit, setLimit] = useState("145.00");
  const [pay, setPay] = useState("cash");
  const [held, setHeld] = useState(52);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const grams = Number(amount) || 0;
  const price = type === "limit" ? Number(limit) || 0 : side === "buy" ? quote.sell : quote.buy;
  const total = grams * price;
  const first = pts?.[0]?.v;

  useEffect(() => { const id = setInterval(() => setHeld((s) => (s > 0 ? s - 1 : 59)), 1000); return () => clearInterval(id); }, []);

  const submit = async () => {
    setBusy(true); setError(""); setResult(null);
    const res = await fetch("/api/trade/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ side, grams }) }).catch(() => null);
    const data = res ? await res.json() : { error: t("Could not reach the server. Try again.", "تعذّر الاتصال بالخادم. حاول مرة أخرى.") };
    setBusy(false);
    if (!res?.ok) return setError(data.error);
    const ppg = usd(type === "limit" ? price : data.pricePerGram), tot = usd(type === "limit" ? total : data.total);
    setResult(ar
      ? `تجريبي: ${side === "buy" ? "شراء" : "بيع"} ${g(data.grams, lang)} بسعر ${iso(ppg)} للغرام، بإجمالي ${iso(tot)}. لا تُنفَّذ الأوامر في هذه النسخة.`
      : `Demo: ${side === "buy" ? "buying" : "selling"} ${g(data.grams)} at ${ppg} / g = ${tot}. Orders are not executed in this version.`);
  };

  return (
    <div className="split" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: 24, marginTop: 30, alignItems: "flex-start" }}>
      <div>
        <Reveal className="panel-dark" style={{ padding: "34px 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span className="eyebrow plain" style={{ color: "var(--on-dark-muted)" }}>{t("Gold 24K · 999.9 · per gram", "ذهب عيار 24 · 999.9 · للغرام")}</span>
            <div className="tf">{(["1D", "1W", "1M", "1Y"] as Range[]).map((r) => <button key={r} className={r === range ? "on" : ""} onClick={() => setRange(r)}>{ar ? RANGE_AR[r] ?? r : r}</button>)}</div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 18, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--serif)", fontSize: 68, lineHeight: 1, fontWeight: 600 }}><LiveNum field="mid" className="gold-text shimmer" /></span>
            {first && (() => { const pct = `${quote.mid >= first ? "+" : "−"}${Math.abs(((quote.mid - first) / first) * 100).toFixed(1)}%`; const color = quote.mid >= first ? "var(--up-on-dark)" : "#F3A6A6";
              return ar
                ? <span style={{ color }}><span className="num">{pct}</span> {range === "1D" ? "اليوم" : range === "1W" ? "هذا الأسبوع" : range === "1M" ? "هذا الشهر" : "هذا العام"}</span>
                : <span className="num" style={{ color }}>{quote.mid >= first ? "+" : "−"}{Math.abs(((quote.mid - first) / first) * 100).toFixed(1)}% this {range === "1D" ? "day" : range === "1W" ? "week" : range === "1M" ? "month" : "year"}</span>; })()}
            <span className="sample" style={{ color: "var(--on-dark-muted)" }}>{t("SAMPLE", "تجريبي")}</span>
          </div>
          <div style={{ marginTop: 24, borderBottom: "1px solid var(--gold-line)" }}><AreaChart points={pts} height={230} /></div>
          <div className="g2" style={{ gap: 14, marginTop: 26 }}>
            <button className="qbox" style={{ textAlign: "start", outline: side === "buy" ? "1px solid var(--pale-gold)" : "none" }} onClick={() => setSide("buy")}><span>{t("YOU BUY AT", "تشتري بسعر")}</span><b><LiveNum field="sell" /> <small style={{ font: "400 13px var(--sans)", color: "var(--on-dark-muted)" }}>{t("/ g", "/ غ")}</small></b></button>
            <button className="qbox" style={{ textAlign: "start", outline: side === "sell" ? "1px solid var(--pale-gold)" : "none" }} onClick={() => setSide("sell")}><span>{t("YOU SELL AT", "تبيع بسعر")}</span><b><LiveNum field="buy" /> <small style={{ font: "400 13px var(--sans)", color: "var(--on-dark-muted)" }}>{t("/ g", "/ غ")}</small></b></button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="panel" style={{ padding: "30px 32px", marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ fontSize: 28 }}>{t("Recent trades", "آخر الصفقات")}</h3><span className="link">{t("Statement", "كشف الحساب")}</span></div>
          <div style={{ overflowX: "auto" }}>
            <table className="t" style={{ marginTop: 20, fontSize: 13 }}>
              <thead><tr><th>{t("Date", "التاريخ")}</th><th>{t("Order", "الأمر")}</th><th className="r">{t("Amount", "الكمية")}</th><th className="r">{t("Total", "الإجمالي")}</th></tr></thead>
              <tbody>{VAULT.trades.map((tr) => (
                <tr key={tr.date}><td>{ar ? tr.dateAr : tr.date}</td><td><span className={`chip ${tr.side === "Buy" ? "chip-green" : tr.side === "Sell" ? "chip-soft" : "chip-amber"}`}>{ar ? SIDE_AR[tr.side] : tr.side}</span></td><td className="r num">{g(tr.grams, lang)}<div className="muted" style={{ fontSize: 11 }}>@ {usd(tr.price)}</div></td><td className="r num">{usd(tr.grams * tr.price)}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="panel" style={{ padding: 32 }}>
        <h3 style={{ fontSize: 30 }}>{t("New order", "أمر جديد")}</h3>
        <div className="seg" style={{ marginTop: 20 }}>{(["buy", "sell"] as const).map((s) => <span key={s} role="button" tabIndex={0} className={side === s ? "on" : ""} onClick={() => setSide(s)}>{ar ? (s === "buy" ? "شراء" : "بيع") : s}</span>)}</div>
        <div className="field" style={{ marginTop: 22 }}><label htmlFor="amt">{t("Amount", "الكمية")}</label>
          <div className="input" style={{ height: 76 }}><input id="amt" className="input-el num serif" style={{ fontSize: 38 }} inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} /><span className="muted">{t("grams", "غرام")}</span></div>
          <span className="helper">{t("Minimum 1 g. Fractions to 0.001 g.", "الحد الأدنى 1 غ، وبكسور حتى 0.001 غ.")}</span>
        </div>
        <div className="pills" style={{ marginTop: 14 }}>{[1, 5, 10, 50, 100].map((n) => <button key={n} className={`pill${grams === n ? " on" : ""}`} onClick={() => setAmount(n.toFixed(3))}>{n} {t("g", "غ")}</button>)}</div>
        <div className="field" style={{ marginTop: 20 }}><label>{t("Order type", "نوع الأمر")}</label><div className="seg">{(["market", "limit"] as const).map((ot) => <span key={ot} role="button" tabIndex={0} className={type === ot ? "on" : ""} onClick={() => setType(ot)}>{ar ? (ot === "market" ? "بسعر السوق" : "بسعر محدد") : ot}</span>)}</div></div>
        <AnimatePresence>
          {type === "limit" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
              <div className="field" style={{ marginTop: 16 }}><label htmlFor="lim">{side === "buy" ? t("Buy when price falls to", "اشترِ عندما ينخفض السعر إلى") : t("Sell when price rises to", "بِع عندما يرتفع السعر إلى")}</label><div className="input"><span>$</span><input id="lim" className="input-el num" value={limit} onChange={(e) => setLimit(e.target.value)} inputMode="decimal" /><span className="muted">{t("/ g", "/ غ")}</span></div></div>
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ marginTop: 20 }}>
          <div className="row"><span>{t("Price per gram", "سعر الغرام")}</span><span className="num">{usd(price)}</span></div>
          <div className="row"><span>{t("Amount", "الكمية")}</span><span className="num" style={ar ? RTL : undefined}>{g(grams, lang)}</span></div>
          <div className="row"><span>{t("Service fee", "رسوم الخدمة")}</span><span>{t("[Fee]", "[الرسوم]")}</span></div>
          <div className="row" style={{ borderBottom: 0, alignItems: "baseline" }}><span style={{ color: "var(--ink)", fontWeight: 600 }}>{t("Total", "الإجمالي")}</span><Tween value={total} format={(n) => usd(n)} className="num serif" style={{ fontSize: 32, color: "var(--maroon)" }} /></div>
        </div>
        {side === "buy" && (
          <div className="field" style={{ marginTop: 12 }}><label>{t("Pay with", "الدفع عبر")}</label>
            {PAY.map(([id, l, r]) => <button key={id} className={`pay${pay === id ? " on" : ""}`} onClick={() => setPay(id)}><span className="radio" />{l}<span className="muted" style={{ marginInlineStart: "auto" }}>{r}</span></button>)}
          </div>
        )}
        {error && <div className="field-error" role="alert">{error}</div>}
        <button className="btn btn-dark" style={{ width: "100%", height: 58, marginTop: 24 }} disabled={busy} onClick={submit}>{busy ? t("Pricing…", "جارٍ التسعير…") : ar ? `${side === "buy" ? "اشترِ" : "بِع"} ${grams || 0} غ من الذهب · ${iso(usd(total))}` : `${side === "buy" ? "Buy" : "Sell"} ${grams || 0} g of gold · ${usd(total)}`}</button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 14, fontSize: 12, color: "var(--muted)" }}><Icon name="clock" size={15} />{ar ? <>يُثبَّت السعر لمدة <span className="num" dir="ltr">0:{String(held).padStart(2, "0")}</span> عند المتابعة</> : <>Price held for 0:{String(held).padStart(2, "0")} once you continue</>}</div>
        <AnimatePresence>{result && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="demo-note" style={{ marginTop: 16 }} role="status"><Icon name="check" size={15} />{result}</motion.div>}</AnimatePresence>
        <div style={{ marginTop: 22, padding: "16px 18px", background: "var(--stone)", fontSize: 13, display: "flex", gap: 12 }}><Icon name="vault" size={18} style={{ color: "var(--maroon)" }} /><span>{t("Bought gold goes straight to your vault, allocated to you. Turn it into a bar and have it delivered at any time.", "يُضاف الذهب الذي تشتريه مباشرةً إلى خزنتك، مخصَّصاً باسمك. يمكنك تحويله إلى سبيكة واستلامه متى شئت.")}</span></div>
      </Reveal>
    </div>
  );
}
