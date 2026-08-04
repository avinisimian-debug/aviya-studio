"use client";

import { motion } from "framer-motion";
import { featuredWorks } from "@/data/landing";
import { fadeRise, staggerContainer, staggerItem } from "@/lib/motion";

/** Featured works — modern mockups, subtle scale on hover */
export function FeaturedWorks() {
  return (
    <section
      id="work"
      className="section border-y border-white/10 bg-background-elevated"
      aria-labelledby="work-title"
    >
      <div className="shell">
        <motion.div
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div>
            <p className="section-label">פורטפוליו</p>
            <h2 id="work-title" className="lead max-w-[12ch] font-extrabold">
              חלק מהעבודות שלנו
            </h2>
          </div>
          <p className="prose-muted max-w-sm md:text-start">
            דוגמאות לסגנון ולרמת הפיניש. כל פרויקט נבנה מאפס לעסק ספציפי.
          </p>
        </motion.div>

        <motion.ul
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
        >
          {featuredWorks.map((work) => (
            <motion.li key={work.name} variants={staggerItem}>
              <a
                href="#contact"
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/20"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{
                      background: `
                        radial-gradient(ellipse 70% 50% at 60% 30%, ${work.accent}, transparent 60%),
                        linear-gradient(165deg, #15161c, #0b0c0e)
                      `,
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                  {/* Mini browser chrome */}
                  <div className="absolute inset-x-5 top-5 bottom-8 rounded-lg border border-white/10 bg-white/[0.03] p-3 shadow-elevated backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.02] sm:inset-x-8 sm:top-7 sm:bottom-10 sm:p-4">
                    <div className="mb-3 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="ms-2 h-4 flex-1 rounded-full bg-white/[0.06]" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2.5 w-1/3 rounded-full bg-white/20" />
                      <div className="h-2 w-2/3 rounded-full bg-white/10" />
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((n) => (
                          <div
                            key={n}
                            className="aspect-[4/3] rounded-md border border-white/10 bg-white/[0.04]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
                  <div>
                    <p className="font-bold tracking-tight text-white">
                      {work.name}
                    </p>
                    <p className="mt-0.5 text-[0.8rem] text-foreground-muted">
                      {work.category}
                    </p>
                  </div>
                  <span className="text-[0.78rem] text-foreground-muted transition-colors group-hover:text-accent">
                    בואו נדבר ←
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
