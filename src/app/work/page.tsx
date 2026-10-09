import type { Metadata } from "next";
import Link from "next/link";
import { concepts } from "@/data/concepts";
import { Breadcrumbs } from "@/components/studio/Breadcrumbs";
import { ConceptGallery } from "@/components/studio/ConceptGallery";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "כיווני עיצוב",
  description:
    "כיווני עיצוב מקוריים של Aviya לעסקי שירות, חנויות, קליניקות, דפי נחיתה ומותג. מסומנים כקונספט, לא כפרויקטי לקוחות.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <SiteFrame>
      <header className="page-hero page-hero-dark">
        <div className="shell">
          <Breadcrumbs
            items={[
              { name: "בית", path: "/" },
              { name: "כיוונים", path: "/work" },
            ]}
          />
          <h1>כיווני עיצוב</h1>
          <p>
            אלה קונספטים מקוריים: הדגמה של שפה, מבנה וקצב. לא לקוחות, לא לוגואים,
            ולא תוצאות. כשיהיה פרויקט עם אישור להצגה, הוא יסומן כעבודה ולא ככיוון.
          </p>
        </div>
      </header>
      <section className="band band-ink" aria-labelledby="folio-title">
        <div className="shell">
          <h2 id="folio-title" className="sr-only">
            גלריית כיוונים
          </h2>
          <ConceptGallery concepts={concepts} />
          <p className="folio-note">
            רוצים כיוון לעסק שלכם, לא העתק של המסכים האלה?{" "}
            <Link href="/contact">שיחה קצרה</Link>
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
