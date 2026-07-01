import FaqList from "../../../components/shared/FaqList";
import { faqItems } from "../../../lib/sitePages";
import { MotionLink, Reveal } from "../_components/Reveal";
import styles from "./HomeFaq.module.css";

export default function HomeFaq() {
  return (
    <section className="medical-section medical-section-muted" id="faq">
      <div className={`medical-container ${styles.grid}`}>
        <Reveal>
          <p className="medical-eyebrow">Patient Questions</p>
          <h2
            aria-label="Common Questions Before You Register"
            className={`brand-h2 ${styles.title}`}
          >
            <span className={styles.titleLine}>Common Questions</span>
            <span className={styles.titleLine}>Before You Register</span>
          </h2>
          <p className="medical-section-intro">
            Clear answers about availability, registration, walk-ins, family
            requests, and what information should stay off online forms.
          </p>
          <MotionLink
            className={`medical-button medical-button-secondary ${styles.link}`}
            href="/faq/"
          >
            View All FAQs
          </MotionLink>
        </Reveal>

        <Reveal delay={0.08}>
          <FaqList items={faqItems.slice(0, 5)} />
        </Reveal>
      </div>
    </section>
  );
}
