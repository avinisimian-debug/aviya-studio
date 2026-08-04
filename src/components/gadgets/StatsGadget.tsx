"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

const STATS = [
  { value: 3, suffix: "×", label: "יותר פניות ממוקדות" },
  { value: 14, suffix: " ימים", label: "זמן ממוצע לעליה" },
  { value: 100, suffix: "%", label: "בעלות על האתר" },
  { value: 8, suffix: "", label: "פרויקטים בחודש מקס׳" },
] as const;

/** Animated outcome stats — conversion gadget */
export function StatsGadget() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="stats-gadget" aria-label="נתוני תוצאה">
      {STATS.map((s) => (
        <StatCell key={s.label} {...s} active={active} />
      ))}
    </div>
  );
}

function StatCell({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className="stat-cell">
      <p className="stat-num">
        <span dir="ltr">
          {n}
          {suffix}
        </span>
      </p>
      <p className="stat-label">{label}</p>
    </div>
  );
}
