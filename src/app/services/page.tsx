import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";
import { AdUnit } from "@/components/ads/AdUnit";
import { keywordClusters } from "@/data/seo-keywords";
import { LANDING } from "@/data/landing";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "שירותי בניית אתרים וחנויות דיגיטליות בישראל",
  description:
    "שירותי Aviya: בניית אתרים לעסקים, אתר תדמית, דף נחיתה, חנות דיגיטלית, שדרוג אתר, SEO בסיסי — תל אביב, מרכז וכל הארץ. 055-557-3090",
  alternates: { canonical: "/services" },
  keywords: [
    ...keywordClusters.core,
    ...keywordClusters.shops,
    ...keywordClusters.types,
    ...keywordClusters.local,
  ],
  openGraph: {
    title: "שירותי בניית אתרים | Aviya",
    description:
      "אתרים שמביאים לקוחות · חנויות שמוכרות · דפי נחיתה · SEO בסיסי.",
    url: "/services",
  },
};

const services = [
  {
    h: "בניית אתרים לעסקים",
    p: "אתר מקצועי לעסק קטן ובינוני: מסר חד, מובייל, טפסי פנייה ווואטסאפ. מתאים לשירותים, ייעוץ, B2B ומותגים מקומיים.",
  },
  {
    h: "אתר תדמית מקצועי",
    p: "נוכחות דיגיטלית שמרגישה כמו מותג — אמון, תהליך, הוכחות, ועיצוב ברמה גבוהה. לא ״תבנית גנרית״.",
  },
  {
    h: "דף נחיתה להמרה",
    p: "עמוד אחד ממוקד לקמפיין או השקה: כותרת חדה, יתרונות, CTA ברור — לפנייה או לרכישה.",
  },
  {
    h: "בניית חנות דיגיטלית",
    p: "חנות אונליין עם סליקה, דפי מוצר, עגלה וקופה מותאמת למובייל. חוויית קנייה ברמת מותג.",
  },
  {
    h: "שדרוג ושיפוץ אתר קיים",
    p: "אתר ישן / איטי / לא ממיר? משדרגים מבנה, עיצוב ומהירות — בלי לאבד את מה שכבר עובד.",
  },
  {
    h: "SEO בסיסי בהקמה",
    p: "כותרות, מבנה, מהירות, מובייל, sitemap ו-Search Console — יסודות כדי שגוגל יבין אתכם.",
  },
] as const;

const cities = [
  "תל אביב",
  "מרכז",
  "ירושלים",
  "חיפה",
  "ראשון לציון",
  "פתח תקווה",
  "הרצליה",
  "רמת גן",
  "כל הארץ (מרחוק)",
] as const;

function ServicesJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "שירותי בניית אתרים Aviya",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.h,
        description: s.p,
        provider: {
          "@type": "Organization",
          name: "Aviya Studio",
          url: SITE_URL,
          telephone: "+972555573090",
        },
        areaServed: "IL",
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function ServicesPage() {
  return (
    <>
      <ServicesJsonLd />
      <SiteChrome title="שירותי בניית אתרים וחנויות דיגיטליות">
        <p className="site-kicker">Aviya · ישראל</p>
        <p className="site-lead">
          סטודיו לבניית אתרים שמביאים לקוחות, חנויות שמוכרות, ודפי נחיתה
          שממירים — לתל אביב, למרכז ולכל הארץ.
        </p>

        <div className="site-prose">
          <h2>מה אנחנו בונים</h2>
          {services.map((s) => (
            <section key={s.h}>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </section>
          ))}

          <AdUnit className="aviya-ad-slot--article" />

          <h2>למי זה מתאים</h2>
          <ul>
            <li>בעלי עסקי שירותים וקליניקות שרוצים פניות ישירות</li>
            <li>חנויות ומכירה אונליין</li>
            <li>מותגים שרוצים נוכחות ברמת פרימיום</li>
            <li>עסקים עם אתר ישן שלא ממיר</li>
          </ul>

          <h2>אזורים</h2>
          <p>
            עובדים מרחוק בכל הארץ. ביקוש נפוץ:{" "}
            {cities.map((c, i) => (
              <span key={c}>
                {i > 0 ? " · " : ""}
                בניית אתרים ב{c}
              </span>
            ))}
            .
          </p>

          <h2>איך מתחילים</h2>
          <p>
            משאירים שם וטלפון בטופס — חוזרים במהירות, בלי לחץ. אפשר גם{" "}
            <a href={LANDING.whatsappUrl} target="_blank" rel="noopener noreferrer">
              וואטסאפ
            </a>{" "}
            או{" "}
            <Link href="/contact">עמוד יצירת קשר</Link>.
          </p>

          <p>
            למידע נוסף:{" "}
            <Link href="/guides">מדריכים</Link> ·{" "}
            <Link href="/about">אודות</Link> ·{" "}
            <Link href="/promote">ערכת קידום לרשתות</Link>
          </p>
        </div>

        <div className="site-cta-band" style={{ marginTop: "2rem" }}>
          <p>מוגבל ל־{LANDING.monthlyCap} עסקים בחודש — רמה וזמינות.</p>
          <div className="site-cta-row">
            <Link href="/contact" className="site-btn site-btn--primary">
              רוצה שנחזור אליך?
            </Link>
            <a
              href={LANDING.whatsappUrl}
              className="site-btn site-btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              וואטסאפ
            </a>
          </div>
        </div>
      </SiteChrome>
    </>
  );
}
