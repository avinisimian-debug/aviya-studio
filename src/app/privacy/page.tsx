import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";
import { privacyPage } from "@/data/site-content";
import { LANDING } from "@/data/landing";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description:
    "מדיניות פרטיות של Aviya — כיצד אנו אוספים, שומרים ומשתמשים בפרטי יצירת קשר מטפסי האתר.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <SiteChrome title={privacyPage.title}>
      <p className="legal-meta">עדכון אחרון: {privacyPage.updated}</p>

      <div className="site-prose legal-like">
        <h2>כללי</h2>
        <p>
          מדיניות זו מסבירה כיצד סטודיו {LANDING.brand} (&quot;אנחנו&quot;)
          מטפלים במידע אישי שנמסר דרך האתר — בעיקר דרך טפסי יצירת קשר.
        </p>

        <h2>איזה מידע נאסף</h2>
        <ul>
          <li>שם מלא</li>
          <li>מספר טלפון</li>
          <li>שם עסק (אם מולא)</li>
          <li>מקור הטופס (למשל: הירו / סוף הדף / עמוד יצירת קשר)</li>
          <li>זמן השליחה</li>
        </ul>
        <p>
          איננו מבקשים מספר כרטיס אשראי באתר זה. איננו אוספים במודע מידע על
          קטינים מתחת לגיל 16.
        </p>

        <h2>למה אנחנו משתמשים במידע</h2>
        <ul>
          <li>לחזור אליכם בנוגע לבקשת הצעה / פרויקט</li>
          <li>להבין את סוג העסק והצורך</li>
          <li>לנהל פניות עסקיות בצורה מסודרת</li>
        </ul>
        <p>
          איננו מוכרים רשימות לידים לצדדים שלישיים. לא נשלח דיוור שיווקי
          מסיבי בלי בקשה מפורשת שלכם.
        </p>

        <h2>שמירה ואבטחה</h2>
        <p>
          הפניות נשמרות באופן מאובטח ככל הניתן בסביבת האחסון של האתר. גישה
          לתיבת הפניות מוגנת בסיסמה. מומלץ להגדיר סיסמה חזקה במשתנה סביבה
          של השרת. אין מערכת מאובטחת ב־100% — אם נגלה דליפה, נודיע כנדרש.
        </p>

        <h2>עוגיות ולוקאל סטורג׳</h2>
        <p>
          האתר עשוי להשתמש ב־localStorage להעדפות נגישות (למשל: ניגודיות,
          עצירת אנימציות). אלו אינן משמשות לפרסום צד־שלישי באתר זה. אם
          יתווסף בעתיד כלי אנליטיקה — נעדכן מדיניות זו.
        </p>

        <h2>זכויותיכם</h2>
        <p>
          ניתן לבקש עיון, תיקון או מחיקת פרטים ששלחתם — בפנייה ל
          <a href={LANDING.emailUrl}> {LANDING.email}</a> או
          <a href={LANDING.whatsappUrl} target="_blank" rel="noopener noreferrer">
            {" "}
            בוואטסאפ
          </a>
          .
        </p>

        <h2>יצירת קשר בנושא פרטיות</h2>
        <p>
          {LANDING.email}
          <br />
          טלפון / וואטסאפ: 055-557-3090
        </p>

        <p>
          ראו גם: <Link href="/accessibility">הצהרת נגישות</Link> ·{" "}
          <Link href="/contact">יצירת קשר</Link>
        </p>
      </div>
    </SiteChrome>
  );
}
