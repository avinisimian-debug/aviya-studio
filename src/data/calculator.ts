export const calculatorSteps = {
  categories: [
    { id: "service", label: "שירותים / ייעוץ", hint: "B2B, קואצ׳ינג, משרד" },
    { id: "clinic", label: "קליניקה / טיפול", hint: "בריאות, יופי, טיפול" },
    { id: "commerce", label: "מסחר / מוצר", hint: "חנות או מוצר יחיד" },
    { id: "brand", label: "מותג אישי / קריאייטיב", hint: "תיק עבודות וסמכות" },
    { id: "local", label: "עסק מקומי", hint: "מסעדה, חנות, שירות שכונתי" },
  ],
  goals: [
    { id: "leads", label: "לידים ופניות", hint: "טופס, וואטסאפ, שיחות" },
    { id: "trust", label: "אמינות וסמכות", hint: "להיראות פרימיום מול מתחרים" },
    { id: "sales", label: "מכירות אונליין", hint: "תשלום / הזמנות" },
    { id: "booking", label: "זימון תורים", hint: "יומן אוטומטי 24/7" },
  ],
  timelines: [
    { id: "urgent", label: "בהול — עד 3 שבועות", hint: "ממוקד ומצומצם" },
    { id: "standard", label: "סטנדרטי — 4–6 שבועות", hint: "הנתיב המומלץ" },
    { id: "flexible", label: "גמיש — 6–10 שבועות", hint: "מערכת / היקף רחב" },
  ],
} as const;

export type CalcCategory = (typeof calculatorSteps.categories)[number]["id"];
export type CalcGoal = (typeof calculatorSteps.goals)[number]["id"];
export type CalcTimeline = (typeof calculatorSteps.timelines)[number]["id"];

export type CalculatorAnswers = {
  category: CalcCategory | null;
  goal: CalcGoal | null;
  timeline: CalcTimeline | null;
};

export type SolutionFit = {
  packageId: "signal" | "atelier" | "monument";
  packageName: string;
  priceFrom: string;
  weeks: string;
  summary: string;
  bullets: string[];
};

const solutions: Record<SolutionFit["packageId"], SolutionFit> = {
  signal: {
    packageId: "signal",
    packageName: "Signal",
    priceFrom: "החל מ־₪6,500",
    weeks: "2–3 שבועות",
    summary:
      "עמוד נחיתה / נוכחות מדויקת — מושלם כשצריך נוכחות ממירה מהר, בלי לוותר על טעם.",
    bullets: [
      "מסר ופוזישן חדים",
      "CTA אחד ברור",
      "מובייל-first וביצועים",
      "טופס / WhatsApp",
    ],
  },
  atelier: {
    packageId: "atelier",
    packageName: "Atelier",
    priceFrom: "החל מ־₪14,500",
    weeks: "4–6 שבועות",
    summary:
      "אתר מותג מלא — הנתיב הנכון לרוב העסקים: אמון, סיפור, ומסלול פניות שלא מרגיש תבנית.",
    bullets: [
      "מבנה רב־סקשנים",
      "אנימציות עם משמעות",
      "תיק / הוכחות",
      "SEO בסיסי + אנליטיקס",
    ],
  },
  monument: {
    packageId: "monument",
    packageName: "Monument",
    priceFrom: "החל מ־₪28,000",
    weeks: "6–10 שבועות",
    summary:
      "מערכת דיגיטלית מלאה — חנות, אינטגרציות, או מסלולי המרה מרובים עם עומק מוצרי.",
    bullets: [
      "ארכיטקטורה להרחבה",
      "תשלומים / אוטומציות",
      "CMS לעדכונים",
      "ליווי השקה מורחב",
    ],
  },
};

export function recommendSolution(a: CalculatorAnswers): SolutionFit {
  const category = a.category;
  const goal = a.goal;
  const timeline = a.timeline;

  // Urgent delivery → focused landing
  if (timeline === "urgent") {
    return solutions.signal;
  }

  // Commerce / online sales / long build → product system
  if (
    category === "commerce" ||
    goal === "sales" ||
    timeline === "flexible"
  ) {
    return solutions.monument;
  }

  // Default premium brand site
  return solutions.atelier;
}

export function labelFor(
  group: "categories" | "goals" | "timelines",
  id: string | null
): string {
  if (!id) return "—";
  const list = calculatorSteps[group];
  const found = list.find((x) => x.id === id);
  return found?.label ?? id;
}
