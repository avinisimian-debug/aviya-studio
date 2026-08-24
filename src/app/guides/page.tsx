import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome, SiteCtaBand } from "@/components/site/SiteChrome";
import { AdUnit } from "@/components/ads/AdUnit";
import { guides } from "@/data/guides";
import { brandVoice } from "@/data/site-content";

export const metadata: Metadata = {
  title: "מדריכים לבניית אתרים וחנויות דיגיטליות",
  description:
    "מדריכים בעברית מאת Aviya: אתר לעסק, דף נחיתה, חנות דיגיטלית, SEO בסיסי — ידע מעשי לבעלי עסקים בישראל.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "מדריכים | Aviya סטודיו",
    description:
      "ספריית מדריכים: אתר מקצועי, חנות אונליין, דף נחיתה וקידום בגוגל.",
    url: "/guides",
  },
};

export default function GuidesHubPage() {
  return (
    <SiteChrome title="מדריכים לבעלי עסקים">
      <p className="site-kicker">ידע · Aviya</p>
      <p className="site-lead">
        מאמרים קצרים וברורים — כדי להבין מה עובד אונליין, ומה רק ״נראה בסדר״.
      </p>

      <ul className="guides-grid">
        {guides.map((g) => (
          <li key={g.slug}>
            <article className="guide-card">
              <p className="guide-card-kicker">{g.kicker}</p>
              <h2>
                <Link href={`/guides/${g.slug}`}>{g.title}</Link>
              </h2>
              <p>{g.description}</p>
              <Link href={`/guides/${g.slug}`} className="guide-card-link">
                לקריאת המדריך ←
              </Link>
            </article>
          </li>
        ))}
      </ul>

      <AdUnit className="aviya-ad-slot--article" />

      <SiteCtaBand
        note={`רוצים אתר או חנות מותאמים לעסק — לא רק מאמר? ${brandVoice.valueLine}`}
      />
    </SiteChrome>
  );
}
