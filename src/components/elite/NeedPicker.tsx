"use client";

import { useEffect, useState } from "react";
import { readNeed, siteNeeds, writeNeed, type SiteNeedId } from "@/lib/need";

export function NeedPicker({
  className = "",
}: {
  className?: string;
}) {
  const [picked, setPicked] = useState<SiteNeedId | "">("");

  useEffect(() => {
    setPicked(readNeed());
  }, []);

  return (
    <div className={`need-picker ${className}`.trim()}>
      <p className="need-picker-label">מה צריך לבנות?</p>
      <div className="need-picker-row" role="group" aria-label="סוג האתר">
        {siteNeeds.map((n) => (
          <button
            key={n.id}
            type="button"
            className={`need-chip${picked === n.id ? " is-on" : ""}`}
            aria-pressed={picked === n.id}
            onClick={() => {
              setPicked(n.id);
              writeNeed(n.id);
            }}
          >
            {n.label}
          </button>
        ))}
      </div>
      {picked ? (
        <p className="need-picker-hint">
          {siteNeeds.find((n) => n.id === picked)?.hint}
        </p>
      ) : (
        <p className="need-picker-hint">בחירה קצרה — כדי שנחזור מדויק יותר</p>
      )}
    </div>
  );
}
