export const NEED_STORAGE_KEY = "aviya-need";

export const siteNeeds = [
  { id: "brand", label: "אתר תדמית", hint: "פניות ואמון לעסק שירותים" },
  { id: "shop", label: "חנות דיגיטלית", hint: "מכירה אונליין עם סליקה" },
  { id: "landing", label: "דף נחיתה", hint: "עמוד אחד לקמפיין" },
  { id: "upgrade", label: "שדרוג אתר", hint: "הקיים לא ממיר / נראה ישן" },
] as const;

export type SiteNeedId = (typeof siteNeeds)[number]["id"];

export function readNeed(): SiteNeedId | "" {
  if (typeof window === "undefined") return "";
  const v = window.sessionStorage.getItem(NEED_STORAGE_KEY);
  return siteNeeds.some((n) => n.id === v) ? (v as SiteNeedId) : "";
}

export function writeNeed(id: SiteNeedId) {
  window.sessionStorage.setItem(NEED_STORAGE_KEY, id);
  window.dispatchEvent(new CustomEvent("aviya-need", { detail: id }));
}

export function needLabel(id: string): string {
  return siteNeeds.find((n) => n.id === id)?.label ?? id;
}
