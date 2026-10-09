import type { ReactNode } from "react";
import { Footer } from "@/components/studio/Footer";
import { Header } from "@/components/studio/Header";
import { StickyContact } from "@/components/studio/StickyContact";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="studio">
      <a className="skip-link" href="#main">
        דלג לתוכן
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <StickyContact />
    </div>
  );
}
