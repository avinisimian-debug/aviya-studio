import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { buildHomeMetadata } from "@/lib/seo";

export const metadata: Metadata = buildHomeMetadata();
export const revalidate = 0;

export default function Home() {
  return <HomePage />;
}
