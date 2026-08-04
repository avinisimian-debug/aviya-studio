"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { AccessibilityProvider } from "@/components/a11y/AccessibilityProvider";
import { AccessibilityWidget } from "@/components/a11y/AccessibilityWidget";

/**
 * Global motion policy + site-wide accessibility tools (IL regulations support)
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <MotionConfig
      reducedMotion={prefersReduced ? "always" : "user"}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <AccessibilityProvider>
        {children}
        <AccessibilityWidget />
      </AccessibilityProvider>
    </MotionConfig>
  );
}
