"use client";

import { useState } from "react";
import { heroCta } from "@/data/landing";

const OPTIONS = [
  { id: "leads", label: "יותר פניות", hint: "אתר שממיר מבקרים ללידים" },
  { id: "brand", label: "נראות יוקרתית", hint: "שפה ויזואלית ברמה של המותג" },
  { id: "own", label: "בעלות מלאה", hint: "בלי תלות בספק לנצח" },
] as const;

/** Mini interactive “what do you need” gadget → contact */
export function IntentPicker() {
  const [picked, setPicked] = useState<string | null>("leads");

  return (
    <div className="intent-picker">
      <p className="intent-title">מה הכי חשוב לכם עכשיו?</p>
      <div className="intent-options" role="group" aria-label="מה חשוב לכם">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`intent-chip ${picked === o.id ? "is-on" : ""}`}
            aria-pressed={picked === o.id}
            onClick={() => setPicked(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p className="intent-hint">
        {OPTIONS.find((o) => o.id === picked)?.hint ?? "בחרו אפשרות"}
      </p>
      <a href="#contact" className="btn btn-cta btn-cta-inline intent-cta">
        {heroCta}
      </a>
    </div>
  );
}
