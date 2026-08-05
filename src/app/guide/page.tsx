import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";
import { AdUnit } from "@/components/ads/AdUnit";
import { LANDING } from "@/data/landing";

export const metadata: Metadata = {
  title: "למה עסק צריך אתר מקצועי ב־2026",
  description:
    "מדריך בעברית: למה אתר מקצועי מביא לקוחות, מה ההבדל בין אינסטגרם לאתר, ואיך לבחור בניית אתרים או חנות דיגיטלית בישראל. Aviya.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "למה עסק צריך אתר מקצועי | Aviya",
    description:
      "מדריך קצר לבעלי עסקים: אתר שמביא לקוחות, חנות דיגיטלית, והשקעה שמחזירה.",
    url: "/guide",
  },
  keywords: [
    "בניית אתרים",
    "אתר לעסק",
    "חנות דיגיטלית",
    "למה צריך אתר",
    "אתר שמביא לקוחות",
    "Aviya",
  ],
};

/**
 * Evergreen SEO article — helps indexing + AdSense content quality.
 */
export default function GuidePage() {
  return (
    <SiteChrome title="למה עסק צריך אתר מקצועי ב־2026">
      <p className="site-kicker">מדריך · Aviya</p>
      <p className="site-lead">
        הלקוח הרציני בודק אתכם בגוגל לפני שהוא מתקשר. מה הוא מוצא — קובע אם
        תקבלו פנייה או שהמתחרה יקבל אותה.
      </p>

      <div className="site-prose">
        <h2>אינסטגרם זה לא אתר</h2>
        <p>
          רשתות חברתיות הן מעולות לחשיפה. אבל הן שכירות: האלגוריתם משתנה,
          הפוסט יורד, והלקוח לא תמיד מוצא אתכם שוב. אתר בבעלותכם הוא{" "}
          <strong>נכס</strong> — פתוח 24/7, עם מסר ברור ומסלול לפנייה.
        </p>

        <h2>מה אתר טוב באמת עושה</h2>
        <ul>
          <li>
            <strong>מסר מעל הקיפול</strong> — תוך שניות ברור מי אתם ומה
            להרוויח אצלכם
          </li>
          <li>
            <strong>אמון</strong> — עיצוב, תהליך, והוכחות שנראים מקצועיים
          </li>
          <li>
            <strong>המרה</strong> — כפתור אחד: וואטסאפ, טופס או שיחה
          </li>
          <li>
            <strong>מובייל</strong> — רוב ההחלטות קורות בטלפון
          </li>
        </ul>

        <AdUnit className="aviya-ad-slot--article" label="פרסומת" />

        <h2>אתר תדמית מול חנות דיגיטלית</h2>
        <p>
          לא כל עסק צריך סל קניות. שירותים, קליניקות וייעוץ — זקוקים לאתר
          שמביא <strong>לידים</strong>. מוצרים פיזיים או דיגיטליים — זקוקים
          ל<strong>חנות</strong> עם סליקה ותהליך רכישה. ב־{LANDING.brand}{" "}
          בונים לפי המטרה, לא לפי תבנית גנרית.
        </p>

        <h2>כמה זמן זה לוקח?</h2>
        <p>
          עם כיוון וחומרים בסיסיים — בדרך כלל ימים עד כשבועיים. המטרה: לעלות
          לאוויר עם מערכת שעובדת, בלי ״פרויקט אינסופי״.
        </p>

        <h2>SEO בסיסי בהקמה</h2>
        <p>
          בהקמה נכון לכלול: מבנה טכני, כותרות, מהירות, מובייל, וחיבור ל-Google
          Search Console. קידום אגרסיבי אפשר להוסיף כשיש על מה לפרסם.
        </p>

        <h2>הצעד הבא</h2>
        <p>
          רוצים אתר שמביא לקוחות — או חנות שמוכרת?{" "}
          <Link href="/contact">השאירו פרטים</Link> או כתבו{" "}
          <a
            href={LANDING.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            בוואטסאפ
          </a>
          .
        </p>
      </div>

      <div className="site-cta-band" style={{ marginTop: "2.5rem" }}>
        <p>מוגבל ל־{LANDING.monthlyCap} עסקים בחודש — רמה וזמינות.</p>
        <div className="site-cta-row">
          <Link href="/contact" className="site-btn site-btn--primary">
            יצירת קשר
          </Link>
          <Link href="/" className="site-btn site-btn--ghost">
            לדף הבית
          </Link>
        </div>
      </div>
    </SiteChrome>
  );
}
