import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { LANDING } from "@/data/landing";

/** Shared chrome for secondary pages (about, contact, privacy, etc.) */
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
        <nav aria-label="ניווט משני">
          <Link href="/">בית</Link>
          <Link href="/about">אודות</Link>
          <Link href="/#gallery">תבניות</Link>
          <Link href="/contact">יצירת קשר</Link>
          <a
            href={LANDING.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            וואטסאפ
          </a>
        </nav>
      </header>

      <main id="page-main" className="site-chrome-main">
        {title ? <h1 className="site-chrome-h1">{title}</h1> : null}
        {children}
      </main>

      <footer className="site-chrome-footer">
        <div>
          <p className="site-chrome-footer-brand">AVIYA</p>
          <p>{LANDING.promise}</p>
        </div>
        <nav aria-label="קישורי תחתית">
          <Link href="/about">אודות</Link>
          <Link href="/contact">יצירת קשר</Link>
          <Link href="/privacy">פרטיות</Link>
          <Link href="/accessibility">נגישות</Link>
          <a href={LANDING.emailUrl}>{LANDING.email}</a>
        </nav>
        <p>© {new Date().getFullYear()} Aviya</p>
      </footer>
    </div>
  );
}
