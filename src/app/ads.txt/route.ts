import { NextResponse } from "next/server";

/**
 * Google AdSense ads.txt
 * After approval, set NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-XXXXXXXX
 * Format: google.com, pub-XXXXXXXX, DIRECT, f08c47fec0942fa0
 */
export function GET() {
  const raw =
    process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim() ||
    process.env.ADSENSE_PUB_ID?.trim() ||
    "";

  // ca-pub-123 → pub-123
  const pub = raw.replace(/^ca-/, "");

  const lines = [
    "# Aviya Studio — ads.txt",
    "# Replace with your AdSense publisher ID after approval:",
    "# https://www.google.com/adsense",
  ];

  if (pub && pub.startsWith("pub-")) {
    lines.push(`google.com, ${pub}, DIRECT, f08c47fec0942fa0`);
  } else {
    // Placeholder keeps crawlers happy until real ID is set
    lines.push("# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0");
  }

  lines.push("");

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
