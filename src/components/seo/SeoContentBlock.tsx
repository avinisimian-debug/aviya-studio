import { siteSeo } from "@/lib/seo";
import { LANDING } from "@/data/landing";

/**
 * Server-rendered SEO content — crawlable brand + service text (not hidden).
 * Helps brand queries: Aviya / אביה / בניית אתרים Aviya
 */
export function SeoContentBlock() {
  return (
    <section
      className="seo-block"
      aria-labelledby="seo-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="sales-shell seo-block-inner">
        <h2 id="seo-heading" itemProp="name">
          Aviya (אביה) — בניית אתרים וחנויות דיגיטליות בישראל
        </h2>
        <p itemProp="description">
          <strong itemProp="provider">{LANDING.brand}</strong> (בעברית:{" "}
          <strong>אביה</strong> / <strong>אביה סטודיו</strong>) הוא סטודיו דיגיטלי
          ל<strong>בניית אתרים</strong> שמביאים לקוחות ישירים — לשירותים,
          קליניקות, ייעוץ, B2B ומותגים — וכן ל<strong>חנויות אינטרנטיות</strong>{" "}
          ו<strong>אתרי מכירות</strong> כשצריך למכור מוצרים. אם חיפשת בגוגל{" "}
          <strong>בניית אתרים Aviya</strong>, <strong>Aviya studio</strong> או{" "}
          <strong>אביה בניית אתרים</strong> — הגעת למקום הנכון.
        </p>
        <p>
          אנחנו משלבים עיצוב יוקרתי, מבנה שממיר, בסיס <strong>SEO</strong>, מובייל
          מלא ובעלות מלאה שלכם על האתר. מחפשים{" "}
          <strong>דף נחיתה מקצועי</strong>, <strong>אתר One Page</strong>,{" "}
          <strong>אתר תדמית לעסק</strong>, <strong>שדרוג אתר קיים</strong> או{" "}
          <strong>בניית חנות אונליין</strong>? Aviya בונה את המסלול הנכון לעסק —
          בעברית, בישראל, ברמה גבוהה. בהקמה נכללים בין היתר: התאמה לכל המסכים,
          טופס ווואטסאפ, SEO בסיסי, Analytics, Search Console, ביצועים ואבטחה.
        </p>
        <ul className="seo-services">
          <li>
            <a href="#services">דף נחיתה · One Page · אתר תדמית · חנות</a>
          </li>
          <li>
            <a href="#includes">מה כוללת הקמת אתר (SEO, Analytics, מובייל)</a>
          </li>
          <li>
            <a href="#care">תחזוקה וליווי אחרי השקה</a>
          </li>
          <li>
            <a href="#contact">יצירת קשר — אביה סטודיו</a>
          </li>
          <li>
            <a href="/accessibility">נגישות אתרים (ת״י 5568)</a>
          </li>
        </ul>
        <p className="seo-contact-line">
          טלפון / וואטסאפ:{" "}
          <a href={LANDING.whatsappUrl} dir="ltr">
            055-557-3090
          </a>
          {" · "}
          אימייל:{" "}
          <a href={LANDING.emailUrl}>{siteSeo.email}</a>
          {" · "}
          אינסטגרם:{" "}
          <a
            href={LANDING.instagram}
            target="_blank"
            rel="noopener noreferrer me"
          >
            {LANDING.instagramHandle}
          </a>
          {" · "}
          אתר:{" "}
          <a href={siteSeo.url} dir="ltr">
            {siteSeo.url.replace(/^https?:\/\//, "")}
          </a>
        </p>
      </div>
    </section>
  );
}
