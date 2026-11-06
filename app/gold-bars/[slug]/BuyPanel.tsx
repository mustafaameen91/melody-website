"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { useLang, useT } from "@/components/Lang";
import { Tween } from "@/components/Motion";
import { usePrices } from "@/components/PriceProvider";
import { PRODUCTS, TYPE_AR, getProduct, productPrice } from "@/lib/data";
import { usd } from "@/lib/format";

export function BuyPanel({ slug, gallery }: { slug: string; gallery: string[] }) {
  const t = useT();
  const lang = useLang();
  const ar = lang === "ar";
  const OPTIONS = [
    { id: "vault", title: t("Keep it in my Melody vault", "احفظها في خزنتي لدى ميلودي"), text: t("Insured, free of charge. Transfer or sell in seconds.", "مؤمَّنة ومجانية. انقلها أو بِعها في ثوانٍ."), side: <span className="chip chip-green">{t("Free", "مجاناً")}</span> },
    { id: "deliver", title: t("Insured delivery to my address", "توصيل مؤمَّن إلى عنواني"), text: t("Armoured courier across Iraq, signature required.", "ناقل مصفّح في جميع أنحاء العراق، مع توقيع عند الاستلام."), side: <span className="num muted">{t("[Fee]", "[الرسوم]")}</span> },
    { id: "collect", title: t("Collect from the showroom", "الاستلام من صالة العرض"), text: t("By appointment, with ID.", "بموعد مسبق، مع إثبات الهوية."), side: <span className="muted">{t("Free", "مجاناً")}</span> },
  ];
  const p = getProduct(slug)!;
  const name = ar ? p.nameAr : p.name;
  const { quote } = usePrices();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [opt, setOpt] = useState("vault");
  const [held, setHeld] = useState(60);
  const [toast, setToast] = useState("");
  const pr = productPrice(p, quote.sell);
  const total = pr.total * qty;

  useEffect(() => { setHeld(60); const id = setInterval(() => setHeld((s) => (s > 0 ? s - 1 : 60)), 1000); return () => clearInterval(id); }, [quote.updatedAt]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 4000); return () => clearTimeout(t); }, [toast]);

  return (
    <div className="split" style={{ display: "grid", gridTemplateColumns: "1.08fr 1fr", gap: 72, marginTop: 30, alignItems: "flex-start" }}>
      <div style={{ position: "sticky", top: 150 }}>
        <div className="ph" style={{ height: 700 }}>
          <AnimatePresence mode="wait">
            <motion.img key={gallery[img]} src={gallery[img]} alt={name} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: img === 0 ? p.imagePos : "50% 50%" }} />
          </AnimatePresence>
          {p.tag && <span className="chip chip-maroon" style={{ position: "absolute", top: 20, insetInlineStart: 20, zIndex: 2 }}>{ar ? p.tagAr ?? p.tag : p.tag}</span>}
        </div>
        <div className="thumbs">
          {gallery.map((g, i) => <button key={g} className={i === img ? "on" : ""} onClick={() => setImg(i)} aria-label={t(`Photo ${i + 1}`, `الصورة ${i + 1}`)}><img src={g} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} /></button>)}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, x: ar ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}>
        <div className="eyebrow">{ar ? `سبيكة ${TYPE_AR[p.type]} · ذهب خالص 999.9` : `${p.type} bar · 999.9 fine gold`}</div>
        <h1 style={{ fontSize: 70, marginTop: 18 }}>{name}</h1>
        <p className="muted" style={{ marginTop: 12 }}>{t("Sealed in tamper-proof packaging with its own serial number and assay certificate.", "مختومة في تغليف محكم ضد العبث، برقم تسلسلي وشهادة فحص خاصة بها.")}</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 30, padding: "26px 0", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", flexWrap: "wrap" }}>
          <Tween value={total} format={(n) => usd(n)} className="num serif" style={{ fontSize: "clamp(40px, 10vw, 60px)", lineHeight: 1, color: "var(--maroon)" }} />
          <span className="muted num">{usd(pr.perGram)} / {t("g", "غ")}</span>
          <span className="sample muted" style={{ marginInlineStart: "auto" }}>{t("SAMPLE PRICE", "سعر تجريبي")}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 14, gap: 12, flexWrap: "wrap" }}>
          <span className="muted">{t("We buy it back today at", "نشتريها منك اليوم بسعر")} <b className="num" style={{ color: "var(--ink)", fontWeight: 600 }}>{usd(quote.buy * p.weightG * qty)}</b></span>
          <span style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--muted)" }}><Icon name="clock" size={15} />{t("Price held for", "السعر محجوز لمدة")} <span className="num" dir="ltr">0:{String(held).padStart(2, "0")}</span></span>
        </div>

        <div className="field" style={{ marginTop: 32 }}><label>{t("Weight", "الوزن")}</label>
          <div className="wt">{PRODUCTS.filter((x) => x.type !== "Gift set").map((x) => <Link key={x.slug} href={`/gold-bars/${x.slug}`} className={x.slug === p.slug ? "on" : ""} scroll={false}>{ar ? x.weightLabelAr : x.weightLabel}</Link>)}</div>
        </div>

        <div className="field" style={{ marginTop: 26 }}><label>{t("After purchase", "بعد الشراء")}</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }} role="radiogroup">
            {OPTIONS.map((o) => (
              <button key={o.id} role="radio" aria-checked={opt === o.id} className={`opt${opt === o.id ? " on" : ""}`} onClick={() => setOpt(o.id)}>
                <span className="radio" /><div style={{ flex: 1 }}><div style={{ fontWeight: 600 }}>{o.title}</div><div className="muted" style={{ fontSize: 13 }}>{o.text}</div></div>{o.side}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
          <div className="input" style={{ width: 150, justifyContent: "space-between", height: 58 }}>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label={t("One less", "واحدة أقل")} style={{ width: 28, fontSize: 20 }}>−</button>
            <span className="num serif" style={{ fontSize: 22 }}>{qty}</span>
            <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label={t("One more", "واحدة أكثر")} style={{ width: 28, fontSize: 20 }}>+</button>
          </div>
          <button className="btn btn-dark" style={{ flex: 1, height: 58 }} onClick={() => setToast(t(`Demo: checkout is not connected yet. Your order of ${qty} × ${p.name} (${usd(total)}) was not placed.`, `تجريبي: الدفع غير مفعّل بعد. لم يُنفَّذ طلبك لـ ${qty} × ${p.nameAr} (\u2066${usd(total)}\u2069).`))}>{t("Buy now", "اشترِ الآن")} · <span dir="ltr">{usd(total)}</span></button>
          <button className="btn btn-line" style={{ height: 58, width: 58, padding: 0 }} aria-label={t("Save to favourites", "أضف إلى المفضلة")} onClick={() => setToast(t("Saved to favourites (demo — not stored).", "أُضيفت إلى المفضلة (تجريبي — لم تُحفظ فعلياً)."))}><Icon name="heart" /></button>
        </div>
        <div className="g3" style={{ gap: 16, marginTop: 26, fontSize: 12, color: "var(--muted)" }}>
          <span style={{ display: "flex", gap: 10, alignItems: "center" }}><Icon name="shield" style={{ color: "var(--gold)" }} />{t("Fully insured", "مؤمَّنة بالكامل")}</span>
          <span style={{ display: "flex", gap: 10, alignItems: "center" }}><Icon name="cert" style={{ color: "var(--gold)" }} />{t("Certificate included", "تشمل الشهادة")}</span>
          <span style={{ display: "flex", gap: 10, alignItems: "center" }}><Icon name="scale" style={{ color: "var(--gold)" }} />{t("Guaranteed buy-back", "استرداد مضمون")}</span>
        </div>
      </motion.div>

      <AnimatePresence>{toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 20, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 20, x: "-50%" }}>{toast}</motion.div>}</AnimatePresence>
    </div>
  );
}
