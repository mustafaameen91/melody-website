// Two languages, chosen by the "lang" cookie. Text is written inline as t("English", "العربية").
export type Lang = "en" | "ar";
export type T = (en: string, ar: string) => string;

export const LANG_COOKIE = "lang";
export const isLang = (v: unknown): v is Lang => v === "en" || v === "ar";
export const makeT = (lang: Lang): T => (en, ar) => (lang === "ar" ? ar : en);
/** Locale for dates and numbers. Arabic keeps Western digits so prices read the same in both languages. */
export const localeOf = (lang: Lang) => (lang === "ar" ? "ar-IQ-u-nu-latn" : "en-GB");
