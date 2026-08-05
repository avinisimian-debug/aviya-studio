import { NextResponse } from "next/server";
import {
  addLead,
  getLeadsPassword,
  isLeadsAdminConfigured,
  readLeads,
  type Lead,
} from "@/lib/leads";
import { notifyNewLead } from "@/lib/notify-leads";
import { clientIp, parseLeadBody, rateLimit } from "@/lib/security";
import { randomBytes } from "crypto";

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

function makeLeadFromParsed(data: {
  name: string;
  phone: string;
  business: string;
  source: string;
}): Lead {
  return {
    id: `${Date.now()}-${randomBytes(4).toString("hex")}`,
    createdAt: new Date().toISOString(),
    name: data.name,
    phone: data.phone,
    business: data.business || "—",
    source: data.source || "אתר",
  };
}

/** POST — accept lead, notify email, never block visitor on storage */
export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (!rateLimit(`lead:post:${ip}`, 8, 60_000)) {
      return noStoreJson({ error: "יותר מדי ניסיונות. נסו שוב בעוד דקה." }, 429);
    }
    if (!rateLimit(`lead:day:${ip}`, 40, 86_400_000)) {
      return noStoreJson({ error: "הגעתם למכסת היום. צרו קשר בוואטסאפ." }, 429);
    }

    const parsed = await parseLeadBody(req);
    if (!parsed.ok) {
      if (parsed.error === "honeypot") {
        return noStoreJson({ ok: true, id: "ok" });
      }
      return noStoreJson({ error: parsed.error }, parsed.status);
    }

    let lead: Lead;
    try {
      lead = await addLead(parsed.data);
    } catch (e) {
      // Absolute last resort — still accept + email
      console.error("addLead failed, using ephemeral lead", e);
      lead = makeLeadFromParsed(parsed.data);
    }

    // Await notify briefly so serverless doesn't kill the email mid-flight
    try {
      await Promise.race([
        notifyNewLead(lead),
        new Promise((r) => setTimeout(r, 6_000)),
      ]);
    } catch (e) {
      console.error("notifyNewLead error (lead still accepted)", e);
    }

    return noStoreJson({ ok: true, id: lead.id });
  } catch (e) {
    console.error("leads POST", e);
    // Avoid scaring visitors — if body was unreadable the parse path already 400'd
    return noStoreJson(
      { error: "לא הצלחנו לשמור כרגע. נסו שוב או שלחו בוואטסאפ." },
      500
    );
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
  const password =
    req.headers.get("x-leads-password") ||
    url.searchParams.get("password") ||
    "";

  const ip = clientIp(req);
  if (!rateLimit(`lead:admin:${ip}`, 20, 60_000)) {
    return noStoreJson({ error: "יותר מדי ניסיונות" }, 429);
  }

  if (!password || password !== getLeadsPassword()) {
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
