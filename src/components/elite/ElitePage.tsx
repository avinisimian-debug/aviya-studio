"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Container,
  MediaFrame,
  Section,
  SectionHead,
  Split,
} from "@/components/elite/layout";
import { SalesLeadForm } from "@/components/landing/SalesLeadForm";
import { eliteMedia } from "@/data/elite-media";

/* ═══════════════════════════════════════════════════════════
   Aviya — Direct-Response conversion page
   High-ticket agency voice · Hebrew · sharp · confident
   Visual: Awwwards-level media polish
   ═══════════════════════════════════════════════════════════ */

const CTA_PRIMARY = "רוצה שנחזור אליך?";
const CTA_SECONDARY = "למה מאבדים לקוחות בלי אתר";
const NAV_CONTACT = "השארת פרטים";
const FORM_HINT_HERO = (
  <>
    רק שם, טלפון ושם עסק.
    <br />
    <strong>נחזור בהקדם — בלי התחייבות.</strong>
  </>
);
const FORM_HINT_FINAL = (
  <>
    מלאו 3 שדות קצרים.
    <br />
    <strong>אנחנו חוזרים. אתם מחליטים.</strong>
  </>
);

function Progress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setP(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="elite-progress"
      role="progressbar"
      aria-valuenow={Math.round(p)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="התקדמות בדף"
    >
      <i style={{ width: `${p}%` }} />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`elite-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="elite-nav-inner">
        <a href="#top" className="elite-nav-brand">
          AVIYA
        </a>
        <nav className="elite-nav-links" aria-label="ניווט ראשי">
          <a href="#problem">המחיר של אין אתר</a>
          <a href="#solution">הפתרון</a>
          <a href="#process">תהליך</a>
          <a href="#contact">{NAV_CONTACT}</a>
        </nav>
        <Button href="#contact" variant="primary">
          {CTA_PRIMARY}
        </Button>
      </div>
    </header>
  );
}

/** 1 — HERO */
function Hero() {
  return (
    <Section id="top" className="elite-hero elite-section--flush" tight>
      <div className="elite-hero-bg" aria-hidden />
      <Container>
        <div className="elite-hero-grid">
          <div className="elite-hero-copy">
            <p className="elite-kicker">בניית אתרים לעסקים · Aviya</p>
            <h1 className="elite-h1">
              העסק שלך מפסיד לקוחות — בכל יום שאין לו אתר שמוכר בשבילו
            </h1>
            <p className="elite-lead">
              אנחנו בונים אתרים מודרניים שממירים: מסר חד, אמון בשניות, ומסלול ברור
              לפנייה. לא ״עוד אתר״. מכונת מכירות שעובדת בזמן שאתם בעבודה.
            </p>
            <div className="elite-btn-row">
              <Button href="#contact" variant="accent">
                {CTA_PRIMARY}
              </Button>
              <Button href="#problem" variant="ghost">
                {CTA_SECONDARY}
              </Button>
            </div>
            <div className="elite-hero-form-wrap" id="hero-form">
              <SalesLeadForm
                idPrefix="hero"
                source="hero"
                withBusiness
                title={FORM_HINT_HERO}
                cta="שלחו — ונחזור אליכם"
                namePh="שם מלא"
                phonePh="טלפון"
                businessPh="שם העסק"
                className="elite-lead-form"
              />
            </div>
          </div>

          <div className="elite-hero-visual">
            <div className="elite-media-float">
              <MediaFrame
                variant="browser"
                domain="yourbrand.co.il"
                label="תצוגת מוצר — דשבורד המרה"
                src={eliteMedia.heroDashboard}
                alt="דשבורד אנליטיקה מודרני — צמיחה דיגיטלית"
                priority
              />
              <div className="elite-float-chip elite-float-chip--a" aria-hidden>
                + לידים
              </div>
              <div className="elite-float-chip elite-float-chip--b" aria-hidden>
                24/7
              </div>
            </div>
            <p className="elite-hero-cap">
              אתר ברמת מותג · בנוי להמרה · בבעלותכם המלאה
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function TrustStrip() {
  return (
    <div className="elite-trust" aria-label="למי זה">
      <Container>
        <div className="elite-trust-inner">
          <p className="elite-trust-label">
            לעסקים שכבר עובדים — ולא יכולים להרשות לעצמם להיראות ״לא רציניים״
            אונליין
          </p>
          <ul className="elite-trust-row">
            <li>שירותים מקצועיים</li>
            <li>קליניקות</li>
            <li>B2B</li>
            <li>קמעונאות</li>
            <li>מותגים מקומיים</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

/** 2 — THE PROBLEM */
function Problem() {
  return (
    <Section id="problem" tone="muted">
      <Container>
        <Split
          className="elite-split--elevated"
          media={
            <div className="elite-pain-visual">
              <MediaFrame
                variant="wide"
                label="רגע האמת בגוגל"
                src={eliteMedia.analytics}
                alt="מסך אנליטיקה עסקי — מה הלקוח רואה כשמחפש אתכם"
              />
              <p className="elite-pain-caption">
                רגע האמת: עשר שניות בגוגל — והעסקה כבר הוכרעה.
              </p>
            </div>
          }
        >
          <p className="elite-kicker">המחיר האמיתי</p>
          <h2 className="elite-h2">
            בלי אתר מודרני — אתם לא ״חוסכים״. אתם משלמים בלקוחות
          </h2>
          <p className="elite-p">
            הלקוח הרציני בודק אתכם לפני שהוא מתקשר. מה שהוא מוצא (או לא מוצא)
            קובע אם תקבלו שיחה — או שהמתחרה יקבל אותה.
          </p>

          <ol className="elite-pain-list">
            <li>
              <span className="elite-pain-n" aria-hidden>
                01
              </span>
              <div>
                <h3>אמון מתרסק בשנייה</h3>
                <p>
                  מחפשים אתכם — ומגיעים לכלום, לפייסבוק ישן, או לאתר מת של
                  2017. המסר שאתם משדרים: ״אולי לא שווה לסמוך.״
                </p>
              </div>
            </li>
            <li>
              <span className="elite-pain-n" aria-hidden>
                02
              </span>
              <div>
                <h3>תלויים באלגוריתם — בלי נכס</h3>
                <p>
                  אינסטגרם ופייסבוק משתנים בלי לשאול. חשיפה יורדת — ומכירות
                  איתן. אתר שלכם הוא נכס. רשתות הן שכירות.
                </p>
              </div>
            </li>
            <li>
              <span className="elite-pain-n" aria-hidden>
                03
              </span>
              <div>
                <h3>המתחרה נראה יותר מקצועי — והוא זוכה</h3>
                <p>
                  אותו שירות. לעיתים אפילו מחיר גבוה יותר. אבל האתר שלו משדר
                  רצינות. שלכם — לא. ההחלטה של הלקוח כבר נגמרה.
                </p>
              </div>
            </li>
          </ol>
        </Split>
      </Container>
    </Section>
  );
}

/** 3 — SOLUTION + VALUE (Before / After + 24/7 salesperson) */
function Solution() {
  return (
    <Section id="solution">
      <Container>
        <SectionHead
          kicker="הפתרון"
          title="מהקצה הנכון: אתר שמוכר — 24 שעות ביממה"
          lead="לא עיצוב יפה ש״יש לכם אתר״. מערכת שמביאה פניות כשאתם ישנים, בנסיעה, ובפגישות."
        />

        <div className="elite-ba" aria-label="לפני ואחרי">
          <div className="elite-ba-col elite-ba-before">
            <p className="elite-ba-label">לפני</p>
            <ul>
              <li>״יש לי אינסטגרם״ — ואין איפה לסגור אמון</li>
              <li>אתר ישן / איטי / מבולבל — שורף פניות</li>
              <li>הלקוח לא מבין למה לבחור בכם</li>
              <li>תלויים בחברים, וואטסאפ, ומזל</li>
            </ul>
          </div>
          <div className="elite-ba-col elite-ba-after">
            <p className="elite-ba-label">אחרי Aviya</p>
            <ul>
              <li>מסר חד מעל הקיפול — תוך 3 שניות ברור מי אתם</li>
              <li>עיצוב ברמת מותג + מובייל שעובד באמת</li>
              <li>מסלול ברור: שיחה · טופס · וואטסאפ · רכישה</li>
              <li>נכס בבעלותכם — לא תלוי באלגוריתם</li>
            </ul>
          </div>
        </div>

        <div className="elite-value-grid">
          <article className="elite-surface elite-value-card elite-img-card">
            <div className="elite-img-card-media">
              <MediaFrame
                variant="default"
                src={eliteMedia.growth}
                alt="צמיחה דיגיטלית — אתר שעובד מסביב לשעון"
              />
            </div>
            <div className="elite-img-card-body">
              <h3>איש מכירות שלא עוזב את המשמרת</h3>
              <p>
                האתר מסביר, משכנע, וסוגר פנייה — גם ב־02:00. בלי חופשות. בלי
                ״אחזור אליך.״
              </p>
            </div>
          </article>
          <article className="elite-surface elite-value-card elite-img-card">
            <div className="elite-img-card-media">
              <MediaFrame
                variant="default"
                src={eliteMedia.laptopUi}
                alt="ממשק אתר מודרני — אמון לפני השיחה"
              />
            </div>
            <div className="elite-img-card-body">
              <h3>אמון לפני השיחה הראשונה</h3>
              <p>
                הוכחות, תהליך, מסר מקצועי. הלקוח מגיע אליכם כבר חצי־משוכנע — לא
                סקפטי.
              </p>
            </div>
          </article>
          <article className="elite-surface elite-value-card elite-img-card">
            <div className="elite-img-card-media">
              <MediaFrame
                variant="default"
                src={eliteMedia.designCraft}
                alt="עיצוב UI מקצועי — השקעה שמחזירה"
              />
            </div>
            <div className="elite-img-card-body">
              <h3>השקעה, לא הוצאה שורפת</h3>
              <p>
                אתר שמביא לידים משלם על עצמו. אתר שלא — עולה לכם בכל לקוח שהלך
                למתחרה.
              </p>
            </div>
          </article>
        </div>

        {/* Editorial split: craft proof */}
        <div className="elite-story-block">
          <Split
            reverse
            className="elite-split--elevated"
            media={
              <MediaFrame
                variant="browser"
                domain="studio.aviya"
                label="תצוגת אתר ברמת מותג"
                src={eliteMedia.workspace}
                alt="סביבת עבודה מודרנית — נוכחות דיגיטלית ברמה"
              />
            }
          >
            <p className="elite-kicker">המוצר הדיגיטלי שלכם</p>
            <h2 className="elite-h2">נראה כמו מותג. עובד כמו מכונת פניות.</h2>
            <p className="elite-p">
              פריימים נקיים, טיפוגרפיה חדה, מבנה שמנצח במובייל — כי כאן רוב
              הלקוחות מחליטים.
            </p>
            <div className="elite-btn-row">
              <Button href="#contact" variant="primary">
                {CTA_PRIMARY}
              </Button>
            </div>
          </Split>
        </div>

        <div className="elite-solution-cta">
          <Button href="#contact" variant="accent">
            {CTA_PRIMARY}
          </Button>
          <p className="elite-solution-micro">
            3 שדות. בלי לחץ. אנחנו חוזרים — אתם מחליטים.
          </p>
        </div>
      </Container>
    </Section>
  );
}

/** Supporting — process (tight, professional) */
function Process() {
  return (
    <Section id="process" tone="muted">
      <Container>
        <SectionHead
          kicker="איך זה עובד"
          title="פשוט. מהיר. בלי פרויקט אינסופי."
          lead="אתם בעסק. אנחנו בבנייה. עולים לאוויר עם מערכת שמוכנה לקבל לקוחות."
        />
        <ol className="elite-steps">
          <li>
            <h3>משאירים פרטים</h3>
            <p>
              שם, טלפון ושם עסק. אנחנו חוזרים להבין את הכיוון — בלי התחייבות
              ובלי ז׳רגון.
            </p>
          </li>
          <li>
            <h3>בנייה ברמה</h3>
            <p>
              עיצוב, מבנה המרה, מובייל, SEO בסיסי. האתר נראה כמו מותג ומתנהג כמו
              מכונת פניות.
            </p>
          </li>
          <li>
            <h3>השקה + שליטה</h3>
            <p>
              עולים לאוויר. אתם יודעים לקבל לקוחות. הבעלות 100% שלכם.
            </p>
          </li>
        </ol>
      </Container>
    </Section>
  );
}

/** 4 — FINAL CTA */
function FinalCta() {
  return (
    <Section id="contact" tone="inverse">
      <Container>
        <div className="elite-final">
          <p className="elite-kicker">רגע אחד</p>
          <h2 className="elite-h2">
            עוד יום בלי אתר שעובד — זה עוד יום שמשלמים למתחרה
          </h2>
          <p className="elite-lead">
            אל תתנו ל״אחר כך״ לסגור לכם עסקאות. השאירו פרטים — נחזור אליכם מהר,
            ברור, בלי לחץ.
          </p>
          <div className="elite-final-form-wrap">
            <SalesLeadForm
              idPrefix="final"
              source="final"
              variant="soft"
              withBusiness
              title={FORM_HINT_FINAL}
              cta="שלחו — ונחזור אליכם"
              namePh="שם מלא"
              phonePh="טלפון"
              businessPh="שם העסק"
              className="elite-lead-form elite-lead-form--dark"
            />
          </div>
          <p className="elite-final-reassure">
            בלי ספאם. בלי חיוב. רק שיחה אם זה מתאים לשני הצדדים.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="elite-footer">
      <Container>
        <div className="elite-footer-inner">
          <p className="elite-footer-brand">AVIYA</p>
          <p className="elite-footer-meta">
            אתרים שמביאים לקוחות. בעלות מלאה. רמה של מותג.
          </p>
          <div className="elite-footer-links">
            <a href="#top">למעלה</a>
            <a href="#problem">הבעיה</a>
            <a href="#solution">הפתרון</a>
            <a href="/accessibility">נגישות</a>
            <a href="mailto:studio.aviya1@gmail.com">studio.aviya1@gmail.com</a>
          </div>
          <p className="elite-footer-meta">
            © {new Date().getFullYear()} Aviya
          </p>
        </div>
      </Container>
    </footer>
  );
}

function MobileCta() {
  return (
    <div className="elite-mobile-cta">
      <Button href="#contact" variant="accent">
        {CTA_PRIMARY}
      </Button>
    </div>
  );
}

export default function ElitePage() {
  return (
    <div className="elite-page">
      <Progress />
      <a href="#main" className="skip-link">
        דלג לתוכן
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Problem />
        <Solution />
        <Process />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
