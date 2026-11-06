"use client";
import { createContext, useContext, type ReactNode } from "react";
import { LANG_COOKIE, makeT, type Lang } from "@/lib/i18n";

const LangCtx = createContext<Lang>("en");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangCtx.Provider value={lang}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
export const useT = () => makeT(useContext(LangCtx));

/** Saves the choice for a year and reloads so every page renders in the new language and direction. */
export function switchLang(to: Lang) {
  document.cookie = `${LANG_COOKIE}=${to}; path=/; max-age=31536000; samesite=lax`;
  window.location.reload();
}
