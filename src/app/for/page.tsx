import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome, SiteCtaBand } from "@/components/site/SiteChrome";
import { studioIndustries } from "@/data/studio-extras";

export const metadata: Metadata = {
  title: "אתר לפי תחום — קליניקה, שירותים, חנות, B2B",
  description:
    "Aviya בונה אתרים לפי סוג העסק: קליניקות, שירותים, B2B, חנויות ודפי נחיתה. מסר מותאם, מובייל והמרה — לכל הארץ.",
  alternates: { canonical: "/for" },
  keywords: [
    "אתר לקליניקה",
    "אתר לעסק שירותים",
    "אתר B2B",
    "חנות דיגיטלית",
    "דף נחיתה",
    "שדרוג אתר",
  ],
  openGraph: {
    title: "אתר לפי תחום | Aviya",
    description: "אותה רמת ביצוע. מסר אחר לכל תחום.",
    url: "/for",
  },
};

export default function ForPage() {
  return (
    <SiteChrome title="אתר לפי סוג העסק">
      <p className="site-kicker">תחומים</p>
      <p className="site-lead">
        תבנית אחת לא עובדת לכולם. קליניקה צריכה אמון. חנות צריכה קנייה. B2B צריך
        רצינות. כאן בונים את המסר סביב מי שמחליט — ואז את העיצוב.
      </p>

      <ul className="site-pillars">
        {studioIndustries.map((item) => (
          <li key={item.t}>
            <h2>{item.t}</h2>
            <p>{item.d}</p>
            <p>
              <Link href={item.href}>לקריאה ←</Link>
            </p>
          </li>
        ))}
      </ul>

      <SiteCtaBand note="לא בטוחים באיזה מסלול? משאירים פרטים — נכוון יחד." />
    </SiteChrome>
  );
}
