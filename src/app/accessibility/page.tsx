import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { SocialLinks } from "@/components/SocialLinks";
import { LANDING } from "@/data/landing";

export const metadata: Metadata = {
  title: "הצהרת נגישות | Aviya",
  description:
    "הצהרת נגישות אתר Aviya — בניית אתרים נגישים לפי חוק שוויון זכויות ות״י 5568 / WCAG 2.0 AA. ישראל.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/accessibility" },
  keywords: [
    "הצהרת נגישות",
    "נגישות אתרים",
    "ת״י 5568",
    "WCAG",
    "Aviya",
    "בניית אתרים נגישים",
  ],
};

const UPDATED = "4 באוגוסט 2026";

/**
 * Israeli accessibility statement (Equal Rights for Persons with Disabilities Law
 * & Internet Service Accessibility Regulations — IS 5568 / WCAG 2.0 Level AA).
 */
export default function AccessibilityPage() {
  return (
    <>
      <a href="#statement" className="skip-link">
        דלג להצהרת נגישות
      </a>

      <header className="legal-nav">
        <BrandLogo size="nav" href="/" />
        <nav aria-label="קישורים מהירים">
          <Link href="/">חזרה לדף הבית</Link>
          {" · "}
          <a href="#contact-a11y">יצירת קשר לנגישות</a>
        </nav>
      </header>

      <main id="statement" className="legal-page">
        <h1>הצהרת נגישות</h1>
        <p className="legal-meta">
          עדכון אחרון: {UPDATED}
          <br />
          סטודיו {LANDING.brand} · עיצוב | בנייה | צמיחה
        </p>

        <p>
          אנו ב־{LANDING.brand} רואים חשיבות רבה במתן שירות שוויוני, מכבד ונגיש לכל
          אדם, לרבות אנשים עם מוגבלות. אתר זה מתוכנן ומותאם בהתאם לעקרונות חוק
          שוויון זכויות לאנשים עם מוגבלות, התשנ״ח–1998, תקנות שוויון זכויות
          לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג–2013, ובהתאם לתקן
          הישראלי ת״י 5568 המבוסס על הנחיות{" "}
          <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.0 ברמת
          AA.
        </p>

        <h2>רמת הנגישות שאליה אנו שואפים</h2>
        <p>
          האתר שואף לעמוד בדרישות רמת AA של WCAG 2.0 (ת״י 5568). אנו ממשיכים
          לבדוק, לתקן ולשפר את הנגישות באופן שוטף. אם נתקלתם בחסם — נשמח שתפנו
          אלינו ונפעל לתקן בהקדם.
        </p>

        <h2>התאמות נגישות באתר</h2>
        <ul>
          <li>שפת ממשק עברית וכיוון RTL כברירת מחדל.</li>
          <li>מבנה סמנטי: כותרות, אזורים, קישורי דילוג לתוכן העיקרי.</li>
          <li>ניווט במקלדת והדגשת מיקוד (focus) ברורה.</li>
          <li>תוויות לשדות טופס והודעות שגיאה/הצלחה לקוראי מסך.</li>
          <li>תמיכה בהגדלת טקסט ושינוי גודל בעזרת הדפדפן (זום).</li>
          <li>
            תפריט התאמות נגישות (כפתור ״נגישות״ בפינת המסך): הגדלת טקסט,
            ניגודיות גבוהה, הדגשת קישורים, גופן קריא, עצירת אנימציות, הדגשת
            מיקוד.
          </li>
          <li>כיבוד העדפת מערכת ״הפחתת תנועה״ (prefers-reduced-motion).</li>
          <li>ניגודיות צבעים מכוונת, עם אפשרות לניגודיות מוגברת.</li>
          <li>תיאורי תמונות (alt) במקום שבו התמונה משמעותית לתוכן.</li>
        </ul>

        <h2>תאימות והפעלה מומלצת</h2>
        <p>
          האתר נבדק לשימוש בדפדפנים נפוצים (Chrome, Edge, Firefox, Safari)
          במחשב ובמובייל. מומלץ להשתמש בגרסאות עדכניות של דפדפן ומערכת הפעלה.
          טכנולוגיות מסייעות נפוצות (כגון NVDA, JAWS, VoiceOver) נתמכות ככל
          הניתן.
        </p>

        <h2>מגבלות ידועות</h2>
        <p>
          ייתכן שחלקים באתר (תכנים מוטמעים מצד שלישי, קישורים חיצוניים כמו
          WhatsApp או Instagram, או מדיה חדשה) לא יהיו נגישים במלואם בכל
          הרגעים. אנו פועלים לצמצם פערים אלה. אם גיליתם רכיב שאינו נגיש — אנא
          דווחו ונטפל.
        </p>

        <h2 id="contact-a11y">רכז/ת נגישות ודיווח על בעיות</h2>
        <p>
          לפניות, בקשות להתאמה סבירה, דיווח על תקלת נגישות או הצעות לשיפור:
        </p>
        <ul>
          <li>
            דוא״ל:{" "}
            <a href={LANDING.emailUrl}>{LANDING.email}</a>
          </li>
          <li>
            טלפון / WhatsApp:{" "}
            <a href={LANDING.whatsappUrl} target="_blank" rel="noopener noreferrer">
              055-557-3090
            </a>
          </li>
          <li>
            Instagram:{" "}
            <a href={LANDING.instagram} target="_blank" rel="noopener noreferrer">
              {LANDING.instagramHandle}
            </a>
          </li>
        </ul>
        <div style={{ marginTop: "1.25rem" }}>
          <SocialLinks />
        </div>
        <p>
          נשתדל להשיב לפניות בנושא נגישות בהקדם האפשרי, ובכל מקרה במסגרת זמנים
          סבירים לטיפול בפנייה.
        </p>

        <h2>הגשת תלונה</h2>
        <p>
          אם לא קיבלתם מענה מספק, ניתן לפנות לנציבות שוויון זכויות לאנשים עם
          מוגבלות במשרד המשפטים:
        </p>
        <ul>
          <li>
            אתר:{" "}
            <a
              href="https://www.gov.il/he/departments/ministry_of_justice_equal_rights_of_persons_with_disabilities/govil-landing-page"
              target="_blank"
              rel="noopener noreferrer"
            >
              נציבות שוויון זכויות לאנשים עם מוגבלות
            </a>
          </li>
          <li>טלפון מוקד: *6763 / 02-5089800 (ייתכנו שינויים — בדקו באתר הרשמי)</li>
        </ul>

        <h2>הצהרה</h2>
        <p>
          הצהרה זו מתארת את מצב הנגישות באתר נכון למועד העדכון לעיל. האתר
          בפיתוח ובתחזוקה שוטפת; ייתכנו רכיבים בשיפור. אין בהצהרה זו כדי לגרוע
          מהוראות הדין, והיא אינה מהווה ייעוץ משפטי.
        </p>

        <p style={{ marginTop: "2.5rem" }}>
          <Link href="/">← חזרה לדף הבית</Link>
        </p>
      </main>

      <footer className="footer">
        <p>
          <Link href="/">דף הבית</Link>
          {" · "}
          <Link href="/accessibility" aria-current="page">
            הצהרת נגישות
          </Link>
        </p>
        <p>
          © {new Date().getFullYear()} {LANDING.brand}
        </p>
      </footer>
    </>
  );
}
