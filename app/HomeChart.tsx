"use client";
import { AreaChart, useHistory } from "@/components/Chart";
import { LiveNum } from "@/components/Live";
import { usePrices } from "@/components/PriceProvider";
import { getProduct, productPrice } from "@/lib/data";
import { usd } from "@/lib/format";
import { useLang, useT } from "@/components/Lang";

export function HomeChart() {
  const pts = useHistory("1M");
  const { quote } = usePrices();
  const t = useT();
  const ar = useLang() === "ar";
  const first = pts?.[0]?.v;
  const diff = first ? quote.mid - first : 0;
  const rows = ["1g-gold-bar", "10g-gold-bar", "100g-gold-bar"].map((s) => getProduct(s)!);
  return (
    <div className="panel-dark" style={{ padding: "36px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
        <div><div className="eyebrow plain" style={{ color: "var(--on-dark-muted)" }}>{t("Gold 24K · per gram · 30 days", "ذهب عيار 24 · للغرام · 30 يوماً")}</div><div className="big-num" style={{ fontFamily: "var(--serif)", fontSize: 64, lineHeight: 1.1, marginTop: 6, fontWeight: 600 }}><LiveNum field="mid" className="gold-text shimmer" /></div></div>
        {first && <span className="num" style={{ color: diff >= 0 ? "var(--up-on-dark)" : "#F3A6A6" }}>{diff >= 0 ? "+" : "−"}{usd(Math.abs(diff))} ({((diff / first) * 100).toFixed(1)}%)</span>}
      </div>
      <div style={{ marginTop: 18, borderBottom: "1px solid var(--rule-dark)" }}><AreaChart points={pts} height={170} grid={false} /></div>
      <table className="t" style={{ marginTop: 22, color: "var(--on-dark)" }}>
        <thead><tr><th style={{ color: "var(--on-dark-muted)", borderColor: "var(--gold-line)" }}>{t("Bar", "السبيكة")}</th><th className="r" style={{ color: "var(--on-dark-muted)", borderColor: "var(--gold-line)" }}>{t("You buy", "تشتري بـ")}</th><th className="r" style={{ color: "var(--on-dark-muted)", borderColor: "var(--gold-line)" }}>{t("We buy back", "نشتري منك بـ")}</th></tr></thead>
        <tbody>
          {rows.map((p, i) => {
            const pr = productPrice(p, quote.sell);
            const b = i === rows.length - 1 ? { borderBottom: 0 } : { borderColor: "var(--rule-dark)" };
            return <tr key={p.slug}><td style={b}>{ar ? p.weightLabelAr : p.weightLabel}</td><td className="r num" style={b}>{usd(pr.total)}</td><td className="r num" style={b}>{usd(quote.buy * p.weightG)}</td></tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}
