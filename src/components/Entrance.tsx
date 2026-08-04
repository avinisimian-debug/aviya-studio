"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function Entrance({ onDone }: { onDone: () => void }) {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      onDone();
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [onDone, prefersReduced]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="h-px bg-[var(--accent)]"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              className="display text-[clamp(2.4rem,8vw,4.5rem)] tracking-[-0.04em] text-[var(--fg)]"
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              AVIYA
            </motion.p>
            <motion.p
              className="text-[0.72rem] tracking-[0.28em] uppercase text-[var(--fg-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              Digital Studio
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
