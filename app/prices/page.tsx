import Link from "next/link";
import { FadeIn, Reveal, RiseLines } from "@/components/Motion";
import { LiveChange, LiveNum, LiveTime } from "@/components/Live";
import { PriceBoard, BarTable, Alerts } from "./PriceParts";
import { getT } from "@/lib/i18n-server";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t("Live gold prices", "أسعار الذهب الحية") };
}

export default async function Prices() {
  const { lang, t } = await getT();
  return (
    <>
      <section className="photo" style={{ minHeight: 520 }}>
        <img className="bg kenburns" src="/img/bars-100oz.jpg" alt={t("Fine gold bars", "سبائك ذهب خالص")} style={{ objectPosition: "50% 45%" }} />
        <div className="shade" style={{ background: "linear-gradient(90deg, rgba(44,5,9,0.94) 0%, rgba(44,5,9,0.75) 45%, rgba(44,5,9,0.3) 100%)" }} />
        <div className="wrap" style={{ position: "relative", padding: "210px 0 70px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 30, flexWrap: "wrap" }}>
          <div>
            <FadeIn className="crumbs"><Link href="/">{t("Home", "الرئيسية")}</Link><span>/</span><span>{t("Live prices", "الأسعار الحية")}</span></FadeIn>
            <RiseLines style={{ fontSize: 88, marginTop: 26 }} lines={lang === "ar" ? [<span key="t">أسعار <em>الذهب</em> الحية</span>] : [<span key="t">Live <em>gold</em> prices</span>]} />
            <FadeIn delay={0.5}><p className="lead" style={{ marginTop: 20 }}>{t("24K, 999.9 fine gold. What we sell at and what we buy back at, updated every 30 seconds.", "ذهب خالص 999.9 · عيار 24. سعر البيع وسعر الاسترداد، يُحدَّثان كل 30 ثانية.")}</p></FadeIn>
          </div>
          <FadeIn delay={0.6} style={{ textAlign: "end" }}>
            <span className="chip chip-green" style={{ height: 30, gap: 8 }}><span className="live-dot" />{t("Market open", "السوق مفتوح")}</span>
            <div style={{ fontSize: 12, color: "var(--on-dark-muted)", marginTop: 12 }}><LiveTime prefix={t("Last update ", "آخر تحديث ")} /> · {t("Baghdad", "بغداد")}</div>
          </FadeIn>
        </div>
      </section>

      <section className="dark" style={{ padding: "70px 0 90px" }}>
        <div className="wrap">
          <Reveal className="g4" style={{ gap: 0, borderBottom: "1px solid var(--rule-dark)", paddingBottom: 34 }}>
            <div className="big"><span>{t("SPOT · PER GRAM", "السعر الفوري · للغرام")}</span><b><LiveNum field="mid" className="gold-text shimmer" /></b></div>
            <div className="big"><span>{t("YOU BUY AT", "تشتري بسعر")}</span><b><LiveNum field="sell" /></b></div>
            <div className="big"><span>{t("WE BUY BACK AT", "نشتري منك بسعر")}</span><b><LiveNum field="buy" /></b></div>
            <div className="big"><span>{t("TODAY", "اليوم")}</span><b><LiveChange withAmount /></b></div>
          </Reveal>
          <PriceBoard />
        </div>
      </section>

      <section style={{ padding: "120px 0" }}>
        <div className="wrap split" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 60, alignItems: "flex-start" }}>
          <Reveal>
            <div className="eyebrow">{t("Price by bar", "السعر حسب السبيكة")}</div>
            <h2 style={{ fontSize: 50, marginTop: 18 }}>{lang === "ar" ? <>أسعار <em>السبائك</em> اليوم</> : <>Today&apos;s <em>bar prices</em></>}</h2>
            <BarTable />
            <p className="helper" style={{ marginTop: 16 }}>{t("Smaller bars carry a higher making charge per gram. Prices include all fees except delivery.", "تحمل السبائك الأصغر أجرة صياغة أعلى للغرام. تشمل الأسعار جميع الرسوم عدا التوصيل.")}</p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Reveal delay={0.15}><Alerts /></Reveal>
            <Reveal delay={0.25} className="photo zoom" style={{ height: 300 }}>
              <div className="ph" style={{ position: "absolute", inset: 0 }}><img src="/img/man-phone.jpg" alt={t("A client checking prices on his phone", "عميل يتابع الأسعار على هاتفه")} style={{ objectPosition: "50% 30%" }} /></div>
              <div className="shade" style={{ background: "linear-gradient(0deg, rgba(44,5,9,0.92) 0%, rgba(44,5,9,0.2) 70%)" }} />
              <div className="inner" style={{ position: "relative", padding: "170px 30px 0" }}><h3 style={{ fontSize: 30 }}>{t("Prices in your pocket", "الأسعار في جيبك")}</h3><p style={{ fontSize: 13, color: "var(--on-dark-muted)", marginTop: 6 }}>{t("Live prices and alerts in the Melody app.", "الأسعار الحية والتنبيهات في تطبيق ميلودي.")}</p></div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
