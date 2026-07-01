import JsonLd from "../seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildMedicalClinicJsonLd,
  buildMedicalServiceJsonLd,
  buildWebPageJsonLd,
} from "../../lib/seo/schema";
import {
  getRelatedClinicServicePages,
  primaryCtaLabel,
  secondaryCtaLabel,
  serviceBreadcrumbs,
  serviceRequestLinks,
  type ClinicServicePage,
} from "../../lib/sitePages";
import { getServiceHeroVisual } from "../../lib/serviceHeroVisuals";
import {
  CtaBand,
  InfoCardGrid,
  PageHero,
  PageSection,
  SectionHeader,
} from "./PageSystem";

type ClinicServicePageTemplateProps = {
  page: ClinicServicePage;
};

export default function ClinicServicePageTemplate({
  page,
}: ClinicServicePageTemplateProps) {
  const breadcrumbs = serviceBreadcrumbs(page);
  const relatedPages = getRelatedClinicServicePages(page);
  const heroVisual = getServiceHeroVisual(page);

  return (
    <main className="medical-page">
      <JsonLd
        data={[
          buildMedicalClinicJsonLd(),
          buildWebPageJsonLd(page, breadcrumbs),
          buildMedicalServiceJsonLd(page),
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
        visual={heroVisual}
      />

      <PageSection>
        <SectionHeader
          eyebrow="Patient Needs"
          heading={`${page.serviceType} Support`}
          intro={page.intro}
        />
        <InfoCardGrid
          cards={page.patientNeeds.map((need) => ({
            title: need,
          }))}
          columns="three"
          compact
        />
      </PageSection>

      <PageSection tone="muted">
        <SectionHeader
          align="center"
          eyebrow="Why Patients Choose Edmonton Doctors"
          heading="Accessible, Clear, And Patient-Centered"
        />
        <InfoCardGrid
          cards={page.highlights.map((highlight) => ({
            title: highlight,
          }))}
          columns="three"
          compact
        />
      </PageSection>

      {relatedPages.length > 0 ? (
        <PageSection>
          <SectionHeader
            eyebrow="Related Services"
            heading="More Primary Care Pages"
            intro="Explore nearby care pages and choose the registration or clinic path that fits your needs."
          />
          <InfoCardGrid
            cards={relatedPages.map((related) => ({
              title: related.eyebrow,
              description: related.description,
              href: related.path,
              actionLabel: "View service",
            }))}
            columns="three"
          />
        </PageSection>
      ) : null}

      <PageSection tone="muted">
        <CtaBand
          eyebrow="Register Or Call"
          heading={`Need Help With ${page.serviceType}?`}
          description="Register online or call a participating Edmonton clinic to ask about availability, next steps, and location details."
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
