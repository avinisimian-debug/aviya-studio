/**
 * Public contact channels.
 * Phone, WhatsApp, and the public studio email have code defaults.
 * Env vars override them when set.
 */

const DEFAULT_PHONE_DISPLAY = "055-557-3090";
const DEFAULT_TEL = "tel:+972555573090";
const DEFAULT_WHATSAPP_DIGITS = "972555573090";
const DEFAULT_PUBLIC_EMAIL = "studio.aviya1@gmail.com";
const DEFAULT_LEADS_EMAIL = "aviya.nish@gmail.com";

function clean(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function publicPhone(): string {
  return clean(process.env.NEXT_PUBLIC_PHONE) ?? DEFAULT_PHONE_DISPLAY;
}

/** Digits only, suitable for wa.me. Accepts 972… or a local 0… number. */
export function publicWhatsappDigits(): string | null {
  const raw = clean(process.env.NEXT_PUBLIC_WHATSAPP);
  if (!raw) return DEFAULT_WHATSAPP_DIGITS;
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `972${digits.slice(1)}`;
  if (digits.length < 11 || digits.length > 15) return null;
  return digits;
}

/** Address shown on the site. Separate from the leads inbox. */
export function publicEmail(): string {
  return clean(process.env.NEXT_PUBLIC_STUDIO_EMAIL) ?? DEFAULT_PUBLIC_EMAIL;
}

/** Inbox that receives inquiries. Override with LEADS_TO_EMAIL. */
export function leadsInbox(): string {
  return clean(process.env.LEADS_TO_EMAIL) ?? DEFAULT_LEADS_EMAIL;
}

export function phoneHref(): string | null {
  const raw = clean(process.env.NEXT_PUBLIC_PHONE);
  if (!raw) return DEFAULT_TEL;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  if (raw.startsWith("+") || digits.startsWith("972")) return `tel:+${digits}`;
  if (digits.startsWith("0")) return `tel:+972${digits.slice(1)}`;
  return `tel:+${digits}`;
}

export function whatsappHref(text?: string): string | null {
  const digits = publicWhatsappDigits();
  if (!digits) return null;
  const message =
    text ?? "היי אביה, ראיתי את האתר ואשמח לשיחה קצרה על אתר לעסק.";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function gaMeasurementId(raw = process.env.NEXT_PUBLIC_GA_ID): string | null {
  const id = raw?.trim() ?? "";
  return /^G-[A-Za-z0-9]+$/.test(id) ? id : null;
}

export function gscVerification(): string | null {
  return clean(process.env.NEXT_PUBLIC_GSC_VERIFICATION);
}
