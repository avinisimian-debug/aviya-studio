import Script from "next/script";
import { getAdSenseClientId, getGaMeasurementId } from "@/lib/marketing";

/**
 * Google AdSense + Analytics.
 * Auto ads: turn on in AdSense dashboard after approval.
 * Manual units: AdUnit + NEXT_PUBLIC_ADSENSE_SLOT.
 */
export function GoogleMarketingScripts() {
  const ads = getAdSenseClientId();
  const ga = getGaMeasurementId();

  return (
    <>
      {ads ? (
        <Script
          id="adsense-loader"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ads}`}
          crossOrigin="anonymous"
        />
      ) : null}

      {ga ? (
        <>
          <Script
            id="ga-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
          />
          <Script id="ga-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
