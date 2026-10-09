"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Concept } from "@/data/concepts";

const easeOut = [0.22, 1, 0.36, 1] as const;
const easeSmooth = [0.4, 0, 0.2, 1] as const;

const layers = [
  { key: "challenge", label: "האתגר העסקי" },
  { key: "solution", label: "הפתרון העיצובי" },
  { key: "conversion", label: "מנגנון ההמרה" },
] as const;

function Stage({ category }: { category: Concept["category"] }) {
  if (category === "shop") {
    return (
      <div className="stage stage-shop">
        <div className="stage-top">
          <span>חנות</span>
          <i />
        </div>
        <div className="product-grid" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (category === "clinic") {
    return (
      <div className="stage stage-clinic">
        <p>תיאום</p>
        <div className="slot-list">
          <span />
          <span />
          <span />
        </div>
        <b>קביעת שיחה</b>
      </div>
    );
  }

  if (category === "landing") {
    return (
      <div className="stage stage-landing">
        <p>הבטחה אחת</p>
        <span />
        <b>להשארת פרטים</b>
      </div>
    );
  }

  if (category === "editorial") {
    return (
      <div className="stage stage-editorial">
        <p>המותג</p>
        <span />
      </div>
    );
  }

  return (
    <div className="stage stage-service">
      <p>השירות</p>
      <ol>
        <li />
        <li />
        <li />
      </ol>
      <b>פנייה</b>
    </div>
  );
}

export function ConceptFrame({
  concept,
  heading = "h3",
  detailed = false,
}: {
  concept: Concept;
  heading?: "h2" | "h3" | "p";
  detailed?: boolean;
}) {
  const Title = heading;
  const prefersReduced = useReducedMotion();

  const revealProps = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10% 0px -10% 0px" },
        transition: { duration: 0.7, ease: easeOut },
      };

  return (
    <motion.article
      className={`concept concept-${concept.layout} concept-${concept.category}`}
      {...revealProps}
    >
      <motion.div
        className="concept-inner"
        whileHover={prefersReduced ? undefined : { y: -6 }}
        transition={{ duration: 0.35, ease: easeSmooth }}
      >
        <div className="concept-visual">
          <div className="browser" aria-hidden="true">
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <em>מקרה בוחן</em>
            </div>
            <Stage category={concept.category} />
          </div>
          <span className="case-badge">
            <span className="brand-latin">CASE</span>
            <span>{concept.categoryLabel}</span>
          </span>
        </div>

        <div className="concept-meta">
          <p className="concept-kicker">
            <span>מקרה בוחן</span>
            <span>{concept.categoryLabel}</span>
          </p>
          <Title className="concept-title">{concept.title}</Title>
          <p>{concept.summary}</p>

          {detailed ? (
            <dl className="case-layers">
              {layers.map((layer) => (
                <div key={layer.key} className="case-layer">
                  <dt>{layer.label}</dt>
                  <dd>{concept[layer.key]}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {detailed ? (
            <ul className="case-craft" aria-label="עבודת הפרטים">
              {concept.craft.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  );
}
