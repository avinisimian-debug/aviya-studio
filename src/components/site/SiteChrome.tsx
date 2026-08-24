import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { LANDING } from "@/data/landing";
import { brandVoice } from "@/data/site-content";

/** Shared chrome for secondary pages — aligned with homepage design system */
export function SiteChrome({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="site-shell">
      <a href="#page-main" className="skip-link">
        דלג לתוכן
      </a>
      <header className="site-chrome-nav">
        <Link href="/" className="site-chrome-brand">
          <Image
            src={LANDING.logoSrc}
            alt="Aviya"
            width={120}
            height={36}
            priority
          />
        </Link>
        <nav className="site-chrome-links" aria-label="ניווט משני">
          <Link href="/about">אודות</Link>
          <Link href="/services">שירותים</Link>
          <Link href="/guides">מדריכים</Link>
          <Link href="/contact">יצירת קשר</Link>
          <Link
            href="/contact"
            className="site-btn site-btn--primary site-chrome-cta"
          >
            {brandVoice.ctaNav}
          </Link>
        </nav>
      </header>

      <main id="page-main" className="site-chrome-main">
        {title ? <h1 className="site-chrome-h1">{title}</h1> : null}
        {children}
      </main>

      <footer className="site-chrome-footer">
        <div>
          <p className="site-chrome-footer-brand">AVIYA</p>
          <p>{brandVoice.valueLine}</p>
        </div>
        <nav aria-label="קישורי תחתית">
          <Link href="/">בית</Link>
          <Link href="/about">אודות</Link>
          <Link href="/for">תחומים</Link>
          <Link href="/guides">מדריכים</Link>
          <Link href="/services">שירותים</Link>
          <Link href="/contact">יצירת קשר</Link>
          <Link href="/privacy">פרטיות</Link>
          <Link href="/accessibility">נגישות</Link>
          <a
            href={LANDING.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {brandVoice.ctaSecondary}
          </a>
          <a href={LANDING.emailUrl}>{LANDING.email}</a>
        </nav>
        <p>© {new Date().getFullYear()} Aviya</p>
      </footer>
    </div>
  );
}

/** Shared conversion band for secondary pages */
export function SiteCtaBand({
  note,
}: {
  note?: string;
}) {
  return (
    <div className="site-cta-band">
      <p>{note ?? brandVoice.valueLine}</p>
      <div className="site-cta-row">
        <Link href="/contact" className="site-btn site-btn--primary">
          {brandVoice.ctaPrimary}
        </Link>
        <a
          href={LANDING.whatsappUrl}
          className="site-btn site-btn--ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          {brandVoice.ctaSecondary}
        </a>
      </div>
    </div>
  );
}
