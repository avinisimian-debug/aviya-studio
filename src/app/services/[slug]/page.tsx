import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { ConceptFrame } from "@/components/studio/ConceptFrame";
import { LdJson } from "@/components/studio/LdJson";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { conceptForService } from "@/data/concepts";
import { serviceDepth } from "@/data/depth";
import { SERVICES, serviceBySlug } from "@/data/studio-site";
import { pageMeta, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  const depth = service ? serviceDepth[service.slug] : null;
  if (!service || !depth) return { title: "שירות" };
  return pageMeta({
    title: service.title,
    description: depth.situation,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  const depth = service ? serviceDepth[service.slug] : null;
  if (!service || !depth) notFound();

  const others = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <SiteFrame>
      <LdJson data={serviceJsonLd(service)} />
      <header className="page-hero page-hero-dark">
        <div className="shell service-hero">
          <div className="prose">
            <Breadcrumbs
              items={[
                { name: "בית", path: "/" },
                { name: "שירותים", path: "/services" },
                { name: service.title, path: `/services/${service.slug}` },
              ]}
            />
            <h1>{service.title}</h1>
            <p>{depth.situation}</p>
            <p className="caption">{depth.typical}</p>
            <p className="hero-caption">הפריוויו ליד הוא קונספט לסוג העבודה, לא פרויקט לקוח.</p>
          </div>
          <ConceptFrame concept={conceptForService(service.slug)} heading="p" />
        </div>
      </header>
      <section className="band" aria-labelledby="includes-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">01</span>
            <span>מה נמסר</span>
          </p>
          <h2 id="includes-title">מה נכנס לעבודה</h2>
          <ol className="deliver-list">
            {depth.deliverables.map((item, index) => (
              <li key={item.title}>
                <span className="brand-latin">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="band band-muted" aria-labelledby="fit-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">02</span>
            <span>התאמה</span>
          </p>
          <h2 id="fit-title">למי זה, ולמי עדיף מבנה אחר</h2>
          <div className="two">
            <div>
              <h3>מתאים אם</h3>
              <ul>
                {depth.fits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>פחות מתאים אם</h3>
              <ul>
                {depth.unfit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="after-link">
            <Link href="/about#standards">
              עברית, מובייל, נגישות בסיסית, SEO בהשקה, עריכה והעברה
            </Link>
          </p>
          <p>
            <Link className="btn btn-primary" href="/contact">
              לבדוק התאמה
            </Link>
          </p>
        </div>
      </section>
      <section className="band" aria-labelledby="more-services">
        <div className="shell">
          <h2 id="more-services">שירותים נוספים</h2>
          <ol className="service-index">
            {others.map((item) => {
              const index = SERVICES.findIndex((entry) => entry.slug === item.slug);
              return (
                <li key={item.slug}>
                  <Link href={`/services/${item.slug}`}>
                    <span className="brand-latin">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </SiteFrame>
  );
}
