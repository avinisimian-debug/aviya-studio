"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

export const eliteEase = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll reveal with hard failsafe:
 * after ~1s always paint content — never leave blank sections.
 * Does not animate opacity away permanently (fail-open).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 12,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Fail-open: content always appears even if whileInView never fires
    const t = window.setTimeout(() => setShow(true), 900 + delay * 1000);
    return () => window.clearTimeout(t);
  }, [delay]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`elite-reveal ${show ? "is-visible" : ""} ${className}`.trim()}
      initial={{ opacity: 0.01, y }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: "120px 0px 120px 0px" }}
      transition={{ duration: 0.45, delay, ease: eliteEase }}
      onViewportEnter={() => setShow(true)}
      onAnimationComplete={() => setShow(true)}
      style={{ opacity: show ? 1 : undefined }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 1100);
    return () => window.clearTimeout(t);
  }, []);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`elite-reveal-stagger ${show ? "is-visible" : ""} ${className}`.trim()}
      initial="hidden"
      animate={show ? "show" : undefined}
      whileInView="show"
      viewport={{ once: true, amount: 0.01, margin: "120px 0px 120px 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.02,
          },
        },
      }}
      onViewportEnter={() => setShow(true)}
      onAnimationComplete={() => setShow(true)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={`elite-reveal-item ${className}`.trim()}
      variants={{
        // Near-visible start so a stuck animation never looks blank
        hidden: { opacity: 0.15, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: eliteEase },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
