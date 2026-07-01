import type { MetadataRoute } from "next";
import { sitemapPages, siteUrl } from "../lib/sitePages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPages.map((page) => ({
    url: new URL(page.path, siteUrl).toString(),
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : page.path === "/services/" ? 0.9 : 0.7,
  }));
}
