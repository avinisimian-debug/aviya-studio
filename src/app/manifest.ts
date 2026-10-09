import type { MetadataRoute } from "next";
import { SITE_URL, siteSeo } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aviya Studio — בניית אתרים וחנויות דיגיטליות",
    short_name: "Aviya",
    description: siteSeo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e8",
    theme_color: "#14120f",
    lang: "he",
    dir: "rtl",
    orientation: "portrait-primary",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
    id: SITE_URL,
  };
}
