"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { faqCategories, faqs, type FaqItem } from "@/data/faqs";
import { LANDING } from "@/data/landing";
import { cn } from "@/lib/cn";
import { easeSmooth } from "@/lib/motion";
import { Icon } from "@/components/ui/Icon";
import { MessageCircle, Minus, Plus, Search, X } from "@/lib/icons";

type Category = (typeof faqCategories)[number];

const ACCORDION_EASE = easeSmooth;
const ACCORDION_DURATION = 0.45;

function faqKey(item: FaqItem) {
  return `${item.category}::${item.q}`;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Highlight query matches without breaking RTL markup */
function HighlightText({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;

  try {
    const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <mark
              key={i}
              className="rounded-[2px] bg-white/10 px-0.5 text-white"
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  } catch {
    return <>{text}</>;
  }
}

function categoryCount(cat: Category, searchQuery: string): number {
  const q = searchQuery.trim().toLowerCase();
  return faqs.filter((item) => {
    if (cat !== "הכל" && item.category !== cat) return false;
    if (!q) return true;
    return (
      item.q.toLowerCase().includes(q) ||
      item.a.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }).length;
}

function whatsappFaqUrl(question?: string) {
  const base = question
    ? `היי, ראיתי את השאלה ״${question}״ באתר — אשמח להבין איך זה עובד בעסק שלי.`
    : "היי, רוצה להבין איך זה עובד בעסק שלי — אשמח לדבר בוואטסאפ.";
  return `https://wa.me/${LANDING.whatsappE164}?text=${encodeURIComponent(base)}`;
}

function FaqAccordionItem({
  item,
  index,
  isOpen,
  query,
  onToggle,
  onKeyNav,
  panelId,
  buttonId,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  query: string;
  onToggle: () => void;
  onKeyNav: (e: KeyboardEvent<HTMLButtonElement>, index: number) => void;
  panelId: string;
  buttonId: string;
}) {
  return (
    <div className="faq-item">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          className={cn(
            "group flex w-full items-start justify-between gap-5 py-6 text-right md:gap-8 md:py-7",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
          )}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={(e) => onKeyNav(e, index)}
        >
          <span className="min-w-0 flex-1">
            <span className="faq-category">{item.category}</span>
            <span
              className={cn(
                "faq-question mt-2 block transition-colors duration-300",
                isOpen && "text-white"
              )}
            >
              <HighlightText text={item.q} query={query} />
            </span>
          </span>
          <span
            className={cn(
              "mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-colors duration-300",
              isOpen
                ? "border-white/20 bg-white/[0.06] text-white"
                : "text-foreground-muted group-hover:border-white/20 group-hover:text-foreground-soft"
            )}
            aria-hidden
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "minus" : "plus"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.22, ease: ACCORDION_EASE }}
                className="flex"
              >
                <Icon icon={isOpen ? Minus : Plus} size="sm" strokeWidth={1.5} />
              </motion.span>
            </AnimatePresence>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: ACCORDION_DURATION, ease: ACCORDION_EASE },
              opacity: { duration: 0.3, ease: ACCORDION_EASE },
            }}
            className="overflow-hidden"
          >
            <div className="faq-panel">
              <p className="faq-answer">
                <HighlightText text={item.a} query={query} />
              </p>
              <p className="faq-micro-cta">
                רוצים לדעת איך זה עובד בעסק שלכם?{" "}
                <a
                  href={whatsappFaqUrl(item.q)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq-micro-link"
                >
                  דברו איתי בוואטסאפ
                </a>
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const uid = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<Category>("הכל");
  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(() =>
    faqs[0] ? faqKey(faqs[0]) : null
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((item) => {
      const catOk = category === "הכל" || item.category === category;
      if (!catOk) return false;
      if (!q) return true;
      return (
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  useEffect(() => {
    if (!filtered.length) {
      setOpenKey(null);
      return;
    }
    if (openKey && !filtered.some((f) => faqKey(f) === openKey)) {
      setOpenKey(faqKey(filtered[0]!));
    }
  }, [filtered, openKey]);

  const chipCounts = useMemo(() => {
    const map = {} as Record<Category, number>;
    for (const cat of faqCategories) {
      map[cat] = categoryCount(cat, query);
    }
    return map;
  }, [query]);

  const onKeyNav = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = filtered.length - 1;
      if (last < 0) return;

      let next = index;
      if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        next = index >= last ? 0 : index + 1;
      } else if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault();
        next = index <= 0 ? last : index - 1;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = last;
      } else {
        return;
      }

      document.getElementById(`${uid}-btn-${next}`)?.focus();
    },
    [filtered.length, uid]
  );

  const resultLabel: ReactNode = (
    <>
      מציג{" "}
      <span className="font-medium tabular-nums text-foreground-soft">
        {filtered.length}
      </span>{" "}
      מתוך <span className="tabular-nums">{faqs.length}</span> שאלות
      {query ? <> עבור ״{query}״</> : null}
      {category !== "הכל" ? <> · {category}</> : null}
    </>
  );

  return (
    <section
      id="faq"
      className="section border-t border-white/10 bg-background"
      aria-labelledby={`${uid}-title`}
    >
      <div className="shell">
        <header className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-16">
          <div>
            <p className="section-label">שאלות שמפרקות התנגדויות</p>
            <h2
              id={`${uid}-title`}
              className="lead max-w-[16ch] font-extrabold"
            >
              תשובות ישירות. בלי שיווק. מקסימום אמון.
            </h2>
            <p className="prose-muted mt-5 max-w-xl">
              {faqs.length} שאלות שלקוחות באמת שואלים — מחיר, זמנים, בעלות, גוגל
              ואחרי ההשקה. מצאו תשובה מהר, או המשיכו ישר לוואטסאפ.
            </p>
          </div>

          <div className="faq-search">
            <label htmlFor={`${uid}-search`} className="sr-only">
              חיפוש בשאלות ותשובות
            </label>
            <Icon
              icon={Search}
              size="sm"
              strokeWidth={1.5}
              className="pointer-events-none absolute top-1/2 end-4 z-[1] -translate-y-1/2 text-foreground-muted"
            />
            <input
              ref={searchRef}
              id={`${uid}-search`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חפשו — מחיר, גוגל, עריכה…"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="faq-search-input"
              aria-controls={`${uid}-list`}
              aria-describedby={`${uid}-count`}
            />
            {query ? (
              <button
                type="button"
                className="absolute top-1/2 start-3 z-[1] -translate-y-1/2 rounded-md p-1.5 text-foreground-muted transition-colors hover:text-white"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                aria-label="נקה חיפוש"
              >
                <Icon icon={X} size="sm" strokeWidth={1.5} />
              </button>
            ) : null}
          </div>
        </header>

        {/* Filter chips — glass outline / solid white active */}
        <div
          className="mt-10 -mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]"
          role="radiogroup"
          aria-label="סינון לפי קטגוריה"
        >
          <div className="flex w-max min-w-full flex-wrap gap-2 md:w-full">
            {faqCategories.map((cat) => {
              const count = chipCounts[cat];
              if (cat !== "הכל" && count === 0 && query) return null;
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setCategory(cat)}
                  className={cn("faq-chip", active && "faq-chip-active")}
                >
                  <span>{cat}</span>
                  <span className="faq-chip-count tabular-nums">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p
          id={`${uid}-count`}
          className="mt-6 text-[0.8rem] tracking-[0.02em] text-foreground-muted"
          aria-live="polite"
          aria-atomic="true"
        >
          {resultLabel}
        </p>

        <LayoutGroup>
          <div id={`${uid}-list`} className="faq-list mt-4" role="list">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeSmooth }}
                className="border-y border-white/10 py-14 text-center"
                role="status"
              >
                <p className="text-[1.05rem] font-medium tracking-tight text-foreground-soft">
                  לא מצאנו התאמה לחיפוש.
                </p>
                <p className="mt-3 text-[0.95rem] leading-7 text-foreground-muted">
                  נסו מילה אחרת, אפסו סינון — או{" "}
                  <a
                    href={whatsappFaqUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="faq-micro-link"
                  >
                    דברו איתי בוואטסאפ
                  </a>
                  .
                </p>
                <button
                  type="button"
                  className="btn btn-ghost mt-8"
                  onClick={() => {
                    setQuery("");
                    setCategory("הכל");
                  }}
                >
                  איפוס סינון
                </button>
              </motion.div>
            ) : (
              filtered.map((item, i) => {
                const key = faqKey(item);
                return (
                  <div key={key} role="listitem">
                    <FaqAccordionItem
                      item={item}
                      index={i}
                      isOpen={openKey === key}
                      query={query}
                      buttonId={`${uid}-btn-${i}`}
                      panelId={`${uid}-panel-${i}`}
                      onToggle={() =>
                        setOpenKey((prev) => (prev === key ? null : key))
                      }
                      onKeyNav={onKeyNav}
                    />
                  </div>
                );
              })
            )}
          </div>
        </LayoutGroup>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center">
          <div>
            <p className="text-[1.05rem] font-medium tracking-tight text-white">
              לא מצאתם את התשובה שחיפשתם?
            </p>
            <p className="mt-2 max-w-lg text-[0.92rem] leading-7 text-foreground-muted">
              שאלה אחת מדויקת בוואטסאפ — תשובה כנה, בלי לחץ.
            </p>
          </div>
          <a
            href={whatsappFaqUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-foreground-soft transition-colors hover:text-white"
          >
            <Icon
              icon={MessageCircle}
              size="sm"
              strokeWidth={1.5}
              className="text-[#25D366]"
            />
            דברו איתי בוואטסאפ
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
