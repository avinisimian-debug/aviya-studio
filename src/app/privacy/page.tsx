import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";
import { privacyPage } from "@/data/site-content";
import { LANDING } from "@/data/landing";
import { phoneHref, publicEmail, publicPhone, whatsappHref } from "@/lib/contact-channels";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description:
    "מדיניות פרטיות של Aviya — כיצד אנו אוספים, שומרים ומשתמשים בפרטי יצירת קשר מטפסי האתר.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const email = publicEmail();
  const phone = publicPhone();
  const tel = phoneHref();
  const whatsapp = whatsappHref();

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
          <li>שם</li>
          <li>טלפון או אימייל (לפחות אחד)</li>
          <li>מה צריך, ופירוט קצר אם מולא</li>
          <li>טווח תקציב, אם מולא</li>
          <li>מקור הטופס</li>
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
          טופס הפנייה באתר נשלח במייל רק כשמוגדרים מפתח ספק המייל וכתובת
          היעד. אם הם לא מוגדרים, הטופס אומר זאת במפורש והפנייה לא נשלחת ולא
          נשמרת. אין מערכת מאובטחת ב־100% — אם נגלה דליפה, נודיע כנדרש.
        </p>

        <h2>עוגיות, אנליטיקה ופרסומות</h2>
        <p>
          האתר עשוי להשתמש ב־localStorage להעדפות נגישות (למשל: ניגודיות,
          עצירת אנימציות). בנוסף, ייתכן שימוש ב:
        </p>
        <ul>
          <li>
            <strong>Google Analytics</strong> — נטען רק אחרי אישור, ורק אם
            הוגדר מזהה מדידה. בלי אישור אין מדידה.
          </li>
          <li>
            <strong>Google AdSense</strong> — הצגת פרסומות של גוגל / שותפים
            כדי לממן חלק מעלויות האתר. גוגל עשויה להשתמש בעוגיות להצגת מודעות
            רלוונטיות יותר. ניתן לנהל העדפות ב־{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              הגדרות מודעות Google
            </a>
            .
          </li>
        </ul>
        <p>
          ספקי צד־שלישי (גוגל) עשויים לאסוף נתוני שימוש לפי המדיניות שלהם.{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            מדיניות הפרסום של Google
          </a>
          .
        </p>

        <h2>זכויותיכם</h2>
        <p>
          ניתן לבקש עיון, תיקון או מחיקת פרטים ששלחתם — בפנייה ל־{" "}
          <a href={`mailto:${email}`}>{email}</a>
          {whatsapp ? (
            <>
              {" "}
              או{" "}
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                בוואטסאפ
              </a>
            </>
          ) : null}
          .
        </p>

        <h2>יצירת קשר בנושא פרטיות</h2>
        <p>
          {email}
          {tel && phone ? (
            <>
              <br />
              <a href={tel}>טלפון {phone}</a>
            </>
          ) : null}
          {whatsapp ? (
            <>
              <br />
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                וואטסאפ
              </a>
            </>
          ) : null}
        </p>

        <p>
          ראו גם: <Link href="/accessibility">הצהרת נגישות</Link> ·{" "}
          <Link href="/contact">יצירת קשר</Link>
        </p>
      </div>
    </SiteChrome>
  );
}
