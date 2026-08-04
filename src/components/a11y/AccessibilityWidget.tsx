"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useA11y } from "@/components/a11y/AccessibilityProvider";

/**
 * Accessibility control panel — common on Israeli public-facing sites
 * to support WCAG AA / IS 5568 browsing accommodations.
 */
export function AccessibilityWidget() {
  const { prefs, setPrefs, increaseFont, decreaseFont, reset } = useA11y();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const first = panelRef.current?.querySelector<HTMLElement>("button, a");
    first?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function toggle(key: keyof typeof prefs, value?: boolean) {
    if (key === "fontScale") return;
    setPrefs((p) => ({ ...p, [key]: value ?? !p[key] }));
  }

  return (
    <div className="a11y-widget">
      <button
        ref={btnRef}
        type="button"
        className="a11y-fab"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="a11y-fab-icon" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="4.5" r="2.2" fill="currentColor" />
            <path
              d="M4 9.5h16M12 9.5v10.5M7.5 14.5 5 20M16.5 14.5 19 20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="a11y-fab-label">נגישות</span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          className="a11y-panel"
          role="dialog"
          aria-modal="false"
          aria-label="תפריט התאמות נגישות"
        >
          <div className="a11y-panel-head">
            <h2 className="a11y-panel-title">התאמות נגישות</h2>
            <button
              type="button"
              className="a11y-panel-close"
              onClick={() => {
                setOpen(false);
                btnRef.current?.focus();
              }}
              aria-label="סגור תפריט נגישות"
            >
              ×
            </button>
          </div>

          <ul className="a11y-actions">
            <li>
              <div className="a11y-row">
                <span id={`${panelId}-font`}>גודל טקסט</span>
                <div className="a11y-font-btns" role="group" aria-labelledby={`${panelId}-font`}>
                  <button type="button" onClick={decreaseFont} aria-label="הקטנת טקסט">
                    א−
                  </button>
                  <span className="a11y-font-value" aria-live="polite">
                    {prefs.fontScale}%
                  </span>
                  <button type="button" onClick={increaseFont} aria-label="הגדלת טקסט">
                    א+
                  </button>
                </div>
              </div>
            </li>
            <li>
              <button
                type="button"
                className={`a11y-toggle ${prefs.contrast ? "is-on" : ""}`}
                aria-pressed={prefs.contrast}
                onClick={() => toggle("contrast")}
              >
                ניגודיות גבוהה
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`a11y-toggle ${prefs.underlineLinks ? "is-on" : ""}`}
                aria-pressed={prefs.underlineLinks}
                onClick={() => toggle("underlineLinks")}
              >
                הדגשת קישורים
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`a11y-toggle ${prefs.readableFont ? "is-on" : ""}`}
                aria-pressed={prefs.readableFont}
                onClick={() => toggle("readableFont")}
              >
                גופן קריא
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`a11y-toggle ${prefs.stopAnimations ? "is-on" : ""}`}
                aria-pressed={prefs.stopAnimations}
                onClick={() => toggle("stopAnimations")}
              >
                עצירת אנימציות
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`a11y-toggle ${prefs.highlightFocus ? "is-on" : ""}`}
                aria-pressed={prefs.highlightFocus}
                onClick={() => toggle("highlightFocus")}
              >
                הדגשת מיקוד מקלדת
              </button>
            </li>
            <li>
              <button type="button" className="a11y-toggle a11y-reset" onClick={reset}>
                איפוס התאמות
              </button>
            </li>
          </ul>

          <p className="a11y-panel-foot">
            <Link href="/accessibility" onClick={() => setOpen(false)}>
              הצהרת נגישות מלאה
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
}
