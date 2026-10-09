"use client";

import { useState } from "react";
import { conceptFilters, type Concept, type ConceptFilter } from "@/data/concepts";
import { ConceptFrame } from "@/components/studio/ConceptFrame";

export function ConceptGallery({ concepts }: { concepts: Concept[] }) {
  const [filter, setFilter] = useState<ConceptFilter>("all");
  const visible = concepts.filter((item) => filter === "all" || item.category === filter);

  return (
    <div className="gallery">
      <div className="filters" role="toolbar" aria-label="סינון כיווני עיצוב">
        {conceptFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length === 1 ? "מוצג כיוון אחד" : `מוצגים ${visible.length} כיוונים`}
      </p>
      <ul className="folio">
        {concepts.map((concept) => {
          const shown = filter === "all" || concept.category === filter;
          return (
            <li key={concept.id} className={`folio-${concept.layout}`} hidden={!shown}>
              <ConceptFrame concept={concept} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
