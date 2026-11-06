"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import { ARTICLES } from "@/lib/data";
import { useLang, useT } from "@/components/Lang";

const TABS = ["All", "Market outlook", "Guides", "Vault & security", "Company news"];
// Filtering stays on the English category value; only the label changes.
const TABS_AR: Record<string, string> = { All: "الكل", "Market outlook": "نظرة على السوق", Guides: "أدلّة", "Vault & security": "الخزنة والأمان", "Company news": "أخبار الشركة" };
const minsAr = (n: number) => (n === 1 ? "دقيقة واحدة" : n === 2 ? "دقيقتان" : n <= 10 ? `${n} دقائق` : `${n} دقيقة`);

export function ArticleGrid() {
  const [tab, setTab] = useState("All");
  const t = useT();
  const ar = useLang() === "ar";
  const list = tab === "All" ? ARTICLES : ARTICLES.filter((a) => a.cat === tab);
  return (
    <>
      <div className="tabs" role="tablist">{TABS.map((k) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{ar ? TABS_AR[k] : k}</button>)}</div>
      <motion.div layout className="g3" style={{ gap: "36px 32px", marginTop: 48 }}>
        <AnimatePresence mode="popLayout">
          {list.map((a, i) => (
            <motion.article key={a.slug} layout className="art zoom" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.6 } }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              <div className="ph" style={{ height: 280 }}><img src={a.image} alt="" style={{ objectPosition: a.pos, filter: a.image.includes("vault") ? "sepia(0.3)" : undefined }} /></div>
              <span className="meta">{ar ? `${a.catAr} · ${minsAr(a.mins)}` : <>{a.cat} · {a.mins} min</>}</span><h3>{ar ? a.titleAr : a.title}</h3><p>{ar ? a.blurbAr : a.blurb}</p>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      <p className="helper" style={{ marginTop: 30 }}>{t("Article pages are not written yet — these are sample headlines.", "صفحات المقالات لم تُكتب بعد، وهذه عناوين تجريبية.")}</p>
    </>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const t = useT();
  const [state, setState] = useState<{ ok?: string; error?: string }>({});
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
    const data = res ? await res.json() : { error: t("Could not reach the server. Try again.", "تعذّر الاتصال بالخادم. حاول مرة أخرى.") };
    setState(res?.ok ? { ok: t(`Demo: ${data.email} was checked but not saved. Sign-up is not connected yet.`, `تجريبي: تم التحقق من \u2066${data.email}\u2069 لكن لم يُحفظ. الاشتراك غير مفعَّل بعد.`) } : { error: data.error });
  };
  return (
    <Reveal className="pad-sm card-surface" style={{ marginTop: 70, padding: "50px 56px", color: "var(--on-dark)" }}>
      <form onSubmit={submit} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
        <div><div className="eyebrow">{t("The Monday note", "نشرة الاثنين")}</div><h3 style={{ fontSize: 38, marginTop: 12 }}>{t("The week ahead for gold, every Monday", "أسبوع الذهب المقبل، كل يوم اثنين")}</h3></div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <label className="sr-only" htmlFor="nl">{t("Email address", "البريد الإلكتروني")}</label>
          <input id="nl" type="email" required placeholder={t("Your email address", "بريدك الإلكتروني")} value={email} onChange={(e) => setEmail(e.target.value)} className="input" style={{ width: 340, maxWidth: "100%", borderColor: "var(--gold-line)", background: "transparent", color: "var(--on-dark)", outline: 0 }} />
          <button className="btn btn-gold" style={{ height: 56 }}>{t("Subscribe", "اشترك")}</button>
        </div>
      </form>
      <AnimatePresence>{(state.ok || state.error) && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 16, fontSize: 13, color: state.error ? "#F3A6A6" : "var(--pale-gold)", display: "flex", gap: 8, alignItems: "center" }} role="status"><Icon name={state.error ? "close" : "check"} size={15} />{state.ok ?? state.error}</motion.p>}</AnimatePresence>
    </Reveal>
  );
}
