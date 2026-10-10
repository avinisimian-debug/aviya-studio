import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const LIVE_URL = "https://website-ecru-iota-36.vercel.app";

const deliverables = [
  { label: "ארכיטקטורת ממשק", en: "UI/UX Architecture" },
  { label: "הנדסת קוד מאפס ב-Next.js", en: "Bespoke Engineering" },
  { label: "ביצועים וטעינה מיידית", en: "Zero-Bloat Performance" },
  { label: "מוקד המרות לעסקאות High-Ticket", en: "Qualified Lead Flow" },
] as const;

const facts = [
  { k: "נכס", v: "חוויית מותג ופלטפורמת מכירה" },
  { k: "תחום", v: "מטבחי יוקרה בהתאמה אישית" },
  { k: "הנדסה", v: "Next.js מאפס, אפס תבניות" },
] as const;

export function FlagshipCase() {
  return (
    <section className="band band-ink flagship" id="luxora" aria-labelledby="luxora-title">
      <div className="shell">
        <div className="flagship-head">
          <Reveal>
            <p className="marker">
              <span className="brand-latin">FEATURED WORK</span>
              <span>נכסים דיגיטליים שנבנו</span>
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="luxora-title" className="flagship-title">
              לקסורה <span className="flagship-slash">/</span>{" "}
              <span className="brand-latin">LUXORA</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="flagship-sub">
              חוויית מותג דיגיטלית ופלטפורמת מכירה למטבחי יוקרה בהתאמה אישית.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16} y={20}>
          <figure className="flagship-stage">
            <div className="flagship-frame">
              <div className="flagship-chrome" aria-hidden="true">
                <span className="flagship-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="flagship-url">
                  <span className="brand-latin">LUXORA</span>
                  <span>עיצוב מטבחים בהתאמה אישית</span>
                </span>
              </div>
              <div className="flagship-shot">
                <Image
                  src="/projects/luxora-hero.webp"
                  alt="מסך הבית של LUXORA — חוויית מותג דיגיטלית ופלטפורמת מכירה למטבחי יוקרה בהתאמה אישית"
                  width={1440}
                  height={977}
                  priority
                  sizes="(min-width: 1180px) 1180px, 100vw"
                  className="flagship-img"
                />
              </div>
            </div>
            <figcaption className="flagship-caption">צילום מסך מהנכס החי.</figcaption>
          </figure>
        </Reveal>

        <div className="flagship-body">
          <Reveal className="flagship-deliverables">
            <h3>מה נבנה מאפס</h3>
            <ul>
              {deliverables.map((item, index) => (
                <li key={item.en}>
                  <span className="flagship-idx brand-latin">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flagship-deliverable">
                    <b>{item.label}</b>
                    <em>{item.en}</em>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06} className="flagship-copy">
            <p>
              ללקסורה לא היה חסר עוד דף מקוון — היה חסר נכס שמוכר. בנינו הכול מאפס:
              ארכיטקטורת מידע שמארגנת סוגי פרויקטים וטווחי מחיר, שפה חזותית שמשדרת
              חומר, גימור ודיוק, ומסלול שמכוון את הלקוח הנכון לפגישת ייעוץ — בלי רעש,
              בלי הבטחות מוגזמות.
            </p>
            <p>
              התוצאה היא מותג נגרות יוקרה שמציג את עצמו כמו מותג, מדבר בשפה של
              מעצבים, ומוביל לעסקאות בקצב שמתאים למחיר — לא עוד עמוד שמחכה שיעברו
              דרכו.
            </p>
            <ul className="flagship-facts">
              {facts.map((fact) => (
                <li key={fact.k}>
                  <span>{fact.k}</span>
                  <b>{fact.v}</b>
                </li>
              ))}
            </ul>
            <a
              className="btn btn-primary flagship-live"
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              לצפייה בנכס החי <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
