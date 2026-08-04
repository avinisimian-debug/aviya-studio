"use client";

import { motion } from "framer-motion";
import { fadeRise, staggerContainer, staggerItem } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import { Check } from "@/lib/icons";

const pillars = [
  {
    title: "שקיפות מלאה",
    body: "אתם יודעים איפה אנחנו בכל שלב — מה חסר ומה הצעד הבא.",
  },
  {
    title: "ליווי אישי",
    body: "עבודה ישירה. בלי שכבות מנהלים. שותפות עד אחרי ההשקה.",
  },
  {
    title: "קוד נקי",
    body: "מערכת שאפשר להרחיב, למדוד ולתחזק — לא תבנית שמתפוררת.",
  },
];

/** Split storytelling — portrait visual + philosophy copy */
export function AboutPhilosophy() {
  return (
    <section
      id="about"
      className="section border-y border-white/10 bg-background-elevated"
      aria-labelledby="about-title"
    >
      <div className="shell split lg:gap-20">
        <motion.div
          className="split-visual"
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            className="portrait-plate mx-auto max-w-sm lg:mx-0"
            role="img"
            aria-label="סביבת עבודה — סטודיו דיגיטלי"
          >
            <div className="absolute inset-x-0 bottom-8 z-10 px-6 text-center">
              <p className="text-[1.5rem] font-extrabold tracking-tight text-white">
                Aviya
              </p>
              <p className="mt-1 text-[0.75rem] font-medium tracking-[0.12em] uppercase text-foreground-muted">
                Strategy · Craft · Code
              </p>
            </div>
          </div>
          <p className="mt-5 text-center text-[0.8rem] leading-relaxed text-foreground-muted lg:text-start">
            סטודיו בוטיק · עבודה ישירה · בלי שכבות
          </p>
        </motion.div>

        <div className="split-copy max-w-none">
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            <p className="section-label">הגישה</p>
            <h2 id="about-title" className="lead max-w-[15ch] font-extrabold">
              לא רק קוד — כלי עסקי שבונה סמכות.
            </h2>
            <p className="prose-muted mt-6 max-w-xl">
              כל פרויקט מתחיל מהשאלה העסקית: מה צריך לקרות כשמישהו נכנס. משם
              נבנים מסר, חוויה, וקוד — כדי שהאתר יעבוד בשבילכם, לא רק ״ייראה
              יפה״. השורה:{" "}
              <span className="font-medium text-foreground-soft">
                שקיפות מלאה, ליווי אישי, קוד נקי.
              </span>
            </p>
          </motion.div>

          <motion.ul
            className="mt-12 grid gap-3 sm:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-8% 0px" }}
          >
            {pillars.map((p) => (
              <motion.li
                key={p.title}
                variants={staggerItem}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md"
              >
                <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-accent-soft text-accent">
                  <Icon icon={Check} size="xs" />
                </div>
                <p className="text-[0.95rem] font-bold tracking-tight text-white">
                  {p.title}
                </p>
                <p className="mt-2 text-[0.86rem] font-normal leading-[1.65] text-foreground-muted">
                  {p.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
