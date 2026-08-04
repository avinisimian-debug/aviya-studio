"use client";

import { useState } from "react";

const LEFT = [
  "תלות בסטורי שנעלם",
  "אמון נמוך במחיר",
  "פניות אקראיות",
  "״יש לך אינסטגרם?״",
];

const RIGHT = [
  "נכס שעובד 24/7",
  "סמכות מקצועית",
  "לידים מוכנים",
  "״ראיתי באתר שלך…״",
];

/** Interactive before / after site comparison */
export function CompareGadget() {
  const [side, setSide] = useState<"before" | "after">("after");

  return (
    <div className="compare-gadget">
      <div className="compare-tabs" role="tablist" aria-label="השוואה">
        <button
          type="button"
          role="tab"
          aria-selected={side === "before"}
          className={side === "before" ? "is-on" : ""}
          onClick={() => setSide("before")}
        >
          בלי אתר רציני
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={side === "after"}
          className={side === "after" ? "is-on" : ""}
          onClick={() => setSide("after")}
        >
          עם אתר Aviya
        </button>
      </div>
      <ul className={`compare-list ${side === "after" ? "is-after" : ""}`}>
        {(side === "before" ? LEFT : RIGHT).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
