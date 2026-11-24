import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn, Reveal, RiseLines } from "@/components/Motion";
import { Icon } from "@/components/Icon";
import { FACTORIES, getFactory, isAction } from "@/lib/factories";
import { getT } from "@/lib/i18n-server";
import { RequestPanel } from "./RequestPanel";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ action?: string }> };

export function generateStaticParams() {
  return FACTORIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = getFactory((await params).slug);
  const { lang, t } = await getT();
  return { title: f ? f.name[lang] : t("Factory", "مصنع") };
}

export default async function FactoryPage({ params, searchParams }: Props) {
  const f = getFactory((await params).slug);
  if (!f) notFound();
  const { action } = await searchParams;
  const { lang, t } = await getT();
  const L = (b: { en: string; ar: string }) => b[lang];
  return (
    <>
      <section className="photo" style={{ minHeight: 600 }}>
        <img className="bg kenburns" src={f.image} alt="" style={{ objectPosition: f.imagePos }} />
        <div className="shade" style={{ background: "linear-gradient(90deg, rgba(44,5,9,0.95) 0%, rgba(44,5,9,0.78) 48%, rgba(44,5,9,0.25) 100%)" }} />
        <div className="wrap" style={{ position: "relative", padding: "200px 0 100px" }}>
          <FadeIn className="crumbs"><Link href="/">{t("Home", "الرئيسية")}</Link><span>/</span><Link href="/factories">{t("Factories", "المصانع")}</Link><span>/</span><span>{L(f.name)}</span></FadeIn>
          <FadeIn delay={0.1} style={{ marginTop: 26, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span className="chip chip-maroon" style={{ gap: 6 }}><Icon name="pin" size={13} /> {L(f.city)}, {L(f.country)}</span>
            <span className="sample">{t("SAMPLE FACTORY", "مصنع تجريبي")}</span>
          </FadeIn>
          <RiseLines style={{ fontSize: 76, marginTop: 20 }} lines={[L(f.name)]} />
          <FadeIn delay={0.5}><p className="lead" style={{ marginTop: 20 }}>{L(f.about)}</p></FadeIn>
        </div>
      </section>

      <section style={{ padding: "56px 0", borderBottom: "1px solid var(--rule)", background: "var(--paper)" }}>
        <div className="wrap stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div className="stat"><b className="num">{f.capacityKg} {t("kg", "كغ")}</b><span>{t("Produced every month", "إنتاج شهري")}</span></div>
          <div className="stat"><b className="num">{f.purity}</b><span>{t("Gold purity", "نقاوة الذهب")}</span></div>
          <div className="stat"><b className="num">{f.founded}</b><span>{t("Founded", "سنة التأسيس")}</span></div>
          <div className="stat"><b className="num">{f.replyHours}{t(" h", " ساعة")}</b><span>{t("Usual reply time", "مدة الرد المعتادة")}</span></div>
        </div>
      </section>

      <section style={{ padding: "100px 0 130px" }}>
        <div className="wrap fx-detail">
          <Reveal>
            <div className="eyebrow">{t("What they make", "ما يصنعونه")}</div>
            <h2 style={{ fontSize: 40, marginTop: 16 }}>{L(f.specialty)}</h2>
            <ul className="fx-products">
              {f.products.map((p) => <li key={p.en}><Icon name="check" size={18} style={{ color: "var(--gold)" }} />{L(p)}</li>)}
            </ul>
            <div className="fx-note">
              <Icon name="shield" size={20} style={{ color: "var(--gold)", flexShrink: 0 }} />
              <span>{t(`Investments start from $${f.minInvestUsd.toLocaleString("en-US")}. Every bar comes with an assay certificate, and Melody checks each deal before it is signed.`, `يبدأ الاستثمار من ${f.minInvestUsd.toLocaleString("en-US")} دولار. ترافق كل سبيكة شهادة فحص، وتراجع ميلودي كل صفقة قبل توقيعها.`)}</span>
            </div>
          </Reveal>
          <div id="request">
            <RequestPanel slug={f.slug} factoryName={L(f.name)} products={f.products} minInvest={f.minInvestUsd} replyHours={f.replyHours} initial={isAction(action) ? action : null} />
          </div>
        </div>
      </section>
    </>
  );
}
