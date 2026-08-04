import { technologies } from "@/data/content";
import { Reveal, SectionHead } from "./Reveal";

export function Technologies() {
  const loop = [...technologies, ...technologies];

  return (
    <section
      id="tech"
      className="section section-band"
      aria-labelledby="tech-title"
    >
      <div className="shell">
        <SectionHead
          label="טכנולוגיות"
          titleId="tech-title"
          title="כלים של מוצר. לא רשימת באז."
          description="הטכנולוגיה נבחרת לפי המטרה — מהירות, עריכה, אינטגרציה, או חוויית פרימיום."
        />
      </div>

      <Reveal delay={0.1}>
        <div className="marquee mt-12" aria-hidden>
          <div className="marquee-track">
            {loop.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="display whitespace-nowrap text-[clamp(1.6rem,3vw,2.4rem)] tracking-tight text-[var(--fg-soft)]/70"
              >
                {name}
                <span className="mx-4 text-[var(--accent)]/50">·</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="shell mt-10">
        <ul className="sr-only">
          {technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <Reveal delay={0.12}>
          <p className="prose-muted max-w-2xl">
            Next.js לביצועים ו-SEO. Figma לכיוון. Sanity כשצריך CMS. Vercel
            כשהשקה צריכה להיות שקטה ומהירה. הבחירה תמיד משרתת את הסיפור — לא
            להפך.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
