"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { Lead } from "@/lib/leads";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("he-IL", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function waLink(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "").replace(/^972/, "");
  return `https://wa.me/972${digits}`;
}

/**
 * Admin inbox — password via LEADS_PASSWORD env (default in server).
 * Work-screen UX only — API/auth unchanged.
 */
export default function LeadsAdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(async (pwd: string, opts?: { quiet?: boolean }) => {
    setLoading(true);
    setError("");
    if (!opts?.quiet) setOkMsg("");
    try {
      const res = await fetch("/api/leads", {
        headers: { "x-leads-password": pwd },
        cache: "no-store",
      });
      if (res.status === 401) {
        setError("סיסמה שגויה");
        setAuthed(false);
        return;
      }
      if (!res.ok) {
        setError("שגיאה בטעינת הפניות");
        return;
      }
      const data = (await res.json()) as { leads: Lead[] };
      setLeads(data.leads ?? []);
      setAuthed(true);
      if (opts?.quiet) setOkMsg("התיבה עודכנה");
    } catch {
      setError("לא ניתן להתחבר לשרת");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!okMsg) return;
    const t = window.setTimeout(() => setOkMsg(""), 2200);
    return () => window.clearTimeout(t);
  }, [okMsg]);

  function onLogin(e: FormEvent) {
    e.preventDefault();
    void load(password);
  }

  const todayCount = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return leads.filter((l) => new Date(l.createdAt) >= start).length;
  }, [leads]);

  const selected = leads.find((l) => l.id === selectedId) ?? null;

  return (
    <div className="ws">
      <div className="ws-shell">
        <aside className="ws-sidebar" aria-label="ניווט עבודה">
          <div className="ws-brand">
            <strong>AVIYA</strong>
            <span>מסך עבודה</span>
          </div>
          <nav className="ws-nav">
            <span className="ws-nav-item is-active" aria-current="page">
              תיבת פניות
            </span>
            <a href="/">חזרה לאתר</a>
            <a href="/contact">עמוד יצירת קשר</a>
          </nav>
          <p className="ws-side-foot">
            פניות נשמרות בענן. התראות מייל נשלחות אוטומטית.
          </p>
        </aside>

        <div className="ws-main">
          <header className="ws-topbar">
            <div className="ws-topbar-title">
              <h1>תיבת פניות</h1>
              <p>
                {authed
                  ? loading
                    ? "מרענן…"
                    : `${leads.length} פניות · פעולה מרכזית: חזרה ללקוח`
                  : "כניסה מאובטחת לניהול פניות"}
              </p>
            </div>
            <div className="ws-topbar-actions">
              {authed ? (
                <button
                  type="button"
                  className="ws-btn ws-btn--ghost ws-btn--sm"
                  onClick={() => void load(password, { quiet: true })}
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? "טוען…" : "רענון"}
                </button>
              ) : null}
              <a href="/" className="ws-btn ws-btn--ghost ws-btn--sm">
                לאתר
              </a>
            </div>
          </header>

          <div className="ws-body">
            <div className="ws-mobile-nav">
              <a href="/" className="ws-back">
                ← חזרה לאתר
              </a>
            </div>

            <p className="ws-intro">
              איפה אני: תיבת פניות מהאתר. מה לעשות: בחרו פנייה → חייגו או פתחו
              וואטסאפ. זו הפעולה המרכזית.
            </p>

            {error ? (
              <p className="ws-alert ws-alert--error" role="alert">
                {error}
              </p>
            ) : null}
            {okMsg && authed && !error ? (
              <p className="ws-alert ws-alert--ok" role="status">
                {okMsg}
              </p>
            ) : null}

            {!authed ? (
              <form className="ws-login" onSubmit={onLogin}>
                <label htmlFor="ws-password">סיסמת גישה</label>
                <input
                  id="ws-password"
                  className="ws-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="הזיני סיסמה"
                  autoComplete="current-password"
                  disabled={loading}
                  aria-invalid={Boolean(error)}
                  aria-describedby="ws-login-hint"
                />
                <button
                  type="submit"
                  className="ws-btn ws-btn--primary"
                  disabled={loading || password.trim().length < 4}
                >
                  {loading ? "מתחבר…" : "כניסה לתיבה"}
                </button>
                <p className="ws-hint" id="ws-login-hint">
                  הסיסמה מוגדרת בשרת (LEADS_PASSWORD). אין לשלוח אותה ללקוחות.
                </p>
              </form>
            ) : (
              <>
                <div className="ws-stats" aria-label="סיכום">
                  <div className="ws-stat">
                    <strong>{leads.length}</strong>
                    <span>סה״כ פניות</span>
                  </div>
                  <div className="ws-stat">
                    <strong>{todayCount}</strong>
                    <span>היום</span>
                  </div>
                  <div className="ws-stat">
                    <strong>{loading ? "…" : "פעיל"}</strong>
                    <span>סטטוס תיבה</span>
                  </div>
                </div>

                {loading && leads.length === 0 ? (
                  <div className="ws-loading" aria-busy="true" aria-label="טוען">
                    <div className="ws-skel" />
                    <div className="ws-skel" />
                    <div className="ws-skel" />
                  </div>
                ) : leads.length === 0 ? (
                  <div className="ws-empty">
                    <div className="ws-empty-icon" aria-hidden>
                      ✉
                    </div>
                    <strong>עדיין אין פניות</strong>
                    <p>
                      כשמישהו ממלא טופס באתר — הוא יופיע כאן מיד. בינתיים אפשר
                      לבדוק את{" "}
                      <a href="/contact">עמוד יצירת הקשר</a> או לרענן את התיבה.
                    </p>
                  </div>
                ) : (
                  <div className="ws-workspace">
                    <ul className="ws-list" aria-label="רשימת פניות">
                      {leads.map((lead, i) => {
                        const isOn = selectedId === lead.id;
                        return (
                          <li
                            key={lead.id}
                            className={`ws-card${isOn ? " is-selected" : ""}`}
                            style={{
                              animationDelay: `${Math.min(i, 8) * 35}ms`,
                            }}
                          >
                            <div
                              className="ws-card-select"
                              role="button"
                              tabIndex={0}
                              aria-pressed={isOn}
                              onClick={() =>
                                setSelectedId(isOn ? null : lead.id)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setSelectedId(isOn ? null : lead.id);
                                }
                              }}
                            >
                              <div className="ws-card-head">
                                <strong>{lead.name}</strong>
                                <span className="ws-time">
                                  {formatDate(lead.createdAt)}
                                </span>
                              </div>
                              {lead.business && lead.business !== "—" ? (
                                <p className="ws-meta">
                                  עסק: <b>{lead.business}</b>
                                </p>
                              ) : null}
                              <p className="ws-meta">
                                מקור:{" "}
                                <span className="ws-badge">
                                  {lead.source || "אתר"}
                                </span>
                              </p>
                            </div>
                            <div className="ws-actions">
                              <a
                                className="ws-btn ws-btn--sm ws-btn--tel"
                                href={`tel:${lead.phone}`}
                              >
                                <span dir="ltr">{lead.phone}</span>
                              </a>
                              <a
                                className="ws-btn ws-btn--sm ws-btn--wa"
                                href={waLink(lead.phone)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                וואטסאפ
                              </a>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <aside
                      className={`ws-detail${selected ? " is-open" : ""}`}
                      aria-live="polite"
                    >
                      {selected ? (
                        <div className="ws-detail-inner">
                          <p className="ws-detail-kicker">הצעד הבא</p>
                          <h2>{selected.name}</h2>
                          <p className="ws-meta">
                            {formatDate(selected.createdAt)}
                            {selected.business && selected.business !== "—"
                              ? ` · ${selected.business}`
                              : ""}
                          </p>
                          <div className="ws-actions ws-actions--stack">
                            <a
                              className="ws-btn ws-btn--primary"
                              href={`tel:${selected.phone}`}
                            >
                              חייג עכשיו · <span dir="ltr">{selected.phone}</span>
                            </a>
                            <a
                              className="ws-btn ws-btn--wa"
                              href={waLink(selected.phone)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              פתיחת וואטסאפ
                            </a>
                          </div>
                          <p className="ws-hint">
                            מקור: {selected.source || "אתר"} · חזרו מהר — זה
                            הרגע שבו נסגרת פנייה.
                          </p>
                        </div>
                      ) : (
                        <div className="ws-detail-empty">
                          <div className="ws-detail-empty-icon" aria-hidden>
                            ←
                          </div>
                          <strong>בחרו פנייה מהרשימה</strong>
                          <p>
                            כאן יופיעו שם, טלפון, וקיצורי דרך לשיחה או לוואטסאפ.
                          </p>
                        </div>
                      )}
                    </aside>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
