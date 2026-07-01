import type { Metadata } from "next";
import RegistrationLeadForm from "../../components/forms/RegistrationLeadForm";
import JsonLd from "../../components/seo/JsonLd";
import ClinicLocationCards from "../../components/shared/ClinicLocationCards";
import {
  PageHero,
  PageSection,
  SectionHeader,
} from "../../components/shared/PageSystem";
import { clinicLocationList } from "../../lib/business/config";
import {
  buildBreadcrumbJsonLd,
  buildMedicalClinicJsonLd,
  buildWebPageJsonLd,
} from "../../lib/seo/schema";
import { buildPageMetadata } from "../../lib/seo/metadata";
import {
  corePages,
  primaryCtaLabel,
  secondaryCtaLabel,
  serviceRequestLinks,
} from "../../lib/sitePages";
import { contactPageVisual } from "../../lib/serviceHeroVisuals";

export const metadata: Metadata = buildPageMetadata(corePages.contact);

export default function ContactPage() {
  const page = corePages.contact;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact", href: page.path },
  ];

  return (
    <main className="medical-page">
      <JsonLd
        data={[
          buildMedicalClinicJsonLd(),
          buildWebPageJsonLd(page, breadcrumbs),
          buildBreadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <PageHero
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        primaryAction={{
          href: "/register/#patient-registration-form",
          label: primaryCtaLabel,
        }}
        secondaryAction={{
          href: serviceRequestLinks.call,
          label: secondaryCtaLabel,
          variant: "secondary",
        }}
        visual={contactPageVisual}
      />

      <PageSection>
        <SectionHeader
          eyebrow="Contact Clinics"
          heading="Call A Location Or Send A Registration Request"
          intro="Choose the clinic that works best for you, or use the registration form for new patient follow-up."
        />
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.15fr] xl:items-start">
          <ClinicLocationCards columns="one" locations={clinicLocationList} />
          <RegistrationLeadForm />
        </div>
      </PageSection>
    </main>
  );
}
