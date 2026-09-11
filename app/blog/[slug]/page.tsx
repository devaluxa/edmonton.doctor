import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import JsonLd from "../../../components/seo/JsonLd";
import BlogCards from "../../../components/shared/BlogCards";
import BlogGraphic from "../../../components/shared/BlogGraphic";
import { CtaBand, PageSection, SectionHeader } from "../../../components/shared/PageSystem";
import { blogPosts, formatBlogDate, getBlogPost } from "../../../lib/blog";
import { absoluteUrl, buildPageMetadata } from "../../../lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "../../../lib/seo/schema";
import styles from "../Blog.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const metadata = buildPageMetadata({ ...post, title: post.seoTitle });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.published, modifiedTime: post.modified, section: post.category, images: [{ url: absoluteUrl(post.image.src), alt: post.image.alt }] }, twitter: { card: "summary_large_image", title: post.seoTitle, description: post.description, images: [absoluteUrl(post.image.src)] } };
}

// Render the supplied articles' links and citations as React nodes, without raw HTML.
function inline(text: string): ReactNode[] {
  const pattern = /\[\^(\d+)\]|\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let start = 0;
  for (const match of text.matchAll(pattern)) {
    nodes.push(text.slice(start, match.index));
    if (match[1]) nodes.push(<sup key={match.index}><a href={`#source-${match[1]}`} aria-label={`Source ${match[1]}`}>[{match[1]}]</a></sup>);
    else nodes.push(<a key={match.index} href={match[3]}>{match[2]}</a>);
    start = match.index! + match[0].length;
  }
  nodes.push(text.slice(start));
  return nodes;
}

export default async function BlogArticle({ params }: Props) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Blog & News", href: "/blog/" }, { label: post.title, href: post.path }];
  return (
    <main className="medical-page">
      <JsonLd data={[buildBreadcrumbJsonLd(breadcrumbs), {
        "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description,
        datePublished: post.published, dateModified: post.modified, image: absoluteUrl(post.image.src), mainEntityOfPage: absoluteUrl(post.path), url: absoluteUrl(post.path), inLanguage: "en-CA", articleSection: post.category,
        publisher: { "@type": "Organization", name: "Edmonton Doctors", url: absoluteUrl("/") },
        isPartOf: { "@type": "Blog", url: absoluteUrl("/blog/") }, citation: post.references.map((ref) => absoluteUrl(ref.href)),
      }]} />
      <article>
        <header className={styles.hero}>
          <div className="medical-container">
            <nav aria-label="Breadcrumb" className={styles.breadcrumbs}><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog & News</a><span aria-hidden="true">/</span><span>{post.category}</span></nav>
            <p className="medical-eyebrow">{post.category}</p>
            <h1>{post.title}</h1>
            <p className={styles.meta}>Published <time dateTime={post.published}>{formatBlogDate(post.published)}</time> · {post.readingMinutes} min read · Edmonton Doctors</p>
          </div>
        </header>
        <div className={`medical-container ${styles.featureImage}`}><img src={post.image.src} alt={post.image.alt} width={1200} height={640} fetchPriority="high" /></div>
        <div className={`medical-container ${styles.layout}`}>
          <nav className={styles.contents} aria-label="On this page">
            <h2>On this page</h2>
            <ol>{post.blocks.filter((block) => block.type === "heading").map((block) => <li key={block.id}><a href={`#${block.id}`}>{block.text}</a></li>)}<li><a href="#sources">Sources & further reading</a></li></ol>
          </nav>
          <div className={styles.body}>
            <aside className={styles.note}>General patient information, not a diagnosis or a substitute for advice from your healthcare professional. Confirm current clinic availability directly. For health advice, call <a href="tel:811">811</a>; for a life-threatening emergency, call <a href="tel:911">911</a>.</aside>
            {post.blocks.map((block, index) => <Fragment key={index}>
              {index === 18 ? <BlogGraphic slug={post.slug} /> : null}
              {index === 42 ? <figure className={styles.inlineImage}><img src={post.inlineImage.src} alt={post.inlineImage.alt} width={1200} height={640} loading="lazy" decoding="async" /><figcaption>{post.inlineImage.caption}</figcaption></figure> : null}
              {block.type === "heading" ? <h2 id={block.id}>{block.text}</h2> : <p>{inline(block.text)}</p>}
            </Fragment>)}
            <section className={styles.sources} aria-labelledby="sources">
              <h2 id="sources">Sources & further reading</h2>
              <p>Resources referenced in this guide. Clinic availability and health guidance can change; check the linked source for current information.</p>
              <ol>{post.references.map((ref) => <li id={`source-${ref.id}`} value={Number(ref.id)} key={ref.id}><a href={ref.href}>{ref.label}</a></li>)}</ol>
            </section>
          </div>
        </div>
      </article>
      <PageSection tone="muted"><SectionHeader eyebrow="Keep reading" heading="More patient guides" /><BlogCards posts={blogPosts.filter((other) => other.slug !== post.slug)} /></PageSection>
      <PageSection><CtaBand heading="Take the next step in your care" description="Review our clinic locations or request a follow-up about family doctor availability. Registration is a request, not a confirmed appointment." primaryAction={{ href: "/register/", label: "Register as a new patient" }} secondaryAction={{ href: "/locations/", label: "Contact a clinic" }} /></PageSection>
    </main>
  );
}
