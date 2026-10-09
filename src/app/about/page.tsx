import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { aboutStory, method, principles } from "@/data/studio-site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "אודות ותהליך",
  description:
    "אביה, מייסד הסטודיו. בן 17, יותר משנה בבניית אתרים. תהליך קצר: אפיון, בנייה, השקה. בלי מוקד ובלי בעלות נעולה.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteFrame>
      <header className="page-hero">
        <div className="shell">
          <Breadcrumbs
            items={[
              { name: "בית", path: "/" },
              { name: "אודות", path: "/about" },
            ]}
          />
          <h1>שלום, אני אביה</h1>
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
            <p>בן 17. בשטח כבר יותר משנה. בונה אתרים וחנויות, ומדבר ישירות עם מי שפונה.</p>
            {aboutStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="band band-muted" aria-labelledby="process-title">
        <div className="shell">
          <h2 id="process-title">התהליך</h2>
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
      <section className="band" aria-labelledby="about-principles">
        <div className="shell">
          <h2 id="about-principles">איך זה מרגיש בפועל</h2>
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
          <p>
            <Link className="btn btn-primary" href="/contact">
              לדבר על כיוון
            </Link>
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
