import Link from "next/link";
import { concepts } from "@/data/concepts";
import { deliveryGuarantee, homeFaqs, stages, standards } from "@/data/depth";
import { fitNo, fitYes, hero, principles, SERVICES, valueProps } from "@/data/studio-site";
import { ConceptGallery } from "@/components/studio/ConceptGallery";
import { ConceptStage } from "@/components/studio/ConceptStage";
import { LdJson } from "@/components/studio/LdJson";
import { Reveal } from "@/components/Reveal";

export function HomePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((item) => ({
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
            <Reveal>
              <p className="eyebrow">
                <span className="brand-latin">{hero.eyebrowLabel}</span>
                <span>{hero.eyebrowText}</span>
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1>{hero.title}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="lede">{hero.lede}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="btn-row">
                <Link className="btn btn-primary" href={hero.primary.href}>
                  {hero.primary.label}
                </Link>
                <Link className="btn btn-ghost" href={hero.secondary.href}>
                  {hero.secondary.label}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="hero-trust">
                {hero.trust.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="hero-stage">
            <div className="hero-frames" aria-hidden="true">
              <div className="hero-frame hero-frame-back">
                <div className="browser">
                  <div className="browser-bar">
                    <span />
                    <span />
                    <span />
                    <em>מקרה בוחן</em>
                  </div>
                  <ConceptStage category="service" />
                </div>
              </div>
              <div className="hero-frame hero-frame-front">
                <div className="browser">
                  <div className="browser-bar">
                    <span />
                    <span />
                    <span />
                    <em>מקרה בוחן</em>
                  </div>
                  <ConceptStage category="shop" />
                </div>
              </div>
            </div>
            <p className="hero-caption">חשיבה, מבנה, והמרה — בכל מסך.</p>
          </div>
        </div>
      </section>

      <section className="band band-ink" id="portfolio" aria-labelledby="portfolio-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="marker">
                <span className="brand-latin">01</span>
                <span>מקרי בוחן</span>
              </p>
              <h2 id="portfolio-title">החשיבה מאחורי הפיקסלים.</h2>
            </div>
            <p>
              חמש עבודות ליבה, לפי סוג עסק. כל אחת מוצגת כמו מקרה בוחן אמיתי:
              האתגר העסקי, הפתרון העיצובי, ומנגנון ההמרה. לא קישוט — תכנון.
            </p>
          </div>
          <ConceptGallery concepts={concepts} />
          <p className="folio-note">
            רוצים לראות את העומק המלא, שכבה אחר שכבה?{" "}
            <Link href="/work">לכל מקרי הבוחן</Link>
          </p>
        </div>
      </section>

      <section className="band" aria-labelledby="value-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="marker">
                <span className="brand-latin">02</span>
                <span>למה זה עובד</span>
              </p>
              <h2 id="value-title">האתר הוא הנכס. אנחנו בונים אותו נכון.</h2>
            </div>
            <p>
              אינסטגרם מביא תשומת לב, אבל הוא לא מקום לסגור אמון — וגוגל לא קורא
              סטורי. העמוד שלכם צריך להסביר מי אתם, למי זה, ומה עושים עכשיו.
            </p>
          </div>
          <ul className="value-grid">
            {valueProps.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.06}>
                <div className="value-card">
                  <span className="value-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="services-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="marker">
                <span className="brand-latin">03</span>
                <span>שירותים</span>
              </p>
              <h2 id="services-title">מה אפשר לבנות</h2>
            </div>
            <p>
              שישה מבנים. הטווח המובטח וההתאמה נמצאים בכל עמוד. המחיר יוצא בהצעה
              כתובה, אחרי שיחה.
            </p>
          </div>
          <ol className="service-index">
            {SERVICES.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={index * 0.05}>
                <Link href={`/services/${service.slug}`}>
                  <span className="brand-latin">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
          <p className="after-link">
            <Link href="/services">פירוט, טווחים, ומה נמסר</Link>
          </p>
        </div>
      </section>

      <section className="band" aria-labelledby="principles-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">04</span>
            <span>אופן העבודה</span>
          </p>
          <h2 id="principles-title">איך זה מרגיש בעבודה</h2>
          <ol className="principle-list">
            {principles.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.06}>
                <span className="brand-latin">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band-muted" id="process" aria-labelledby="method-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="marker">
                <span className="brand-latin">05</span>
                <span>תהליך</span>
              </p>
              <h2 id="method-title">ארבעה שלבים, מהשיחה ועד ההעברה.</h2>
            </div>
            <p>
              תהליך שקוף עם טווח זמן מובטח. מה שמקבלים בכל שלב מפורט בעמוד האודות.
            </p>
          </div>
          <div className="guarantee">
            <p className="guarantee-kicker">
              <span className="brand-latin">14</span>
              <span>ימי אספקה</span>
            </p>
            <h3>{deliveryGuarantee.title}</h3>
            <p>{deliveryGuarantee.body}</p>
            <ul>
              {deliveryGuarantee.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <ol className="stage-list">
            {stages.map((step) => (
              <li key={step.n}>
                <span className="brand-latin">{step.n}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
                <p className="stage-typical">{step.typical}</p>
              </li>
            ))}
          </ol>
          <p className="after-link">
            <Link href="/about#process">מה מקבלים בכל שלב</Link>
          </p>
        </div>
      </section>

      <section className="band" aria-labelledby="standards-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="marker">
                <span className="brand-latin">06</span>
                <span>סטנדרט</span>
              </p>
              <h2 id="standards-title">מה נבדק בכל הקמה</h2>
            </div>
            <p>
              לא תעודה ולא הבטחת דירוג. רשימת עבודה שחוזרת על עצמה, גם כשהמבנה
              משתנה מדף לחנות.
            </p>
          </div>
          <ol className="term-list">
            {standards.map((item) => (
              <li key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band-ink" aria-labelledby="fit-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">07</span>
            <span>התאמה</span>
          </p>
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

      <section className="band" id="faq" aria-labelledby="faq-title">
        <div className="shell faq">
          <p className="marker">
            <span className="brand-latin">08</span>
            <span>שאלות</span>
          </p>
          <h2 id="faq-title">לפני שפונים</h2>
          {homeFaqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
          <p className="after-link">
            <Link href="/about#faq">כל השאלות, תנאי העבודה והבעלות</Link>
          </p>
        </div>
      </section>

      <section className="band band-ink close-band" aria-labelledby="close-title">
        <div className="shell split">
          <h2 id="close-title">שיחה קצרה, בלי התחייבות.</h2>
          <div>
            <p>
              שם, טלפון או אימייל, ומה צריך. ימים א׳–ה׳, יעד מענה תוך יום עסקים.
              נחזור עם כיוון, טווח זמן מובטח, והצעה כתובה — לא עם מכירה בלחיצה.
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
