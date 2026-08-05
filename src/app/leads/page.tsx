"use client";

import { FormEvent, useCallback, useState } from "react";
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

/**
 * Admin inbox for website form submissions.
 * Visit: /leads — set LEADS_PASSWORD in env (required in production).
 */
export default function LeadsAdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (pwd: string) => {
    setLoading(true);
    setError("");
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
      if (res.status === 503) {
        setError("חסר LEADS_PASSWORD בהגדרות השרת (Vercel Env)");
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
    } catch {
      setError("לא ניתן להתחבר לשרת");
    } finally {
      setLoading(false);
    }
  }, []);

  function onLogin(e: FormEvent) {
    e.preventDefault();
    void load(password);
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--e-bg, #ece8f7)",
        color: "var(--e-fg, #1a1430)",
        padding: "2rem 1.25rem 4rem",
        fontFamily: "var(--font-heebo), system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <a
          href="/"
          style={{
            color: "var(--e-fg-muted, #5c5578)",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          ← חזרה לאתר
        </a>
        <h1
          style={{
            margin: "1.25rem 0 0.35rem",
            fontSize: "1.75rem",
            fontWeight: 800,
          }}
        >
          פניות מהאתר
        </h1>
        <p
          style={{
            margin: 0,
            color: "var(--e-fg-muted, #5c5578)",
            fontSize: "0.95rem",
          }}
        >
          טפסים שנשלחו מהאתר (שם, טלפון, עסק, מקור).
        </p>

        {!authed ? (
          <form
            onSubmit={onLogin}
            style={{
              marginTop: "2rem",
              padding: "1.35rem",
              borderRadius: "1rem",
              border: "1px solid rgba(61,42,120,0.12)",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <label style={{ fontWeight: 700, fontSize: "0.9rem" }}>
              סיסמת גישה
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="סיסמה ממשתנה LEADS_PASSWORD"
              autoComplete="current-password"
              style={{
                padding: "0.9rem 1rem",
                borderRadius: "0.65rem",
                border: "1px solid rgba(61,42,120,0.15)",
                fontSize: "1rem",
                color: "#111",
              }}
            />
            {error ? (
              <p style={{ margin: 0, color: "#b42318", fontSize: "0.9rem" }}>
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "טוען…" : "הצג פניות"}
            </button>
            <p
              style={{
                margin: "0.5rem 0 0",
                fontSize: "0.8rem",
                color: "var(--e-fg-muted, #5c5578)",
                lineHeight: 1.5,
              }}
            >
              הסיסמה מוגדרת בשרת בלבד (LEADS_PASSWORD). אין ברירת מחדל
              גלויה בממשק.
            </p>
          </form>
        ) : (
          <div style={{ marginTop: "1.75rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <p style={{ margin: 0, fontWeight: 700 }}>
                {leads.length} פניות
              </p>
              <button
                type="button"
                onClick={() => void load(password)}
                className="btn btn-primary"
                style={{
                  width: "auto",
                  minHeight: "2.5rem",
                  padding: "0.5rem 1rem",
                }}
                disabled={loading}
              >
                רענון
              </button>
            </div>

            {leads.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  background: "#fff",
                  borderRadius: "1rem",
                  border: "1px solid rgba(61,42,120,0.12)",
                }}
              >
                <p style={{ margin: 0 }}>עדיין אין פניות.</p>
              </div>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {leads.map((lead) => (
                  <li
                    key={lead.id}
                    style={{
                      background: "#fff",
                      borderRadius: "1rem",
                      border: "1px solid rgba(61,42,120,0.12)",
                      padding: "1.1rem 1.2rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <strong style={{ fontSize: "1.1rem" }}>{lead.name}</strong>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--e-fg-muted, #5c5578)",
                        }}
                      >
                        {formatDate(lead.createdAt)}
                      </span>
                    </div>
                    <p style={{ margin: "0.65rem 0 0" }}>
                      <a
                        href={`tel:${lead.phone}`}
                        style={{
                          color: "#5b2fb8",
                          fontWeight: 700,
                          direction: "ltr",
                          display: "inline-block",
                        }}
                      >
                        {lead.phone}
                      </a>
                    </p>
                    {lead.business && lead.business !== "—" ? (
                      <p
                        style={{
                          margin: "0.35rem 0 0",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                        }}
                      >
                        עסק: {lead.business}
                      </p>
                    ) : null}
                    <p
                      style={{
                        margin: "0.35rem 0 0",
                        color: "var(--e-fg-muted, #5c5578)",
                        fontSize: "0.92rem",
                      }}
                    >
                      מקור: {lead.source || "אתר"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
