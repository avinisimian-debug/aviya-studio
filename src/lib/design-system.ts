/**
 * AVIYA Design System — TypeScript contracts
 * Elite boutique agency · charcoal dark · Heebo RTL · glass + split storytelling
 */

export const brand = {
  name: "AVIYA",
  tagline: "אתרים שנבנים כמו מוצרים.",
  locale: "he-IL",
  dir: "rtl" as const,
  region: "IL",
} as const;

export const colors = {
  bg: "var(--bg)",
  bgElevated: "var(--bg-elevated)",
  bgPanel: "var(--bg-panel)",
  bgGlass: "var(--bg-glass)",
  fg: "var(--fg)",
  fgSoft: "var(--fg-soft)",
  fgMuted: "var(--fg-muted)",
  accent: "var(--accent)",
  accentSoft: "var(--accent-soft)",
  line: "var(--line)",
  lineStrong: "var(--line-strong)",
  danger: "var(--danger)",
  success: "var(--success)",
  focus: "var(--focus-ring)",
} as const;

export type ColorToken = keyof typeof colors;

export const space = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  section: "var(--space-section)",
  sectionLg: "var(--space-section-lg)",
  shell: "var(--space-shell)",
  gutter: "var(--space-gutter)",
} as const;

/** Typography roles — extrabold titles, regular readable body */
export const typeRoles = {
  display: "font-sans tracking-display font-extrabold text-white",
  hero: "font-sans text-hero tracking-display font-extrabold text-white",
  lead: "text-lead font-extrabold tracking-display leading-snug text-white",
  title: "text-title font-bold tracking-tight leading-snug text-white",
  body: "text-body font-normal leading-body text-foreground-muted",
  small: "text-small font-normal leading-relaxed text-muted",
  label: "text-label tracking-label uppercase text-muted font-medium",
} as const;

export type TypeRole = keyof typeof typeRoles;

/** Shared layout class strings for image+text storytelling */
export const layoutClasses = {
  section: "section",
  split: "split",
  splitReverse: "split split-reverse",
  glass: "glass border border-white/10 bg-white/[0.03] backdrop-blur-md",
  visualFrame: "visual-frame",
} as const;

export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 40,
  grain: 50,
  nav: 60,
  dock: 65,
  drawer: 70,
  modal: 80,
  toast: 90,
  entrance: 100,
  skip: 200,
} as const;

export const layout = {
  shell: "var(--shell-width)",
  shellWide: "var(--shell-wide)",
  headerH: "var(--header-h)",
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    full: "9999px",
  },
} as const;

export const motionTokens = {
  easeSmooth: [0.4, 0, 0.2, 1] as const,
  easeOutExpo: [0.22, 1, 0.36, 1] as const,
  easeOutQuart: [0.25, 1, 0.5, 1] as const,
  easeInOut: [0.45, 0, 0.55, 1] as const,
  duration: {
    instant: 0.12,
    fast: 0.2,
    base: 0.4,
    slow: 0.65,
    cinematic: 0.7,
    entrance: 0.9,
  },
} as const;

export type MotionDuration = keyof typeof motionTokens.duration;
