import { CtaBand } from "../../../components/shared/PageSystem";
import { homeContent, primaryClinicLocation } from "../../../lib/business/config";
import { Reveal } from "../_components/Reveal";
import styles from "./HomeFinalCta.module.css";

export default function HomeFinalCta() {
  return (
    <section className={`medical-section ${styles.section}`} id="register">
      <div className="medical-container">
        <Reveal y={0}>
          <CtaBand
            description={
              <p>
                Register online or call Beverly Medical Center & Walk-In to ask
                about current availability. Online registration collects only basic
                contact and routing details.
              </p>
            }
            eyebrow="Ready To Register?"
            headingLabel="Take The Next Step Toward Your Family Doctor"
            heading={
              <span className={styles.headingText}>
                <span className={styles.headingLine}>Take The Next Step</span>
                <span className={styles.headingLine}>Toward Your</span>
                <span className={styles.headingLine}>Family Doctor</span>
              </span>
            }
            primaryAction={{
              href: homeContent.hero.primaryCtaHref,
              label: "Register Now",
            }}
            secondaryAction={{
              href: primaryClinicLocation.phoneHref,
              label: `Call ${primaryClinicLocation.phone}`,
              variant: "secondary",
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
