import Link from "next/link";
import { AccountNav } from "@/components/AccountNav";
import { Icon } from "@/components/Icon";
import { CountUp, FadeIn, Item, Reveal, Stagger } from "@/components/Motion";
import { VaultValue, VaultSpark } from "./VaultParts";
import { VAULT, vaultGrams } from "@/lib/data";
import { grams as g } from "@/lib/format";
import { getT } from "@/lib/i18n-server";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t("My vault", "خزنتي") };
}

// Arabic grams ("10.000 غ"): globals.css forces span.num to ltr, which would put the unit on the wrong side.
const RTL = { direction: "rtl" } as const;
const KIND_ICON: Record<string, string> = { send: "send", buy: "swap", receive: "send", deliver: "truck" };

export default async function Vault() {
  const { lang, t } = await getT();
  const ar = lang === "ar";
  const total = vaultGrams();
  return (
    <section style={{ padding: "44px 0 120px" }}>
      <div className="wrap acc-layout">
        <AccountNav />
        <div style={{ flex: 1, minWidth: 0 }}>
          <FadeIn style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
            <div><div className="eyebrow">{ar ? <>صباح الخير، {VAULT.clientNameAr} · حساب تجريبي</> : <>Good morning, {VAULT.clientName} · sample account</>}</div><h1 style={{ fontSize: 56, marginTop: 12 }}>{ar ? <><em>خزنتي</em></> : <>My <em>vault</em></>}</h1></div>
            <div style={{ display: "flex", gap: 10 }}><Link href="/trade" className="btn btn-line btn-sm"><Icon name="plus" size={15} /> {t("Add cash", "إيداع نقدي")}</Link><Link href="/trade" className="btn btn-dark btn-sm"><Icon name="swap" size={15} /> {t("Trade", "تداول")}</Link></div>
          </FadeIn>

          <Reveal className="photo" style={{ marginTop: 30, minHeight: 400 }}>
            <img className="bg kenburns" src="/img/card-vault.jpg" alt="" style={{ objectPosition: "50% 45%" }} />
            <div className="shade" style={{ background: "linear-gradient(90deg, rgba(74,13,22,0.98) 0%, rgba(74,13,22,0.92) 52%, rgba(74,13,22,0.55) 100%)" }} />
            <div className="inner split pad-sm" style={{ position: "relative", padding: "44px 48px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 40 }}>
              <div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}><span className="eyebrow plain">{t("Gold held in your name", "الذهب المحفوظ باسمك")}</span><span className="sample" style={{ color: "var(--on-dark-muted)" }}>{t("SAMPLE", "تجريبي")}</span></div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 12, flexWrap: "wrap" }}>
                  <CountUp to={total} decimals={3} className="gold-text shimmer num big-num xl" style={{ fontFamily: "var(--serif)", fontSize: 96, fontWeight: 600, lineHeight: 1 }} />
                  <span className="serif" style={{ fontSize: 34, color: "var(--pale-gold)" }}>{t("grams", "غرام")}</span>
                </div>
                <VaultValue grams={total} started={VAULT.startedValue} />
                <div style={{ display: "flex", gap: 10, marginTop: 40, flexWrap: "wrap" }}>
                  <Link href="/trade" className="act gold">{t("Buy", "شراء")}</Link>
                  <Link href="/sell" className="act">{t("Sell", "بيع")}</Link>
                  <Link href="/transfer" className="act"><Icon name="send" size={14} />{t("Transfer", "نقل")}</Link>
                  <span className="act" title={t("Not built in this version", "غير متاح في هذه النسخة")} style={{ opacity: 0.6 }}><Icon name="truck" size={14} />{t("Deliver", "تسليم")}</span>
                </div>
              </div>
              <div className="hide-sm" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}><VaultSpark /><div style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--on-dark-muted)", marginTop: 10 }}>{t("VALUE · LAST 12 MONTHS", "القيمة · آخر 12 شهراً")}</div></div>
            </div>
          </Reveal>

          <Stagger className="panel g4" style={{ gap: 0, marginTop: 24 }}>
            <Item className="mini"><span>{t("Cash balance", "الرصيد النقدي")}</span><b className="num"><CountUp to={VAULT.cash} decimals={2} prefix="$" /></b></Item>
            <Item className="mini"><span>{t("In bars", "في سبائك")}</span><b className="num"><CountUp to={50} decimals={3} suffix={t(" g", " غ")} /></b></Item>
            <Item className="mini"><span>{t("Saved gold", "ذهب مدَّخر")}</span><b className="num"><CountUp to={38.6} decimals={3} suffix={t(" g", " غ")} /></b></Item>
            <Item className="mini"><span>{t("Open orders", "أوامر مفتوحة")}</span><b className="num">1</b></Item>
          </Stagger>

          <div className="split" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)", gap: 24, marginTop: 24, alignItems: "flex-start" }}>
            <Reveal className="panel" style={{ padding: "30px 32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ fontSize: 28 }}>{t("Gold in your name", "ذهبك باسمك")}</h3><span className="link">{t("Vault report", "تقرير الخزنة")}</span></div>
              <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{t("Held at [Vault location] · insured by [Insurer]", "محفوظ في [موقع الخزنة] · مؤمَّن لدى [شركة التأمين]")}</div>
              <div style={{ overflowX: "auto" }}><table className="t" style={{ marginTop: 18 }}>
                <thead><tr><th>{t("Holding", "الحيازة")}</th><th className="r">{t("Weight", "الوزن")}</th><th></th></tr></thead>
                <tbody>{VAULT.holdings.map((h) => (
                  <tr key={h.label}><td><div style={{ display: "flex", gap: 14, alignItems: "center" }}><span className="ph" style={{ width: 52, height: 52, display: "block", flexShrink: 0 }}><img src={h.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></span><div><div>{ar ? h.labelAr : h.label}</div><div className="muted" style={{ fontSize: 12 }}>{ar ? h.detailAr : h.detail}</div></div></div></td><td className="r num">{g(h.grams, lang)}</td><td className="r"><Icon name="cert" style={{ color: "var(--maroon)" }} /></td></tr>
                ))}</tbody>
              </table></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "18px 14px 0", fontSize: 14 }}><span className="muted">{t("Total", "الإجمالي")}</span><span className="num" style={{ fontWeight: 600, ...(ar ? RTL : {}) }}>{g(total, lang)}</span></div>
            </Reveal>
            <Reveal delay={0.1} className="panel" style={{ padding: "30px 32px" }}>
              <h3 style={{ fontSize: 28 }}>{t("Recent activity", "آخر الحركات")}</h3>
              <div style={{ marginTop: 10 }}>{VAULT.activity.map((a, i) => (
                <div key={a.title} className="feed" style={i === VAULT.activity.length - 1 ? { borderBottom: 0 } : undefined}>
                  <span className="i"><Icon name={KIND_ICON[a.kind]} size={17} style={a.kind === "receive" ? { transform: "scaleX(-1)" } : undefined} /></span>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 500 }}>{ar ? a.titleAr : a.title}</div><div className="muted" style={{ fontSize: 12 }}>{ar ? a.whenAr : a.when}</div></div>
                  <span className="num" style={{ color: a.grams > 0 ? "var(--up)" : "var(--muted)", ...(ar ? RTL : {}) }}>{ar ? `\u2066${a.grams > 0 ? "+" : "−"}${g(Math.abs(a.grams), "en").slice(0, -2)}\u2069 غ` : <>{a.grams > 0 ? "+" : "−"}{g(Math.abs(a.grams), lang)}</>}</span>
                </div>
              ))}</div>
            </Reveal>
          </div>
          <p className="helper" style={{ marginTop: 18 }}>{t("This is a sample account. Sign-in and real balances will come from the Melody backend.", "هذا حساب تجريبي. سيُتاح تسجيل الدخول والأرصدة الفعلية عند ربط الموقع بأنظمة ميلودي.")}</p>
        </div>
      </div>
    </section>
  );
}
