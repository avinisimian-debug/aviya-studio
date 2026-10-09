export const navLinks = [
  { href: "#about", label: "אודות" },
  { href: "#process", label: "תהליך" },
  { href: "#services", label: "שירותים" },
  { href: "#work", label: "עבודות" },
  { href: "#packages", label: "חבילות" },
  { href: "#faq", label: "שאלות" },
];

export const packages = [
  {
    id: "signal",
    name: "Signal",
    tagline: "נוכחות מדויקת",
    price: "החל מ־₪6,500",
    timeline: "2–3 שבועות",
    fit: "עסק שמתחיל נכון",
    featured: false,
    includes: [
      "עמוד נחיתה קולנועי",
      "הודעה ופוזישן חדים",
      "מבנה RTL וביצועים",
      "טופס / WhatsApp",
      "שני סיבובי תיקונים",
    ],
  },
  {
    id: "atelier",
    name: "Atelier",
    tagline: "אתר מותג מלא",
    price: "החל מ־₪14,500",
    timeline: "4–6 שבועות",
    fit: "הבחירה של רוב הלקוחות",
    featured: true,
    includes: [
      "אתר מולטי־סקשן מלא",
      "אסטרטגיית חוויה + תוכן",
      "אנימציות סיפוריות",
      "תיק עבודות / מקרים",
      "SEO בסיסי + אנליטיקס",
      "שלושה סיבובי ליטוש",
    ],
  },
  {
    id: "monument",
    name: "Monument",
    tagline: "מערכת דיגיטלית",
    price: "החל מ־₪28,000",
    timeline: "6–10 שבועות",
    fit: "מותגים ומוצרים",
    featured: false,
    includes: [
      "מערכת עיצוב + קומפוננטות",
      "CMS / אזורי תוכן",
      "אינטגרציות (CRM, יומן)",
      "מיקרו־אינטראקציות",
      "אופטימיזציית המרה",
      "ליווי השקה מורחב",
    ],
  },
];

export const services = [
  {
    id: "01",
    title: "אתרי מותג",
    body: "נוכחות שמרגישה כמו מוצר: היררכיה, טמפו, ואמון — לא תבנית עם תמונות יפות.",
  },
  {
    id: "02",
    title: "עמודי המרה",
    body: "דפי נחיתה עם מסר אחד, מסלול אחד, ו-CTA אחד. בלי רעש שמפצל קשב.",
  },
  {
    id: "03",
    title: "מיתוג דיגיטלי",
    body: "שפה, טיפוגרפיה ומערכת ויזואלית אחת — מהמסך הראשון ועד הפוטר.",
  },
  {
    id: "04",
    title: "שיפוץ אתרים",
    body: "מאתר שנראה ״ישן״ לחוויה פרימיום — בלי לאבד את מה שכבר עובד.",
  },
  {
    id: "05",
    title: "מוצר / Web App UI",
    body: "ממשקים צלולים למוצרים דיגיטליים: זרימות, מצבים, ודיוק בכל אינטראקציה.",
  },
  {
    id: "06",
    title: "ייעוץ חוויה",
    body: "ביקורת אסטרטגית + כיוון לפני שמשקיעים חודשים בבנייה הלא נכונה.",
  },
];

/** Removed invented clients: Atelier Nord, Ledger & Co., Halo Clinic, Orbit Labs. */
export const portfolio: {
  id: string;
  brand: string;
  field: string;
  year: string;
  line: string;
  tone: string;
}[] = [];

/** Removed invented case studies and metrics (×2.1, +38%, Halo Clinic). */
export const cases: {
  id: string;
  brand: string;
  challenge: string;
  move: string;
  result: string;
  metric: string;
  metricLabel: string;
}[] = [];

/** Removed invented reviews: נועה כהן, אלון מרקוביץ׳, ד״ר יעל אביב. */
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Framer Motion",
  "Tailwind CSS",
  "Webflow",
  "Figma",
  "Sanity",
  "Supabase",
  "Vercel",
  "Stripe",
  "GSAP",
];

export const timeline = [
  {
    week: "שבוע 0",
    title: "התאמה",
    body: "שיחת היכרות, סינון התאמה, והגדרת הצלחה משותפת.",
  },
  {
    week: "שבוע 1",
    title: "גילוי",
    body: "ראיונות, מתחרים, מסר ליבה, ואבני דרך לתוכן.",
  },
  {
    week: "שבוע 2–3",
    title: "כיוון",
    body: "ארכיטקטורת חוויה, כיוון ויזואלי, ואב־טיפוס אינטראקטיבי.",
  },
  {
    week: "שבוע 3–6",
    title: "בנייה",
    body: "פיתוח מלא, אנימציה, ביצועים, ורספונסיביות אמיתית.",
  },
  {
    week: "סיום",
    title: "השקה",
    body: "QA, אנליטיקס, העברה, והשקה שמרגישה בשליטה.",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "גילוי",
    body: "מסננים רעש. מבינים קהל, הצעה, והחלטות שהאתר חייב להוביל אליהן.",
  },
  {
    n: "02",
    title: "כיוון",
    body: "פוזישן, מבנה מסע, ושפה ויזואלית אחת — לפני שורה של קוד.",
  },
  {
    n: "03",
    title: "בנייה",
    body: "מערכת, לא דפים. טיפוגרפיה, תנועה, ביצועים — הכל מדוד.",
  },
  {
    n: "04",
    title: "השקה",
    body: "ליטוש, QA, השקה, ומסלול ברור למה שקורה אחרי.",
  },
];
