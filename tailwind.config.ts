/**
 * TypeScript source of truth documentation for the elite agency Tailwind config.
 * The build pipeline loads `tailwind.config.mjs` via @config in globals.css.
 * Keep this file aligned with the .mjs when extending theme.
 */

import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-heebo)",
          "var(--font-assistant)",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-heebo)",
          "var(--font-assistant)",
          "system-ui",
          "sans-serif",
        ],
        heebo: ["var(--font-heebo)", "system-ui", "sans-serif"],
        assistant: ["var(--font-assistant)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SF Mono", "monospace"],
      },
      fontWeight: {
        extrabold: "800",
        black: "900",
      },
      colors: {
        background: {
          DEFAULT: "var(--bg)",
          elevated: "var(--bg-elevated)",
          panel: "var(--bg-panel)",
          soft: "var(--bg-soft)",
          glass: "var(--bg-glass)",
        },
        foreground: {
          DEFAULT: "var(--fg)",
          soft: "var(--fg-soft)",
          muted: "var(--fg-muted)",
        },
        muted: "var(--fg-muted)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          soft: "var(--accent-soft)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
      },
      borderColor: {
        DEFAULT: "var(--line-strong)",
        subtle: "var(--line)",
        strong: "var(--line-strong)",
        glass: "var(--glass-border)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      maxWidth: {
        shell: "var(--shell-width)",
        "shell-wide": "var(--shell-wide)",
      },
      spacing: {
        section: "var(--space-section)",
        "section-lg": "var(--space-section-lg)",
        gutter: "var(--space-gutter)",
        shell: "var(--space-shell)",
      },
      backdropBlur: {
        glass: "16px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
        studio: "cubic-bezier(0.45, 0, 0.55, 1)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        elevated: "var(--shadow-elevated)",
        glass: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
        none: "none",
      },
      letterSpacing: {
        display: "var(--tracking-display)",
        label: "var(--tracking-label)",
      },
      fontSize: {
        hero: [
          "var(--text-hero)",
          { lineHeight: "1.08", letterSpacing: "-0.03em" },
        ],
        display: [
          "var(--text-display)",
          { lineHeight: "1.12", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        lead: [
          "var(--text-lead)",
          { lineHeight: "1.2", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        body: ["var(--text-body)", { lineHeight: "1.75" }],
        small: ["var(--text-small)", { lineHeight: "1.6" }],
        label: [
          "var(--text-label)",
          { lineHeight: "1.4", letterSpacing: "0.14em" },
        ],
      },
      zIndex: {
        grain: "50",
        nav: "60",
        dock: "65",
        drawer: "70",
        modal: "80",
        entrance: "100",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
