import { siteSeo } from "@/lib/seo";
import { LANDING } from "@/data/landing";

/**
 * Server-rendered SEO content block — real crawlable text with commercial
 * keywords, written naturally (not hidden spam). Placed before footer.
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
          בניית אתרים שמביאים לקוחות וחנויות דיגיטליות לעסקים בישראל
        </h2>
        <p itemProp="description">
          <strong itemProp="provider">{LANDING.brand}</strong> הוא סטודיו דיגיטלי
          לבניית <strong>אתרים מקצועיים שמביאים לקוחות ישירים</strong> — לשירותים,
          קליניקות, ייעוץ, B2B ומותגים — וכן{" "}
          <strong>חנויות אינטרנטיות</strong> ו<strong>אתרי מכירות</strong> כשצריך
          למכור מוצרים. לא חייבים חנות: רוב העסקים זקוקים לאתר שמסביר למה לבחור בכם
          וסוגר פנייה. אנחנו משלבים עיצוב יוקרתי, מבנה שממיר, בסיס{" "}
          <strong>SEO</strong>, מובייל מלא ובעלות מלאה שלכם.
        </p>
        <p>
          מחפשים <strong>בניית אתרים לעסקים</strong>,{" "}
          <strong>אתר תדמית שמביא לידים</strong>,{" "}
          <strong>דף נחיתה</strong> או <strong>בניית חנות אונליין</strong>? Aviya
          בונה את המסלול הנכון לעסק — בעברית, בישראל, ברמה גבוהה.
        </p>
        <ul className="seo-services">
          <li>
            <a href="#how">בניית אתרים וחנויות אונליין</a>
          </li>
          <li>
            <a href="#includes">עיצוב, סליקה, SEO ואוטומציות</a>
          </li>
          <li>
            <a href="#contact">יצירת קשר להקמת אתר</a>
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
        </p>
      </div>
    </section>
  );
}
