import Link from "next/link";
import { concepts } from "@/data/concepts";
import { faqs, fitNo, fitYes, method, principles, SERVICES } from "@/data/studio-site";
import { ConceptGallery } from "@/components/studio/ConceptGallery";
import { LdJson } from "@/components/studio/LdJson";

export function HomePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <LdJson data={faqLd} />
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="brand-latin">AVIYA</span>
              <span>סטודיו דיגיטלי · ישראל</span>
            </p>
            <h1>לא רק אתר. חוויה דיגיטלית שמקדמת את העסק.</h1>
            <p className="lede">
              מתכנון המותג ועד לחוויית השימוש והפיתוח. בונים נוכחות שמחברת עיצוב,
              טכנולוגיה, ומסלול ברור לפנייה או לרכישה.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/contact">
                שיחה קצרה
              </Link>
              <Link className="btn btn-ghost" href="/work">
                כיווני עיצוב
              </Link>
            </div>
          </div>
          <div className="hero-stage">
            <div className="hero-frames" aria-hidden="true">
            <div className="hero-frame hero-frame-back">
              <div className="browser">
                <div className="browser-bar">
                  <span />
                  <span />
                  <span />
                  <em>כיוון עיצובי</em>
                </div>
                <div className="stage stage-service">
                  <p>השירות</p>
                  <ol>
                    <li />
                    <li />
                    <li />
                  </ol>
                  <b>פנייה</b>
                </div>
              </div>
            </div>
            <div className="hero-frame hero-frame-front">
              <div className="browser">
                <div className="browser-bar">
                  <span />
                  <span />
                  <span />
                  <em>קונספט</em>
                </div>
                <div className="stage stage-shop">
                  <div className="stage-top">
                    <span>חנות</span>
                    <i />
                  </div>
                  <div className="product-grid">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
            </div>
            <p className="hero-caption">קונספט · לא עבודת לקוח</p>
          </div>
        </div>
      </section>

      <section className="band band-ink" id="portfolio" aria-labelledby="portfolio-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                <span>קונספט</span>
                <span>כיוון עיצובי</span>
              </p>
              <h2 id="portfolio-title">הכיוון קודם לתיק העבודות.</h2>
            </div>
            <p>
              חמישה כיוונים מקוריים, לפי סוג עסק. אין כאן שמות של לקוחות, לוגואים
              או תוצאות. פרויקט אמיתי יסומן אחרת, כשיהיה מה להראות.
            </p>
          </div>
          <ConceptGallery concepts={concepts} />
        </div>
      </section>

      <section className="band" aria-labelledby="thesis-title">
        <div className="shell split">
          <h2 id="thesis-title">האתר הוא הנכס. הרשת היא השכירות.</h2>
          <div>
            <p>
              אינסטגרם מביא תשומת לב. הוא לא מקום לסגור אמון, וגוגל לא קורא סטורי.
              העמוד הראשון צריך להסביר מי אתם, למי זה, ומה עושים עכשיו.
            </p>
            <p>
              משם נגזרים המבנה, המובייל, והטופס. לא להפך.
            </p>
          </div>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="services-title">
        <div className="shell">
          <div className="section-head">
            <h2 id="services-title">מה אפשר לבנות</h2>
            <Link href="/services">כל השירותים</Link>
          </div>
          <ol className="service-index">
            {SERVICES.map((service, index) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  <span className="brand-latin">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band" aria-labelledby="principles-title">
        <div className="shell">
          <h2 id="principles-title">איך זה מרגיש בעבודה</h2>
          <ol className="principle-list">
            {principles.map((item, index) => (
              <li key={item.title}>
                <span className="brand-latin">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="method-title">
        <div className="shell">
          <div className="section-head">
            <h2 id="method-title">שלושה שלבים</h2>
            <Link href="/about">האדם והתהליך</Link>
          </div>
          <ol className="method-list">
            {method.map((step) => (
              <li key={step.n}>
                <span className="brand-latin">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band-ink" aria-labelledby="fit-title">
        <div className="shell">
          <h2 id="fit-title">לא לכל פרויקט</h2>
          <div className="two">
            <div>
              <h3>מתאים אם</h3>
              <ul>
                {fitYes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>פחות מתאים אם</h3>
              <ul>
                {fitNo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="faq-title">
        <div className="shell faq">
          <h2 id="faq-title">לפני שפונים</h2>
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="band band-ink close-band" aria-labelledby="close-title">
        <div className="shell split">
          <h2 id="close-title">שיחה קצרה, בלי התחייבות.</h2>
          <div>
            <p>
              שם, טלפון או אימייל, ומה צריך. אם שליחת המייל מהשרת עדיין לא
              מחוברת, אפשר לפתוח וואטסאפ או אימייל עם אותם פרטים.
            </p>
            <Link className="btn btn-primary" href="/contact">
              ליצירת קשר
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
