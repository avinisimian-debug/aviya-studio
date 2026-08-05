import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "מדריך — מעביר…",
  robots: { index: false, follow: true },
};

/** Legacy path → new guides article */
export default function GuideRedirectPage() {
  redirect("/guides/why-business-needs-website");
}
