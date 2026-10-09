import type { Metadata } from "next";
import Link from "next/link";
import { concepts } from "@/data/concepts";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { ConceptGallery } from "@/components/studio/ConceptGallery";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { pageMeta } from "@/lib/seo";

const readings: Record<string, { watch: string; forWhom: string }> = {
  service: {
    forWhom: "עסק שירותים שצריך להסביר הצעה אחת ולהוביל לפנייה.",
    watch: "הסדר בעמוד: כותרת, שלושה שלבים, כפתור אחד. אין תפריט שמפצל את הקשב.",
  },
  shop: {
    forWhom: "מותג שמוכר מוצרים ורוצה שהקנייה תמשיך את השפה, לא קטלוג מוכן.",
    watch: "המוצר יושב בגריד שקט. המחיר חלק מהקומפוזיציה, לא מדבקה שהודבקה בסוף.",
  },
  clinic: {
    forWhom: "קליניקה או מקצוע טיפולי, כשההחלטה מתחילה באמון ולא במבצע.",
    watch: "הרבה שטח ריק, שעות ברורות, ותיאום כפעולה הראשית.",
  },
  landing: {
    forWhom: "קמפיין עם כוונה: מודעה, סטטוס או המלצה שמגיעים לעמוד אחד.",
    watch: "הבטחה, מבנה קצר, ופעולה אחת. זה לא אתר שלם שנדחס.",
  },
  editorial: {
    forWhom: "מותג שצריך טון לפני שהוא צריך עוד עמוד מידע.",
    watch: "אות גדולה, שוליים רחבים, ובלוק צבע שמוביל את העין.",
  },
};

export const metadata: Metadata = pageMeta({
  title: "כיווני עיצוב",
  description:
    "חמישה כיווני עיצוב מקוריים: שירותים, חנות, קליניקה, דף נחיתה ומותג. מסומנים כקונספט. פרויקט אמיתי יוצג רק עם אישור, בלי מספרים מומצאים.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <SiteFrame>
      <header className="page-hero page-hero-dark">
        <div className="shell">
          <Breadcrumbs
            items={[
              { name: "בית", path: "/" },
              { name: "כיוונים", path: "/work" },
            ]}
          />
          <p className="marker">
            <span className="brand-latin">02</span>
            <span>קונספט</span>
          </p>
          <h1>כיווני עיצוב</h1>
          <p>
            אלה קונספטים מקוריים: הדגמה של שפה, מבנה וקצב. לא לקוחות, לא לוגואים,
            ולא תוצאות. כשיהיה פרויקט עם אישור להצגה, הוא יסומן כעבודה ולא ככיוון.
          </p>
        </div>
      </header>
      <section className="band band-ink" aria-labelledby="folio-title">
        <div className="shell">
          <h2 id="folio-title" className="sr-only">
            גלריית כיוונים
          </h2>
          <ConceptGallery concepts={concepts} />
          <p className="folio-note">
            רוצים כיוון לעסק שלכם, לא העתק של המסכים האלה?{" "}
            <Link href="/contact">שיחה קצרה</Link>
          </p>
        </div>
      </section>
      <section className="band" aria-labelledby="reading-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">03</span>
            <span>איך קוראים</span>
          </p>
          <h2 id="reading-title">מה כל כיוון בודק</h2>
          <p className="caption">
            פרויקט שיוצג בעתיד יכלול אתגר, כיוון שנבחר, מסכים, ותפקיד הסטודיו.
            מספרים ותוצאות רק אם נמדדו ואושרו להצגה. עד אז אין כאן תיאורי מקרה.
          </p>
          <ol className="reading-list">
            {concepts.map((concept, index) => {
              const note = readings[concept.id];
              return (
                <li key={concept.id}>
                  <span className="brand-latin">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{concept.title}</h3>
                    <p>{note?.forWhom}</p>
                    <p>{note?.watch}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="after-link">
            <Link href="/services">מהמבנים האלה נגזרים השירותים</Link>
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
