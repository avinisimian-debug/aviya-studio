import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFrame } from "@/components/studio/SiteFrame";
import { brandVoice } from "@/data/site-content";
import { whatsappHref } from "@/lib/contact-channels";

/** Shared chrome for secondary pages that still use the older article layout. */
export function SiteChrome({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <SiteFrame>
      <article className="legacy-page">
        {title ? <h1>{title}</h1> : null}
        {children}
      </article>
    </SiteFrame>
  );
}

export function SiteCtaBand({ note }: { note?: string }) {
  const whatsapp = whatsappHref();
  return (
    <div className="site-cta-band">
      <p>{note ?? brandVoice.valueLine}</p>
      <div className="site-cta-row">
        <Link href="/contact" className="site-btn site-btn--primary">
          השאירו פרטים
        </Link>
        {whatsapp ? (
          <a
            href={whatsapp}
            className="site-btn site-btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            וואטסאפ
          </a>
        ) : null}
      </div>
    </div>
  );
}
