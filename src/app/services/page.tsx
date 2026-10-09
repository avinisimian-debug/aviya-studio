import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { serviceDepth } from "@/data/depth";
import { SERVICES } from "@/data/studio-site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "שירותים — אתרי תדמית, דפי נחיתה וחנויות",
  description:
    "שישה מבנים: דף נחיתה, אתר One Page, אתר תדמית, הרחבה, שדרוג אתר קיים, וחנות. לכל אחד טווח טיפוסי, מה נמסר, ולמי זה מתאים.",
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
          <p className="marker">
            <span className="brand-latin">06</span>
            <span>מבנים</span>
          </p>
          <h1>מה אפשר לבנות</h1>
          <p>
            כל הקמה כוללת עברית מימין לשמאל, מובייל, טופס, בסיס לגוגל, HTTPS,
            שני סבבי תיקונים והדרכה. חנות מוסיפה קטלוג ותהליך רכישה. המחיר
            והטווח המדויק יוצאים בהצעה כתובה, לא בעמוד.
          </p>
        </div>
      </header>
      <section className="band" aria-labelledby="service-list">
        <div className="shell">
          <h2 id="service-list" className="sr-only">
            רשימת השירותים
          </h2>
          <ol className="service-index">
            {SERVICES.map((service, index) => {
              const depth = serviceDepth[service.slug];
              return (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`}>
                    <span className="brand-latin">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <h3>{service.title}</h3>
                      <p>
                        {service.summary}
                        {depth ? <span className="index-note">{depth.typical}</span> : null}
                      </p>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <p className="after-link">
            <Link href="/about#standards">הסטנדרט המשותף: שפה, ביצועים, נגישות, SEO והעברה</Link>
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
