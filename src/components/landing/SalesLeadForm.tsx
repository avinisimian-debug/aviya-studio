"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { currentHebrewMonth, LANDING } from "@/data/landing";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"name" | "phone" | "form", string>>;

function validatePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 12;
}

export function SalesLeadForm({
  idPrefix = "lead",
  title = "רוצה שאבנה את זה לעסק שלך?",
  cta = "אני רוצה אתר שמביא לי לקוחות",
  namePh = "איך קוראים לך?",
  phonePh = "מה המספר שלך?",
  source,
  className,
  variant = "card",
}: {
  idPrefix?: string;
  title?: ReactNode;
  cta?: string;
  namePh?: string;
  phonePh?: string;
  source?: string;
  className?: string;
  variant?: "card" | "soft";
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "נא למלא שם";
    if (!validatePhone(phone)) next.phone = "טלפון לא תקין";
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
        >
          <div className="lead-row">
            <div className="field">
              <label htmlFor={`${idPrefix}-name`} className="sr-only">
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
                aria-describedby={errors.name ? `${idPrefix}-name-err` : undefined}
              />
              {errors.name ? (
                <p className="field-error" id={`${idPrefix}-name-err`} role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor={`${idPrefix}-phone`} className="sr-only">
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
          </div>
          {errors.form ? (
            <p className="field-error" role="alert">
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
                ↗
              </span>
            ) : null}
          </button>
          <p className="lead-micro">
            בלי ספאם. בלי התחייבות. חוזרת עם הצעד הבא תוך 24 שעות.
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
