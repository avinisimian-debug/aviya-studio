import { Reveal, SectionHead } from "./Reveal";

const pillars = [
  {
    title: "מחיר משקף שיפוט",
    body: "לא משלמים על שעות עיצוב בלבד — משלמים על הכרעות שלא יופיעו באף תבנית.",
  },
  {
    title: "שקיפות לפני התחלה",
    body: "היקף, לוח זמנים, ומחיר — ברורים מראש. בלי ׳נתקדם ונראה׳.",
  },
  {
    title: "איכות לפני הנחה",
    body: "אם התקציב לא מתאים לפרויקט הנכון — נגיד. עדיף על פרויקט שמחליש את שנינו.",
  },
];

export function PricingPhilosophy() {
  return (
    <section
      id="pricing-philosophy"
      className="section section-band"
      aria-labelledby="pricing-philosophy-title"
    >
      <div className="shell">
        <SectionHead
          label="פילוסופיית תמחור"
          titleId="pricing-philosophy-title"
          title="לא ׳הכי זול׳. הכי נכון."
          description="תמחור פרימיום אינו עלות סמלית — הוא התחייבות לרמה. כך זה עובד:"
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.06 + i * 0.06}>
              <div className="h-full border-t border-[var(--line)] pt-6">
                <p className="mb-4 display text-[1.5rem] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-3 text-[1.2rem] font-medium tracking-tight">
                  {p.title}
                </h3>
                <p className="text-[0.98rem] leading-8 text-[var(--fg-muted)]">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
