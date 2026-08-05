import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { randomBytes } from "crypto";
import {
  DEFAULT_LEADS_ADMIN_PASSWORD,
  listLeadsFromSupabase,
  saveLeadToSupabase,
} from "@/lib/supabase-leads";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  business: string;
  source: string;
  createdAt: string;
  /** Optional snake_case for Supabase payload */
  created_at?: string;
};

const memoryLeads: Lead[] = [];

function leadsFilePath(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "aviya-leads.json");
  }
  return path.join(process.cwd(), "data", "leads.json");
}

/**
 * Admin password for /leads + API list.
 * Default matches Supabase secrets so it works without env.
 * Override with LEADS_PASSWORD in Vercel when ready.
 */
export function getLeadsPassword(): string {
  const env = process.env.LEADS_PASSWORD?.trim();
  if (env && env.length >= 8) return env;
  return DEFAULT_LEADS_ADMIN_PASSWORD;
}

export function isLeadsAdminConfigured(): boolean {
  return getLeadsPassword().length >= 8;
}

async function readFromDisk(): Promise<Lead[] | null> {
  const file = leadsFilePath();
  try {
    await fs.mkdir(path.dirname(file), { recursive: true });
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return null;
  }
}

async function writeToDisk(leads: Lead[]): Promise<void> {
  const file = leadsFilePath();
  try {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(
      file,
      JSON.stringify(leads.slice(0, 2_000), null, 2),
      "utf8"
    );
  } catch (e) {
    console.error("leads disk write failed", e);
  }
}

export async function readLeads(): Promise<Lead[]> {
  // Primary: durable Supabase
  const remote = await listLeadsFromSupabase(getLeadsPassword());
  if (remote) return remote;

  const fromDisk = await readFromDisk();
  if (fromDisk) {
    const ids = new Set(fromDisk.map((l) => l.id));
    const extra = memoryLeads.filter((l) => !ids.has(l.id));
    return [...extra, ...fromDisk];
  }
  return [...memoryLeads];
}

export async function addLead(
  input: Omit<Lead, "id" | "createdAt" | "created_at">
): Promise<Lead> {
  const createdAt = new Date().toISOString();
  const lead: Lead = {
    id: `${Date.now()}-${randomBytes(4).toString("hex")}`,
    createdAt,
    created_at: createdAt,
    name: input.name.trim().slice(0, 80),
    phone: input.phone.trim().slice(0, 24),
    business: (input.business || "").trim().slice(0, 120) || "—",
    source: input.source.trim().slice(0, 80) || "אתר",
  };

  memoryLeads.unshift(lead);
  if (memoryLeads.length > 500) memoryLeads.length = 500;

  // Durable first
  await saveLeadToSupabase(lead);

  // Local/tmp backup
  try {
    const existing = (await readFromDisk()) ?? [];
    existing.unshift(lead);
    await writeToDisk(existing);
  } catch (e) {
    console.error("leads local persist warning", e);
  }

  return lead;
}
