import Link from "next/link";
import { phoneHref, publicPhone, whatsappHref } from "@/lib/contact-channels";

export function StickyContact() {
  const tel = phoneHref();
  const phone = publicPhone();
  const whatsapp = whatsappHref();

  return (
    <div className="sticky-contact" role="region" aria-label="יצירת קשר מהירה">
      <Link href="/contact#inquiry">פנייה</Link>
      {tel && phone ? <a href={tel}>טלפון</a> : null}
      {whatsapp ? (
        <a href={whatsapp} target="_blank" rel="noopener noreferrer">
          וואטסאפ
        </a>
      ) : null}
    </div>
  );
}
