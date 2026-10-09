import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { SERVICES } from "@/data/studio-site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "שירותים — אתרי תדמית, דפי נחיתה וחנויות",
  description:
    "מה אפשר לבנות עם Aviya: דף נחיתה, אתר One Page, אתר תדמית, אתר מורחב, שדרוג אתר קיים, וחנות דיגיטלית.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteFrame>
      <header className="page-hero page-hero-dark">
        <div className="shell">
          <Breadcrumbs
            items={[
              { name: "בית", path: "/" },
              { name: "שירותים", path: "/services" },
            ]}
          />
          <h1>מה אפשר לבנות</h1>
          <p>
            שישה מבנים, לפי המטרה של העסק. בכל הקמה: מובייל, מסלול פנייה, ובסיס
            SEO. חנות כוללת תהליך רכישה לפי ההיקף שסוכם. המחיר נקבע אחרי שיחה,
            לא מתפריט מומצא.
          </p>
        </div>
      </header>
      <section className="band" aria-labelledby="service-list">
        <div className="shell">
          <h2 id="service-list" className="sr-only">
            רשימת השירותים
          </h2>
          <ol className="service-index">
            {SERVICES.map((service, index) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  <span className="brand-latin">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteFrame>
  );
}
