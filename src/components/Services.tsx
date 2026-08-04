import { services } from "@/data/content";
import { Reveal, SectionHead } from "./Reveal";

export function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="shell">
        <SectionHead
          label="שירותים"
          titleId="services-title"
          title="מה אפשר לבנות יחד — בלי תפריט של 40 פריטים."
          description="מגוון צר בכוונה. עומק בכל דבר. אם זה לא מתאים — אגיד ככה."
        />

        <div className="focus-list mt-14">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={0.04 + i * 0.04}>
              <article className="focus-item group border-t border-[var(--line)] py-7 last:border-b md:grid md:grid-cols-[5rem_0.9fr_1.4fr] md:items-baseline md:gap-8 md:py-9">
                <p className="display text-[1.35rem] text-[var(--accent)] transition-colors group-hover:text-[var(--fg)]">
                  {s.id}
                </p>
                <h3 className="mt-2 text-[1.25rem] font-medium tracking-tight md:mt-0">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-8 text-[var(--fg-muted)] md:mt-0">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
