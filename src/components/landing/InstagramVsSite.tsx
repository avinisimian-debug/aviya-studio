"use client";

import { motion } from "framer-motion";
import { fadeRise, easeSmooth } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import { MessageCircle, Globe } from "@/lib/icons";

/** Alternating image+text storytelling blocks */
export function InstagramVsSite() {
  return (
    <section
      id="problem-solution"
      className="section bg-background"
      aria-labelledby="ps-title"
    >
      <div className="shell">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <p className="section-label !justify-center">
            אינסטגרם מול נכס עצמאי
          </p>
          <h2 id="ps-title" className="lead mx-auto max-w-[16ch] font-extrabold">
            פלטפורמה שכורה מול נכס שבבעלותכם
          </h2>
          <p className="prose-muted mx-auto mt-5 max-w-lg">
            רשתות מצוינות לחשיפה. הן מסוכנות כמנוע מכירה יחיד. האתר הוא המקום
            שבו בונים סמכות — וממירים.
          </p>
        </motion.div>

        <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          {/* Problem — visual + copy */}
          <motion.article
            className="split"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.65, ease: easeSmooth }}
          >
            <div className="visual-frame aspect-[4/3]" aria-hidden>
              <div className="absolute inset-0 bg-background-elevated">
                <div className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-pink-500/50 via-violet-500/30 to-amber-400/40 p-px">
                      <div className="h-full w-full rounded-full bg-background-panel" />
                    </div>
                    <div>
                      <div className="h-2.5 w-24 rounded-full bg-white/15" />
                      <div className="mt-1.5 h-2 w-16 rounded-full bg-white/[0.08]" />
                    </div>
                  </div>
                  <div className="grid flex-1 grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-sm bg-white/[0.06]"
                        style={{ opacity: 0.4 + (i % 3) * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 start-4 end-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-md">
                <p className="flex items-center gap-2 text-[0.75rem] text-foreground-muted">
                  <Icon icon={MessageCircle} size="xs" />
                  פרופיל צפוף · אלגוריתם · שליטה מוגבלת
                </p>
              </div>
            </div>

            <div className="split-copy">
              <div className="glass rounded-2xl border border-white/10 p-7 md:p-9">
                <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-[#f07167]">
                  הבעיה
                </p>
                <h3 className="mt-3 text-[1.4rem] font-extrabold tracking-tight text-white md:text-[1.6rem]">
                  להסתמך רק על אינסטגרם זה סיכון עסקי
                </h3>
                <p className="mt-4 text-[1rem] font-normal leading-[1.75] text-foreground-muted">
                  החשיפה תלויה באלגוריתם, הלידים מתפזרים ב־DM, ואין מקום שבו
                  לקוח רציני יכול להבין מה הופך אתכם לבחירה הבטוחה. זה נכס שכור
                  — לא שלכם.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Solution — reversed */}
          <motion.article
            className="split split-reverse"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.65, delay: 0.04, ease: easeSmooth }}
          >
            <div className="split-copy">
              <div className="glass rounded-2xl border border-white/10 p-7 md:p-9">
                <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-accent">
                  הפתרון
                </p>
                <h3 className="mt-3 text-[1.4rem] font-extrabold tracking-tight text-white md:text-[1.6rem]">
                  אתר בבעלותכם = סמכות + המרה
                </h3>
                <p className="mt-4 text-[1rem] font-normal leading-[1.75] text-foreground-muted">
                  נכס דיגיטלי שמספר את הסיפור, בונה אמון, ואוסף פניות 24/7 — גם
                  כשאתם לא בטלפון. כל מודעה, המלצה וסטורי נוחתים במקום שממיר.
                </p>
              </div>
            </div>

            <div className="visual-frame aspect-[4/3]" aria-hidden>
              <div className="absolute inset-0 bg-[#0b0c0e]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_60%_30%,rgba(107,140,255,0.18),transparent_60%)]" />
                <div className="absolute inset-x-6 top-6 rounded-lg border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
                  <p className="text-[0.7rem] tracking-[0.14em] uppercase text-white/40">
                    yourbrand.co.il
                  </p>
                  <p className="mt-3 text-[1.35rem] font-extrabold leading-tight tracking-tight text-white">
                    Quiet confidence.
                    <br />
                    Clear next step.
                  </p>
                  <div className="mt-5 h-8 w-28 rounded-full bg-white" />
                </div>
                <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-md border border-white/10 bg-white/[0.03]"
                    />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-4 start-4 end-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-md">
                <p className="flex items-center gap-2 text-[0.75rem] text-foreground-muted">
                  <Icon icon={Globe} size="xs" className="text-accent" />
                  בעלות מלאה · סמכות · המרה
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
