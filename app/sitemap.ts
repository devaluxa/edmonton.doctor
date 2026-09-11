import type { MetadataRoute } from "next";
import { sitemapPages, siteUrl } from "../lib/sitePages";
import { blogPosts, blogSeo } from "../lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...sitemapPages, blogSeo, ...blogPosts].map((page) => ({
    url: new URL(page.path, siteUrl).toString(),
    ...("modified" in page ? { lastModified: String(page.modified) } : {}),
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : page.path === "/services/" ? 0.9 : 0.7,
  }));
}
