import { businessConfig, businessLocation } from "./business/config";

// TODO: replace with the production domain before launch.
export const siteUrl = "https://placeholder.edmontondoctors.local";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type SeoConfig = {
  path: string;
  title: string;
  description: string;
  noIndex?: boolean;
};

export type SitePage = SeoConfig & {
  eyebrow: string;
  heading: string;
  intro: string;
};

export type ClinicServicePage = SeoConfig & {
  slug: string;
  path: string;
  eyebrow: string;
  heading: string;
  intro: string;
  serviceType: string;
  patientNeeds: string[];
  highlights: string[];
  relatedSlugs: string[];
  primaryCtaLabel?: string;
  heroImageShape?: "wide" | "square";
  richContent?: {
    serviceCards: Array<{
      title: string;
      description: string;
    }>;
    detailSections: Array<{
      title: string;
      description: string;
    }>;
    localSection: {
      eyebrow: string;
      heading: string;
      intro: string;
      communities: string[];
    };
    visitSteps: Array<{
      title: string;
      description: string;
    }>;
    bookingReasons: Array<{
      title: string;
      description: string;
    }>;
    helpfulLinks: Array<{
      title: string;
      description: string;
      href: string;
    }>;
    faqs: FaqItem[];
    finalCta: {
      eyebrow: string;
      heading: string;
      description: string;
    };
  };
};

export type FaqItem = {
  question: string;
  answer: string;
};

const registrationHref = "/register/";

export const baseNavigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Walk-In Clinic", href: "/walk-in/" },
  {
    label: "Family Doctors",
    href: "/family-doctor/",
  },
  { label: "Locations", href: "/locations/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

export const homePageSeo: SeoConfig = {
  path: "/",
  title: "Edmonton Doctors | Family Doctors Accepting New Patients",
  description:
    "Edmonton Doctors helps patients register with family doctors accepting new patients and find walk-in clinic care in Edmonton, Alberta.",
};

export const corePages = {
  patientRegistration: {
    path: registrationHref,
    title: "Choose Your Edmonton Doctor | Edmonton Doctors",
    description:
      "Choose a Beverly or Balwin family doctor and send a short registration request through Edmonton Doctors.",
    eyebrow: "New Patient Registration",
    heading: "Choose Your Edmonton Doctor",
    intro:
      "Select a preferred physician, confirm the clinic location, and send a short request so the team can follow up.",
  },
  services: {
    path: "/services/",
    title: "Family Doctor Services Edmonton | Edmonton Doctors",
    description:
      "Explore family medicine, walk-in care, checkups, vaccinations, chronic disease care, acute care, mental health support, and more.",
    eyebrow: "Services",
    heading: "Primary Care Services In Edmonton",
    intro:
      "Choose a service page to learn how Edmonton Doctors supports patients and families through accessible primary care.",
  },
  walkInClinic: {
    path: "/walk-in/",
    title: "Walk-In Clinic Edmonton | Edmonton Doctors",
    description:
      "Find Edmonton walk-in clinic information, participating locations, hours, and registration options.",
    eyebrow: "Walk-In Clinic Edmonton",
    heading: "Walk-In Care When You Need Medical Attention",
    intro:
      "Find timely care for non-emergency medical concerns. Compare participating Edmonton clinic locations, hours, phone numbers, and registration options before you visit.",
  },
  familyDoctors: {
    path: "/family-doctor/",
    title: "Family Doctors Accepting New Patients Edmonton | Edmonton Doctors",
    description:
      "Meet Edmonton family doctors at Beverly Medical Center and Balwin Medical Centre, including doctors accepting new patients.",
    eyebrow: "Family Doctors Accepting New Patients",
    heading: "Family Doctors In Edmonton",
    intro:
      "Compare Beverly and Balwin family physicians, see who is accepting patients, and choose the right registration path.",
  },
  locations: {
    path: "/locations/",
    title: "Edmonton Doctors Locations | Beverly And Balwin",
    description:
      "View Edmonton Doctors locations, phone numbers, addresses, hours, maps, and directions.",
    eyebrow: "Locations",
    heading: "Edmonton Clinic Locations",
    intro:
      "Compare Beverly Medical Center & Walk-In and Balwin Medical Centre.",
  },
  faq: {
    path: "/faq/",
    title: "Edmonton Doctors FAQ | Registration, Walk-Ins, Clinic Visits",
    description:
      "Answers to common questions about patient registration, family doctors, walk-in visits, services, and Edmonton clinic locations.",
    eyebrow: "FAQ",
    heading: "Questions Patients Ask Before Registering",
    intro:
      "Here are practical answers about registering, choosing a location, walk-in availability, and what information to submit online.",
  },
  contact: {
    path: "/contact/",
    title: "Contact Edmonton Doctors | Clinic Phone Numbers And Registration",
    description:
      "Contact Edmonton Doctors, register as a patient, or call Beverly Medical Center and Balwin Medical Centre in Edmonton.",
    eyebrow: "Contact Edmonton Doctors",
    heading: "Register Or Contact A Clinic",
    intro:
      "Use the registration form or call the Edmonton clinic location that best fits your needs.",
  },
  thankYou: {
    path: "/thank-you/",
    title: "Thank You | Edmonton Doctors",
    description:
      "Thank you for contacting Edmonton Doctors. The clinic team will review your registration request and follow up.",
    noIndex: true,
    eyebrow: "Request Received",
    heading: "Thanks, We Received Your Request",
    intro:
      "The clinic team will review your details and follow up about registration or next steps.",
  },
} satisfies Record<string, SitePage>;

export const clinicServicePages: ClinicServicePage[] = [
  {
    slug: "family-medicine",
    path: "/services/family-medicine/",
    title: "Family Medicine Edmonton | Edmonton Doctors",
    description:
      "Family medicine in Edmonton for children, adults, seniors, and households looking for ongoing primary care.",
    eyebrow: "Family Medicine",
    heading: "Family Medicine In Edmonton",
    intro:
      "Build an ongoing relationship with a family doctor for prevention, health planning, and care across life stages.",
    serviceType: "Family Medicine",
    patientNeeds: [
      "Ongoing primary care",
      "Preventative health visits",
      "Medication reviews",
      "Health screening guidance",
      "Care for children, adults, and seniors",
      "Family registration support",
    ],
    highlights: [
      "Family doctors accepting new patients",
      "Care plans tailored to the patient and household",
      "Registration support through a minimal online request",
    ],
    relatedSlugs: [
      "checkups-physicals",
      "chronic-disease-management",
      "womens-health-edmonton",
    ],
  },
  {
    slug: "walk-in-care",
    path: "/services/walk-in-care/",
    title: "Walk-In Care Edmonton | Edmonton Doctors",
    description:
      "Walk-in clinic care in Edmonton for timely medical concerns at participating clinic locations.",
    eyebrow: "Walk-In Care",
    heading: "Walk-In Clinic Care In Edmonton",
    intro:
      "Find practical clinic access for patients who need timely attention and clear next steps.",
    serviceType: "Walk-In Care",
    patientNeeds: [
      "Minor illness visits",
      "Non-emergency injury assessment",
      "Prescription renewal discussions",
      "Clinic follow-up guidance",
      "Referral discussions when appropriate",
      "Location and hours support",
    ],
    highlights: [
      "Participating locations welcome walk-ins",
      "Hours and phone numbers are easy to compare",
      "Patients can also request family doctor registration",
    ],
    relatedSlugs: ["acute-illness-injury-treatment", "family-medicine"],
  },
  {
    slug: "new-patient-registration",
    path: "/services/new-patient-registration/",
    title: "New Patient Registration Edmonton | Edmonton Doctors",
    description:
      "Register as a new patient with Edmonton Doctors and request follow-up from participating clinic teams.",
    eyebrow: "New Patient Registration",
    heading: "Register As A New Patient",
    intro:
      "Submit a minimal registration request so the clinic team can follow up without collecting sensitive medical intake online.",
    serviceType: "Patient Registration",
    patientNeeds: [
      "Register yourself",
      "Register a household",
      "Choose a preferred clinic",
      "Share general care needs",
      "Request follow-up",
      "Ask about new-patient availability",
    ],
    highlights: [
      "No health card numbers collected in the online form",
      "Designed for clinic follow-up",
      "Clear path for family doctor registration",
    ],
    relatedSlugs: ["family-medicine", "walk-in-care"],
  },
  {
    slug: "checkups-physicals",
    path: "/services/checkups-physicals/",
    title: "Checkups And Physical Exams Edmonton | Edmonton Doctors",
    description:
      "General checkups, physical exams, screening discussions, and preventative health visits in Edmonton.",
    eyebrow: "Checkups And Physical Exams",
    heading: "General Checkups And Physical Exams",
    intro:
      "Routine visits help patients review health goals, risk factors, screening needs, and changes over time.",
    serviceType: "Checkups and Physicals",
    patientNeeds: [
      "Routine health review",
      "Preventative screening discussion",
      "Blood pressure and risk checks",
      "Medication review",
      "Work or school form discussions",
      "Ongoing health planning",
    ],
    highlights: [
      "Useful for prevention and long-term health",
      "Supports family medicine follow-up",
      "Part of full-scope primary care",
    ],
    relatedSlugs: ["family-medicine", "vaccinations-preventative-care"],
  },
  {
    slug: "vaccinations-preventative-care",
    path: "/services/vaccinations-preventative-care/",
    title: "Vaccinations And Preventative Care Edmonton | Edmonton Doctors",
    description:
      "Preventative care and vaccination discussions for Edmonton patients and families.",
    eyebrow: "Vaccinations And Preventative Care",
    heading: "Vaccinations And Preventative Care",
    intro:
      "Preventative visits help patients stay current with recommended care and reduce future health risks.",
    serviceType: "Preventative Care",
    patientNeeds: [
      "Vaccination discussions",
      "Preventative screening",
      "Travel clinic coordination where available",
      "Risk factor review",
      "Health education",
      "Follow-up planning",
    ],
    highlights: [
      "Prevention-focused family medicine",
      "Helpful for adults, children, and families",
      "Beverly location offers convenient nearby pharmacy access",
    ],
    relatedSlugs: ["checkups-physicals", "family-medicine"],
  },
  {
    slug: "chronic-disease-management",
    path: "/services/chronic-disease-management/",
    title: "Chronic Disease Management Edmonton | Edmonton Doctors",
    description:
      "Primary care support for ongoing health conditions, risk management, medications, and follow-up planning.",
    eyebrow: "Chronic Disease Management",
    heading: "Chronic Disease Management",
    intro:
      "Ongoing conditions need practical follow-up, prevention, medication review, and collaborative planning.",
    serviceType: "Chronic Disease Management",
    patientNeeds: [
      "Blood pressure management",
      "Cholesterol and cardiovascular risk review",
      "Blood sugar follow-up",
      "Fatty liver risk discussions",
      "Medication review",
      "Long-term care planning",
    ],
    highlights: [
      "Prevention and long-term health focus",
      "Supports patients with complex ongoing needs",
      "Aligned with Dr. Kingsley's care interests",
    ],
    relatedSlugs: ["family-medicine", "checkups-physicals"],
  },
  {
    slug: "acute-illness-injury-treatment",
    path: "/services/acute-illness-injury-treatment/",
    title: "Acute Illness And Injury Treatment Edmonton | Edmonton Doctors",
    description:
      "Clinic visits for non-emergency illness and injury concerns in Edmonton.",
    eyebrow: "Acute Illness And Injury",
    heading: "Acute Illness And Injury Treatment",
    intro:
      "Patients can seek timely clinic care for non-emergency concerns that need assessment and next steps.",
    serviceType: "Acute Care",
    patientNeeds: [
      "Cough, cold, or flu-like symptoms",
      "Minor injury assessment",
      "Skin concerns",
      "Pain or discomfort discussions",
      "Follow-up recommendations",
      "Referral guidance when appropriate",
    ],
    highlights: [
      "Walk-in care available at participating clinics",
      "Designed for timely non-emergency medical concerns",
      "Location phone numbers shown clearly",
    ],
    relatedSlugs: ["walk-in-care", "family-medicine"],
  },
  {
    slug: "mental-health-support",
    path: "/services/mental-health-support/",
    title: "Mental Health Support Edmonton | Edmonton Doctors",
    description:
      "Family medicine support for mental health concerns, care planning, and follow-up in Edmonton.",
    eyebrow: "Mental Health Support",
    heading: "Mental Health Support",
    intro:
      "Family doctors can support patients with mental health concerns through listening, care planning, and follow-up.",
    serviceType: "Mental Health Support",
    patientNeeds: [
      "Initial mental health conversations",
      "Follow-up planning",
      "Medication discussions where appropriate",
      "Referral guidance",
      "Support for stress, mood, and anxiety concerns",
      "Whole-person care",
    ],
    highlights: [
      "Care starts with listening carefully",
      "Collaborative planning at the patient's pace",
      "Part of comprehensive family medicine",
    ],
    relatedSlugs: ["family-medicine", "chronic-disease-management"],
  },
  {
    slug: "womens-health-edmonton",
    path: "/services/womens-health-edmonton/",
    title: "Women's Health Clinic Edmonton | North & NE Edmonton",
    description:
      "Women's health care in Edmonton, North Edmonton, and Northeast Edmonton. Pap tests, contraception, prenatal counselling, hormone concerns, STI testing, and menopause support.",
    eyebrow: "Women's Health Edmonton",
    heading: "Women's Health Clinic in Edmonton",
    intro:
      "Essential care for every stage of a woman's life. Edmonton Doctors supports patients in Beverly, Balwin, North Edmonton, Northeast Edmonton, and nearby communities with practical, respectful women's health care.",
    serviceType: "Women's Health",
    primaryCtaLabel: "Book Appointment",
    heroImageShape: "square",
    patientNeeds: [
      "Pap tests and cervical screening",
      "Contraception and birth control counselling",
      "Prenatal counselling",
      "Hormone-related concerns",
      "Menopause and perimenopause support",
      "Confidential STI testing",
    ],
    highlights: [
      "Women's health care in Edmonton, North Edmonton, and Northeast Edmonton",
      "Support for preventive visits, symptoms, and reproductive health questions",
      "Beverly and Balwin clinic access for patients in surrounding communities",
    ],
    relatedSlugs: ["family-medicine", "checkups-physicals"],
    richContent: {
      serviceCards: [
        {
          title: "Pap Tests & Cervical Screening",
          description:
            "Routine cervical screening and Pap tests help detect abnormal cervical cell changes early, based on age, health history, and Alberta screening guidance.",
        },
        {
          title: "Contraception & Birth Control",
          description:
            "Talk through birth control pills, patches, rings, injections, IUD referrals, implants, condoms, and emergency contraception in a confidential visit.",
        },
        {
          title: "Prenatal Counselling",
          description:
            "Planning a pregnancy or newly pregnant? A clinic visit can help with early questions, medication review, risk review, lifestyle advice, and referrals.",
        },
        {
          title: "Hormonal Care",
          description:
            "Get support for hormone-related symptoms that may affect mood, sleep, periods, energy, skin, weight, or overall well-being.",
        },
        {
          title: "Menstrual Health",
          description:
            "Book a visit for heavy periods, painful periods, irregular cycles, missed periods, PMS, or concerns such as PCOS or endometriosis.",
        },
        {
          title: "Menopause & Perimenopause",
          description:
            "Discuss hot flashes, night sweats, sleep changes, mood symptoms, vaginal dryness, cycle changes, and hormone or non-hormone options.",
        },
        {
          title: "STI Testing & Sexual Health",
          description:
            "Confidential sexual health care for STI testing, symptom assessment, prevention advice, safer sex counselling, and treatment planning.",
        },
        {
          title: "Breast Health",
          description:
            "Review breast concerns, screening questions, breast exams when appropriate, and referral support for imaging when needed.",
        },
        {
          title: "Vaginal & Urinary Concerns",
          description:
            "Care for discharge, itching, irritation, infections, urinary symptoms, pelvic discomfort, and related concerns.",
        },
        {
          title: "Fertility & Preconception",
          description:
            "Prepare for pregnancy with cycle tracking discussions, supplement review, health history review, and next-step referral planning.",
        },
        {
          title: "Postpartum Support",
          description:
            "Follow-up after birth for recovery concerns, mood changes, contraception, breastfeeding-related questions, and ongoing care planning.",
        },
        {
          title: "Preventive Checkups",
          description:
            "General health reviews, screening discussions, blood pressure checks, lifestyle counselling, and prevention-focused care.",
        },
      ],
      detailSections: [
        {
          title: "Pap Tests & Cervical Screening",
          description:
            "In Alberta, women and people with a cervix aged 25 to 69 may be eligible for cervical cancer screening. Pap testing is generally recommended every 3 years for ages 25 to 49, while cervical screening testing is generally recommended every 5 years for ages 50 to 69. Your provider may recommend a different schedule based on your history or previous results.",
        },
        {
          title: "Contraception",
          description:
            "Contraception should fit your health, comfort, lifestyle, cost considerations, privacy needs, and future pregnancy plans. Edmonton Doctors can discuss options such as pills, patches, rings, injections, IUD referrals, implants, condoms, and emergency contraception.",
        },
        {
          title: "Hormone, Menstrual & Menopause Concerns",
          description:
            "Periods, hormones, perimenopause, and menopause can affect sleep, mood, bleeding patterns, energy, skin, weight, and vaginal health. A clinic visit can help review symptoms, discuss testing when appropriate, and plan practical next steps.",
        },
        {
          title: "Pregnancy Planning & Postpartum Care",
          description:
            "Whether you are planning a pregnancy, newly pregnant, or recovering after birth, the clinic can help with medication review, risk discussion, supplements, lifestyle questions, referral support, mood concerns, and contraception planning.",
        },
        {
          title: "Sexual, Vaginal, Urinary & Breast Health",
          description:
            "Patients can book confidential care for STI testing, sexual health questions, vaginal symptoms, urinary concerns, pelvic discomfort, breast concerns, and screening or imaging referral discussions when needed.",
        },
      ],
      localSection: {
        eyebrow: "Local Women's Health Care",
        heading: "Women's Health Care In North Edmonton & Northeast Edmonton",
        intro:
          "Edmonton Doctors supports patients from Beverly, Balwin, North Edmonton, Northeast Edmonton, and nearby communities. Patients visit for Pap tests, contraception counselling, prenatal support, hormone concerns, menopause care, STI testing, and routine women's health checkups.",
        communities: [
          "Beverly",
          "Balwin",
          "Clareview",
          "Londonderry",
          "Castle Downs",
          "Eaux Claires",
          "Manning",
          "Highlands",
          "Hermitage",
          "McConachie",
          "Hollick-Kenyon",
          "Surrounding NE Edmonton areas",
        ],
      },
      visitSteps: [
        {
          title: "Choose A Doctor Or Clinic",
          description:
            "Use the registration page to choose a Beverly or Balwin doctor, or call the clinic that works best for your location and schedule.",
        },
        {
          title: "Share The Main Concern",
          description:
            "Tell the clinic team whether you need screening, contraception advice, prenatal counselling, symptom review, STI testing, or another women's health visit.",
        },
        {
          title: "Plan Next Steps",
          description:
            "Your provider can review your concern, discuss options, order testing when appropriate, and arrange follow-up or referrals when needed.",
        },
      ],
      bookingReasons: [
        {
          title: "You are due for screening",
          description:
            "Book if you have questions about Pap tests, cervical screening, breast health, or preventive checkups.",
        },
        {
          title: "You want contraception advice",
          description:
            "A visit can help compare birth control options and decide what may fit your health and preferences.",
        },
        {
          title: "Your symptoms have changed",
          description:
            "New or worsening bleeding, pain, discharge, urinary symptoms, hot flashes, mood changes, or cycle changes are worth discussing.",
        },
      ],
      helpfulLinks: [
        {
          title: "Book an Appointment",
          description:
            "Choose a Beverly or Balwin doctor and send a short request to the clinic team.",
          href: "/register/",
        },
        {
          title: "Family Doctor Directory",
          description:
            "Meet Edmonton family physicians at Beverly Medical Center and Balwin Medical Centre.",
          href: "/family-doctor/",
        },
        {
          title: "Walk-In Clinic Access",
          description:
            "Compare participating walk-in locations for non-emergency clinic concerns.",
          href: "/walk-in/",
        },
        {
          title: "Checkups & Physical Exams",
          description:
            "Learn about routine health reviews, screening discussions, and prevention-focused visits.",
          href: "/services/checkups-physicals/",
        },
      ],
      faqs: [
        {
          question: "Do I need a referral for women's health care in Edmonton?",
          answer:
            "Many women's health concerns can be discussed directly with a family physician or clinic provider. Some tests, imaging, or specialist care may still require a referral depending on the concern.",
        },
        {
          question: "How often should I get a Pap test in Alberta?",
          answer:
            "In Alberta, Pap testing is generally recommended every 3 years for ages 25 to 49. For ages 50 to 69, cervical screening testing is generally recommended every 5 years. Your provider may recommend a different schedule based on your health history or previous results.",
        },
        {
          question: "Can I get birth control from your clinic?",
          answer:
            "Yes. A clinic visit can include contraception counselling and discussion of options such as birth control pills, patches, rings, injections, IUD referrals, implants, condoms, and emergency contraception.",
        },
        {
          question: "Can I book for irregular or painful periods?",
          answer:
            "Yes. Irregular, heavy, painful, or missed periods can have many causes. A visit can help review symptoms, medical history, possible testing, and treatment options.",
        },
        {
          question: "Do you provide prenatal counselling?",
          answer:
            "Yes. Prenatal counselling can help with pregnancy planning, early pregnancy questions, medication review, health risks, supplements, lifestyle guidance, and referral planning.",
        },
        {
          question: "Is STI testing confidential?",
          answer:
            "Yes. Sexual health visits and STI testing are handled respectfully and confidentially.",
        },
      ],
      finalCta: {
        eyebrow: "Book Women's Health Care",
        heading: "Book Women's Health Care In Edmonton",
        description:
          "Use the registration page to choose a Beverly or Balwin doctor, or call the clinic if you need help choosing the right appointment path.",
      },
    },
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Is Dr. Kingsley accepting new patients?",
    answer:
      "Yes. Dr. Kingsley is accepting new patients in Edmonton through the registration process shown on this site, subject to clinic availability.",
  },
  {
    question: "Is there a waitlist?",
    answer:
      "The site promotes current registration availability with no waitlist. Spots can still be limited, so patients should register as soon as possible.",
  },
  {
    question: "Can I register my whole family?",
    answer:
      "Yes. The registration form includes a family size field so the clinic team can follow up about household registration.",
  },
  {
    question: "Do you collect health card numbers online?",
    answer:
      "No. The v1 registration form is a minimal lead form and does not ask for health card numbers, dates of birth, diagnosis history, or detailed medical history.",
  },
  {
    question: "Are walk-ins welcome?",
    answer:
      "Walk-in care is welcome at participating clinics during available hours. Calling the preferred location can help confirm current availability.",
  },
  {
    question: "Which locations are listed?",
    answer:
      "The site lists two clinic locations: Beverly Medical Center & Walk-In and Balwin Medical Centre.",
  },
  {
    question: "What services are available?",
    answer:
      "Common services include family medicine, walk-in care, checkups, vaccinations and preventative care, chronic disease management, acute illness and injury care, mental health support, and women's health care.",
  },
  {
    question: "What should I do for an emergency?",
    answer:
      "This website is not for emergencies. For emergency symptoms or urgent danger, call 911 or go to the nearest emergency department.",
  },
];

export const allClinicServicePages = clinicServicePages;

export const serviceRequestLinks = {
  call: businessLocation.phoneHref,
  register: registrationHref,
  book: registrationHref,
};

export function getClinicServicePage(slug: string) {
  return allClinicServicePages.find((page) => page.slug === slug);
}

export function getRelatedClinicServicePages(page: ClinicServicePage) {
  return page.relatedSlugs
    .map((slug) => getClinicServicePage(slug))
    .filter((item): item is ClinicServicePage => Boolean(item));
}

export function serviceBreadcrumbs(page?: ClinicServicePage): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: corePages.services.path },
  ];

  if (page) {
    items.push({ label: page.eyebrow, href: page.path });
  }

  return items;
}

export const sitemapPages: SeoConfig[] = [
  homePageSeo,
  corePages.patientRegistration,
  corePages.services,
  corePages.walkInClinic,
  corePages.familyDoctors,
  corePages.locations,
  corePages.faq,
  corePages.contact,
  ...allClinicServicePages,
];

export const primaryCtaLabel = "Register Now";
export const secondaryCtaLabel = `Call ${businessLocation.phone}`;
export const businessName = businessConfig.businessName;
