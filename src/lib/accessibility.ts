/** Accessibility preferences (WCAG / IS 5568 helpers) */

export const A11Y_STORAGE_KEY = "aviya-a11y-prefs-v1";

export type A11yPrefs = {
  fontScale: number; // 100 | 112 | 125 | 140
  contrast: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  stopAnimations: boolean;
  highlightFocus: boolean;
};

export const DEFAULT_A11Y_PREFS: A11yPrefs = {
  fontScale: 100,
  contrast: false,
  underlineLinks: false,
  readableFont: false,
  stopAnimations: false,
  highlightFocus: false,
};

export const FONT_STEPS = [100, 112, 125, 140] as const;

export function applyA11yToDocument(prefs: A11yPrefs) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.fontSize = `${(prefs.fontScale / 100) * 100}%`;
  root.classList.toggle("a11y-contrast", prefs.contrast);
  root.classList.toggle("a11y-underline-links", prefs.underlineLinks);
  root.classList.toggle("a11y-readable", prefs.readableFont);
  root.classList.toggle("a11y-reduce-motion", prefs.stopAnimations);
  root.classList.toggle("a11y-focus", prefs.highlightFocus);
  root.dataset.a11yFont = String(prefs.fontScale);
}

export function loadA11yPrefs(): A11yPrefs {
  if (typeof window === "undefined") return { ...DEFAULT_A11Y_PREFS };
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_A11Y_PREFS };
    const parsed = JSON.parse(raw) as Partial<A11yPrefs>;
    return { ...DEFAULT_A11Y_PREFS, ...parsed };
  } catch {
    return { ...DEFAULT_A11Y_PREFS };
  }
}

export function saveA11yPrefs(prefs: A11yPrefs) {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore quota / private mode */
  }
}
