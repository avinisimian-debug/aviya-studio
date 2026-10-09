import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { InquiryForm } from "@/components/studio/InquiryForm";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { phoneHref, publicEmail, publicPhone, whatsappHref } from "@/lib/contact-channels";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "יצירת קשר",
  description:
    "השאירו שם, טלפון או אימייל, ומה צריך. Aviya חוזר עם כיוון קצר. בלי התחייבות מראש.",
  path: "/contact",
});

export default function ContactPage() {
  const phone = publicPhone();
  const tel = phoneHref();
  const whatsapp = whatsappHref();
  const email = publicEmail();

  return (
    <SiteFrame>
      <header className="page-hero">
        <div className="shell">
          <Breadcrumbs
            items={[
              { name: "בית", path: "/" },
              { name: "יצירת קשר", path: "/contact" },
            ]}
          />
          <h1>יצירת קשר</h1>
          <p>
            טופס קצר. ימים א׳–ה׳, בדרך כלל מענה תוך יום עסקים. עבודה מרחוק לכל
            הארץ.
          </p>
        </div>
      </header>
      <section className="band" aria-labelledby="form-title">
        <div className="shell contact-layout">
          <div>
            <h2 id="form-title">השארת פרטים</h2>
            <InquiryForm source="contact-page" />
          </div>
          <aside className="contact-aside" aria-label="ערוצים ישירים">
            <h2>ערוצים ישירים</h2>
            <a href={`mailto:${email}`}>{email}</a>
            {tel && phone ? <a href={tel}>טלפון {phone}</a> : null}
            {whatsapp ? (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                וואטסאפ
              </a>
            ) : null}
            {!tel && !whatsapp ? (
              <p>טלפון ווואטסאפ יופיעו כאן אחרי שיוגדרו בשרת.</p>
            ) : null}
          </aside>
        </div>
      </section>
    </SiteFrame>
  );
}
