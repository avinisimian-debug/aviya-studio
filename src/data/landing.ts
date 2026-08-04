/**
 * Aviya — world-class conversion system
 * Positioning: websites that win clients · stores that sell · full ownership
 * Voice: elite direct-response × high-end brand craft (Hebrew)
 */

export const LANDING = {
  brand: "Aviya",
  brandDisplay: "AVIYA",
  logoSrc: "/brand/aviya-logo.png",
  tagline: "עיצוב · בנייה · צמיחה",
  promise: "בונים אתרים. בונים עסקים. יוצרים הצלחה.",
  email: "studio.aviya1@gmail.com",
  instagram: "https://www.instagram.com/studio.aviya1/",
  instagramHandle: "@studio.aviya1",
  whatsappE164: "972555573090",
  monthlyCap: 8,
  get emailUrl() {
    return `mailto:${this.email}`;
  },
  get whatsappUrl() {
    const text = encodeURIComponent(
      "היי אביה — ראיתי את האתר. אני רוצה אתר שמביא לי לקוחות (או חנות דיגיטלית) ברמה הזו."
    );
    return `https://wa.me/${this.whatsappE164}?text=${text}`;
  },
} as const;

export const HEBREW_MONTHS = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
] as const;

export function currentHebrewMonth(): string {
  return HEBREW_MONTHS[new Date().getMonth()] ?? "החודש";
}

export const businessTypes = [
  "חנות / מסחר",
  "שירותים / ייעוץ",
  "קליניקה / טיפול",
  "B2B / חברה",
  "מותג אישי",
  "אחר",
] as const;

/** Licensed high-end stock — Unsplash */
export const photos = {
  hero:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2200&q=88",
  portrait:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=88",
  story1:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=88",
  story2:
    "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=1600&q=88",
  studio:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=88",
  craft:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=88",
  fashion:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=88",
  beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=88",
  service:
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=88",
  home:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=88",
  phone:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=88",
  night:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=88",
  t1: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=88",
  t2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=88",
  t3: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=88",
} as const;

/* ════════════ HERO ════════════ */
export const heroEyebrow = "סטודיו דיגיטלי · אתרים שמביאים לקוחות · חנויות שמוכרות";
export const heroBrandLine =
  "האתר שלך לא אמור ״להיראות בסדר״. הוא אמור להביא עסקאות.";
export const heroQualifier =
  "לבעלי עסקים, מותגים וחנויות שכבר עובדים — ורוצים נוכחות דיגיטלית שמביאה לקוחות ישירים (גם בלי חנות אונליין):";

export const heroHeadlineBefore = "בונים לך ";
export const heroHeadlineEm1 = "אתר שמביא לקוחות";
export const heroHeadlineMid = " — או ";
export const heroHeadlineEm2 = "חנות דיגיטלית שמוכרת מהיום הראשון.";

export const heroSub =
  "לא חייבים למכור מוצרים אונליין. שירותים, קליניקה, ייעוץ, B2B, מותג אישי — אתר חד שמסביר למה לבחור בך, וסוגר פנייה. רוצים למכור מוצרים? בונים חנות של מותג, לא קטלוג חובבני.";

export const heroFormTitle = "רוצה שאבנה את זה ";
export const heroFormTitleEm = "לעסק שלך?";
export const heroNamePh = "איך קוראים לך?";
export const heroPhonePh = "מה המספר שלך?";
export const heroCta = "אני רוצה אתר שמביא לי לקוחות";
export const navCta = "בואו נבנה לך אתר";

export const craftSignals = [
  { k: "08", t: "עסקים בלבד בחודש" },
  { k: "14", t: "ימים — חומרים → אוויר" },
  { k: "2", t: "מסלולים: לידים / חנות" },
] as const;

/* ════════════ PATHS (what we build) ════════════ */
export const pathsTitle = "שני מסלולים. מטרה אחת: יותר לקוחות.";
export const pathsLead =
  "לא כל עסק צריך סל קניות. חלק צריכים שיחה, תיאום, הצעת מחיר. החלק השני — למכור מוצרים בלי להיות בקופה.";

export const paths = [
  {
    id: "leads",
    kicker: "מסלול א׳",
    title: "אתר שמביא לקוחות ישירים",
    body: "לעסק שירותים: מותג, אמון, הצעה ברורה, וטופס / וואטסאפ / שיחה. הלקוח מבין תוך שניות למה אתה — ופונה.",
    bullets: [
      "הודעה חדה מעל הקיפול",
      "הוכחות, תהליך, שאלות",
      "המרה: פנייה · שיחה · תיאום",
    ],
  },
  {
    id: "shop",
    kicker: "מסלול ב׳",
    title: "חנות דיגיטלית שמוכרת",
    body: "לקמעונאות ולמוצרים: קטלוג, סליקה, משלוחים, אוטומציה. נראית כמו מותג — עובדת כמו מכונת מכירות.",
    bullets: [
      "חוויית רכישה נקייה",
      "סליקה + מלאי + התראות",
      "מוכן לקמפיינים",
    ],
  },
] as const;

/* ════════════ STRIP ════════════ */
export const aboutStripTitle = "אתם לא משלמים על ״עמודים״. אתם קונים מערכת שמייצרת תוצאה.";
export const aboutStripBody =
  "מותגים רציניים לא קונים תבנית זולה כדי ״להיות ברשת״. הם משלמים על בהירות, על אמון, על קליק שהופך לפנייה או לתשלום. זה מה שאני בונה — בין אם זה אתר שירותים ובין אם חנות. הרמה לא יורדת.";

/* ════════════ SHOWCASE / TEMPLATES ════════════ */
export const showcaseTitle = "מערכות עיצוב. מיושמות על סוג העסק שלך.";
export const showcaseLead =
  "DNA ויזואלי מקצועי — לא ״תבנית לכולם״. מתאימים שפה למסלול: לידים, מסחר, או שילוב.";

export const showcases = [
  {
    name: "Forge Studio",
    cat: "שירותים · B2B",
    tone: "ink",
    img: photos.service,
    domain: "forge.studio",
    line: "אתר שסוגר פגישות: מסר חד, הוכחות, תהליך ברור, כפתור אחד. בלי רעש — עם פניות.",
    traits: ["Hero חד", "Trust", "CTA לשיחה"],
  },
  {
    name: "Maison Liora",
    cat: "אופנה · מסחר",
    tone: "warm",
    img: photos.fashion,
    domain: "maisonliora.shop",
    line: "חנות שמרגישה בוטיק: מוצר במרכז, טיפוגרפיה חדה, סל שזורם — לא סריקה משעממת.",
    traits: ["Full-bleed", "מוצר גדול", "Checkout"],
  },
  {
    name: "NÓA Ritual",
    cat: "טיפוח · מותג",
    tone: "cool",
    img: photos.beauty,
    domain: "noa-ritual.com",
    line: "סיפור + קטלוג: אמון, מרקמים, upsell רך. מי שצריך להאמין לפני שהוא משלם.",
    traits: ["Story", "Catalog", "Upsell"],
  },
] as const;

export const templateSystems = [
  {
    id: "signal",
    title: "Signal",
    sub: "אתרי שירות / מותג אישי",
    body: "מסך אחד שמנצח. כותרת, הבטחה, הוכחה, פעולה. האתר מסביר — והלקוח פונה.",
  },
  {
    id: "catalog",
    title: "Catalog",
    sub: "חנויות וקטלוגים",
    body: "רשת מוצרים חדה, סינון, דף מוצר שממיר. הקנייה זורמת — גם בנייד.",
  },
  {
    id: "ritual",
    title: "Ritual",
    sub: "מותגים שמוכרים אמון",
    body: "שכבות סיפור, עדויות, לפני/אחרי. למי שההחלטה לא רגשית־מיידית בלבד.",
  },
] as const;

/* ════════════ STORY ════════════ */
export const storyBeats = [
  {
    title: "אנשים לא ״מחפשים אתר״. הם מחפשים פתרון — ואתה או שם, או לא",
    body: "בלי נוכחות דיגיטלית חדה, הלקוח מוצא את המתחרה עם וואטסאפ זמין, עם ביקורות, עם תחושת מקצוענות. האתר שלך הוא לא כרטיס ביקור. הוא דלת ראשית לעסק.",
  },
  {
    title: "אינסטגרם זה לא אתר. וגולוגל לא ״קורא״ סטוריז",
    body: "רשתות מביאות תשומת לב. אתר מביא שליטה: מסר, אמון, פנייה, מדידה. כשמישהו מחפש אתכם — זה הרגע שבו אתר חלש שורף כסף, ואתר טוב ממיר אותו ללקוח.",
  },
  {
    title: "לחנות פיזית — דיגיטל שפותח משמרת שנייה. לשירותים — צינור לידים",
    body: "מוצרים? קונים ב־2 בלילה. שירותים? משאירים פרטים אחרי יום עבודה. בשני המקרים: אתר שמרגיש רציני מנצח את מי שמקבל ״אח שלי בנה לי משהו״.",
  },
  {
    title: "הזמן שלכם יקר מדי כדי לנהל תדמית מאולתרת",
    body: "כל יום בלי מסר ברור, בלי מסלול פנייה, בלי תחושת מותג — זה יום של פניות שלא הגיעו. לא צריך להיות ״דיגיטלי״. צריך מישהי שבונה את זה כמו שצריך.",
  },
] as const;

export const storyMaybeTitle = "ויכול להיות ש…";
export const storyMaybe = [
  "יש לכם אתר — אבל הוא לא מביא פניות, ורק ״יש״ ברשת.",
  "ניסיתם חנות אונליין גנרית — ונמאס מהמראה, מהתפעול, מהתוצאה.",
  "חוששים: ״זה יקר / מסובך / אני לא טכנולוגי״ — ולכן נשארים תקועים.",
] as const;

export const storyClose =
  "בינתיים, מי שבנה אתר שמביא לקוחות — או חנות שמוכרת — סוגר את השיחה, את הפגישה, את העסקה. אתם יכולים להיות שם.";

/* ════════════ PROMISE ════════════ */
export const promiseTitle = "איך עובדים אצלי — בלי משחקים";
export const promiseLead = "מה אם הייתי אומרת לך, בלי אותיות קטנות, ש…";
export const promiseClose =
  "ואם לא בא לכם לגעת בכלום אחרי ההשקה? אפשר להרחיב לליווי. אתם מחליטים.";

export const productPillars = [
  {
    title: "הקמה = תשלום חד־פעמי",
    body: "בלי ריטיינר חובה. אתם יודעים כמה זה עולה — ומה נכנס.",
  },
  {
    title: "14 יום מהחומרים לאוויר",
    body: "אתם מספקים תוכן. אני בונה. עולים — מוכנים לקבל לקוחות.",
  },
  {
    title: "אתם לא חייבים להיות ״דיגיטליים״",
    body: "ליווי + הדרכה. תדעו לעדכן, לקבל פניות, לנהל חנות אם יש.",
  },
  {
    title: "הבעלות 100% שלכם",
    body: "בלי תלות בספק. רוצים ללכת? לוקחים את האתר. תודה.",
  },
] as const;

/* ════════════ SOCIAL ════════════ */
export const socialTitle = "מה קורה כשהאתר עובד בשבילכם";
export const socialLead = "בעלי עסקים, שירותים וחנויות — אחרי שהעלו את הרמה";

export const testimonials = [
  {
    img: photos.t1,
    q: "סוף־סוף אתר שמסביר את העסק — ואנשים משאירים פרטים בלי שאשלח להם עשר הודעות.",
    n: "דנה כ.",
    r: "קליניקה · שירותים",
  },
  {
    img: photos.t2,
    q: "תוך שבועיים היינו באוויר. ברור, יוקרתי — והחנות מוכרת גם כשאני לא בחנות הפיזית.",
    n: "יונתן ל.",
    r: "קמעונאות · חנות דיגיטלית",
  },
  {
    img: photos.t3,
    q: "פחדתי מטכנולוגיה. קיבלתי אתר שנראה כמו מותג — והדרכה שגרמה לי להרגיש בשליטה.",
    n: "מאיה ש.",
    r: "ייעוץ · מותג אישי",
  },
] as const;

/* ════════════ PROCESS ════════════ */
export const processTitle = "אני עושה את העבודה. אתם נשארים בעסק.";
export const processLead = "שלושה שלבים. בלי פרויקט אינסופי.";

export const processSteps = [
  {
    n: "01",
    title: "אפיון חד",
    body: "מי הלקוח, מה ההצעה, לידים או חנות, מה חייב לעבוד. יוצאים עם כיוון — לא ׳בערך׳.",
  },
  {
    n: "02",
    title: "בנייה ברמה",
    body: "עיצוב, תוכן מובנה, מובייל, SEO בסיסי, המרות — וסליקה אם צריך חנות.",
  },
  {
    n: "03",
    title: "השקה + שליטה",
    body: "עולים לאוויר. אתם יודעים לקבל לקוחות / הזמנות. יש גב כשצריך.",
  },
] as const;

/* ════════════ INCLUDES ════════════ */
export const includesTitle = "מה נכנס בבנייה";
export const includesLead = "הכל כדי להמיר — לא כדי להתרברב בפיצ׳רים";
export const includesNote =
  "מתאימים את החבילה למסלול: אתר לידים, חנות, או שילוב. ותמיד — הדרכה + זמינות.";

export const includes = [
  { title: "עיצוב מותאם מותג", body: "לא תבנית גנרית — שפה שלכם" },
  { title: "מבנה שממיר", body: "מסר → אמון → פעולה ברורה" },
  { title: "מובייל קודם", body: "רוב הלקוחות מגיעים מהטלפון" },
  { title: "בסיס SEO", body: "מבנה, תגיות, מהירות — לגוגל" },
  { title: "טפסי פנייה / וואטסאפ", body: "למסלול לידים — סגירה מהירה" },
  { title: "סליקה ומלאי", body: "למסלול חנות — כשצריך למכור" },
  { title: "חיבור לקמפיינים", body: "פיקסלים מוכנים לפרסום" },
  { title: "הדרכה + גב", body: "אתם יודעים לנהל. יש עם מי לדבר" },
] as const;

/* ════════════ FIT ════════════ */
export const fitKicker = "פילטר כנות";
export const fitTitle = "זה לא מתאים לכל אחד";
export const fitNoTitle = "אם אתם…";
export const fitNo = [
  "מחפשים את האתר הזול ביותר — בלי אכפת מתוצאה",
  "רוצים ״לעלות מחר״ בלי תוכן, בלי כיוון, בלי השקעה",
  "מחפשים רק לוגו על רקע לבן ו‟שיהיה״",
] as const;
export const fitYesTitle = "אם אתם…";
export const fitYes = [
  "רוצים אתר שמביא לקוחות ישירים — או חנות שמוכרת",
  "דורשים רמה של מותג, לא ׳גם לי יש אתר׳",
  "מוכנים לתת חומרים טובים ולקבל בעלות מלאה",
] as const;
export const fitYesEnd = "אתם בדיוק הקהל שאני בונה בשבילו.";

/* ════════════ TRUST ════════════ */
export const trustTitle = "בלי אותיות קטנות";
export const trustBody =
  "האתר שלכם. הבעלות שלכם. אין תלות בי כדי ״לשחרר״ משהו. אתם לא מקבלים קבצים ו״בהצלחה״ — אתם מקבלים מערכת, הדרכה, ורשת ביטחון. כדי לשמור על רמה וזמינות אני לוקחת מקסימום";

/* ════════════ FAQ / FINAL ════════════ */
export const faqTitle = "שאלות לפני שסוגרים";
export const finalTitle = "רוצים אתר שמביא לקוחות — או חנות שמוכרת?";
export const finalSub =
  "השאירו שם וטלפון. חוזרת עם הצעד הבא — ברור, בלי לחץ, בלי ז׳רגון.";

export const midJumpDefault = "זה מה שהעסק שלי צריך — בואו נתחיל";
export const midJumpDetails = "רוצים לבדוק התאמה? השאירו פרטים";
export const midJumpStart = "שכנעת — איך מתחילים?";

export const faqs = [
  {
    q: "חייבים חנות אונליין?",
    a: "ממש לא. לרוב עסקי השירותים בונים אתר שמביא לקוחות ישירים: הסבר, אמון, פנייה. חנות דיגיטלית — רק אם מוכרים מוצרים או רוצים ערוץ מכירה נוסף.",
  },
  {
    q: "מה ההבדל בינך לבין ״בונה אתרים זול״?",
    a: "המטרה. אצלי האתר נמדד בתוצאה: פניות, שיחות, מכירות — לא רק ״עמודים יפים״. עיצוב, מבנה המרה, ובעלות מלאה שלכם.",
  },
  {
    q: "תוך כמה זמן עולים?",
    a: "כ־14 יום מרגע שיש לי תוכן, תמונות וכיוון ברור. בלי חומרים — אין קסם. עם חומרים — יש אוויר.",
  },
  {
    q: "אפשר גם חנות וגם טופס לידים?",
    a: "כן. אפשר לשלב: מוצרים למכירה + מסלול ׳דברו איתי׳ לשירותים. בונים לפי המודל של העסק.",
  },
  {
    q: "אני תלוי/ה בך אחרי ההשקה?",
    a: "לא. לומדים לנהל. אני פה כשצריך — לא כשומרת על האתר שלכם בכוח.",
  },
  {
    q: "מה עם קידום בגוגל?",
    a: "בהקמה: בסיס SEO טכני ומילולי. קידום אגרסיבי / מודעות — אפשר להרחיב בנפרד כשיש על מה לפרסם.",
  },
] as const;

export const landingNav = [
  { href: "#paths", label: "מסלולים" },
  { href: "#work", label: "דוגמאות" },
  { href: "#how", label: "איך" },
  { href: "#contact", label: "התחלה" },
] as const;

/* stubs */
export const audienceLine = heroQualifier;
export const heroQuestion = heroHeadlineBefore + heroHeadlineEm1;
export const heroAnswer = heroSub;
export const heroSecondary = "איך זה עובד";
export const heroFormTitle_alt = heroFormTitle + heroFormTitleEm;
export const clientBrands = [] as const;
export const strategyCards = [
  { id: "1", title: "", body: "", label: "", visual: "ux" as const },
  { id: "2", title: "", body: "", label: "", visual: "code" as const },
  { id: "3", title: "", body: "", label: "", visual: "map" as const },
  { id: "4", title: "", body: "", label: "", visual: "portrait" as const },
] as const;
export const featuredWorks = [
  { name: "", category: "", accent: "rgba(196,163,90,0.15)" },
] as const;
export const workflowSteps = [
  { n: "01", title: "אפיון", body: "", icon: "message" as const },
  { n: "02", title: "הקמה", body: "", icon: "code" as const },
  { n: "03", title: "השקה", body: "", icon: "growth" as const },
] as const;
export const outcomes = [] as const;
export const heroCta_short = navCta;
