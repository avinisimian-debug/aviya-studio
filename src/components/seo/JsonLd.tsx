import { buildJsonLd } from "@/lib/seo";

/** Server-only JSON-LD injection — no hydration cost on client tree */
export function JsonLd() {
  const data = buildJsonLd();
  return (
    <script
      type="application/ld+json"
      // Safe: static SEO object, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
