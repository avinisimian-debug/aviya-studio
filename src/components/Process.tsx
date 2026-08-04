"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/content";
import { Reveal, SectionHead } from "./Reveal";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = ref.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!nodes?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.step);
          if (!Number.isNaN(idx)) setActive(idx);
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.15 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const progress = ((active + 1) / processSteps.length) * 100;

  return (
    <section id="process" className="section section-band" aria-labelledby="process-title">
      <div className="shell">
        <SectionHead
          label="התהליך שלי"
          titleId="process-title"
          title="ארבעה שלבים. אפס ערפל."
          description="אתם תמיד יודעים איפה אתם נמצאים — ומה הצעד הבא. זה מה שבונה ביטחון לפני שהעיצוב מתחיל."
        />

        <div ref={ref} className="relative mt-16">
          <div className="rail-track hidden md:block" aria-hidden>
            <div className="rail-progress" style={{ width: `${progress}%` }} />
          </div>

          <ol className="grid gap-10 md:grid-cols-4 md:gap-5">
            {processSteps.map((step, i) => {
              const on = active === i;
              return (
                <Reveal key={step.n} delay={0.05 + i * 0.05} as="li">
                  <div
                    data-step={i}
                    className="relative transition-opacity duration-500"
                    style={{ opacity: on ? 1 : 0.5 }}
                  >
                    <div
                      className={`mb-5 h-2.5 w-2.5 rounded-full border transition-all duration-500 ${
                        on
                          ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_0_6px_var(--accent-soft)]"
                          : "border-[var(--line-strong)] bg-[var(--bg)]"
                      }`}
                      aria-hidden
                    />
                    <p className="mb-2 text-[0.7rem] tracking-[0.16em] uppercase text-[var(--fg-muted)]">
                      שלב {step.n}
                    </p>
                    <h3 className="mb-3 text-[1.25rem] font-medium tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[0.96rem] leading-8 text-[var(--fg-muted)]">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
