import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "עבודות",
  description:
    "עמוד העבודות של Aviya. אין כאן לקוחות או תוצאות מומצאים. פרויקט יופיע כאן רק כשאפשר להראות אותו באמת.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <SiteFrame>
      <header className="page-hero">
        <div className="shell prose">
          <Breadcrumbs
            items={[
              { name: "בית", path: "/" },
              { name: "עבודות", path: "/work" },
            ]}
          />
          <h1>עבודות</h1>
          <p>
            הסטודיו לא מפרסם לקוחות, לוגואים, פרסים או מספרים שאין להם פרויקט
            אמיתי מאחוריהם. אין כרגע תיק עבודות להצגה.
          </p>
          <p>
            כשיהיה אתר או חנות שאפשר לספר עליהם בכנות — עם ההקשר, לא עם אחוז
            מומצא — הם יופיעו כאן.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/contact">
              לספר על העסק
            </Link>
            <Link className="btn btn-ghost" href="/services">
              לראות שירותים
            </Link>
          </div>
        </div>
      </header>
    </SiteFrame>
  );
}
