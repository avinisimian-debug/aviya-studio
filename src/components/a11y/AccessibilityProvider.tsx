"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyA11yToDocument,
  DEFAULT_A11Y_PREFS,
  FONT_STEPS,
  loadA11yPrefs,
  saveA11yPrefs,
  type A11yPrefs,
} from "@/lib/accessibility";

type A11yContextValue = {
  prefs: A11yPrefs;
  setPrefs: (next: A11yPrefs | ((p: A11yPrefs) => A11yPrefs)) => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  reset: () => void;
};

const A11yContext = createContext<A11yContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefsState] = useState<A11yPrefs>(DEFAULT_A11Y_PREFS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadA11yPrefs();
    setPrefsState(loaded);
    applyA11yToDocument(loaded);
    setReady(true);
  }, []);

  const setPrefs = useCallback((next: A11yPrefs | ((p: A11yPrefs) => A11yPrefs)) => {
    setPrefsState((prev) => {
      const value = typeof next === "function" ? next(prev) : next;
      applyA11yToDocument(value);
      saveA11yPrefs(value);
      return value;
    });
  }, []);

  const increaseFont = useCallback(() => {
    setPrefs((p) => {
      const i = FONT_STEPS.indexOf(p.fontScale as (typeof FONT_STEPS)[number]);
      const next = FONT_STEPS[Math.min(FONT_STEPS.length - 1, (i < 0 ? 0 : i) + 1)] ?? 140;
      return { ...p, fontScale: next };
    });
  }, [setPrefs]);

  const decreaseFont = useCallback(() => {
    setPrefs((p) => {
      const i = FONT_STEPS.indexOf(p.fontScale as (typeof FONT_STEPS)[number]);
      const next = FONT_STEPS[Math.max(0, (i < 0 ? 0 : i) - 1)] ?? 100;
      return { ...p, fontScale: next };
    });
  }, [setPrefs]);

  const reset = useCallback(() => {
    setPrefs({ ...DEFAULT_A11Y_PREFS });
  }, [setPrefs]);

  const value = useMemo(
    () => ({ prefs, setPrefs, increaseFont, decreaseFont, reset }),
    [prefs, setPrefs, increaseFont, decreaseFont, reset]
  );

  return (
    <A11yContext.Provider value={value}>
      {/* Avoid flash: still render children; classes apply on mount */}
      <span className="sr-only" aria-live="polite">
        {ready ? "" : ""}
      </span>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) {
    throw new Error("useA11y must be used within AccessibilityProvider");
  }
  return ctx;
}
