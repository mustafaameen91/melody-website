"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AreaChart, useHistory } from "@/components/Chart";
import { Icon } from "@/components/Icon";
import { usePrices } from "@/components/PriceProvider";
import { PRODUCTS, TYPE_AR, productPrice } from "@/lib/data";
import { usd } from "@/lib/format";
import { RANGES, type Range } from "@/lib/pricing";
import { localeOf, type Lang } from "@/lib/i18n";
import { useLang, useT } from "@/components/Lang";

const fmtDate = (iso: string, range: Range, lang: Lang) =>
  new Date(iso).toLocaleDateString(localeOf(lang), range === "1D" ? { hour: "2-digit", minute: "2-digit" } : range === "5Y" ? { year: "numeric" } : { day: "numeric", month: "short" }).toUpperCase();

const RANGE_AR: Record<Range, string> = { "1D": "يوم", "1W": "أسبوع", "1M": "شهر", "6M": "6 أشهر", "1Y": "سنة", "5Y": "5 سنوات" };

export function PriceBoard() {
  const t = useT();
  const lang = useLang();
  const [range, setRange] = useState<Range>("1M");
  const pts = useHistory(range);
  const { quote } = usePrices();
  const labels = pts ? [0, 1, 2, 3, 4, 5, 6].map((i) => pts[Math.round((i / 6) * (pts.length - 1))]) : [];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40, gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 30, fontSize: 13, color: "var(--on-dark-muted)", flexWrap: "wrap" }}>
          <span>{t("Day range", "نطاق اليوم")} <b className="num" style={{ color: "var(--on-dark)", fontWeight: 500 }}>{usd(quote.dayLow)} – {usd(quote.dayHigh)}</b></span>
          <span>{t("Per ounce", "للأونصة")} <b className="num" style={{ color: "var(--on-dark)", fontWeight: 500 }}>{usd(quote.ounce)}</b></span>
          <span>{t("Per kilo", "للكيلوغرام")} <b className="num" style={{ color: "var(--on-dark)", fontWeight: 500 }}>{usd(quote.kilo, 0)}</b></span>
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <span className="sample" style={{ color: "var(--on-dark-muted)" }}>{t("SAMPLE DATA", "بيانات تجريبية")}</span>
          <div className="tf" role="tablist" aria-label={t("Chart range", "المدة الزمنية للرسم البياني")}>
            {(Object.keys(RANGES) as Range[]).map((r) => <button key={r} role="tab" aria-selected={r === range} className={r === range ? "on" : ""} onClick={() => setRange(r)}>{lang === "ar" ? RANGE_AR[r] : r}</button>)}
          </div>
        </div>
      </div>
      <div dir="ltr">
      <div style={{ marginTop: 30, marginRight: 60, borderBottom: "1px solid var(--gold-line)" }}>
        <AreaChart points={pts} height={380} axis />
      </div>
      <div className="num" style={{ display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.1em", color: "var(--on-dark-muted)", marginTop: 12, paddingRight: 60, minHeight: 16 }}>
        {labels.map((p, i) => <span key={i}>{p ? fmtDate(p.t, range, lang) : ""}</span>)}
      </div>
      </div>
    </>
  );
}

export function BarTable() {
  const t = useT();
  const ar = useLang() === "ar";
  const { quote } = usePrices();
  const rows = [...PRODUCTS].filter((p) => p.type !== "Gift set").sort((a, b) => a.weightG - b.weightG);
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="t" style={{ marginTop: 36 }}>
        <thead><tr><th>{t("Bar", "السبيكة")}</th><th>{t("Type", "النوع")}</th><th className="r">{t("You buy", "تشتري بـ")}</th><th className="r">{t("Per gram", "للغرام")}</th><th className="r">{t("We buy back", "نشتري منك بـ")}</th></tr></thead>
        <tbody>
          {rows.map((p) => { const pr = productPrice(p, quote.sell); return (
            <tr key={p.slug}><td className="serif" style={{ fontSize: 20 }}>{ar ? p.weightLabelAr : p.weightLabel}</td><td>{ar ? TYPE_AR[p.type] : p.type}</td><td className="r num">{usd(pr.total)}</td><td className="r num muted">{usd(pr.perGram)}</td><td className="r num">{usd(quote.buy * p.weightG)}</td></tr>
          ); })}
          <tr><td className="serif" style={{ fontSize: 20 }}>{t("Saved gold", "الذهب المدَّخر")}</td><td>{t("Grams in vault", "غرامات في الخزنة")}</td><td className="r num">{usd(quote.sell)} / {t("g", "غ")}</td><td className="r num muted">—</td><td className="r num">{usd(quote.buy)} / {t("g", "غ")}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

type Alert = { id: number; direction: "above" | "below"; price: number };

export function Alerts() {
  const t = useT();
  const ar = useLang() === "ar";
  const [dir, setDir] = useState<"above" | "below">("above");
  const [price, setPrice] = useState("150.00");
  const [list, setList] = useState<Alert[]>([{ id: 1, direction: "above", price: 150 }, { id: 2, direction: "below", price: 140 }]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    const res = await fetch("/api/alerts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ direction: dir, price: Number(price) }) }).catch(() => null);
    const data = res ? await res.json() : { error: t("Could not reach the server. Try again.", "تعذّر الاتصال بالخادم. حاول مرة أخرى.") };
    setBusy(false);
    if (!res?.ok) return setError(data.error);
    setList((l) => [{ ...data.alert, id: Date.now() }, ...l]);
  };
  return (
    <form id="alerts" className="panel" style={{ padding: 34, scrollMarginTop: 160 }} onSubmit={submit}>
      <h3 style={{ fontSize: 30 }}>{t("Price alerts", "تنبيهات الأسعار")}</h3>
      <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>{t("We'll notify you in the app and by SMS.", "سنُعلمك عبر التطبيق والرسائل النصية.")}</p>
      <div className="field" style={{ marginTop: 22 }}><label>{t("Notify me when gold", "أعلمني عندما")}</label>
        <div className="seg">{(["above", "below"] as const).map((d) => <span key={d} role="button" tabIndex={0} className={dir === d ? "on" : ""} onClick={() => setDir(d)} onKeyDown={(e) => e.key === "Enter" && setDir(d)}>{d === "above" ? t("Rises above", "يرتفع الذهب فوق") : t("Falls below", "ينخفض الذهب دون")}</span>)}</div>
      </div>
      <div className="field" style={{ marginTop: 16 }}><label htmlFor="alert-price">{t("Price per gram", "السعر للغرام")}</label>
        <div className="input"><span className="serif" style={{ fontSize: 26 }}>$</span><input id="alert-price" className="input-el num serif" style={{ fontSize: 26 }} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
        {error && <div className="field-error" role="alert">{error}</div>}
      </div>
      <button className="btn btn-dark" style={{ width: "100%", marginTop: 22 }} disabled={busy}>{busy ? t("Setting…", "جارٍ الضبط…") : t("Set alert", "اضبط التنبيه")}</button>
      <div className="demo-note" style={{ marginTop: 14 }}><Icon name="bell" size={15} />{t("Demo: alerts show here but are not saved or sent yet.", "تجريبي: تظهر التنبيهات هنا لكنها لا تُحفظ ولا تُرسل بعد.")}</div>
      <div style={{ marginTop: 14 }}>
        <AnimatePresence initial={false}>
          {list.map((a) => (
            <motion.div key={a.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="alert-row">
              <Icon name="bell" style={{ color: "var(--gold)" }} /><span style={{ flex: 1 }}>{a.direction === "above" ? t("Above", "فوق") : t("Below", "دون")} {ar ? <span className="num">{usd(a.price)}</span> : usd(a.price)}</span><span className="chip chip-green">{t("Active", "نشط")}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </form>
  );
}
