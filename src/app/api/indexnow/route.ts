import { NextResponse } from "next/server";
import {
  allPublicUrls,
  INDEXNOW_KEY,
  submitIndexNow,
} from "@/lib/indexnow";
import { clientIp, rateLimit } from "@/lib/security";
import { SITE_URL } from "@/lib/seo";

/**
 * POST/GET — notify IndexNow (Bing etc.) about all public URLs.
 * Rate-limited. Optional header x-leads-password for force (leads admin).
 */
export async function POST(req: Request) {
  return handle(req);
}

export async function GET(req: Request) {
  return handle(req);
}

async function handle(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`indexnow:${ip}`, 4, 60 * 60_000)) {
    return NextResponse.json(
      { ok: false, error: "rate_limit" },
      { status: 429 }
    );
  }

  const result = await submitIndexNow(allPublicUrls());
  return NextResponse.json({
    ok: result.ok,
    status: result.status,
    detail: result.detail,
    site: SITE_URL,
    keyFile: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urls: allPublicUrls().length,
    googleNote:
      "IndexNow does not cover Google. Use Search Console: open /google for steps.",
  });
}
