"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true
  );
}

/** Top reading progress — agency / SaaS pattern */
export function SalesScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setP(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="sales-progress"
      role="progressbar"
      aria-valuenow={Math.round(p)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="התקדמות בדף"
    >
      <div className="sales-progress-bar" style={{ width: `${p}%` }} />
    </div>
  );
}

/** Subtle gold wash that follows the pointer on desktop (hero only) */
export function HeroAura() {
  const reduced = usePrefersReducedMotion();
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0 });

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const root = document.getElementById("top");
    if (!root) return;

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      setStyle({
        opacity: 1,
        background: `radial-gradient(520px circle at ${x}% ${y}%, rgba(196,163,90,0.16), transparent 42%)`,
      });
    };
    const onLeave = () => setStyle((s) => ({ ...s, opacity: 0 }));

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;
  return <div className="hero-aura" style={style} aria-hidden />;
}

/** Count-up for craft signal numbers (08, 14, 2…) */
export function CountSignal({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const n = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const pad = value.length;
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduced || n <= 0) return;

    let start: number | null = null;
    const dur = 900;
    let raf = 0;
    const delay = window.setTimeout(() => {
      const tick = (t: number) => {
        if (start == null) start = t;
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown(Math.round(n * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 420);

    return () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [n, reduced]);

  const display =
    n <= 0
      ? value
      : reduced
        ? String(n).padStart(pad, "0")
        : String(shown).padStart(pad, "0");

  return (
    <li>
      <strong>{display}</strong>
      <span>{label}</span>
    </li>
  );
}
