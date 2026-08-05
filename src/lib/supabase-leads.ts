/**
 * Durable lead store on Supabase (server-only).
 * Anon key is used only from API routes — INSERT only + password-gated list RPC.
 */

import type { Lead } from "@/lib/leads";

const SUPABASE_URL =
  process.env.SUPABASE_URL?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
  "https://zyxkvsueotnenupwjyax.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5eGt2c3Vlb3RuZW51cHdqeWF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxOTc4NDgsImV4cCI6MjA5OTc3Mzg0OH0.93hufOCLaLnWI-O_L9MehhM_MI9MB7sI0nW20mpLA_0";

/** Must match value in Supabase table aviya_leads_secrets.admin */
export const DEFAULT_LEADS_ADMIN_PASSWORD = "AviyaLeads2026Secure";

function headers(extra?: Record<string, string>) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function saveLeadToSupabase(lead: Lead): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/aviya_studio_leads`, {
      method: "POST",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify({
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        business: lead.business || "—",
        source: lead.source || "אתר",
        created_at: lead.created_at || lead.createdAt,
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      console.error("supabase save lead", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("supabase save lead error", e);
    return false;
  }
}

export async function listLeadsFromSupabase(
  password: string
): Promise<Lead[] | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/aviya_leads_list`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ p_password: password }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      console.error("supabase list leads", res.status, await res.text());
      return null;
    }
    const rows = (await res.json()) as Array<{
      id: string;
      name: string;
      phone: string;
      business: string;
      source: string;
      created_at: string;
    }>;
    if (!Array.isArray(rows)) return [];
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      business: r.business,
      source: r.source,
      createdAt: r.created_at,
    }));
  } catch (e) {
    console.error("supabase list leads error", e);
    return null;
  }
}
