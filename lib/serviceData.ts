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
    slug: "family-medicine-edmonton",
    items: [
      {
        code: "F1",
        name: "Ongoing Family Doctor Care",
        summary:
          "Long-term primary care for children, adults, seniors, and families.",
        href: "/services/family-medicine-edmonton/",
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
    ],
  },
  {
    title: "Clinic Visits And Preventive Care",
    slug: "clinic-visits-prevention",
    items: [
      {
        code: "C1",
        name: "Checkups & Physical Exams",
        summary:
          "Routine visits for health review, screening discussions, and risk checks.",
        href: "/services/checkups-physicals/",
        tags: ["Checkups", "Physicals", "Screening"],
      },
      {
        code: "C2",
        name: "Vaccinations & Preventive Care",
        summary:
          "Preventive health support, vaccination discussions, and follow-up planning.",
        href: "/services/vaccinations-preventative-care/",
        tags: ["Vaccines", "Prevention", "Planning"],
      },
      {
        code: "C3",
        name: "Walk-In Clinic",
        summary:
          "Clinic access for timely non-emergency concerns at participating locations.",
        href: "/walk-in/",
        tags: ["Walk-ins", "Clinic visits", "Availability"],
      },
      {
        code: "C4",
        name: "Acute Illness & Injury",
        summary:
          "Assessment and next steps for non-emergency illness and minor injury concerns.",
        href: "/services/acute-illness-injury-treatment/",
        tags: ["Illness", "Injury", "Non-emergency"],
      },
      {
        code: "C5",
        name: "Prescription Renewals",
        summary:
          "Medication renewal discussions, follow-up planning, and prescription review visits.",
        href: "/services/prescription-renewals/",
        tags: ["Medications", "Renewals", "Follow-up"],
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
        name: "Mental Health Support",
        summary:
          "Family medicine support for mood, stress, anxiety, and follow-up planning.",
        href: "/services/mental-health-support/",
        tags: ["Mental health", "Planning", "Support"],
      },
    ],
  },
  {
    title: "Women's Health",
    slug: "womens-health",
    items: [
      {
        code: "W1",
        name: "Women's Health",
        summary:
          "Pap tests, contraception counselling, prenatal support, hormone concerns, STI testing, and menopause care.",
        href: "/services/womens-health-edmonton/",
        tags: ["Pap tests", "Contraception", "Menopause"],
      },
      {
        code: "W2",
        name: "Pap Tests & Cervical Screening",
        summary:
          "Preventive cervical screening and Pap test discussions for eligible patients.",
        href: "/services/pap-tests-cervical-screening/",
        tags: ["Pap tests", "Screening", "Prevention"],
      },
      {
        code: "W3",
        name: "Birth Control & Contraception",
        summary:
          "Confidential contraception counselling and birth control option discussions.",
        href: "/services/birth-control-contraception/",
        tags: ["Birth control", "Contraception", "Counselling"],
      },
      {
        code: "W4",
        name: "Prenatal Counselling",
        summary:
          "Pregnancy planning, early pregnancy questions, medication review, and referral guidance.",
        href: "/services/prenatal-counselling/",
        tags: ["Prenatal", "Pregnancy", "Planning"],
      },
      {
        code: "W5",
        name: "STI Testing",
        summary:
          "Confidential sexual health visits for STI testing questions, symptoms, and follow-up planning.",
        href: "/services/sti-testing/",
        tags: ["STI testing", "Sexual health", "Confidential"],
      },
    ],
  },
];

export const totalServiceItems = serviceSections.reduce(
  (total, section) => total + section.items.length,
  0,
);
