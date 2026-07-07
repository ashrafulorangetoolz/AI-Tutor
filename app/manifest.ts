import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — SSC & IELTS`,
    short_name: SITE.name,
    description: SITE.tagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fafafc",
    theme_color: "#7034EA",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
