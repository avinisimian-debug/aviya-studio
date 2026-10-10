"use client";

import { useState } from "react";
import { conceptFilters, type Concept, type ConceptFilter } from "@/data/concepts";
import { ConceptFrame } from "@/components/studio/ConceptFrame";

export function ConceptGallery({
  concepts,
  detailed = false,
}: {
  concepts: Concept[];
  detailed?: boolean;
}) {
  const [filter, setFilter] = useState<ConceptFilter>("all");
  const visible = concepts.filter((item) => filter === "all" || item.category === filter);

  return (
    <div className="gallery">
      <div className="filters" role="toolbar" aria-label="סינון מקרי בוחן">
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
        {visible.length === 1 ? "מוצג מקרה בוחן אחד" : `מוצגים ${visible.length} מקרי בוחן`}
      </p>
      <ul className={`folio${visible.length === 1 ? " folio-single" : ""}`}>
        {concepts.map((concept) => {
          const shown = filter === "all" || concept.category === filter;
          return (
            <li key={concept.id} className={`folio-${concept.layout}`} hidden={!shown}>
              <ConceptFrame concept={concept} detailed={detailed} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
