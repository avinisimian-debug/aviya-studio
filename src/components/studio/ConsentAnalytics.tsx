"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { gaMeasurementId } from "@/lib/contact-channels";

const STORAGE_KEY = "aviya-ga-consent";
const EVENT = "aviya-ga-consent";

type Choice = "unknown" | "granted" | "denied";

function readChoice(): Choice {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : "unknown";
  } catch {
    return "unknown";
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  return () => window.removeEventListener(EVENT, onStoreChange);
}

function choose(next: "granted" | "denied") {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage may be blocked */
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * GA4 loads only after an explicit accept, and only when NEXT_PUBLIC_GA_ID is set.
 */
export function ConsentAnalytics({ gaId }: { gaId: string }) {
  const id = gaMeasurementId(gaId);
  const choice = useSyncExternalStore(subscribe, readChoice, () => "unknown" as Choice);

  if (!id) return null;

  return (
    <>
      {choice === "granted" ? (
        <>
          <Script
            id="ga-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied' });
              gtag('js', new Date());
              gtag('config', '${id}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {choice === "unknown" ? (
        <div className="consent" role="dialog" aria-label="מדידה בגוגל אנליטיקס">
          <p>
            אפשר להפעיל Google Analytics כדי להבין איך משתמשים באתר. בלי אישור — המדידה לא נטענת.
          </p>
          <div className="consent-actions">
            <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>
              לאשר מדידה
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => choose("denied")}>
              בלי מדידה
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
