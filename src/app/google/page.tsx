import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";
import { SITE_URL } from "@/lib/seo";
import { INDEXNOW_KEY } from "@/lib/indexnow";

export const metadata: Metadata = {
  title: "הופעה בגוגל — אינדקס מהיר",
  description:
    "מדריך בעלים: איך להכניס את אתר Aviya לגוגל Search Console ולבקש אינדוקס.",
  alternates: { canonical: "/google" },
  robots: { index: false, follow: false },
};

/**
 * Owner-facing checklist — Google does not rank new sites #1 until
 * indexed + authority grows. This page drives the only action that
 * actually starts discovery: Search Console.
 */
export default function GoogleIndexPage() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  const gsc = "https://search.google.com/search-console";
  const bing = "https://www.bing.com/webmasters";
  const inspectHome = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(SITE_URL)}&id=${encodeURIComponent(SITE_URL)}`;

  return (
    <SiteChrome title="למה האתר עדיין לא ראשון בגוגל — ומה עושים">
      <p className="site-kicker">חשוב לקרוא</p>
      <p className="site-lead">
        אין כפתור בקוד שמכניס את האתר לתוצאה הראשונה בחיפוש «בניית אתרים».
        גוגל מדרג לפי אמון, תוכן, קישורים וזמן. מה שאפשר לעשות עכשיו: שגוגל
        <strong> יודע שהאתר קיים</strong> ויאנדקס אותו — וזה מתחיל ב־Search
        Console (5–10 דקות, פעם אחת).
      </p>

      <div className="site-prose">
        <h2>1. מה האמת כרגע</h2>
        <ul>
          <li>
            אתר חדש על כתובת Vercel בדרך כלל <strong>לא מופיע</strong> בחיפושים
            תחרותיים עד שגוגל מאנדקס ומקבל סיגנלים.
          </li>
          <li>
            מילות חיפוש כלליות («בניית אתרים») נשלטות ע״י אתרים ותיקים — #1 לא
            מגיע מיום הקמה.
          </li>
          <li>
            מילות מותג («Aviya», «אביה סטודיו», «studio.aviya1») אמורות להופיע{" "}
            <strong>ראשונות או קרוב</strong> אחרי אינדוקס — בדקו אחרי השלבים
            למטה.
          </li>
        </ul>

        <h2>2. Search Console — חובה (גוגל)</h2>
        <ol>
          <li>
            היכנסו ל־
            <a href={gsc} target="_blank" rel="noopener noreferrer">
              Google Search Console
            </a>{" "}
            עם חשבון Gmail שלכם.
          </li>
          <li>
            לחצו «הוספת נכס» → בחרו <strong>קידומת URL</strong> (לא Domain —
            אין לכם DNS של vercel.app).
          </li>
          <li>
            הדביקו בדיוק:
            <br />
            <code dir="ltr" className="copy-block">
              {SITE_URL}
            </code>
          </li>
          <li>
            אימות — שיטה «תג HTML»:
            <br />
            גוגל ייתן מחרוזת כמו{" "}
            <code dir="ltr">googleXXXXXXXX</code>.
            <br />
            ב־Vercel → Project → Settings → Environment Variables הוסיפו:
            <br />
            <code dir="ltr" className="copy-block">
              NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=הקוד_שקיבלתם
            </code>
            <br />
            Redeploy, ואז «אימות» ב־Search Console.
            <br />
            <em>
              חלופה: הורידו קובץ HTML מגוגל ושימו אותו בתיקיית{" "}
              <code>public/</code> (אפשר לבקש ממני להוסיף אותו).
            </em>
          </li>
          <li>
            אחרי אימות → תפריט <strong>Sitemaps</strong> → הדביקו:
            <br />
            <code dir="ltr" className="copy-block">
              {sitemapUrl}
            </code>
            (או רק <code dir="ltr">sitemap.xml</code>)
          </li>
          <li>
            <strong>בדיקת URL</strong> → הזינו את כתובת הבית → «בקשת
            אינדוקס» / Request indexing. חזרו על זה ל־
            <Link href="/services">/services</Link> ו־
            <Link href="/guides">/guides</Link>.
          </li>
        </ol>

        <p>
          <a
            className="site-cta-link"
            href={inspectHome}
            target="_blank"
            rel="noopener noreferrer"
          >
            פתיחת Search Console
          </a>
        </p>

        <h2>3. Bing (מהיר יותר לפעמים)</h2>
        <ol>
          <li>
            <a href={bing} target="_blank" rel="noopener noreferrer">
              Bing Webmaster Tools
            </a>{" "}
            → Add site → אותה כתובת.
          </li>
          <li>הגישו את אותו sitemap.</li>
          <li>
            האתר כבר שולח IndexNow אוטומטית (מפתח:{" "}
            <code dir="ltr">{INDEXNOW_KEY}</code>). אחרי כל דיפלוי אפשר ללחוץ:
            <br />
            <a
              href={`${SITE_URL}/api/indexnow`}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
            >
              {SITE_URL}/api/indexnow
            </a>
          </li>
        </ol>

        <h2>4. איך לבדוק אם גוגל רואה אתכם</h2>
        <p>בשורת החיפוש של גוגל (אחרי 1–14 יום):</p>
        <code dir="ltr" className="copy-block">
          site:studio-seven-beta-89.vercel.app
        </code>
        <p>
          אם מופיעים עמודים — האתר <strong>באינדקס</strong>. אז חפשו מותג:
        </p>
        <ul>
          <li dir="ltr">Aviya studio</li>
          <li>אביה סטודיו</li>
          <li>אביה בניית אתרים</li>
          <li dir="ltr">studio.aviya1</li>
        </ul>

        <h2>5. מה מזרז הופעה (בלי מודעות)</h2>
        <ul>
          <li>
            שתפו את הקישור באינסטגרם, WhatsApp, YouTube —{" "}
            <Link href="/promote">/promote</Link>
          </li>
          <li>גוגל ביזנס / פרופיל עסק בגוגל (Google Business) אם יש כתובת</li>
          <li>דומיין אישי מאוחר יותר מחזק אמון מול .vercel.app</li>
          <li>מדריכים כבר באתר — גוגל אוהב תוכן ענייני</li>
        </ul>

        <h2>6. מתי לצפות למה</h2>
        <ul>
          <li>
            <strong>1–14 יום:</strong> דף הבית באינדקס (אחרי Request indexing)
          </li>
          <li>
            <strong>2–6 שבועות:</strong> מדריכים ושירותים מתחילים להופיע בחיפושי
            זנב ארוך
          </li>
          <li>
            <strong>חודשים:</strong> תחרות על מילות כלליות — דורשת קישורים
            ותוכן מתמשך, לא «תיקון בקוד»
          </li>
        </ul>

        <p>
          סיכום: האתר <strong>כבר מוכן טכנית</strong> (robots, sitemap, SEO,
          מדריכים). הצעד החסר הוא <strong>חשבון Google שלכם + Search
          Console</strong> — בלי זה גוגל כמעט לא «יודע» לקדם אתכם.
        </p>

        <p>
          <Link href="/">← חזרה לבית</Link>
          {" · "}
          <Link href="/promote">ערכת קידום</Link>
          {" · "}
          <Link href="/services">שירותים</Link>
        </p>
      </div>
    </SiteChrome>
  );
}
