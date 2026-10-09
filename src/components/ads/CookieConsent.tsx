"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "aviya-cookie-consent-v1";

/**
 * Light consent banner — required once AdSense / analytics run cookies.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const v = localStorage.getItem(STORAGE_KEY);
        if (!v) setVisible(true);
      } catch {
        setVisible(true);
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="הודעת עוגיות">
      <p>
        האתר עשוי להשתמש בעוגיות לנגישות, מדידה ופרסומות (Google). בהמשך
        הגלישה אתם מאשרים. פרטים ב
        <Link href="/privacy">מדיניות הפרטיות</Link>.
      </p>
      <button type="button" onClick={accept} className="cookie-consent-btn">
        הבנתי
      </button>
    </div>
  );
}
