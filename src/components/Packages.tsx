import { packages } from "@/data/content";
import { Reveal, SectionHead } from "./Reveal";

export function Packages() {
  return (
    <section id="packages" className="section" aria-labelledby="packages-title">
      <div className="shell">
        <SectionHead
          label="חבילות אתר"
          titleId="packages-title"
          title="מסגרות ברורות. התאמה אמיתית."
          description="נקודות התחלה — לא מסמרות. אחרי שיחה, נדייק חבילה (או נגיד שזו לא החבילה)."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={0.05 + i * 0.07}>
              <article
                className={`flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.015)] p-7 md:p-8 ${
                  pkg.featured ? "package-featured lg:-translate-y-2" : ""
                }`}
              >
                <div className="mb-8">
                  {pkg.featured ? (
                    <p className="mb-3 text-[0.7rem] tracking-[0.16em] uppercase text-[var(--accent)]">
                      מומלץ
                    </p>
                  ) : (
                    <p className="mb-3 text-[0.7rem] tracking-[0.16em] uppercase text-[var(--fg-muted)]">
                      {pkg.fit}
                    </p>
                  )}
                  <h3 className="display text-[2.2rem] tracking-tight">{pkg.name}</h3>
                  <p className="mt-2 text-[0.95rem] text-[var(--fg-muted)]">{pkg.tagline}</p>
                </div>

                <p className="text-[1.35rem] font-medium tracking-tight">{pkg.price}</p>
                <p className="mt-1 text-[0.88rem] text-[var(--fg-muted)]">
                  לוח זמנים: {pkg.timeline}
                </p>

                <ul className="mt-8 flex-1 space-y-3 border-t border-[var(--line)] pt-6">
                  {pkg.includes.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 text-[0.95rem] leading-7 text-[var(--fg-soft)]"
                    >
                      <span className="mt-3 h-px w-3 shrink-0 bg-[var(--accent)]" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`btn mt-8 w-full ${pkg.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  לשאול על {pkg.name}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
