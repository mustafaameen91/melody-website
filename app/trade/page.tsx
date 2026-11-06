import { AccountNav } from "@/components/AccountNav";
import { FadeIn } from "@/components/Motion";
import { getT } from "@/lib/i18n-server";
import { TradeDesk } from "./TradeDesk";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t("Trade gold", "تداول الذهب") };
}

export default async function Trade() {
  const { lang, t } = await getT();
  return (
    <section style={{ padding: "44px 0 120px" }}>
      <div className="wrap acc-layout">
        <AccountNav />
        <div style={{ flex: 1, minWidth: 0 }}>
          <FadeIn style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
            <div><div className="eyebrow">{t("Your account · sample", "حسابك · تجريبي")}</div><h1 style={{ fontSize: 56, marginTop: 12 }}>{lang === "ar" ? <>تداول <em>الذهب</em></> : <>Trade <em>gold</em></>}</h1></div>
            <span className="chip chip-green" style={{ height: 30, gap: 8 }}><span className="live-dot" />{t("Market open · prices live", "السوق مفتوح · الأسعار حية")}</span>
          </FadeIn>
          <TradeDesk />
        </div>
      </div>
    </section>
  );
}
