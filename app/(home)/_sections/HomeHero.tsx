/* eslint-disable @next/next/no-img-element */

import { ArrowRight, CalendarCheck, MapPin, PhoneCall } from "lucide-react";
import { homeContent, medicalImages, primaryClinicLocation } from "../../../lib/business/config";
import { MotionLink, Reveal, StaggerGroup, StaggerItem } from "../_components/Reveal";
import styles from "./HomeHero.module.css";

const hero = homeContent.hero;

export default function HomeHero() {
  return (
    <section className={styles.section} data-testid="home-hero" id="home">
      <div className={`medical-container ${styles.grid}`}>
        <div className={styles.copy}>
          <Reveal>
            <p className="medical-eyebrow">{hero.eyebrow}</p>
            <h1
              aria-label="Family Doctors Now Accepting New Patients in Edmonton"
              className={`brand-h1 ${styles.title}`}
              data-testid="home-hero-title"
            >
              <span>Family Doctors</span>
              <span>Now Accepting</span>
              <span>New Patients</span>
              <span>in Edmonton</span>
            </h1>
            <p className={styles.intro}>{hero.description}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className={`medical-action-row ${styles.actions}`}>
              <MotionLink
                className="medical-button medical-button-primary"
                href={hero.primaryCtaHref}
              >
                {hero.primaryCtaLabel}
                <ArrowRight aria-hidden="true" size={17} strokeWidth={2.8} />
              </MotionLink>
              <MotionLink
                className="medical-button medical-button-secondary"
                href={hero.secondaryCtaHref}
              >
                {hero.secondaryCtaLabel}
              </MotionLink>
            </div>
          </Reveal>

          <StaggerGroup className={styles.trustGrid} data-testid="home-trust-stats">
            {hero.highlights.map((highlight) => (
              <StaggerItem className={styles.trustCard} key={highlight.value}>
                <strong>{highlight.value}</strong>
                <span>{highlight.label}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal className={styles.visual} delay={0.12} y={18}>
          <figure className={styles.media} data-testid="home-hero-media">
            <img
              alt={medicalImages.heroClinic.alt}
              className={styles.image}
              decoding="async"
              fetchPriority="high"
              loading="eager"
              src={medicalImages.heroClinic.src}
            />
            <figcaption className={styles.panel}>
              <span>
                <CalendarCheck aria-hidden="true" size={18} strokeWidth={2.5} />
                Registering now
              </span>
              <strong>No waitlist for new patient requests</strong>
              <a href={primaryClinicLocation.phoneHref}>
                <PhoneCall aria-hidden="true" size={17} strokeWidth={2.6} />
                {primaryClinicLocation.phone}
              </a>
            </figcaption>
          </figure>

          <div className={styles.location}>
            <MapPin aria-hidden="true" size={18} strokeWidth={2.5} />
            <span>Family medicine and walk-in clinic care across Edmonton</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
