const facets = [
  { n: "01", title: "זהות דיגיטלית בהתאמה אישית", en: "Custom Identity" },
  { n: "02", title: "מושן מדויק ומחושב", en: "Precision Motion" },
  { n: "03", title: "הנדסת המרות", en: "Conversion Engineering" },
  { n: "04", title: "נכס דיגיטלי לטווח ארוך", en: "Long-Term Asset" },
] as const;

/**
 * Hero side panel — a quiet-luxury studio signature.
 *
 * Replaces the technical HUD: a refined card that speaks to craft, prestige and
 * lasting business value in plain, confident typography — no code, no gauges.
 */
export function SignaturePanel() {
  return (
    <figure className="signature">
      <div className="signature-head">
        <span className="signature-seal brand-latin" aria-hidden="true">
          A
        </span>
        <span className="signature-kicker brand-latin">Bespoke Digital Architecture</span>
      </div>

      <p className="signature-quote">
        נוכחות דיגיטלית ברמת בית אופנה — קוד בעבודת יד, עיצוב שמחזיק שנים.
      </p>

      <ul className="signature-facets">
        {facets.map((facet) => (
          <li key={facet.en}>
            <span className="brand-latin">{facet.n}</span>
            <span className="signature-facet-text">
              {facet.title}
              <em>{facet.en}</em>
            </span>
          </li>
        ))}
      </ul>

      <figcaption className="signature-foot">
        <span className="brand-latin">AVIYA STUDIO</span>
        <span>עבודת יד · קוד מאפס</span>
      </figcaption>
    </figure>
  );
}
