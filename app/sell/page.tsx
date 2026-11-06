import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { FadeIn, Item, Reveal, RiseLines, Stagger } from "@/components/Motion";
import { getT } from "@/lib/i18n-server";
import { Estimator } from "./Estimator";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: t("Sell to Melody", "البيع لميلودي") };
}

export default async function Sell() {
  const { lang, t } = await getT();
  const ar = lang === "ar";
  return (
    <>
      <section className="photo" style={{ minHeight: 940 }}>
        <img className="bg kenburns" src="/img/bars-stack-dark.jpg" alt={t("Gold bars on a dark surface", "سبائك ذهب على سطح داكن")} style={{ objectPosition: "70% 50%" }} />
        <div className="shade" style={{ background: "linear-gradient(90deg, rgba(44,5,9,0.95) 0%, rgba(44,5,9,0.82) 40%, rgba(44,5,9,0.25) 100%)" }} />
        <div className="wrap split" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 470px", gap: 80, padding: "200px 0 90px", alignItems: "start" }}>
          <div style={{ paddingTop: 30 }}>
            <FadeIn className="crumbs"><Link href="/">{t("Home", "الرئيسية")}</Link><span>/</span><span>{t("Sell to Melody", "البيع لميلودي")}</span></FadeIn>
            <RiseLines style={{ fontSize: 92, marginTop: 26 }} lines={ar ? ["بِع ذهبك", <span key="m">إلى <em>ميلودي</em></span>] : ["Sell back", <span key="m">to <em>Melody</em></span>]} />
            <FadeIn delay={0.6}><p className="lead" style={{ marginTop: 26 }}>{t("We buy back investment gold bars at the published price. Gold already in your Melody vault sells in seconds.", "نشتري منك سبائك الذهب الاستثمارية بالسعر المعلن. والذهب المحفوظ في خزنتك لدى ميلودي يُباع في ثوانٍ.")}</p></FadeIn>
            <FadeIn delay={0.75} style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 34, fontSize: 13, color: "var(--on-dark-muted)" }}><Icon name="check" style={{ color: "var(--pale-gold)" }} />{t("We buy investment gold bars only. We do not buy jewellery.", "نشتري سبائك الذهب الاستثمارية فقط، ولا نشتري المصوغات.")}</FadeIn>
          </div>
          <FadeIn delay={0.4}><Estimator /></FadeIn>
        </div>
      </section>

      <section style={{ padding: "130px 0" }}>
        <div className="wrap">
          <Reveal><div className="eyebrow">{t("How it works", "كيف تتم العملية")}</div><h2 style={{ fontSize: 56, marginTop: 18 }}>{ar ? <>تستلم المبلغ في <em>ثلاث خطوات</em></> : <>Paid in <em>three steps</em></>}</h2></Reveal>
          <Stagger className="g3" style={{ marginTop: 60, gap: 0 }}>
            {[["I", t("Lock your price", "ثبّت سعرك"), t("Get an instant estimate and hold the price for 10 minutes while you confirm.", "احصل على تقدير فوري، ويبقى السعر ثابتاً لمدة 10 دقائق ريثما تؤكد.")], ["II", t("Hand it over", "سلّم السبيكة"), t("Book an insured pickup or bring the bar to the showroom. Gold in your Melody vault skips this step.", "احجز استلاماً مؤمَّناً أو أحضر السبيكة إلى صالة العرض. الذهب المحفوظ في خزنتك لدى ميلودي لا يحتاج إلى هذه الخطوة.")], ["III", t("Get paid", "استلم المبلغ"), t("We pay your Melody cash balance or bank account within [payout time].", "نحوّل المبلغ إلى رصيدك النقدي في ميلودي أو إلى حسابك المصرفي خلال [مدة الدفع].")]].map(([n, h, p]) => (
              <Item key={n} className="sstep"><div className="n">{n}</div><h3>{h}</h3><p>{p}</p></Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section style={{ padding: "0 0 130px" }}>
        <Reveal className="wrap split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--paper)", border: "1px solid var(--rule)" }}>
          <div className="ph zoom" style={{ minHeight: 560 }}><img src="/img/handshake-2.jpg" alt={t("An adviser greeting a client at the showroom", "مستشار يستقبل عميلاً في صالة العرض")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%" }} /></div>
          <div className="pad-sm" style={{ padding: "80px 70px" }}>
            <div className="eyebrow">{t("At the showroom", "في صالة العرض")}</div>
            <h2 style={{ fontSize: 50, marginTop: 18 }}>{ar ? <>بِع شخصياً،<br /><em>بخصوصية تامة</em></> : <>Sell in person,<br /><em>privately</em></>}</h2>
            <p className="lead" style={{ marginTop: 20 }}>{t("Our trading desk checks your bar on the spot with professional testing equipment, in a private room, and pays the same day.", "يفحص مكتب التداول سبيكتك فوراً بأجهزة فحص احترافية في غرفة خاصة، ويدفع لك في اليوم نفسه.")}</p>
            <div style={{ display: "flex", gap: 16, marginTop: 38, flexWrap: "wrap" }}><Link href="/help" className="btn btn-dark">{t("Book an appointment", "احجز موعداً")}</Link><Link href="/help" className="btn btn-line">{t("Call the desk", "اتصل بمكتب التداول")}</Link></div>
          </div>
        </Reveal>
      </section>

      <section style={{ padding: "0 0 130px" }}>
        <div className="wrap split" style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 100 }}>
          <Reveal><div className="eyebrow">{t("Questions", "أسئلة شائعة")}</div><h2 style={{ fontSize: 52, marginTop: 18 }}>{ar ? <>قبل أن <em>تبيع</em></> : <>Before you <em>sell</em></>}</h2><p className="lead" style={{ marginTop: 18 }}>{t("Can't find your answer? Our trading desk is happy to help.", "لم تجد إجابتك؟ يسعد مكتب التداول بمساعدتك.")}</p></Reveal>
          <Reveal delay={0.1}>
            <Faq items={[
              [t("How is the buy-back price set?", "كيف يُحدَّد سعر الاسترداد؟"), t("It follows the live international gold price, less Melody's published spread. You see the exact amount before you confirm.", "يتبع سعر الذهب العالمي الحي مطروحاً منه الفارق المعلن لدى ميلودي. وترى المبلغ الدقيق قبل التأكيد.")],
              [t("Do I need the original certificate?", "هل أحتاج إلى الشهادة الأصلية؟"), t("It speeds things up. Without it, the bar is assayed at the showroom before payment.", "وجودها يُسرّع العملية. ومن دونها تُفحص السبيكة في صالة العرض قبل الدفع.")],
              [t("Can I sell bars I didn't buy from Melody?", "هل يمكنني بيع سبائك لم أشترها من ميلودي؟"), t("Yes, if they are 999.9 investment bars from an accredited refiner. They are checked at the showroom first.", "نعم، إن كانت سبائك استثمارية عيار 999.9 من مصفاة معتمدة، وتُفحص أولاً في صالة العرض.")],
              [t("What if the price moves after I lock it?", "ماذا لو تغيّر السعر بعد تثبيته؟"), t("Your locked price is held for 10 minutes, whichever way the market moves.", "يبقى سعرك المثبَّت سارياً لمدة 10 دقائق، أيّاً كان اتجاه السوق.")],
            ]} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
