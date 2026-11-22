import Link from "next/link";
import { FadeIn, Item, Reveal, RiseLines, Stagger } from "@/components/Motion";
import { Icon } from "@/components/Icon";
import { getT } from "@/lib/i18n-server";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t("Founders", "المؤسسون") };
}

export default async function Founders() {
  const { lang, t } = await getT();
  return (
    <>
      <section className="dark" style={{ padding: "150px 0 110px" }}>
        <div className="wrap">
          <FadeIn className="crumbs" style={{ color: "var(--on-dark-muted)" }}><Link href="/">{t("Home", "الرئيسية")}</Link><span>/</span><span>{t("Founders", "المؤسسون")}</span></FadeIn>
          <RiseLines style={{ fontSize: 80, marginTop: 30 }} lines={lang === "ar" ? ["المؤسسون"] : ["The founders"]} />
          <FadeIn delay={0.5}><p className="lead" style={{ marginTop: 24 }}>{t("The people and partners who founded Melody, and how its leadership is organised.", "الأشخاص والشركاء الذين أسّسوا ميلودي، وكيف تُنظَّم قيادتها.")}</p></FadeIn>
        </div>
      </section>

      <section className="org" aria-labelledby="org-title">
        <div className="wrap">
          <Reveal style={{ textAlign: "center" }}>
            <div className="eyebrow plain">{t("Leadership", "القيادة")}</div>
            <h2 id="org-title" style={{ fontSize: 46, marginTop: 16 }}>{t("Organisation chart", "الهيكل التنظيمي")}</h2>
          </Reveal>

          <div className="org-tree">
            <Reveal className="org-node top card-surface" y={24}>
              <div className="org-av"><img src="/img/founders/imad-al-zubaydi.jpg" width={591} height={709} alt={t("Portrait of Imad Al-Zubaydi", "صورة عماد الزبيدي")} /></div>
              <div className="eyebrow plain org-role">{t("Founder & Chairman of the Board", "المؤسس ورئيس مجلس الإدارة")}</div>
              <h3 className="org-name">{t("Imad Al-Zubaydi", "عماد الزبيدي")}</h3>
              <p className="org-note">{t("Chairman of Melody Gold Group, Qatar & Morocco", "رئيس مجموعة ميلودي جولد للذهب في قطر والمغرب")}</p>
            </Reveal>

            <div className="org-stem" aria-hidden="true" />

            <Stagger className="org-branches">
              <Item className="org-branch">
                <div className="org-node">
                  <div className="org-av icon" role="img" aria-label={t("Photo to come", "الصورة لاحقاً")}><Icon name="user" size={46} /></div>
                  <div className="eyebrow plain org-role">{t("Chief Financial Officer", "المدير المالي")}</div>
                  <h3 className="org-name">{t("[Name]", "[الاسم]")}</h3>
                  <p className="org-note">{t("Finance", "الإدارة المالية")}</p>
                </div>
              </Item>
              <Item className="org-branch">
                <div className="org-node">
                  <div className="org-av logo"><img src="/img/founders/the-core.svg" width={240} height={240} alt={t("The Core logo", "شعار ذا كور")} /></div>
                  <div className="eyebrow plain org-role">{t("Technical partner", "الشريك التقني")}</div>
                  <h3 className="org-name">The Core</h3>
                  <p className="org-note">{t("The technology company behind the Melody platform", "الشركة التقنية وراء منصة ميلودي")}</p>
                </div>
              </Item>
            </Stagger>
          </div>
        </div>
      </section>
    </>
  );
}
