import { HomePage } from "@/components/studio/HomePage";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { buildHomeMetadata } from "@/lib/seo";

export const metadata = buildHomeMetadata();

export default function Home() {
  return (
    <SiteFrame>
      <HomePage />
    </SiteFrame>
  );
}
