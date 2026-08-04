"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LANDING } from "@/data/landing";
import { Icon } from "@/components/ui/Icon";
import { MessageCircle, PenLine } from "@/lib/icons";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Sticky dual-action dock — mobile only.
 * Hides mildly when scrolling down near bottom so it won't cover the form forever.
 */
export function MobileDock() {
  const [visible, setVisible] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    // Avoid SSR mismatch: only show after mount + mobile MQ
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setVisible(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    const onScroll = () => {
      const contact = document.getElementById("contact");
      if (!contact) {
        setAtContact(false);
        return;
      }
      const rect = contact.getBoundingClientRect();
      // Hide when contact form is primarily in view
      setAtContact(rect.top < window.innerHeight * 0.55 && rect.bottom > 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !atContact ? (
        <motion.div
          className="mobile-dock fixed inset-x-0 bottom-0 z-[65] px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
          role="navigation"
          aria-label="פעולות מהירות במובייל"
        >
          <div
            className={cn(
              "mx-auto flex max-w-lg items-center gap-2 rounded-2xl border border-[var(--line-strong)]",
              "bg-[rgba(11,12,14,0.88)] p-2 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            )}
          >
            <a
              href={LANDING.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 text-[0.88rem] font-semibold text-[#0b1f12] transition-transform active:scale-[0.98]"
            >
              <Icon icon={MessageCircle} size="sm" />
              וואטסאפ
            </a>
            <a
              href="#contact"
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--line-strong)] bg-white/[0.06] px-3 text-[0.88rem] font-medium text-[var(--fg)] transition-colors active:scale-[0.98]"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              <Icon icon={PenLine} size="sm" />
              שיחת אפיון
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
