"use client";

import { useEffect, useRef, useState } from "react";
import { timeline } from "@/data/content";
import { Reveal, SectionHead } from "./Reveal";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = ref.current?.querySelectorAll<HTMLElement>("[data-tl]");
    if (!nodes?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.tl);
          if (!Number.isNaN(idx)) setActive(idx);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="section section-band" aria-labelledby="timeline-title">
      <div className="shell">
        <SectionHead
          label="ציר זמן"
          titleId="timeline-title"
          title="איך נראה פרויקט מהיום הראשון עד ההשקה."
          description="לוח זמנים טיפוסי לחבילת Atelier — מתכוונן לפי היקף, אבל לעולם לא אטום."
        />

        <div ref={ref} className="relative mt-16">
          <div
            className="absolute top-0 bottom-0 right-[0.4rem] w-px bg-[var(--line)] md:right-1/2 md:translate-x-1/2"
            aria-hidden
          />

          <ol className="space-y-0">
            {timeline.map((item, i) => {
              const on = active === i;
              return (
                <Reveal key={item.title} delay={0.04 + i * 0.04} as="li">
                  <div
                    data-tl={i}
                    className={`relative grid gap-4 py-8 md:grid-cols-2 md:gap-16 md:py-10 ${
                      i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div
                      className={`md:text-left ${i % 2 === 0 ? "md:text-right md:pe-12" : "md:ps-12 md:text-right"}`}
                    >
                      <p
                        className={`text-[0.72rem] tracking-[0.16em] uppercase transition-colors ${
                          on ? "text-[var(--accent)]" : "text-[var(--fg-muted)]"
                        }`}
                      >
                        {item.week}
                      </p>
                      <h3
                        className={`mt-2 text-[1.35rem] font-medium tracking-tight transition-opacity ${
                          on ? "opacity-100" : "opacity-60"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div
                      className={`md:text-right ${i % 2 === 0 ? "md:ps-12 md:text-right" : "md:pe-12 md:text-left"}`}
                    >
                      <p
                        className={`max-w-md text-[0.98rem] leading-8 text-[var(--fg-muted)] transition-opacity md:inline-block ${
                          on ? "opacity-100" : "opacity-55"
                        } ${i % 2 === 0 ? "" : "md:text-left"}`}
                      >
                        {item.body}
                      </p>
                    </div>

                    <span
                      className={`absolute right-0 top-10 h-2.5 w-2.5 rounded-full border md:right-1/2 md:translate-x-1/2 ${
                        on
                          ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_0_6px_var(--accent-soft)]"
                          : "border-[var(--line-strong)] bg-[var(--bg)]"
                      }`}
                      aria-hidden
                    />
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
