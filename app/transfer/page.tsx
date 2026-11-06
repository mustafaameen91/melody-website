import { AccountNav } from "@/components/AccountNav";
import { FadeIn } from "@/components/Motion";
import { getT } from "@/lib/i18n-server";
import { TransferFlow } from "./TransferFlow";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t("Transfer gold", "نقل الذهب") };
}

export default async function Transfer() {
  const { lang, t } = await getT();
  return (
    <section style={{ padding: "44px 0 120px" }}>
      <div className="wrap acc-layout">
        <AccountNav />
        <div style={{ flex: 1, minWidth: 0 }}>
          <FadeIn>
            <div className="eyebrow">{t("Your account · sample", "حسابك · تجريبي")}</div>
            <h1 style={{ fontSize: 56, marginTop: 12 }}>{lang === "ar" ? <>نقل <em>الذهب</em></> : <>Transfer <em>gold</em></>}</h1>
            <p className="muted" style={{ marginTop: 8 }}>{t("Send gold from your vault to another Melody client. It moves instantly and stays insured.", "أرسل الذهب من خزنتك إلى عميل آخر في ميلودي. يصل فوراً ويبقى مؤمَّناً.")}</p>
          </FadeIn>
          <TransferFlow />
        </div>
      </div>
    </section>
  );
}
