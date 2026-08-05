import { promises as fs } from "fs";
import os from "os";
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

/**
 * Vercel/serverless: only /tmp is writable.
 * Local: project data/ folder for the /leads admin inbox.
 */
function leadsFilePath(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "aviya-leads.json");
  }
  return path.join(process.cwd(), "data", "leads.json");
}

/** In-memory fallback for the current instance when disk is unavailable */
const memoryLeads: Lead[] = [];

/**
 * Admin password for /api/leads GET and /leads UI.
 * Set LEADS_PASSWORD in production. Never hardcode secrets in the client.
 */
export function getLeadsPassword(): string {
  const env = process.env.LEADS_PASSWORD?.trim();
  if (env && env.length >= 8) return env;
  if (process.env.NODE_ENV !== "production") {
    return "aviya-dev-local";
  }
  return "";
}

export function isLeadsAdminConfigured(): boolean {
  return getLeadsPassword().length >= 8;
}

async function readFromDisk(): Promise<Lead[] | null> {
  const file = leadsFilePath();
  try {
    const dir = path.dirname(file);
    await fs.mkdir(dir, { recursive: true });
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return null;
  }
}

async function writeToDisk(leads: Lead[]): Promise<boolean> {
  const file = leadsFilePath();
  try {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(leads.slice(0, 2_000), null, 2), "utf8");
    return true;
  } catch (e) {
    console.error("leads disk write failed", e);
    return false;
  }
}

export async function readLeads(): Promise<Lead[]> {
  const fromDisk = await readFromDisk();
  if (fromDisk) {
    // Merge recent memory leads not on disk (edge cases)
    const ids = new Set(fromDisk.map((l) => l.id));
    const extra = memoryLeads.filter((l) => !ids.has(l.id));
    return [...extra, ...fromDisk];
  }
  return [...memoryLeads];
}

/**
 * Create a lead object, try to persist (disk / memory).
 * Never throws — email notification is the source of truth on Vercel.
 */
export async function addLead(
  input: Omit<Lead, "id" | "createdAt">
): Promise<Lead> {
  const lead: Lead = {
    id: `${Date.now()}-${randomBytes(4).toString("hex")}`,
    createdAt: new Date().toISOString(),
    name: input.name.trim().slice(0, 80),
    phone: input.phone.trim().slice(0, 24),
    business: (input.business || "").trim().slice(0, 120) || "—",
    source: input.source.trim().slice(0, 80) || "אתר",
  };

  memoryLeads.unshift(lead);
  if (memoryLeads.length > 500) memoryLeads.length = 500;

  try {
    const existing = (await readFromDisk()) ?? [];
    existing.unshift(lead);
    await writeToDisk(existing);
  } catch (e) {
    // Disk optional on serverless — lead still success for the visitor
    console.error("leads addLead persist warning", e);
  }

  return lead;
}

/** Optional webhook when LEADS_WEBHOOK_URL is set */
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
