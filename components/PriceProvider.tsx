"use client";
// Polls the sample price API every 30 seconds and shares the quote with the page.
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Quote } from "@/lib/pricing";

type Ctx = { quote: Quote; prev: Quote | null };
const PriceCtx = createContext<Ctx | null>(null);

export function PriceProvider({ initial, children }: { initial: Quote; children: ReactNode }) {
  const [state, setState] = useState<Ctx>({ quote: initial, prev: null });
  const current = useRef(initial);
  useEffect(() => {
    let alive = true;
    const pull = async () => {
      try {
        const res = await fetch("/api/prices", { cache: "no-store" });
        if (!res.ok) return;
        const q: Quote = await res.json();
        if (!alive || q.updatedAt === current.current.updatedAt) return;
        setState({ quote: q, prev: current.current });
        current.current = q;
      } catch {
        /* keep the last price on network errors */
      }
    };
    pull();
    const id = setInterval(pull, 30_000);
    return () => { alive = false; clearInterval(id); };
  }, []);
  return <PriceCtx.Provider value={state}>{children}</PriceCtx.Provider>;
}

export function usePrices() {
  const c = useContext(PriceCtx);
  if (!c) throw new Error("usePrices must be used inside PriceProvider");
  return c;
}
