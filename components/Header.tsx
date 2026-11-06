"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon, Logo } from "./Icon";
import { LiveChange, LiveNum } from "./Live";
import { switchLang, useLang } from "./Lang";
import { makeT } from "@/lib/i18n";

const NAV = [
  ["/", "Home", "الرئيسية"], ["/gold-bars", "Gold bars", "سبائك الذهب"], ["/prices", "Live prices", "الأسعار الحية"], ["/trade", "Trade", "التداول"],
  ["/sell", "Sell to Melody", "البيع لميلودي"], ["/insights", "Insights", "التحليلات"], ["/about", "About", "من نحن"],
] as const;
const EXTRA = [["/vault", "My vault", "خزنتي"], ["/transfer", "Transfer gold", "نقل الذهب"], ["/help", "Help & contact", "المساعدة والتواصل"]] as const;
const ACCOUNT = ["/vault", "/trade", "/transfer"];

export function Header() {
  const path = usePathname();
  const lang = useLang();
  const t = makeT(lang);
  const over = ["/", "/about", "/prices", "/gold-bars", "/sell", "/help"].includes(path);
  const auth = ACCOUNT.includes(path);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setMenu(false); }, [path]);
  const isOn = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  const solid = !over || scrolled;

  return (
    <>
      <div className={`site-head${over ? " over" : ""}`}>
        <div className="ticker">
          <div className="wrap">
            <span>{t("GOLD 24K", "ذهب عيار 24")} <b><LiveNum field="mid" /></b> {t("/ g", "/ غ")} <LiveChange /></span>
            <span className="sep hide-sm" />
            <span>{t("WE SELL", "نبيع")} <b><LiveNum field="sell" /></b></span>
            <span className="sep" />
            <span>{t("WE BUY", "نشتري")} <b><LiveNum field="buy" /></b></span>
            <span className="sep hide-sm" />
            <span className="hide-sm">{t("1 OZ", "الأونصة")} <b><LiveNum field="ounce" /></b></span>
            <span className="sample hide-sm">{t("SAMPLE PRICES", "أسعار تجريبية")}</span>
            <div className="right">
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}><span className="live-dot" style={{ background: "var(--up-on-dark)" }} /> {t("Updated every 30 seconds", "تُحدَّث كل 30 ثانية")}</span>
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="phone" size={14} /> {t("[Phone]", "[الهاتف]")}</span>
            </div>
          </div>
        </div>
        <header className={`hdr${over ? " over" : ""}${solid && over ? " scrolled" : ""}`}>
          <div className="wrap">
            <Link href="/" className="brand" aria-label={t("Melody home", "الصفحة الرئيسية لميلودي")}><Logo size={46} id="lg-head" /><span className="brand-lock"><span className="brand-name">MELODY</span><span className="brand-sub">{t("Digital Gold Bank", "بنك الذهب الرقمي")}</span></span></Link>
            <nav className="nav" aria-label={t("Main", "القائمة الرئيسية")}>
              {NAV.map(([h, en, ar]) => <Link key={h} href={h} className={isOn(h) ? "on" : ""}>{t(en, ar)}</Link>)}
            </nav>
            <div className="tools">
              <button className="ar" lang={lang === "ar" ? "en" : "ar"} onClick={() => switchLang(lang === "ar" ? "en" : "ar")}>{lang === "ar" ? "English" : "العربية"}</button>
              <Link href="/help" className="search" aria-label={t("Search help", "البحث في المساعدة")}><Icon name="search" /></Link>
              {auth ? (
                <>
                  <span aria-label={t("[Client name]", "[اسم العميل]")} style={{ width: 34, height: 34, borderRadius: 17, border: "1px solid currentColor", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: 16 }}>A</span>
                  <Link href="/vault" className="btn btn-gold btn-sm"><Icon name="vault" size={15} /> {t("My vault", "خزنتي")}</Link>
                </>
              ) : (
                <>
                  <Link href="/vault" className="signin" style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase" }}>{t("Sign in", "تسجيل الدخول")}</Link>
                  <Link href="/vault" className="btn btn-gold btn-sm">{t("Open account", "افتح حساباً")}</Link>
                </>
              )}
              <button className="menu-btn" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label={menu ? t("Close menu", "إغلاق القائمة") : t("Open menu", "فتح القائمة")}><Icon name={menu ? "close" : "filter"} size={24} /></button>
            </div>
          </div>
        </header>
        <AnimatePresence>
          {menu && (
            <>
              <motion.div className="menu-dim" onClick={() => setMenu(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} />
              <motion.nav className="mobile-menu" aria-label={t("Menu", "القائمة")} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                {[...NAV, ...EXTRA].map(([h, en, ar]) => (
                  <Link key={h} href={h} className={`m${isOn(h) ? " on" : ""}`}>{t(en, ar)}</Link>
                ))}
                <Link href="/vault" className="btn btn-gold m-cta">{auth ? t("My vault", "خزنتي") : t("Open account", "افتح حساباً")}</Link>
                <button className="m-lang" lang={lang === "ar" ? "en" : "ar"} onClick={() => switchLang(lang === "ar" ? "en" : "ar")}>{lang === "ar" ? "English" : "العربية"}</button>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
