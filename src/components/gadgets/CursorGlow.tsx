"use client";

import { useEffect, useState } from "react";

/**
 * Soft ambient cursor glow (desktop only) — quiet luxury gadget
 */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const enable = window.setTimeout(() => setOn(true), 0);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.clearTimeout(enable);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  if (!on) return null;

  return (
    <div
      className="cursor-glow"
      aria-hidden
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    />
  );
}
