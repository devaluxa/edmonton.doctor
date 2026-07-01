import type { Metadata } from "next";
import JsonLd from "../../components/seo/JsonLd";
import {
  CtaBand,
  InfoCardGrid,
  PageHero,
  PageSection,
  SectionHeader,
} from "../../components/shared/PageSystem";
import {
  buildBreadcrumbJsonLd,
  buildMedicalClinicJsonLd,
  buildWebPageJsonLd,
} from "../../lib/seo/schema";
import { buildPageMetadata } from "../../lib/seo/metadata";
import {
  clinicServicePages,
  corePages,
  primaryCtaLabel,
  secondaryCtaLabel,
  serviceRequestLinks,
} from "../../lib/sitePages";
import { servicesIndexVisual } from "../../lib/serviceHeroVisuals";

export const metadata: Metadata = buildPageMetadata(corePages.services);

export default function ServicesPage() {
  const page = corePages.services;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: page.path },
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
        visual={servicesIndexVisual}
      />

      <PageSection>
        <SectionHeader
          eyebrow="Clinic Services"
          heading="Choose A Care Page"
          intro="Browse family medicine, walk-in care, preventative health, acute care, and follow-up services in one clean service directory."
        />
        <InfoCardGrid
          cards={clinicServicePages.map((servicePage) => ({
            title: servicePage.heading,
            description: servicePage.description,
            href: servicePage.path,
            actionLabel: "Learn more",
          }))}
          columns="three"
        />
      </PageSection>

      <PageSection tone="muted">
        <CtaBand
          eyebrow="Registration"
          heading="Ready To Register With Edmonton Doctors?"
          description="Send a minimal registration request or call the preferred clinic location for current availability."
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
