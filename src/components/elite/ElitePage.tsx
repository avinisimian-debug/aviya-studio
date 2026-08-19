"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Check,
  Gauge,
  LayoutTemplate,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import {
  Button,
  Container,
  MediaFrame,
  Section,
  SectionHead,
  Split,
} from "@/components/elite/layout";
import {
  eliteEase,
  Reveal,
  RevealItem,
  RevealStagger,
} from "@/components/elite/Reveal";
import { SalesLeadForm } from "@/components/landing/SalesLeadForm";
import { AdUnit } from "@/components/ads/AdUnit";
import { eliteMedia, eliteTemplates } from "@/data/elite-media";
import { currentHebrewMonth, LANDING } from "@/data/landing";
import { aboutPage, eliteFaqs } from "@/data/site-content";
import {
  bringToCall,
  firstChat,
  honestNotes,
  igPosts,
  realFacts,
  studioHours,
  weekFlow,
} from "@/data/studio-real";
import { NeedPicker } from "@/components/elite/NeedPicker";
import {
  studioFitNo,
  studioFitYes,
  studioIncludes,
  studioIndustries,
} from "@/data/studio-extras";

/* ═══════════════════════════════════════════════════════════
   Aviya — product-first conversion craft · high-end Hebrew
   ═══════════════════════════════════════════════════════════ */

const CTA_PRIMARY = "רוצה שנחזור אליך?";
const NAV_CONTACT = "השארת פרטים";
const FORM_CTA = "אני רוצה אתר / חנות שמביאה לקוחות";

const FORM_TITLE_HERO = (
  <>
    לפרטים נוספים על אתר או חנות דיגיטלית <strong>לעסק שלך</strong>
  </>
);
const FORM_TITLE_FINAL = (
  <>
    מלאו פרטים קצרים — <strong>נחזור אליכם</strong>
  </>
);

const MARQUEE = [
  "אתר שמביא לקוחות",
  "חנות דיגיטלית",
  "מובייל קטלני",
  "בבעלותכם 100%",
  "SEO בסיסי",
  "המרה בקיפול",
  "עיצוב ברמת מותג",
  "עלייה תוך ימים",
];

const CRAFT = [
  {
    icon: LayoutTemplate,
    title: "מערכת עיצוב, לא דף יחיד",
    body: "טיפוגרפיה, רווחים, צבעים ורכיבים עובדים יחד — הכל מרגיש כאילו נולד באותו רגע, לא תבנית מודבקת.",
  },
  {
    icon: Gauge,
    title: "מהיר. חד. נטען בשנייה",
    body: "אם האתר איטי — אתם משלמים בלקוחות. קוד נקי, תמונות חכמות, חוויה חלקה גם ב־4G.",
  },
  {
    icon: Zap,
    title: "נתיב המרה ברור",
    body: "כפתור אחד. מסר אחד. ללא בלגן. המבקר מבין מה לעשות — בלי לשאול ״מה עכשיו?״.",
  },
  {
    icon: ShieldCheck,
    title: "אמון שנבנה בשניות",
    body: "העולם שופט לפי פרטים. מיקרו-טיפוגרפיה, הוכחות, והרגשה של מוצר — לא אתר ״גם לי יש״.",
  },
] as const;

function CountUp({
  to,
  suffix = "",
  duration = 1.4,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`elite-nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="elite-nav-inner">
        <a href="#top" className="elite-nav-brand" onClick={close}>
          <Image
            src={LANDING.logoSrc}
            alt="Aviya"
            width={140}
            height={40}
            className="elite-nav-logo"
            priority
          />
        </a>
        <nav className="elite-nav-links" aria-label="ניווט ראשי">
          <a href="#about">אביה</a>
          <a href="#instagram">רילס</a>
          <a href="#gallery">תבניות</a>
          <a href="#includes">מה כלול</a>
          <a href="/for">למי זה</a>
          <a href="/guides">מדריכים</a>
          <a href="/services">שירותים</a>
          <a href="/contact">{NAV_CONTACT}</a>
        </nav>
        <div className="elite-nav-actions">
          <a
            href={LANDING.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="elite-nav-wa"
          >
            וואטסאפ
          </a>
          <Button href="#contact" variant="primary">
            {CTA_PRIMARY}
          </Button>
          <button
            type="button"
            className="elite-nav-toggle"
            aria-expanded={open}
            aria-controls="elite-mobile-menu"
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="elite-mobile-menu"
          className="elite-nav-drawer"
          aria-label="ניווט בנייד"
        >
          <a href="#about" onClick={close}>
            אביה
          </a>
          <a href="#gallery" onClick={close}>
            תבניות
          </a>
          <a href="#includes" onClick={close}>
            מה כלול
          </a>
          <a href="#fit" onClick={close}>
            למי זה מתאים
          </a>
          <a href="/for" onClick={close}>
            תחומים
          </a>
          <a href="/guides" onClick={close}>
            מדריכים
          </a>
          <a href="/services" onClick={close}>
            שירותים
          </a>
          <a href="/contact" onClick={close}>
            {NAV_CONTACT}
          </a>
          <a href="#contact" onClick={close} className="elite-nav-drawer-cta">
            {CTA_PRIMARY}
          </a>
        </nav>
      ) : null}
    </header>
  );
}

function TemplateShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = eliteTemplates.length;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % n);
    }, 3400);
    return () => window.clearInterval(id);
  }, [paused, n]);

  return (
    <div
      id="templates"
      className="elite-stage"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="elite-stage-oval" aria-hidden />
      <div className="elite-stage-glow" aria-hidden />

      <p className="elite-templates-kicker">
        <Sparkles size={12} aria-hidden />
        {n} כיווני עיצוב · ברמת מותג
      </p>

      <div className="elite-templates" role="region" aria-label="תצוגת תבניות אתר">
        {eliteTemplates.map((tpl, i) => {
          let offset = i - active;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;
          const abs = Math.abs(offset);
          if (abs > 2) return null;

          const slot =
            offset === 0
              ? "is-center"
              : offset === -1
                ? "is-left"
                : offset === 1
                  ? "is-right"
                  : offset === -2
                    ? "is-far-left"
                    : "is-far-right";

          return (
            <button
              key={tpl.id}
              type="button"
              className={`elite-template ${slot}`}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`${tpl.label} — ${tpl.tag}`}
            >
              <div className="elite-template-chrome" aria-hidden>
                <span />
                <span />
                <span />
                <p>{tpl.domain}</p>
              </div>
              <div className="elite-template-screen">
                <Image
                  src={tpl.src}
                  alt={tpl.alt}
                  fill
                  sizes="(max-width: 960px) 70vw, 420px"
                  priority={i === 0 || i === active}
                  className="elite-template-img"
                />
                <div
                  className={`elite-template-ui elite-template-ui--${tpl.id}`}
                  aria-hidden
                >
                  <span className="elite-template-ui-nav" />
                  <span className="elite-template-ui-hero" />
                  <span className="elite-template-ui-row" />
                </div>
              </div>
              <div className="elite-template-meta">
                <span className="elite-template-tag">{tpl.tag}</span>
                <span className="elite-template-name">{tpl.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="elite-template-dots" role="tablist" aria-label="בחירת תבנית">
        {eliteTemplates.map((tpl, i) => (
          <button
            key={tpl.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`elite-template-dot${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={tpl.label}
          />
        ))}
      </div>

      <ul className="elite-template-pills" aria-label="סוגי תבניות">
        {eliteTemplates.map((tpl, i) => (
          <li key={tpl.id}>
            <button
              type="button"
              className={`elite-template-pill${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {tpl.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="elite-float elite-float--a">
        <strong>{n}</strong>
        <span>כיווני עיצוב</span>
      </div>
      <div className="elite-float elite-float--b">
        <strong>מותאם</strong>
        <span>לעסק שלך</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <Section id="top" className="elite-hero elite-hero--founder elite-section--flush" tight>
      <div className="elite-hero-bg" aria-hidden>
        <div className="elite-hero-mesh" />
        <div className="elite-hero-orb elite-hero-orb--a" />
        <div className="elite-hero-orb elite-hero-orb--b" />
        <div className="elite-hero-orb elite-hero-orb--c" />
        <div className="elite-hero-noise" />
      </div>
      <Container>
        <div className="elite-hero-grid">
          <div className="elite-hero-copy elite-rise">
            <div className="elite-status">
              <i className="elite-status-dot" aria-hidden />
              <span>אביה בונה אישית · זמינים ל־{currentHebrewMonth()}</span>
            </div>
            <p className="elite-kicker">{aboutPage.kicker}</p>
            <h1 className="elite-h1">{aboutPage.title}</h1>
            <p className="elite-lead">{aboutPage.lead}</p>
            <p className="elite-p">{aboutPage.story[0]}</p>
            <p className="elite-p">{aboutPage.story[1]}</p>

            <div className="elite-hero-ctas">
              <Button href="#contact" variant="accent">
                {CTA_PRIMARY}
              </Button>
              <a href="/about" className="elite-link-quiet">
                הסיפור המלא
                <ArrowUpRight size={16} aria-hidden />
              </a>
              <a
                href={LANDING.instagram}
                className="elite-link-quiet"
                target="_blank"
                rel="noopener noreferrer"
              >
                אינסטגרם {LANDING.instagramHandle}
              </a>
            </div>
            <NeedPicker />
            <ul className="comfort-row" aria-label="למה זה נוח">
              <li>מענה תוך 24 שעות</li>
              <li>בלי ספאם · בלי לחץ</li>
              <li>בעלות מלאה שלכם</li>
            </ul>
          </div>

          <div className="elite-hero-visual elite-rise elite-rise--delay" id="about">
            <FounderPhoto priority />
            <p className="elite-hero-cap">
              מדברים איתי בוואטסאפ — לא עם מוקד. עד {LANDING.monthlyCap} עסקים
              בחודש.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Marquee() {
  const loop = [...MARQUEE, ...MARQUEE];
  return (
    <div className="elite-marquee" aria-hidden>
      <div className="elite-marquee-track">
        {loop.map((t, i) => (
          <span key={`${t}-${i}`} className="elite-marquee-item">
            {t}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <div className="elite-trust" aria-label="למי זה">
      <Container>
        <div className="elite-trust-inner">
          <p className="elite-trust-label">
            נבנה לעסקים שכבר עובדים — ולא יכולים להרשות לעצמם להיראות ״לא
            רציניים״ אונליין
          </p>
          <ul className="elite-trust-row">
            <li>שירותים</li>
            <li>קליניקות</li>
            <li>B2B</li>
            <li>קמעונאות</li>
            <li>מותגים</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

function Gallery() {
  return (
    <Section id="gallery" className="elite-gallery-section">
      <Container>
        <Reveal>
          <SectionHead
            kicker="גלריית כיוונים"
            title="לא תיק עבודות מזויף. שפה שאפשר לבנות ממנה."
            lead="כל כיוון הוא רמת מותג — אתם בוחרים אופי, אנחנו בונים מערכת שממירה. בלי לוגואים מומצאים."
          />
        </Reveal>
        <RevealStagger className="elite-gallery-grid">
          {eliteTemplates.map((tpl, i) => (
            <RevealItem key={tpl.id} className="elite-gallery-card">
              <article>
                <div className="elite-gallery-frame">
                  <div className="elite-gallery-chrome" aria-hidden>
                    <span />
                    <span />
                    <span />
                    <p>{tpl.domain}</p>
                  </div>
                  <div className="elite-gallery-screen">
                    <Image
                      src={tpl.src}
                      alt={tpl.alt}
                      fill
                      sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 360px"
                      className="elite-gallery-img"
                      priority={i < 2}
                    />
                  </div>
                </div>
                <div className="elite-gallery-body">
                  <span className="elite-gallery-tag">{tpl.tag}</span>
                  <h3>{tpl.label}</h3>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
        <Reveal>
          <p className="elite-honest-note">{honestNotes.gallery}</p>
          <div className="elite-gallery-cta">
            <Button href="#contact" variant="primary">
              רוצה כיוון מותאם לעסק שלך?
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function FirstChat() {
  return (
    <Section id="chat" className="elite-chat-section" tone="muted">
      <Container>
        <Reveal>
          <SectionHead
            kicker="איך זה מרגיש"
            title="שיחה ראשונה — בלי סקריפט מכירות"
            lead="ככה מתחילים בדרך כלל. קצר, אנושי, בוואטסאפ."
          />
        </Reveal>
        <Reveal>
          <div className="wa-thread" aria-label="דוגמה לשיחת וואטסאפ">
            <p className="wa-thread-head">וואטסאפ · אביה</p>
            {firstChat.map((m, i) => (
              <p
                key={`${m.who}-${i}`}
                className={`wa-bubble wa-bubble--${m.who}`}
              >
                {m.t}
              </p>
            ))}
            <a
              className="wa-thread-cta"
              href={LANDING.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              לפתוח שיחה אמיתית
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function StudioNow() {
  return (
    <Section id="now" className="elite-now-section">
      <Container>
        <Reveal>
          <SectionHead
            kicker="סטודיו חי"
            title="פרטים אמיתיים. לא עמוד ׳סוכנות גלובלית׳."
            lead={studioHours}
          />
        </Reveal>
        <RevealStagger className="elite-facts-grid">
          {realFacts.map((f) => (
            <RevealItem key={f.k} className="elite-fact-card">
              <span>{f.k}</span>
              <strong>{f.v}</strong>
            </RevealItem>
          ))}
        </RevealStagger>
        <RevealStagger className="elite-week">
          {weekFlow.map((w) => (
            <RevealItem key={w.d} className="elite-week-card">
              <span>{w.d}</span>
              <h3>{w.t}</h3>
              <p>{w.b}</p>
            </RevealItem>
          ))}
        </RevealStagger>
        <Reveal>
          <div className="elite-bring">
            <h3>מה כדאי להביא לשיחה (לא חובה הכל)</h3>
            <ul>
              {bringToCall.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function RealIg() {
  return (
    <Section id="instagram" className="elite-ig-section" tone="muted">
      <Container>
        <Reveal>
          <SectionHead
            kicker="אינסטגרם אמיתי"
            title="העבודה קורה גם ברילס — לא רק באתר יפה"
            lead={`${LANDING.instagramHandle} · זה העמוד של הסטודיו, לא פרופיל דמה.`}
          />
        </Reveal>
        <RevealStagger className="elite-ig-grid">
          {igPosts.map((p) => (
            <RevealItem key={p.t}>
              <a
                className="elite-ig-card"
                href={LANDING.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{p.t}</strong>
                <span>{p.d}</span>
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
        <Reveal>
          <p className="elite-resources-all">
            <a
              href={LANDING.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              לפתוח את הרילס של studio.aviya1 ←
            </a>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function Voices() {
  const items = [
    {
      q: "אתר שנראה כמו העסק באמת — לא כמו עמוד פייסבוק ישן.",
      a: "מה שחוזר אצל בעלי מקצוע",
    },
    {
      q: "שהלקוח יבין תוך שניות למה לפנות — בלי לחפש טלפון.",
      a: "מה שחוזר אצל עסקי שירותים",
    },
    {
      q: "חנות שמרגישה כמו מותג, לא כמו קטלוג שהועלה בחיפזון.",
      a: "מה שחוזר אצל מי שמוכר אונליין",
    },
  ] as const;

  return (
    <Section id="voices" className="elite-voices-section">
      <Container>
        <Reveal>
          <SectionHead
            kicker="בלי המצאות"
            title="מה בעלי עסקים באמת רוצים מהאתר"
            lead={honestNotes.voices}
          />
        </Reveal>
        <RevealStagger className="elite-voices-grid">
          {items.map((item) => (
            <RevealItem key={item.a} className="elite-voice-card">
              <blockquote>
                <p>{item.q}</p>
                <footer>{item.a}</footer>
              </blockquote>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  const items = eliteFaqs;

  return (
    <Section id="faq" tone="muted" className="elite-faq-section">
      <Container>
        <Reveal>
          <SectionHead
            kicker="שאלות קצרות"
            title="בלי ערפל. תשובות ברורות."
          />
        </Reveal>
        <Reveal>
          <div className="elite-faq-list">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className={`elite-faq-item${isOpen ? " is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="elite-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="elite-faq-icon" aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: eliteEase }}
                        className="elite-faq-panel"
                      >
                        <p className="elite-faq-a">{item.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Linear-style craft pillars — bento */
function Craft() {
  return (
    <Section id="craft" className="elite-craft-section">
      <Container>
        <Reveal>
          <SectionHead
            kicker="ברמה של המובילים"
            title="השפה של האתרים הגדולים בעולם — מותאמת לעסק שלך"
            lead="אוויר, טיפוגרפיה חדה, מוצר במרכז, ותנועה שמספרת סיפור. לא ״אתר ג׳נרי״ — מערכת שמכבדת את המותג שלכם."
          />
        </Reveal>

        <RevealStagger className="elite-bento">
          {CRAFT.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.title} className="elite-bento-card">
                <div className="elite-bento-icon" aria-hidden>
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </RevealItem>
            );
          })}
          <RevealItem className="elite-bento-card elite-bento-card--wide">
            <p className="elite-bento-wide-kicker">מה מקבלים בפועל</p>
            <ul className="elite-bento-stats">
              <li>
                <strong>01</strong>
                <span>מסר מעל הקיפול — ברור ב־3 שניות</span>
              </li>
              <li>
                <strong>02</strong>
                <span>מבנה המרה + וואטסאפ / טופס / שיחה</span>
              </li>
              <li>
                <strong>03</strong>
                <span>תבניות עיצוב פרימיום — מותאמות לכם</span>
              </li>
              <li>
                <strong>04</strong>
                <span>בעלות מלאה. בלי ״חתונה״ עם מערכת סגורה</span>
              </li>
            </ul>
          </RevealItem>
        </RevealStagger>
      </Container>
    </Section>
  );
}

function Problem() {
  return (
    <Section id="problem" tone="muted">
      <Container>
        <Reveal>
          <Split
            className="elite-split--elevated"
            media={
              <div className="elite-pain-visual">
                <MediaFrame
                  variant="browser"
                  domain="google.com/search"
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
                    2017. המסר: ״אולי לא שווה לסמוך.״
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
                    אינסטגרם משתנה בלי לשאול. אתר שלכם הוא נכס. רשתות הן שכירות.
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
                    אותו שירות. לפעמים מחיר גבוה יותר. האתר שלו מנצח אתכם בשיפוט
                    הראשון.
                  </p>
                </div>
              </li>
            </ol>
          </Split>
        </Reveal>
      </Container>
    </Section>
  );
}

function Solution() {
  return (
    <Section id="solution">
      <Container>
        <Reveal>
          <SectionHead
            kicker="הפתרון"
            title="אתר שמוכר — 24 שעות ביממה"
            lead="לא ״יש לי אתר״. מערכת שמביאה פניות כשאתם ישנים, בנסיעה, ובפגישות."
          />
        </Reveal>

        <Reveal>
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
        </Reveal>

        <RevealStagger className="elite-value-grid">
          <RevealItem className="elite-surface elite-value-card elite-img-card">
            <div className="elite-img-card-media">
              <MediaFrame
                variant="default"
                src={eliteMedia.growth}
                alt="צמיחה דיגיטלית — אתר שעובד מסביב לשעון"
              />
            </div>
            <div className="elite-img-card-body">
              <h3>איש מכירות שלא עוזב</h3>
              <p>
                האתר מסביר, משכנע, וסוגר פנייה — גם ב־02:00. בלי חופשות.
              </p>
            </div>
          </RevealItem>
          <RevealItem className="elite-surface elite-value-card elite-img-card">
            <div className="elite-img-card-media">
              <MediaFrame
                variant="default"
                src={eliteMedia.laptopUi}
                alt="ממשק אתר מודרני — אמון לפני השיחה"
              />
            </div>
            <div className="elite-img-card-body">
              <h3>אמון לפני השיחה</h3>
              <p>
                הוכחות, תהליך, מסר מקצועי. הלקוח מגיע חצי־משוכנע.
              </p>
            </div>
          </RevealItem>
          <RevealItem className="elite-surface elite-value-card elite-img-card">
            <div className="elite-img-card-media">
              <MediaFrame
                variant="default"
                src={eliteMedia.designCraft}
                alt="עיצוב UI מקצועי — השקעה שמחזירה"
              />
            </div>
            <div className="elite-img-card-body">
              <h3>השקעה, לא בזבוז</h3>
              <p>
                אתר שמביא לידים משלם על עצמו. אתר שלא — עולה בכל לקוח שבורח.
              </p>
            </div>
          </RevealItem>
        </RevealStagger>

        <Reveal>
          <div className="elite-story-block">
          <Split
            reverse
            className="elite-split--elevated"
            media={
              <MediaFrame
                variant="browser"
                domain="yourbrand.co.il"
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
        </Reveal>
      </Container>
    </Section>
  );
}

function FounderPhoto({
  priority = false,
}: {
  priority?: boolean;
}) {
  return (
    <figure className="elite-founder">
      <div className="elite-founder-frame">
        <Image
          src={aboutPage.photo}
          alt={aboutPage.photoAlt}
          width={720}
          height={900}
          unoptimized
          className="elite-founder-img"
          priority={priority}
        />
      </div>
      <figcaption className="elite-founder-cap">
        <strong>{aboutPage.name}</strong>
        <span>{aboutPage.role}</span>
      </figcaption>
    </figure>
  );
}

function About() {
  return (
    <Section id="about" className="elite-about-section">
      <Container>
        <Reveal>
          <Split className="elite-split--elevated" media={<FounderPhoto priority />}>
            <p className="elite-kicker">{aboutPage.kicker}</p>
            <h2 className="elite-h2">{aboutPage.title}</h2>
            <p className="elite-lead">{aboutPage.lead}</p>
            <p className="elite-p">{aboutPage.story[0]}</p>
            <p className="elite-p">{aboutPage.story[1]}</p>
            <ul className="elite-about-pillars">
              {aboutPage.pillars.map((p) => (
                <li key={p.t}>
                  <strong>{p.t}</strong>
                  <span>{p.d}</span>
                </li>
              ))}
            </ul>
            <div className="elite-btn-row">
              <Button href="/about" variant="primary">
                הסיפור המלא
              </Button>
              <Button href="#contact" variant="ghost">
                {CTA_PRIMARY}
              </Button>
            </div>
          </Split>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Product demo reel — animated UI storyboard (no external video dependency) */
function ProductDemo() {
  const beats = [
    { t: "01 · מסר מעל הקיפול", d: "הלקוח מבין תוך שניות מי אתם ומה לקחת." },
    { t: "02 · אמון והוכחות", d: "תהליך, ביקורות, תמונות — נראה רציני." },
    { t: "03 · קריאה לפעולה", d: "וואטסאפ / טופס / שיחה — מסלול אחד ברור." },
    { t: "04 · מובייל קודם", d: "רוב ההחלטות קורות בטלפון. כאן זה מנצח." },
  ] as const;
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setBeat((b) => (b + 1) % beats.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [beats.length]);

  return (
    <Section id="demo" className="elite-demo-section" tone="muted">
      <Container>
        <Reveal>
          <SectionHead
            kicker="איך אתר ברמה מרגיש"
            title="סיור קצר בחוויית המרה"
            lead="בלי סרטון כבד — סיפור ויזואלי ברור: מה הלקוח רואה, ומה גורם לו לפנות."
          />
        </Reveal>
        <Reveal>
          <div className="elite-demo">
            <div className="elite-demo-stage" aria-hidden>
              <div className="elite-demo-chrome">
                <span />
                <span />
                <span />
                <p>yourbrand.co.il</p>
              </div>
              <div className="elite-demo-screen">
                <Image
                  src={eliteMedia.laptopUi}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 92vw, 640px"
                  className="elite-demo-bg"
                />
                <div className={`elite-demo-layer is-beat-${beat}`}>
                  <div className="elite-demo-nav-bar" />
                  <div className="elite-demo-hero-block">
                    <i />
                    <i />
                    <b />
                  </div>
                  <div className="elite-demo-cards">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="elite-demo-cta-bar" />
                </div>
              </div>
            </div>
            <ol className="elite-demo-beats">
              {beats.map((item, i) => (
                <li key={item.t} className={i === beat ? "is-active" : ""}>
                  <button type="button" onClick={() => setBeat(i)}>
                    <strong>{item.t}</strong>
                    <span>{item.d}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function Fit() {
  return (
    <Section id="fit" className="elite-fit-section">
      <Container>
        <Reveal>
          <SectionHead
            kicker="התאמה"
            title="לא לכולם. וזה בכוונה."
            lead="מעט פרויקטים בחודש. אם זה לא מתאים — נגיד ישר, בלי בזבוז זמן לשני הצדדים."
          />
        </Reveal>
        <div className="elite-fit-grid">
          <Reveal className="elite-fit-col elite-fit-col--yes">
            <h3>מתאים אם</h3>
            <ul>
              {studioFitYes.map((line) => (
                <li key={line}>
                  <Check size={16} aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="elite-fit-col elite-fit-col--no">
            <h3>פחות מתאים אם</h3>
            <ul>
              {studioFitNo.map((line) => (
                <li key={line}>
                  <span aria-hidden>—</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Includes() {
  return (
    <Section id="includes" tone="muted" className="elite-includes-section">
      <Container>
        <Reveal>
          <SectionHead
            kicker="מה בפנים"
            title="פרויקט מלא — לא ״רק עיצוב״"
            lead="ככה נראית הקמה ברמה: מסר, מבנה, מובייל, פניות, ומדידה. בלי אותיות קטנות באמצע."
          />
        </Reveal>
        <RevealStagger className="elite-includes-grid">
          {studioIncludes.map((item, i) => (
            <RevealItem key={item.t} className="elite-include-card">
              <span className="elite-include-n" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}

function Industries() {
  return (
    <Section id="industries" className="elite-industries-section">
      <Container>
        <Reveal>
          <SectionHead
            kicker="תחומים"
            title="נבנה סביב סוג העסק — לא סביב תבנית"
            lead="אותה רמת ביצוע. מסר אחר לכל תחום."
          />
        </Reveal>
        <RevealStagger className="elite-industries-grid">
          {studioIndustries.map((item) => (
            <RevealItem key={item.t}>
              <a href={item.href} className="elite-industry-card">
                <strong>{item.t}</strong>
                <span>{item.d}</span>
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
        <Reveal>
          <p className="elite-resources-all">
            <a href="/for">לכל התחומים והפירוט ←</a>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function Process() {
  const steps = [
    {
      t: "משאירים פרטים",
      b: "שם וטלפון. חוזרים להבין כיוון — בלי התחייבות ובלי ז׳רגון.",
    },
    {
      t: "מחדדים מסר",
      b: "מי הלקוח, מה הפעולה, איך נשמע העסק. בלי זה האתר יפה — ולא ממיר.",
    },
    {
      t: "בנייה ברמה",
      b: "עיצוב, מבנה המרה, מובייל, SEO. נראה כמו מותג — מתנהג כמו מכונת פניות.",
    },
    {
      t: "השקה + שליטה",
      b: "עולים לאוויר. אתם מקבלים לקוחות. הבעלות 100% שלכם.",
    },
  ] as const;

  return (
    <Section id="process" tone="muted">
      <Container>
        <Reveal>
          <SectionHead
            kicker="איך זה עובד"
            title="פשוט. מהיר. בלי פרויקט אינסופי."
            lead="אתם בעסק. אנחנו בבנייה. עולים לאוויר עם מערכת שמוכנה לקבל לקוחות."
          />
        </Reveal>
        <RevealStagger className="elite-steps elite-steps--cards">
          {steps.map((s, i) => (
            <RevealItem key={s.t} className="elite-step-card">
              <span className="elite-step-n" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{s.t}</h3>
              <p>{s.b}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}

function SeoResources() {
  const items = [
    {
      href: "/guides/why-business-needs-website",
      t: "למה עסק צריך אתר",
      d: "אינסטגרם מול נכס דיגיטלי",
    },
    {
      href: "/guides/landing-page-vs-website",
      t: "דף נחיתה מול תדמית",
      d: "מה מתאים לקמפיין ולטווח ארוך",
    },
    {
      href: "/guides/ecommerce-store-guide",
      t: "חנות דיגיטלית",
      d: "סליקה, מובייל וחוויית קנייה",
    },
    {
      href: "/guides/website-for-clinic",
      t: "אתר לקליניקה",
      d: "אמון, תהליך ופניות",
    },
    {
      href: "/services",
      t: "כל השירותים",
      d: "תדמית · חנות · נחיתה · SEO",
    },
    {
      href: "/promote",
      t: "קידום ברשתות וביוטיוב",
      d: "פוסטים והאשטגים מוכנים",
    },
    {
      href: "/guides/how-to-brief-a-website",
      t: "איך מכינים בריף לאתר",
      d: "מה להביא לפגישה הראשונה",
    },
    {
      href: "/for",
      t: "אתר לפי תחום",
      d: "קליניקה · שירותים · חנות · B2B",
    },
  ] as const;

  return (
    <Section id="resources" className="elite-resources-section">
      <Container>
        <Reveal>
          <SectionHead
            kicker="ידע לבעלי עסקים"
            title="מדריכים קצרים — בלי ז׳רגון"
            lead="תוכן שמסביר מה עובד אונליין. לקריאה מלאה — או ליצירת קשר כשמוכנים לבנות."
          />
        </Reveal>
        <RevealStagger className="elite-resources-grid">
          {items.map((item) => (
            <RevealItem key={item.href}>
              <a href={item.href} className="elite-resource-card">
                <strong>{item.t}</strong>
                <span>{item.d}</span>
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
        <Reveal>
          <p className="elite-resources-all">
            <a href="/guides">לכל המדריכים ←</a>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section id="contact" tone="inverse" className="elite-final-section">
      <div className="elite-final-aurora" aria-hidden />
      <Container>
        <Reveal>
          <div className="elite-final">
            <p className="elite-kicker">רגע אחד</p>
            <h2 className="elite-h2">
              עוד יום בלי אתר שעובד — זה עוד יום שמשלמים למתחרה
            </h2>
            <p className="elite-lead">
              אל תתנו ל״אחר כך״ לסגור לכם עסקאות. השאירו פרטים — נחזור מהר, ברור,
              בלי לחץ.
            </p>
            <div className="elite-final-form-wrap">
              <SalesLeadForm
                idPrefix="final"
                source="final"
                variant="soft"
                withBusiness
                title={FORM_TITLE_FINAL}
                cta="שלחו — ונחזור אליכם"
                namePh="איך קוראים לך?"
                phonePh="מה המספר שלך?"
                businessPh="שם העסק"
                className="elite-lead-form elite-lead-form--dark"
              />
            </div>
            <p className="elite-final-reassure">
              בלי ספאם. בלי חיוב. רק שיחה אם זה מתאים לשני הצדדים.
            </p>
          </div>
        </Reveal>
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
            סטודיו של אדם אחד. 055-557-3090 · {LANDING.email} ·{" "}
            {LANDING.instagramHandle}
          </p>
          <p className="elite-footer-meta">{studioHours}</p>
          <div className="elite-footer-links">
            <a href="#top">למעלה</a>
            <a href="#includes">מה כלול</a>
            <a href="/for">תחומים</a>
            <a href="#gallery">תבניות</a>
            <a href="#about">אודות</a>
            <a href="/about">עמוד אודות</a>
            <a href="/guides">מדריכים</a>
            <a href="/services">שירותים</a>
            <a href="/promote">קידום</a>
            <a href="/contact">יצירת קשר</a>
            <a href="#faq">שאלות</a>
            <a href="/privacy">פרטיות</a>
            <a href="/accessibility">נגישות</a>
            <a
              href={LANDING.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              וואטסאפ
            </a>
            <a href={LANDING.emailUrl}>מייל</a>
            <a
              href={LANDING.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              אינסטגרם
            </a>
          </div>
          <p className="elite-footer-meta">
            © {new Date().getFullYear()} Aviya · studio.aviya1
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FloatingWhatsapp() {
  return (
    <a
      href={LANDING.whatsappUrl}
      className="elite-fab-wa"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פתיחת וואטסאפ עם Aviya"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <path
          fill="currentColor"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
        />
      </svg>
    </a>
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
        <Marquee />
        <TrustStrip />
        <Gallery />
        <FirstChat />
        <StudioNow />
        <RealIg />
        <AdUnit className="aviya-ad-slot--page" />
        <ProductDemo />
        <Craft />
        <Includes />
        <Fit />
        <Industries />
        <Problem />
        <Solution />
        <AdUnit className="aviya-ad-slot--page" />
        <Voices />
        <Process />
        <Faq />
        <SeoResources />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
      <FloatingWhatsapp />
    </div>
  );
}
