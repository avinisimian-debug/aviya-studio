import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { LdJson } from "@/components/studio/LdJson";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { faqs, stages, standards, terms } from "@/data/depth";
import { aboutStory, brand, principles } from "@/data/studio-site";
import { publicPhone } from "@/lib/contact-channels";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "אודות, תהליך ותנאי עבודה",
  description:
    "אביה, מייסד הסטודיו. בן 17, יותר משנה בבניית אתרים. ארבעה שלבי עבודה, מה נמסר בכל שלב, סטנדרט טכני, תנאי תשלום ובעלות, ושאלות נפוצות.",
  path: "/about",
});

export default function AboutPage() {
  const phone = publicPhone();
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
    <SiteFrame>
      <LdJson data={faqLd} />
      <header className="page-hero page-hero-dark">
        <div className="shell">
          <Breadcrumbs
            items={[
              { name: "בית", path: "/" },
              { name: "אודות", path: "/about" },
            ]}
          />
          <p className="marker">
            <span className="brand-latin">AVIYA</span>
            <span>הסטודיו</span>
          </p>
          <h1>שלום, אני אביה</h1>
          <p>
            בן 17. בשטח יותר משנה. בונה אתרים וחנויות, ועונה בעצמו. אין מוקד,
            ואין שכבה שמעבירה הודעות.
          </p>
        </div>
      </header>
      <section className="band" aria-labelledby="story-title">
        <div className="shell about-grid">
          <figure className="portrait-card">
            <Image
              src="/brand/aviya-portrait.png"
              alt="אביה, מייסד Aviya Studio, בפורטרט בשחור־לבן"
              width={720}
              height={900}
              priority
              sizes="(max-width: 800px) 100vw, 480px"
            />
            <figcaption>אביה · מייסד הסטודיו</figcaption>
          </figure>
          <div className="prose">
            <h2 id="story-title">האדם שמאחורי העבודה</h2>
            {aboutStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              היקף העבודה מוגבל לעד שמונה עסקים בחודש. זה גבול תפעול, לא מדד של
              תוצאות. העבודה מרחוק, לכל הארץ. אינסטגרם{" "}
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
                {brand.instagramHandle}
              </a>
              {phone ? <>. הטלפון והוואטסאפ {phone} מגיעים אליי.</> : "."}
            </p>
          </div>
        </div>
      </section>
      <section className="band band-muted" id="process" aria-labelledby="process-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">01</span>
            <span>תהליך</span>
          </p>
          <h2 id="process-title">מה קורה, ומה יוצא מכל שלב</h2>
          <p className="caption">
            הטווחים טיפוסיים. הם מתארים עבודה שבה הכיוון והחומרים הבסיסיים כבר
            קיימים. הם לא התחייבות לתאריך.
          </p>
          <ol className="stage-list">
            {stages.map((step) => (
              <li key={step.n}>
                <span className="brand-latin">{step.n}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <ul className="gets">
                    {step.gets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p className="stage-typical">{step.typical}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="band" id="standards" aria-labelledby="standards-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">02</span>
            <span>סטנדרט</span>
          </p>
          <h2 id="standards-title">טכנולוגיה, שפה, והעברה</h2>
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
          <p className="after-link">
            <Link href="/accessibility">הצהרת הנגישות של האתר הזה</Link>
          </p>
        </div>
      </section>
      <section className="band band-muted" id="terms" aria-labelledby="terms-title">
        <div className="shell">
          <p className="marker">
            <span className="brand-latin">03</span>
            <span>תנאים</span>
          </p>
          <h2 id="terms-title">אחרי הפנייה, תשלום, ובעלות</h2>
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
        </div>
      </section>
      <section className="band" aria-labelledby="about-principles">
        <div className="shell">
          <h2 id="about-principles">איך זה מרגיש בפועל</h2>
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
      <section className="band band-muted" id="faq" aria-labelledby="faq-title">
        <div className="shell faq">
          <p className="marker">
            <span className="brand-latin">04</span>
            <span>שאלות</span>
          </p>
          <h2 id="faq-title">שאלות לפני שמתחילים</h2>
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
          <p className="after-link">
            <Link className="btn btn-primary" href="/contact">
              לדבר על כיוון
            </Link>
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
