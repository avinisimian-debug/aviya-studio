import { LANDING } from "@/data/landing";

/** Honest studio texture — no fake clients, no fake logos */

export const studioHours =
  "ימים א׳–ה׳ · בדרך כלל חוזרים תוך 24 שעות · עבודה מרחוק לכל הארץ";

export const bringToCall = [
  "מה העסק מוכר, במשפט אחד",
  "מי הלקוח שאתם הכי רוצים",
  "למה לבחור בכם ולא במתחרה",
  "מה הפעולה באתר: שיחה / וואטסאפ / רכישה",
  "לוגו ותמונות אם יש — אם אין, נסתדר",
] as const;

export const weekFlow = [
  { d: "יום 1", t: "שיחה קצרה", b: "מבינים מטרה, לא מוכרים חבילה." },
  { d: "ימים 2–4", t: "מסר + מבנה", b: "מה כתוב מעל הקיפול, ומה הלקוח עושה." },
  { d: "ימים 5–10", t: "עיצוב ובנייה", b: "מובייל, טופס, וואטסאפ, קצב." },
  { d: "סיום", t: "עולים לאוויר", b: "אתם מקבלים נכס. הבעלות שלכם." },
] as const;

export const firstChat = [
  { who: "them" as const, t: "היי, ראיתי את האתר. צריך נוכחות לעסק" },
  { who: "aviya" as const, t: "היי, אביה. מה העסק, ומה הלקוח צריך לעשות באתר?" },
  { who: "them" as const, t: "קליניקה. שיתאמו תור / ישאירו פרטים" },
  {
    who: "aviya" as const,
    t: "מעולה. נבנה מסר, אמון, וטופס/וואטסאפ. בלי לחץ — קודם כיוון.",
  },
] as const;

export const igPosts = [
  {
    t: "רילס · כיווני עיצוב",
    d: "כיווני עיצוב, לא תיק לקוחות.",
  },
  {
    t: "רילס · לפני / אחרי",
    d: "למה אתר ישן שורף פניות, ומה משנים.",
  },
  {
    t: "רילס · מובייל",
    d: "איך נראה מסך ראשון בטלפון.",
  },
] as const;

export const honestNotes = {
  gallery:
    "אלה כיווני עיצוב ברמה — לא לוגואים מזויפים של ״לקוחות בינלאומיים״. העסק שלכם יקבל שפה משלו.",
  voices:
    "בלי שמות מומצאים. אלה הדברים שבעלי עסקים חוזרים עליהם כשהם רוצים אתר שעובד — לא עוד תבנית.",
} as const;

/**
 * Removed composite quotes that read like reviews
 * ("מה שחוזר אצל בעלי מקצוע" and three similar lines).
 */
export const ownerPriorities: {
  q: string;
  a: string;
  metric: string;
}[] = [];

/** @deprecated use ownerPriorities — kept empty to avoid accidental named quotes */
export const happyClients = ownerPriorities;

export const realFacts = [
  { k: "מי בונה", v: "אביה, אדם אחד — לא מוקד" },
  { k: "טלפון / וואטסאפ", v: "055-557-3090" },
  { k: "אינסטגרם", v: LANDING.instagramHandle },
  { k: "שעות", v: "א׳–ה׳ · מענה לרוב תוך יום" },
  { k: "איפה", v: "כל הארץ, מרחוק" },
  { k: "היקף", v: `עד ${LANDING.monthlyCap} עסקים בחודש` },
] as const;
