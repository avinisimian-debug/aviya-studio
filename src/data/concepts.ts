export type ConceptCategory = "service" | "shop" | "clinic" | "landing" | "editorial";

/**
 * Case-study fields:
 *  - challenge   The Business Challenge — what the business is up against.
 *  - solution    The UX / Visual Solution — the structural and visual answer.
 *  - conversion  The Conversion Mechanism — how the page turns attention into action.
 *  - craft       The details a boutique studio sweats: grid, rhythm, type, flow.
 */
export type Concept = {
  id: string;
  category: ConceptCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  layout: "wide" | "tall" | "regular";
  challenge: string;
  solution: string;
  conversion: string;
  craft: string[];
};

/** Original design directions, written as architectural case studies. Not client work. */
export const concepts: Concept[] = [
  {
    id: "service",
    category: "service",
    categoryLabel: "עסק שירותים",
    title: "מסר אחד, ואז פעולה",
    summary:
      "אתר שירותים שנבנה סביב הצעה אחת חדה — ומוביל אליה בלי לפרק את הקשב בדרך.",
    layout: "wide",
    challenge:
      "העסק מציג חמש הצעות שונות בעמוד אחד. הלקוח לא יודע על מה הוא מסתכל, והקשב מתפזר בין כפתורים שמתחרים זה בזה.",
    solution:
      "עמוד שמדבר בשפה אחת: כותרת אחת חדה, שלושה שלבי שירות בקצב ברור, והיררכיה שזזה מלמעלה למטה בלי תפריט שמפצל את העין.",
    conversion:
      "פעולה אחת שנשארת באותו מקום בכל מקטע, עם טופס קצר. אין ארבעה כפתורים שונים — יש צעד אחד ברור למי שהשתכנע.",
    craft: ["גריד 12 עמודות", "היררכיית כותרות", "פעולה אחידה", "קצב אנכי"],
  },
  {
    id: "shop",
    category: "shop",
    categoryLabel: "חנות",
    title: "חנות שנראית כמו מותג",
    summary:
      "מסחר שהופך גלילה לקנייה: המוצר גיבור, המחיר חלק מהקומפוזיציה, והרכישה נשארת באותה שפה.",
    layout: "tall",
    challenge:
      "מותג שמוכר מוצרים אמיתיים, אבל החנות נראית כמו קטלוג כללי שקונים ממנו רק לפי מחיר. המותג נעלם ברגע שהמוצר נכנס לעגלה.",
    solution:
      "גריד שקט שבו המוצר הוא הגיבור: צילום בקנה מידה קבוע, רווחים נדיבים, ומחיר שיושב בתוך הקומפוזיציה במקום להידחק כמדבקה בסוף.",
    conversion:
      "מסלול רכישה חלק — הוספה לסל, תשלום ואישור — בלי מסכים מיותרים ובלי לאבד את ההקשר של המותג לאורך הדרך.",
    craft: ["גריד מוצרים", "קצב רווחים", "מסך מוצר", "מסלול תשלום"],
  },
  {
    id: "clinic",
    category: "clinic",
    categoryLabel: "קליניקה",
    title: "שקט שמזמין תיאום",
    summary:
      "רשת של רוגע ואמון: הרבה אוויר, שעות ברורות, ותיאום כפעולה הראשית — בלי רעש שיווקי.",
    layout: "regular",
    challenge:
      "קליניקה או מקצוע טיפולי. ההחלטה מתחילה באמון, אבל האתר צועק מבצעים ומכביד בדיוק על מי שמחפש להירגע.",
    solution:
      "הרבה אוויר, טיפוגרפיה שקטה, ושעות פעילות ברורות מעל הפינה. הצבע, המרחב והקצב נותנים תחושת רוגע בלי לוותר על מקצועיות.",
    conversion:
      "תיאום הוא הפעולה הראשית, זמין בכל מקטע ובלי טופס ארוך. הפרטים נאספים במינימום חיכוך ובמקסימום אמון.",
    craft: ["מרחב לבן", "טון רגוע", "שעות ברורות", "תיאום ישיר"],
  },
  {
    id: "landing",
    category: "landing",
    categoryLabel: "דף נחיתה",
    title: "עמוד אחד לקמפיין",
    summary:
      "דף שנבנה לתנועה עם כוונה: הבטחה אחת מעל הקפל, הוכחה קצרה, ופעולה אחת ברורה.",
    layout: "tall",
    challenge:
      "תנועה שמגיעה ממודעה או מהמלצה עם כוונה, ונוחתת על אתר שלם עם עשרה מסרים. הלקוח לא מוצא את הצעד הבא וממשיך הלאה.",
    solution:
      "הבטחה אחת מעל הקפל, הוכחה קצרה שמחזיקה אותה, ופעולה אחת. כל מקטע מקדם לעבר ההחלטה — בלי ניווט ובלי הסחות.",
    conversion:
      "טופס קצר או שיחה, כפתור שחוזר באותו עיצוב בכל פעם. המדידה פשוטה: כמה מהתנועה השאירה פרטים — וזהו הציון.",
    craft: ["מעל הקפל", "סדר הוכחות", "פעולה אחת", "מדידת פניות"],
  },
  {
    id: "editorial",
    category: "editorial",
    categoryLabel: "מותג",
    title: "עמוד שנקרא כמו מערכת",
    summary:
      "מותג שנבנה מטון ולא ממידע: טיפוגרפיה בקנה מידה גדול, שוליים רחבים, ובלוק צבע שמוביל את העין.",
    layout: "wide",
    challenge:
      "מותג שצריך טון לפני שהוא צריך עוד עמוד מידע. הוא נראה כמו כולם, ולעין אין סיבה לזכור אותו אחרי היציאה מהעמוד.",
    solution:
      "אות גדולה בקנה מידה עריכתי, שוליים רחבים, ובלוק צבע שמוביל את העין. הטיפוגרפיה עצמה הופכת לזהות, לא רק לטקסט.",
    conversion:
      "הטון בונה יוקרה, והפנייה מוצעת כהזמנה להמשך — לא כדחיפה. מי שהתרשם ממילא מחפש איך לדבר איתכם.",
    craft: ["קנה מידה עריכתי", "שוליים", "בלוק צבע", "זהות טיפוגרפית"],
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
