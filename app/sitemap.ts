import type { MetadataRoute } from "next";
import { projects } from "./data/projects";

const siteUrl = "https://hakaluki.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: projects.map((project) => `${siteUrl}${project.image}`),
    },
  ];
}
