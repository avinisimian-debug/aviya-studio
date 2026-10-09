import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome, SiteCtaBand } from "@/components/site/SiteChrome";
import { getAllGuideSlugs, getGuide, guides } from "@/data/guides";
import { brandVoice } from "@/data/site-content";
import { whatsappHref } from "@/lib/contact-channels";
import { SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "מדריך" };

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: `${guide.title} | Aviya`,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      type: "article",
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      locale: "he_IL",
    },
  };
}

function ArticleJsonLd({
  slug,
  title,
  description,
  datePublished,
  dateModified,
}: {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified,
    inLanguage: "he-IL",
    author: {
      "@type": "Organization",
      name: "Aviya Studio",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Aviya Studio",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/guides/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const others = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <ArticleJsonLd
        slug={guide.slug}
        title={guide.title}
        description={guide.description}
        datePublished={guide.datePublished}
        dateModified={guide.dateModified}
      />
      <SiteChrome title={guide.title}>
        <p className="site-kicker">
          {guide.kicker} · עדכון {guide.dateModified}
        </p>
        <p className="site-lead">{guide.description}</p>

        <article className="site-prose">
          {guide.sections.map((section) => (
            <section key={section.h}>
              <h2>{section.h}</h2>
              {section.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}

          <h2>רוצים שנבנה את זה בשבילכם?</h2>
          <p>
            {brandVoice.valueLine} <Link href="/contact">{brandVoice.ctaNav}</Link>
            {whatsappHref() ? (
              <>
                {" "}
                או{" "}
                <a href={whatsappHref()!} target="_blank" rel="noopener noreferrer">
                  וואטסאפ
                </a>
              </>
            ) : null}
            .
          </p>
        </article>

        {others.length > 0 ? (
          <aside className="related-guides" aria-label="מדריכים נוספים">
            <h2 className="related-guides-title">מדריכים נוספים</h2>
            <ul>
              {others.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                </li>
              ))}
            </ul>
            <p>
              <Link href="/guides">כל המדריכים ←</Link>
            </p>
          </aside>
        ) : null}

        <SiteCtaBand
          note={brandVoice.audienceLine}
        />
      </SiteChrome>
    </>
  );
}
