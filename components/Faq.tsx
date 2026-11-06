"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "./Icon";

export function Faq({ items, first = 0 }: { items: [string, string][]; first?: number }) {
  const [open, setOpen] = useState<number | null>(first);
  return (
    <div style={{ borderTop: "1px solid var(--ink)" }}>
      {items.map(([q, a], i) => (
        <div key={q} className={`qa${open === i ? " open" : ""}`}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>{q}<Icon name="plus" size={18} /></button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
                <p>{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
