"use client";
// Filterable bar listing. Filtering runs in the browser on the sample catalogue.
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useLang, useT } from "@/components/Lang";
import { ProductCard } from "@/components/ProductCard";
import { usePrices } from "@/components/PriceProvider";
import { PRODUCTS, productPrice, type Product } from "@/lib/data";
import { usd } from "@/lib/format";

const TYPES: Product["type"][] = ["Minted", "Cast", "Gift set"];
const SORTS = { weight: "Weight, low to high", "price-desc": "Price, high to low", "per-gram": "Best price per gram" } as const;
const SORTS_AR: Record<keyof typeof SORTS, string> = { weight: "الوزن، من الأخف إلى الأثقل", "price-desc": "السعر، من الأعلى إلى الأدنى", "per-gram": "أفضل سعر للغرام" };
const TYPE_LABEL_AR: Record<Product["type"], string> = { Minted: "سبائك مسكوكة", Cast: "سبائك مصبوبة", "Gift set": "أطقم الهدايا" };
const MAX_STEPS = [1000, 5000, 20000, 50000, 200000];

export function Shop() {
  const t = useT();
  const lang = useLang();
  const { quote } = usePrices();
  const [types, setTypes] = useState<string[]>([...TYPES]);
  const [weight, setWeight] = useState<string | null>(null);
  const [inStock, setInStock] = useState(false);
  const [maxIdx, setMaxIdx] = useState(MAX_STEPS.length - 1);
  const [sort, setSort] = useState<keyof typeof SORTS>("weight");

  const list = useMemo(() => {
    let l = PRODUCTS.map((p) => ({ p, ...productPrice(p, quote.sell) }));
    l = l.filter(({ p }) => types.includes(p.type));
    if (weight) l = l.filter(({ p }) => p.weightLabel === weight);
    if (inStock) l = l.filter(({ p }) => p.stock !== "pre");
    l = l.filter(({ total }) => total <= MAX_STEPS[maxIdx]);
    if (sort === "price-desc") l.sort((a, b) => b.total - a.total);
    else if (sort === "per-gram") l.sort((a, b) => a.perGram - b.perGram);
    else l.sort((a, b) => a.p.weightG - b.p.weightG);
    return l;
  }, [quote.sell, types, weight, inStock, maxIdx, sort]);

  const toggle = (ty: string) => setTypes((s) => (s.includes(ty) ? s.filter((x) => x !== ty) : [...s, ty]));
  const clear = () => { setTypes([...TYPES]); setWeight(null); setInStock(false); setMaxIdx(MAX_STEPS.length - 1); };
  const pct = (maxIdx / (MAX_STEPS.length - 1)) * 100;

  return (
    <section style={{ padding: "70px 0 130px" }}>
      <div className="wrap" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
        <aside className="filters" style={{ position: "sticky", top: 150 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 18, borderBottom: "1px solid var(--ink)" }}><span className="eyebrow plain" style={{ color: "var(--ink)" }}>{t("Refine", "تصفية")}</span><button onClick={clear} style={{ fontSize: 12, color: "var(--muted)", textDecoration: "underline" }}>{t("Clear all", "مسح الكل")}</button></div>
          <div className="f-group"><h4>{t("Bar type", "نوع السبيكة")}</h4>
            {TYPES.map((ty) => <div key={ty} role="checkbox" aria-checked={types.includes(ty)} tabIndex={0} className={`f-opt${types.includes(ty) ? " on" : ""}`} onClick={() => toggle(ty)} onKeyDown={(e) => e.key === " " && toggle(ty)}><span className="box" />{lang === "ar" ? TYPE_LABEL_AR[ty] : ty === "Gift set" ? "Gift sets" : `${ty} bars`}<span className="count">{PRODUCTS.filter((p) => p.type === ty).length}</span></div>)}
          </div>
          <div className="f-group"><h4>{t("Weight", "الوزن")}</h4>
            <div className="pills">{PRODUCTS.filter((p) => p.type !== "Gift set").map((p) => <button key={p.slug} className={`pill${weight === p.weightLabel ? " on" : ""}`} onClick={() => setWeight(weight === p.weightLabel ? null : p.weightLabel)}>{lang === "ar" ? p.weightLabelAr : p.weightLabel}</button>)}</div>
          </div>
          <div className="f-group"><h4>{t("Up to", "حتى")} <span className="num" style={{ letterSpacing: 0 }}>{usd(MAX_STEPS[maxIdx], 0)}</span></h4>
            <div dir="ltr">
            <div className="range"><span className="fill" style={{ left: 0, right: `${100 - pct}%` }} /><span className="knob" style={{ left: 0 }} /><span className="knob" style={{ left: `${pct}%` }} /></div>
            <input aria-label={t("Maximum price", "السعر الأقصى")} type="range" min={0} max={MAX_STEPS.length - 1} value={maxIdx} onChange={(e) => setMaxIdx(+e.target.value)} style={{ width: "100%", marginTop: -30, opacity: 0, cursor: "pointer", height: 30, position: "relative" }} />
            <div className="range-vals num"><span>$150</span><span>{usd(MAX_STEPS[MAX_STEPS.length - 1], 0)}</span></div>
            </div>
          </div>
          <div className="f-group"><h4>{t("Availability", "التوفر")}</h4>
            <div role="checkbox" aria-checked={inStock} tabIndex={0} className={`f-opt${inStock ? " on" : ""}`} onClick={() => setInStock(!inStock)} onKeyDown={(e) => e.key === " " && setInStock(!inStock)}><span className="box" />{t("In stock only", "المتوفر فقط")}<span className="count">{PRODUCTS.filter((p) => p.stock !== "pre").length}</span></div>
          </div>
          <div className="f-group" style={{ borderBottom: 0 }}><h4>{t("Purity", "النقاء")}</h4><div className="f-opt on"><span className="box" />{t("999.9 fine gold, 24K", "ذهب خالص 999.9 · عيار 24")}<span className="count">{PRODUCTS.length}</span></div></div>
        </aside>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>{lang === "ar" ? <>عرض <b style={{ color: "var(--ink)", fontWeight: 600 }}>{list.length}</b> من سبائك الذهب · <span className="sample">أسعار تجريبية</span></> : <>Showing <b style={{ color: "var(--ink)", fontWeight: 600 }}>{list.length}</b> gold bars · <span className="sample">SAMPLE PRICES</span></>}</span>
            <label className="select" style={{ position: "relative" }}>{t("Sort:", "الترتيب:")}
              <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof SORTS)} style={{ border: 0, background: "transparent", outline: 0, fontSize: 13 }}>
                {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{lang === "ar" ? SORTS_AR[k as keyof typeof SORTS] : v}</option>)}
              </select>
            </label>
          </div>
          <motion.div layout className="g3">
            <AnimatePresence mode="popLayout">
              {list.map(({ p, perGram, total }, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.6 } }} exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}>
                  <ProductCard p={p} perGram={perGram} total={total} lang={lang} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {!list.length && (
            <div className="panel" style={{ padding: 48, textAlign: "center" }}>
              <h3 style={{ fontSize: 30 }}>{t("No bars match these filters", "لا توجد سبائك تطابق هذه الخيارات")}</h3>
              <p className="muted" style={{ marginTop: 8 }}>{t("Try a different weight or a higher price limit.", "جرّب وزناً آخر أو حداً أعلى للسعر.")}</p>
              <button className="btn btn-dark" style={{ marginTop: 24 }} onClick={clear}>{t("Clear filters", "مسح الخيارات")}</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
