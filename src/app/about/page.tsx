import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";
import { aboutPage } from "@/data/site-content";
import { LANDING } from "@/data/landing";

export const metadata: Metadata = {
  title: "אודות אביה",
  description:
    "אביה — בן 17, יותר משנה בבניית אתרים, מאות עסקים. סטודיו Aviya: אתרים וחנויות שמביאים לקוחות, יחס אישי, בעלות מלאה.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "שלום, אני אביה | Aviya",
    description: aboutPage.lead,
    url: "/about",
    images: [{ url: aboutPage.photo, alt: aboutPage.photoAlt }],
  },
};

export const revalidate = 0;

export default function AboutPage() {
  return (
    <SiteChrome title={aboutPage.title}>
      <p className="site-kicker">{aboutPage.kicker}</p>
      <p className="site-lead">{aboutPage.lead}</p>

      <figure className="site-founder">
        <Image
          src={aboutPage.photo}
          alt={aboutPage.photoAlt}
          width={720}
          height={900}
          unoptimized
          className="site-founder-img"
          priority
        />
        <figcaption>
          <strong>{aboutPage.name}</strong>
          <span>{aboutPage.role}</span>
        </figcaption>
      </figure>

      <div className="site-prose">
        {aboutPage.story.map((p) => (
          <p key={p.slice(0, 28)}>{p}</p>
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
          רוצים להרגיש בנוח לפני שמתחילים? כתבו בוואטסאפ — זה מגיע אליי, אביה.
          מוגבל ל־{LANDING.monthlyCap} עסקים בחודש כדי לשמור על יחס ורמה.
        </p>
        <div className="site-cta-row">
          <Link href="/contact" className="site-btn site-btn--primary">
            השארת פרטים
          </Link>
          <a
            href={LANDING.whatsappUrl}
            className="site-btn site-btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            וואטסאפ ישיר
          </a>
        </div>
      </div>
    </SiteChrome>
  );
}
