import Link from "next/link";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { FadeIn, Item, Reveal, RiseLines, Stagger } from "@/components/Motion";
import { getT } from "@/lib/i18n-server";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t("Help & contact", "المساعدة والتواصل") };
}

export default async function Help() {
  const { lang, t } = await getT();
  const TOPICS = [
    ["user", t("Your account", "حسابك"), t("Opening an account, ID checks and security.", "فتح الحساب، والتحقق من الهوية، والأمان."), 12],
    ["swap", t("Buying & selling", "الشراء والبيع"), t("Prices, orders, payments and buy-back.", "الأسعار، والأوامر، والدفع، والاسترداد."), 18],
    ["send", t("Transfers", "التحويلات"), t("Sending gold to other Melody clients.", "إرسال الذهب إلى عملاء ميلودي الآخرين."), 7],
    ["truck", t("Vault & delivery", "الخزنة والتوصيل"), t("Storage, insurance, collection and delivery.", "الحفظ، والتأمين، والاستلام، والتوصيل."), 10],
  ] as const;
  return (
    <>
      <section className="photo" style={{ minHeight: 640 }}>
        <img className="bg kenburns" src="/img/advisor-phone.jpg" alt={t("A Melody adviser speaking with a client on the phone", "مستشار من ميلودي يتحدث مع عميل عبر الهاتف")} style={{ objectPosition: "70% 35%" }} />
        <div className="shade" style={{ background: "linear-gradient(90deg, rgba(44,5,9,0.96) 0%, rgba(44,5,9,0.82) 42%, rgba(44,5,9,0.15) 100%)" }} />
        <div className="wrap" style={{ position: "relative", padding: "210px 0 110px" }}>
          <FadeIn className="crumbs"><Link href="/">{t("Home", "الرئيسية")}</Link><span>/</span><span>{t("Help & contact", "المساعدة والتواصل")}</span></FadeIn>
          <RiseLines style={{ fontSize: 92, marginTop: 26 }} lines={lang === "ar" ? [<span key="t">كيف يمكننا <em>مساعدتك؟</em></span>] : [<span key="t">How can we <em>help?</em></span>]} />
          <FadeIn delay={0.5} style={{ display: "flex", marginTop: 36, maxWidth: 640 }}>
            <label className="input" style={{ flex: 1, height: 62, borderColor: "var(--gold-line)", background: "rgba(253,243,232,0.96)", color: "var(--ink)" }}>
              <Icon name="search" style={{ color: "var(--maroon)" }} /><input className="input-el" placeholder={t("Search: delivery, transfers, certificates…", "ابحث: التوصيل، التحويلات، الشهادات…")} aria-label={t("Search help", "البحث في المساعدة")} />
            </label>
            <span className="btn btn-gold" style={{ height: 62 }}>{t("Search", "بحث")}</span>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: "110px 0 0" }}>
        <div className="wrap">
          <Reveal><div className="eyebrow">{t("Browse by topic", "تصفّح حسب الموضوع")}</div></Reveal>
          <Stagger className="g4" style={{ gap: 20, marginTop: 30 }}>
            {TOPICS.map(([i, h, p, n]) => <Item key={h} className="topic"><Icon name={i} /><h3>{h}</h3><p>{p}</p><span className="c">{n} {t("articles", "مقالة")}</span></Item>)}
          </Stagger>
        </div>
      </section>

      <section style={{ padding: "110px 0 130px" }}>
        <div className="wrap split" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 70, alignItems: "flex-start" }}>
          <Reveal>
            <div className="eyebrow">{t("Common questions", "أسئلة شائعة")}</div>
            <h2 style={{ fontSize: 52, marginTop: 18, marginBottom: 36 }}>{lang === "ar" ? <>الأسئلة <em>المتكررة</em></> : <>Frequently <em>asked</em></>}</h2>
            <Faq items={[
              [t("Is my gold really mine?", "هل ذهبي ملكي حقاً؟"), t("Yes. Every gram is allocated to you by bar serial number and recorded in your name. Melody never lends or pledges client gold.", "نعم. كل غرام مخصَّص لك برقم السبيكة التسلسلي ومسجَّل باسمك. لا تُقرض ميلودي ذهب عملائها ولا ترهنه أبداً.")],
              [t("How do I take delivery of my gold?", "كيف أستلم ذهبي؟"), t("Choose Deliver in your vault. Pick insured delivery to your address or collection from the showroom, and we turn your grams into a sealed bar.", "اختر «التسليم» في خزنتك، ثم حدّد التوصيل المؤمَّن إلى عنوانك أو الاستلام من صالة العرض، ونحوّل غراماتك إلى سبيكة مختومة.")],
              [t("How fast is a transfer to another client?", "ما سرعة التحويل إلى عميل آخر؟"), t("Instant. The gold stays in the vault and is recorded in the other client's name within seconds.", "فوري. يبقى الذهب في الخزنة ويُسجَّل باسم العميل الآخر خلال ثوانٍ.")],
              [t("What fees do you charge?", "ما الرسوم التي تفرضونها؟"), t("[Fee schedule — storage, transfers and delivery.]", "[جدول الرسوم — الحفظ والتحويلات والتوصيل.]")],
              [t("How do I download my certificates?", "كيف أنزّل شهاداتي؟"), t("Open My vault, choose a bar and tap the certificate icon to download it as a PDF.", "افتح «خزنتي»، واختر سبيكة، ثم اضغط على أيقونة الشهادة لتنزيلها بصيغة PDF.")],
            ]} />
          </Reveal>
          <Reveal delay={0.15} className="dark pad-sm" style={{ padding: "44px 44px 30px", position: "sticky", top: 150 }}>
            <div className="eyebrow">{t("Talk to us", "تحدّث إلينا")}</div>
            <h3 style={{ fontSize: 40, marginTop: 16 }}>{lang === "ar" ? <>نحن هنا، <em>حضورياً</em></> : <>We&apos;re here, <em>in person</em></>}</h3>
            <div style={{ marginTop: 28 }}>
              <div className="ch"><Icon name="phone" /><div><b>{t("[Phone]", "[الهاتف]")}</b><span>{t("Trading desk · Sat–Thu, 10:00–20:00", "مكتب التداول · من السبت إلى الخميس، من 10:00 حتى 20:00")}</span></div></div>
              <div className="ch"><Icon name="mail" /><div><b>{t("[Email]", "[البريد الإلكتروني]")}</b><span>{t("Replies within one working day", "نردّ خلال يوم عمل واحد")}</span></div></div>
              <div className="ch"><Icon name="pin" /><div><b>{t("Showroom", "صالة العرض")}</b><span>{t("[Showroom address], Baghdad · by appointment", "[عنوان صالة العرض]، بغداد · بموعد مسبق")}</span></div></div>
            </div>
            <div className="ph zoom" style={{ height: 220, marginTop: 14 }}><img src="/img/office-private.jpg" alt={t("The private client room", "غرفة كبار العملاء")} style={{ objectPosition: "50% 65%" }} /></div>
            <span className="btn btn-gold" style={{ width: "100%", marginTop: 20 }}>{t("Book an appointment", "احجز موعداً")}</span>
          </Reveal>
        </div>
      </section>
    </>
  );
}
