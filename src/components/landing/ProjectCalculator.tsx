"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  calculatorSteps,
  labelFor,
  recommendSolution,
  type CalcCategory,
  type CalcGoal,
  type CalcTimeline,
  type CalculatorAnswers,
} from "@/data/calculator";
import { LANDING } from "@/data/landing";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "@/lib/icons";

type Step = 1 | 2 | 3 | 4;

const initial: CalculatorAnswers = {
  category: null,
  goal: null,
  timeline: null,
};

function OptionGrid<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly { id: T; label: string; hint: string }[];
  value: T | null;
  onChange: (id: T) => void;
  name: string;
}) {
  return (
    <div
      className="grid gap-3 sm:grid-cols-2"
      role="radiogroup"
      aria-label={name}
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.id)}
            className={cn(
              "rounded-xl border p-4 text-right transition-all",
              active
                ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-[0_0_0_1px_rgba(184,149,108,0.25)]"
                : "border-[var(--line)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--line-strong)]"
            )}
          >
            <span className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-[0.98rem] font-medium tracking-tight">
                  {opt.label}
                </span>
                <span className="mt-1 block text-[0.82rem] text-[var(--fg-muted)]">
                  {opt.hint}
                </span>
              </span>
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]"
                    : "border-[var(--line-strong)]"
                )}
                aria-hidden
              >
                {active ? <Icon icon={Check} size="xs" /> : null}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ProjectCalculator() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<CalculatorAnswers>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fit = useMemo(() => {
    if (!answers.category || !answers.goal || !answers.timeline) return null;
    return recommendSolution(answers);
  }, [answers]);

  const progress = (step / 4) * 100;
  const canNext =
    (step === 1 && answers.category) ||
    (step === 2 && answers.goal) ||
    (step === 3 && answers.timeline) ||
    step === 4;

  function goNext() {
    if (!canNext) return;
    setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  }

  function goBack() {
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const digits = phone.replace(/\D/g, "");
    if (n.length < 2) {
      setError("נא להזין שם");
      return;
    }
    if (digits.length < 9) {
      setError("נא להזין טלפון תקין");
      return;
    }
    setError(null);
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 650);
  }

  const waSummary = () => {
    if (!fit) return LANDING.whatsappUrl;
    const text = encodeURIComponent(
      [
        "היי, עשיתי את שאלון ההתאמה באתר.",
        `קטגוריה: ${labelFor("categories", answers.category)}`,
        `מטרה: ${labelFor("goals", answers.goal)}`,
        `לו״ז: ${labelFor("timelines", answers.timeline)}`,
        `המלצה: ${fit.packageName}`,
        "אשמח לתאם שיחת אפיון.",
      ].join("\n")
    );
    return `https://wa.me/${LANDING.whatsappE164}?text=${text}`;
  };

  return (
    <section
      id="calculator"
      className="section"
      aria-labelledby="calculator-title"
    >
      <div className="shell max-w-3xl">
        <div className="text-center md:text-right">
          <p className="section-label !justify-center md:!justify-start">
            מחשבון התאמה
          </p>
          <h2 id="calculator-title" className="lead mx-auto max-w-[16ch] md:mx-0">
            התאמת פתרון דיגיטלי לעסק
          </h2>
          <p className="prose-muted mx-auto mt-4 max-w-xl md:mx-0">
            שלושה צעדים קצרים — ותקבלו המלצת מסלול ברורה, בלי שיחת מכירות ארוכה.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)]">
          {/* Progress */}
          <div className="border-b border-[var(--line)] px-5 py-4 md:px-8">
            <div className="mb-2 flex items-center justify-between text-[0.78rem] text-[var(--fg-muted)]">
              <span>
                שלב {step} מתוך 4
              </span>
              <span className="tabular-nums">{Math.round(progress)}%</span>
            </div>
            <div
              className="h-1 overflow-hidden rounded-full bg-white/[0.06]"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={4}
              aria-label="התקדמות השאלון"
            >
              <motion.div
                className="h-full rounded-full bg-[var(--accent)]"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
              />
            </div>
            <ol className="mt-4 flex gap-2 text-[0.68rem] tracking-[0.06em] text-[var(--fg-muted)]">
              {["קטגוריה", "מטרה", "לו״ז", "סיכום"].map((label, i) => (
                <li
                  key={label}
                  className={cn(
                    "flex-1 border-b-2 pb-2 text-center",
                    step === i + 1
                      ? "border-[var(--accent)] text-[var(--fg-soft)]"
                      : step > i + 1
                        ? "border-[var(--accent)]/40"
                        : "border-[var(--line)]"
                  )}
                >
                  {label}
                </li>
              ))}
            </ol>
          </div>

          <div className="min-h-[320px] p-5 md:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                >
                  <h3 className="mb-1 text-[1.15rem] font-medium tracking-tight">
                    מה סוג העסק?
                  </h3>
                  <p className="mb-6 text-[0.9rem] text-[var(--fg-muted)]">
                    נתחיל מההקשר — כדי להמליץ על מבנה נכון.
                  </p>
                  <OptionGrid
                    name="קטגוריית עסק"
                    options={calculatorSteps.categories}
                    value={answers.category}
                    onChange={(id) =>
                      setAnswers((a) => ({
                        ...a,
                        category: id as CalcCategory,
                      }))
                    }
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                >
                  <h3 className="mb-1 text-[1.15rem] font-medium tracking-tight">
                    מה המטרה העיקרית של האתר?
                  </h3>
                  <p className="mb-6 text-[0.9rem] text-[var(--fg-muted)]">
                    בחרו תוצאה אחת — זה מחדד את הארכיטקטורה.
                  </p>
                  <OptionGrid
                    name="מטרה עיקרית"
                    options={calculatorSteps.goals}
                    value={answers.goal}
                    onChange={(id) =>
                      setAnswers((a) => ({ ...a, goal: id as CalcGoal }))
                    }
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                >
                  <h3 className="mb-1 text-[1.15rem] font-medium tracking-tight">
                    מה לוח הזמנים המועדף?
                  </h3>
                  <p className="mb-6 text-[0.9rem] text-[var(--fg-muted)]">
                    כנות כאן מונעת עומס והבטחות שווא.
                  </p>
                  <OptionGrid
                    name="לוח זמנים"
                    options={calculatorSteps.timelines}
                    value={answers.timeline}
                    onChange={(id) =>
                      setAnswers((a) => ({
                        ...a,
                        timeline: id as CalcTimeline,
                      }))
                    }
                  />
                </motion.div>
              )}

              {step === 4 && fit && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                >
                  {status === "sent" ? (
                    <div role="status">
                      <p className="display text-[2rem] tracking-tight">
                        קיבלנו. ממשיכים לשיחה.
                      </p>
                      <p className="mt-4 text-[1rem] leading-8 text-[var(--fg-muted)]">
                        אחזור עם הצעד הבא. בינתיים אפשר לפתוח וואטסאפ עם הסיכום.
                      </p>
                      <a
                        href={waSummary()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary mt-6 !bg-[#25D366] !text-[#0b1f12]"
                      >
                        <Icon icon={MessageCircle} size="sm" />
                        וואטסאפ עם הסיכום
                      </a>
                    </div>
                  ) : (
                    <>
                      <p className="text-[0.72rem] tracking-[0.14em] uppercase text-[var(--accent)]">
                        ההמלצה שלכם
                      </p>
                      <h3 className="mt-2 display text-[2.2rem] tracking-tight">
                        {fit.packageName}
                      </h3>
                      <p className="mt-1 text-[1.05rem] text-[var(--fg-soft)]">
                        {fit.priceFrom} · {fit.weeks}
                      </p>
                      <p className="mt-4 text-[0.98rem] leading-8 text-[var(--fg-muted)]">
                        {fit.summary}
                      </p>
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {fit.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex gap-2 text-[0.9rem] text-[var(--fg-soft)]"
                          >
                            <Icon
                              icon={Check}
                              size="xs"
                              className="mt-1 text-[var(--accent)]"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 rounded-xl border border-[var(--line)] bg-black/20 p-4 text-[0.86rem] text-[var(--fg-muted)]">
                        <p>
                          <span className="text-[var(--fg-soft)]">עסק: </span>
                          {labelFor("categories", answers.category)}
                        </p>
                        <p className="mt-1">
                          <span className="text-[var(--fg-soft)]">מטרה: </span>
                          {labelFor("goals", answers.goal)}
                        </p>
                        <p className="mt-1">
                          <span className="text-[var(--fg-soft)]">לו״ז: </span>
                          {labelFor("timelines", answers.timeline)}
                        </p>
                      </div>

                      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                        <p className="text-[0.92rem] font-medium text-[var(--fg)]">
                          השאירו פרטים — נתאם שיחת אפיון קצרה
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="field">
                            <label htmlFor="calc-name">שם</label>
                            <input
                              id="calc-name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              autoComplete="name"
                              placeholder="השם שלכם"
                            />
                          </div>
                          <div className="field">
                            <label htmlFor="calc-phone">טלפון</label>
                            <input
                              id="calc-phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                              placeholder="050-0000000"
                              dir="ltr"
                              className="text-left"
                            />
                          </div>
                        </div>
                        {error ? (
                          <p className="text-[0.82rem] text-[#c97b6a]" role="alert">
                            {error}
                          </p>
                        ) : null}
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <button
                            type="submit"
                            className="btn btn-primary flex-1"
                            disabled={status === "sending"}
                          >
                            {status === "sending" ? "שולח…" : "שליחת ליד + סיכום"}
                            <Icon icon={ArrowLeft} size="sm" />
                          </button>
                          <a
                            href={waSummary()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost flex-1"
                          >
                            <Icon icon={MessageCircle} size="sm" />
                            או בוואטסאפ
                          </a>
                        </div>
                      </form>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {status !== "sent" && (
            <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] px-5 py-4 md:px-8">
              <button
                type="button"
                className="btn btn-ghost !min-h-11"
                onClick={goBack}
                disabled={step === 1}
              >
                <Icon icon={ArrowRight} size="sm" />
                חזרה
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  className="btn btn-primary !min-h-11"
                  onClick={goNext}
                  disabled={!canNext}
                >
                  המשך
                  <Icon icon={ArrowLeft} size="sm" />
                </button>
              ) : (
                <span className="text-[0.8rem] text-[var(--fg-muted)]">
                  סיום · שליחת פרטים למטה
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
