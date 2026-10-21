import type { Metadata } from "next";
import JsonLd from "../../../components/seo/JsonLd";
import {
  PageHero,
  PageSection,
  SectionHeader,
  ChecklistGrid,
  CtaBand,
} from "../../../components/shared/PageSystem";
import {
  clinicLocationList,
  doctorProfiles,
} from "../../../lib/business/config";
import { clinicPath, kingsleyPage } from "../../../lib/clinicPages";
import { buildPageMetadata } from "../../../lib/seo/metadata";
import {
  buildBreadcrumbJsonLd,
  buildMedicalClinicJsonLd,
  buildPhysicianJsonLd,
  buildWebPageJsonLd,
} from "../../../lib/seo/schema";

export const metadata: Metadata = buildPageMetadata(kingsleyPage);

export default function KingsleyProfile() {
  const doctor = doctorProfiles.find((entry) => entry.slug === "dr-kingsley")!;
  const clinic = clinicLocationList.find(
    (entry) => entry.id === doctor.locationId,
  )!;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Family Doctors", href: "/family-doctor/" },
    { label: doctor.fullName!, href: kingsleyPage.path },
  ];
  return (
    <main className="medical-page">
      <JsonLd
        data={[
          buildMedicalClinicJsonLd(),
          buildPhysicianJsonLd(),
          buildWebPageJsonLd(kingsleyPage, breadcrumbs),
          buildBreadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <PageHero
        eyebrow="Family physician in Edmonton"
        heading={doctor.fullName}
        intro={doctor.intro}
        visual={{ ...doctor.image!, label: doctor.fullName! }}
        imageShape="square"
        imagePosition="center top"
        primaryAction={{
          href: "/register-bev/",
          label: "Request Registration",
        }}
        secondaryAction={{
          href: clinic.phoneHref,
          label: `Call ${clinic.phone}`,
        }}
      />
      <PageSection>
        <SectionHeader
          eyebrow="About your doctor"
          heading="Meet Dr. Kingsley Lasing"
        />
        {doctor.biography.map((paragraph) => (
          <p className="medical-section-intro mb-5" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <p className="medical-note">
          Languages: {doctor.languages.join(", ")}. {doctor.statusLabel}.
          Confirm current availability directly with the clinic.
        </p>
      </PageSection>
      <PageSection tone="muted">
        <SectionHeader
          eyebrow="Care interests"
          heading="Family medicine and ongoing care"
        />
        <ChecklistGrid items={doctor.focusAreas} />
      </PageSection>
      <PageSection>
        <SectionHeader
          eyebrow="Clinic location"
          heading={clinic.name}
          intro={`${clinic.addressLines.join(", ")}. Call ${clinic.phone} to confirm hours, registration, and appointment arrangements.`}
        />
        <a
          className="medical-button medical-button-secondary"
          href={clinicPath(clinic.id)}
        >
          View clinic details and directions
        </a>
      </PageSection>
      <PageSection tone="muted">
        <CtaBand
          heading="Request a family doctor in Edmonton"
          description="Choose Dr. Kingsley on the registration form and send your contact details. The clinic team will follow up about the next step; submitting a request does not confirm an appointment."
          primaryAction={{
            href: "/register-bev/",
            label: "Request Registration",
          }}
          secondaryAction={{
            href: "/family-doctor/",
            label: "Compare Family Doctors",
          }}
        />
      </PageSection>
    </main>
  );
}
