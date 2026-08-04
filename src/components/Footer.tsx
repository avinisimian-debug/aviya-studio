import { navLinks } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] pb-10 pt-14" aria-label="פוטר">
      <div className="shell grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <p className="display text-[2.4rem] tracking-tight">AVIYA</p>
          <p className="mt-4 max-w-sm text-[1rem] leading-8 text-[var(--fg-muted)]">
            סטודיו דיגיטלי פרימיום.
            <br />
            אתרים שנבנים כמו מוצרים.
          </p>
          <a href="#contact" className="btn btn-primary mt-8">
            שיחת היכרות
            <span aria-hidden>←</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-4 text-[0.7rem] tracking-[0.14em] uppercase text-[var(--fg-muted)]">
              ניווט
            </p>
            <ul className="space-y-3 text-[0.92rem] text-[var(--fg-soft)]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-[var(--fg)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[0.7rem] tracking-[0.14em] uppercase text-[var(--fg-muted)]">
              עוד
            </p>
            <ul className="space-y-3 text-[0.92rem] text-[var(--fg-soft)]">
              <li>
                <a href="#cases" className="transition-colors hover:text-[var(--fg)]">
                  מקרי בוחן
                </a>
              </li>
              <li>
                <a href="#packages" className="transition-colors hover:text-[var(--fg)]">
                  חבילות
                </a>
              </li>
              <li>
                <a href="#timeline" className="transition-colors hover:text-[var(--fg)]">
                  ציר זמן
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-[var(--fg)]">
                  צור קשר
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="mb-4 text-[0.7rem] tracking-[0.14em] uppercase text-[var(--fg-muted)]">
              קשר
            </p>
            <ul className="space-y-3 text-[0.92rem] text-[var(--fg-soft)]">
              <li>
                <a
                  href="mailto:studio.aviya1@gmail.com"
                  className="transition-colors hover:text-[var(--fg)]"
                >
                  studio.aviya1@gmail.com
                </a>
              </li>
              <li>ישראל</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="shell mt-14 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-[0.78rem] text-[var(--fg-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} AVIYA Studio. כל הזכויות שמורות.</p>
        <p>נבנה בדיוק · ביצועים · נגישות</p>
      </div>
    </footer>
  );
}
