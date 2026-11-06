// Line icons and the Melody monogram, shared across the site.
import type { CSSProperties } from "react";

const ICONS: Record<string, string> = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    vault: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v1M12 15v1M8 12h1M15 12h1"/>',
    truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    cert: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
    send: '<path d="M4 12 20 4l-6 16-3-7z"/><path d="m11 13 9-9"/>',
    swap: '<path d="M7 20V4M3 8l4-4 4 4M17 4v16M13 16l4 4 4-4"/>',
    chart: '<path d="M3 20h18M4 15l5-5 4 3 7-7"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 7 2 7H4s2-2 2-7"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    phone: '<path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    gift: '<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12M12 9c-2-4-6-4-6-1.5S10 9 12 9zM12 9c2-4 6-4 6-1.5S14 9 12 9z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    scale: '<path d="M12 4v16M5 20h14M5 8h14M5 8l-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0z"/>'
  };

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 20, style, className = "ic" }: { name: string; size?: number; style?: CSSProperties; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" style={{ width: size, height: size, ...style }} dangerouslySetInnerHTML={{ __html: ICONS[name] ?? "" }} />;
}

const LOGO_PATH = 'M366 450 L459 527 L459 575 L405 532 L405 665 L398 658 L366 632 Z M563 449 L563 500 L466 574 L466 523 Z M563 540 L563 632 L527 658 Q500 674 466 672 L466 655 L526 608 L527 596 L489 596 Z';

export function Logo({ size = 50, id = "lg" }: { size?: number; id?: string }) {
  const f = `url(#${id})`;
  return (
    <svg width={size} height={size} viewBox="222 320 480 480" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B47A34" />
          <stop offset=".35" stopColor="#FADDBE" />
          <stop offset=".6" stopColor="#E7AB58" />
          <stop offset=".85" stopColor="#F4C17B" />
          <stop offset="1" stopColor="#A8712F" />
        </linearGradient>
      </defs>
      <circle cx="462" cy="560" r="236" fill="none" stroke={f} strokeWidth="12" />
      <circle cx="462" cy="560" r="206" fill="none" stroke={f} strokeWidth="10" strokeDasharray="269.6 53.9" strokeDashoffset="-26.95" />
      <path fill={f} d={LOGO_PATH} />
    </svg>
  );
}
