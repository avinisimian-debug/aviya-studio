"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { eliteFaqs } from "@/data/site-content";
import { LANDING } from "@/data/landing";

const extra = [
  {
    q: "איך מתחילים בלי לחץ?",
    a: "משאירים שם וטלפון, או כותבים בוואטסאפ. אביה חוזר עם שאלות קצרות — בלי התחייבות.",
  },
  {
    q: "אפשר לראות כיוון לפני שסוגרים?",
    a: "כן. קודם מבינים מה העסק ומה הלקוח צריך לעשות. אחר כך בונים — לא מוכרים חבילה סגורה בלי הקשבה.",
  },
] as const;

const items = [...extra, ...eliteFaqs.slice(0, 6)];

/**
 * On-site helper: instant answers from Aviya's FAQ knowledge.
 * Not a live model — fast, honest, always available.
 */
export function SmartAssist() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const panelId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const current = items[active];

  return (
    <div className="smart-assist">
      {open ? (
        <div
          id={panelId}
          className="smart-assist-panel"
          role="dialog"
          aria-label="עוזר חכם של Aviya"
        >
          <header className="smart-assist-head">
            <p>
              <Sparkles size={16} aria-hidden />
              עוזר חכם
            </p>
            <button
              type="button"
              className="smart-assist-x"
              onClick={() => {
                setOpen(false);
                btnRef.current?.focus();
              }}
              aria-label="סגירת העוזר"
            >
              <X size={18} />
            </button>
          </header>
          <p className="smart-assist-lead">
            תשובות מיידיות — מתוך הידע של הסטודיו. רוצים אדם? וואטסאפ ישיר לאביה.
          </p>
          <div className="smart-assist-qs">
            {items.map((item, i) => (
              <button
                key={item.q}
                type="button"
                className={`smart-assist-q${i === active ? " is-on" : ""}`}
                onClick={() => setActive(i)}
              >
                {item.q}
              </button>
            ))}
          </div>
          {current ? (
            <div className="smart-assist-a">
              <p>{current.a}</p>
            </div>
          ) : null}
          <div className="smart-assist-actions">
            <a href="#contact">השארת פרטים</a>
            <a
              href={LANDING.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              וואטסאפ
            </a>
          </div>
        </div>
      ) : null}

      <button
        ref={btnRef}
        type="button"
        className="smart-assist-fab"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <Sparkles size={18} aria-hidden />
        <span className="smart-assist-fab-label">עוזר חכם</span>
      </button>
    </div>
  );
}
