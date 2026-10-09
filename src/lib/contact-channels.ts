/**
 * Public contact channels. Phone and WhatsApp render only when set,
 * so the site never shows a number the owner did not configure.
 */

function clean(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function publicPhone(): string | null {
  return clean(process.env.NEXT_PUBLIC_PHONE);
}

/** Digits only, suitable for wa.me. Accepts 972… or a local 0… number. */
export function publicWhatsappDigits(): string | null {
  const raw = clean(process.env.NEXT_PUBLIC_WHATSAPP);
  if (!raw) return null;
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `972${digits.slice(1)}`;
  if (digits.length < 11 || digits.length > 15) return null;
  return digits;
}

export function publicEmail(): string {
  return clean(process.env.NEXT_PUBLIC_STUDIO_EMAIL) ?? "studio.aviya1@gmail.com";
}

export function phoneHref(): string | null {
  const phone = publicPhone();
  if (!phone) return null;
  const href = phone.replace(/[^\d+]/g, "");
  return href ? `tel:${href}` : null;
}

export function whatsappHref(
  text = "היי אביה, ראיתי את האתר ואשמח לשיחה קצרה על אתר לעסק."
): string | null {
  const digits = publicWhatsappDigits();
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function gaMeasurementId(raw = process.env.NEXT_PUBLIC_GA_ID): string | null {
  const id = raw?.trim() ?? "";
  return /^G-[A-Za-z0-9]+$/.test(id) ? id : null;
}

export function gscVerification(): string | null {
  return clean(process.env.NEXT_PUBLIC_GSC_VERIFICATION);
}
