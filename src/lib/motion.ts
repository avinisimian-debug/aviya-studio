import type { Transition, Variants } from "framer-motion";
import { motionTokens } from "./design-system";

/** Buttery ease-in-out — boutique, never snap or bounce */
export const easeSmooth = motionTokens.easeSmooth;
export const easeOutExpo = motionTokens.easeOutExpo;
export const easeOutQuart = motionTokens.easeOutQuart;

export const transitionBase: Transition = {
  duration: motionTokens.duration.base,
  ease: easeSmooth,
};

export const transitionCinematic: Transition = {
  duration: motionTokens.duration.slow,
  ease: easeSmooth,
};

/** Gentle fade + rise on scroll — agency standard (y: 20 → 0) */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionCinematic,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionCinematic,
  },
};

/** Sophisticated hover lift — cards/surfaces only */
export const softPress: Variants = {
  rest: { y: 0 },
  hover: {
    y: -3,
    transition: { duration: 0.35, ease: easeSmooth },
  },
  tap: {
    y: 0,
    transition: { duration: 0.15, ease: easeSmooth },
  },
};
