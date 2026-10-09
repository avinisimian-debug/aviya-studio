import Link from "next/link";
import { faqs, fitNo, fitYes, method, principles, SERVICES } from "@/data/studio-site";
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
          <p className="eyebrow">
            <span className="brand-latin">AVIYA</span>
            <span>סטודיו דיגיטלי · ישראל</span>
          </p>
          <h1>נוכחות שקטה. פנייה ברורה.</h1>
          <p className="lede">
            אביה בונה אתרי תדמית, דפי נחיתה וחנויות לעסקים שכבר עובדים. מסר אחד,
            מובייל שנעים לקרוא, ומסלול אחד ליצירת קשר או לרכישה.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/contact">
              שיחה קצרה
            </Link>
            <Link className="btn btn-ghost" href="/services">
              מה אפשר לבנות
            </Link>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="thesis-title">
        <div className="shell split">
          <h2 id="thesis-title">האתר הוא לא כרטיס ביקור.</h2>
          <p>
            הוא המקום שבו מישהו מחליט אם לפנות. בלי מסר מעל הקיפול, בלי תחושת
            אמון, ובלי פעולה אחת ברורה — נשאר עמוד שנראה בסדר, ולא עובד כשהלקוח
            כבר השווה אתכם למישהו אחר.
          </p>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="shift-title">
        <div className="shell">
          <h2 id="shift-title">מה משתנה כשהעמוד בנוי נכון</h2>
          <div className="two">
            <article>
              <h3>המצב</h3>
              <p>
                אינסטגרם מביא תשומת לב. הוא לא נכס, וגוגל לא קורא סטורי. אתר ישן
                או תבנית גנרית משדרים היסוס עוד לפני השיחה.
              </p>
            </article>
            <article>
              <h3>ההזזה</h3>
              <p>
                מסר אחד, קהל אחד, פעולה אחת. עיצוב שמרגיש כמו העסק. הבעלות נשארת
                אצלכם — גם אחרי ההשקה.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="principles-title">
        <div className="shell">
          <h2 id="principles-title">עקרונות</h2>
          <ol className="principle-list">
            {principles.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="services-title">
        <div className="shell">
          <div className="section-head">
            <h2 id="services-title">שירותים</h2>
            <Link href="/services">כל השירותים</Link>
          </div>
          <ul className="card-grid">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link className="text-card" href={`/services/${service.slug}`}>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="method-title">
        <div className="shell">
          <div className="section-head">
            <h2 id="method-title">איך עובדים</h2>
            <Link href="/about">התהליך המלא</Link>
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

      <section className="band band-muted" aria-labelledby="work-title">
        <div className="shell split">
          <h2 id="work-title">עבודות</h2>
          <div>
            <p>
              אין כאן לקוחות, לוגואים או תוצאות שלא קיימים. כשיהיה פרויקט שאפשר
              להראות עם ההקשר שלו — הוא יופיע בעמוד העבודות.
            </p>
            <p>
              <Link href="/work">לעמוד העבודות</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="band band-ink" aria-labelledby="fit-title">
        <div className="shell">
          <h2 id="fit-title">זה לא מתאים לכל אחד</h2>
          <div className="two">
            <div>
              <h3>פחות מתאים אם</h3>
              <ul>
                {fitNo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>מתאים אם</h3>
              <ul>
                {fitYes.map((item) => (
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
          <p className="closing">
            שיחה ראשונה בלי התחייבות. <Link href="/contact">השאירו פרטים</Link>
          </p>
        </div>
      </section>
    </>
  );
}
