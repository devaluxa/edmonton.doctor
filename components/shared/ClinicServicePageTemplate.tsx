import JsonLd from "../seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
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
  StepCards,
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
  const richContent = page.richContent;
  const ctaLabel = page.primaryCtaLabel || primaryCtaLabel;
  const structuredData = [
    buildMedicalClinicJsonLd(),
    buildWebPageJsonLd(page, breadcrumbs),
    buildMedicalServiceJsonLd(page),
    buildBreadcrumbJsonLd(breadcrumbs),
    richContent ? buildFaqPageJsonLd(richContent.faqs) : null,
  ].filter((item): item is Record<string, unknown> => Boolean(item));

  return (
    <main className="medical-page">
      <JsonLd data={structuredData} />
      <PageHero
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        primaryAction={{
          href: serviceRequestLinks.register,
          label: ctaLabel,
        }}
        secondaryAction={{
          href: serviceRequestLinks.call,
          label: secondaryCtaLabel,
          variant: "secondary",
        }}
        visual={heroVisual}
        imageShape={page.heroImageShape}
      />

      {richContent ? (
        <>
          <PageSection>
            <SectionHeader
              eyebrow="Women's Health Services"
              heading="Beverly And Balwin Women's Health Services"
              intro="From Pap tests and contraception conversations to menopause support and STI testing, these visits are handled with clear explanations, privacy, and practical next steps for patients in North Edmonton and Northeast Edmonton."
            />
            <InfoCardGrid
              cards={richContent.serviceCards.map((service) => ({
                title: service.title,
                description: service.description,
              }))}
              columns="three"
            />
          </PageSection>

          <PageSection tone="muted">
            <SectionHeader
              eyebrow="Care Details"
              heading="Women's Health Visits Patients Commonly Book"
              intro="These visits can be preventive, symptom-based, or part of ongoing family medicine care. Your provider can help decide what testing, treatment, follow-up, or referral makes sense."
            />
            <InfoCardGrid
              cards={richContent.detailSections.map((section) => ({
                title: section.title,
                description: section.description,
              }))}
              columns="two"
            />
          </PageSection>

          <PageSection>
            <SectionHeader
              eyebrow={richContent.localSection.eyebrow}
              heading={richContent.localSection.heading}
              intro={richContent.localSection.intro}
            />
            <InfoCardGrid
              cards={richContent.localSection.communities.map((community) => ({
                title: community,
              }))}
              columns="four"
              compact
            />
          </PageSection>

          <PageSection tone="muted">
            <SectionHeader
              eyebrow="What To Expect"
              heading="What To Expect At Your Visit"
              intro="You do not need to know the exact medical label before booking. Start with the concern, and the clinic team can help route the visit."
            />
            <StepCards steps={richContent.visitSteps} />
          </PageSection>

          <PageSection>
            <SectionHeader
              eyebrow="When To Book"
              heading="Reasons Patients Book Women's Health Visits"
              intro="Book if you are due for screening, have a new concern, want contraception advice, or need a confidential conversation about reproductive or hormone-related health."
            />
            <InfoCardGrid
              cards={richContent.bookingReasons.map((reason) => ({
                title: reason.title,
                description: reason.description,
              }))}
              columns="three"
            />
          </PageSection>

          <PageSection tone="muted">
            <SectionHeader
              eyebrow="Patient Questions"
              heading="Women's Health FAQ"
              intro="Short answers to common questions about screening, contraception, prenatal counselling, symptoms, and confidential care."
            />
            <InfoCardGrid
              cards={richContent.faqs.map((faq) => ({
                title: faq.question,
                description: faq.answer,
              }))}
              columns="two"
            />
          </PageSection>

          <PageSection>
            <SectionHeader
              eyebrow="Helpful Next Steps"
              heading="Choose The Path That Fits Your Visit"
              intro="Use these pages if you are ready to book, want to compare doctors, or need clinic access for a timely non-emergency concern."
            />
            <InfoCardGrid
              cards={richContent.helpfulLinks.map((link) => ({
                title: link.title,
                description: link.description,
                href: link.href,
                actionLabel: "View page",
              }))}
              columns="four"
            />
          </PageSection>

          <PageSection tone="muted">
            <CtaBand
              eyebrow={richContent.finalCta.eyebrow}
              heading={richContent.finalCta.heading}
              description={richContent.finalCta.description}
              primaryAction={{
                href: serviceRequestLinks.register,
                label: ctaLabel,
              }}
              secondaryAction={{
                href: serviceRequestLinks.call,
                label: secondaryCtaLabel,
                variant: "secondary",
              }}
            />
          </PageSection>
        </>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}
