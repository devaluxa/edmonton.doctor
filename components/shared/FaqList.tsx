import type { FaqItem } from "../../lib/sitePages";
import styles from "./FaqList.module.css";

type FaqListProps = {
  items: FaqItem[];
  tone?: "light" | "dark";
};

export default function FaqList({ items, tone = "light" }: FaqListProps) {
  const isDark = tone === "dark";

  return (
    <div className={isDark ? "grid gap-4" : styles.list}>
      {items.map((item) => (
        <details
          className={
            isDark
              ? "group rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-sm transition hover:border-[var(--brand-color-primary)] hover:bg-white/[0.1]"
              : styles.item
          }
          data-testid={isDark ? undefined : "faq-item"}
          key={item.question}
        >
          <summary
            className={
              isDark
                ? "cursor-pointer list-none text-lg font-black leading-snug text-white"
                : styles.summary
            }
          >
            <span
              className={
                isDark
                  ? "inline-flex w-full items-center justify-between gap-4"
                  : styles.summaryInner
              }
            >
              <span className={isDark ? "" : styles.question}>
                {item.question}
              </span>
              <span
                className={
                  isDark
                    ? "text-[var(--brand-color-accent)] transition group-open:rotate-45"
                    : styles.icon
                }
                data-testid={isDark ? undefined : "faq-icon"}
                aria-hidden="true"
              >
                +
              </span>
            </span>
          </summary>
          <p
            className={isDark ? "mt-4 text-base leading-8 text-slate-300" : styles.answer}
          >
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
