"use client";

import { useEffect, useState } from "react";
import { landingNav } from "@/data/landing";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`nav-shell ${scrolled ? "scrolled" : ""}`}>
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-4">
          <a
            href="#top"
            className="display text-[1.3rem] font-extrabold tracking-[-0.03em] text-white transition-opacity hover:opacity-80"
            aria-label="AVIYA — ראש העמוד"
          >
            AVIYA
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="ניווט ראשי">
            {landingNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.86rem] text-foreground-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="btn btn-primary !min-h-10 !px-4 !text-[0.82rem]"
            >
              בואו נדבר
            </a>
            <button
              type="button"
              className="btn btn-ghost !min-h-10 !px-3 md:hidden"
              aria-expanded={open}
              aria-controls="landing-mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "סגור" : "תפריט"}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="landing-mobile-nav"
          className="nav-drawer md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="תפריט"
        >
          <nav className="flex flex-col">
            {landingNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-white/10 py-4 text-[1.3rem] font-light"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary mt-8"
              onClick={() => setOpen(false)}
            >
              בואו נדבר
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
