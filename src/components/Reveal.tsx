import type { CSSProperties, ReactNode } from "react";

/** Shared easing curve kept for legacy framer-motion callers. */
export const ease = [0.4, 0, 0.2, 1] as const;

/**
 * Bulletproof reveal.
 *
 * Content renders at full opacity by default and is only animated by CSS
 * keyframes. There is no IntersectionObserver and no inline `opacity: 0`
 * from JS, so a failed observer, disabled script, or hydration error can
 * never leave a section blank — the worst case is content simply appears.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li";
}) {
  const Tag = as;
  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <Tag className={className ? `reveal ${className}` : "reveal"} style={style}>
      {children}
    </Tag>
  );
}

export function SectionHead({
  label,
  title,
  titleId,
  description,
  className,
}: {
  label: string;
  title: string;
  titleId: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <p className="section-label">{label}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={titleId} className="lead max-w-[18ch]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p className="prose-muted mt-5 max-w-xl">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
