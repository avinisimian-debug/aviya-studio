import type { Metadata } from "next";

/** Private admin — never index in Google */
export const metadata: Metadata = {
  title: "לידים",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
