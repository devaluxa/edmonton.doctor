import type { Metadata } from "next";
import { businessName, siteUrl, type SeoConfig } from "../sitePages";

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }

  return new URL(path, siteUrl).toString();
}

export function buildPageMetadata(page: SeoConfig): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.noIndex ? undefined : page.path,
    },
    robots: page.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(page.path),
      siteName: businessName,
      type: "website",
    },
  };
}
