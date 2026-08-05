import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  business: string;
  source: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

/**
 * Admin password for /api/leads GET and /leads UI.
 * Set LEADS_PASSWORD in production. Never hardcode secrets in the client.
 */
export function getLeadsPassword(): string {
  const env = process.env.LEADS_PASSWORD?.trim();
  if (env && env.length >= 8) return env;
  // Local/dev only fallback — production without env refuses admin GET
  if (process.env.NODE_ENV !== "production") {
    return "aviya-dev-local";
  }
  return "";
}

export function isLeadsAdminConfigured(): boolean {
  return getLeadsPassword().length >= 8;
}

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf8");
  }
}

export async function readLeads(): Promise<Lead[]> {
  await ensureStore();
  const raw = await fs.readFile(LEADS_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addLead(
  input: Omit<Lead, "id" | "createdAt">
): Promise<Lead> {
  const leads = await readLeads();
  const lead: Lead = {
    id: `${Date.now()}-${randomBytes(4).toString("hex")}`,
    createdAt: new Date().toISOString(),
    name: input.name.trim().slice(0, 80),
    phone: input.phone.trim().slice(0, 24),
    business: (input.business || "").trim().slice(0, 120) || "—",
    source: input.source.trim().slice(0, 80) || "אתר",
  };
  leads.unshift(lead);
  // Cap store size to reduce dump risk / disk growth
  const capped = leads.slice(0, 2_000);
  await fs.writeFile(LEADS_FILE, JSON.stringify(capped, null, 2), "utf8");
  return lead;
}

/** Optional webhook (Zapier / Make / n8n / Slack) when LEADS_WEBHOOK_URL is set */
export async function notifyLeadWebhook(lead: Lead): Promise<void> {
  const url = process.env.LEADS_WEBHOOK_URL?.trim();
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "new_lead",
        lead: {
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          business: lead.business,
          source: lead.source,
          createdAt: lead.createdAt,
        },
      }),
      signal: AbortSignal.timeout(4_000),
    });
  } catch (e) {
    console.error("leads webhook failed", e);
  }
}
