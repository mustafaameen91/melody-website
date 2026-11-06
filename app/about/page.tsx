import Link from "next/link";
import { FadeIn, Item, ParallaxImg, Reveal, RiseLines, Stagger } from "@/components/Motion";
import { Icon } from "@/components/Icon";
import { getT } from "@/lib/i18n-server";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t("About", "من نحن") };
}

export default async function About() {
  const { lang, t } = await getT();
  const PRINCIPLES = [
    ["01", t("Open prices", "أسعار معلنة"), t("Our buying and selling prices are on every page, updated every 30 seconds, with nothing added at checkout.", "أسعار البيع والشراء معلنة في كل صفحة، تُحدَّث كل 30 ثانية، ولا يُضاف إليها شيء عند الدفع.")],
    ["02", t("Real, allocated gold", "ذهب حقيقي مخصَّص"), t("Every gram you own is part of a specific bar, recorded under your name with its serial number.", "كل غرام تملكه جزء من سبيكة محددة، مسجَّل باسمك برقمها التسلسلي.")],
    ["03", t("Your gold, your choice", "ذهبك، وقرارك"), t("Hold it, send it to another client, sell it back or take delivery — at any time, without notice.", "احتفظ به، أو أرسله إلى عميل آخر، أو بِعه لنا، أو استلمه — في أي وقت ودون إشعار مسبق.")],
    ["04", t("Discretion", "السرية"), t("Private appointments, protected data and a team that treats your holdings as confidential.", "مواعيد خاصة، وبيانات محمية، وفريق يتعامل مع مقتنياتك بسرية تامة.")],
  ];
  return (
    <>
      <section className="photo" style={{ minHeight: 760 }}>
        <img className="bg kenburns" src="/img/lobby.jpg" alt={t("A calm showroom lobby", "ردهة هادئة في صالة العرض")} style={{ objectPosition: "50% 60%" }} />
        <div className="shade" style={{ background: "linear-gradient(90deg, rgba(44,5,9,0.92) 0%, rgba(44,5,9,0.7) 45%, rgba(44,5,9,0.15) 100%)" }} />
        <div className="wrap" style={{ position: "relative", padding: "230px 0 140px" }}>
          <FadeIn className="crumbs"><Link href="/">{t("Home", "الرئيسية")}</Link><span>/</span><span>{t("About", "من نحن")}</span></FadeIn>
          <RiseLines style={{ fontSize: 96, marginTop: 30 }} lines={lang === "ar" ? ["ذهبٌ نحفظه", <em key="e">بعناية</em>] : ["Gold, kept", <em key="e">with care</em>]} />
          <FadeIn delay={0.6}><p className="lead" style={{ marginTop: 28, fontSize: 19 }}>{t("Melody brings investment gold to everyone in Iraq — with open prices, real bars held in your name, and the service of a private bank.", "تقدّم ميلودي الذهب الاستثماري للجميع في العراق — بأسعار معلنة، وسبائك حقيقية محفوظة باسمك، وخدمة بمستوى المصارف الخاصة.")}</p></FadeIn>
        </div>
      </section>

      <section style={{ padding: "72px 0", borderBottom: "1px solid var(--rule)" }}>
        <Stagger className="wrap stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          <Item className="stat"><b>{t("[Year]", "[السنة]")}</b><span>{t("Founded in Baghdad", "تأسست في بغداد")}</span></Item>
          <Item className="stat"><b>[N]</b><span>{t("Clients holding gold with us", "عميل يحفظون ذهبهم لدينا")}</span></Item>
          <Item className="stat"><b>{t("[N] kg", "[N] كغ")}</b><span>{t("Gold held in our vault", "من الذهب في خزنتنا")}</span></Item>
          <Item className="stat"><b>999.9</b><span>{t("The only purity we sell", "النقاوة الوحيدة التي نبيعها")}</span></Item>
        </Stagger>
      </section>

      <section style={{ padding: "130px 0" }}>
        <div className="wrap split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>
          <div>
            <Reveal><div className="eyebrow">{t("Our story", "قصتنا")}</div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontSize: 58, marginTop: 20 }}>{lang === "ar" ? <>قائمة على الثقة،<br />وتُدار <em>بدقة</em></> : <>Built on trust,<br />run with <em>precision</em></>}</h2></Reveal>
            <Reveal delay={0.2}><p className="lead" style={{ marginTop: 26 }}>{t("[Founder story — two or three sentences on how Melody started and why.]", "[قصة المؤسس — جملتان أو ثلاث عن بداية ميلودي وسببها.]")}</p></Reveal>
            <Reveal delay={0.25}><p className="muted" style={{ marginTop: 18, maxWidth: 540 }}>{t("Today our clients buy, hold and move gold from the Melody app and website, while our showroom and trading desk give the same care in person. Every gram is backed by a real bar with a serial number.", "اليوم يشتري عملاؤنا الذهب ويحفظونه وينقلونه عبر تطبيق ميلودي وموقعها، بينما تقدّم صالة العرض ومكتب التداول العناية ذاتها حضورياً. كل غرام مدعوم بسبيكة حقيقية ذات رقم تسلسلي.")}</p></Reveal>
            <Reveal delay={0.3} style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 20 }}>
              <span className="av" style={{ width: 64, height: 64, borderRadius: 32, background: "var(--maroon)", color: "var(--pale-gold)", fontSize: 26 }}>{t("M", "م")}</span>
              <div><div className="serif" style={{ fontSize: 24 }}>{t("[Founder name]", "[اسم المؤسس]")}</div><div className="muted" style={{ fontSize: 13 }}>{t("Founder & Chief Executive", "المؤسس والرئيس التنفيذي")}</div></div>
            </Reveal>
          </div>
          <div style={{ position: "relative", height: 700 }} className="split-photo">
            <Reveal className="ph zoom" style={{ position: "absolute", insetInlineStart: 0, top: 0, width: "75%", height: 560 }}><img src="/img/handshake.jpg" alt={t("An adviser shaking hands with a client", "مستشار يصافح أحد العملاء")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "40% 50%" }} /></Reveal>
            <Reveal delay={0.3} y={70} className="ph" style={{ position: "absolute", insetInlineEnd: 0, bottom: 0, width: "52%", height: 380, border: "10px solid var(--ivory)" }}><img src="/img/bars-fine.jpg" alt={t("Fine gold bars", "سبائك ذهب خالص")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%" }} /></Reveal>
          </div>
        </div>
      </section>

      <section id="promise" className="photo" style={{ minHeight: 640 }}>
        <ParallaxImg src="/img/vault-gold.jpg" alt={t("A gilded vault door standing open", "باب خزنة مذهَّب مفتوح")} pos="30% 60%" />
        <div className="shade" style={{ background: "linear-gradient(90deg, rgba(44,5,9,0.05) 0%, rgba(44,5,9,0.25) 40%, rgba(74,13,22,0.95) 62%)" }} />
        <div className="wrap right-panel" style={{ position: "relative", display: "flex", justifyContent: "flex-end", padding: "150px 0" }}>
          <div style={{ width: 470 }}>
            <Reveal><div className="eyebrow">{t("Our promise", "وعدنا")}</div></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontSize: 58, marginTop: 20 }}>{lang === "ar" ? <>لا نُقرض شيئاً.<br />و<em>لا</em> نُخفي شيئاً.</> : <>Nothing is lent.<br /><em>Nothing</em> is hidden.</>}</h2></Reveal>
            <Reveal delay={0.2}><p className="lead" style={{ marginTop: 22 }}>{t("Your gold is never used, lent or pledged by Melody. You can see it, download its certificate, and take it home whenever you wish.", "لا تستخدم ميلودي ذهبك ولا تُقرضه ولا ترهنه أبداً. يمكنك رؤيته وتنزيل شهادته واستلامه متى شئت.")}</p></Reveal>
          </div>
        </div>
      </section>

      <section style={{ padding: "130px 0" }}>
        <div className="wrap split" style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 100 }}>
          <Reveal>
            <div className="eyebrow">{t("What we stand for", "ما نؤمن به")}</div>
            <h2 style={{ fontSize: 54, marginTop: 20 }}>{lang === "ar" ? <>أربعة <em>مبادئ</em></> : <>Four <em>principles</em></>}</h2>
            <p className="lead" style={{ marginTop: 22 }}>{t("They guide every price we publish and every bar we hand over.", "تحكم كل سعر نعلنه وكل سبيكة نسلّمها.")}</p>
          </Reveal>
          <Stagger style={{ borderBottom: "1px solid var(--rule)" }}>
            {PRINCIPLES.map(([n, h, p]) => <Item key={n} className="pr"><span className="n">{n}</span><div><h3>{h}</h3><p>{p}</p></div></Item>)}
          </Stagger>
        </div>
      </section>

      <section className="dark" style={{ padding: "110px 0" }}>
        <div className="wrap">
          <Reveal><div className="eyebrow">{t("Milestones", "محطات")}</div><h2 style={{ fontSize: 54, marginTop: 20 }}>{lang === "ar" ? <><em>مسيرتنا</em></> : <>Our <em>journey</em></>}</h2></Reveal>
          <Stagger className="g4" style={{ marginTop: 60, gap: 0 }}>
            {[
              [t("[Year]", "[السنة]"), t("Showroom opens", "افتتاح صالة العرض"), t("Melody opens its first showroom in Baghdad.", "تفتتح ميلودي أولى صالات عرضها في بغداد.")],
              [t("[Year]", "[السنة]"), t("Vault partnership", "شراكة الخزنة"), t("Insured storage with [Vault partner].", "حفظ مؤمَّن بالشراكة مع [شريك الخزنة].")],
              ["2026", t("Melody app", "تطبيق ميلودي"), t("Buy, hold, transfer and sell gold from your phone.", "اشترِ الذهب واحفظه وانقله وبِعه من هاتفك.")],
              ["2026", t("Melody online", "ميلودي على الإنترنت"), t("The full service on the web, in English and Arabic.", "الخدمة كاملة على الموقع، بالعربية والإنجليزية.")],
            ].map(([y, h, p], i) => (
              <Item key={i} className="mstep"><div className="yr">{y}</div><h4>{h}</h4><p>{p}</p></Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="showroom" style={{ padding: "130px 0" }}>
        <Reveal className="wrap split" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", background: "var(--paper)", border: "1px solid var(--rule)" }}>
          <div className="pad-sm" style={{ padding: "80px 72px" }}>
            <div className="eyebrow">{t("Visit us", "زورونا")}</div>
            <h2 style={{ fontSize: 52, marginTop: 20 }}>{lang === "ar" ? <><em>صالة عرض</em> ميلودي</> : <>The Melody <em>showroom</em></>}</h2>
            <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 18, fontSize: 15 }}>
              <div style={{ display: "flex", gap: 14 }}><Icon name="pin" style={{ color: "var(--gold)" }} />{t("[Showroom address], Baghdad", "[عنوان صالة العرض]، بغداد")}</div>
              <div style={{ display: "flex", gap: 14 }}><Icon name="clock" style={{ color: "var(--gold)" }} />{t("Saturday to Thursday, 10:00–20:00", "من السبت إلى الخميس، من 10:00 حتى 20:00")}</div>
              <div style={{ display: "flex", gap: 14 }}><Icon name="phone" style={{ color: "var(--gold)" }} />{t("[Phone]", "[الهاتف]")}</div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 44, flexWrap: "wrap" }}><Link href="/help" className="btn btn-dark">{t("Book a visit", "احجز زيارة")}</Link><Link href="/help" className="btn btn-line">{t("Get directions", "احصل على الاتجاهات")}</Link></div>
          </div>
          <div className="ph zoom" style={{ minHeight: 560 }}><img src="/img/office-marble.jpg" alt={t("A marble reception desk", "مكتب استقبال من الرخام")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></div>
        </Reveal>
      </section>
    </>
  );
}
