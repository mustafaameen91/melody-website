"use client";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { PriceProvider } from "./PriceProvider";
import { LangProvider } from "./Lang";
import type { Lang } from "@/lib/i18n";
import type { Quote } from "@/lib/pricing";

export function Providers({ initial, lang, children }: { initial: Quote; lang: Lang; children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider lang={lang}>
        <PriceProvider initial={initial}>{children}</PriceProvider>
      </LangProvider>
    </MotionConfig>
  );
}
