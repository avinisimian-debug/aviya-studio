"use client";

import { motion, useReducedMotion } from "framer-motion";
import { currentHebrewMonth, LANDING } from "@/data/landing";
import { easeSmooth } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import { ArrowLeft } from "@/lib/icons";

/** Ultra-high impact hero — agency conversion spine */
export function LandingHero({ play }: { play: boolean }) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = play && !prefersReduced;
  const month = currentHebrewMonth();
  const t = { duration: 0.7, ease: easeSmooth };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/10 bg-background"
      aria-labelledby="hero-headline"
    >
      <div className="hero-field" aria-hidden>
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-grid" />
        <div className="hero-floor" />
      </div>

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-center py-[calc(var(--header-h)+3.5rem)] pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ ...t, delay: 0.05 }}
          >
            <span className="hero-status-dot" />
            <span className="text-[0.78rem] font-medium tracking-[0.02em] text-foreground-muted">
              זמין לפרויקטים חדשים · {month}
            </span>
          </motion.div>

          <motion.p
            className="mb-5 text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-accent"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ ...t, delay: 0.1 }}
          >
            AVIYA · Digital Studio
          </motion.p>

          <motion.h1
            id="hero-headline"
            className="text-[clamp(1.65rem,4.2vw,2.85rem)] font-extrabold leading-[1.25] tracking-display text-white"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ ...t, delay: 0.16, duration: 0.8 }}
          >
            מהיום לא צריך להתפשר – קבלו את כל היתרונות במקום אחד: עיצוב מקצועי,
            מהירות טעינה מושלמת, והמרות גבוהות יותר.
          </motion.h1>

          <motion.p
            className="prose-muted mx-auto mt-7 max-w-2xl text-[1.05rem] md:text-[1.1rem]"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ ...t, delay: 0.28 }}
          >
            הגעתם מאינסטגרם? אתם במקום הנכון. כאן בונים נוכחות שלא תלויה
            באלגוריתם — אתר שמציג אתכם כמו שאתם באמת, סוגר פניות גם כשאתם לא
            מול המסך, ובבעלות מלאה שלכם.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ ...t, delay: 0.4 }}
          >
            <a href="#contact" className="hero-cta group">
              <span className="hero-cta-pulse" aria-hidden />
              <span className="relative z-[1]">בואו נדבר</span>
              <span
                className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:-translate-x-0.5"
                aria-hidden
              >
                <Icon icon={ArrowLeft} size="sm" className="text-[#0b0c0e]" />
              </span>
            </a>
            <a
              href={LANDING.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 text-[0.9rem] font-semibold text-foreground-soft backdrop-blur-md transition-colors hover:border-white/20 hover:text-white"
            >
              או בוואטסאפ
            </a>
          </motion.div>

          {/* Interactive project counter strip */}
          <motion.div
            className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ ...t, delay: 0.52 }}
          >
            {[
              { value: "40+", label: "פרויקטים" },
              { value: "100%", label: "מותאם" },
              { value: "2–6", label: "שבועות טיפוסי" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-background-elevated/90 px-3 py-5 backdrop-blur-md"
              >
                <p className="text-[1.35rem] font-extrabold tracking-tight text-white md:text-[1.5rem]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.72rem] text-foreground-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
