/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import JsonLd from "../../components/seo/JsonLd";
import {
  CtaBand,
  PageHero,
  PageSection,
  SectionHeader,
  StepCards,
} from "../../components/shared/PageSystem";
import {
  clinicLocationList,
  doctorProfiles,
  type DoctorProfile,
} from "../../lib/business/config";
import {
  buildBreadcrumbJsonLd,
  buildMedicalClinicJsonLd,
  buildPhysicianJsonLd,
  buildWebPageJsonLd,
} from "../../lib/seo/schema";
import { buildPageMetadata } from "../../lib/seo/metadata";
import {
  corePages,
  primaryCtaLabel,
  secondaryCtaLabel,
  serviceRequestLinks,
} from "../../lib/sitePages";
import { doctorPageVisual } from "../../lib/serviceHeroVisuals";
import styles from "./FamilyDoctorPage.module.css";
import { clinicPath } from "../../lib/clinicPages";

export const metadata: Metadata = buildPageMetadata(corePages.familyDoctors);

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function doctorAction(doctor: DoctorProfile) {
  const clinic = clinicLocationList.find(
    (location) => location.id === doctor.locationId,
  );

  if (!clinic) {
    return null;
  }

  return {
    href: clinic.bookingHref,
    label: "Book Appointment",
  };
}

function DoctorCard({
  doctor,
  index,
}: {
  doctor: DoctorProfile;
  index: number;
}) {
  const action = doctorAction(doctor);
  const clinic = clinicLocationList.find(
    (entry) => entry.id === doctor.locationId,
  );
  const isUnavailable = doctor.status === "not-accepting";
  const visibleFocusAreas = doctor.focusAreas.slice(0, 5);
  const isReversed = index % 2 === 1;
  const image = doctor.image;

  return (
    <article
      className={`${styles.doctorCard} ${isReversed ? styles.reverse : ""}`}
      data-layout={isReversed ? "image-right" : "image-left"}
      data-location={doctor.locationId}
      data-testid="doctor-card"
      data-status={doctor.status}
    >
      <div
        aria-label={image ? undefined : `${doctor.name} image placeholder`}
        className={styles.portrait}
        data-testid="doctor-media"
      >
        {image ? (
          <img
            alt={image.alt}
            className={styles.image}
            data-testid="doctor-image"
            decoding="async"
            loading="eager"
            src={image.src}
          />
        ) : (
          <span aria-hidden="true" data-testid="doctor-placeholder">
            {initials(doctor.name)}
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.metaRow}>
          <span
            className={`${styles.statusBadge} ${
              isUnavailable ? styles.statusMuted : ""
            }`}
          >
            {doctor.statusLabel}
          </span>
        </div>
        <h3 className={styles.name}>{doctor.name}</h3>
        <p className={styles.title}>{doctor.title}</p>
        {clinic ? (
          <p className={styles.languages}>
            <a href={clinicPath(clinic.id)}>{clinic.name}</a>
            <br />
            {clinic.addressLines.join(", ")}
          </p>
        ) : null}
        <p className={styles.intro}>{doctor.intro}</p>

        <div className={styles.chips} aria-label={`${doctor.name} focus areas`}>
          {visibleFocusAreas.map((area) => (
            <span className={styles.chip} key={area}>
              {area}
            </span>
          ))}
        </div>

        <p className={styles.languages}>
          Languages: {doctor.languages.join(", ")}
        </p>

        {action ? (
          <div className={styles.actions}>
            <a
              className="medical-button medical-button-primary"
              href={action.href}
              rel="noreferrer"
              target="_blank"
            >
              {action.label}
            </a>
            {doctor.profileUrl ? (
              <a
                className="medical-button medical-button-secondary"
                href={doctor.profileUrl}
                rel={
                  doctor.profileUrl.startsWith("https://")
                    ? "noreferrer"
                    : undefined
                }
                target={
                  doctor.profileUrl.startsWith("https://")
                    ? "_blank"
                    : undefined
                }
              >
                View Profile
              </a>
            ) : null}
          </div>
        ) : (
          <p className={styles.unavailableNote}>
            This doctor is not currently accepting new patients. You can still
            compare other available physicians on this page.
          </p>
        )}
      </div>
    </article>
  );
}

export default function FamilyDoctorPage() {
  const page = corePages.familyDoctors;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Family Doctors", href: page.path },
  ];

  return (
    <main className="medical-page">
      <JsonLd
        data={[
          buildMedicalClinicJsonLd(),
          buildPhysicianJsonLd(),
          buildWebPageJsonLd(page, breadcrumbs),
          buildBreadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <PageHero
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        primaryAction={{
          href: serviceRequestLinks.register,
          label: primaryCtaLabel,
        }}
        secondaryAction={{
          href: serviceRequestLinks.call,
          label: secondaryCtaLabel,
          variant: "secondary",
        }}
        visual={doctorPageVisual}
      />

      <PageSection>
        <SectionHeader
          eyebrow="Meet The Doctors"
          heading="Choose A Family Physician"
          intro="Review doctors by clinic, availability, care interests, and languages before you register or contact a clinic."
        />
        <div className={styles.doctorList} data-testid="doctor-list">
          {doctorProfiles.map((doctor, index) => (
            <DoctorCard doctor={doctor} index={index} key={doctor.slug} />
          ))}
        </div>
      </PageSection>

      <PageSection tone="muted">
        <SectionHeader
          eyebrow="Becoming a patient"
          heading="How to register with a family doctor"
          intro="Doctor availability can change. Confirm the current intake status with your chosen clinic before planning a visit."
        />
        <StepCards
          steps={[
            {
              title: "Choose a doctor and clinic",
              description:
                "Compare intake status, languages, care interests, and the location that fits your routine.",
            },
            {
              title: "Request registration",
              description:
                "Send your contact and scheduling details. Keep detailed medical information off the initial form.",
            },
            {
              title: "Confirm the next step",
              description:
                "The clinic team follows up about availability and appointment arrangements. A request is not a confirmed booking.",
            },
          ]}
        />
      </PageSection>

      <PageSection>
        <CtaBand
          eyebrow="Registration"
          heading="Ready To Register With A Family Doctor?"
          description="Request registration with your preferred doctor or contact the appropriate clinic to confirm current availability."
          primaryAction={{
            href: serviceRequestLinks.register,
            label: primaryCtaLabel,
          }}
          secondaryAction={{
            href: serviceRequestLinks.call,
            label: secondaryCtaLabel,
            variant: "secondary",
          }}
        />
      </PageSection>
    </main>
  );
}
