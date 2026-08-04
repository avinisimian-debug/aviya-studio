"use client";

import { useEffect, useState, type CSSProperties } from "react";

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
  const [style, setStyle] = useState<CSSProperties>({
    opacity: 0,
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
  }, []);

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
  const [shown, setShown] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(n);
      return;
    }
    let start: number | null = null;
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      if (start == null) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(n * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const t = window.setTimeout(() => {
      setReady(true);
      raf = requestAnimationFrame(tick);
    }, 420);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  const display =
    n > 0
      ? String(ready || shown ? shown : 0).padStart(pad, "0")
      : value;

  return (
    <li>
      <strong>{display}</strong>
      <span>{label}</span>
    </li>
  );
}
