import Image from "next/image";
import { LANDING } from "@/data/landing";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  /** Pass `null` to render without a link */
  href?: string | null;
  size?: "nav" | "footer" | "hero";
  className?: string;
  priority?: boolean;
};

const sizes = {
  nav: { width: 148, height: 52, className: "brand-logo brand-logo--nav" },
  footer: { width: 220, height: 200, className: "brand-logo brand-logo--footer" },
  hero: { width: 200, height: 180, className: "brand-logo brand-logo--hero" },
} as const;

export function BrandLogo({
  href = "#top",
  size = "nav",
  className,
  priority = false,
}: BrandLogoProps) {
  const s = sizes[size];
  const img = (
    <Image
      src={LANDING.logoSrc}
      alt={`${LANDING.brand} — עיצוב, בנייה, צמיחה`}
      width={s.width}
      height={s.height}
      priority={priority}
      className={cn(s.className, className)}
    />
  );

  if (href === null || href === "") return img;

  return (
    <a href={href} className="brand-link" aria-label={`${LANDING.brand} — ראש העמוד`}>
      {img}
    </a>
  );
}
