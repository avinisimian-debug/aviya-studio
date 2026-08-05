/** Shared AdSense / GA env helpers (safe for client + server) */

export function getAdSenseClientId(): string | null {
  const id =
    process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim() ||
    process.env.ADSENSE_CLIENT_ID?.trim() ||
    "";
  if (!id) return null;
  if (id.startsWith("ca-pub-")) return id;
  if (id.startsWith("pub-")) return `ca-${id}`;
  return null;
}

export function getGaMeasurementId(): string | null {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
  return id.startsWith("G-") ? id : null;
}
