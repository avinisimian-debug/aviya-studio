import { NextResponse } from "next/server";
import { addLead, getLeadsPassword, readLeads } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST — save a new lead from the website form */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      phone?: string;
      business?: string;
      source?: string;
    };

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const business = String(body.business ?? "").trim();
    const source = String(body.source ?? "טופס אתר").trim();

    const digits = phone.replace(/\D/g, "");
    if (name.length < 2) {
      return NextResponse.json({ error: "שם לא תקין" }, { status: 400 });
    }
    if (digits.length < 9 || digits.length > 12) {
      return NextResponse.json({ error: "טלפון לא תקין" }, { status: 400 });
    }

    const lead = await addLead({ name, phone, business, source });
    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    console.error("leads POST", e);
    return NextResponse.json({ error: "שגיאה בשמירה" }, { status: 500 });
  }
}

/** GET — list leads (requires password) */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const password =
    url.searchParams.get("password") ||
    req.headers.get("x-leads-password") ||
    "";

  if (password !== getLeadsPassword()) {
    return NextResponse.json({ error: "סיסמה שגויה" }, { status: 401 });
  }

  try {
    const leads = await readLeads();
    return NextResponse.json({ leads });
  } catch (e) {
    console.error("leads GET", e);
    return NextResponse.json({ error: "שגיאה בטעינה" }, { status: 500 });
  }
}
