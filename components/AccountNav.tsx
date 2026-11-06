"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { useT } from "./Lang";

const ITEMS = [
  ["/vault", "vault", "Overview", "نظرة عامة"], ["/trade", "swap", "Trade gold", "تداول الذهب"], ["/transfer", "send", "Transfer gold", "نقل الذهب"], ["/sell", "scale", "Sell to Melody", "البيع لميلودي"],
  ["#", "truck", "Deliveries", "التسليمات"], ["#", "cert", "Certificates", "الشهادات"], ["/prices#alerts", "bell", "Price alerts", "تنبيهات الأسعار"], ["#", "lock", "Security", "الأمان"],
] as const;

export function AccountNav() {
  const path = usePathname();
  const t = useT();
  return (
    <aside style={{ width: 250, flexShrink: 0, position: "sticky", top: 150 }}>
      <div className="panel" style={{ padding: "24px 0 10px" }}>
        <div style={{ padding: "0 24px 20px", borderBottom: "1px solid var(--rule)" }}>
          <div className="eyebrow plain" style={{ color: "var(--muted)" }}>{t("Melody ID", "رقم ميلودي")}</div>
          <div className="num" style={{ fontFamily: "var(--serif)", fontSize: 24, marginTop: 4 }}>MG-10 482</div>
        </div>
        <nav className="acc-nav" style={{ display: "flex", flexDirection: "column", padding: "10px 0" }}>
          {ITEMS.map(([h, ic, en, ar]) => {
            const on = h === path;
            return (
              <Link key={en} href={h} title={h === "#" ? t("Not built in this version", "لم تُبنَ في هذه النسخة") : undefined} style={{ display: "flex", alignItems: "center", gap: 14, height: 48, padding: "0 24px", fontSize: 14, transition: "background-color .25s, color .25s", ...(on ? { background: "var(--maroon)", color: "var(--on-dark)", fontWeight: 500, borderInlineStart: "3px solid var(--pale-gold)" } : h === "#" ? { opacity: 0.55 } : {}) }}>
                <Icon name={ic} size={18} />{t(en, ar)}
              </Link>
            );
          })}
        </nav>
        <div style={{ margin: "4px 24px 12px", paddingTop: 16, borderTop: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--up)" }}><Icon name="shield" size={16} />{t("Identity verified", "تم التحقق من الهوية")}</div>
      </div>
    </aside>
  );
}
