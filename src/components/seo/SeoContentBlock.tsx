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
          בניית אתרים, חנויות אינטרנטיות ואתרי תדמית לעסקים בישראל
        </h2>
        <p itemProp="description">
          <strong itemProp="provider">{LANDING.brand}</strong> הוא סטודיו דיגיטלי
          המתמחה ב<strong>בניית אתרים מקצועיים</strong>,{" "}
          <strong>עיצוב אתרים</strong> ו<strong>הקמת חנויות דיגיטליות</strong>{" "}
          לעסקים, חנויות פיזיות ומותגים מקומיים. אנחנו בונים{" "}
          <strong>חנות אינטרנטית</strong> ו<strong>אתר מכירות</strong> עם סליקה,
          מבנה שממיר לידים, ונראות ברמה של מותג — כולל בסיס ל
          <strong>קידום אורגני בגוגל (SEO)</strong>,{" "}
          <strong>אתר רספונסיבי</strong> למובייל, ובעלות מלאה שלך.
        </p>
        <p>
          מחפשים <strong>בניית אתרים לעסקים</strong>,{" "}
          <strong>בניית חנות אונליין</strong>, <strong>אתר תדמית</strong> או{" "}
          <strong>דף נחיתה</strong> שמביא פניות? הסטודיו של Aviya משלב עיצוב
          יוקרתי, אסטרטגיית המרה וליווי עד שהאתר באוויר — בישראל, בעברית, ברמה
          גבוהה.
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
