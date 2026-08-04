import type { Metadata } from "next";
import { brand } from "@/lib/design-system";
import { faqs, LANDING } from "@/data/landing";

/** Production site URL — override with NEXT_PUBLIC_SITE_URL when live */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://aviya.studio"
).replace(/\/$/, "");

/**
 * On-page + SERP meta — Hebrew commercial intent keywords
 * (building, ecommerce, physical stores → digital)
 */
export const siteSeo = {
  url: SITE_URL,
  locale: "he_IL",
  title:
    "בניית אתרים וחנויות אינטרנטיות לעסקים | Aviya — סטודיו דיגיטלי",
  titleShort: "Aviya | בניית אתרים וחנויות דיגיטליות",
  description:
    "בניית אתרים מקצועיים, חנויות אונליין ואתרי תדמית לעסקים בישראל. Aviya — סטודיו דיגיטלי: עיצוב יוקרתי, חנות אינטרנטית שמוכנה למכור, SEO, סליקה ובעלות מלאה. תוך שבועיים מהחומרים.",
  ogDescription:
    "חנות דיגיטלית ברמה של מותג — לחנויות פיזיות ולעסקים שרוצים למכור אונליין. עיצוב, בנייה, צמיחה. Aviya.",
  /** Focus keywords for meta + content (natural language SEO) */
  keywords: [
    // Core services
    "בניית אתרים",
    "בניית אתרים לעסקים",
    "בניית אתרים מקצועיים",
    "בניית אתרים בישראל",
    "עיצוב אתרים",
    "עיצוב אתרים מקצועי",
    "סטודיו דיגיטלי",
    "סטודיו לבניית אתרים",
    "חברת בניית אתרים",
    // Ecommerce / shops
    "חנות אינטרנטית",
    "חנויות אינטרנטיות",
    "בניית חנות אונליין",
    "בניית חנות דיגיטלית",
    "חנויות דיגיטליות",
    "אתר מכירות",
    "אתר למכירת מוצרים",
    "חנות וירטואלית",
    "אתר e-commerce",
    "הקמת חנות אונליין",
    // Audience
    "אתר לחנות פיזית",
    "אתר לעסק",
    "אתר לעסקים קטנים",
    "אתר תדמית",
    "אתר תדמית מקצועי",
    "דף נחיתה",
    "דפי נחיתה",
    "אתר תדמית לעסק",
    // Conversion / growth
    "אתר שמביא לקוחות",
    "אתר שממיר",
    "המרת לידים",
    "שיווק דיגיטלי",
    "נוכחות דיגיטלית",
    "אתרים שמכניסים לקוחות",
    // SEO
    "קידום אתרים",
    "קידום אורגני",
    "SEO",
    "אופטימיזציה לגוגל",
    "קידום בגוגל",
    // Tech / trust
    "אתר רספונסיבי",
    "אתר מותאם למובייל",
    "סליקת אשראי באתר",
    "אתר עם נגישות",
    "Next.js",
    // Brand
    "Aviya",
    "AVIYA",
    "אביה סטודיו",
    "Aviya studio",
    // Local
    "ישראל",
    "בניית אתרים בתל אביב",
    "בניית אתרים במרכז",
  ],
  ogImagePath: "/opengraph-image",
  email: LANDING.email,
  phone: "+972-55-557-3090",
  phoneE164: `+${LANDING.whatsappE164}`,
  instagram: LANDING.instagram,
} as const;

export function buildMetadata(): Metadata {
  const ogImage = new URL(siteSeo.ogImagePath, siteSeo.url).toString();
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

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
    classification: "Web Design, E-commerce Websites, Digital Marketing",
    keywords: [...siteSeo.keywords],
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: siteSeo.url,
      languages: {
        "he-IL": siteSeo.url,
        he: siteSeo.url,
        "x-default": siteSeo.url,
      },
    },
    openGraph: {
      type: "website",
      locale: siteSeo.locale,
      alternateLocale: ["en_US"],
      url: siteSeo.url,
      siteName: "Aviya Studio",
      title: siteSeo.title,
      description: siteSeo.ogDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Aviya — בניית אתרים וחנויות דיגיטליות לעסקים בישראל",
          type: "image/png",
        },
      ],
      countryName: "Israel",
    },
    twitter: {
      card: "summary_large_image",
      title: siteSeo.titleShort,
      description: siteSeo.ogDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/icon", type: "image/png" }],
      apple: [{ url: "/apple-icon", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    ...(verification
      ? {
          verification: {
            google: verification,
          },
        }
      : {}),
    other: {
      "geo.region": "IL",
      "geo.placename": "Israel",
      "content-language": "he-IL",
      "revisit-after": "7 days",
      rating: "general",
      distribution: "global",
      target: "all",
      "audience": "all",
      "msapplication-TileColor": "#0b0b0e",
      "theme-color": "#0b0b0e",
    },
  };
}

/** Home-page specific overrides (H1 alignment in SERP) */
export function buildHomeMetadata(): Metadata {
  return {
    title: siteSeo.title,
    description: siteSeo.description,
    keywords: [...siteSeo.keywords],
    alternates: {
      canonical: siteSeo.url,
    },
    openGraph: {
      title: siteSeo.title,
      description: siteSeo.ogDescription,
      url: siteSeo.url,
      locale: siteSeo.locale,
      type: "website",
      siteName: "Aviya Studio",
    },
    twitter: {
      card: "summary_large_image",
      title: siteSeo.titleShort,
      description: siteSeo.ogDescription,
    },
  };
}

/**
 * Rich results: Organization, LocalBusiness, ProfessionalService,
 * WebSite, WebPage, FAQPage, OfferCatalog, BreadcrumbList
 */
export function buildJsonLd() {
  const orgId = `${siteSeo.url}/#organization`;
  const bizId = `${siteSeo.url}/#localbusiness`;
  const websiteId = `${siteSeo.url}/#website`;
  const webpageId = `${siteSeo.url}/#webpage`;
  const logoUrl = `${siteSeo.url}/opengraph-image`;

  const services = [
    {
      name: "בניית אתרים לעסקים",
      description:
        "אתר תדמית ומכירות מותאם אישית לעסק, עיצוב יוקרתי ומבנה שממיר לידים.",
    },
    {
      name: "בניית חנות אינטרנטית",
      description:
        "חנות דיגיטלית עם סליקה, מוצרים, משלוחים ואוטומציות — מוכנה למכור.",
    },
    {
      name: "עיצוב UI/UX ודפי נחיתה",
      description:
        "עיצוב חוויית משתמש, דפי נחיתה להמרה ומותג דיגיטלי עקבי.",
    },
    {
      name: "קידום אורגני (SEO) בסיסי בהקמה",
      description:
        "מבנה טכני, תגיות, מהירות ומפת אתר לקידום בגוגל.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Aviya Studio",
        alternateName: ["AVIYA", "אביה", "Aviya", "Aviya studio"],
        url: siteSeo.url,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          width: 1200,
          height: 630,
        },
        image: logoUrl,
        description: siteSeo.description,
        email: siteSeo.email,
        telephone: siteSeo.phoneE164,
        foundingDate: "2024",
        slogan: LANDING.promise,
        sameAs: [siteSeo.instagram],
        areaServed: [
          { "@type": "Country", name: "Israel" },
          { "@type": "Place", name: "ישראל" },
        ],
        knowsLanguage: ["he", "en"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteSeo.email,
            telephone: siteSeo.phoneE164,
            availableLanguage: ["Hebrew", "he", "English"],
            areaServed: "IL",
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: siteSeo.email,
            telephone: siteSeo.phoneE164,
            availableLanguage: ["Hebrew", "he"],
          },
        ],
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": bizId,
        name: "Aviya — בניית אתרים וחנויות דיגיטליות",
        url: siteSeo.url,
        image: logoUrl,
        description: siteSeo.description,
        email: siteSeo.email,
        telephone: siteSeo.phoneE164,
        priceRange: "₪₪₪",
        currenciesAccepted: "ILS",
        paymentAccepted: "Credit Card, Bank Transfer",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
          ],
          opens: "09:00",
          closes: "19:00",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "IL",
          addressLocality: "Israel",
        },
        geo: {
          "@type": "GeoCoordinates",
          // Approximate center IL — update when you have exact studio address
          latitude: 32.0853,
          longitude: 34.7818,
        },
        areaServed: {
          "@type": "Country",
          name: "Israel",
        },
        serviceType: services.map((s) => s.name),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "שירותי Aviya",
          itemListElement: services.map((s, i) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.description,
              provider: { "@id": orgId },
              areaServed: "IL",
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: `${siteSeo.url}/#contact`,
              },
            },
            position: i + 1,
          })),
        },
        parentOrganization: { "@id": orgId },
        sameAs: [siteSeo.instagram],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteSeo.url,
        name: "Aviya Studio",
        alternateName: "Aviya — בניית אתרים",
        description: siteSeo.description,
        inLanguage: "he-IL",
        publisher: { "@id": orgId },
        copyrightHolder: { "@id": orgId },
        potentialAction: [
          {
            "@type": "CommunicateAction",
            name: "יצירת קשר לבניית אתר",
            target: `${siteSeo.url}/#contact`,
          },
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteSeo.url}/#contact`,
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: siteSeo.url,
        name: siteSeo.title,
        isPartOf: { "@id": websiteId },
        about: { "@id": bizId },
        description: siteSeo.description,
        inLanguage: "he-IL",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: logoUrl,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".sales-h1", ".sales-brand-proof", ".sales-strip-h"],
        },
        mainEntity: { "@id": bizId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteSeo.url}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "דף הבית — בניית אתרים Aviya",
            item: siteSeo.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "חנות דיגיטלית",
            item: `${siteSeo.url}/#work`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "יצירת קשר",
            item: `${siteSeo.url}/#contact`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteSeo.url}/#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${siteSeo.url}/#services-list`,
        name: "שירותי בניית אתרים של Aviya",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          description: s.description,
          url: `${siteSeo.url}/#how`,
        })),
      },
    ],
  };
}
