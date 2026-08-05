"use client";

import { useEffect, useRef } from "react";
import { getAdSenseClientId } from "@/lib/marketing";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type SlotProps = {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
  label?: string;
};

/**
 * In-page ad unit. Renders only when NEXT_PUBLIC_ADSENSE_PUB_ID + slot are set.
 */
export function AdUnit({
  slot,
  format = "auto",
  className = "",
  label = "פרסומת",
}: SlotProps) {
  const client = getAdSenseClientId();
  const pushed = useRef(false);
  const envSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT?.trim();
  const slotId = slot || envSlot || "";

  useEffect(() => {
    if (!client || !slotId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* AdSense not ready yet */
    }
  }, [client, slotId]);

  if (!client || !slotId) {
    return null;
  }

  return (
    <aside className={`aviya-ad-slot ${className}`.trim()} aria-label={label}>
      <p className="aviya-ad-label">{label}</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
