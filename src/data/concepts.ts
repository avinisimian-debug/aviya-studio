export type ConceptCategory = "service" | "shop" | "clinic" | "landing" | "editorial";

export type Concept = {
  id: string;
  category: ConceptCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  layout: "wide" | "tall" | "regular";
};

/** Original design directions. Not client projects and not company names. */
export const concepts: Concept[] = [
  {
    id: "service",
    category: "service",
    categoryLabel: "עסק שירותים",
    title: "מסר אחד, ואז פעולה",
    summary:
      "כיוון לאתר שירותים: כותרת ברורה, שלושה שלבים, וכפתור פנייה אחד. בלי תפריט שמפצל את הקשב.",
    layout: "wide",
  },
  {
    id: "shop",
    category: "shop",
    categoryLabel: "חנות",
    title: "חנות שנראית כמו מותג",
    summary:
      "כיוון לחנות: גריד מוצרים שקט, מחיר כחלק מהקומפוזיציה, ומסלול רכישה בלי מראה של קטלוג מוכן.",
    layout: "tall",
  },
  {
    id: "clinic",
    category: "clinic",
    categoryLabel: "קליניקה",
    title: "שקט שמזמין תיאום",
    summary:
      "כיוון לקליניקה או למקצוע טיפולי: הרבה אוויר, שעות ברורות, ותיאום כפעולה הראשית. בלי רעש שיווקי.",
    layout: "regular",
  },
  {
    id: "landing",
    category: "landing",
    categoryLabel: "דף נחיתה",
    title: "עמוד אחד לקמפיין",
    summary:
      "כיוון לדף נחיתה: הבטחה, הוכחת מבנה, ופעולה אחת. נבנה למודעה שמגיעה עם כוונה, לא לאתר שלם.",
    layout: "tall",
  },
  {
    id: "editorial",
    category: "editorial",
    categoryLabel: "מותג",
    title: "עמוד שנקרא כמו מערכת",
    summary:
      "כיוון מותגי: טיפוגרפיה גדולה, שוליים רחבים, ותמונה או בלוק צבע שמוביל את העין. מתאים למותג שצריך טון, לא רק מידע.",
    layout: "wide",
  },
];

export const conceptFilters = [
  { id: "all", label: "הכל" },
  { id: "service", label: "שירותים" },
  { id: "shop", label: "חנות" },
  { id: "clinic", label: "קליניקה" },
  { id: "landing", label: "נחיתה" },
  { id: "editorial", label: "מותג" },
] as const;

export type ConceptFilter = (typeof conceptFilters)[number]["id"];

const byServiceSlug: Record<string, string> = {
  landing: "landing",
  onepage: "service",
  brand: "editorial",
  expand: "service",
  redesign: "editorial",
  shop: "shop",
};

export function conceptForService(slug: string): Concept {
  const id = byServiceSlug[slug] ?? "service";
  return concepts.find((item) => item.id === id) ?? concepts[0];
}
