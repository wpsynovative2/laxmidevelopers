import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required for metadata routes under `output: "export"`.
export const dynamic = "force-static";

/** Emitted as a static sitemap.xml during `next build`. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/projects/laxmi-heights", priority: 0.9 },
    { path: "/projects", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/career", priority: 0.5 },
  ];

  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}/`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
