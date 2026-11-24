import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Item, RiseLines, Stagger } from "@/components/Motion";
import { Icon } from "@/components/Icon";
import { FACTORIES } from "@/lib/factories";
import { getT } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: t("Factories", "المصانع") };
}

export default async function Factories() {
  const { lang, t } = await getT();
  const L = (b: { en: string; ar: string }) => b[lang];
  return (
    <>
      <section className="photo" style={{ minHeight: 560 }}>
        <img className="bg kenburns" src="/img/factories/pouring.jpg" alt={t("Molten metal being poured into moulds", "صبّ المعدن المنصهر في القوالب")} style={{ objectPosition: "60% 50%" }} />
        <div className="shade" style={{ background: "linear-gradient(90deg, rgba(44,5,9,0.95) 0%, rgba(44,5,9,0.8) 45%, rgba(44,5,9,0.25) 100%)" }} />
        <div className="wrap" style={{ position: "relative", padding: "200px 0 100px" }}>
          <FadeIn className="crumbs"><Link href="/">{t("Home", "الرئيسية")}</Link><span>/</span><span>{t("Factories", "المصانع")}</span></FadeIn>
          <RiseLines style={{ fontSize: 84, marginTop: 26 }} lines={lang === "ar" ? ["مصانع الذهب"] : ["Gold factories"]} />
          <FadeIn delay={0.5}><p className="lead" style={{ marginTop: 20 }}>{t("Invest in, buy from or sell to the refineries and workshops that work with Melody. Choose a factory and send your request in a few minutes.", "استثمر في المصافي والورش التي تعمل مع ميلودي، أو اشترِ منها، أو بِع لها. اختر مصنعاً وأرسل طلبك خلال دقائق.")}</p></FadeIn>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid var(--rule)", background: "var(--paper)" }}>
        <Stagger className="wrap g3 fx-steps">
          {[
            ["01", t("Choose a factory", "اختر مصنعاً"), t("See what each one makes, where it is and how much it produces.", "اطّلع على ما يصنعه كل مصنع وموقعه وحجم إنتاجه.")],
            ["02", t("Invest, buy or sell", "استثمر أو اشترِ أو بِع"), t("Pick what you want to do and fill in a short form.", "اختر ما تريد فعله واملأ نموذجاً قصيراً.")],
            ["03", t("The factory replies", "يردّ عليك المصنع"), t("Your request goes to the factory, which contacts you to agree the details.", "يصل طلبك إلى المصنع، فيتواصل معك للاتفاق على التفاصيل.")],
          ].map(([n, h, p]) => (
            <Item key={n} className="fx-step"><span className="n">{n}</span><div><h3>{h}</h3><p>{p}</p></div></Item>
          ))}
        </Stagger>
      </section>

      <section style={{ padding: "100px 0 130px" }}>
        <div className="wrap">
          <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
            <div>
              <div className="eyebrow">{t("Our factories", "مصانعنا")}</div>
              <h2 style={{ fontSize: 48, marginTop: 16 }}>{t(`${FACTORIES.length} partner factories`, `${FACTORIES.length} مصانع شريكة`)}</h2>
            </div>
            <span className="sample muted">{t("SAMPLE DATA", "بيانات تجريبية")}</span>
          </div>
          <Stagger className="g3" style={{ marginTop: 48, gap: 28 }}>
            {FACTORIES.map((f) => (
              <Item key={f.slug} className="p-card fx-card">
                <Link href={`/factories/${f.slug}`} className="fx-link">
                  <div className="ph zoom" style={{ aspectRatio: "4 / 3" }}>
                    <img src={f.image} alt="" loading="lazy" style={{ objectPosition: f.imagePos }} />
                    <span className="chip chip-maroon fx-loc"><Icon name="pin" size={13} /> {L(f.city)}, {L(f.country)}</span>
                  </div>
                  <div style={{ padding: "26px 26px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontSize: 24 }}>{L(f.name)}</h3>
                    <p className="muted" style={{ fontSize: 14, marginTop: 8 }}>{L(f.specialty)}</p>
                    <div className="fx-facts">
                      <div><b className="num">{f.capacityKg} {t("kg", "كغ")}</b><span>{t("a month", "شهرياً")}</span></div>
                      <div><b className="num">{f.purity}</b><span>{t("purity", "النقاوة")}</span></div>
                      <div><b className="num">{f.founded}</b><span>{t("founded", "التأسيس")}</span></div>
                    </div>
                    <span className="link fx-more">{t("Invest · Buy · Sell", "استثمر · اشترِ · بِع")} <Icon name="arrow" size={16} className="ic flip-rtl" /></span>
                  </div>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
