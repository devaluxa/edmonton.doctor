import type { Metadata } from "next";
import JsonLd from "../../components/seo/JsonLd";
import ClinicLocationCards from "../../components/shared/ClinicLocationCards";
import {
  CtaBand,
  InfoCardGrid,
  PageHero,
  PageSection,
  SectionHeader,
  StepCards,
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
import { walkInPageVisual } from "../../lib/serviceHeroVisuals";

export const metadata: Metadata = buildPageMetadata(corePages.walkInClinic);

const commonVisitReasons = [
  {
    title: "Minor Illnesses",
    description:
      "Coughs, colds, sore throats, ear discomfort, urinary symptoms, rashes, and other non-emergency concerns that should be assessed sooner than a routine visit.",
  },
  {
    title: "Non\u2011Emergency Injuries",
    noWrapTitle: true,
    description:
      "Sprains, strains, minor cuts, skin concerns, and everyday injuries where a clinic visit can help determine the right next step.",
  },
  {
    title: "Prescription Discussions",
    description:
      "Patients can ask about medication renewals, simple follow-up needs, or whether a family doctor appointment is the better fit.",
  },
  {
    title: "Forms And Referrals",
    description:
      "Clinic teams can help patients understand whether a form, referral request, or follow-up concern is appropriate for a walk-in visit.",
  },
  {
    title: "Follow-Up Guidance",
    description:
      "If your symptoms change or you need clear next steps after a previous visit, a walk-in clinic may help route your care.",
  },
  {
    title: "Family Doctor Registration",
    description:
      "Patients looking for ongoing care can also use the registration path to request follow-up from participating Edmonton clinics.",
  },
];

const visitSteps = [
  {
    title: "Check Availability",
    description:
      "Call the location that works best for you before visiting, especially near the end of the day or during busy clinic periods.",
  },
  {
    title: "Bring Essentials",
    description:
      "Bring identification, your Alberta health card if available, and a current medication list so the clinic can support you efficiently.",
  },
  {
    title: "Get Clear Next Steps",
    description:
      "The clinic team will assess your concern and help with treatment, follow-up planning, referral guidance, or registration when appropriate.",
  },
];

export default function WalkInClinicPage() {
  const page = corePages.walkInClinic;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Walk-In Clinic", href: page.path },
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
        heading="Walk-In Clinic Care in Edmonton"
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
        visual={walkInPageVisual}
      />

      <PageSection>
        <SectionHeader
          eyebrow="Walk-In Details"
          heading="Current Clinic Contacts And Hours"
          intro="Walk-in availability can change during the day. Use the phone number for your preferred Edmonton clinic to confirm timing before you arrive."
        />
        <ClinicLocationCards locations={clinicLocationList} />
      </PageSection>

      <PageSection tone="muted">
        <SectionHeader
          align="center"
          eyebrow="Common Reasons To Visit"
          heading="Care For Timely, Non-Emergency Concerns"
          intro="Walk-in clinic visits are intended for concerns that need timely attention but are not medical emergencies. For severe symptoms or immediate danger, call 911 or visit an emergency department."
        />
        <InfoCardGrid cards={commonVisitReasons} columns="three" compact />
      </PageSection>

      <PageSection>
        <SectionHeader
          align="center"
          eyebrow="Before You Visit"
          heading="How Walk-In Visits Work"
          intro="A quick call and a few essentials can make your visit smoother. Clinic teams can also help you understand whether registration for ongoing family medicine is the right next step."
        />
        <StepCards steps={visitSteps} />
      </PageSection>

      <PageSection tone="muted">
        <CtaBand
          eyebrow="Register Or Call"
          heading="Need A Family Doctor Too?"
          description="Participating locations welcome walk-in patients, and patients looking for ongoing care can also request new patient registration through Edmonton Doctors."
          primaryAction={{
            href: serviceRequestLinks.register,
            label: primaryCtaLabel,
          }}
          secondaryAction={{
            href: serviceRequestLinks.call,
            label: secondaryCtaLabel,
            variant: "secondary",
          }}
          note="This website is not for emergencies. For chest pain, trouble breathing, stroke symptoms, severe injury, or immediate danger, call 911 or go to the nearest emergency department."
        />
      </PageSection>
    </main>
  );
}
