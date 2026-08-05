import { NextResponse } from "next/server";
import {
  addLead,
  getLeadsPassword,
  isLeadsAdminConfigured,
  notifyLeadWebhook,
  readLeads,
} from "@/lib/leads";
import { clientIp, parseLeadBody, rateLimit } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function noStoreJson(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** POST — save a new lead from the website form */
export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (!rateLimit(`lead:post:${ip}`, 8, 60_000)) {
      return noStoreJson({ error: "יותר מדי ניסיונות. נסו שוב בעוד דקה." }, 429);
    }
    // Also limit total per day window per IP (spam farms)
    if (!rateLimit(`lead:day:${ip}`, 40, 86_400_000)) {
      return noStoreJson({ error: "הגעתם למכסת היום. צרו קשר בוואטסאפ." }, 429);
    }

    const parsed = await parseLeadBody(req);
    if (!parsed.ok) {
      // Honeypot: fake success so bots do not retry differently
      if (parsed.error === "honeypot") {
        return noStoreJson({ ok: true, id: "ok" });
      }
      return noStoreJson({ error: parsed.error }, parsed.status);
    }

    const lead = await addLead(parsed.data);
    // Fire-and-forget notification (does not block user on webhook latency)
    void notifyLeadWebhook(lead);

    return noStoreJson({ ok: true, id: lead.id });
  } catch (e) {
    console.error("leads POST", e);
    return noStoreJson({ error: "שגיאה בשמירה" }, 500);
  }
}

/** GET — list leads (requires password via header preferred) */
export async function GET(req: Request) {
  if (!isLeadsAdminConfigured()) {
    return noStoreJson(
      { error: "מערכת הפניות לא מוגדרת (חסר LEADS_PASSWORD בסביבה)" },
      503
    );
  }

  const url = new URL(req.url);
  // Prefer header — query param kept only for backward compat, rate-limited hard
  const password =
    req.headers.get("x-leads-password") ||
    url.searchParams.get("password") ||
    "";

  const ip = clientIp(req);
  if (!rateLimit(`lead:admin:${ip}`, 20, 60_000)) {
    return noStoreJson({ error: "יותר מדי ניסיונות" }, 429);
  }

  if (!password || password !== getLeadsPassword()) {
    // Uniform response + small delay signal for brute force
    return noStoreJson({ error: "סיסמה שגויה" }, 401);
  }

  try {
    const leads = await readLeads();
    return noStoreJson({ leads });
  } catch (e) {
    console.error("leads GET", e);
    return noStoreJson({ error: "שגיאה בטעינה" }, 500);
  }
}
