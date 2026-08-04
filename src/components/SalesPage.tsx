"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";
import {
  CountSignal,
  HeroAura,
  SalesScrollProgress,
} from "@/components/sales/SalesChrome";
import {
  aboutStripBody,
  aboutStripTitle,
  craftSignals,
  compareLead,
  compareLeftTitle,
  compareRightTitle,
  compareRows,
  compareTitle,
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
  formMicro,
  heroBenefitBullets,
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
  outcomeBenefits,
  outcomesLead,
  outcomesTitle,
  pathCta,
  paths,
  pathsLead,
  pathsTitle,
  photos,
  processLead,
  processSteps,
  processTitle,
  productPillars,
  promiseClose,
  promiseLead,
  promiseTitle,
  proofBarItems,
  proofBarLead,
  riskItems,
  riskTitle,
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
  domain,
  traits,
  i,
}: {
  name: string;
  cat: string;
  tone: string;
  line: string;
  img: string;
  domain: string;
  traits: readonly string[];
  i: number;
}) {
  return (
    <article
      className={`show-card show-card--${tone}`}
      style={{ animationDelay: `${i * 0.08}s` }}
    >
      <div className="show-browser">
        <div className="show-chrome" aria-hidden>
          <span />
          <span />
          <span />
          <div className="show-url">{domain}</div>
        </div>
        <div className="show-shot">
          <Image
            src={img}
            alt={`דוגמת עיצוב ${cat} — ${name}`}
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

function HeroDevices() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = wrap.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--tilt-x", `${px * 10}deg`);
        el.style.setProperty("--tilt-y", `${py * -8}deg`);
        el.style.setProperty("--shift-x", `${px * -12}px`);
        el.style.setProperty("--shift-y", `${py * -10}px`);
      });
    };
    const onLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      el.style.setProperty("--shift-x", "0px");
      el.style.setProperty("--shift-y", "0px");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div className="device-stack device-stack--live" ref={wrap} aria-hidden>
      <div className="device-desk">
        <div className="device-desk-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="device-desk-screen">
          <Image src={photos.service} alt="" width={520} height={340} />
        </div>
      </div>
      <div className="device-phone">
        <Image src={photos.fashion} alt="" width={220} height={400} />
      </div>
    </div>
  );
}

/**
 * Elite conversion homepage — craft proof + sales machine
 */
export default function SalesPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sales-site">
      <SalesScrollProgress />
      <a href="#main" className="skip-link">
        דלג לתוכן
      </a>
      <a href="/accessibility" className="skip-link skip-link-second">
        הצהרת נגישות
      </a>

      <header className={`sales-nav${navScrolled ? " is-scrolled" : ""}`}>
        <div className="sales-shell sales-nav-inner">
          <div className="sales-nav-brand">
            <BrandLogo size="nav" href="#top" priority />
          </div>
          <nav className="sales-nav-links" aria-label="ניווט ראשי">
            <a href="#paths">מסלולים</a>
            <a href="#work">דוגמאות</a>
            <a href="#how">איך</a>
            <a href="#contact">התחלה</a>
          </nav>
          <a href="#contact" className="sales-nav-cta sales-nav-cta--pulse">
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
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <HeroAura />
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
                <em className="sales-h1-em text-shimmer">{heroHeadlineEm1}</em>
                {heroHeadlineMid}
                <em className="sales-h1-em text-shimmer delay-shimmer">
                  {heroHeadlineEm2}
                </em>
                <span className="sr-only">
                  {" "}
                  — בניית אתרים שמביאים לקוחות וחנויות דיגיטליות | Aviya
                </span>
              </h1>
              <p className="sales-sub hero-rise delay-5">{heroSub}</p>

              <ul className="hero-bullets hero-rise delay-5" aria-label="מה מקבלים">
                {heroBenefitBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <ul className="craft-signals hero-rise delay-5" aria-label="יתרונות">
                {craftSignals.map((s) => (
                  <CountSignal key={s.t} value={s.k} label={s.t} />
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
              <p className="form-micro-hero hero-rise delay-6 sr-only">
                {formMicro}
              </p>
            </div>

            <div className="sales-hero-side hero-rise delay-4">
              <HeroDevices />
              <p className="sales-hero-side-cap">
                <span>{LANDING.brand}</span>
                אתר לידים · חנות · מובייל
              </p>
            </div>
          </div>

          <a href="#paths" className="sales-scroll-hint" aria-label="גלה עוד">
            <span />
            לגלול
          </a>
        </section>

        {/* Social proof strip — marquee pattern used by elite SaaS */}
        <section className="proof-bar" aria-label="קהלים">
          <div className="sales-shell proof-bar-inner">
            <p className="proof-bar-lead">{proofBarLead}</p>
            <div className="proof-marquee" dir="ltr">
              <ul className="proof-bar-list proof-track">
                {[...proofBarItems, ...proofBarItems].map((item, i) => (
                  <li key={`${item}-${i}`} aria-hidden={i >= proofBarItems.length}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Two paths */}
        <section id="paths" className="sales-sec sales-sec-paths">
          <div className="sales-shell">
            <Reveal>
              <div className="sales-head">
                <p className="sales-kicker">מה בונים</p>
                <h2 className="sales-h2">{pathsTitle}</h2>
                <p className="sales-p">{pathsLead}</p>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <div className="paths-grid">
                {paths.map((p, i) => (
                  <article
                    key={p.id}
                    className={`path-card path-card--${p.id} lift-card`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <p className="path-kicker">{p.kicker}</p>
                    <h3>{p.title}</h3>
                    <p className="path-body">{p.body}</p>
                    <ul>
                      {p.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <a href="#contact" className="path-cta">
                      {pathCta}
                    </a>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Outcome benefits */}
        <section id="outcomes" className="sales-sec">
          <div className="sales-shell">
            <Reveal>
              <div className="sales-head">
                <p className="sales-kicker">תוצאה</p>
                <h2 className="sales-h2">{outcomesTitle}</h2>
                <p className="sales-p">{outcomesLead}</p>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <ul className="outcome-grid">
                {outcomeBenefits.map((o) => (
                  <li key={o.title} className={`outcome-card outcome-${o.icon}`}>
                    <span className="outcome-mark" aria-hidden />
                    <h3>{o.title}</h3>
                    <p>{o.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
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
                    <p className="sales-metric">{t.metric}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <MidJump label={midJumpDetails} soft />
          </div>
        </section>

        {/* Comparison table */}
        <section className="sales-sec sales-sec-compare">
          <div className="sales-shell">
            <Reveal>
              <div className="sales-head">
                <p className="sales-kicker">השוואה</p>
                <h2 className="sales-h2">{compareTitle}</h2>
                <p className="sales-p">{compareLead}</p>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <div className="compare-table" role="table" aria-label="השוואת רמות אתר">
                <div className="compare-head" role="row">
                  <div role="columnheader" className="compare-cell compare-bad-h">
                    {compareLeftTitle}
                  </div>
                  <div role="columnheader" className="compare-cell compare-good-h">
                    {compareRightTitle}
                  </div>
                </div>
                {compareRows.map((row) => (
                  <div key={row.good} className="compare-row" role="row">
                    <div role="cell" className="compare-cell compare-bad">
                      <span aria-hidden>✕</span> {row.bad}
                    </div>
                    <div role="cell" className="compare-cell compare-good">
                      <span aria-hidden>✓</span> {row.good}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <MidJump />
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
                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            key="a"
                            initial={
                              reduced
                                ? false
                                : { height: 0, opacity: 0 }
                            }
                            animate={{ height: "auto", opacity: 1 }}
                            exit={
                              reduced
                                ? undefined
                                : { height: 0, opacity: 0 }
                            }
                            transition={{
                              duration: 0.38,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                            className="sales-faq-anim"
                          >
                            <p className="sales-faq-a">{item.a}</p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
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

              <div className="risk-stack">
                <p className="risk-title">{riskTitle}</p>
                <ul>
                  {riskItems.map((r) => (
                    <li key={r.t}>
                      <strong>{r.t}</strong>
                      <span>{r.d}</span>
                    </li>
                  ))}
                </ul>
              </div>

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
          <p className="sales-footer-tag">
            {LANDING.brand} · אביה סטודיו · {LANDING.tagline}
          </p>
          <p>{LANDING.promise}</p>
          <p className="sales-footer-meta">
            סטודיו לבניית אתרים וחנויות דיגיטליות בישראל
          </p>
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
