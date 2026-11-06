import Link from "next/link";
import { Icon } from "./Icon";
import { TYPE_AR, type Product } from "@/lib/data";
import type { Lang } from "@/lib/i18n";
import { usd } from "@/lib/format";

export function ProductCard({ p, perGram, total, compact = false, lang = "en" }: { p: Product; perGram: number; total: number; compact?: boolean; lang?: Lang }) {
  const ar = lang === "ar";
  return (
    <Link href={`/gold-bars/${p.slug}`} className="p-card zoom" style={{ height: "100%" }}>
      <div className="ph" style={{ aspectRatio: "4 / 4.2" }}>
        <img src={p.image} alt={ar ? p.nameAr : p.name} style={{ objectPosition: p.imagePos, objectFit: "cover", position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        {p.tag && <span className="chip chip-maroon tag">{ar ? p.tagAr : p.tag}</span>}
      </div>
      <div className="p-body">
        <span className="p-meta">{ar ? TYPE_AR[p.type] : p.type} · 999.9</span>
        <span className="p-name">{ar ? p.nameAr : p.name}</span>
        <div className="p-foot">
          <div><b className="num">{usd(total, compact ? 0 : 2)}</b><small className="num">{usd(perGram)} {ar ? "/ غ" : "/ g"}</small></div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            <span className={`stock ${p.stock}`}>{ar ? p.stockLabelAr : p.stockLabel}</span>
            {!compact && <span className="add" aria-hidden="true"><Icon name="plus" size={18} /></span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
