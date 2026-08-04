import { Reveal, SectionHead } from "./Reveal";

const facts = [
  { k: "פוקוס", v: "מותגים ועסקים בישראל" },
  { k: "גישה", v: "מוצר לפני תבנית" },
  { k: "שפה", v: "עברית מקורית · RTL" },
];

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="portrait-plate max-w-md" role="img" aria-label="איור דיוקן מופשט של הסטודיו">
            <div className="absolute inset-x-0 bottom-6 z-10 px-6 text-center">
              <p className="display text-[2rem] tracking-tight">Aviya</p>
              <p className="mt-1 text-[0.78rem] tracking-[0.16em] uppercase text-[var(--fg-muted)]">
                Founder · Designer · Builder
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHead
            label="אודות"
            titleId="about-title"
            title="אני בונה את הנקודה שבה אנשים מחליטים לסמוך עליכם."
            description="לא סוכנות עם 40 מצגות. לא פרילנסר שמעתיק תבניות. סטודיו אישי עם סטנדרט מוצר — מהמסר הראשון ועד הפיקסל האחרון."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {facts.map((f, i) => (
              <Reveal key={f.k} delay={0.1 + i * 0.06}>
                <div className="border-t border-[var(--line)] pt-4">
                  <p className="mb-2 text-[0.7rem] tracking-[0.14em] uppercase text-[var(--accent)]">
                    {f.k}
                  </p>
                  <p className="text-[0.95rem] leading-7 text-[var(--fg-soft)]">{f.v}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 max-w-lg text-[1.02rem] leading-9 text-[var(--fg-muted)]">
              כל פרויקט מתחיל בשיפוט: מה חייב להישאר, מה חייב להיעלם, ואיך
              האתר מרגיש כמו מותג — לא כמו עוד אתר ״יפה״ בישראל.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
