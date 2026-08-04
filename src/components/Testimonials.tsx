"use client";

import { useState } from "react";
import { testimonials } from "@/data/content";
import { Reveal, SectionHead, ease } from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index]!;

  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }
  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }

  return (
    <section
      id="testimonials"
      className="section"
      aria-labelledby="testimonials-title"
    >
      <div className="shell">
        <SectionHead
          label="לקוחות"
          titleId="testimonials-title"
          title="מילים של אנשים שבאמת בנו."
          description="בלי כוכבים. בלי אווטארים מלאכותיים. רק ציטוט, שם, ותפקיד."
        />

        <Reveal delay={0.1}>
          <figure className="relative mt-14 border-t border-[var(--line)] pt-12">
            <div className="absolute top-8 right-0 display text-[5rem] leading-none text-[var(--accent)]/25 select-none" aria-hidden>
              ”
            </div>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease }}
                className="max-w-3xl"
              >
                <p className="text-[clamp(1.35rem,3vw,2rem)] font-light leading-[1.45] tracking-tight text-[var(--fg)]">
                  {t.quote}
                </p>
                <figcaption className="mt-10">
                  <p className="text-[1.05rem] font-medium">{t.name}</p>
                  <p className="mt-1 text-[0.92rem] text-[var(--fg-muted)]">{t.role}</p>
                </figcaption>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-3">
              <button type="button" className="btn btn-ghost !min-h-11 !px-4" onClick={prev} aria-label="המלצה קודמת">
                →
              </button>
              <button type="button" className="btn btn-ghost !min-h-11 !px-4" onClick={next} aria-label="המלצה הבאה">
                ←
              </button>
              <p className="ms-3 text-[0.82rem] text-[var(--fg-muted)]" aria-live="polite">
                {index + 1} / {testimonials.length}
              </p>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
