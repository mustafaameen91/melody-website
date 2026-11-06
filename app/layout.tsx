import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans_Arabic, Montserrat } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { getLang } from "@/lib/i18n-server";
import { quoteAt } from "@/lib/pricing";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-serif", display: "swap", adjustFontFallback: false });
const sans = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap", adjustFontFallback: false });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-ar", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const ar = (await getLang()) === "ar";
  return {
    title: { default: ar ? "ميلودي — الذهب الاستثماري" : "Melody — Investment gold", template: ar ? "%s · ميلودي" : "%s · Melody" },
    description: ar
      ? "اشترِ ذهباً عيار 999.9 بالسعر الحي، واحفظه مؤمَّناً باسمك، وأرسله أو بِعه أو استلمه متى شئت."
      : "Buy 999.9 fine gold at the live price, hold it insured in your name, and send, sell or take delivery whenever you choose.",
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={`${serif.variable} ${sans.variable} ${arabic.variable}`}>
      <body>
        <Providers initial={quoteAt()} lang={lang}>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
