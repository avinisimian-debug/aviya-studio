import type { Metadata, Viewport } from "next";
import { Noto_Sans_Hebrew, Secular_One } from "next/font/google";
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
 * Type system — modern Hebrew (not default Rubik/Assistant):
 * Secular One → headlines (strong geometric Hebrew display)
 * Noto Sans Hebrew → body / UI (clean contemporary product type)
 * --font-heebo kept as body CSS var for existing stylesheets.
 */
const display = Secular_One({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
  weight: "400",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const body = Noto_Sans_Hebrew({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${display.variable} ${body.variable} h-full antialiased`}
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
