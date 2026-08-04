"use client";

import { useState } from "react";
import { portfolio } from "@/data/content";
import { Reveal, SectionHead, ease } from "./Reveal";
import { AnimatePresence, motion } from "framer-motion";

export function Portfolio() {
  const [active, setActive] = useState(0);
  const item = portfolio[active]!;

  return (
    <section id="work" className="section section-band" aria-labelledby="work-title">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            label="תיק עבודות"
            titleId="work-title"
            title="רגעי בחירה. לא קיר לוגואים."
          />
          <Reveal delay={0.1}>
            <p className="max-w-sm prose-muted md:text-left">
              בחרו פרויקט. הביטו בטון. זה הטעם של השותפות — לא סליידר אינסופי.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <Reveal>
            <ul className="focus-list" role="tablist" aria-label="פרויקטים">
              {portfolio.map((p, i) => {
                const selected = i === active;
                return (
                  <li key={p.id} className="focus-item border-t border-[var(--line)] last:border-b">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="portfolio-stage"
                      id={`tab-${p.id}`}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex w-full items-baseline justify-between gap-4 py-5 text-right transition-colors ${
                        selected ? "text-[var(--fg)]" : "text-[var(--fg-muted)]"
                      }`}
                    >
                      <span className="display text-[clamp(1.4rem,2.5vw,1.85rem)] tracking-tight">
                        {p.brand}
                      </span>
                      <span className="shrink-0 text-[0.78rem] tracking-[0.08em]">
                        {p.field} · {p.year}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              id="portfolio-stage"
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              className="stage-frame flex min-h-[320px] flex-col justify-end p-7 md:min-h-[420px] md:p-10"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease }}
                  className="relative z-10"
                >
                  <div
                    className={`absolute -inset-10 -z-10 bg-gradient-to-br ${item.tone} opacity-80 blur-2xl`}
                    aria-hidden
                  />
                  <p className="mb-2 text-[0.72rem] tracking-[0.16em] uppercase text-[var(--fg-muted)]">
                    {item.field}
                  </p>
                  <h3 className="display text-[clamp(2rem,4vw,3.2rem)] tracking-tight">
                    {item.brand}
                  </h3>
                  <p className="mt-4 max-w-sm text-[1.05rem] leading-8 text-[var(--fg-soft)]">
                    {item.line}
                  </p>
                  <a
                    href={`#case-${item.id}`}
                    className="btn btn-ghost mt-8 !min-h-11"
                  >
                    מקרה מלא
                    <span aria-hidden>←</span>
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
