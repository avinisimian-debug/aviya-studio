import Link from "next/link";
import { brand } from "@/data/studio-site";
import { phoneHref, publicEmail, publicPhone, whatsappHref } from "@/lib/contact-channels";

export function Footer() {
  const phone = publicPhone();
  const tel = phoneHref();
  const whatsapp = whatsappHref();
  const email = publicEmail();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="brand-latin footer-brand">AVIYA</p>
          <p className="footer-note">
            סטודיו דיגיטלי. אתרי תדמית, דפי נחיתה וחנויות — מובייל קודם, בעלות מלאה.
          </p>
        </div>
        <nav aria-label="קישורי תחתית">
          <Link href="/services">שירותים</Link>
          <Link href="/work">עבודות</Link>
          <Link href="/about">אודות ותהליך</Link>
          <Link href="/contact">יצירת קשר</Link>
          <Link href="/guides">מדריכים</Link>
          <Link href="/for">לפי סוג עסק</Link>
          <Link href="/privacy">פרטיות</Link>
          <Link href="/accessibility">נגישות</Link>
        </nav>
        <div className="footer-contact">
          <a href={`mailto:${email}`}>{email}</a>
          {tel && phone ? <a href={tel}>{phone}</a> : null}
          {whatsapp ? (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              וואטסאפ
            </a>
          ) : null}
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
            {brand.instagramHandle}
          </a>
        </div>
      </div>
      <p className="shell footer-copy">© {year} Aviya Studio</p>
    </footer>
  );
}
