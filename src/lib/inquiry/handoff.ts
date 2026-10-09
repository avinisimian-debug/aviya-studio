import { leadsInbox, whatsappHref } from "@/lib/contact-channels";

export type InquiryHandoffLead = {
  name: string;
  phone: string;
  email: string;
  need: string;
  detail: string;
  budget: string;
};

export type InquiryHandoff = {
  whatsappHref: string;
  mailtoHref: string;
};

export function inquiryText(lead: InquiryHandoffLead): string {
  const contact = [lead.phone, lead.email].filter(Boolean).join(" · ") || "—";
  return [
    "היי אביה, פנייה מהאתר.",
    `שם: ${lead.name}`,
    `יצירת קשר: ${contact}`,
    `מה צריך: ${lead.need}`,
    lead.detail ? `פירוט: ${lead.detail}` : "",
    `תקציב: ${lead.budget}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Links that open WhatsApp or the mail app. They do not send by themselves. */
export function inquiryHandoff(lead: InquiryHandoffLead): InquiryHandoff {
  const body = inquiryText(lead);
  const whatsapp =
    whatsappHref(body) ??
    `https://wa.me/972555573090?text=${encodeURIComponent(body)}`;
  const subject = `פנייה מהאתר — ${lead.name}`;
  const mailtoHref = `mailto:${leadsInbox()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { whatsappHref: whatsapp, mailtoHref };
}
