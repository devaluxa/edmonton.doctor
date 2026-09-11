import { blogPosts, formatBlogDate, type BlogPost } from "../../lib/blog";
import styles from "../../app/blog/Blog.module.css";

export default function BlogCards({ posts = blogPosts }: { posts?: BlogPost[] }) {
  return (
    <div className={styles.cards}>
      {posts.map((post, index) => (
        <article className={styles.card} key={post.slug}>
          <div className={styles.cardTop}><span>{post.category}</span><span aria-hidden="true">0{index + 1}</span></div>
          <div className={styles.cardBody}>
            <p className={styles.meta}><time dateTime={post.published}>{formatBlogDate(post.published)}</time> · {post.readingMinutes} min read</p>
            <h3><a href={post.path}>{post.title}</a></h3>
            <p>{post.description}</p>
            <a className={styles.readMore} href={post.path} aria-label={`Read: ${post.title}`}>Read guide <span aria-hidden="true">→</span></a>
          </div>
        </article>
      ))}
    </div>
  );
}
