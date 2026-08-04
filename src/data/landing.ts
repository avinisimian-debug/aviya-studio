/**
 * Aviya — elite conversion system
 * Voice: direct-response × luxury brand craft (Hebrew)
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
      "היי אביה — ראיתי את האתר. אני רוצה חנות דיגיטלית באותה רמה בדיוק."
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

/** Licensed high-end stock — Unsplash (no third-party scrape) */
export const photos = {
  hero:
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2200&q=88",
  portrait:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=88",
  story1:
    "https://images.unsplash.com/photo-1555529902-5261145633bf?auto=format&fit=crop&w=1600&q=88",
  story2:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=88",
  studio:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=88",
  craft:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=88",
  fashion:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=88",
  beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=88",
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
export const heroEyebrow = "סטודיו לחנויות שכבר עובדות · דיגיטל שלא מתפשר";
export const heroBrandLine = "אם אתר נראה חובבני — הלקוח לא יסמוך. נקודה.";
export const heroQualifier =
  "לבעלי חנויות פיזיות עם מחזור של לפחות 100,000 ₪ בחודש שרוצים להתחיל למכור באינטרנט:";

export const heroHeadlineBefore = "יש לך חנות פיזית? הגיע הזמן לעבור ";
export const heroHeadlineEm1 = "לחנות דיגיטלית";
export const heroHeadlineMid = " שמרגישה כמו מותג — ומוכרת ";
export const heroHeadlineEm2 = "כבר מהיום הראשון.";

export const heroSub =
  "לא ״אתר יפה״. מכונת מכירה: אמון, מסע ברור, סליקה חלקה — בלי להיות תלוי ברחוב, בעובדים או בניסיון דיגיטלי.";

export const heroFormTitle = "רוצה שאבנה את זה ";
export const heroFormTitleEm = "לעסק שלך?";
export const heroNamePh = "איך קוראים לך?";
export const heroPhonePh = "מה המספר שלך?";
export const heroCta = "אני רוצה להתחיל למכור בדיגיטל";
export const navCta = "תשימי לי רמה כזו";

export const craftSignals = [
  { k: "08", t: "עסקים בלבד בחודש" },
  { k: "14", t: "ימים — חומרים → אוויר" },
  { k: "∞", t: "האתר שלך. לנצח." },
] as const;

/* ════════════ STRIP ════════════ */
export const aboutStripTitle = "אתם לא משלמים על קבצים. אתם קונים יתרון.";
export const aboutStripBody =
  "מותגים גדולים לא קונים ״תבנית ב־199 שקלים״. הם משלמים על תחושה, על בהירות, על מהירות להחלטת קנייה. בדיוק את זה אני בונה — רק שאצלך זה לא נראה כמו תאגיד, אלא כמו העסק האמיתי שלך. בגדול.";

/* ════════════ SHOWCASE / TEMPLATES ════════════ */
export const showcaseTitle = "תבניות ברמה. מיושמות על העסק שלך.";
export const showcaseLead =
  "לא תבנית גנרית שכולם קיבלו. מערכת עיצוב + מסע רכישה שמותאמים לקטגוריה שלך — עם DNA ויזואלי של מותג.";

export const showcases = [
  {
    name: "Maison Liora",
    cat: "אופנה · בוטיק",
    tone: "warm",
    img: photos.fashion,
    line: "פול־בלeed, טיפוגרפיה חדה, מוצר במרכז. הקנייה מרגישה כמו כניסה לבוטיק — לא כמו סריקת קטלוג.",
    traits: ["Hero דרמטי", "מוצר גדול", "סל מיידי"],
  },
  {
    name: "NÓA Ritual",
    cat: "טיפוח · יופי",
    tone: "cool",
    img: photos.beauty,
    line: "שקט, אמון, מרקמים. סדר מוצרים ברור, אריזה שמוכרת את הסיפור, צ׳ק־אאוט רך ובטוח.",
    traits: ["גריד רך", "Trust blocks", "Upsell חכם"],
  },
  {
    name: "Atelier 17",
    cat: "בית · עיצוב",
    tone: "ink",
    img: photos.home,
    line: "חלל, אור, פרופורציות. הקטלוג לא ״מציג״ — הוא מוכר אווירה. כל קליק מקרב לקוחה אחת פנימה.",
    traits: ["גלריה", "Zoom", "משלוח ברור"],
  },
] as const;

export const templateSystems = [
  {
    id: "signal",
    title: "מערכת Signal",
    sub: "מותגים שרוצים דומיננטיות",
    body: "מסך פתיחה מלא, כותרת אחת, כפתור אחד, אפס רעש. מי שנכנס מבין תוך 3 שניות למה הוא פה.",
  },
  {
    id: "catalog",
    title: "מערכת Catalog",
    sub: "חנויות עם קטלוג עמוק",
    body: "סינון, קטגוריות, דפי מוצר חדים. החיפוש לא עוצר את המכירה — הוא מאיץ אותה.",
  },
  {
    id: "ritual",
    title: "מערכת Ritual",
    sub: "חוויה וסיפור",
    body: "שכבות תוכן, עדויות, לפני/אחרי. ללקוח שצריך להאמין לפני שהוא משלם.",
  },
] as const;

/* ════════════ STORY ════════════ */
export const storyBeats = [
  {
    title: "שנינו יודעים: הרחוב כבר לא מספיק",
    body: "ההכנסה שלך לא יכולה להיות תלויה בכמה אנשים ״קרה ועברו״ — ובכמה שעות פתחת. עולם הקניות זז אונליין. מי שלא שם — נותן את העסקאות למתחרה עם משלוח לכתובת.",
  },
  {
    title: "הלקוח חכם. הוא לא סולח על אתר חלש",
    body: "הוא משווה מחיר, ביקורות, תחושת אמון — תוך שניות. אם האתר שלך נראה מאולתר, הוא לא חושב ״חבל, אז אקנה בחנות״. הוא עובר למי שניצח את המסך.",
  },
  {
    title: "קנייה בקליק — גם ב־2:17 בלילה",
    body: "מהמיטה, מהעבודה, מהפקק. כשהחנות הדיגיטלית שלך מרגישה בטוחה וברורה — העסקאות קורות בלי נוכחות פיזית. זה לא קסם. זה מוצר שנבנה נכון.",
  },
  {
    title: "זמן = כסף. ואתה משלם פעמיים",
    body: "או שאתה בחנות, או שאתה משלם למישהו להיות שם. דיגיטל לא מחליף את החנות — הוא פותח קו הכנסה שני שלא נרדם כשאתה סוגר את הדלת.",
  },
] as const;

export const storyMaybeTitle = "ויכול להיות ש…";
export const storyMaybe = [
  "כבר ניסית ״חנות אונליין״ — וקיבלת משהו שנראה כמו 2014, עם אחוזי נטישה מביכים.",
  "שילמת, חיכית, ובסוף נשארת עם אתר שלא יודע למכור — ואז ויתרת.",
  "הצעד הדיגיטלי מפחיד: ״אני לא טכנולוגית / אין לי זמן / מה אם זה לא עובד?״",
] as const;

export const storyClose =
  "בזמן שאתה תוהה — מישהו עם חנות דיגיטלית חדה סוגר את הלקוח שהיה יכול להיות שלך. כל יום.";

/* ════════════ PROMISE ════════════ */
export const promiseTitle = "הכללים שלי. ברורים. בלי משחקים.";
export const promiseLead = "מה אם הייתי אומרת לך — בלי אותיות קטנות — ש…";
export const promiseClose =
  "ואם אתה לא רוצה לגעת בדבר? אפשר להרחיב לניהול שוטף. אתה מחליט.";

export const productPillars = [
  {
    title: "הקמה = תשלום חד־פעמי",
    body: "אין ריטיינר חובה. אתה יודע כמה זה עולה — ומה אתה מקבל.",
  },
  {
    title: "14 יום מהחומרים לאוויר",
    body: "אתה שולח. אני בונה. האתר עולה — מוכן לקבל כסף.",
  },
  {
    title: "אתה לא חייב להיות ״דיגיטלי״",
    body: "ליווי + הדרכה. תוך זמן קצר אתה שולט בקטלוג, בהזמנות, במלאי.",
  },
  {
    title: "הבעלות 100% שלך",
    body: "בלי חטיפה לספק. רוצה ללכת? לוקח את האתר. תודה וביי.",
  },
] as const;

/* ════════════ SOCIAL ════════════ */
export const socialTitle = "לא הבטחות. חוויות.";
export const socialLead = "מה שבעלי חנויות מספרים אחרי שהעסק עלה לאוויר";

export const testimonials = [
  {
    img: photos.t1,
    q: "סוף־סוף יש חנות שמרגישה כמו העסק — לא כמו ״ניסוי דיגיטלי״. וההזמנות מגיעות גם כשאני לא בחנות.",
    n: "דנה כ.",
    r: "בוטיק אופנה · ת״א",
  },
  {
    img: photos.t2,
    q: "תוך שבועיים היינו באוויר. ברור, מסודר, ובעיקר — לקוחות משלמים בלי להתקשר לשאול ״איך קונים?״",
    n: "יונתן ל.",
    r: "חנות פנים לבית",
  },
  {
    img: photos.t3,
    q: "פחדתי מהטכנולוגיה. קיבלתי הדרכה שגרמה לי להרגיש בשליטה. וזה נראה כמו מותג — לא כמו ׳אתר של קרוב משפחה׳.",
    n: "מאיה ש.",
    r: "טיפוח · מותג מקומי",
  },
] as const;

/* ════════════ PROCESS ════════════ */
export const processTitle = "אני עושה את העבודה הקשה. אתה נשאר בעסק.";
export const processLead = "שלושה שלבים. בלי רעש. בלי ׳פרויקט אינסופי׳.";

export const processSteps = [
  {
    n: "01",
    title: "אפיון חד",
    body: "מוצרים, קהל, מיתוג, מה כואב, מה מוכר. יוצאים עם כיוון — לא עם ׳בערך׳.",
  },
  {
    n: "02",
    title: "בנייה ברמה",
    body: "עיצוב, מוצרים, סליקה, אוטומציה, מובייל. חנות שלא מתביישים לשלוח בלינק.",
  },
  {
    n: "03",
    title: "השקה + שליטה",
    body: "עולים לאוויר. אתה לומד לנהל. לקוח ממלא סל. אתה רואה כסף נכנס.",
  },
] as const;

/* ════════════ INCLUDES ════════════ */
export const includesTitle = "מה בדיוק נמצא בחנות שלך?";
export const includesLead = "הכל כדי למכור, לא כדי להתרברב בפיצ׳רים";
export const includesNote =
  "וכן — אלמד אותך לנהל. אם תישאר שאלה ב־23:00? יש עם מי לדבר.";

export const includes = [
  { title: "סליקה מאובטחת", body: "אשראי מלא + Apple Pay / Google Pay" },
  { title: "אוטומציות", body: "נוטשי עגלה, מלאי, דיוור — עובדים בשבילך" },
  { title: "מוכן לקמפיינים", body: "פיקסלים והגדרות לגוגל / מטא / טיקטוק" },
  { title: "בסיס SEO", body: "מבנה, תגיות, מהירות — להתחיל לדרג" },
  { title: "דשבורד", body: "מה נמכר, מה תקוע, מה כדאי לדחוף" },
  { title: "שליטה מהנייד", body: "התראות, הזמנות, מלאי — בכיס" },
  { title: "משלוחים", body: "חיבור נקי, סטטוסים ברורים ללקוח" },
  { title: "הדרכה + גב", body: "אתה יודע לתפעל. ויש גיבוי כשצריך" },
] as const;

/* ════════════ FIT ════════════ */
export const fitKicker = "פילטר כנות";
export const fitTitle = "זה לא מתאים לכל חנות";
export const fitNoTitle = "אם אתה…";
export const fitNo = [
  "מחפש את האתר הזול ביותר בגוגל — בלי אכפת מהתחושה",
  "רוצה להישאר תלוי בעובדים / ספק / ריטיינר לנצח",
  "מעדיף שהעסק ימשיך לחיות רק מההליכה ברחוב",
] as const;
export const fitYesTitle = "אם אתה…";
export const fitYes = [
  "כבר מכניס — ורוצה קו מכירות שני שלא נרדם",
  "דורש שזה ייראה כמו מותג, לא כמו ׳גם אני עשיתי אתר׳",
  "רוצה בעלות מלאה + ליווי, בלי חטיפת פתחים",
] as const;
export const fitYesEnd = "אתה בדיוק הקהל שאני בונה בשבילו.";

/* ════════════ TRUST ════════════ */
export const trustTitle = "בלי אותיות קטנות. בלי משחקים.";
export const trustBody =
  "האתר שלך. הבעלות שלך. אין תלות בי כדי ״לשחרר״ משהו. אתה לא מקבל קבצי ZIP ו״בהצלחה״ — אתה מקבל חנות, הדרכה, ורשת ביטחון. כדי לשמור על רמה וזמינות אני לוקחת מקסימום";

/* ════════════ FAQ / FINAL ════════════ */
export const faqTitle = "השאלות שכולם שואלים (לפני שסוגרים)";
export const finalTitle = "רוצה את הרמה הזו — לעסק שלך?";
export const finalSub =
  "מקום אחד. טלפון אחד. ואני חוזרת אליך עם הצעד הבא — ברור ובלי לחץ.";

export const midJumpDefault = "זה בדיוק מה שהעסק שלי צריך — בואו נתחיל";
export const midJumpDetails = "רוצה לבדוק התאמה? השאירו פרטים";
export const midJumpStart = "שכנעת — איך מתחילים?";

export const faqs = [
  {
    q: "מאיפה יודעים שזה הזמן?",
    a: "אם המחזור כבר עובד בחנות, והכנסה נעצרת כשאתה סוגר — אתה משאיר כסף על השולחן. חנות דיגיטלית פותחת את הברז בלי להכפיל משכורות.",
  },
  {
    q: "אני חייב להיות תלוי בך כדי לעדכן מוצרים?",
    a: "לא. אתה לומד לנהל הכול — גם מהטלפון. אני פה כשצריך, לא כשעולה לך חשק לשנות מחיר.",
  },
  {
    q: "כמה זמן עד שעולים?",
    a: "14 יום מרגע שיש לי תכנים, תמונות ופרטים. בלי חומרים איכותיים — אין קסם. עם חומרים — יש אוויר.",
  },
  {
    q: "יש סליקה באשראי?",
    a: "כן. מערכת סליקה מאובטחת, כרטיסים + Apple Pay / Google Pay. הלקוח סוגר. אתה ישן.",
  },
  {
    q: "מה אם משהו נופל?",
    a: "הפלטפורמות יציבות מאוד. ואם יש תקלה — יש גיבוי אנושי. לא ׳שלח כרטיס׳.",
  },
  {
    q: "את גם עושה שיווק?",
    a: "הקמה = מוצר מוכן לקמפיין. ניהול מודעות אפשר להרחיב בנפרד — רק אם אתה רוצה, ורק אחרי שיש על מה להוציא תקציב.",
  },
] as const;

export const landingNav = [
  { href: "#work", label: "תבניות" },
  { href: "#why", label: "למה" },
  { href: "#how", label: "איך" },
  { href: "#contact", label: "התחל" },
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
