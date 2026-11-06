import { FadeIn, Reveal, RiseLines } from "@/components/Motion";
import { getT } from "@/lib/i18n-server";
import { ArticleGrid, Newsletter } from "./InsightParts";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t("Insights", "التحليلات") };
}

export default async function Insights() {
  const { lang, t } = await getT();
  return (
    <>
      <section style={{ padding: "70px 0 0" }}>
        <div className="wrap">
          <FadeIn><div className="eyebrow">{t("Insights", "التحليلات")}</div></FadeIn>
          <RiseLines style={{ fontSize: 88, marginTop: 22 }} lines={lang === "ar" ? [<span key="t">قراءة في <em>سوق الذهب</em></span>] : [<span key="t">Reading the <em>gold market</em></span>]} />
          <FadeIn delay={0.5}><p className="lead" style={{ marginTop: 20 }}>{t("Weekly outlooks, plain-language guides and market notes from the Melody trading desk.", "نظرات أسبوعية وأدلّة بلغة واضحة وملاحظات عن السوق من مكتب التداول في ميلودي.")}</p></FadeIn>
        </div>
      </section>

      <section style={{ padding: "60px 0 0" }}>
        <div className="wrap">
          <Reveal className="photo zoom" style={{ minHeight: 620 }}>
            <div className="ph" style={{ position: "absolute", inset: 0 }}><img src="/img/card-foundry.jpg" alt={t("The Melody card beside molten gold being poured", "بطاقة ميلودي بجانب ذهب منصهر يُسكب")} /></div>
            <div className="shade" style={{ background: "linear-gradient(90deg, rgba(44,5,9,0.95) 0%, rgba(44,5,9,0.7) 45%, rgba(44,5,9,0.05) 100%)" }} />
            <div className="inner pad-sm" style={{ position: "relative", padding: "90px 70px", maxWidth: 680 }}>
              <span className="chip" style={{ background: "var(--pale-gold)", color: "var(--maroon-deep)" }}>{t("Featured · Weekly outlook", "مختارات · النظرة الأسبوعية")}</span>
              <h2 style={{ fontSize: 62, marginTop: 26 }}>{t("Gold near its high: what moved the price this week", "الذهب قرب أعلى مستوياته: ما الذي حرّك السعر هذا الأسبوع")}</h2>
              <p className="lead" style={{ marginTop: 20 }}>{t("Rates, the dollar and central-bank buying — and the three dates to watch before month end.", "أسعار الفائدة والدولار ومشتريات البنوك المركزية، وثلاثة مواعيد تستحق المتابعة قبل نهاية الشهر.")}</p>
              <div style={{ display: "flex", gap: 24, alignItems: "center", marginTop: 36, flexWrap: "wrap" }}><span className="btn btn-gold">{t("Read the outlook", "اقرأ النظرة الأسبوعية")}</span><span style={{ fontSize: 13, color: "var(--on-dark-muted)" }}>{t("[Author] · 5 Nov 2026 · 6 min", "[الكاتب] · 5 تشرين الثاني 2026 · 6 دقائق")}</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "80px 0 130px" }}>
        <div className="wrap">
          <ArticleGrid />
          <Newsletter />
        </div>
      </section>
    </>
  );
}
