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
  ChecklistGrid,
  ComparisonGrid,
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
  const detailSections = richContent?.detailSections || [];
  const visitSteps = richContent?.visitSteps || [];
  const bookingReasons = richContent?.bookingReasons || [];
  const helpfulLinks = richContent?.helpfulLinks || [];
  const serviceSection = richContent?.serviceSection || {
    eyebrow: "Women's Health Services",
    heading: "Beverly And Balwin Women's Health Services",
    intro:
      "From Pap tests and contraception conversations to menopause support and STI testing, these visits are handled with clear explanations, privacy, and practical next steps for patients in North Edmonton and Northeast Edmonton.",
  };
  const detailSection = richContent?.detailSection || {
    eyebrow: "Care Details",
    heading: "Women's Health Visits Patients Commonly Book",
    intro:
      "These visits can be preventive, symptom-based, or part of ongoing family medicine care. Your provider can help decide what testing, treatment, follow-up, or referral makes sense.",
  };
  const visitSection = richContent?.visitSection || {
    eyebrow: "What To Expect",
    heading: "What To Expect At Your Visit",
    intro:
      "You do not need to know the exact medical label before booking. Start with the concern, and the clinic team can help route the visit.",
  };
  const bookingSection = richContent?.bookingSection || {
    eyebrow: "When To Book",
    heading: "Reasons Patients Book Women's Health Visits",
    intro:
      "Book if you are due for screening, have a new concern, want contraception advice, or need a confidential conversation about reproductive or hormone-related health.",
  };
  const helpfulLinksSection = richContent?.helpfulLinksSection || {
    eyebrow: "Helpful Next Steps",
    heading: "Choose The Path That Fits Your Visit",
    intro:
      "Use these pages if you are ready to book, want to compare doctors, or need clinic access for a timely non-emergency concern.",
    columns: "four" as const,
  };
  const faqSection = richContent?.faqSection || {
    eyebrow: "Patient Questions",
    heading: "Women's Health FAQ",
    intro:
      "Short answers to common questions about screening, contraception, prenatal counselling, symptoms, and confidential care.",
  };
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
              eyebrow={serviceSection.eyebrow}
              heading={serviceSection.heading}
              intro={serviceSection.intro}
            />
            <InfoCardGrid
              cards={richContent.serviceCards.map((service) => ({
                title: service.title,
                description: service.description,
              }))}
              columns="three"
            />
          </PageSection>

          {detailSections.length > 0 ? (
            <PageSection tone="muted">
              <SectionHeader
                eyebrow={detailSection.eyebrow}
                heading={detailSection.heading}
                intro={detailSection.intro}
              />
              <InfoCardGrid
                cards={detailSections.map((section) => ({
                  title: section.title,
                  description: section.description,
                }))}
                columns="two"
              />
            </PageSection>
          ) : null}

          {richContent.listSection ? (
            <PageSection tone="muted">
              <SectionHeader
                eyebrow={richContent.listSection.eyebrow}
                heading={richContent.listSection.heading}
                intro={richContent.listSection.intro}
              />
              <ChecklistGrid
                columns={richContent.listSection.columns}
                items={richContent.listSection.items}
              />
            </PageSection>
          ) : null}

          {richContent.localSection ? (
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
          ) : null}

          {visitSteps.length > 0 ? (
            <PageSection tone="muted">
              <SectionHeader
                eyebrow={visitSection.eyebrow}
                heading={visitSection.heading}
                intro={visitSection.intro}
              />
              <StepCards steps={visitSteps} />
            </PageSection>
          ) : null}

          {bookingReasons.length > 0 ? (
            <PageSection>
              <SectionHeader
                eyebrow={bookingSection.eyebrow}
                heading={bookingSection.heading}
                intro={bookingSection.intro}
              />
              <InfoCardGrid
                cards={bookingReasons.map((reason) => ({
                  title: reason.title,
                  description: reason.description,
                }))}
                columns="three"
              />
            </PageSection>
          ) : null}

          {richContent.comparisonSection ? (
            <PageSection tone="muted">
              <SectionHeader
                eyebrow={richContent.comparisonSection.eyebrow}
                heading={richContent.comparisonSection.heading}
                intro={richContent.comparisonSection.intro}
              />
              <ComparisonGrid groups={richContent.comparisonSection.groups} />
              {richContent.comparisonSection.note ? (
                <div className="medical-note">
                  {richContent.comparisonSection.note}
                </div>
              ) : null}
            </PageSection>
          ) : null}

          {helpfulLinks.length > 0 ? (
            <PageSection>
              <SectionHeader
                eyebrow={helpfulLinksSection.eyebrow}
                heading={helpfulLinksSection.heading}
                intro={helpfulLinksSection.intro}
              />
              <InfoCardGrid
                cards={helpfulLinks.map((link) => ({
                  title: link.title,
                  description: link.description,
                  href: link.href,
                  actionLabel: "View service",
                }))}
                columns={helpfulLinksSection.columns}
              />
            </PageSection>
          ) : null}

          <PageSection tone="muted">
            <SectionHeader
              eyebrow={faqSection.eyebrow}
              heading={faqSection.heading}
              intro={faqSection.intro}
            />
            <InfoCardGrid
              cards={richContent.faqs.map((faq) => ({
                title: faq.question,
                description: faq.answer,
              }))}
              columns="two"
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
