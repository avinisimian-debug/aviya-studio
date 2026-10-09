import type { Concept } from "@/data/concepts";

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
}: {
  concept: Concept;
  heading?: "h2" | "h3" | "p";
}) {
  const Title = heading;
  return (
    <article className={`concept concept-${concept.layout} concept-${concept.category}`}>
      <div className="browser" aria-hidden="true">
        <div className="browser-bar">
          <span />
          <span />
          <span />
          <em>כיוון עיצובי</em>
        </div>
        <Stage category={concept.category} />
      </div>
      <div className="concept-meta">
        <p className="concept-kicker">
          <span>קונספט</span>
          <span>כיוון עיצובי</span>
          <span>{concept.categoryLabel}</span>
        </p>
        <Title className="concept-title">{concept.title}</Title>
        <p>{concept.summary}</p>
      </div>
    </article>
  );
}
