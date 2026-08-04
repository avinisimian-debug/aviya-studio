"use client";

import { motion } from "framer-motion";
import { clientBrands } from "@/data/landing";
import { fadeRise } from "@/lib/motion";

/** Infinite brand ticker — grayscale hover pop */
export function SocialProof() {
  const row = [...clientBrands, ...clientBrands];

  return (
    <section
      id="clients"
      className="border-b border-white/10 bg-background-elevated py-10 md:py-12"
      aria-label="לקוחות ומותגים"
    >
      <div className="shell mb-8">
        <motion.p
          className="text-center text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-foreground-muted"
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          סומכים עלינו מותגים ובעלי עסקים
        </motion.p>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-l from-transparent to-background-elevated md:w-28"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-r from-transparent to-background-elevated md:w-28"
          aria-hidden
        />

        <div className="logo-marquee" dir="ltr">
          <ul className="logo-marquee-track">
            {row.map((brand, i) => (
              <li key={`${brand}-${i}`}>
                <span className="logo-marquee-item">{brand}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
