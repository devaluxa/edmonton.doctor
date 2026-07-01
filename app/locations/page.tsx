import type { Metadata } from "next";
import JsonLd from "../../components/seo/JsonLd";
import ClinicLocationCards from "../../components/shared/ClinicLocationCards";
import {
  CtaBand,
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

export const metadata: Metadata = buildPageMetadata(corePages.locations);

export default function LocationsPage() {
  const page = corePages.locations;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Locations", href: page.path },
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
          href: serviceRequestLinks.register,
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
          eyebrow="Clinic Locations"
          heading="Compare Edmonton Clinic Options"
          intro="Each location is shown with phone number, address, hours, and directions so patients can compare options quickly."
        />
        <ClinicLocationCards
          locations={clinicLocationList}
          showServiceArea
        />
      </PageSection>

      <PageSection tone="muted">
        <CtaBand
          eyebrow="Registration"
          heading="Choose The Location That Works For You"
          description="Register online or call your preferred clinic to ask about current availability and next steps."
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
