import type { Metadata } from "next";
import JsonLd from "../../components/seo/JsonLd";
import FaqList from "../../components/shared/FaqList";
import {
  CtaBand,
  PageHero,
  PageSection,
  SectionHeader,
} from "../../components/shared/PageSystem";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildMedicalClinicJsonLd,
  buildWebPageJsonLd,
} from "../../lib/seo/schema";
import { buildPageMetadata } from "../../lib/seo/metadata";
import {
  corePages,
  faqItems,
  primaryCtaLabel,
  secondaryCtaLabel,
  serviceRequestLinks,
} from "../../lib/sitePages";
import { faqPageVisual } from "../../lib/serviceHeroVisuals";

export const metadata: Metadata = buildPageMetadata(corePages.faq);

export default function FaqPage() {
  const page = corePages.faq;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "FAQ", href: page.path },
  ];

  return (
    <main className="medical-page">
      <JsonLd
        data={[
          buildMedicalClinicJsonLd(),
          buildWebPageJsonLd(page, breadcrumbs),
          buildBreadcrumbJsonLd(breadcrumbs),
          buildFaqPageJsonLd(),
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
        visual={faqPageVisual}
      />

      <PageSection>
        <SectionHeader
          eyebrow="Patient FAQ"
          heading="Registration And Clinic Visit Questions"
          intro="Practical answers about registration, walk-in availability, family doctors, and what to do in an emergency."
        />
        <div className="max-w-4xl">
          <FaqList items={faqItems} />
        </div>
      </PageSection>

      <PageSection tone="muted">
        <CtaBand
          eyebrow="Contact"
          heading="Still Have A Question?"
          description="Call a participating clinic or send a registration request so the team can follow up."
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
