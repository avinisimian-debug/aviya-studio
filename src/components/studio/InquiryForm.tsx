"use client";

import { useActionState } from "react";
import { BUDGET_OPTIONS, OTHER_NEED, SERVICES } from "@/data/studio-site";
import { submitInquiry } from "@/app/actions/inquiry";
import { initialInquiryState } from "@/lib/inquiry/state";

export function InquiryForm({
  source = "contact",
  id = "inquiry",
}: {
  source?: string;
  id?: string;
}) {
  const [state, action, pending] = useActionState(submitInquiry, initialInquiryState);
  const sent = state.status === "sent";

  return (
    <div id={id} className="inquiry">
      {sent ? (
        <p className="form-status form-status-ok" role="status">
          {state.message}
        </p>
      ) : (
        <form action={action} noValidate>
          <div className="hp-field" aria-hidden="true">
            <label htmlFor={`${id}-company`}>אתר</label>
            <input
              id={`${id}-company`}
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>
          <input type="hidden" name="source" value={source} />

          <div className="field">
            <label htmlFor={`${id}-name`}>שם</label>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              aria-invalid={state.fieldErrors.name ? true : undefined}
              aria-describedby={state.fieldErrors.name ? `${id}-name-err` : undefined}
            />
            {state.fieldErrors.name ? (
              <p id={`${id}-name-err`} className="field-error">
                {state.fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor={`${id}-phone`}>טלפון</label>
              <input
                id={`${id}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                maxLength={24}
                aria-invalid={state.fieldErrors.phone ? true : undefined}
                aria-describedby={`${id}-reach ${state.fieldErrors.phone ? `${id}-phone-err` : ""}`.trim()}
              />
              {state.fieldErrors.phone ? (
                <p id={`${id}-phone-err`} className="field-error">
                  {state.fieldErrors.phone}
                </p>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor={`${id}-email`}>אימייל</label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                dir="ltr"
                maxLength={120}
                aria-invalid={state.fieldErrors.email ? true : undefined}
                aria-describedby={state.fieldErrors.email ? `${id}-email-err` : `${id}-reach`}
              />
              {state.fieldErrors.email ? (
                <p id={`${id}-email-err`} className="field-error">
                  {state.fieldErrors.email}
                </p>
              ) : null}
            </div>
          </div>
          <p id={`${id}-reach`} className="field-hint">
            מספיק טלפון או אימייל. אפשר גם את שניהם.
          </p>

          <div className="field">
            <label htmlFor={`${id}-need`}>מה צריך</label>
            <select
              id={`${id}-need`}
              name="need"
              defaultValue=""
              required
              aria-invalid={state.fieldErrors.need ? true : undefined}
              aria-describedby={state.fieldErrors.need ? `${id}-need-err` : undefined}
            >
              <option value="" disabled>
                בחרו
              </option>
              {SERVICES.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
              <option value={OTHER_NEED.value}>{OTHER_NEED.label}</option>
            </select>
            {state.fieldErrors.need ? (
              <p id={`${id}-need-err`} className="field-error">
                {state.fieldErrors.need}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor={`${id}-detail`}>פירוט קצר, אם יש</label>
            <textarea
              id={`${id}-detail`}
              name="detail"
              rows={4}
              maxLength={400}
              aria-invalid={state.fieldErrors.detail ? true : undefined}
              aria-describedby={state.fieldErrors.detail ? `${id}-detail-err` : undefined}
            />
            {state.fieldErrors.detail ? (
              <p id={`${id}-detail-err`} className="field-error">
                {state.fieldErrors.detail}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor={`${id}-budget`}>
              טווח תקציב <span className="optional">לא חובה</span>
            </label>
            <select id={`${id}-budget`} name="budget" defaultValue="unspecified">
              {BUDGET_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {state.status === "handoff" ? (
            <p className="form-status form-status-handoff" role="status">
              {state.message}
            </p>
          ) : null}
          {state.status === "invalid" ||
          state.status === "error" ||
          state.status === "rate_limited" ? (
            <p className="form-status form-status-bad" role="alert">
              {state.message}
            </p>
          ) : null}
          {state.handoff ? (
            <div className="btn-row handoff-actions">
              <a
                className="btn btn-primary"
                href={state.handoff.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                שליחה בוואטסאפ
              </a>
              <a className="btn btn-ghost" href={state.handoff.mailtoHref}>
                פתיחת אימייל
              </a>
            </div>
          ) : null}

          <button
            className={state.handoff ? "btn btn-ghost" : "btn btn-primary"}
            type="submit"
            disabled={pending}
          >
            {pending ? "בודקים…" : state.handoff ? "עדכון הפרטים" : "שליחת פנייה"}
          </button>
        </form>
      )}
    </div>
  );
}
