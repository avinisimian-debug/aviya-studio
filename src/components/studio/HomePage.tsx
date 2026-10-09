import Link from "next/link";
import { concepts } from "@/data/concepts";
import { homeFaqs, stages, standards } from "@/data/depth";
import { fitNo, fitYes, principles, SERVICES } from "@/data/studio-site";
import { ConceptGallery } from "@/components/studio/ConceptGallery";
import { LdJson } from "@/components/studio/LdJson";

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
            <p className="eyebrow">
              <span className="brand-latin">AVIYA</span>
              <span>סטודיו דיגיטלי · ישראל</span>
            </p>
            <h1>לא רק אתר. חוויה דיגיטלית שמקדמת את העסק.</h1>
            <p className="lede">
              אביה מתכנן ובונה אתרי תדמית, דפי נחיתה וחנויות לעסקים שכבר עובדים.
              העמוד נפתח במסר אחד, נקרא בטלפון, ונגמר בפנייה, בשיחה או ברכישה.
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
              <p className="marker">
                <span className="brand-latin">01</span>
                <span>כיוון</span>
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
            <p>משם נגזרים המבנה, המובייל, והטופס. לא להפך.</p>
          </div>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="services-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="marker">
                <span className="brand-latin">02</span>
                <span>שירותים</span>
              </p>
              <h2 id="services-title">מה אפשר לבנות</h2>
            </div>
            <p>
              שישה מבנים. הטווח הטיפוסי וההתאמה נמצאים בכל עמוד. המחיר יוצא בהצעה
              כתובה, אחרי שיחה.
            </p>
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
          <p className="after-link">
            <Link href="/services">פירוט, טווחים, ומה נמסר</Link>
          </p>
        </div>
      </section>

      <section className="band" aria-labelledby="principles-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">03</span>
            <span>אופן העבודה</span>
          </p>
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

      <section className="band band-muted" id="process" aria-labelledby="method-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="marker">
                <span className="brand-latin">04</span>
                <span>תהליך</span>
              </p>
              <h2 id="method-title">ארבעה שלבים, מהשיחה ועד ההעברה.</h2>
            </div>
            <p>
              הטווחים טיפוסיים. הם לא תאריך מובטח, והם זזים אם אין טקסט, תמונות
              או גישה לדומיין. מה מקבלים בכל שלב מפורט בעמוד האודות.
            </p>
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
                <span className="brand-latin">05</span>
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
            <span className="brand-latin">06</span>
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
            <span className="brand-latin">07</span>
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
              אם שליחת המייל מהשרת עדיין לא מחוברת, אפשר לפתוח וואטסאפ או אימייל
              עם אותם פרטים.
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
