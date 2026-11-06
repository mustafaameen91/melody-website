import Link from "next/link";
import { Icon, Logo } from "./Icon";
import { getT } from "@/lib/i18n-server";

export async function Footer() {
  const { t } = await getT();
  const cols: [string, [string, string][]][] = [
    [t("GOLD", "الذهب"), [[t("Gold bars", "سبائك الذهب"), "/gold-bars"], [t("Live prices", "الأسعار الحية"), "/prices"], [t("Trade gold", "تداول الذهب"), "/trade"], [t("Sell to Melody", "البيع لميلودي"), "/sell"], [t("Insights", "التحليلات"), "/insights"]]],
    [t("YOUR ACCOUNT", "حسابك"), [[t("My vault", "خزنتي"), "/vault"], [t("Trade gold", "تداول الذهب"), "/trade"], [t("Transfer gold", "نقل الذهب"), "/transfer"], [t("Price alerts", "تنبيهات الأسعار"), "/prices#alerts"], [t("Help", "المساعدة"), "/help"]]],
    [t("MELODY", "ميلودي"), [[t("About us", "من نحن"), "/about"], [t("Vault & insurance", "الخزنة والتأمين"), "/about#promise"], [t("Insights", "التحليلات"), "/insights"], [t("Showroom", "صالة العرض"), "/about#showroom"], [t("Contact", "تواصل معنا"), "/help"]]],
  ];
  return (
    <footer className="ftr">
      <div className="wrap top">
        <div>
          <Link href="/" className="brand"><Logo size={56} id="lg-foot" /><span className="brand-lock"><span className="brand-name">MELODY</span><span className="brand-sub">{t("Digital Gold Bank", "بنك الذهب الرقمي")}</span></span></Link>
          <p style={{ marginTop: 26, fontSize: 14, maxWidth: 320, lineHeight: 1.8 }}>{t("Investment gold, bought at a live price, held in your name in an insured vault, and delivered or sold back whenever you choose.", "ذهب استثماري تشتريه بالسعر الحي، ويُحفظ باسمك في خزنة مؤمَّنة، وتستلمه أو تبيعه لنا متى شئت.")}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            <span className="store"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.5 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.8C6.1 7.1 4.5 8.1 3.7 9.7c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.6-4.1zM14 5.2c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z" /></svg><span><small>{t("DOWNLOAD ON THE", "حمّله من")}</small>App Store</span></span>
            <span className="store"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3l10 9-10 9z" fill="#E7AB58" /><path d="M4 3l13 7.5-3 1.5z" fill="#F4C17B" /><path d="M4 21l13-7.5-3-1.5z" fill="#B47A34" /><path d="M17 10.5 20.5 12.5 17 14.5 14 12z" fill="#FADDBE" /></svg><span><small>{t("GET IT ON", "احصل عليه من")}</small>Google Play</span></span>
          </div>
        </div>
        {cols.map(([h, links]) => (
          <div key={h}><h5>{h}</h5><ul>{links.map(([l, href]) => <li key={l}><Link href={href}>{l}</Link></li>)}</ul></div>
        ))}
        <div><h5>{t("CONTACT", "تواصل معنا")}</h5><ul>
          <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Icon name="phone" size={15} /> {t("[Phone]", "[الهاتف]")}</li>
          <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Icon name="mail" size={15} /> {t("[Email]", "[البريد الإلكتروني]")}</li>
          <li style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><Icon name="pin" size={15} /> {t("[Showroom address]", "[عنوان صالة العرض]")}</li>
          <li style={{ display: "flex", gap: 10, alignItems: "center" }}><Icon name="clock" size={15} /> {t("Sat–Thu, 10:00–20:00", "من السبت إلى الخميس، من 10:00 حتى 20:00")}</li>
        </ul></div>
      </div>
      <div className="legal"><div className="wrap"><span>{t("© 2026 Melody · [Licence / registration number]", "© 2026 ميلودي · [رقم الترخيص / التسجيل]")}</span><span style={{ display: "flex", gap: 28, flexWrap: "wrap" }}><span>{t("Terms", "الشروط")}</span><span>{t("Privacy", "الخصوصية")}</span><span>{t("Risk disclosure", "الإفصاح عن المخاطر")}</span><span>English · العربية</span></span></div></div>
    </footer>
  );
}
