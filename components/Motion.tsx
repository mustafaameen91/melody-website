"use client";
// Scroll reveals, counters and parallax used across the pages.
import { animate, motion, useInView, useMotionValue, useScroll, useTransform, type Variants } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const ease = [0.2, 0.7, 0.2, 1] as const;

export function Reveal({ children, delay = 0, y = 36, className, style, as = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties; as?: "div" | "section" | "span" }) {
  const M = motion[as];
  return (
    <M className={className} style={style} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </M>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item: Variants = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

export function Stagger({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <motion.div className={className} style={style} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </motion.div>
  );
}

export function Item({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <motion.div className={className} style={style} variants={item}>{children}</motion.div>;
}

/** Headline whose lines rise out of a mask, one after another. */
export function RiseLines({ lines, delay = 0.2, className, style }: { lines: ReactNode[]; delay?: number; className?: string; style?: CSSProperties }) {
  return (
    <h1 className={className} style={style}>
      {lines.map((l, i) => (
        <span className="line-mask" key={i}>
          <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: delay + i * 0.13, ease }}>{l}</motion.span>
        </span>
      ))}
    </h1>
  );
}

export function FadeIn({ children, delay = 0, className, style }: { children: ReactNode; delay?: number; className?: string; style?: CSSProperties }) {
  return (
    <motion.div className={className} style={style} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  );
}

/** Counts up to a number when scrolled into view. */
export function CountUp({ to, decimals = 0, prefix = "", suffix = "", className, style }: { to: number; decimals?: number; prefix?: string; suffix?: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  const text = v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref} className={className} style={style}>{prefix}{text}{suffix}</span>;
}

/** Smoothly tweens a number whenever it changes (used for live prices). */
export function Tween({ value, format, className, style }: { value: number; format: (n: number) => string; className?: string; style?: CSSProperties }) {
  const mv = useMotionValue(value);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.9, ease, onUpdate: setShown });
    return () => c.stop();
  }, [value, mv]);
  return <span className={className} style={style}>{format(shown)}</span>;
}

/** Background photo that drifts slower than the page. */
export function ParallaxImg({ src, alt = "", pos = "50% 50%", strength = 80, filter }: { src: string; alt?: string; pos?: string; strength?: number; filter?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  return (
    <div ref={ref} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <motion.img src={src} alt={alt} style={{ position: "absolute", left: 0, width: "100%", top: -strength, height: `calc(100% + ${strength * 2}px)`, objectFit: "cover", objectPosition: pos, y, filter }} />
    </div>
  );
}
