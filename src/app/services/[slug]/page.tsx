import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { LdJson } from "@/components/studio/LdJson";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { SERVICES, serviceBySlug } from "@/data/studio-site";
import { pageMeta, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return { title: "שירות" };
  return pageMeta({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const others = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <SiteFrame>
      <LdJson data={serviceJsonLd(service)} />
      <header className="page-hero">
        <div className="shell prose">
          <Breadcrumbs
            items={[
              { name: "בית", path: "/" },
              { name: "שירותים", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ]}
          />
          <h1>{service.title}</h1>
          <p>{service.body}</p>
        </div>
      </header>
      <section className="band" aria-labelledby="includes-title">
        <div className="shell prose">
          <h2 id="includes-title">מה נכנס</h2>
          <ul className="includes">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <Link className="btn btn-primary" href="/contact">
              לבדוק התאמה
            </Link>
          </p>
        </div>
      </section>
      <section className="band band-muted" aria-labelledby="more-services">
        <div className="shell">
          <h2 id="more-services">שירותים נוספים</h2>
          <ul className="card-grid">
            {others.map((item) => (
              <li key={item.slug}>
                <Link className="text-card" href={`/services/${item.slug}`}>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteFrame>
  );
}
