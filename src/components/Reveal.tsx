"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const ease = [0.4, 0, 0.2, 1] as const;

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
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (as === "li") {
    return (
      <motion.li
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
        transition={{ duration: 0.65, delay, ease }}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
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
