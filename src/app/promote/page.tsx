import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";
import {
  facebookShareUrl,
  linkedInShareUrl,
  socialPosts,
  twitterShareUrl,
  whatsappShareUrl,
  youtubeVideos,
} from "@/data/social-kit";
import { socialHashtagsLine } from "@/data/seo-keywords";
import { LANDING } from "@/data/landing";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "קידום ברשתות וביוטיוב — ערכת צמיחה",
  description:
    "טקסטים מוכנים לאינסטגרם, פייסבוק, לינקדאין, טיקטוק ויוטיוב + האשטגים — לקידום Aviya ובניית אתרים שמביאים לקוחות.",
  alternates: { canonical: "/promote" },
  keywords: [
    "קידום באינסטגרם",
    "קידום ביוטיוב",
    "שיווק דיגיטלי",
    "האשטגים בניית אתרים",
    "Aviya",
  ],
  openGraph: {
    title: "ערכת צמיחה לרשתות | Aviya",
    description: "פוסטים, האשטגים ותסריטי יוטיוב מוכנים להעתקה.",
    url: "/promote",
  },
};

/**
 * Growth kit: copy-paste content for social + YouTube.
 * Owner uses this to appear more places; site SEO does the rest.
 */
export default function PromotePage() {
  return (
    <SiteChrome title="צמיחה: גוגל · רשתות · יוטיוב">
      <p className="site-kicker">ערכת קידום מוכנה</p>
      <p className="site-lead">
        בלי דומיין גם אפשר להתקדם: מפרסמים את קישור ה־Vercel / האתר בכל מקום —
        וממלאים את הערוצים שלכם בתוכן מוכן. כשתחברו דומיין — הכוח רק יגדל.
      </p>

      <div className="site-prose">
        <h2>הקישור שלכם לשתף עכשיו</h2>
        <p dir="ltr" style={{ fontWeight: 700, wordBreak: "break-all" }}>
          {SITE_URL}
        </p>
        <p>
          שימו בביו באינסטגרם, בתיאור יוטיוב, בסטטוס וואטסאפ, ובדף פייסבוק.
        </p>

        <div className="share-row">
          <a
            href={whatsappShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="site-btn site-btn--primary"
          >
            שיתוף בוואטסאפ
          </a>
          <a
            href={facebookShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="site-btn site-btn--ghost"
            style={{ color: "#3d2a78", borderColor: "rgba(61,42,120,0.25)" }}
          >
            פייסבוק
          </a>
          <a
            href={linkedInShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="site-btn site-btn--ghost"
            style={{ color: "#3d2a78", borderColor: "rgba(61,42,120,0.25)" }}
          >
            לינקדאין
          </a>
          <a
            href={twitterShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="site-btn site-btn--ghost"
            style={{ color: "#3d2a78", borderColor: "rgba(61,42,120,0.25)" }}
          >
            X / טוויטר
          </a>
        </div>

        <h2>האשטגים (העתיקו לפוסט)</h2>
        <pre className="copy-block" dir="ltr">
          {socialHashtagsLine}
        </pre>

        <h2>פוסטים מוכנים לרשתות</h2>
        {socialPosts.map((p) => (
          <div key={p.title} className="copy-card">
            <h3>
              {p.title}{" "}
              <span className="copy-platform">· {p.platform}</span>
            </h3>
            <pre className="copy-block">{p.caption}</pre>
          </div>
        ))}

        <h2>יוטיוב — כותרות, תיאורים, תגיות ותסריטים</h2>
        <p>
          פתחו ערוץ YouTube (חינם) עם אותו מיתוג Aviya. העלו 1–2 סרטונים
          קצרים בשבוע. הכותרת והתיאור למטה מוכנים להדבקה.
        </p>
        {youtubeVideos.map((v) => (
          <div key={v.id} className="copy-card">
            <h3>{v.title}</h3>
            <p>
              <strong>תיאור ליוטיוב:</strong>
            </p>
            <pre className="copy-block">{v.description}</pre>
            <p>
              <strong>תגיות (Tags):</strong>
            </p>
            <pre className="copy-block" dir="rtl">
              {v.tags.join(", ")}
            </pre>
            <p>
              <strong>תסריט קצר (מה לדבר למצלמה):</strong>
            </p>
            <ol>
              {v.script.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>
        ))}

        <h2>איך מגיעים ליותר פניות — בסדר נכון</h2>
        <ol>
          <li>
            שימו את קישור האתר בכל פרופיל (אינסטגרם, טיקטוק, פייסבוק, יוטיוב,
            וואטסאפ Business).
          </li>
          <li>פרסמו 3–5 פוסטים בשבוע מהטקסטים למעלה.</li>
          <li>העלו לפחות 3 סרטוני יוטיוב ראשונים מהרשימה.</li>
          <li>
            בגוגל: Search Console — הוסיפו את הכתובת ושלחו{" "}
            <Link href="/sitemap.xml">sitemap.xml</Link>.
          </li>
          <li>
            כשתקנו דומיין — חברו ב־Vercel ושנו{" "}
            <code>NEXT_PUBLIC_SITE_URL</code> — הדירוגים יעברו חזק יותר.
          </li>
        </ol>

        <h2>ממה נמנעים (חשוב)</h2>
        <p>
          לא דוחפים מילות מפתח לא קשורות (למשל חיפושי רכב / רפואה / הימורים).
          גוגל מעניש על זה — ותאבדו פניות לטווח ארוך. אנחנו כובשים{" "}
          <strong>את כל מה שקשור לבניית אתרים, חנויות והמרות</strong> — שם
          הלקוחות שלכם באמת מחפשים.
        </p>

        <p>
          צריכים עזרה לבנות את האתר ללקוח?{" "}
          <Link href="/contact">יצירת קשר</Link> ·{" "}
          <a href={LANDING.whatsappUrl} target="_blank" rel="noopener noreferrer">
            וואטסאפ
          </a>
        </p>
      </div>
    </SiteChrome>
  );
}
