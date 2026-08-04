"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/content";

export function Nav() {
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
            className="display text-[1.3rem] tracking-[-0.03em] transition-opacity hover:opacity-80"
            aria-label="AVIYA — ראש העמוד"
          >
            AVIYA
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="ניווט ראשי">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.86rem] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
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
              שיחה
            </a>
            <button
              type="button"
              className="btn btn-ghost !min-h-10 !px-3 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "סגור" : "תפריט"}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-nav" className="nav-drawer lg:hidden" role="dialog" aria-modal="true" aria-label="תפריט ניווט">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-[var(--line)] py-4 text-[1.35rem] font-light tracking-tight"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cases"
              className="border-b border-[var(--line)] py-4 text-[1.35rem] font-light"
              onClick={() => setOpen(false)}
            >
              מקרי בוחן
            </a>
            <a
              href="#packages"
              className="border-b border-[var(--line)] py-4 text-[1.35rem] font-light"
              onClick={() => setOpen(false)}
            >
              חבילות
            </a>
            <a
              href="#contact"
              className="btn btn-primary mt-8"
              onClick={() => setOpen(false)}
            >
              שיחת היכרות
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
