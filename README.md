# Melody website

The Melody investment-gold website, built from `Melody-Website-Design.pdf`.

- **Front end:** Next.js 15 (React 19, App Router), TypeScript, Motion for animation
- **Back end:** Next.js route handlers on Node.js (`app/api/*`)
- **Fonts:** Cormorant Garamond + Montserrat for English; IBM Plex Sans Arabic for Arabic (via `next/font`)
- **Languages:** English and Arabic (right to left). The العربية / English button sets a `lang` cookie; text is written inline as `t("English", "العربية")` (`lib/i18n.ts`, `components/Lang.tsx`, `lib/i18n-server.ts`)
- **Colours:** card burgundy `#3A0810` (lit `#561421`, deep `#200306`) and amber champagne gold, taken from the Melody card

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/prices` | Live prices, chart ranges, price alerts |
| `/gold-bars` | Shop with working filters and sorting |
| `/gold-bars/[slug]` | Product page (9 bars) |
| `/trade` | Trade gold (sample account) |
| `/vault` | My vault (sample account) |
| `/transfer` | Transfer gold — 3-step flow |
| `/sell` | Sell to Melody with instant estimate |
| `/insights` | Insights with category tabs and newsletter |
| `/help` | Help & contact with FAQ |

## API

| Method | Route | Does |
|---|---|---|
| GET | `/api/prices` | Current quote: mid, sell, buy-back, ounce, day range |
| GET | `/api/prices/history?range=1D\|1W\|1M\|6M\|1Y\|5Y` | Chart points |
| GET | `/api/products` | Catalogue with live prices (`type`, `inStock`, `maxPrice`, `sort`) |
| GET | `/api/products/[slug]` | One bar |
| GET | `/api/vault` | Sample account |
| POST | `/api/transfer` | Validates a transfer, returns a receipt |
| POST | `/api/trade/quote` | Prices an order |
| POST | `/api/sell/estimate` | Buy-back estimate |
| POST | `/api/alerts` | Validates a price alert |
| POST | `/api/newsletter` | Validates an email |

## What is sample or not connected yet

Everything below is labelled in the UI as well.

- **Prices are simulated.** `lib/pricing.ts` generates a price that moves every 30 seconds around $148.02/g. Replace `midAt()` with the real price provider.
- **No database or sign-in.** The account pages use the sample client in `lib/data.ts`. Transfers, trades, alerts, sell locks and newsletter sign-ups are validated by the API but **nothing is saved and no gold moves**.
- **Checkout is not connected.** "Buy now" shows a demo message.
- **Arabic uses the same URLs** as English (chosen by cookie), so search engines only index the English version. Separate `/ar/...` addresses can be added later if Arabic search results matter.
- **Not built:** article pages, deliveries, certificates, security settings, "new client" in transfers, booking appointments.
- **Placeholders** in square brackets (`[Phone]`, `[Fee]`, `[Founder name]`…) need Melody's real details.
- **Photos** are free Unsplash stock (in `public/img`). Some bars show another refiner's stamp; replace them with Melody's own product photography before launch.
