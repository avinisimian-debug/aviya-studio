"use server";

import { headers } from "next/headers";
import { budgetLabel, needLabel } from "@/data/studio-site";
import { getLeadSender } from "@/lib/inquiry/deliver";
import { inquiryHandoff } from "@/lib/inquiry/handoff";
import { inquirySchema } from "@/lib/inquiry/schema";
import type { InquiryState } from "@/lib/inquiry/state";
import { rateLimit } from "@/lib/security";

function fieldErrorsFromIssues(
  issues: { path: PropertyKey[]; message: string }[]
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip")?.trim() ||
    "local";

  if (!rateLimit(`inquiry:${ip}`, 5, 10 * 60_000)) {
    return {
      status: "rate_limited",
      message: "יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.",
      fieldErrors: {},
      handoff: null,
    };
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    need: String(formData.get("need") ?? ""),
    detail: String(formData.get("detail") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    company_website: String(formData.get("company_website") ?? ""),
    source: String(formData.get("source") ?? "contact"),
  };

  if (raw.company_website.trim().length > 0) {
    return {
      status: "sent",
      message: "הפנייה נשלחה. תודה. נחזור עם כיוון קצר — בלי לחץ ובלי התחייבות.",
      fieldErrors: {},
      handoff: null,
    };
  }

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "invalid",
      message: "חסר או לא תקין שדה אחד. אפשר לתקן ולשלוח שוב.",
      fieldErrors: fieldErrorsFromIssues(parsed.error.issues),
      handoff: null,
    };
  }

  const lead = {
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    need: needLabel(parsed.data.need),
    detail: parsed.data.detail,
    budget: budgetLabel(parsed.data.budget || "unspecified"),
    source: parsed.data.source || "contact",
  };
  const handoff = inquiryHandoff(lead);

  const sender = getLeadSender();
  if (!sender.isConfigured()) {
    return {
      status: "handoff",
      message:
        "הפרטים תקינים. שליחה מהשרת עדיין לא מחוברת, והפנייה לא יצאה לבד. «שליחה בוואטסאפ» פותח וואטסאפ עם הטקסט. «פתיחת אימייל» פותח אימייל עם אותה פנייה.",
      fieldErrors: {},
      handoff,
    };
  }

  try {
    await sender.send(lead);
  } catch (error) {
    console.error(
      "inquiry delivery failed",
      error instanceof Error ? error.message : "unknown"
    );
    return {
      status: "error",
      message:
        "השליחה מהשרת נכשלה, והפנייה לא יצאה. אפשר לפתוח וואטסאפ או אימייל עם אותם פרטים.",
      fieldErrors: {},
      handoff,
    };
  }

  return {
    status: "sent",
    message: "הפנייה נשלחה. תודה. נחזור עם כיוון קצר — בלי לחץ ובלי התחייבות.",
    fieldErrors: {},
    handoff: null,
  };
}
