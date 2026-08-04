"use client";

import { motion } from "framer-motion";
import { strategyCards } from "@/data/landing";
import { fadeRise, easeSmooth } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import { Check, Zap, MessageCircle, Code2 } from "@/lib/icons";

function StrategyVisual({ type }: { type: (typeof strategyCards)[number]["visual"] }) {
  switch (type) {
    case "ux":
      return (
        <div className="absolute inset-0 bg-background-elevated p-6" aria-hidden>
          <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <div className="h-2 w-20 rounded-full bg-white/15" />
              <div className="rounded-full bg-white px-3 py-1 text-[0.6rem] font-bold text-[#0b0c0e]">
                CTA
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-3/4 max-w-[12rem] rounded-full bg-white/20" />
              <div className="h-2 w-full rounded-full bg-white/8" />
              <div className="h-2 w-5/6 rounded-full bg-white/8" />
            </div>
            <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex aspect-square flex-col justify-end rounded-lg border border-white/10 bg-white/[0.03] p-2"
                >
                  <div className="h-1.5 w-10 rounded-full bg-accent/50" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[0.7rem] text-foreground-muted">
              <Icon icon={Check} size="xs" className="text-accent" />
              מסלול ברור · פחות חיכוך · יותר פניות
            </div>
          </div>
        </div>
      );
    case "code":
      return (
        <div className="absolute inset-0 bg-[#0b0c0e] p-6 font-mono" aria-hidden>
          <div className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
            <div className="mb-4 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f07167]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]/70" />
            </div>
            <pre className="space-y-1.5 text-start text-[0.72rem] leading-relaxed text-foreground-muted" dir="ltr">
              <div>
                <span className="text-accent">const</span> site ={" "}
                <span className="text-white">build</span>(
              </div>
              <div className="ps-4">
                design: <span className="text-[#34d399]">&quot;custom&quot;</span>,
              </div>
              <div className="ps-4">
                plugins: <span className="text-[#f07167]">0</span>,
              </div>
              <div className="ps-4">
                lcp: <span className="text-[#34d399]">&quot;&lt;1.2s&quot;</span>
              </div>
              <div>);</div>
            </pre>
            <div className="mt-8 flex items-end gap-1.5">
              {[40, 55, 48, 72, 68, 90, 85].map((h, i) => (
                <div
                  key={i}
                  className="w-full max-w-[1.75rem] rounded-sm bg-accent/60"
                  style={{ height: `${h * 0.7}px` }}
                />
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[0.7rem] text-foreground-muted">
              <Icon icon={Zap} size="xs" className="text-accent" />
              Performance first · no plugin debt
            </p>
          </div>
        </div>
      );
    case "map":
      return (
        <div className="absolute inset-0 bg-background-elevated p-6" aria-hidden>
          <div className="relative flex h-full items-center justify-center">
            <div className="absolute h-32 w-32 rounded-full border border-white/10 md:h-40 md:w-40" />
            <div className="absolute h-20 w-20 rounded-full border border-white/10 md:h-24 md:w-24" />
            <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[0.65rem] font-bold text-white backdrop-blur-md">
              אתר
            </div>
            {[
              { label: "CRM", x: "8%", y: "18%" },
              { label: "Payments", x: "68%", y: "12%" },
              { label: "WhatsApp", x: "72%", y: "62%" },
              { label: "Email", x: "12%", y: "68%" },
            ].map((node) => (
              <div
                key={node.label}
                className="absolute flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[0.65rem] text-foreground-soft backdrop-blur-md"
                style={{ left: node.x, top: node.y }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {node.label}
              </div>
            ))}
            <div className="absolute bottom-2 start-2 flex items-center gap-1.5 text-[0.7rem] text-foreground-muted">
              <Icon icon={MessageCircle} size="xs" className="text-accent" />
              הכל מחובר · בלי רעש
            </div>
          </div>
        </div>
      );
    case "portrait":
      return (
        <div className="absolute inset-0" aria-hidden>
          <div className="portrait-plate h-full !aspect-auto rounded-none border-0">
            <div className="absolute inset-x-0 bottom-8 z-10 px-6 text-center">
              <p className="text-[1.35rem] font-extrabold text-white">Aviya</p>
              <p className="mt-1 text-[0.72rem] font-medium tracking-[0.12em] uppercase text-foreground-muted">
                Long-term partnership
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 start-4 end-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-md">
            <p className="flex items-center gap-2 text-[0.72rem] text-foreground-muted">
              <Icon icon={Code2} size="xs" className="text-accent" />
              לא נעלמים אחרי ההשקה
            </p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

/** Alternating image+text — strategy to results */
export function StrategySplits() {
  return (
    <section
      id="results"
      className="section bg-background"
      aria-labelledby="results-title"
    >
      <div className="shell">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <p className="section-label !justify-center">הגישה</p>
          <h2
            id="results-title"
            className="lead mx-auto max-w-[18ch] font-extrabold"
          >
            איך אנחנו הופכים אסטרטגיה לתוצאות
          </h2>
          <p className="prose-muted mx-auto mt-5 max-w-lg">
            כל בלוק למטה הוא שכבה אחת במערכת — עיצוב, טכנולוגיה, חיבורים, וליווי.
          </p>
        </motion.div>

        <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          {strategyCards.map((card, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={card.id}
                className={reverse ? "split split-reverse" : "split"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.65, ease: easeSmooth }}
              >
                <div className="visual-frame aspect-[4/3] min-h-[16rem]">
                  <StrategyVisual type={card.visual} />
                </div>
                <div className="split-copy">
                  <div className="glass rounded-2xl border border-white/10 p-7 md:p-9">
                    <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-accent">
                      {card.label}
                    </p>
                    <h3 className="mt-3 text-[1.4rem] font-extrabold tracking-tight text-white md:text-[1.65rem]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[1rem] font-normal leading-[1.75] text-foreground-muted">
                      {card.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
