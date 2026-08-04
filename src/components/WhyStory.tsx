"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal, SectionHead, ease } from "./Reveal";

/* ─── Data ─── */

const stats = [
  {
    value: 81,
    suffix: "%",
    label: "מחפשים בגוגל לפני רכישה או פנייה",
    note: "בלי נוכחות — אתם לא באפשרויות",
  },
  {
    value: 75,
    suffix: "%",
    label: "שופטים אמינות לפי עיצוב האתר",
    note: "אמון נבנה בשניות — או הולך למתחרה",
  },
  {
    value: 88,
    suffix: "%",
    label: "לא יחזרו לאתר איטי / מבולבל",
    note: "כל שנייה של המתנה = כסף שיוצא",
  },
  {
    value: 24,
    suffix: "/7",
    label: "שעות שהלקוח מצפה שתהיו זמינים",
    note: "האתר עובד גם כשאתם ישנים",
  },
];

const graphMonths = ["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יונ׳"];
/** Relative revenue index for businesses without vs with a site */
const revenueWithout = [42, 40, 38, 41, 39, 37];
const revenueWith = [42, 48, 56, 68, 79, 94];

const scenarios = [
  {
    id: "clinic",
    title: "קליניקה / טיפול",
    lost: "₪12,400",
    period: "לחודש",
    story:
      "לקוחות מחפשים ׳רופא שיניים תל אביב׳. רואים 3 מתחרים עם אתר — ואתכם עם דף פייסבוק ישן. הם בוחרים את מי שנראה מקצועי.",
    before: ["אין זימון אונליין", "אין הוכחות / ביקורות", "טלפון רק בשעות פעילות"],
    after: ["זימון 24/7", "אמון רפואי ברור", "לידים מסודרים ל־CRM"],
    bleed: ["פרסום באינסטגרם בלי נחיתה", "שיחות שלא חוזרות", "תופסת חופשה = אפס הכנסה"],
  },
  {
    id: "service",
    title: "שירות / B2B",
    lost: "₪18,900",
    period: "לחודש",
    story:
      "מנהל רכש קיבל המלצה. נכנס לגוגל. מצא לוגו מטושטש ו׳בקרוב אתר׳. עבר לספק הבא ברשימה — ב־4 שניות.",
    before: ["הצעות מחיר רק במייל", "אין תיק עבודות", "אין הבחנה מהמתחרה"],
    after: ["מסלול ׳בקשת הצעה׳", "מיקרי בוחן", "מיתוג שמיישר מחיר"],
    bleed: ["RFP שפספסתם", "מחיר נמוך כי ׳לא בטוחים׳", "שיווק בלי נכס בבעלותכם"],
  },
  {
    id: "retail",
    title: "עסק מקומי / חנות",
    lost: "₪9,600",
    period: "לחודש",
    story:
      "תייר / שכן מחפש ׳קפה פתוח עכשיו׳. גוגל מפות מציג את המתחרה עם תפריט, תמונות ושעות. אתם — רק כתובת.",
    before: ["שעות לא מעודכנות", "תפריט ב־WhatsApp בלבד", "אין הזמנות מראש"],
    after: ["כרטיס עסק + אתר", "תפריט / קטלוג חי", "הזמנה ותשלום"],
    bleed: ["תורים ריקים בשעות שפל", "תלויים באלגוריתם", "אין רשימת דיוור"],
  },
  {
    id: "creator",
    title: "מותג / מוצר",
    lost: "₪27,000",
    period: "לחודש",
    story:
      "המודעה עבדה. הלקוח לחץ. נחת בדף איטי בלי תשלום. סגר. שילמתם על קליק — בלי הכנסה.",
    before: ["לינק בביו לשום מקום", "אין checkout", "סיפור מותג מפוזר"],
    after: ["חנות / דף מוצר", "תשלום מאובטח", "אוטומציית הזמנות"],
    bleed: ["עלות פרסום מבוזבזת", "נטישת עגלה", "אין retention"],
  },
];

const capabilityChapters = [
  {
    id: "seo",
    title: "SEO",
    kicker: "נמצאים כשמחפשים",
    body: "בלי אתר — אין עמודים לדרג, אין מילות מפתח, אין סמכות. המתחרה כותב את הסיפור של התעשייה במקומכם.",
    metric: "×3.5",
    metricLabel: "סיכוי להימצא בחיפוש מקומי עם נוכחות תקינה",
  },
  {
    id: "google",
    title: "נוכחות בגוגל",
    kicker: "הדלת הראשונה",
    body: "מפות, ביקורות, כותרות ואתר — חבילה אחת. אתר חלש מרסק גם את הפרופיל העסקי.",
    metric: "76%",
    metricLabel: "משתמשים שסומכים על עסק עם אתר מקצועי",
  },
  {
    id: "leads",
    title: "לידים",
    kicker: "מסקרנות לפנייה",
    body: "טופס, WhatsApp חכם, שיחה — במסלול אחד. בלי זה, כל מבקר הוא סיפור לא גמור.",
    metric: "+40%",
    metricLabel: "עלייה טיפוסית בפניות אחרי מסלול ברור",
  },
  {
    id: "auto",
    title: "אוטומציה",
    kicker: "האתר שעובד בשבילכם",
    body: "זימון, מייל אישור, CRM, תזכורות. במקום לרדוף אחרי כל לקוח — המערכת שומרת עליו.",
    metric: "12 שע׳",
    metricLabel: "חיסכון שבועי ממוצע בניהול ידני",
  },
  {
    id: "pay",
    title: "תשלומים",
    kicker: "כסף נכנס מיד",
    body: "מקדמות, חבילות, מוצרים — סגירה באתר בלי לחכות ל׳אשלח לינק׳. חיכוך = ביטולים.",
    metric: "−35%",
    metricLabel: "ירידה בנטישה כשיש checkout ברור",
  },
  {
    id: "avail",
    title: "24/7",
    kicker: "בלי שעות פתיחה",
    body: "רוב ההחלטות קורות בערב, בסופ״ש, או תוך כדי נסיעה. האתר עונה כשאתם לא.",
    metric: "62%",
    metricLabel: "פניות שמגיעות מחוץ לשעות המשרד",
  },
];

const beforeAfterRows = [
  { before: "דף פייסבוק / Instagram בלבד", after: "נכס בבעלותכם — שמדרגים, מודדים, משפרים" },
  { before: "״תתקשרו״ — ורק אם עונים", after: "טופס / זימון / תשלום בכל שעה" },
  { before: "מרגישים יקרים — נראים זולים", after: "המחיר מיושר עם הנוכחות" },
  { before: "פרסום שמזין חור", after: "כל שקל תנועה נוחת במקום שממיר" },
  { before: "אמון מילולי בלבד", after: "הוכחות, תהליך, וסיפור שמחזיק" },
];

/* ─── Hooks / small utils ─── */

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (prefersReduced) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, duration, prefersReduced, target]);

  return n;
}

function AnimatedStat({
  value,
  suffix,
  label,
  note,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  note: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const n = useCountUp(value, inView);

  return (
    <Reveal delay={0.05 + index * 0.06}>
      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-6"
      >
        <p className="display text-[clamp(2.4rem,5vw,3.4rem)] tracking-tight text-[var(--fg)]">
          {n}
          <span className="text-[var(--accent)]">{suffix}</span>
        </p>
        <p className="mt-3 text-[0.98rem] font-medium leading-7 text-[var(--fg-soft)]">
          {label}
        </p>
        <p className="mt-2 text-[0.86rem] leading-7 text-[var(--fg-muted)]">{note}</p>
      </div>
    </Reveal>
  );
}

/* ─── Revenue graph ─── */

function RevenueGraph() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const prefersReduced = useReducedMotion();
  const [mode, setMode] = useState<"without" | "with" | "both">("both");

  const w = 560;
  const h = 220;
  const pad = { t: 20, r: 12, b: 32, l: 12 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const maxY = 100;

  const toPoints = (data: number[]) =>
    data
      .map((v, i) => {
        const x = pad.l + (i / (data.length - 1)) * innerW;
        const y = pad.t + (1 - v / maxY) * innerH;
        return `${x},${y}`;
      })
      .join(" ");

  const area = (data: number[]) => {
    const pts = data.map((v, i) => {
      const x = pad.l + (i / (data.length - 1)) * innerW;
      const y = pad.t + (1 - v / maxY) * innerH;
      return [x, y] as const;
    });
    const head = pts.map(([x, y]) => `${x},${y}`).join(" ");
    const last = pts[pts.length - 1]!;
    const first = pts[0]!;
    return `${head} ${last[0]},${pad.t + innerH} ${first[0]},${pad.t + innerH}`;
  };

  return (
    <div ref={ref} className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-5 md:p-7">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.7rem] tracking-[0.16em] uppercase text-[var(--fg-muted)]">
            מודל הכנסה יחסי — 6 חודשים
          </p>
          <h3 className="mt-2 text-[1.25rem] font-medium tracking-tight">
            אותו עסק. שתי מציאויות.
          </h3>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="סינון גרף">
          {(
            [
              ["both", "השוואה"],
              ["without", "בלי אתר"],
              ["with", "עם אתר"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors ${
                mode === id
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--fg)]"
                  : "border-[var(--line-strong)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
              aria-pressed={mode === id}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="h-auto w-full min-w-[320px]"
          role="img"
          aria-label="גרף השוואת הכנסות: בלי אתר יורד, עם אתר עולה"
        >
          <defs>
            <linearGradient id="withArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(184,149,108,0.35)" />
              <stop offset="100%" stopColor="rgba(184,149,108,0)" />
            </linearGradient>
            <linearGradient id="withoutArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(180,90,70,0.25)" />
              <stop offset="100%" stopColor="rgba(180,90,70,0)" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75, 1].map((g) => (
            <line
              key={g}
              x1={pad.l}
              x2={w - pad.r}
              y1={pad.t + innerH * (1 - g)}
              y2={pad.t + innerH * (1 - g)}
              stroke="rgba(237,234,227,0.06)"
            />
          ))}

          {(mode === "without" || mode === "both") && (
            <>
              <motion.polygon
                points={area(revenueWithout)}
                fill="url(#withoutArea)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, ease }}
              />
              <motion.polyline
                points={toPoints(revenueWithout)}
                fill="none"
                stroke="rgba(200,110,90,0.85)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: prefersReduced ? 1 : 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.4, ease }}
              />
            </>
          )}

          {(mode === "with" || mode === "both") && (
            <>
              <motion.polygon
                points={area(revenueWith)}
                fill="url(#withArea)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease }}
              />
              <motion.polyline
                points={toPoints(revenueWith)}
                fill="none"
                stroke="#5b8cff"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: prefersReduced ? 1 : 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.1, ease }}
              />
            </>
          )}

          {graphMonths.map((m, i) => {
            const x = pad.l + (i / (graphMonths.length - 1)) * innerW;
            return (
              <text
                key={m}
                x={x}
                y={h - 8}
                textAnchor="middle"
                fill="rgba(142,138,130,0.9)"
                fontSize="11"
              >
                {m}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-5 text-[0.82rem] text-[var(--fg-muted)]">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[rgba(200,110,90,0.85)]" aria-hidden />
          בלי אתר מקצועי — דעיכה שקטה
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[var(--accent)]" aria-hidden />
          עם אתר — צמיחה מצטברת
        </span>
      </div>
    </div>
  );
}

/* ─── Money bleed meter ─── */

function BleedMeter({ activeScenario }: { activeScenario: (typeof scenarios)[number] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const progress = useMotionValue(0);
  const spring = useSpring(progress, { stiffness: 50, damping: 18 });
  const width = useTransform(spring, (v) => `${v}%`);
  const bleedMap: Record<string, number> = {
    clinic: 72,
    service: 84,
    retail: 68,
    creator: 91,
  };
  const bleedPct = bleedMap[activeScenario.id] ?? 78;

  useEffect(() => {
    if (inView) progress.set(bleedPct);
  }, [inView, progress, bleedPct]);

  return (
    <div ref={ref} className="rounded-2xl border border-[var(--line)] p-6 md:p-8">
      <p className="text-[0.7rem] tracking-[0.16em] uppercase text-[var(--fg-muted)]">
        דליפת הכנסה משוערת
      </p>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <p className="display text-[clamp(2.5rem,6vw,3.8rem)] tracking-tight text-[#d4a090]">
          {activeScenario.lost}
        </p>
        <p className="mb-2 text-[0.95rem] text-[var(--fg-muted)]">{activeScenario.period}</p>
      </div>
      <p className="mt-2 max-w-lg text-[0.95rem] leading-8 text-[var(--fg-soft)]">
        זה לא ״עלות אתר״ — זה כסף שכבר יוצא: פרסום שלא ממיר, אמון שלא נבנה, ולילות שבהם אף אחד לא עונה.
      </p>

      <div
        className="mt-6 h-2 overflow-hidden rounded-full bg-white/[0.06]"
        role="progressbar"
        aria-valuenow={bleedPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="שיעור הכנסה שדולפת בלי אתר מקצועי"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-hover)]"
          style={{ width }}
        />
      </div>
      <p className="mt-3 text-[0.8rem] text-[var(--fg-muted)]">
        תרחיש: {activeScenario.title} · מבוסס על מודלים שכיחים בשוק המקומי
      </p>
    </div>
  );
}

/* ─── Before / After interactive ─── */

function BeforeAfter() {
  const [side, setSide] = useState<"before" | "after">("before");

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
      <div className="flex border-b border-[var(--line)]">
        {(
          [
            ["before", "לפני — בלי אתר מקצועי"],
            ["after", "אחרי — עם נוכחות פרימיום"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSide(id)}
            className={`flex-1 px-4 py-4 text-[0.84rem] transition-colors md:text-[0.92rem] ${
              side === id
                ? id === "after"
                  ? "bg-[var(--accent-soft)] text-[var(--fg)]"
                  : "bg-[rgba(180,90,70,0.1)] text-[var(--fg)]"
                : "text-[var(--fg-muted)] hover:text-[var(--fg-soft)]"
            }`}
            aria-pressed={side === id}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={side}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease }}
          className={`space-y-0 p-2 md:p-3 ${
            side === "before" ? "compare-bad" : "compare-good"
          }`}
        >
          {beforeAfterRows.map((row, i) => (
            <li
              key={row.before}
              className="flex gap-4 border-b border-[var(--line)] px-4 py-5 last:border-b-0 md:px-6"
            >
              <span
                className={`mt-1 display text-[1.1rem] ${
                  side === "before" ? "text-[#c97b6a]" : "text-[var(--accent)]"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[1.02rem] leading-8 text-[var(--fg-soft)]">
                {side === "before" ? row.before : row.after}
              </p>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

/* ─── Capability strip ─── */

function CapabilityPanel({
  item,
  active,
  onSelect,
}: {
  item: (typeof capabilityChapters)[number];
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`w-full rounded-xl border px-4 py-3.5 text-right transition-all ${
        active
          ? "border-[var(--accent)] bg-[var(--accent-soft)]"
          : "border-[var(--line)] bg-transparent hover:border-[var(--line-strong)]"
      }`}
    >
      <span className="block text-[0.95rem] font-medium tracking-tight">{item.title}</span>
      <span className="mt-0.5 block text-[0.78rem] text-[var(--fg-muted)]">{item.kicker}</span>
    </button>
  );
}

/* ─── Main section ─── */

export function WhyStory() {
  const [scenarioId, setScenarioId] = useState(scenarios[0]!.id);
  const [capId, setCapId] = useState(capabilityChapters[0]!.id);
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0]!;
  const cap = capabilityChapters.find((c) => c.id === capId) ?? capabilityChapters[0]!;

  return (
    <section
      id="why-website"
      className="section section-band"
      aria-labelledby="why-website-title"
    >
      <div className="shell">
        {/* Chapter 1 — Hook */}
        <SectionHead
          label="סיפור · למה אתר"
          titleId="why-website-title"
          title="בלי אתר מקצועי — אתם משלמים על חוסר נראות."
          description="זה לא ׳נחמד שיש אתר׳. זה נכס שעובד בשבילכם — או חור שכל שקל שיווק נופל לתוכו. גללו. בחרו תרחיש. תראו את ההפרש."
        />

        {/* Chapter 2 — Stats */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s, i) => (
            <AnimatedStat key={s.label} {...s} index={i} />
          ))}
        </div>

        {/* Chapter 3 — Money + graph */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="h-full rounded-2xl border border-[var(--line)] bg-[rgba(180,90,70,0.06)] p-6 md:p-8">
              <p className="text-[0.7rem] tracking-[0.16em] uppercase text-[#c97b6a]">
                הרגע שבו מבינים
              </p>
              <h3 className="lead mt-4 max-w-[14ch] !text-[clamp(1.5rem,3vw,2.1rem)]">
                כל יום בלי נוכחות מקצועית הוא יום שהמתחרה סוגר עסקאות במקומכם.
              </h3>
              <p className="mt-5 text-[1rem] leading-8 text-[var(--fg-muted)]">
                לקוח לא ׳מחכה שתתארגנו׳. הוא פותח 3 טאבים, מרגיש מי נראה בטוח —
                וסוגר שם. אתם אולי השירות הכי טוב ברחוב. באונליין — אתם לא קיימים.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "פרסום רץ — אבל אין איפה לנחות",
                  "המלצות מגיעות — ואז האמון נשבר במסך",
                  "אתם עובדים קשה — בזמן שהאתר של המתחרה עובד בשבילם",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 text-[0.95rem] leading-7 text-[var(--fg-soft)]"
                  >
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-[#c97b6a]" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <RevenueGraph />
          </Reveal>
        </div>

        {/* Chapter 4 — Scenarios */}
        <div className="mt-20">
          <Reveal>
            <p className="section-label">תרחישים מהשטח</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="lead max-w-[16ch]">בחרו עסק. תראו איך הכסף יוצא.</h3>
          </Reveal>

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="סוגי עסקים"
          >
            {scenarios.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={scenarioId === s.id}
                onClick={() => setScenarioId(s.id)}
                className={`rounded-full border px-4 py-2 text-[0.88rem] transition-colors ${
                  scenarioId === s.id
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--fg)]"
                    : "border-[var(--line-strong)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id}
                role="tabpanel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
                className="rounded-2xl border border-[var(--line)] p-6 md:p-8"
              >
                <p className="text-[1.08rem] leading-9 text-[var(--fg-soft)]">
                  {scenario.story}
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <ScenarioCol title="המציאות עכשיו" items={scenario.before} tone="bad" />
                  <ScenarioCol title="עם אתר מקצועי" items={scenario.after} tone="good" />
                </div>

                <div className="mt-8 border-t border-[var(--line)] pt-6">
                  <p className="mb-3 text-[0.72rem] tracking-[0.14em] uppercase text-[var(--fg-muted)]">
                    איפה הכסף בורח
                  </p>
                  <ul className="space-y-2">
                    {scenario.bleed.map((b) => (
                      <li
                        key={b}
                        className="text-[0.95rem] leading-7 text-[#d4a090]"
                      >
                        — {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            <BleedMeter activeScenario={scenario} />
          </div>
        </div>

        {/* Chapter 5 — Before / After full */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <Reveal>
              <p className="section-label">לפני / אחרי</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="lead max-w-[14ch]">השוואה שלא משאירה מקום לתירוצים.</h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="prose-muted mt-5">
                לחצו בין מצבים. תרגישו את הפער בין ״יש לנו סושיאל״ לבין ״יש לנו
                מכונה שמביאה לקוחות״.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <BeforeAfter />
          </Reveal>
        </div>

        {/* Chapter 6 — Capabilities interactive */}
        <div className="mt-20">
          <Reveal>
            <p className="section-label">מה אתר מקצועי באמת עושה</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="lead max-w-[18ch]">
              SEO. גוגל. לידים. אוטומציה. תשלום. 24/7.
            </h3>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {capabilityChapters.map((item) => (
                <CapabilityPanel
                  key={item.id}
                  item={item}
                  active={capId === item.id}
                  onSelect={() => setCapId(item.id)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease }}
                className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-7 md:p-10"
              >
                <div
                  className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-[var(--accent)]/10 blur-3xl"
                  aria-hidden
                />
                <p className="text-[0.72rem] tracking-[0.16em] uppercase text-[var(--accent)]">
                  {cap.kicker}
                </p>
                <h4 className="display mt-3 text-[clamp(2rem,4vw,3rem)] tracking-tight">
                  {cap.title}
                </h4>
                <p className="mt-5 max-w-xl text-[1.05rem] leading-9 text-[var(--fg-muted)]">
                  {cap.body}
                </p>
                <div className="mt-10 border-t border-[var(--line)] pt-6">
                  <p className="display text-[clamp(2rem,4vw,2.8rem)] text-[var(--accent)]">
                    {cap.metric}
                  </p>
                  <p className="mt-2 text-[0.92rem] text-[var(--fg-soft)]">
                    {cap.metricLabel}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Chapter 7 — Trust + emotional close */}
        <Reveal delay={0.05}>
          <div className="mt-20 rounded-2xl border border-[var(--line)] bg-gradient-to-l from-[rgba(184,149,108,0.1)] via-transparent to-[rgba(180,90,70,0.08)] p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-[0.7rem] tracking-[0.16em] uppercase text-[var(--fg-muted)]">
                  אמון = כסף
                </p>
                <h3 className="lead mt-4 max-w-[18ch]">
                  אנשים לא קונים מהזול ביותר. הם קונים ממי שנראה הכי בטוח.
                </h3>
                <p className="mt-5 max-w-xl text-[1.02rem] leading-8 text-[var(--fg-muted)]">
                  אתר מקצועי משדר: ״אנחנו כאן, אנחנו רציניים, אפשר לסמוך.״ בלי
                  זה — גם אם אתם מעולים — המוח של הלקוח בוחר אחרת. לא כי אתם
                  פחות טובים. כי לא נתתם לו סיבה להרגיש בטוח.
                </p>
                <a href="#contact" className="btn btn-primary mt-8">
                  תפסיקו להפסיד שקטים
                  <span aria-hidden>←</span>
                </a>
              </div>
              <TrustBars />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ScenarioCol({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "bad" | "good";
}) {
  return (
    <div>
      <p
        className={`mb-3 text-[0.7rem] tracking-[0.14em] uppercase ${
          tone === "bad" ? "text-[#c97b6a]" : "text-[var(--accent)]"
        }`}
      >
        {title}
      </p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-[0.92rem] leading-7 text-[var(--fg-muted)]"
          >
            <span
              className={`me-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full ${
                tone === "bad" ? "bg-[#c97b6a]" : "bg-[var(--accent)]"
              }`}
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrustBars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const items = useMemo(
    () => [
      { label: "תחושת ביטחון מהמסך הראשון", pct: 92 },
      { label: "נכונות להשאיר פרטים", pct: 78 },
      { label: "מוכנות לשלם מחיר פרימיום", pct: 64 },
    ],
    []
  );

  return (
    <div ref={ref} className="space-y-5">
      {items.map((item, i) => (
        <div key={item.label}>
          <div className="mb-2 flex items-center justify-between gap-3 text-[0.86rem]">
            <span className="text-[var(--fg-soft)]">{item.label}</span>
            <span className="text-[var(--accent)]">{item.pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-[var(--accent)]"
              initial={{ width: 0 }}
              animate={inView ? { width: `${item.pct}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
            />
          </div>
        </div>
      ))}
      <p className="text-[0.78rem] leading-6 text-[var(--fg-muted)]">
        אינדיקטורים התנהגותיים טיפוסיים אחרי השקת אתר מקצועי (לעומת נוכחות
        חלשה / חסרה).
      </p>
    </div>
  );
}
