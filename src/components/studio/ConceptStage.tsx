import type { Concept } from "@/data/concepts";

/**
 * Miniature, styled preview of the kind of screen each case study describes.
 * Not a wireframe skeleton — real labels, prices, slots and actions, drawn
 * with the studio palette so every card reads as a finished agency preview.
 */
export function ConceptStage({ category }: { category: Concept["category"] }) {
  if (category === "shop") {
    return (
      <div className="stage stage-shop">
        <div className="stage-top">
          <span>קולקציה</span>
          <i />
        </div>
        <div className="product-grid" aria-hidden="true">
          <span>
            <em>מנוי חודשי</em>
            <b>₪89</b>
          </span>
          <span>
            <em>חבילת פרימיום</em>
            <b>₪149</b>
          </span>
          <span>
            <em>מארז מתנה</em>
            <b>₪210</b>
          </span>
          <span>
            <em>משלוח מהיר</em>
            <b>₪29</b>
          </span>
        </div>
      </div>
    );
  }

  if (category === "clinic") {
    return (
      <div className="stage stage-clinic">
        <p>יומן פגישות</p>
        <div className="slot-list">
          <span>
            <i>10:00</i>
            פנוי
          </span>
          <span className="is-active">
            <i>12:30</i>
            נבחר
          </span>
          <span>
            <i>16:00</i>
            פנוי
          </span>
        </div>
        <b>קביעת תור</b>
      </div>
    );
  }

  if (category === "landing") {
    return (
      <div className="stage stage-landing">
        <p>עמוד קמפיין</p>
        <strong className="stage-claim">עוד לקוחות, פחות רעש</strong>
        <span className="stage-field">שם וטלפון</span>
        <b>להשארת פרטים</b>
      </div>
    );
  }

  if (category === "editorial") {
    return (
      <div className="stage stage-editorial">
        <p>המותג</p>
        <strong className="stage-brand" aria-hidden="true">
          AV
        </strong>
        <span className="stage-sub">זהות · טון · נוכחות</span>
      </div>
    );
  }

  return (
    <div className="stage stage-service">
      <p>שירות אחד, מסלול ברור</p>
      <ol>
        <li>
          <i>01</i>
          שיחה ואפיון
        </li>
        <li>
          <i>02</i>
          עיצוב ופיתוח
        </li>
        <li>
          <i>03</i>
          השקה וליווי
        </li>
      </ol>
      <b>לקביעת שיחה</b>
    </div>
  );
}
