// Sample price engine. There is no live market feed yet: the mid price is a
// deterministic random walk around the design's reference price, so every
// visitor sees the same numbers at the same moment. Replace `midAt` with the
// real price provider when it is chosen.

export const REFERENCE_MID = 148.02; // USD per gram, 24K
export const SELL_MARKUP = 151.7 / 148.02; // what the client pays
export const BUYBACK_RATE = 146.5 / 148.02; // what Melody pays back
export const GRAMS_PER_OUNCE = 31.1035;
export const TICK_MS = 30_000;

function noise(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Mid price per gram at a given time, wandering at most about ±0.6%. */
export function midAt(t: number) {
  const step = Math.floor(t / TICK_MS);
  const wave = Math.sin(step / 37) * 0.45 + Math.sin(step / 11) * 0.25;
  const jitter = (noise(step) - 0.5) * 0.35;
  return round2(REFERENCE_MID + wave + jitter);
}

export const round2 = (v: number) => Math.round(v * 100) / 100;

export type Quote = {
  mid: number;
  sell: number;
  buy: number;
  ounce: number;
  kilo: number;
  open: number;
  change: number;
  changePct: number;
  dayLow: number;
  dayHigh: number;
  updatedAt: string;
  sample: true;
};

export function quoteAt(t = Date.now()): Quote {
  const mid = midAt(t);
  const dayStart = new Date(t);
  dayStart.setUTCHours(0, 0, 0, 0);
  const open = midAt(dayStart.getTime());
  let lo = mid, hi = mid;
  for (let s = dayStart.getTime(); s <= t; s += TICK_MS * 20) {
    const v = midAt(s);
    lo = Math.min(lo, v);
    hi = Math.max(hi, v);
  }
  return {
    mid,
    sell: round2(mid * SELL_MARKUP),
    buy: round2(mid * BUYBACK_RATE),
    ounce: round2(mid * GRAMS_PER_OUNCE),
    kilo: Math.round(mid * 1000),
    open,
    change: round2(mid - open),
    changePct: round2(((mid - open) / open) * 100),
    dayLow: lo,
    dayHigh: hi,
    updatedAt: new Date(Math.floor(t / TICK_MS) * TICK_MS).toISOString(),
    sample: true,
  };
}

export const RANGES = {
  "1D": { points: 48, span: 24 * 3600e3 },
  "1W": { points: 42, span: 7 * 24 * 3600e3 },
  "1M": { points: 30, span: 30 * 24 * 3600e3 },
  "6M": { points: 52, span: 182 * 24 * 3600e3 },
  "1Y": { points: 52, span: 365 * 24 * 3600e3 },
  "5Y": { points: 60, span: 5 * 365 * 24 * 3600e3 },
} as const;
export type Range = keyof typeof RANGES;

/** Sample history ending at today's mid, trending up the way the design shows. */
export function historyFor(range: Range, t = Date.now()) {
  const { points, span } = RANGES[range];
  const end = midAt(t);
  const drift = { "1D": 0.01, "1W": 0.02, "1M": 0.04, "6M": 0.11, "1Y": 0.22, "5Y": 0.9 }[range];
  const start = end / (1 + drift);
  return Array.from({ length: points }, (_, i) => {
    const f = i / (points - 1);
    const ts = t - span + f * span;
    const base = start + (end - start) * f;
    const wobble = i === points - 1 ? 0 : (noise(i * 7 + points) - 0.5) * end * drift * 0.18 + Math.sin(i / 2) * end * drift * 0.05;
    return { t: new Date(ts).toISOString(), v: round2(base + wobble) };
  });
}
