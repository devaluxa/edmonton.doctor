import { medicalImages, type SiteImage } from "./business/config";

export type ServiceItem = {
  code?: string;
  name: string;
  summary: string;
  details?: string;
  href?: string;
  tags: string[];
  image?: SiteImage;
};

export type FeaturedServiceItem = ServiceItem & {
  image: SiteImage;
};

export type ServiceSection = {
  title: string;
  slug: string;
  items: ServiceItem[];
};

export const featuredServiceItems: FeaturedServiceItem[] = [
  {
    code: "01",
    name: "Family Doctors Accepting Patients",
    summary:
      "Register for ongoing family medicine with doctors welcoming new patients in Edmonton.",
    details:
      "Best for patients who want long-term primary care, prevention, and a consistent family doctor relationship.",
    href: "/family-doctor/",
    tags: ["New patients", "Family care", "No waitlist"],
    image: medicalImages.doctorConsultation,
  },
  {
    code: "02",
    name: "Walk-In Clinic Care",
    summary:
      "Participating Edmonton clinics offer timely support for non-emergency medical concerns.",
    details:
      "Best for patients looking for practical clinic access, current hours, and location phone numbers.",
    href: "/walk-in/",
    tags: ["Walk-ins", "Timely care", "Edmonton"],
    image: medicalImages.clinicReception,
  },
  {
    code: "03",
    name: "New Patient Registration",
    summary:
      "Send a minimal registration request so the clinic team can confirm availability and next steps.",
    details:
      "Best for individuals and households ready to register with Edmonton Doctors.",
    href: "/register/",
    tags: ["Register online", "Households", "Follow-up"],
    image: medicalImages.heroClinic,
  },
];

export const serviceSections: ServiceSection[] = [
  {
    title: "Family Medicine",
    slug: "family-medicine",
    items: [
      {
        code: "F1",
        name: "Ongoing Family Doctor Care",
        summary:
          "Long-term primary care for children, adults, seniors, and families.",
        href: "/services/family-medicine/",
        tags: ["Family doctor", "Long-term care", "Prevention"],
      },
      {
        code: "F2",
        name: "New Patient Registration",
        summary:
          "Minimal registration requests for individuals and households looking for a doctor.",
        href: "/services/new-patient-registration/",
        tags: ["Registration", "No waitlist", "Households"],
      },
      {
        code: "F3",
        name: "Women, Men, And Children's Health",
        summary:
          "Primary care support for patients and families across life stages.",
        href: "/services/womens-mens-childrens-health/",
        tags: ["Children", "Adults", "Seniors"],
      },
    ],
  },
  {
    title: "Clinic Visits And Preventative Care",
    slug: "clinic-visits-prevention",
    items: [
      {
        code: "C1",
        name: "General Checkups And Physical Exams",
        summary:
          "Routine visits for health review, screening discussions, and risk checks.",
        href: "/services/checkups-physicals/",
        tags: ["Checkups", "Physicals", "Screening"],
      },
      {
        code: "C2",
        name: "Vaccinations And Preventative Care",
        summary:
          "Preventative health support, vaccination discussions, and follow-up planning.",
        href: "/services/vaccinations-preventative-care/",
        tags: ["Vaccines", "Prevention", "Planning"],
      },
      {
        code: "C3",
        name: "Walk-In Care",
        summary:
          "Clinic access for timely non-emergency concerns at participating locations.",
        href: "/services/walk-in-care/",
        tags: ["Walk-ins", "Clinic visits", "Availability"],
      },
    ],
  },
  {
    title: "Ongoing Health Support",
    slug: "ongoing-health-support",
    items: [
      {
        code: "O1",
        name: "Chronic Disease Management",
        summary:
          "Follow-up support for blood pressure, cholesterol, blood sugars, and long-term conditions.",
        href: "/services/chronic-disease-management/",
        tags: ["Blood pressure", "Risk", "Follow-up"],
      },
      {
        code: "O2",
        name: "Acute Illness And Injury Treatment",
        summary:
          "Assessment and next steps for non-emergency illness and minor injury concerns.",
        href: "/services/acute-illness-injury-treatment/",
        tags: ["Illness", "Injury", "Non-emergency"],
      },
      {
        code: "O3",
        name: "Mental Health Support",
        summary:
          "Family medicine support for mood, stress, anxiety, and follow-up planning.",
        href: "/services/mental-health-support/",
        tags: ["Mental health", "Planning", "Support"],
      },
    ],
  },
];

export const totalServiceItems = serviceSections.reduce(
  (total, section) => total + section.items.length,
  0,
);
