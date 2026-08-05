import { guides } from "@/data/guides";
import { SITE_URL } from "@/lib/seo";

/**
 * IndexNow — notify Bing/Yandex/etc. of URL updates.
 * Google uses Search Console (not IndexNow); this still helps multi-engine discovery.
 *
 * Key must be hosted at: https://{host}/{INDEXNOW_KEY}.txt
 */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY?.trim() || "aviya-idx-8f3c2a91b4e7d6c5";

export function allPublicUrls(): string[] {
  const base = SITE_URL.replace(/\/$/, "");
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/contact",
    "/guides",
    "/promote",
    "/privacy",
    "/accessibility",
  ];
  const guidePaths = guides.map((g) => `/guides/${g.slug}`);
  return [...staticPaths, ...guidePaths].map((p) => `${base}${p}`);
}

export async function submitIndexNow(
  urls: string[] = allPublicUrls()
): Promise<{ ok: boolean; status: number; detail: string }> {
  const host = new URL(SITE_URL).host;
  const keyLocation = `${SITE_URL.replace(/\/$/, "")}/${INDEXNOW_KEY}.txt`;
  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList: urls.slice(0, 10_000),
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const text = await res.text().catch(() => "");
    // 200 / 202 accepted; 422 often means some URLs invalid
    return {
      ok: res.ok || res.status === 202,
      status: res.status,
      detail: text.slice(0, 200) || res.statusText,
    };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      detail: e instanceof Error ? e.message : "network error",
    };
  }
}
