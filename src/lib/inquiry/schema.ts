import { z } from "zod";
import { BUDGET_OPTIONS, OTHER_NEED, SERVICES } from "@/data/studio-site";

const needValues = new Set<string>([
  ...SERVICES.map((service) => service.slug),
  OTHER_NEED.value,
]);

const budgetValues = new Set<string>(BUDGET_OPTIONS.map((option) => option.value));

function digits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isPlausiblePhone(value: string): boolean {
  const d = digits(value);
  if (!d) return false;
  if (d.startsWith("972") && d.length >= 11 && d.length <= 12) return true;
  if (d.startsWith("0") && d.length >= 9 && d.length <= 10) return true;
  return d.length >= 9 && d.length <= 12;
}

export const inquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "נכתוב שם — לפחות שתי אותיות")
      .max(80, "השם ארוך מדי"),
    phone: z.string().trim().max(24, "הטלפון ארוך מדי"),
    email: z.string().trim().max(120, "האימייל ארוך מדי"),
    need: z.string().trim().min(1, "בחרו מה צריך"),
    detail: z.string().trim().max(400, "התיאור ארוך מדי"),
    budget: z.string().trim().max(40),
    company_website: z.string().optional().default(""),
    source: z.string().trim().max(80).default("contact"),
  })
  .superRefine((data, ctx) => {
    const phone = data.phone;
    const email = data.email;
    const phoneOk = phone.length > 0 && isPlausiblePhone(phone);
    const emailOk = email.length > 0 && z.email().safeParse(email).success;

    if (phone.length > 0 && !phoneOk) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "הטלפון לא נראה תקין",
      });
    }
    if (email.length > 0 && !emailOk) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "האימייל לא נראה תקין",
      });
    }
    if (!phoneOk && !emailOk) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "צריך טלפון או אימייל תקינים",
      });
    }
    if (!needValues.has(data.need)) {
      ctx.addIssue({
        code: "custom",
        path: ["need"],
        message: "בחרו אפשרות מהרשימה",
      });
    }
    if (data.need === OTHER_NEED.value && data.detail.length < 4) {
      ctx.addIssue({
        code: "custom",
        path: ["detail"],
        message: "כתבו בקצרה מה צריך",
      });
    }
    if (data.budget && !budgetValues.has(data.budget)) {
      ctx.addIssue({
        code: "custom",
        path: ["budget"],
        message: "בחרו טווח מהרשימה",
      });
    }
  });

export type InquiryInput = z.infer<typeof inquirySchema>;
