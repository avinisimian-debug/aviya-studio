import { LANDING } from "@/data/landing";
import { socialHashtagsLine } from "@/data/seo-keywords";
import { SITE_URL } from "@/lib/seo";

/**
 * Ready-to-copy captions for social + YouTube (grow leads off-site).
 */
export const socialPosts = [
  {
    platform: "instagram",
    title: "פוסט 1 — למה צריך אתר",
    caption: `הלקוח בודק אתכם בגוגל לפני שהוא מתקשר.

אם אין אתר — או שהאתר נראה מ־2017 — המתחרה מקבל את השיחה.

Aviya בונה אתרים שמביאים לקוחות וחנויות שמוכרות.
לפרטים בביו / וואטסאפ.

${socialHashtagsLine}`,
  },
  {
    platform: "instagram",
    title: "פוסט 2 — חנות דיגיטלית",
    caption: `חנות אונליין ≠ קטלוג חובבני.

סליקה. מובייל. תהליך קנייה ברור. עיצוב ברמת מותג.

רוצים חנות דיגיטלית? כתבו ״חנות״ בוואטסאפ.

${socialHashtagsLine}`,
  },
  {
    platform: "facebook",
    title: "פוסט פייסבוק",
    caption: `בעלי עסקים: האתר שלכם עובד בשבילכם — או רק ״קיים״?

ב־Aviya בונים:
• אתר תדמית שמביא פניות
• דף נחיתה לקמפיינים
• חנות דיגיטלית עם סליקה

לינק: ${SITE_URL}
וואטסאפ: 055-557-3090

${socialHashtagsLine}`,
  },
  {
    platform: "linkedin",
    title: "פוסט לינקדאין",
    caption: `B2B & service businesses in Israel: your website is often the first sales call.

Aviya builds conversion-focused sites and digital stores — clear message, mobile-first, full ownership.

Website: ${SITE_URL}
Contact: ${LANDING.email}

#WebDesign #Israel #SmallBusiness #DigitalMarketing #Ecommerce`,
  },
  {
    platform: "tiktok",
    title: "טיקטוק / רילס — טקסט על המסך",
    caption: `אין לך אתר?
הלקוח כבר בחר במתחרה.

Aviya · אתר שמביא לקוחות
לינק בביו

${socialHashtagsLine} #fyp #עסקים`,
  },
] as const;

export const youtubeVideos = [
  {
    id: "yt-1",
    title: "למה העסק שלך חייב אתר מקצועי ב־2026 (בלי ז׳רגון)",
    description: `בסרטון: למה לקוחות בודקים אתכם בגוגל, למה אינסטגרם לא מספיק, ומה הופך אתר לכזה שמביא פניות.

⏱ נושאים:
00:00 — למה בודקים אתכם לפני שיחה
00:45 — אינסטגרם מול אתר
01:40 — מה אתר טוב עושה בפועל
02:30 — אתר תדמית או חנות
03:10 — איך מתחילים עם Aviya

🔗 אתר: ${SITE_URL}
📞 וואטסאפ: 055-557-3090
📸 אינסטגרם: ${LANDING.instagramHandle}

מילות מפתח: בניית אתרים, אתר לעסק, אתר שמביא לקוחות, חנות דיגיטלית, עיצוב אתרים בישראל

${socialHashtagsLine}`,
    tags: [
      "בניית אתרים",
      "אתר לעסק",
      "עיצוב אתרים",
      "חנות דיגיטלית",
      "שיווק דיגיטלי",
      "עסקים קטנים",
      "Aviya",
      "אביה",
      "אתר תדמית",
      "דף נחיתה",
    ],
    script: [
      "היי, אני אביה — ואם יש לכם עסק בלי אתר מקצועי, הסרטון הזה בשבילכם.",
      "הלקוח הרציני לא מתקשר סתם. הוא מחפש בגוגל. בודק. משווה. ואז מחליט.",
      "אינסטגרם מעולה — אבל זה שכירות. האלגוריתם משתנה. האתר שלכם הוא נכס.",
      "אתר טוב: מסר חד, אמון, כפתור ברור, ומובייל שעובד.",
      "שירותים? אתר לידים. מוצרים? חנות דיגיטלית.",
      "רוצים שנבנה לכם? לינק בתיאור — או וואטסאפ.",
    ],
  },
  {
    id: "yt-2",
    title: "אתר תדמית מול דף נחיתה מול חנות — מה לבחור?",
    description: `הסבר פשוט: מתי דף נחיתה, מתי אתר תדמית, ומתי חנות אונליין.

אתר: ${SITE_URL}
וואטסאפ: 055-557-3090

${socialHashtagsLine}`,
    tags: [
      "דף נחיתה",
      "אתר תדמית",
      "חנות אונליין",
      "בניית אתרים",
      "המרות",
      "Aviya",
    ],
    script: [
      "שאלה שאני מקבלת המון: מה לבנות — דף נחיתה, אתר, או חנות?",
      "דף נחיתה = פעולה אחת, לרוב לקמפיין.",
      "אתר תדמית = בית דיגיטלי, אמון, SEO.",
      "חנות = מכירה אונליין עם סליקה.",
      "לא יודעים? השאירו פרטים — נדייק ביחד.",
    ],
  },
  {
    id: "yt-3",
    title: "5 טעויות שבגללן האתר לא מביא לקוחות",
    description: `טעויות נפוצות: מסר מטושטש, מובייל גרוע, בלי CTA, אתר איטי, בלי אמון.

תיקון עם Aviya: ${SITE_URL}

${socialHashtagsLine}`,
    tags: [
      "אתר שמביא לקוחות",
      "המרת לידים",
      "בניית אתרים",
      "טעויות באתר",
      "שיווק",
    ],
    script: [
      "טעות אחת: מסר מעל הקיפול מבולבל.",
      "שתיים: האתר לא עובד במובייל באמת.",
      "שלוש: אין כפתור ברור לפנייה.",
      "ארבע: איטי — הלקוח בורח.",
      "חמש: אין הוכחות / תהליך / אמון.",
      "רוצים תיקון? כתבו לי.",
    ],
  },
] as const;

export const whatsappShareUrl = (text?: string) => {
  const t = encodeURIComponent(
    text ||
      `ראיתי את Aviya — בניית אתרים וחנויות דיגיטליות: ${SITE_URL}`
  );
  return `https://wa.me/?text=${t}`;
};

export const facebookShareUrl = (url = SITE_URL) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

export const linkedInShareUrl = (url = SITE_URL) =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

export const twitterShareUrl = (
  url = SITE_URL,
  text = "Aviya — בניית אתרים שמביאים לקוחות וחנויות שמוכרות"
) =>
  `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}&hashtags=Aviya,בנייתאתרים,אתרלעסק`;
