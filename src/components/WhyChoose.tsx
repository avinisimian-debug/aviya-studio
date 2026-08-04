import { Reveal, SectionHead } from "./Reveal";

const reasons = [
  {
    title: "שיפוט לפני פיקסלים",
    body: "רוב הבעיות לא בעיצוב — בהחלטות. כאן מתחילים מהן.",
  },
  {
    title: "עברית שנשמעת בוגרת",
    body: "לא תרגום. לא סיסמאות סוכנות. שפה שמכבדת את הלקוח שלכם.",
  },
  {
    title: "תנועה עם משמעות",
    body: "אנימציה שמספרת — לא מסיחה. כל תנועה משרתת אמון.",
  },
  {
    title: "ביצועים כחלק מהמותג",
    body: "אתר איטי אינו פרימיום. מהירות היא חלק מהיוקרה.",
  },
  {
    title: "תהליך שקט",
    body: "בלי 20 סיבובי ׳תזיזי קצת ימינה׳. מבנה ברור, פידבק מדויק.",
  },
  {
    title: "אתם לא מספר בצינור",
    body: "סטודיו אישי. קשר ישיר. אחריות אחת על התוצאה.",
  },
];

export function WhyChoose() {
  return (
    <section id="why-me" className="section" aria-labelledby="why-me-title">
      <div className="shell">
        <SectionHead
          label="למה אני"
          titleId="why-me-title"
          title="כי האתר הוא ההבטחה הראשונה שלכם."
          description="בחירה בסטודיו היא בחירה בסטנדרט. אלה הסיבות שעסקים נשארים — וחוזרים."
        />

        <div className="mt-14 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={0.04 + i * 0.04}>
              <article className="border-t border-[var(--line)] py-8">
                <p className="mb-3 text-[0.7rem] tracking-[0.14em] uppercase text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-3 text-[1.15rem] font-medium tracking-tight">
                  {r.title}
                </h3>
                <p className="text-[0.96rem] leading-8 text-[var(--fg-muted)]">
                  {r.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
