"use client";

import Image from "next/image";
import type { ReactNode } from "react";

/** Max-width content shell */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`elite-shell ${className}`.trim()}>{children}</div>;
}

/** Vertical page section */
export function Section({
  id,
  children,
  className = "",
  tone = "default",
  tight = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted" | "inverse" | "border";
  tight?: boolean;
}) {
  const tones = {
    default: "",
    muted: "elite-section--muted",
    inverse: "elite-section--inverse",
    border: "elite-section--border",
  } as const;

  return (
    <section
      id={id}
      className={[
        "elite-section",
        tight ? "elite-section--tight" : "",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}

/** Centered (or start) section header */
export function SectionHead({
  kicker,
  title,
  lead,
  align = "center",
  titleId,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  align?: "center" | "start";
  titleId?: string;
}) {
  return (
    <header
      className={`elite-head${align === "start" ? " elite-head--start" : ""}`}
    >
      {kicker ? <p className="elite-kicker">{kicker}</p> : null}
      <h2 id={titleId} className="elite-h2">
        {title}
      </h2>
      {lead ? <p className="elite-lead">{lead}</p> : null}
    </header>
  );
}

type MediaVariant = "default" | "tall" | "wide" | "browser";

/**
 * Polished media frame — browser chrome optional, hover zoom, soft highlight.
 * Pass `src` for Unsplash / remote image, or children for custom content.
 */
export function MediaFrame({
  variant = "default",
  label = "Media",
  src,
  alt,
  priority = false,
  domain,
  children,
  className = "",
}: {
  variant?: MediaVariant;
  label?: string;
  src?: string;
  alt?: string;
  priority?: boolean;
  domain?: string;
  children?: ReactNode;
  className?: string;
}) {
  const sizeCls =
    variant === "tall"
      ? "elite-media--tall"
      : variant === "wide"
        ? "elite-media--wide"
        : variant === "browser"
          ? "elite-media--browser"
          : "";

  return (
    <figure
      className={["elite-media", sizeCls, className].filter(Boolean).join(" ")}
      aria-label={label}
    >
      {variant === "browser" ? (
        <div className="elite-media-chrome" aria-hidden="true">
          <span className="dot-r" />
          <span className="dot-y" />
          <span className="dot-g" />
          <div className="elite-media-url">{domain ?? "aviya.studio"}</div>
        </div>
      ) : null}

      <div
        className={
          variant === "browser" ? "elite-media-body" : "elite-media-stage"
        }
      >
        {src ? (
          <Image
            src={src}
            alt={alt ?? label}
            fill
            sizes="(max-width: 900px) 92vw, 540px"
            className="elite-media-img"
            priority={priority}
          />
        ) : children ? (
          children
        ) : (
          <div className="elite-media-placeholder">{label}</div>
        )}
        <div className="elite-media-veil" aria-hidden="true" />
      </div>
    </figure>
  );
}

/** Side-by-side image + text editorial block */
export function Split({
  reverse = false,
  media,
  children,
  className = "",
}: {
  reverse?: boolean;
  media: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "elite-split",
        reverse ? "elite-split--reverse" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="elite-split-copy">{children}</div>
      <div className="elite-split-media">{media}</div>
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "accent" | "ghost";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`elite-btn elite-btn--${variant} ${className}`.trim()}
    >
      <span className="elite-btn-label">{children}</span>
      <span className="elite-btn-arrow" aria-hidden>
        ←
      </span>
    </a>
  );
}

export function Skeleton({
  variant = "text",
  className = "",
}: {
  variant?: "text" | "title";
  className?: string;
}) {
  return (
    <div
      className={`elite-skel elite-skel--${variant} ${className}`.trim()}
      aria-hidden
    />
  );
}
