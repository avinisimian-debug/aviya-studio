import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { InquiryForm } from "@/components/studio/InquiryForm";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { terms } from "@/data/depth";
import { phoneHref, publicEmail, publicPhone, whatsappHref } from "@/lib/contact-channels";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "יצירת קשר",
  description:
    "טופס קצר: שם, טלפון או אימייל, ומה צריך. יעד מענה תוך יום עסקים בימים א׳–ה׳. טלפון, וואטסאפ, ומה קורה אחרי השליחה.",
  path: "/contact",
});

export default function ContactPage() {
  const phone = publicPhone();
  const tel = phoneHref();
  const whatsapp = whatsappHref();
  const email = publicEmail();

  return (
    <SiteFrame>
      <header className="page-hero page-hero-dark">
        <div className="shell">
          <Breadcrumbs
            items={[
              { name: "בית", path: "/" },
              { name: "יצירת קשר", path: "/contact" },
            ]}
          />
          <p className="marker">
            <span className="brand-latin">AVIYA</span>
            <span>פנייה</span>
          </p>
          <h1>יצירת קשר</h1>
          <p>
            שם, דרך לחזור אליכם, ומה צריך. ימים א׳–ה׳. היעד הוא מענה תוך יום
            עסקים. זה יעד עבודה, לא התחייבות להודעה שנשלחת בשישי בלילה. העבודה
            מרחוק, לכל הארץ. שליחת הטופס אינה סגירת עבודה.
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
            <p>
              אם שליחת המייל מהשרת מחוברת, הפנייה מגיעה לתיבת הפניות. אם לא,
              אחרי בדיקת הטופס נפתחים וואטסאפ או אימייל עם אותו טקסט.
            </p>
          </aside>
        </div>
      </section>
      <section className="band band-muted" id="terms" aria-labelledby="terms-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">01</span>
            <span>אחרי השליחה</span>
          </p>
          <h2 id="terms-title">מה קורה אחר כך</h2>
          <ol className="term-list">
            {terms.map((item) => (
              <li key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="after-link">
            <Link href="/about#process">התהליך המלא, כולל מה מקבלים בכל שלב</Link>
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
