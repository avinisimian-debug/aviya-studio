"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const pillars = [
  {
    n: "01",
    title: "ארכיטקטורה וביצועים",
    en: "Zero Bloat Architecture",
    body: "קוד מאפס ב‑Next.js, טעינה של פחות משנייה, ובלי התוספים השבירים שמכבידים על וורדפרס. כל שורה נכתבת בשביל העסק — לא בשביל תבנית.",
  },
  {
    n: "02",
    title: "עיצוב וחוויית מותג יוקרתית",
    en: "High-End Digital Experience",
    body: "טיפוגרפיה בינלאומית, קצב אנכי מדויק ואנימציות אלגנטיות. נראות שמבדילה אותך מכל מתחרה — לא תבנית שמזהים ממרחק.",
  },
  {
    n: "03",
    title: "הנדסה ממוקדת המרות",
    en: "Conversion-First Logic",
    body: "מבנה שמסנן לידים איכותיים, מסדר את ההצעה ומסיר רעש, ומוביל לפעולה אחת ברורה — עסקאות פרימיום, לא פניות סתמיות.",
  },
  {
    n: "04",
    title: "בעלות מלאה ועצמאות",
    en: "Full Asset Ownership",
    body: "האתר, הקוד והעיצוב הם 100% נכס שלך. בלי תלות בפלטפורמה סגורה, בלי ריטיינר חובה, ובלי עלויות תחזוקה נסתרות.",
  },
] as const;

const rows = [
  {
    metric: "מהירות טעינה",
    generic: "2–5 שניות, תלוי בתוספים",
    bespoke: "מתחת לשנייה, Edge גלובלי",
  },
  {
    metric: "משקל ותוספים",
    generic: "1.5–4MB ועשרות תוספים",
    bespoke: "0KB תבנית · קוד מינימלי",
  },
  {
    metric: "שליטה בעיצוב",
    generic: "מוגבל לתבנית ולפלאגינים",
    bespoke: "פיקסל‑פרפקט, טיפוגרפיה מותאמת",
  },
  {
    metric: "אבטחה",
    generic: "תלויה בתוספים, פרצות נפוצות",
    bespoke: "משטח תקיפה מינימלי",
  },
  {
    metric: "המרות",
    generic: "מבנה כללי, לא מכוון",
    bespoke: "ארכיטקטורת המרה ולכידת לידים",
  },
  {
    metric: "בעלות",
    generic: "מנוי חודשי ותלות בפלטפורמה",
    bespoke: "100% נכס שלך, ללא תלות",
  },
] as const;

function Check() {
  return (
    <svg className="cmp-mark cmp-mark-yes" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="cmp-mark cmp-mark-no" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BespokeStandard() {
  const [focus, setFocus] = useState<"generic" | "bespoke">("bespoke");

  return (
    <section className="band band-muted bespoke" id="standard" aria-labelledby="standard-title">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="marker">
              <span className="brand-latin">01</span>
              <span>הסטנדרט</span>
            </p>
            <h2 id="standard-title">הנדסת פרימיום מול תבניות גנריות.</h2>
          </div>
          <p>
            רוב העסקים מקבלים תבנית שנמתחת מעל צרכים אמיתיים. אנחנו בונים נכס מאפס —
            קוד, עיצוב והמרה בתכנון אחד — כדי שהאתר יעבוד כמו מכונה שמייצרת לקוחות,
            לא כמו כרטיס ביקור.
          </p>
        </div>

        <ol className="pillar-grid">
          {pillars.map((item, index) => (
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

        <div className="compare">
          <div className="compare-head">
            <h3>
              וורדפרס / וויקס <span>מול</span> סטודיו אביה
            </h3>
            <div className="compare-toggle" role="group" aria-label="בחירת עמודה להדגשה">
              <button
                type="button"
                aria-pressed={focus === "generic"}
                onClick={() => setFocus("generic")}
              >
                תבנית גנרית
              </button>
              <button
                type="button"
                aria-pressed={focus === "bespoke"}
                onClick={() => setFocus("bespoke")}
              >
                סטודיו אביה
              </button>
            </div>
          </div>

          <div className={`compare-table is-${focus}`}>
            <table>
              <caption className="sr-only">
                השוואה בין תבניות גנריות (וורדפרס / וויקס) לבין קוד מאפס של סטודיו אביה
              </caption>
              <thead>
                <tr>
                  <th scope="col">קריטריון</th>
                  <th scope="col" className="col-generic">
                    תבנית גנרית
                  </th>
                  <th scope="col" className="col-bespoke">
                    סטודיו אביה · קוד מאפס
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.metric}>
                    <th scope="row">{row.metric}</th>
                    <td className="col-generic" data-label="תבנית גנרית">
                      <Cross />
                      <span>{row.generic}</span>
                    </td>
                    <td className="col-bespoke" data-label="סטודיו אביה">
                      <Check />
                      <span>{row.bespoke}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
