import type { Lead } from "@/lib/leads";
import { LANDING } from "@/data/landing";

/** Where new leads are emailed */
export const LEADS_NOTIFY_EMAIL =
  process.env.LEADS_NOTIFY_EMAIL?.trim() || "aviya.nish@gmail.com";

/** Secondary inbox (studio contact) */
const LEADS_NOTIFY_EMAIL_CC =
  process.env.LEADS_NOTIFY_EMAIL_CC?.trim() || LANDING.email;

export const LEADS_NOTIFY_WHATSAPP =
  process.env.LEADS_NOTIFY_WHATSAPP?.trim() || LANDING.whatsappE164;

export function formatLeadText(lead: Lead): string {
  const lines = [
    "פנייה חדשה מהאתר Aviya",
    "────────────────",
    `שם: ${lead.name}`,
    `טלפון: ${lead.phone}`,
    lead.business && lead.business !== "—"
      ? `עסק: ${lead.business}`
      : null,
    `מקור: ${lead.source}`,
    `זמן: ${new Date(lead.createdAt).toLocaleString("he-IL")}`,
    "────────────────",
    `לחיוג: tel:${lead.phone.replace(/\D/g, "")}`,
    `וואטסאפ ללקוח: https://wa.me/${phoneToE164(lead.phone)}`,
    `צפייה בפניות: /leads`,
  ];
  return lines.filter(Boolean).join("\n");
}

function phoneToE164(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.startsWith("972")) return d;
  if (d.startsWith("0")) return `972${d.slice(1)}`;
  return d;
}

function formatLeadHtml(lead: Lead): string {
  const waClient = `https://wa.me/${phoneToE164(lead.phone)}`;
  const tel = lead.phone.replace(/\D/g, "");
  return `
    <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1430">
      <h2 style="margin:0 0 12px;color:#3d2a78">פנייה חדשה מהאתר Aviya</h2>
      <table style="border-collapse:collapse;width:100%;max-width:480px">
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>שם</b></td>
            <td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>טלפון</b></td>
            <td style="padding:8px;border-bottom:1px solid #eee" dir="ltr">${escapeHtml(lead.phone)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>עסק</b></td>
            <td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(lead.business || "—")}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>מקור</b></td>
            <td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(lead.source)}</td></tr>
        <tr><td style="padding:8px"><b>זמן</b></td>
            <td style="padding:8px">${escapeHtml(new Date(lead.createdAt).toLocaleString("he-IL"))}</td></tr>
      </table>
      <p style="margin:18px 0 8px">
        <a href="tel:${tel}" style="display:inline-block;padding:10px 16px;background:#3d2a78;color:#fff;text-decoration:none;border-radius:8px;margin-left:8px">התקשר</a>
        <a href="${waClient}" style="display:inline-block;padding:10px 16px;background:#25d366;color:#fff;text-decoration:none;border-radius:8px">וואטסאפ ללקוח</a>
      </p>
    </div>
  `.trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function notifyViaFormSubmit(
  lead: Lead,
  email: string
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(email)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `פנייה חדשה מהאתר Aviya — ${lead.name}`,
          _template: "table",
          _captcha: "false",
          _honey: "",
          name: lead.name,
          phone: lead.phone,
          business: lead.business,
          source: lead.source,
          createdAt: new Date(lead.createdAt).toLocaleString("he-IL"),
          message: formatLeadText(lead),
        }),
        signal: AbortSignal.timeout(8_000),
      }
    );
    if (!res.ok) {
      console.error("FormSubmit failed", email, res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("FormSubmit error", email, e);
    return false;
  }
}

async function notifyViaResend(lead: Lead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;
  const from =
    process.env.RESEND_FROM?.trim() || "Aviya Leads <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [LEADS_NOTIFY_EMAIL],
        cc:
          LEADS_NOTIFY_EMAIL_CC && LEADS_NOTIFY_EMAIL_CC !== LEADS_NOTIFY_EMAIL
            ? [LEADS_NOTIFY_EMAIL_CC]
            : undefined,
        subject: `פנייה חדשה מהאתר Aviya — ${lead.name}`,
        text: formatLeadText(lead),
        html: formatLeadHtml(lead),
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      console.error("Resend failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("Resend error", e);
    return false;
  }
}

async function notifyViaCallMeBot(lead: Lead): Promise<boolean> {
  const apikey = process.env.CALLMEBOT_APIKEY?.trim();
  if (!apikey) return false;
  const phone = LEADS_NOTIFY_WHATSAPP.replace(/\D/g, "");
  const text = encodeURIComponent(formatLeadText(lead));
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${encodeURIComponent(apikey)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) {
      console.error("CallMeBot failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("CallMeBot error", e);
    return false;
  }
}

/** Free push notifications — open app and subscribe once (no API key) */
async function notifyViaNtfy(lead: Lead): Promise<boolean> {
  const topic =
    process.env.NTFY_TOPIC?.trim() || "aviya-leads-nish-private-2026";
  try {
    const res = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: "POST",
      headers: {
        Title: encodeURIComponent(`פנייה חדשה · ${lead.name}`),
        Priority: "high",
        Tags: "telephone_receiver,aviya",
        "Content-Type": "text/plain; charset=utf-8",
      },
      body: formatLeadText(lead),
      signal: AbortSignal.timeout(6_000),
    });
    return res.ok;
  } catch (e) {
    console.error("ntfy error", e);
    return false;
  }
}

async function notifyViaWebhook(lead: Lead): Promise<boolean> {
  const url = process.env.LEADS_WEBHOOK_URL?.trim();
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "new_lead",
        email: LEADS_NOTIFY_EMAIL,
        whatsapp: LEADS_NOTIFY_WHATSAPP,
        lead,
        text: formatLeadText(lead),
      }),
      signal: AbortSignal.timeout(5_000),
    });
    return res.ok;
  } catch (e) {
    console.error("webhook notify error", e);
    return false;
  }
}

/** Fan-out when a lead is submitted */
export async function notifyNewLead(lead: Lead): Promise<void> {
  const emails = Array.from(
    new Set(
      [LEADS_NOTIFY_EMAIL, LEADS_NOTIFY_EMAIL_CC].filter(
        (e): e is string => Boolean(e)
      )
    )
  );

  const jobs: Promise<boolean>[] = [
    ...emails.map((email) => notifyViaFormSubmit(lead, email)),
    notifyViaResend(lead),
    notifyViaCallMeBot(lead),
    notifyViaNtfy(lead),
    notifyViaWebhook(lead),
  ];

  const results = await Promise.allSettled(jobs);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error("lead notify rejected", i, r.reason);
    } else {
      console.info("lead notify", i, r.value ? "ok" : "skip/fail");
    }
  });
}
