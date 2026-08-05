/**
 * Shared validation, sanitization, and light in-memory rate limiting
 * for public form endpoints. Fail-open for rate storage errors.
 */

const NAME_MAX = 80;
const PHONE_MAX = 24;
const BUSINESS_MAX = 120;
const SOURCE_MAX = 80;
const BODY_MAX_BYTES = 8_192;

/** Simple sliding-window limiter (per process; good enough for single-region). */
const hits = new Map<string, number[]>();

export function clientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

/**
 * @returns true if allowed, false if rate exceeded
 */
export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  const prev = hits.get(key) ?? [];
  const recent = prev.filter((t) => t > windowStart);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  // occasional cleanup
  if (hits.size > 2_000) {
    for (const [k, times] of hits) {
      const keep = times.filter((t) => t > windowStart);
      if (keep.length === 0) hits.delete(k);
      else hits.set(k, keep);
    }
  }
  return true;
}

export function clampText(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

/** Normalize Israeli / international mobile & landline to digits only */
export function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Accept common IL formats:
 * 05X-XXX-XXXX (10), landline 0X… (9–10), or +972…
 */
export function isValidPhone(phone: string): boolean {
  const d = digitsOnly(phone);
  if (d.length < 9 || d.length > 12) return false;
  // Israeli mobile often 05xxxxxxxx → 10 digits, or 9725… → 12
  if (d.startsWith("972") && d.length >= 11 && d.length <= 12) return true;
  if (d.startsWith("0") && d.length >= 9 && d.length <= 10) return true;
  if (d.length >= 9 && d.length <= 10) return true;
  return false;
}

export function normalizePhoneDisplay(phone: string): string {
  const d = digitsOnly(phone);
  if (d.startsWith("972") && d.length >= 11) {
    return `0${d.slice(3)}`;
  }
  return d.startsWith("0") ? d : phone.trim();
}

export type LeadInput = {
  name: string;
  phone: string;
  business: string;
  source: string;
  honey?: string;
};

export type LeadParseResult =
  | { ok: true; data: Omit<LeadInput, "honey"> }
  | { ok: false; error: string; status: number };

export async function parseLeadBody(req: Request): Promise<LeadParseResult> {
  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > BODY_MAX_BYTES) {
    return { ok: false, error: "בקשה גדולה מדי", status: 413 };
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return { ok: false, error: "פורמט לא תקין", status: 400 };
  }

  // Honeypot: bots fill hidden fields
  const honey = clampText(body.website ?? body.company_url ?? body.honey, 200);
  if (honey.length > 0) {
    // Pretend success path happens at API level
    return {
      ok: false,
      error: "honeypot",
      status: 204,
    };
  }

  const name = clampText(body.name, NAME_MAX);
  const phoneRaw = clampText(body.phone, PHONE_MAX);
  const business = clampText(body.business, BUSINESS_MAX);
  const source = clampText(body.source, SOURCE_MAX) || "טופס אתר";

  if (name.length < 2) {
    return { ok: false, error: "שם לא תקין", status: 400 };
  }
  if (!isValidPhone(phoneRaw)) {
    return { ok: false, error: "טלפון לא תקין", status: 400 };
  }

  return {
    ok: true,
    data: {
      name,
      phone: normalizePhoneDisplay(phoneRaw),
      business,
      source,
    },
  };
}
