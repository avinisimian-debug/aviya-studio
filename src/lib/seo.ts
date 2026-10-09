import type { Metadata } from "next";
import { SERVICES, brand } from "@/data/studio-site";
import { gscVerification, publicEmail, publicPhone } from "@/lib/contact-channels";

/**
 * Canonical production URL.
 * Set NEXT_PUBLIC_SITE_URL after the real domain is live.
 * Order: explicit env, Vercel production host, Vercel deployment host, known alias.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) {
    const host = vercelProd.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}`;
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}`;
  }

  return "https://studio-seven-beta-89.vercel.app";
}

export const SITE_URL = resolveSiteUrl();

function toE164(phone: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("972")) return `+${digits}`;
  if (digits.startsWith("0")) return `+972${digits.slice(1)}`;
  return digits ? `+${digits}` : null;
}

const phone = publicPhone();
const phoneE164 = toE164(phone);

export const siteSeo = {
  url: SITE_URL,
  locale: "he_IL",
  title: "Aviya | סטודיו דיגיטלי — אתרים וחנויות לעסקים בישראל",
  titleShort: "Aviya",
  description:
    "אביה בונה אתרי תדמית, דפי נחיתה וחנויות דיגיטליות. מובייל קודם, בעלות מלאה, יחס אישי. שיחה קצרה בלי התחייבות.",
  ogDescription:
    "סטודיו Aviya: אתרי תדמית, דפי נחיתה וחנויות לעסקים בישראל. עיצוב שקט, מסלול פנייה ברור.",
  keywords: [
    "Aviya",
    "אביה",
    "סטודיו דיגיטלי",
    "בניית אתרים",
    "אתר תדמית",
    "דף נחיתה",
    "חנות דיגיטלית",
  ],
  ogImagePath: "/opengraph-image",
  email: publicEmail(),
  phone: phone ?? "",
  phoneE164: phoneE164 ?? "",
  instagram: brand.instagram,
} as const;

export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      locale: siteSeo.locale,
      type: "website",
      siteName: "Aviya Studio",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildMetadata(): Metadata {
  const verification = gscVerification();
  return {
    metadataBase: new URL(siteSeo.url),
    title: {
      default: siteSeo.title,
      template: `%s | ${siteSeo.titleShort}`,
    },
    description: siteSeo.description,
    applicationName: "Aviya Studio",
    authors: [{ name: "Aviya", url: siteSeo.url }],
    creator: "Aviya Studio",
    publisher: "Aviya Studio",
    category: "business",
    keywords: [...siteSeo.keywords],
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: "/",
      languages: { "he-IL": "/", he: "/", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: siteSeo.locale,
      url: "/",
      siteName: "Aviya Studio",
      title: siteSeo.title,
      description: siteSeo.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: siteSeo.title,
      description: siteSeo.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(verification ? { verification: { google: verification } } : {}),
  };
}

export function buildHomeMetadata(): Metadata {
  return pageMeta({
    title: siteSeo.title,
    description: siteSeo.description,
    path: "/",
    absoluteTitle: true,
  });
}

export function buildJsonLd() {
  const orgId = `${siteSeo.url}/#organization`;
  const websiteId = `${siteSeo.url}/#website`;
  const logo = `${siteSeo.url}/opengraph-image`;

  const organization: Record<string, unknown> = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: "Aviya Studio",
    alternateName: ["AVIYA", "Aviya", "אביה", "אביה סטודיו"],
    url: siteSeo.url,
    logo,
    image: `${siteSeo.url}/brand/aviya-portrait.png`,
    description: siteSeo.description,
    email: siteSeo.email,
    areaServed: { "@type": "Country", name: "Israel" },
    knowsLanguage: ["he", "en"],
    founder: {
      "@type": "Person",
      name: "אביה",
      alternateName: "Aviya",
      jobTitle: "מייסד",
      image: `${siteSeo.url}/brand/aviya-portrait.png`,
      url: `${siteSeo.url}/about`,
    },
    sameAs: [siteSeo.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "שירותי Aviya",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: `${siteSeo.url}/services/${service.slug}`,
          provider: { "@id": orgId },
          areaServed: "IL",
        },
      })),
    },
  };

  if (siteSeo.phoneE164) {
    organization.telephone = siteSeo.phoneE164;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteSeo.url,
        name: "Aviya Studio",
        description: siteSeo.description,
        inLanguage: "he-IL",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function serviceJsonLd(service: {
  slug: string;
  title: string;
  summary: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "IL",
    serviceType: service.title,
  };
}
