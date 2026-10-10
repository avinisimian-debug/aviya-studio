import type { Concept } from "@/data/concepts";
import { ConceptStage } from "@/components/studio/ConceptStage";

const layers = [
  { key: "challenge", label: "האתגר העסקי" },
  { key: "solution", label: "הפתרון העיצובי" },
  { key: "conversion", label: "מנגנון ההמרה" },
] as const;

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

  return (
    <article
      className={`concept concept-${concept.layout} concept-${concept.category} reveal`}
    >
      <div className="concept-inner">
        <div className="concept-visual">
          <div className="browser" aria-hidden="true">
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <em>מקרה בוחן</em>
            </div>
            <ConceptStage category={concept.category} />
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
      </div>
    </article>
  );
}
