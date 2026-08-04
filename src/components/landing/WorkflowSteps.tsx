"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { workflowSteps } from "@/data/landing";
import { fadeRise, easeSmooth } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import {
  MessageCircle,
  Code2,
  TrendingUp,
} from "@/lib/icons";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<(typeof workflowSteps)[number]["icon"], LucideIcon> = {
  message: MessageCircle,
  code: Code2,
  growth: TrendingUp,
};

/** Interactive linear timeline — מאפיון להשקה */
export function WorkflowSteps() {
  const [active, setActive] = useState(0);
  const step = workflowSteps[active]!;
  const StepIcon = iconMap[step.icon];

  return (
    <section
      id="process"
      className="section bg-background"
      aria-labelledby="process-title"
    >
      <div className="shell">
        <motion.div
          className="max-w-2xl"
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <p className="section-label">התהליך</p>
          <h2 id="process-title" className="lead max-w-[12ch] font-extrabold">
            מאפיון להשקה
          </h2>
          <p className="prose-muted mt-5">
            חמישה שלבים שקופים — אתם תמיד יודעים איפה אנחנו ומה הצעד הבא.
          </p>
        </motion.div>

        {/* Linear desktop track */}
        <div className="mt-14 hidden lg:block" aria-hidden>
          <div className="relative flex justify-between">
            <div className="absolute top-5 start-0 end-0 h-px bg-white/10" />
            <motion.div
              className="absolute top-5 start-0 h-px bg-accent"
              initial={false}
              animate={{
                width: `${(active / (workflowSteps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.45, ease: easeSmooth }}
            />
            {workflowSteps.map((s, i) => (
              <button
                key={s.n}
                type="button"
                onClick={() => setActive(i)}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-[0.8rem] font-bold tabular-nums transition-colors ${
                    i <= active
                      ? "border-accent bg-accent-soft text-white"
                      : "border-white/10 bg-background text-foreground-muted"
                  }`}
                >
                  {s.n}
                </span>
                <span
                  className={`max-w-[7rem] text-center text-[0.78rem] font-medium ${
                    i === active ? "text-white" : "text-foreground-muted"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile / tablet chips */}
        <div
          className="mt-10 flex flex-wrap gap-2 lg:hidden"
          role="tablist"
          aria-label="שלבי התהליך"
        >
          {workflowSteps.map((s, i) => (
            <button
              key={s.n}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls="process-panel"
              id={`process-tab-${i}`}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.8rem] font-medium transition-colors ${
                active === i
                  ? "border-accent/50 bg-accent-soft text-white"
                  : "border-white/10 text-foreground-muted"
              }`}
            >
              <span className="tabular-nums text-accent">{s.n}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.n}
            id="process-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: easeSmooth }}
            className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md md:p-12"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-accent-soft text-accent">
                <Icon icon={StepIcon} size="md" />
              </div>
              <div>
                <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-foreground-muted">
                  שלב {step.n} מתוך 05
                </p>
                <h3 className="mt-2 text-[1.5rem] font-extrabold tracking-tight text-white md:text-[1.75rem]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xl text-[1.05rem] font-normal leading-[1.75] text-foreground-muted">
                  {step.body}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
