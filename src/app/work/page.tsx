import type { Metadata } from "next";
import Link from "next/link";
import { concepts } from "@/data/concepts";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { ConceptGallery } from "@/components/studio/ConceptGallery";
import { FlagshipCase } from "@/components/studio/FlagshipCase";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { pageMeta } from "@/lib/seo";

const methodLayers = [
  {
    title: "האתגר העסקי",
    body: "מה עומד מול העסק: קהל מפוזר, מסר שקבור מתחת לעיצוב, או תהליך שמאבד לקוחות בדרך. בלי אבחנה חדה אין כיוון — יש רק קישוט.",
  },
  {
    title: "הפתרון העיצובי",
    body: "המבנה, הגריד, הקצב והטיפוגרפיה שעונים לאתגר. כל החלטה עיצובית היא תשובה לשאלה, לא בחירה של טעם.",
  },
  {
    title: "מנגנון ההמרה",
    body: "איך תשומת הלב הופכת לפעולה: איפה הכפתור יושב, מה הוא אומר, ומה קורה אחר שלוחצים. כאן נסגרת המכירה.",
  },
] as const;

const craftPillars = [
  "גריד והיררכיה",
  "קצב אנכי ורווחים",
  "טיפוגרפיה בקנה מידה",
  "זרימת מכירה",
] as const;

export const metadata: Metadata = pageMeta({
  title: "מקרי בוחן — אתגר, פתרון ומנגנון המרה",
  description:
    "נכס דיגיטלי חי — LUXORA למטבחי יוקרה — וחמישה מקרי בוחן עיצוביים: עסק שירותים, חנות, קליניקה, דף נחיתה ומותג. לכל אחד האתגר העסקי, הפתרון העיצובי, ומנגנון ההמרה — חשיבה, לא קישוט.",
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
              { name: "מקרי בוחן", path: "/work" },
            ]}
          />
          <p className="marker">
            <span className="brand-latin">AVIYA</span>
            <span>CASE STUDIES</span>
          </p>
          <h1>מקרי בוחן</h1>
          <p>
            נכס חי אחד שנבנה מאפס — LUXORA, מותג מטבחי יוקרה בהתאמה אישית — ולצידו
            חמישה כיווני עיצוב מלאים. כל אחד בנוי באותה שיטה: אתגר עסקי, פתרון
            עיצובי, ומנגנון המרה. חשיבה, לא קישוט.
          </p>
        </div>
      </header>
      <FlagshipCase />
      <section className="band band-ink" aria-labelledby="folio-title">
        <div className="shell">
          <h2 id="folio-title" className="sr-only">
            גלריית מקרי בוחן
          </h2>
          <ConceptGallery concepts={concepts} detailed />
          <p className="folio-note">
            רוצים כיוון לעסק שלכם, לא העתק של המסכים האלה?{" "}
            <Link href="/contact">שיחה קצרה</Link>
          </p>
        </div>
      </section>
      <section className="band" aria-labelledby="reading-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">01</span>
            <span>השיטה</span>
          </p>
          <h2 id="reading-title">שלוש שכבות בכל מקרה בוחן</h2>
          <p className="caption">
            כל עבודה נבנית באותו סדר: קודם מבינים את האתגר, אחר כך מעצבים את
            הפתרון, ולבסוף מגדירים את ההמרה. שום מסך לא נבנה לפני שהשאלה ברורה.
          </p>
          <ol className="reading-list">
            {methodLayers.map((layer, index) => (
              <li key={layer.title}>
                <span className="brand-latin">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="craft-note">
            <h3>עבודת הפרטים</h3>
            <ul className="case-craft">
              {craftPillars.map((pillar) => (
                <li key={pillar}>{pillar}</li>
              ))}
            </ul>
            <p>
              מאחורי כל מקרה בוחן עומדת אותה הקפדה: גריד מדויק, קצב אנכי, טיפוגרפיה
              בקנה מידה, וזרימת מכירה שמובילה לפעולה. אלה הדברים שמפרידים אתר
              שנבנה ביד מאתר שהרכיבו מתבנית.
            </p>
          </div>
          <p className="after-link">
            <Link href="/services">מהמבנים האלה נגזרים השירותים</Link>
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
