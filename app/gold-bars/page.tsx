import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Item, RiseLines, Stagger } from "@/components/Motion";
import { Icon } from "@/components/Icon";
import { getT } from "@/lib/i18n-server";
import { Shop } from "./Shop";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: t("Gold bars", "سبائك الذهب") };
}

export default async function GoldBars() {
  const { lang, t } = await getT();
  return (
    <>
      <section className="photo" style={{ minHeight: 560 }}>
        <img className="bg kenburns" src="/img/bars-scatter.jpg" alt={t("Gold bars on a dark surface", "سبائك ذهب على سطح داكن")} />
        <div className="shade" style={{ background: "linear-gradient(90deg, rgba(44,5,9,0.95) 0%, rgba(44,5,9,0.75) 42%, rgba(44,5,9,0.2) 100%)" }} />
        <div className="wrap" style={{ position: "relative", padding: "220px 0 90px" }}>
          <FadeIn className="crumbs"><Link href="/">{t("Home", "الرئيسية")}</Link><span>/</span><span>{t("Gold bars", "سبائك الذهب")}</span></FadeIn>
          <RiseLines style={{ fontSize: 92, marginTop: 26 }} lines={lang === "ar" ? [<span key="t"><em>سبائك الذهب</em> الاستثمارية</span>] : [<span key="t">Investment <em>gold bars</em></span>]} />
          <FadeIn delay={0.5}><p className="lead" style={{ marginTop: 20 }}>{t("999.9 fine gold from accredited refiners, from 1 gram to 1 kilo. Each bar is sealed with its own serial number and certificate.", "ذهب خالص 999.9 من مصافٍ معتمدة، من غرام واحد حتى كيلوغرام. كل سبيكة مختومة برقم تسلسلي وشهادة خاصة بها.")}</p></FadeIn>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid var(--rule)", background: "var(--paper)" }}>
        <Stagger className="wrap g4" style={{ minHeight: 96, alignItems: "center", fontSize: 13, padding: "20px 0" }}>
          {[["cert", t("Assay certificate with every bar", "شهادة فحص مع كل سبيكة")], ["vault", t("Free storage in the Melody vault", "حفظ مجاني في خزنة ميلودي")], ["truck", t("Insured delivery across Iraq", "توصيل مؤمَّن في جميع أنحاء العراق")], ["scale", t("Guaranteed buy-back price", "سعر استرداد مضمون")]].map(([i, label]) => (
            <Item key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}><Icon name={i} style={{ color: "var(--gold)" }} />{label}</Item>
          ))}
        </Stagger>
      </section>

      <Shop />
    </>
  );
}
