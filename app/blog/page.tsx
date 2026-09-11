import type { Metadata } from "next";
import BlogCards from "../../components/shared/BlogCards";
import { CtaBand, PageSection, SectionHeader } from "../../components/shared/PageSystem";
import JsonLd from "../../components/seo/JsonLd";
import { blogPosts, blogSeo } from "../../lib/blog";
import { absoluteUrl, buildPageMetadata } from "../../lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "../../lib/seo/schema";
import styles from "./Blog.module.css";

export const metadata: Metadata = buildPageMetadata(blogSeo);

export default function BlogPage() {
  return (
    <main className="medical-page">
      <JsonLd data={[buildBreadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Blog & News", href: "/blog/" }]), {
        "@context": "https://schema.org", "@type": "Blog", name: "Edmonton Doctors Blog & News", url: absoluteUrl("/blog/"), description: blogSeo.description,
        blogPost: blogPosts.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: absoluteUrl(post.path), datePublished: post.published })),
      }]} />
      <section className={styles.hero}>
        <div className="medical-container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}><a href="/">Home</a><span aria-hidden="true">/</span><span>Blog & News</span></nav>
          <p className="medical-eyebrow">Edmonton Doctors · Patient resources</p>
          <h1>Blog & News</h1>
          <p className={styles.intro}>Practical guidance for your next step in care. Explore how to find a family doctor, choose the right clinic visit, and prepare for a health checkup in Edmonton.</p>
        </div>
      </section>
      <PageSection><SectionHeader eyebrow="Patient guides" heading="Make your next visit easier" intro="Start with the questions that matter to you, with links to local services and trusted Alberta health resources." /><BlogCards /></PageSection>
      <PageSection tone="muted"><CtaBand heading="Ready to connect with a clinic?" description="Explore our physicians and clinic locations, or request follow-up about new-patient availability." primaryAction={{ href: "/family-doctor/", label: "Meet our family doctors" }} secondaryAction={{ href: "/locations/", label: "Find a location" }} /></PageSection>
    </main>
  );
}
