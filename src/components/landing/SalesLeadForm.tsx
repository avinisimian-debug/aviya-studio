"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { currentHebrewMonth, LANDING } from "@/data/landing";
import { cn } from "@/lib/cn";

type FieldKey = "name" | "phone" | "business" | "form";
type Errors = Partial<Record<FieldKey, string>>;

function validatePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 12;
}

/**
 * High-converting lead form
 * Fields: Name · Phone · Business (optional via withBusiness)
 */
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
  /** Name + Phone + Business (CRO default for agency pages) */
  withBusiness?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const business = String(fd.get("business") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "נא למלא שם מלא";
    if (!validatePhone(phone)) next.phone = "נא להזין טלפון תקין (9–12 ספרות)";
    if (withBusiness && business.length < 2) {
      next.business = "נא למלא שם עסק";
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          business: withBusiness ? business : "",
          source: source || idPrefix || "טופס אתר",
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "שגיאה בשליחה");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("idle");
      setErrors({
        form:
          err instanceof Error
            ? err.message
            : "לא הצלחנו לשלוח. נסו שוב או וואטסאפ.",
      });
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
        <p className="lead-ok" role="status" aria-live="polite">
          תודה! קיבלנו את הפרטים — נחזור אליך בהקדם.
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          aria-labelledby={title ? `${idPrefix}-title` : undefined}
          className="lead-form"
        >
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
            בלי ספאם. בלי התחייבות. נחזור מהר — אתם מחליטים.
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
