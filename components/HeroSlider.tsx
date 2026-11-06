"use client";
// Home hero background: Melody photos cross-fading every few seconds, with dots and arrows.
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { useLang, useT } from "./Lang";

const SLIDES = [
  { src: "/img/melody-1kg-bar.jpg", pos: "62% 50%", en: "Melody 1 kg bar, 999.9 fine gold", ar: "سبيكة ميلودي 1 كغ، ذهب خالص 999.9" },
  { src: "/img/melody-bars-table.jpg", pos: "70% 50%", en: "Melody minted bars with their certificates", ar: "سبائك ميلودي المسكوكة مع شهاداتها" },
  { src: "/img/card-podium.jpg", pos: "68% 50%", en: "The Melody gold card", ar: "بطاقة ميلودي الذهبية" },
  { src: "/img/melody-showroom.jpg", pos: "58% 50%", en: "The Melody showroom", ar: "صالة عرض ميلودي" },
  { src: "/img/melody-box-dark.jpg", pos: "45% 50%", en: "A 50 g bar in its Melody case", ar: "سبيكة 50 غ في علبة ميلودي" },
];
const EVERY_MS = 6500;
// In Arabic the text sits on the right, so anchor each photo from the other side (photos are not flipped: they carry printed text)
const mirror = (pos: string) => pos.replace(/^(\d+)%/, (_, x) => `${100 - +x}%`);

export function HeroSlider() {
  const t = useT();
  const ar = useLang() === "ar";
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), EVERY_MS);
    return () => clearTimeout(id);
  }, [i, paused]);

  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length);
  const s = SLIDES[i];

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.img
          key={s.src}
          className="bg"
          src={s.src}
          alt={t(s.en, s.ar)}
          style={{ objectPosition: ar ? mirror(s.pos) : s.pos }}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1, transition: { opacity: { duration: 1.2 }, scale: { duration: 9, ease: "easeOut" } } }}
          exit={{ opacity: 0, transition: { duration: 1.2 } }}
          fetchPriority={i === 0 ? "high" : undefined}
        />
      </AnimatePresence>
      <div className="hero-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} role="group" aria-label={t("Photo slider", "عارض الصور")}>
        <button className="hs-arrow" onClick={() => go(i - 1)} aria-label={t("Previous photo", "الصورة السابقة")}><Icon name="arrow" size={18} className="ic flip-rtl hs-prev" /></button>
        <div className="hs-dots">
          {SLIDES.map((x, n) => (
            <button key={x.src} className={n === i ? "on" : ""} onClick={() => go(n)} aria-label={t(`Photo ${n + 1}`, `الصورة ${n + 1}`)} aria-current={n === i}>
              {n === i && !paused && <motion.span key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: EVERY_MS / 1000, ease: "linear" }} />}
            </button>
          ))}
        </div>
        <button className="hs-arrow" onClick={() => go(i + 1)} aria-label={t("Next photo", "الصورة التالية")}><Icon name="arrow" size={18} className="ic flip-rtl" /></button>
      </div>
    </>
  );
}
