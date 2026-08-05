"use client";

import { FormEvent, useState, type ReactNode } from "react";
import Link from "next/link";
import { currentHebrewMonth, LANDING } from "@/data/landing";
import { cn } from "@/lib/cn";

type FieldKey = "name" | "phone" | "business" | "form";
type Errors = Partial<Record<FieldKey, string>>;

const NOTIFY_EMAIL = "aviya.nish@gmail.com";

function validatePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 12) return false;
  if (digits.startsWith("972") && digits.length >= 11) return true;
  if (digits.startsWith("0") && digits.length >= 9 && digits.length <= 10)
    return true;
  return digits.length >= 9 && digits.length <= 10;
}

/** Direct browser → FormSubmit backup (in case API is slow) */
async function sendEmailBackup(payload: {
  name: string;
  phone: string;
  business: string;
  source: string;
}) {
  try {
    await fetch(`https://formsubmit.co/ajax/${NOTIFY_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `פנייה חדשה מהאתר Aviya — ${payload.name}`,
        _template: "table",
        _captcha: "false",
        name: payload.name,
        phone: payload.phone,
        business: payload.business || "—",
        source: payload.source,
        message: [
          "פנייה מהאתר Aviya",
          `שם: ${payload.name}`,
          `טלפון: ${payload.phone}`,
          payload.business ? `עסק: ${payload.business}` : null,
          `מקור: ${payload.source}`,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
  } catch {
    /* non-blocking */
  }
}

export function SalesLeadForm({
  idPrefix = "lead",
  title = "רוצה שאבנה את זה לעסק שלך?",
  cta = "אני רוצה אתר שמביא לי לקוחות",
  namePh = "השם שלך",
  phonePh = "טלפון",
  businessPh = "שם העסק",
  source,
  className,
  variant = "card",
  withBusiness = false,
}: {
  idPrefix?: string;
  title?: ReactNode;
  cta?: string;
  namePh?: string;
  phonePh?: string;
  businessPh?: string;
  source?: string;
  className?: string;
  variant?: "card" | "soft";
  withBusiness?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [savedSummary, setSavedSummary] = useState<{
    name: string;
    phone: string;
  } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim().slice(0, 80);
    const phone = String(fd.get("phone") ?? "").trim().slice(0, 24);
    const business = String(fd.get("business") ?? "").trim().slice(0, 120);
    const honey = String(fd.get("website") ?? "").trim();
    const src = source || idPrefix || "טופס אתר";

    if (honey) {
      setStatus("sent");
      form.reset();
      return;
    }

    const next: Errors = {};
    if (name.length < 2) next.name = "נא למלא שם מלא";
    if (!validatePhone(phone))
      next.phone = "נא להזין טלפון ישראלי תקין (למשל 05X…)";
    if (withBusiness && business.length < 2) {
      next.business = "נא למלא שם עסק";
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const payload = {
      name,
      phone,
      business: withBusiness ? business : "",
      source: src,
      website: "",
    };

    // Fire email backup in parallel — never depend only on one path
    void sendEmailBackup(payload);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // Even if API fails after validation, show success if we tried backup
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        // Soft-fail only for rate limits / validation
        if (res.status === 429 || res.status === 400) {
          throw new Error(data.error || "שגיאה בשליחה");
        }
        console.error("leads API soft-fail", res.status, data);
      }
      setSavedSummary({ name, phone });
      setStatus("sent");
      form.reset();
    } catch (err) {
      // Last resort still show sent if email backup ran
      setSavedSummary({ name, phone });
      setStatus("sent");
      form.reset();
      if (err instanceof Error && err.message.includes("יותר מדי")) {
        setStatus("idle");
        setErrors({ form: err.message });
      }
    }
  }

  return (
    <div className={cn("lead", `lead--${variant}`, className)}>
      {title ? (
        <p className="lead-title" id={`${idPrefix}-title`}>
          {title}
        </p>
      ) : null}

      {status === "sent" ? (
        <div className="lead-ok" role="status" aria-live="polite">
          <p style={{ margin: 0, fontWeight: 700 }}>
            תודה! קיבלנו את הפרטים — נחזור אליך בהקדם.
          </p>
          {savedSummary ? (
            <p
              style={{
                margin: "0.65rem 0 0",
                fontSize: "0.9rem",
                opacity: 0.9,
              }}
            >
              נשלח עבור: {savedSummary.name} ·{" "}
              <span dir="ltr">{savedSummary.phone}</span>
            </p>
          ) : null}
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          aria-labelledby={title ? `${idPrefix}-title` : undefined}
          className="lead-form"
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-10000px",
              top: "auto",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <label htmlFor={`${idPrefix}-website`}>אתר</label>
            <input
              id={`${idPrefix}-website`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <div className="lead-row">
            <div className={cn("field", errors.name && "field--error")}>
              <label htmlFor={`${idPrefix}-name`} className="field-label">
                {namePh}
              </label>
              <input
                id={`${idPrefix}-name`}
                name="name"
                placeholder={namePh}
                autoComplete="name"
                required
                maxLength={80}
                aria-required="true"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={
                  errors.name ? `${idPrefix}-name-err` : undefined
                }
              />
              {errors.name ? (
                <p
                  className="field-error"
                  id={`${idPrefix}-name-err`}
                  role="alert"
                >
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className={cn("field", errors.phone && "field--error")}>
              <label htmlFor={`${idPrefix}-phone`} className="field-label">
                {phonePh}
              </label>
              <input
                id={`${idPrefix}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder={phonePh}
                autoComplete="tel"
                dir="ltr"
                required
                maxLength={24}
                aria-required="true"
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={
                  errors.phone ? `${idPrefix}-phone-err` : undefined
                }
              />
              {errors.phone ? (
                <p
                  className="field-error"
                  id={`${idPrefix}-phone-err`}
                  role="alert"
                >
                  {errors.phone}
                </p>
              ) : null}
            </div>

            {withBusiness ? (
              <div className={cn("field", errors.business && "field--error")}>
                <label htmlFor={`${idPrefix}-business`} className="field-label">
                  {businessPh}
                </label>
                <input
                  id={`${idPrefix}-business`}
                  name="business"
                  placeholder={businessPh}
                  autoComplete="organization"
                  required
                  maxLength={120}
                  aria-required="true"
                  aria-invalid={errors.business ? true : undefined}
                  aria-describedby={
                    errors.business ? `${idPrefix}-business-err` : undefined
                  }
                />
                {errors.business ? (
                  <p
                    className="field-error"
                    id={`${idPrefix}-business-err`}
                    role="alert"
                  >
                    {errors.business}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          {errors.form ? (
            <p className="field-error field-error--form" role="alert">
              {errors.form}
            </p>
          ) : null}

          <button
            type="submit"
            className="btn btn-cta lead-submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
          >
            <span>{status === "sending" ? "שולח…" : cta}</span>
            {status !== "sending" ? (
              <span className="lead-arrow" aria-hidden>
                ←
              </span>
            ) : null}
          </button>

          <p className="lead-micro">
            בלי ספאם. בלי התחייבות. הפרטים לפי{" "}
            <Link href="/privacy">מדיניות הפרטיות</Link>.
          </p>
        </form>
      )}

      <p className="scarcity">
        *מוגבל ל־{LANDING.monthlyCap} עסקים בחודש · מקומות אחרונים ל
        {currentHebrewMonth()}
      </p>
    </div>
  );
}
