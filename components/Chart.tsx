"use client";
// Area chart that draws itself in, fed by the sample history API.
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Range } from "@/lib/pricing";

type Pt = { t: string; v: number };

export function useHistory(range: Range) {
  const [pts, setPts] = useState<Pt[] | null>(null);
  useEffect(() => {
    let alive = true;
    setPts(null);
    fetch(`/api/prices/history?range=${range}`).then((r) => r.json()).then((d) => alive && setPts(d.points)).catch(() => {});
    return () => { alive = false; };
  }, [range]);
  return pts;
}

export function AreaChart({ points, height, color = "#F2C98A", grid = true, axis = false }: { points: Pt[] | null; height: number; color?: string; grid?: boolean; axis?: boolean }) {
  const W = 1000, H = height, pad = 6;
  if (!points || points.length < 2) return <div style={{ height }} aria-busy="true" />;
  const vs = points.map((p) => p.v);
  const min = Math.min(...vs), max = Math.max(...vs);
  const X = (i: number) => pad + (i / (points.length - 1)) * (W - pad * 2);
  const Y = (v: number) => pad + (1 - (v - min) / (max - min || 1)) * (H - pad * 2);
  const line = points.map((p, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(p.v).toFixed(1)}`).join(" ");
  const area = `${line} L${X(points.length - 1)} ${H} L${X(0)} ${H} Z`;
  const key = points[0].t + points.length;
  const id = "g" + key.replace(/\W/g, "");
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => max - (max - min) * f);
  return (
    <div dir="ltr" style={{ position: "relative", height }}>
      {grid && <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--rule-dark) 1px, transparent 1px)", backgroundSize: `100% ${height / 4}px` }} />}
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" width="100%" height={height} style={{ display: "block", position: "relative" }} role="img" aria-label={`Price chart from $${min.toFixed(2)} to $${max.toFixed(2)}`}>
        <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".32" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
        <motion.path key={"a" + key} d={area} fill={`url(#${id})`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6 }} />
        <motion.path key={"l" + key} d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.2, 0.7, 0.2, 1] }} />
      </svg>
      {axis && <div className="num" style={{ position: "absolute", right: -60, top: -8, bottom: -8, display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 11, color: "var(--on-dark-muted)" }}>{ticks.map((t) => <span key={t}>${t.toFixed(0)}</span>)}</div>}
    </div>
  );
}
