/* eslint-disable @next/next/no-img-element */

import { CheckCircle2 } from "lucide-react";
import {
  doctorProfiles,
  homeContent,
  medicalImages,
} from "../../../lib/business/config";
import { MotionLink, Reveal, StaggerGroup, StaggerItem } from "../_components/Reveal";
import styles from "./HomeDoctorIntro.module.css";

const doctor = doctorProfiles[0];
const focusAreas = doctor.focusAreas.slice(0, 5);

export default function HomeDoctorIntro() {
  return (
    <section className={styles.section} data-testid="home-doctor-section" id="doctor">
      <div className={`medical-container ${styles.inner}`}>
        <div className={styles.content}>
          <Reveal>
            <p className="medical-eyebrow">{homeContent.doctor.eyebrow}</p>
            <span className={styles.status}>Now accepting new patients in Edmonton</span>
            <h2
              aria-label="Meet Dr. Kingsley Lasing"
              className={`brand-h2 ${styles.title}`}
              data-testid="doctor-section-title"
            >
              <span className={styles.titleLine}>Meet Dr.</span>
              <span className={styles.titleLine}>Kingsley Lasing</span>
            </h2>
            <p className={styles.intro}>{homeContent.doctor.description}</p>
            <p className={styles.body}>{doctor.intro}</p>
          </Reveal>

          <StaggerGroup className={styles.focusList}>
            {focusAreas.map((area) => (
              <StaggerItem className={styles.focusItem} key={area}>
                <CheckCircle2 aria-hidden="true" size={20} strokeWidth={2.5} />
                <span>{area}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.08}>
            <div className={`medical-action-row ${styles.actions}`}>
              <MotionLink
                className="medical-button medical-button-primary"
                href={homeContent.doctor.ctaHref}
              >
                {homeContent.doctor.ctaLabel}
              </MotionLink>
              <MotionLink
                className="medical-button medical-button-secondary"
                href="/family-doctor/"
              >
                Meet The Doctors
              </MotionLink>
            </div>
          </Reveal>
        </div>

        <Reveal className={styles.media} y={18}>
          <figure className={styles.imageCard} data-testid="doctor-featured-card">
            <img
              alt={medicalImages.drKingsleyPortrait.alt}
              className={styles.image}
              data-testid="doctor-featured-image"
              decoding="async"
              loading="eager"
              src={medicalImages.drKingsleyPortrait.src}
            />
            <figcaption className={styles.imageBadge}>
              <span>Edmonton Family Physician</span>
              <strong>Compassionate care for patients and families.</strong>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
