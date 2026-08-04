"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { BrandLogo } from "@/components/BrandLogo";
import {
  aboutStripBody,
  aboutStripTitle,
  craftSignals,
  faqTitle,
  faqs,
  finalSub,
  finalTitle,
  fitKicker,
  fitNo,
  fitNoTitle,
  fitTitle,
  fitYes,
  fitYesEnd,
  fitYesTitle,
  heroBrandLine,
  heroCta,
  heroEyebrow,
  heroFormTitle,
  heroFormTitleEm,
  heroHeadlineBefore,
  heroHeadlineEm1,
  heroHeadlineEm2,
  heroHeadlineMid,
  heroNamePh,
  heroPhonePh,
  heroQualifier,
  heroSub,
  includes,
  includesLead,
  includesNote,
  includesTitle,
  LANDING,
  midJumpDefault,
  midJumpDetails,
  midJumpStart,
  navCta,
  photos,
  processLead,
  processSteps,
  processTitle,
  productPillars,
  promiseClose,
  promiseLead,
  promiseTitle,
  showcaseLead,
  showcases,
  showcaseTitle,
  socialLead,
  socialTitle,
  storyBeats,
  storyClose,
  storyMaybe,
  storyMaybeTitle,
  templateSystems,
  testimonials,
  trustBody,
  trustTitle,
} from "@/data/landing";
import { SalesLeadForm } from "@/components/landing/SalesLeadForm";
import { SocialLinks } from "@/components/SocialLinks";
import { SeoContentBlock } from "@/components/seo/SeoContentBlock";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          window.setTimeout(() => el.classList.add("in"), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function MidJump({
  label = midJumpDefault,
  soft = false,
}: {
  label?: string;
  soft?: boolean;
}) {
  return (
    <div className="mid-jump">
      <a
        href="#contact"
        className={soft ? "mid-jump-link mid-jump-link--soft" : "mid-jump-link"}
      >
        {label}
      </a>
    </div>
  );
}

function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => {
      if (!mq.matches) {
        setShow(false);
        return;
      }
      const contact = document.getElementById("contact");
      const heroForm = document.getElementById("hero-title");
      let hide = false;
      if (contact) {
        const r = contact.getBoundingClientRect();
        hide = r.top < window.innerHeight * 0.62 && r.bottom > 80;
      }
      if (!hide && heroForm) {
        const hr = heroForm.getBoundingClientRect();
        if (hr.top > 40 && hr.bottom < window.innerHeight * 0.92) hide = true;
      }
      setShow(!hide);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="mobile-cta" role="navigation" aria-label="פעולות מהירות">
      <div className="mobile-cta-inner">
        <a
          href={LANDING.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-cta-wa"
        >
          וואטסאפ
        </a>
        <a href="#contact" className="mobile-cta-main">
          {navCta}
        </a>
      </div>
    </div>
  );
}

function ShowcaseCard({
  name,
  cat,
  tone,
  line,
  img,
  traits,
  i,
}: {
  name: string;
  cat: string;
  tone: string;
  line: string;
  img: string;
  traits: readonly string[];
  i: number;
}) {
  return (
    <article className={`show-card show-card--${tone}`}>
      <div className="show-browser">
        <div className="show-chrome" aria-hidden>
          <span />
          <span />
          <span />
          <div className="show-url">
            {name.toLowerCase().replace(/\s/g, "")}.shop
          </div>
        </div>
        <div className="show-shot">
          <Image
            src={img}
            alt={`תבנית עיצוב בסגנון ${cat} — ${name}`}
            width={800}
            height={560}
            sizes="(max-width: 900px) 90vw, 33vw"
          />
          <div className="show-shot-ui" aria-hidden>
            <div className="show-shot-bar" />
            <div className="show-shot-cta" />
          </div>
        </div>
      </div>
      <div className="show-meta">
        <span className="show-n" aria-hidden>
          {String(i + 1).padStart(2, "0")}
        </span>
        <div>
          <h3>{name}</h3>
          <p className="show-cat">{cat}</p>
          <p className="show-line">{line}</p>
          <ul className="show-traits">
            {traits.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

/**
 * Elite conversion homepage — craft proof + sales machine
 */
export default function SalesPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="sales-site">
      <a href="#main" className="skip-link">
        דלג לתוכן
      </a>
      <a href="/accessibility" className="skip-link skip-link-second">
        הצהרת נגישות
      </a>

      <header className="sales-nav">
        <div className="sales-shell sales-nav-inner">
          <div className="sales-nav-brand">
            <BrandLogo size="nav" href="#top" priority />
          </div>
          <nav className="sales-nav-links" aria-label="ניווט ראשי">
            <a href="#work">תבניות</a>
            <a href="#why">למה עכשיו</a>
            <a href="#how">איך זה עובד</a>
            <a href="#contact">התחלה</a>
          </nav>
          <a href="#contact" className="sales-nav-cta">
            {navCta}
          </a>
        </div>
      </header>

      <main id="main">
        <section id="top" className="sales-hero">
          <div className="sales-hero-plane" aria-hidden>
            <Image
              src={photos.hero}
              alt=""
              fill
              priority
              sizes="100vw"
              className="sales-hero-bg-img"
            />
            <div className="sales-hero-veil" />
            <div className="sales-hero-grain" />
          </div>

          <div className="sales-shell sales-hero-grid">
            <div className="sales-hero-copy">
              <p className="sales-eyebrow hero-rise">{heroEyebrow}</p>
              <p className="sales-brand-mark hero-rise delay-1" aria-hidden>
                {LANDING.brandDisplay}
              </p>
              <p className="sales-brand-proof hero-rise delay-2">
                {heroBrandLine}
              </p>
              <p className="sales-qualifier hero-rise delay-3">{heroQualifier}</p>
              <h1 className="sales-h1 hero-rise delay-4">
                {heroHeadlineBefore}
                <em className="sales-h1-em">{heroHeadlineEm1}</em>
                {heroHeadlineMid}
                <em className="sales-h1-em">{heroHeadlineEm2}</em>
                <span className="sr-only">
                  {" "}
                  — בניית אתרים וחנויות דיגיטליות | Aviya
                </span>
              </h1>
              <p className="sales-sub hero-rise delay-5">{heroSub}</p>

              <ul className="craft-signals hero-rise delay-5" aria-label="יתרונות">
                {craftSignals.map((s) => (
                  <li key={s.t}>
                    <strong>{s.k}</strong>
                    <span>{s.t}</span>
                  </li>
                ))}
              </ul>

              <SalesLeadForm
                idPrefix="hero"
                title={
                  <>
                    {heroFormTitle}
                    <strong>{heroFormTitleEm}</strong>
                  </>
                }
                cta={heroCta}
                namePh={heroNamePh}
                phonePh={heroPhonePh}
                source="hero"
                className="sales-hero-form hero-rise delay-6"
              />
            </div>

            <div className="sales-hero-side hero-rise delay-4">
              <div className="device-stack" aria-hidden>
                <div className="device-desk">
                  <div className="device-desk-bar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="device-desk-screen">
                    <Image
                      src={photos.fashion}
                      alt=""
                      width={520}
                      height={340}
                    />
                  </div>
                </div>
                <div className="device-phone">
                  <Image
                    src={photos.beauty}
                    alt=""
                    width={220}
                    height={400}
                  />
                </div>
              </div>
              <p className="sales-hero-side-cap">
                <span>{LANDING.brand}</span>
                כך נראית רמה — דסקטופ ומובייל
              </p>
            </div>
          </div>

          <a href="#work" className="sales-scroll-hint" aria-label="גלה עוד">
            <span />
            לגלול
          </a>
        </section>

        <section className="sales-strip" aria-label="מיצוב">
          <div className="sales-shell sales-strip-inner">
            <p className="sales-strip-k">הסיבה שאנשים אומרים ״וואו״</p>
            <h2 className="sales-strip-h">{aboutStripTitle}</h2>
            <p className="sales-strip-p">{aboutStripBody}</p>
          </div>
        </section>

        <section id="work" className="sales-sec sales-sec-show">
          <div className="sales-shell">
            <Reveal>
              <div className="sales-head sales-head-start">
                <p className="sales-kicker">מערכת תבניות</p>
                <h2 className="sales-h2">{showcaseTitle}</h2>
                <p className="sales-p">{showcaseLead}</p>
              </div>
            </Reveal>

            <Reveal delay={30}>
              <div className="tpl-row">
                {templateSystems.map((t) => (
                  <article key={t.id} className={`tpl-card tpl-card--${t.id}`}>
                    <p className="tpl-sub">{t.sub}</p>
                    <h3>{t.title}</h3>
                    <p>{t.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal delay={50}>
              <div className="show-grid">
                {showcases.map((s, i) => (
                  <ShowcaseCard key={s.name} {...s} i={i} />
                ))}
              </div>
            </Reveal>
            <MidJump label="אני רוצה מערכת כזו לעסק שלי" />
          </div>
        </section>

        <section id="why" className="sales-sec">
          <div className="sales-shell sales-narrow">
            {storyBeats.map((b, i) => (
              <Reveal key={b.title} delay={i * 25}>
                <article className="sales-beat">
                  <span className="sales-beat-mark" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="sales-h2">{b.title}</h2>
                  <p className="sales-p">{b.body}</p>
                  {i === 0 || i === 2 ? (
                    <div
                      className={`sales-img ${i === 2 ? "sales-img--alt" : ""}`}
                    >
                      <Image
                        src={i === 0 ? photos.story1 : photos.story2}
                        alt={
                          i === 0
                            ? "קניות מודרניות — חוויית רכישה"
                            : "אופנה ומסחר — לקוחות שקונים"
                        }
                        width={1100}
                        height={620}
                        sizes="(max-width: 768px) 92vw, 640px"
                      />
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ))}

            <Reveal>
              <article className="sales-beat sales-beat-maybe">
                <h2 className="sales-h2">{storyMaybeTitle}</h2>
                <ul className="sales-maybe">
                  {storyMaybe.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="sales-p sales-p-strong">{storyClose}</p>
              </article>
            </Reveal>

            <MidJump />
          </div>
        </section>

        <section id="how" className="sales-sec sales-sec-tint">
          <div className="sales-shell">
            <Reveal>
              <div className="sales-head">
                <p className="sales-kicker">{promiseLead}</p>
                <h2 className="sales-h2">{promiseTitle}</h2>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <ul className="sales-promises">
                {productPillars.map((p, i) => (
                  <li key={p.title}>
                    <span className="sales-promise-n" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <p className="sales-p sales-center sales-note">{promiseClose}</p>
            </Reveal>
          </div>
        </section>

        <section className="sales-sec">
          <div className="sales-shell">
            <Reveal>
              <div className="sales-head">
                <h2 className="sales-h2">{socialTitle}</h2>
                <p className="sales-p">{socialLead}</p>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <ul className="sales-quotes">
                {testimonials.map((t) => (
                  <li key={t.n}>
                    <div className="sales-quote-top">
                      <Image
                        src={t.img}
                        alt=""
                        width={52}
                        height={52}
                        className="sales-avatar"
                      />
                      <p className="sales-who">
                        <strong>{t.n}</strong>
                        <span>{t.r}</span>
                      </p>
                    </div>
                    <p className="sales-quote">“{t.q}”</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <MidJump label={midJumpDetails} soft />
          </div>
        </section>

        <section className="sales-sec sales-sec-tint">
          <div className="sales-shell">
            <Reveal>
              <div className="sales-head">
                <h2 className="sales-h2">{processTitle}</h2>
                <p className="sales-p">{processLead}</p>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <ol className="sales-steps">
                {processSteps.map((s) => (
                  <li key={s.n}>
                    <span className="sales-step-n">{s.n}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section id="includes" className="sales-sec">
          <div className="sales-shell">
            <Reveal>
              <div className="sales-head">
                <h2 className="sales-h2">{includesTitle}</h2>
                <p className="sales-p">{includesLead}</p>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <ul className="sales-includes">
                {includes.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <p className="sales-p sales-center sales-note">{includesNote}</p>
            </Reveal>
            <MidJump label={midJumpStart} />
          </div>
        </section>

        <section className="sales-sec sales-sec-tint">
          <div className="sales-shell sales-narrow">
            <Reveal>
              <div className="sales-head">
                <p className="sales-kicker">{fitKicker}</p>
                <h2 className="sales-h2">{fitTitle}</h2>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <div className="sales-fit">
                <div className="sales-fit-box">
                  <h3>{fitNoTitle}</h3>
                  <ul>
                    {fitNo.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div className="sales-fit-box sales-fit-yes">
                  <h3>{fitYesTitle}</h3>
                  <ul>
                    {fitYes.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <p className="sales-fit-end">{fitYesEnd}</p>
                </div>
              </div>
            </Reveal>
            <MidJump soft />
          </div>
        </section>

        <section className="sales-sec">
          <div className="sales-shell sales-trust">
            <Reveal>
              <div className="sales-trust-copy">
                <h2 className="sales-h2">{trustTitle}</h2>
                <p className="sales-p">
                  {trustBody} {LANDING.monthlyCap} עסקים בחודש.
                </p>
              </div>
            </Reveal>
            <Reveal delay={50}>
              <div className="sales-img sales-img-tall">
                <Image
                  src={photos.studio}
                  alt="חלל מדויק — איכות שמורגשת"
                  width={800}
                  height={1000}
                  sizes="(max-width: 900px) 80vw, 360px"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="sales-sec sales-sec-tint">
          <div className="sales-shell sales-narrow">
            <Reveal>
              <h2 className="sales-h2 sales-center">{faqTitle}</h2>
            </Reveal>
            <Reveal delay={30}>
              <div className="sales-faq">
                {faqs.map((item, i) => {
                  const open = faqOpen === i;
                  return (
                    <div
                      key={item.q}
                      className={`sales-faq-row${open ? " is-open" : ""}`}
                    >
                      <button
                        type="button"
                        className="sales-faq-q"
                        aria-expanded={open}
                        onClick={() => setFaqOpen(open ? null : i)}
                      >
                        <span>{item.q}</span>
                        <span className="sales-faq-icon" aria-hidden>
                          {open ? "−" : "+"}
                        </span>
                      </button>
                      {open ? <p className="sales-faq-a">{item.a}</p> : null}
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <MidJump soft />
          </div>
        </section>

        <section id="contact" className="sales-sec sales-contact">
          <div className="sales-shell sales-form-wrap">
            <Reveal>
              <p className="sales-kicker sales-center">{LANDING.brandDisplay}</p>
              <h2 className="sales-h2 sales-center">{finalTitle}</h2>
              <p className="sales-p sales-center sales-final-sub">{finalSub}</p>
              <SalesLeadForm
                idPrefix="final"
                title={
                  <>
                    {heroFormTitle}
                    <strong>{heroFormTitleEm}</strong>
                  </>
                }
                cta={heroCta}
                namePh={heroNamePh}
                phonePh={heroPhonePh}
                source="final"
              />
              <div className="sales-contact-alt">
                <p>מעדיפים לדבר עכשיו?</p>
                <SocialLinks className="sales-social" />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SeoContentBlock />

      <footer className="sales-footer">
        <div className="sales-shell sales-footer-inner">
          <BrandLogo size="footer" href="#top" />
          <p className="sales-footer-tag">{LANDING.tagline}</p>
          <p>{LANDING.promise}</p>
          <SocialLinks iconOnly />
          <p className="sales-footer-meta">
            © {new Date().getFullYear()} {LANDING.brand}
            <span aria-hidden> · </span>
            <a href="/accessibility">הצהרת נגישות</a>
          </p>
        </div>
      </footer>

      <MobileCtaBar />
    </div>
  );
}
