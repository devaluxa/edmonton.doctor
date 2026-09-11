import familyDoctor from "../content/blog/how-to-find-family-doctor-edmonton.json";
import walkIn from "../content/blog/walk-in-clinic-vs-family-doctor-edmonton.json";
import checkups from "../content/blog/health-checkups-preventive-care-edmonton.json";

export const blogPosts = [familyDoctor, walkIn, checkups].sort((a, b) => b.published.localeCompare(a.published));
export type BlogPost = (typeof blogPosts)[number];
export const blogSeo = {
  path: "/blog/",
  title: "Blog & News | Edmonton Doctors Patient Guides",
  description: "Practical guides from Edmonton Doctors on finding a family doctor, choosing walk-in care, and preparing for preventive health visits in Edmonton.",
};

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
