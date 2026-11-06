import type { Lang } from "./i18n";

export const usd = (v: number, dp = 2) =>
  "$" + v.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
const fmt3 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
// Arabic: isolate the number left-to-right inside a right-to-left run, so "غ" stays after it
// even when the surrounding element is forced left-to-right.
export const grams = (v: number, lang: Lang = "en") =>
  lang === "ar" ? `\u2067\u2066${fmt3(v)}\u2069 غ\u2069` : `${fmt3(v)} g`;
export const signed = (v: number, f: (n: number) => string) => (v >= 0 ? "+" : "−") + f(Math.abs(v));
