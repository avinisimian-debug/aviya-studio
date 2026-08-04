"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCallback, useRef, type MouseEvent, type PointerEvent } from "react";
import { ease } from "./Reveal";

/** Abstract premium mesh / digital texture */
const BG =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2400&q=80";
/** Architectural interior for realistic site preview photography */
const PREVIEW =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80";

function MagneticCta({
  play,
  prefersReduced,
}: {
  play: boolean;
  prefersReduced: boolean | null;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (prefersReduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };

  return (
    <motion.a
      ref={ref}
      href="#contact"
      className="hero-cta group relative"
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial={play && !prefersReduced ? { opacity: 0, y: 18, scale: 0.96 } : false}
      animate={play ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
      transition={{ duration: 0.85, delay: 0.55, ease }}
      whileTap={prefersReduced ? undefined : { scale: 0.98 }}
    >
      <span className="hero-cta-pulse" aria-hidden />
      <span className="relative z-[1]">קבעו שיחת אסטרטגיה</span>
      <span
        className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-black/15 text-[1.05rem] transition-transform duration-300 group-hover:-translate-x-0.5"
        aria-hidden
      >
        ←
      </span>
    </motion.a>
  );
}

function WebsitePreview({
  play,
  prefersReduced,
  rotateX,
  rotateY,
}: {
  play: boolean;
  prefersReduced: boolean | null;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[560px] lg:ms-auto lg:me-0"
      style={{ perspective: 1400 }}
      initial={play && !prefersReduced ? { opacity: 0, y: 40, scale: 0.96 } : false}
      animate={play ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
      transition={{ duration: 1.1, delay: 0.35, ease }}
    >
      <motion.div
        className="hero-browser"
        style={{
          rotateX: prefersReduced ? 0 : rotateX,
          rotateY: prefersReduced ? 0 : rotateY,
          transformPerspective: 1400,
        }}
        role="img"
        aria-label="תצוגה מקדימה של אתר מותג פרימיום שנבנה בסטודיו"
      >
        <div className="hero-browser-bar">
          <span className="hero-browser-dot" />
          <span className="hero-browser-dot" />
          <span className="hero-browser-dot" />
          <div className="hero-browser-url">aviya.studio/atelier-nord</div>
        </div>

        <div className="hero-preview-body">
          <div className="hero-preview-media">
            <Image
              src={PREVIEW}
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-cover"
              priority
            />
          </div>

          <div className="hero-preview-ui">
            <div className="hero-preview-nav hero-glass">
              <span className="display text-[0.95rem] tracking-tight text-white/90">
                Atelier Nord
              </span>
              <div className="hidden items-center gap-4 text-[0.62rem] tracking-[0.12em] uppercase text-white/55 sm:flex">
                <span>קולקציה</span>
                <span>אודות</span>
                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.58rem] font-medium tracking-normal text-black">
                  Shop
                </span>
              </div>
            </div>

            <div className="max-w-[16rem] pe-2">
              <p className="text-[0.62rem] tracking-[0.18em] uppercase text-white/55">
                SS26 Collection
              </p>
              <p className="display mt-2 text-[clamp(1.6rem,3.5vw,2.15rem)] leading-[0.95] text-white">
                Quiet luxury, worn daily.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.72rem] font-medium text-black">
                Explore lookbook
                <span aria-hidden>→</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hero-float hero-float-a hero-glass"
        initial={play && !prefersReduced ? { opacity: 0, x: 20 } : false}
        animate={play ? { opacity: 1, x: 0 } : { opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.75, ease }}
      >
        <p className="text-[0.65rem] tracking-[0.14em] uppercase text-[var(--fg-muted)]">
          Conversion
        </p>
        <p className="mt-1 display text-[1.55rem] tracking-tight text-[var(--fg)]">
          +38%
        </p>
        <p className="mt-0.5 text-[0.72rem] text-[var(--fg-muted)]">המרת לידים</p>
      </motion.div>

      <motion.div
        className="hero-float hero-float-b hero-glass"
        initial={play && !prefersReduced ? { opacity: 0, x: -20 } : false}
        animate={play ? { opacity: 1, x: 0 } : { opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease }}
      >
        <div className="flex items-center gap-2">
          <span className="hero-status-dot" />
          <p className="text-[0.65rem] tracking-[0.14em] uppercase text-[var(--fg-muted)]">
            Performance
          </p>
        </div>
        <p className="mt-1.5 text-[0.92rem] font-medium text-[var(--fg)]">
          LCP <span className="text-[var(--accent)]">0.9s</span>
        </p>
        <p className="mt-0.5 text-[0.72rem] text-[var(--fg-muted)]">Core Web Vitals</p>
      </motion.div>

      <motion.div
        className="hero-float hero-float-c hero-glass hidden xl:block"
        initial={play && !prefersReduced ? { opacity: 0, y: 16 } : false}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.9, delay: 1.05, ease }}
      >
        <p className="text-[0.65rem] tracking-[0.14em] uppercase text-[var(--fg-muted)]">
          Delivery
        </p>
        <p className="mt-1 text-[0.95rem] font-medium text-[var(--fg)]">4–6 שבועות</p>
        <p className="mt-0.5 text-[0.72rem] text-[var(--fg-muted)]">מתהליך להשקה</p>
      </motion.div>
    </motion.div>
  );
}

export function Hero({ play }: { play: boolean }) {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const mx = useMotionValue(0.68);
  const my = useMotionValue(0.38);
  const smoothX = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.55 });
  const smoothY = useSpring(my, { stiffness: 55, damping: 22, mass: 0.55 });

  const photoX = useTransform(smoothX, [0, 1], [22, -22]);
  const photoY = useTransform(smoothY, [0, 1], [14, -14]);
  const previewRotateY = useTransform(smoothX, [0, 1], [8, -8]);
  const previewRotateX = useTransform(smoothY, [0, 1], [-6, 6]);

  const mxPct = useTransform(smoothX, (v) => `${(v * 100).toFixed(2)}%`);
  const myPct = useTransform(smoothY, (v) => `${(v * 100).toFixed(2)}%`);
  const meshBackground = useMotionTemplate`
    radial-gradient(720px circle at ${mxPct} ${myPct}, rgba(184, 149, 108, 0.22), transparent 46%),
    radial-gradient(460px circle at calc(${mxPct} + 12%) calc(${myPct} + 14%), rgba(90, 120, 145, 0.14), transparent 52%)
  `;

  const gridX = useTransform(smoothX, [0, 1], [10, -10]);
  const gridY = useTransform(smoothY, [0, 1], [8, -8]);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (prefersReduced || !sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    },
    [mx, my, prefersReduced]
  );

  const shouldAnimate = play && !prefersReduced;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-stage"
      aria-labelledby="hero-brand"
      onMouseMove={onMouseMove}
    >
      <motion.div
        className="hero-photo"
        style={prefersReduced ? undefined : { x: photoX, y: photoY }}
        aria-hidden
      >
        <Image
          src={BG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="hero-photo-wash" aria-hidden />

      <motion.div
        className="hero-mesh"
        style={prefersReduced ? undefined : { background: meshBackground }}
        aria-hidden
      />

      <motion.div
        className="hero-grid-live"
        style={prefersReduced ? undefined : { x: gridX, y: gridY }}
        aria-hidden
      />

      <div className="hero-vignette" aria-hidden />

      <div className="shell hero-content">
        <div className="relative z-10 max-w-xl">
          <motion.div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md"
            initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease }}
          >
            <span className="hero-status-dot" />
            <span className="text-[0.72rem] tracking-[0.16em] uppercase text-[var(--fg-soft)]">
              מקבלים 2–3 פרויקטים · ישראל
            </span>
          </motion.div>

          <motion.p
            className="mb-3 text-[0.78rem] font-medium tracking-[0.2em] uppercase text-[var(--accent)]"
            initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            Premium Digital Studio
          </motion.p>

          <motion.h1
            id="hero-brand"
            className="display hero-brand-glow text-[clamp(3.6rem,11vw,7.5rem)] leading-[0.88]"
            initial={
              shouldAnimate
                ? { opacity: 0, y: 36, filter: "blur(12px)" }
                : false
            }
            animate={
              play
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0 }
            }
            transition={{ duration: 1.15, delay: 0.18, ease }}
          >
            AVIYA
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[18ch] text-[clamp(1.45rem,3.2vw,2.2rem)] font-light leading-[1.2] tracking-[-0.02em] text-[var(--fg)]"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.95, delay: 0.32, ease }}
          >
            האתר שגורם ללקוחות לבחור בכם — ב־10 שניות.
          </motion.p>

          <motion.p
            className="mt-4 max-w-md text-[1.02rem] leading-8 text-[var(--fg-muted)]"
            initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.85, delay: 0.42, ease }}
          >
            סטודיו פרימיום שבונים אתרים כמו מוצרים: טעם, ביצועים, ואמון — בלי
            תבניות ובלי רעש.
          </motion.p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <MagneticCta play={play} prefersReduced={prefersReduced} />
            <motion.a
              href="#work"
              className="btn btn-ghost !min-h-12 !px-5 backdrop-blur-sm"
              initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
              animate={play ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.62, ease }}
            >
              ראו עבודות נבחרות
            </motion.a>
          </div>

          <motion.div
            className="hero-trust-row mt-10 border-t border-white/[0.07] pt-6"
            initial={shouldAnimate ? { opacity: 0 } : false}
            animate={play ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <span className="hero-trust-item">
              <strong>24–48 שע׳</strong> מענה
            </span>
            <span className="hero-trust-item" aria-hidden>
              ·
            </span>
            <span className="hero-trust-item">
              <strong>100%</strong> קשר ישיר
            </span>
            <span className="hero-trust-item" aria-hidden>
              ·
            </span>
            <span className="hero-trust-item">
              <strong>RTL</strong> עברית מקורית
            </span>
          </motion.div>
        </div>

        <div className="relative z-10 pb-4 pt-2 lg:pb-0 lg:pt-6">
          <WebsitePreview
            play={play}
            prefersReduced={prefersReduced}
            rotateX={previewRotateX}
            rotateY={previewRotateY}
          />
        </div>
      </div>
    </section>
  );
}
