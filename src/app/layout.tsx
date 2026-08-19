import type { Metadata, Viewport } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsent } from "@/components/ads/CookieConsent";
import { AppProviders } from "@/components/providers/AppProviders";
import { GoogleMarketingScripts } from "@/components/seo/GoogleMarketingScripts";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmartAssist } from "@/components/elite/SmartAssist";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

/**
 * Type system — craft authority:
 * Frank Ruhl Libre → display (Hebrew editorial serif)
 * Heebo → UI / body
 */
const display = Frank_Ruhl_Libre({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0d14" },
    { media: "(prefers-color-scheme: light)", color: "#f5f4f7" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${display.variable} ${heebo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full min-h-dvh bg-background font-sans text-foreground antialiased">
        <GoogleMarketingScripts />
        <JsonLd />
        <AppProviders>{children}</AppProviders>
        <SmartAssist />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
