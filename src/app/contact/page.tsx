import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { SalesLeadForm } from "@/components/landing/SalesLeadForm";
import { contactPage } from "@/data/site-content";
import { LANDING } from "@/data/landing";

export const metadata: Metadata = {
  title: "יצירת קשר",
  description:
    "צרו קשר עם Aviya — השאירו פרטים לבניית אתר או חנות דיגיטלית. וואטסאפ 055-557-3090 · studio.aviya1@gmail.com",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "יצירת קשר | Aviya",
    description: contactPage.lead,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <SiteChrome title={contactPage.title}>
      <p className="site-kicker">{contactPage.kicker}</p>
      <p className="site-lead">{contactPage.lead}</p>

      <div className="site-contact-grid">
        <div className="elite-page site-contact-card">
          <SalesLeadForm
            idPrefix="contact-page"
            source="contact-page"
            withBusiness
            title={
              <>
                השאירו פרטים — <strong>נחזור אליכם</strong>
              </>
            }
            cta="שלחו — ונחזור אליכם"
            namePh="איך קוראים לך?"
            phonePh="מה המספר שלך?"
            businessPh="שם העסק"
            className="elite-lead-form"
          />
        </div>

        <aside className="site-contact-aside" aria-label="פרטי קשר">
          <h2>ערוצים ישירים</h2>
          <ul className="site-contact-list">
            <li>
              <span>וואטסאפ</span>
              <a
                href={LANDING.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                055-557-3090
              </a>
            </li>
            <li>
              <span>טלפון</span>
              <a href="tel:+972555573090" dir="ltr">
                055-557-3090
              </a>
            </li>
            <li>
              <span>מייל</span>
              <a href={LANDING.emailUrl}>{LANDING.email}</a>
            </li>
            <li>
              <span>אינסטגרם</span>
              <a
                href={LANDING.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {LANDING.instagramHandle}
              </a>
            </li>
          </ul>
          <p className="site-contact-hours">{contactPage.hours}</p>
          <p className="site-contact-note">
            הפרטים משמשים רק לחזרה אליכם. ראו{" "}
            <a href="/privacy">מדיניות פרטיות</a>.
          </p>
        </aside>
      </div>
    </SiteChrome>
  );
}
