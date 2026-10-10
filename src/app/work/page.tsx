import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { FlagshipCase } from "@/components/studio/FlagshipCase";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";

const standards = [
  {
    n: "01",
    title: "ארכיטקטורה מאפס",
    en: "Zero-Bloat Architecture",
    body: "המבנה, הקוד והנתונים נכתבים סביב העסק — לא מורכבים מתבנית. אפס תוספים מיותרים ואפס חוב טכני.",
  },
  {
    n: "02",
    title: "עיצוב ותנועה בקנה מידה",
    en: "Design & Motion",
    body: "טיפוגרפיה בינלאומית, קצב אנכי מדויק ואנימציות אלגנטיות שמרגישות כמו מותג — לא כמו אפקטים.",
  },
  {
    n: "03",
    title: "מהירות וביצועים",
    en: "Sub-Second Performance",
    body: "טעינה מתחת לשנייה וניקוד Core Web Vitals גבוה — חוויה חלקה מהנייד ועד המסך הגדול.",
  },
  {
    n: "04",
    title: "בעלות מלאה",
    en: "Full Ownership",
    body: "הקוד, העיצוב והתוכן הם 100% שלכם. בלי תלות בפלטפורמה סגורה ובלי מנוי חובה כדי להישאר באוויר.",
  },
] as const;

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
    body: "איך תשומת הלב הופכת לפעולה: איפה הכפתור יושב, מה הוא אומר, ומה קורה אחרי שלוחצים. כאן נסגרת המכירה.",
  },
] as const;

const craftPillars = [
  "גריד והיררכיה",
  "קצב אנכי ורווחים",
  "טיפוגרפיה בקנה מידה",
  "זרימת מכירה",
] as const;

export const metadata: Metadata = pageMeta({
  title: "מקרי בוחן — נכס חי בהתאמה אישית",
  description:
    "נכס דיגיטלי חי אחד, LUXORA למטבחי יוקרה, שנבנה מאפס בארכיטקטורה, עיצוב והמרה בתכנון אחד — לצד סטנדרט ההנדסה שמאחורי כל פרויקט בהתאמה אישית.",
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
            נכס חי אחד, שנבנה מאפס — LUXORA, מותג מטבחי יוקרה בהתאמה אישית. לא מוקאפ
            ולא תבנית: ארכיטקטורה, עיצוב והמרה בתכנון אחד, מהאפיון ועד ההשקה.
          </p>
        </div>
      </header>
      <FlagshipCase />
      <section className="band band-muted" aria-labelledby="standard-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="marker">
                <span className="brand-latin">01</span>
                <span>הסטנדרט</span>
              </p>
              <h2 id="standard-title">כל נכס נבנה מאפס באותה הקפדה.</h2>
            </div>
            <p>
              מאחורי כל פרויקט עומד אותו סטנדרט הנדסי: קוד שכתוב מהיסוד, עיצוב שנבנה
              סביב המותג, ביצועים שנמדדים, ובעלות מלאה שנשארת בידיים שלכם.
            </p>
          </div>

          <ol className="pillar-grid">
            {standards.map((item, index) => (
              <Reveal as="li" key={item.en} delay={index * 0.06}>
                <div className="pillar">
                  <span className="pillar-index brand-latin">{item.n}</span>
                  <h3 className="pillar-title">
                    {item.title}
                    <em>{item.en}</em>
                  </h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="commission">
            <div>
              <p className="marker">
                <span className="brand-latin">COMMISSION</span>
                <span>הזמנת פרויקט</span>
              </p>
              <h3>חוויית מותג בהתאמה אישית לפרויקט הבא שלך.</h3>
              <p>
                כל פרויקט נבנה בהתאמה מלאה — מהאפיון הראשון ועד ההשקה. שיחה קצרה
                מספיקה כדי להבין אם אנחנו מתאימים, ומה הצעד הבא.
              </p>
            </div>
            <div className="commission-actions">
              <Link className="btn btn-primary" href="/contact">
                לתיאום שיחה
              </Link>
              <Link className="btn btn-ghost" href="/services">
                לשירותים
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="band" aria-labelledby="reading-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">02</span>
            <span>השיטה</span>
          </p>
          <h2 id="reading-title">שלוש שכבות בכל פרויקט</h2>
          <p className="caption">
            כל פרויקט נבנה באותו סדר: קודם מבינים את האתגר, אחר כך מעצבים את הפתרון,
            ולבסוף מגדירים את ההמרה. שום מסך לא נבנה לפני שהשאלה ברורה.
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
              מאחורי כל פרויקט עומדת אותה הקפדה: גריד מדויק, קצב אנכי, טיפוגרפיה בקנה
              מידה, וזרימת מכירה שמובילה לפעולה. אלה הדברים שמפרידים אתר שנבנה ביד מאתר
              שהרכיבו מתבנית.
            </p>
          </div>
          <p className="after-link">
            <Link href="/services">מהסטנדרט הזה נגזרים השירותים</Link>
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
