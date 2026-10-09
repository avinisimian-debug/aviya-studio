export type InquiryPayload = {
  name: string;
  phone: string;
  email: string;
  need: string;
  detail: string;
  budget: string;
  source: string;
};

export type LeadSender = {
  id: string;
  isConfigured: () => boolean;
  send: (lead: InquiryPayload) => Promise<void>;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function leadText(lead: InquiryPayload): string {
  return [
    "פנייה חדשה מאתר Aviya Studio",
    "────────────────",
    `שם: ${lead.name}`,
    `טלפון: ${lead.phone || "—"}`,
    `אימייל: ${lead.email || "—"}`,
    `צורך: ${lead.need}`,
    `פירוט: ${lead.detail || "—"}`,
    `תקציב: ${lead.budget}`,
    `מקור: ${lead.source}`,
    `זמן: ${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}`,
  ].join("\n");
}

function leadHtml(lead: InquiryPayload): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #e7e1d6"><b>${label}</b></td><td style="padding:8px 12px;border-bottom:1px solid #e7e1d6">${escapeHtml(value)}</td></tr>`;
  return `<div dir="rtl" style="font-family:Arial,sans-serif;color:#14120f;line-height:1.6">
    <h2 style="margin:0 0 12px">פנייה חדשה מאתר Aviya Studio</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px">${row("שם", lead.name)}${row("טלפון", lead.phone || "—")}${row("אימייל", lead.email || "—")}${row("צורך", lead.need)}${row("פירוט", lead.detail || "—")}${row("תקציב", lead.budget)}${row("מקור", lead.source)}</table>
  </div>`;
}

export function resendSender(): LeadSender {
  return {
    id: "resend",
    isConfigured() {
      return Boolean(
        process.env.RESEND_API_KEY?.trim() && process.env.LEADS_TO_EMAIL?.trim()
      );
    },
    async send(lead) {
      const key = process.env.RESEND_API_KEY?.trim();
      const to = process.env.LEADS_TO_EMAIL?.trim();
      if (!key || !to) {
        throw new Error("NOT_CONFIGURED");
      }
      const from =
        process.env.RESEND_FROM?.trim() || "Aviya Studio <onboarding@resend.dev>";
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject: `פנייה חדשה — ${lead.name}`,
          text: leadText(lead),
          html: leadHtml(lead),
        }),
        signal: AbortSignal.timeout(12_000),
      });
      if (!response.ok) {
        throw new Error(`Resend ${response.status}`);
      }
    },
  };
}

/** First configured sender. Add another implementation here when needed. */
export function getLeadSender(): LeadSender {
  const resend = resendSender();
  if (resend.isConfigured()) return resend;
  return {
    id: "unconfigured",
    isConfigured: () => false,
    async send() {
      throw new Error("NOT_CONFIGURED");
    },
  };
}
