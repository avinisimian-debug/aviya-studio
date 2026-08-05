import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";
import { aboutPage } from "@/data/site-content";
import { LANDING } from "@/data/landing";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "אודות Aviya (אביה) — סטודיו לבניית אתרים וחנויות דיגיטליות בישראל. עיצוב המרה, בעלות מלאה, עד 8 עסקים בחודש.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "אודות Aviya | אביה סטודיו",
    description: aboutPage.lead,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <SiteChrome title={aboutPage.title}>
      <p className="site-kicker">{aboutPage.kicker}</p>
      <p className="site-lead">{aboutPage.lead}</p>

      <div className="site-prose">
        {aboutPage.story.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <ul className="site-pillars">
        {aboutPage.pillars.map((item) => (
          <li key={item.t}>
            <h2>{item.t}</h2>
            <p>{item.d}</p>
          </li>
        ))}
      </ul>

      <div className="site-cta-band">
        <p>
          מוגבל ל־{LANDING.monthlyCap} עסקים בחודש — כדי לשמור על רמה וזמינות.
        </p>
        <div className="site-cta-row">
          <Link href="/contact" className="site-btn site-btn--primary">
            יצירת קשר
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
  );
}
