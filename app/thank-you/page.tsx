import type { Metadata } from "next";
import { businessLocation } from "../../lib/business/config";
import { buildPageMetadata } from "../../lib/seo/metadata";
import { corePages, serviceRequestLinks } from "../../lib/sitePages";
import {
  CtaBand,
  PageHero,
  PageSection,
  SectionHeader,
  StepCards,
} from "../../components/shared/PageSystem";
import { registrationPageVisual } from "../../lib/serviceHeroVisuals";

export const metadata: Metadata = buildPageMetadata(corePages.thankYou);

const nextSteps = [
  {
    title: "Watch For A Reply",
    description:
      "The clinic team will review your registration details and follow up with next steps.",
  },
  {
    title: "Need Timely Help?",
    description:
      "Call the preferred clinic location if your question needs faster attention.",
  },
  {
    title: "Emergency Symptoms",
    description:
      "For emergency symptoms or immediate danger, call 911 or go to the nearest emergency department.",
  },
];

export default function ThankYouPage() {
  const page = corePages.thankYou;

  return (
    <main className="medical-page">
      <PageHero
        eyebrow={page.eyebrow}
        heading={page.heading}
        intro={page.intro}
        primaryAction={{
          href: serviceRequestLinks.call,
          label: `Call ${businessLocation.phone}`,
        }}
        secondaryAction={{
          href: "/services/",
          label: "View Services",
          variant: "secondary",
        }}
        visual={registrationPageVisual}
      />

      <PageSection>
        <SectionHeader
          eyebrow="Next Steps"
          heading="What Happens Next"
          intro="The clinic team will review your request and follow up. Use the phone number below if your question needs faster attention."
        />
        <StepCards steps={nextSteps} />
      </PageSection>

      <PageSection tone="muted">
        <CtaBand
          eyebrow="Primary Clinic"
          heading={businessLocation.name}
          description={businessLocation.addressLines.join(", ")}
          primaryAction={{
            href: businessLocation.phoneHref,
            label: `Call ${businessLocation.phone}`,
          }}
          secondaryAction={{
            href: "/",
            label: "Back To Home",
            variant: "secondary",
          }}
        />
      </PageSection>
    </main>
  );
}
