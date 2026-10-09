import Link from "next/link";
import { LdJson } from "@/components/studio/LdJson";
import { SITE_URL } from "@/lib/seo";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };

  return (
    <>
      <nav className="crumbs" aria-label="פירורי לחם">
        <ol>
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path}>
                {last ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <LdJson data={data} />
    </>
  );
}
