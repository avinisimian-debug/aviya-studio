import { landingNav, LANDING } from "@/data/landing";

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--line)] pb-10 pt-14" aria-label="פוטר">
      <div className="shell flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-[2.2rem] font-extrabold tracking-tight text-white">
            AVIYA
          </p>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-7 text-[var(--fg-muted)]">
            סטודיו דיגיטלי. אתרים שנבנים כמו מוצרים — וממירים.
          </p>
        </div>
        <nav className="flex flex-wrap gap-5 text-[0.9rem] text-[var(--fg-soft)]">
          {landingNav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-[var(--fg)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={LANDING.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--fg)]"
          >
            WhatsApp
          </a>
        </nav>
      </div>
      <div className="shell mt-12 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-[0.78rem] text-[var(--fg-muted)] sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} AVIYA Studio</p>
        <p>ישראל · בעלות מלאה על הנכס שלכם</p>
      </div>
    </footer>
  );
}
