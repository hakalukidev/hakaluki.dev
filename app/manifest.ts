import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "hakaluki.dev — Web, App & AI Solutions",
    short_name: "hakaluki.dev",
    description:
      "hakaluki.dev is a Sylhet, Bangladesh-based software company building fast websites, mobile apps, AI automation, and machine learning solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F2EF",
    theme_color: "#F4F2EF",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/logo/title_logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
