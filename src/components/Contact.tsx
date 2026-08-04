"use client";

import { FormEvent, useState } from "react";
import { Reveal, SectionHead } from "./Reveal";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 750);
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHead
            label="צור קשר"
            titleId="contact-title"
            title="נבדוק התאמה — ואז נחליט."
            description="שיחת היכרות קצרה. בלי לחץ. מענה תוך 24–48 שעות — גם אם התשובה ׳לא כרגע׳."
          />

          <Reveal delay={0.16}>
            <dl className="mt-10 space-y-4 text-[0.98rem]">
              <div>
                <dt className="text-[0.72rem] tracking-[0.12em] uppercase text-[var(--fg-muted)]">
                  אימייל
                </dt>
                <dd className="mt-1">
                  <a
                    href="mailto:studio.aviya1@gmail.com"
                    className="text-[var(--fg-soft)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:text-[var(--fg)] hover:decoration-[var(--accent)]"
                  >
                    studio.aviya1@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.72rem] tracking-[0.12em] uppercase text-[var(--fg-muted)]">
                  מיקום
                </dt>
                <dd className="mt-1 text-[var(--fg-soft)]">ישראל · עבודה מרחוק / פגישות לפי צורך</dd>
              </div>
              <div>
                <dt className="text-[0.72rem] tracking-[0.12em] uppercase text-[var(--fg-muted)]">
                  זמינות
                </dt>
                <dd className="mt-1 text-[var(--fg-soft)]">2–3 פרויקטים בחודש · סלקטיבי</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {status === "sent" ? (
            <div
              className="flex min-h-[360px] flex-col justify-center rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-8 md:p-10"
              role="status"
            >
              <p className="display mb-4 text-[2.2rem] tracking-tight">תודה.</p>
              <p className="max-w-sm text-[1.05rem] leading-8 text-[var(--fg-muted)]">
                הפרטים התקבלו. אחזור עם הצעד הבא — או עם תשובה כנה אם זה לא הזמן הנכון.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-6 md:p-8"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="field">
                  <label htmlFor="name">שם</label>
                  <input id="name" name="name" required autoComplete="name" placeholder="השם שלכם" />
                </div>
                <div className="field">
                  <label htmlFor="brand">מותג / עסק</label>
                  <input id="brand" name="brand" required placeholder="שם העסק" />
                </div>
              </div>

              <div className="mt-5 field">
                <label htmlFor="email">אימייל</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@company.com"
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="field">
                  <label htmlFor="intent">מה מחפשים</label>
                  <select id="intent" name="intent" required defaultValue="">
                    <option value="" disabled>
                      בחרו
                    </option>
                    <option value="signal">Signal — עמוד נחיתה</option>
                    <option value="atelier">Atelier — אתר מותג</option>
                    <option value="monument">Monument — מערכת</option>
                    <option value="unsure">עדיין לא בטוחים</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="budget">טווח תקציב</label>
                  <select id="budget" name="budget" defaultValue="">
                    <option value="" disabled>
                      אופציונלי
                    </option>
                    <option value="6-12">₪6K–12K</option>
                    <option value="12-25">₪12K–25K</option>
                    <option value="25+">₪25K+</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 field">
                <label htmlFor="message">כמה מילים</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="מה חשוב לי להבין לפני השיחה?"
                />
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                  {status === "sending" ? "שולח…" : "שליחת בקשה"}
                  <span aria-hidden>←</span>
                </button>
                <p className="text-[0.8rem] leading-6 text-[var(--fg-muted)]">
                  בלי ניוזלטר. בלי ספאם. רק שיחה.
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
