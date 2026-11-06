import Link from "next/link";
import { CountUp, FadeIn, Item, ParallaxImg, Reveal, RiseLines, Stagger } from "@/components/Motion";
import { LiveChange, LiveNum, LiveTime } from "@/components/Live";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { HeroSlider } from "@/components/HeroSlider";
import { HomeChart } from "./HomeChart";
import { ARTICLES, getProduct, productPrice } from "@/lib/data";
import { quoteAt } from "@/lib/pricing";
import { getT } from "@/lib/i18n-server";

export default async function Home() {
  const { lang, t } = await getT();
  const q = quoteAt();
  const featured = ["100g-gold-bar", "50g-gold-bar", "gift-set-3x10g", "1kg-gold-bar"].map((s) => getProduct(s)!);
  return (
    <>
      {/* HERO */}
      <section className="photo hero grain">
        <HeroSlider />
        <div className="shade" />
        <div className="wrap hero-copy" style={{ position: "relative", zIndex: 2 }}>
          <FadeIn delay={0.1}><div className="eyebrow">{t("Investment gold · Baghdad", "الذهب الاستثماري · بغداد")}</div></FadeIn>
          <RiseLines style={{ marginTop: 22 }} lines={lang === "ar" ? ["ذهبٌ حقيقي،", <span key="l2"><em>ملكك</em> بلمسة واحدة.</span>] : ["Real gold.", <span key="l2"><em>Yours</em> in</span>, "one tap."]} />
          <FadeIn delay={0.75}><p className="lead" style={{ marginTop: 22, fontSize: 16, maxWidth: 440 }}>{t("Buy 999.9 fine gold at the live price, hold it fully insured in your name, and send it, sell it or take delivery whenever you choose.", "اشترِ ذهباً خالصاً عيار 999.9 بالسعر الحي، واحفظه مؤمَّناً بالكامل باسمك، ثم أرسله أو بِعه أو استلمه متى شئت.")}</p></FadeIn>
          <FadeIn delay={0.95} style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
            <Link href="/vault" className="btn btn-gold">{t("Open an account", "افتح حساباً")}</Link>
            <Link href="/prices" className="btn btn-line">{t("See live prices", "شاهد الأسعار الحية")}</Link>
          </FadeIn>
        </div>
        <div className="quote" style={{ zIndex: 2 }}>
          <FadeIn delay={1.15} className="wrap">
            <div className="q"><span>{t("GOLD 24K · PER GRAM", "ذهب عيار 24 · للغرام")}</span><b><LiveNum field="mid" /></b></div>
            <div className="q"><span>{t("YOU BUY AT", "تشتري بسعر")}</span><b><LiveNum field="sell" /></b></div>
            <div className="q"><span>{t("WE BUY BACK AT", "نشتري منك بسعر")}</span><b><LiveNum field="buy" /></b></div>
            <div className="q"><span>{t("TODAY", "اليوم")}</span><b><LiveChange /></b></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}><span className="sample" style={{ color: "var(--on-dark-muted)" }}>{t("SAMPLE PRICES", "أسعار تجريبية")}</span><span style={{ fontSize: 12, color: "var(--on-dark-muted)" }}><LiveTime /></span></div>
          </FadeIn>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid var(--rule)" }}>
        <Stagger className="wrap stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          <Item className="stat"><b><CountUp to={999.9} decimals={1} /></b><span>{t("Fine gold from accredited refiners", "ذهب خالص من مصافٍ معتمدة")}</span></Item>
          <Item className="stat"><b><CountUp to={100} suffix="%" /></b><span>{t("Allocated — every gram is yours by serial number", "مخصَّص — كل غرام مسجَّل باسمك برقم تسلسلي")}</span></Item>
          <Item className="stat"><b>{t("Insured", "مؤمَّن")}</b><span>{t("Vault storage, audited by [Auditor]", "حفظ في الخزنة بتدقيق [جهة التدقيق]")}</span></Item>
          <Item className="stat"><b><CountUp to={1} suffix={t(" g", " غ")} /></b><span>{t("Start with a single gram, from the app or the web", "ابدأ بغرام واحد من التطبيق أو الموقع")}</span></Item>
        </Stagger>
      </section>

      {/* WAYS TO OWN */}
      <section style={{ padding: "130px 0" }}>
        <div className="wrap split" style={{ display: "grid", gridTemplateColumns: "minmax(0, 560px) 1fr", gap: 90, alignItems: "center" }}>
          <Reveal className="ph zoom" style={{ height: 720 }}>
            <img src="/img/melody-100g-stand.jpg" alt={t("A Melody 100 g gold bar on black marble", "سبيكة ميلودي 100 غ على رخام أسود")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "66% 50%" }} />
            <div className="cap">{t("Melody 100 g bar, 999.9 fine gold", "سبيكة ميلودي 100 غ، ذهب خالص 999.9")}</div>
          </Reveal>
          <div>
            <Reveal><div className="eyebrow">{t("Three ways to own gold", "ثلاث طرق لامتلاك الذهب")}</div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontSize: 60, marginTop: 20 }}>{lang === "ar" ? <>ذهبٌ يعمل<br />كما <em>تريد</em></> : <>Gold that works<br />the way <em>you</em> do</>}</h2></Reveal>
            <Stagger style={{ marginTop: 36, borderTop: "1px solid var(--rule)" }}>
              {[
                ["I", t("Buy a bar", "اشترِ سبيكة"), t("Minted and cast bars from 1 g to 1 kg, each with its own serial number and assay certificate.", "سبائك مسكوكة ومصبوبة من 1 غرام إلى 1 كيلوغرام، لكلٍّ منها رقم تسلسلي وشهادة فحص."), t("Shop bars", "تسوّق السبائك"), "/gold-bars"],
                ["II", t("Save in grams", "ادّخر بالغرام"), t("Buy any amount from one gram. We hold it for you and you can turn it into a bar at any time.", "اشترِ أي كمية بدءاً من غرام واحد. نحفظها لك ويمكنك تحويلها إلى سبيكة في أي وقت."), t("Start saving", "ابدأ الادخار"), "/trade"],
                ["III", t("Trade at live prices", "تداول بالأسعار الحية"), t("Buy and sell inside the vault in seconds, at the price on your screen, with market or limit orders.", "اشترِ وبِع داخل الخزنة خلال ثوانٍ، بالسعر الظاهر على شاشتك، بأوامر فورية أو محددة السعر."), t("Trade gold", "تداول الذهب"), "/trade"],
              ].map(([n, h, p, l, href]) => (
                <Item key={n} className="way"><span className="n">{n}</span><div><h3>{h}</h3><p>{p}</p></div><Link href={href} className="link">{l}</Link></Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* FEATURED BARS */}
      <section style={{ padding: "0 0 130px" }}>
        <div className="wrap">
          <Reveal className="sec-head"><div><div className="eyebrow">{t("The collection", "المجموعة")}</div><h2>{lang === "ar" ? <>سبائك <em>الذهب الاستثماري</em></> : <>Investment <em>gold bars</em></>}</h2></div><Link href="/gold-bars" className="link">{t("View all bars", "عرض كل السبائك")} <Icon name="arrow" size={14} /></Link></Reveal>
          <Stagger className="g4">
            {featured.map((p) => { const pr = productPrice(p, q.sell); return <Item key={p.slug}><ProductCard p={p} perGram={pr.perGram} total={pr.total} compact lang={lang} /></Item>; })}
          </Stagger>
        </div>
      </section>

      {/* VAULT */}
      <section className="photo" style={{ minHeight: 820 }}>
        <ParallaxImg src="/img/vault-door.jpg" alt={t("Steel vault door", "باب خزنة فولاذي")} pos="50% 40%" filter="sepia(0.35) saturate(0.9)" />
        <div className="shade" style={{ background: "linear-gradient(90deg, rgba(44,5,9,0.2) 0%, rgba(44,5,9,0.55) 45%, rgba(74,13,22,0.96) 62%)" }} />
        <div className="wrap right-panel" style={{ position: "relative", display: "flex", justifyContent: "flex-end", padding: "130px 0" }}>
          <div style={{ width: 500 }}>
            <Reveal><div className="eyebrow">{t("The Melody vault", "خزنة ميلودي")}</div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontSize: 62, marginTop: 20 }}>{lang === "ar" ? <>ذهبك،<br /><em>باسمك</em></> : <>Your gold,<br />in <em>your name</em></>}</h2></Reveal>
            <Reveal delay={0.2}><p className="lead" style={{ marginTop: 22 }}>{t("Every gram you own is allocated to you, stored in a high-security vault and fully insured. It is never lent out.", "كل غرام تملكه مخصَّص لك، محفوظ في خزنة عالية الأمان ومؤمَّن بالكامل، ولا يُقرَض أبداً.")}</p></Reveal>
            <Stagger style={{ marginTop: 36 }}>
              <Item className="point"><Icon name="shield" /><div><h4>{t("Fully insured, independently audited", "مؤمَّن بالكامل وبتدقيق مستقل")}</h4><p>{t("Insured at replacement value and checked by [Auditor] every [period].", "مؤمَّن بقيمة الاستبدال ويُدقَّق من [جهة التدقيق] كل [المدة].")}</p></div></Item>
              <Item className="point"><Icon name="cert" /><div><h4>{t("A certificate for every bar", "شهادة لكل سبيكة")}</h4><p>{t("Serial number, weight and purity, downloadable from your vault at any time.", "الرقم التسلسلي والوزن والنقاء، يمكنك تنزيلها من خزنتك في أي وقت.")}</p></div></Item>
              <Item className="point" style={{ borderBottom: "1px solid var(--rule-dark)" }}><Icon name="truck" /><div><h4>{t("Collect or have it delivered", "استلمها بنفسك أو نوصلها إليك")}</h4><p>{t("Take your bar from the showroom or receive it by insured courier.", "استلم سبيكتك من صالة العرض أو عبر شحن مؤمَّن.")}</p></div></Item>
            </Stagger>
          </div>
        </div>
      </section>

      {/* TRANSFER */}
      <section style={{ padding: "140px 0" }}>
        <div className="wrap split" style={{ display: "grid", gridTemplateColumns: "1fr minmax(0, 620px)", gap: 90, alignItems: "center" }}>
          <div>
            <Reveal><div className="eyebrow">{t("Transfer gold", "نقل الذهب")}</div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontSize: 60, marginTop: 20 }}>{lang === "ar" ? <>أرسل الذهب بسهولة<br />كما ترسل <em>رسالة</em></> : <>Send gold as easily<br />as a <em>message</em></>}</h2></Reveal>
            <Reveal delay={0.2}><p className="lead" style={{ marginTop: 22 }}>{t("Move grams of gold to any Melody client in seconds — a gift, a family share or a settlement. It stays in the vault, only the name changes.", "انقل غرامات الذهب إلى أي عميل في ميلودي خلال ثوانٍ — هديةً أو حصةً عائلية أو تسويةً. يبقى الذهب في الخزنة ويتغيّر اسم المالك فقط.")}</p></Reveal>
            <Stagger className="stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: 48, borderTop: "1px solid var(--rule)", paddingTop: 28 }}>
              <Item className="stat"><b style={{ fontSize: 38 }}>{t("Seconds", "ثوانٍ")}</b><span>{t("Between Melody clients", "بين عملاء ميلودي")}</span></Item>
              <Item className="stat"><b style={{ fontSize: 38 }}>{t("0.001 g", "0.001 غ")}</b><span>{t("Smallest amount", "أصغر كمية")}</span></Item>
              <Item className="stat"><b style={{ fontSize: 38 }}>{t("[Fee]", "[الرسوم]")}</b><span>{t("Per transfer", "لكل تحويل")}</span></Item>
            </Stagger>
            <Reveal delay={0.2} style={{ display: "flex", gap: 16, marginTop: 44, flexWrap: "wrap" }}><Link href="/transfer" className="btn btn-dark">{t("Try a transfer", "جرّب التحويل")}</Link><Link href="/help" className="btn btn-line">{t("How transfers work", "كيف يعمل التحويل")}</Link></Reveal>
          </div>
          <div style={{ position: "relative", height: 760 }} className="split-photo">
            <Reveal className="ph zoom" style={{ position: "absolute", inset: "0 0 0 60px" }}><img src="/img/phone-suit.jpg" alt={t("A client in a suit holding a phone", "عميل ببدلة رسمية يحمل هاتفه")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 50%" }} /></Reveal>
            <Reveal delay={0.35} y={60} className="app-card" style={{ left: 0, bottom: 70, width: 330, padding: "26px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className="eyebrow plain" style={{ color: "var(--muted)" }}>{t("Transfer sent", "تم التحويل")}</span><span className="chip chip-green">{t("Done", "مكتمل")}</span></div>
              <div className="num big-num" style={{ fontFamily: "var(--serif)", fontSize: 52, lineHeight: 1.1, marginTop: 14 }}><CountUp to={10} decimals={3} suffix={t(" g", " غ")} /></div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{t("Gold 24K", "ذهب عيار 24")} · ≈ <LiveNum field="mid" times={10} /></div>
              <div className="hair" style={{ margin: "18px 0" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span className="av" style={{ background: "var(--maroon)", color: "var(--pale-gold)" }}>{t("S", "س")}</span><div><div style={{ fontWeight: 500 }}>{t("Sara A.", "سارة أ.")}</div><div style={{ fontSize: 12, color: "var(--muted)" }}>{t("Melody ID MG-20 917", "رقم ميلودي MG-20 917")}</div></div></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LIVE PRICE BAND */}
      <section className="dark" style={{ padding: "110px 0" }}>
        <div className="wrap split" style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: 90, alignItems: "center" }}>
          <div>
            <Reveal><div className="eyebrow">{t("Live market", "السوق الحي")}</div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontSize: 58, marginTop: 20 }}>{lang === "ar" ? <>سعرٌ واحد،<br /><em>معلنٌ للجميع</em></> : <>One price,<br /><em>shown openly</em></>}</h2></Reveal>
            <Reveal delay={0.2}><p className="lead" style={{ marginTop: 22 }}>{t("You always see what we sell at and what we buy back at, before you confirm. No hidden spread.", "ترى دائماً سعر بيعنا وسعر شرائنا قبل أن تؤكد. لا فروقات مخفية.")}</p></Reveal>
            <Reveal delay={0.3}><Link href="/prices" className="btn btn-gold" style={{ marginTop: 40 }}>{t("Open live prices", "افتح الأسعار الحية")}</Link></Reveal>
          </div>
          <Reveal delay={0.15}><HomeChart /></Reveal>
        </div>
      </section>

      {/* PRIVATE CLIENTS */}
      <section style={{ padding: "140px 0 0" }}>
        <Reveal className="wrap split" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", background: "var(--paper)", border: "1px solid var(--rule)" }}>
          <div className="ph zoom" style={{ minHeight: 600 }}><img src="/img/melody-showroom.jpg" alt={t("The Melody showroom at night", "صالة عرض ميلودي ليلاً")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 60%" }} /></div>
          <div className="pad-sm" style={{ padding: "80px 72px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="eyebrow">{t("Private clients", "كبار العملاء")}</div>
            <h2 style={{ fontSize: 54, marginTop: 20 }}>{lang === "ar" ? <>غرفة هادئة،<br />ومستشار <em>خاص</em></> : <>A quiet room,<br />a <em>personal</em> adviser</>}</h2>
            <p className="lead" style={{ marginTop: 22 }}>{t("For larger purchases, a dedicated adviser meets you at our showroom by appointment, with private viewing and same-day settlement.", "للمشتريات الكبيرة، يستقبلك مستشار مخصَّص في صالة العرض بموعد مسبق، مع معاينة خاصة وتسوية في اليوم نفسه.")}</p>
            <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}><Link href="/help" className="btn btn-dark">{t("Book an appointment", "احجز موعداً")}</Link><Link href="/help" className="btn btn-line">{t("Call the desk", "اتصل بمكتب التداول")}</Link></div>
          </div>
        </Reveal>
      </section>

      {/* INSIGHTS */}
      <section style={{ padding: "130px 0" }}>
        <div className="wrap">
          <Reveal className="sec-head"><div><div className="eyebrow">{t("Insights", "التحليلات")}</div><h2>{lang === "ar" ? <>قراءة <em>السوق</em></> : <>Reading the <em>market</em></>}</h2></div><Link href="/insights" className="link">{t("All insights", "كل التحليلات")} <Icon name="arrow" size={14} /></Link></Reveal>
          <Stagger className="g3" style={{ gap: 32 }}>
            {[ARTICLES[0], ARTICLES[1], ARTICLES[2]].map((a) => (
              <Item key={a.slug}><Link href="/insights" className="art zoom"><div className="ph"><img src={a.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: a.pos }} /></div><span className="meta">{t(a.cat, a.catAr)} · {a.mins} {t("min", "د")}</span><h3>{t(a.title, a.titleAr)}</h3><p>{t(a.blurb, a.blurbAr)}</p></Link></Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="photo" style={{ minHeight: 520 }}>
        <ParallaxImg src="/img/card-studio.jpg" pos="50% 50%" strength={60} />
        <div className="shade" style={{ background: "rgba(32,3,6,0.62)" }} />
        <div className="wrap" style={{ position: "relative", textAlign: "center", padding: "130px 0" }}>
          <Reveal><div className="eyebrow plain">{t("Begin today", "ابدأ اليوم")}</div></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontSize: 78, marginTop: 22 }}>{t("Start with", "ابدأ")} <em className="gold-text shimmer" style={{ paddingInlineEnd: 6 }}>{t("one gram", "بغرامٍ واحد")}</em></h2></Reveal>
          <Reveal delay={0.2} style={{ display: "flex", gap: 16, marginTop: 44, justifyContent: "center", flexWrap: "wrap" }}><Link href="/vault" className="btn btn-gold">{t("Open an account", "افتح حساباً")}</Link><Link href="/help" className="btn btn-line">{t("Download the app", "حمّل التطبيق")}</Link></Reveal>
        </div>
      </section>
    </>
  );
}
