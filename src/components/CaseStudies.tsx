"use client";

import { useState } from "react";
import { cases } from "@/data/content";
import { Reveal, SectionHead, ease } from "./Reveal";
import { AnimatePresence, motion } from "framer-motion";

export function CaseStudies() {
  const [open, setOpen] = useState<string | null>(cases[0]?.id ?? null);

  return (
    <section id="cases" className="section" aria-labelledby="cases-title">
      <div className="shell">
        <SectionHead
          label="מקרי בוחן"
          titleId="cases-title"
          title="בעיה. מהלך. תוצאה."
          description="לא טקסט שיווקי ארוך. שלושה סיפורים קצרים שמראים איך שיפוט משנה תוצאה."
        />

        <div className="mt-14 space-y-0">
          {cases.map((c, i) => {
            const isOpen = open === c.id;
            return (
              <Reveal key={c.id} delay={0.04 + i * 0.04}>
                <article
                  id={`case-${c.id}`}
                  className="border-t border-[var(--line)] last:border-b"
                >
                  <button
                    type="button"
                    className="flex w-full flex-col gap-3 py-8 text-right md:flex-row md:items-center md:justify-between md:gap-8"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : c.id)}
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="display text-[1.4rem] text-[var(--accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="display text-[clamp(1.6rem,3vw,2.3rem)] tracking-tight">
                        {c.brand}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6 md:ms-auto">
                      <p className="hidden text-[0.95rem] text-[var(--fg-muted)] lg:block">
                        {c.metricLabel}:{" "}
                        <span className="text-[var(--fg-soft)]">{c.metric}</span>
                      </p>
                      <span className="text-[0.86rem] text-[var(--fg-soft)]">
                        {isOpen ? "סגור ↑" : "פתח ←"}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-10 md:grid-cols-3">
                          {[
                            { t: "האתגר", b: c.challenge },
                            { t: "המהלך", b: c.move },
                            { t: "התוצאה", b: c.result },
                          ].map((block) => (
                            <div
                              key={block.t}
                              className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-6"
                            >
                              <p className="mb-3 text-[0.7rem] tracking-[0.14em] uppercase text-[var(--fg-muted)]">
                                {block.t}
                              </p>
                              <p className="text-[1rem] leading-8 text-[var(--fg-soft)]">
                                {block.b}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
