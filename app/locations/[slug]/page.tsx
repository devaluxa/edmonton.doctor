import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/seo/JsonLd";
import ClinicLocationCards from "../../../components/shared/ClinicLocationCards";
import {
  PageHero,
  PageSection,
  SectionHeader,
  InfoCardGrid,
  CtaBand,
} from "../../../components/shared/PageSystem";
import {
  clinicPages,
  getClinicPage,
  kingsleyPage,
} from "../../../lib/clinicPages";
import { buildPageMetadata } from "../../../lib/seo/metadata";
import {
  buildBreadcrumbJsonLd,
  buildMedicalClinicJsonLd,
  buildPhysicianJsonLd,
  buildWebPageJsonLd,
} from "../../../lib/seo/schema";
import { contactPageVisual } from "../../../lib/serviceHeroVisuals";

export const dynamicParams = false;
export function generateStaticParams() {
  return clinicPages.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getClinicPage((await params).slug);
  return page ? buildPageMetadata(page) : {};
}

export default async function ClinicPage({ params }: Props) {
  const page = getClinicPage((await params).slug);
  if (!page) notFound();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations/" },
    { label: page.heading, href: page.path },
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
        eyebrow={`Family care in ${page.area}`}
        heading={page.heading}
        intro={page.intro}
        visual={contactPageVisual}
        primaryAction={{
          href: page.registrationPath,
          label: "Request Registration",
        }}
        secondaryAction={{
          href: page.location.phoneHref,
          label: `Call ${page.location.phone}`,
        }}
      />
      <PageSection>
        <SectionHeader
          eyebrow="Plan your visit"
          heading={`Your clinic in ${page.area}`}
          intro={page.visit}
        />
        <ClinicLocationCards
          locations={[page.location]}
          columns="one"
          showServiceArea
        />
        <p className="medical-note">
          Confirm current hours, walk-in availability, parking, and
          accessibility arrangements directly with the clinic before travelling.
        </p>
      </PageSection>
      <PageSection tone="muted">
        <SectionHeader
          eyebrow="Meet the team"
          heading="Family physicians at this clinic"
          intro="Intake status can change. Contact the clinic to confirm availability; a registration request is not a confirmed appointment."
        />
        <InfoCardGrid
          columns="two"
          cards={page.doctors.map((doctor) => ({
            eyebrow: doctor.statusLabel,
            title: doctor.fullName || doctor.name,
            description: `${doctor.intro} Languages: ${doctor.languages.join(", ")}.`,
            href:
              doctor.slug === "dr-kingsley"
                ? kingsleyPage.path
                : doctor.profileUrl,
            actionLabel: "View physician profile",
          }))}
        />
      </PageSection>
      <PageSection>
        <SectionHeader
          eyebrow="Care options"
          heading="Choose the right next step"
          intro="For ongoing care, ask about family doctor registration. For a walk-in visit, call this clinic to confirm today's availability."
        />
        <InfoCardGrid
          columns="three"
          cards={[
            {
              title: "Family doctors",
              description:
                "Compare physicians and current new-patient options.",
              href: "/family-doctor/",
              actionLabel: "Compare doctors",
            },
            {
              title: "Family medicine",
              description:
                "Learn about preventive care, ongoing health concerns, and follow-up.",
              href: "/services/family-medicine-edmonton/",
              actionLabel: "Explore family medicine",
            },
            {
              title: "Walk-in clinic care",
              description:
                "Understand walk-in visits and how to confirm clinic access.",
              href: "/walk-in/",
              actionLabel: "Plan a walk-in visit",
            },
          ]}
        />
      </PageSection>
      <PageSection tone="muted">
        <CtaBand
          heading={`Contact ${page.heading}`}
          description="Send a registration request for this location or call the clinic to discuss availability and next steps."
          primaryAction={{
            href: page.registrationPath,
            label: "Request Registration",
          }}
          secondaryAction={{
            href: page.location.phoneHref,
            label: `Call ${page.location.phone}`,
          }}
        />
      </PageSection>
    </main>
  );
}
