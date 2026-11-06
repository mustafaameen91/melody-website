import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Item, Reveal, Stagger } from "@/components/Motion";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, TYPE_AR, getProduct, productPrice } from "@/lib/data";
import { getT } from "@/lib/i18n-server";
import { quoteAt } from "@/lib/pricing";
import { BuyPanel } from "./BuyPanel";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  const { lang, t } = await getT();
  return { title: p ? (lang === "ar" ? p.nameAr : p.name) : t("Gold bar", "سبيكة ذهب") };
}

const REFINER_AR: Record<string, string> = { "[Refiner A]": "[المصفاة أ]", "[Refiner B]": "[المصفاة ب]", "[Refiner C]": "[المصفاة ج]" };

const GALLERY = ["/img/bar-marble.jpg", "/img/bars-three.jpg", "/img/bars-fine.jpg", "/img/bar-stand.jpg", "/img/bars-stack-dark.jpg"];

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const { lang, t } = await getT();
  const ar = lang === "ar";
  const sell = quoteAt().sell;
  const gallery = [p.image, ...GALLERY.filter((g) => g !== p.image)].slice(0, 4);
  const related = PRODUCTS.filter((x) => x.slug !== p.slug && x.type !== "Gift set").sort((a, b) => Math.abs(Math.log(a.weightG / p.weightG)) - Math.abs(Math.log(b.weightG / p.weightG))).slice(0, 4);
  const about = p.weightG >= 250
    ? t(`A ${p.weightLabel} bar has one of the lowest making charges per gram of any size, the choice of investors holding gold for the long term.`, `سبيكة ${p.weightLabelAr} من أدنى الأحجام في أجور الصياغة للغرام، وهي خيار المستثمرين الذين يحتفظون بالذهب على المدى الطويل.`)
    : p.weightG >= 50
      ? t(`A ${p.weightLabel} bar balances a low making charge per gram with easy resale, a favourite for long-term saving.`, `سبيكة ${p.weightLabelAr} تجمع بين أجور صياغة منخفضة للغرام وسهولة إعادة البيع، وهي المفضّلة للادخار طويل الأمد.`)
      : t(`A ${p.weightLabel} bar is an easy first step into gold and a popular gift, with full buy-back at any time.`, `سبيكة ${p.weightLabelAr} خطوة أولى سهلة نحو الذهب وهدية محبّبة، مع استرداد كامل في أي وقت.`);

  return (
    <>
      <section style={{ padding: "36px 0 120px" }}>
        <div className="wrap">
          <div className="crumbs"><Link href="/">{t("Home", "الرئيسية")}</Link><span>/</span><Link href="/gold-bars">{t("Gold bars", "سبائك الذهب")}</Link><span>/</span><span style={{ color: "var(--ink)" }}>{ar ? p.nameAr : p.name}</span></div>
          <BuyPanel slug={p.slug} gallery={gallery} />
        </div>
      </section>

      <section className="dark" style={{ padding: "110px 0" }}>
        <div className="wrap g3" style={{ gap: 70 }}>
          <Reveal>
            <div className="eyebrow">{t("Specification", "المواصفات")}</div>
            <h2 style={{ fontSize: 46, marginTop: 18 }}>{ar ? <>عن هذه <em>السبيكة</em></> : <>About this <em>bar</em></>}</h2>
            <p className="lead" style={{ marginTop: 20, fontSize: 16 }}>{about}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="spec"><span>{t("Weight", "الوزن")}</span><span className="num">{p.weightG.toLocaleString("en-US", { maximumFractionDigits: 4 })} {t("g", "غ")}</span></div>
            <div className="spec"><span>{t("Purity", "النقاء")}</span><span>{t("999.9 · 24 karat", "999.9 · عيار 24")}</span></div>
            <div className="spec"><span>{t("Type", "النوع")}</span><span>{ar ? `${TYPE_AR[p.type]}، مختومة` : `${p.type}, sealed`}</span></div>
            <div className="spec"><span>{t("Dimensions", "الأبعاد")}</span><span>{t("[Dimensions]", "[الأبعاد]")}</span></div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="spec"><span>{t("Refiner", "المصفاة")}</span><span>{ar ? REFINER_AR[p.refiner] ?? p.refiner : p.refiner}</span></div>
            <div className="spec"><span>{t("Accreditation", "الاعتماد")}</span><span>{t("[Accreditation]", "[الاعتماد]")}</span></div>
            <div className="spec"><span>{t("Serial number", "الرقم التسلسلي")}</span><span>{t("On bar and certificate", "على السبيكة والشهادة")}</span></div>
            <div className="spec"><span>{t("Packaging", "التغليف")}</span><span>{t("Tamper-proof assay card", "بطاقة فحص محكمة ضد العبث")}</span></div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "120px 0" }}>
        <div className="wrap">
          <Reveal className="sec-head"><div><div className="eyebrow">{t("You may also consider", "قد يهمّك أيضاً")}</div><h2>{ar ? <>أحجام <em>أخرى</em></> : <>Other <em>sizes</em></>}</h2></div><Link href="/gold-bars" className="link">{t("All gold bars", "جميع سبائك الذهب")}</Link></Reveal>
          <Stagger className="g4">
            {related.map((r) => { const pr = productPrice(r, sell); return <Item key={r.slug}><ProductCard p={r} perGram={pr.perGram} total={pr.total} compact lang={lang} /></Item>; })}
          </Stagger>
        </div>
      </section>
    </>
  );
}
