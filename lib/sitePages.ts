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
    serviceSection?: {
      eyebrow: string;
      heading: string;
      intro: string;
    };
    serviceCards: Array<{
      title: string;
      description: string;
    }>;
    detailSection?: {
      eyebrow: string;
      heading: string;
      intro: string;
    };
    detailSections?: Array<{
      title: string;
      description: string;
    }>;
    listSection?: {
      eyebrow: string;
      heading: string;
      intro: string;
      items: string[];
      columns?: "two" | "three";
    };
    localSection?: {
      eyebrow: string;
      heading: string;
      intro: string;
      communities: string[];
    };
    visitSection?: {
      eyebrow: string;
      heading: string;
      intro: string;
    };
    visitSteps?: Array<{
      title: string;
      description: string;
    }>;
    bookingSection?: {
      eyebrow: string;
      heading: string;
      intro?: string;
    };
    bookingReasons?: Array<{
      title: string;
      description: string;
    }>;
    comparisonSection?: {
      eyebrow: string;
      heading: string;
      intro: string;
      groups: Array<{
        title: string;
        items: string[];
      }>;
      note?: string;
    };
    helpfulLinksSection?: {
      eyebrow: string;
      heading: string;
      intro: string;
      columns?: "two" | "three" | "four";
    };
    helpfulLinks?: Array<{
      title: string;
      description: string;
      href: string;
    }>;
    faqSection?: {
      eyebrow: string;
      heading: string;
      intro: string;
    };
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
      "Explore family medicine, walk-in clinic care, checkups, prescription renewals, vaccinations, chronic disease care, acute care, mental health support, and more.",
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
    eyebrow: "Walk-In Clinic",
    heading: "Walk-In Clinic Care When You Need Medical Attention",
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
    slug: "family-medicine-edmonton",
    path: "/services/family-medicine-edmonton/",
    title: "Family Medicine Edmonton | Primary Care Doctors",
    description:
      "Family medicine in Edmonton for children, adults, seniors, and families. Ongoing primary care, preventive visits, medication reviews, health screening, and care planning.",
    eyebrow: "Family Medicine",
    heading: "Family Medicine in Edmonton",
    intro:
      "Build an ongoing relationship with a family doctor for prevention, health planning, medication support, and care across every stage of life.",
    serviceType: "Family Medicine",
    patientNeeds: [
      "Ongoing primary care",
      "Preventive health visits",
      "Medication reviews",
      "Health screening guidance",
      "Care for children, adults, and seniors",
      "Family registration support",
    ],
    highlights: [
      "Primary care for children, adults, seniors, and households",
      "Preventive health visits and screening guidance",
      "Medication review and renewal discussions",
      "Follow-up planning for ongoing health concerns",
      "Clear next steps after each visit",
      "Family doctor registration support for patients looking for ongoing care",
    ],
    relatedSlugs: [
      "checkups-physicals",
      "chronic-disease-management",
      "womens-health-edmonton",
    ],
    richContent: {
      serviceSection: {
        eyebrow: "Family Medicine Services",
        heading: "Ongoing Family Medicine Support",
        intro:
          "Family medicine provides ongoing primary care for patients of all ages, including children, adults, seniors, and households looking for long-term health support. For family medicine Edmonton patients, Edmonton Doctors helps with preventive visits, medication reviews, screening guidance, chronic condition follow-up, new health concerns, and practical care planning.",
      },
      serviceCards: [
        {
          title: "Ongoing Primary Care",
          description:
            "Build a long-term relationship with a family doctor who can help manage your health history, concerns, medications, and care needs over time.",
        },
        {
          title: "Preventive Health Visits",
          description:
            "Book preventive visits for health checks, screening discussions, lifestyle advice, risk review, and early detection of common health concerns.",
        },
        {
          title: "Medication Reviews",
          description:
            "Review current medications, renewals, side effects, interactions, and whether follow-up or adjustments may be needed.",
        },
        {
          title: "Health Screening Guidance",
          description:
            "Discuss age-appropriate screening, blood pressure checks, lab testing when appropriate, and next steps based on your health history.",
        },
        {
          title: "Care for Children, Adults, and Seniors",
          description:
            "Family medicine supports patients across life stages, from children and young adults to working adults, older adults, and seniors.",
        },
        {
          title: "Family Registration Support",
          description:
            "Patients can register online to request a family doctor or call the clinic to ask about availability and next steps.",
        },
      ],
      listSection: {
        eyebrow: "Care Needs",
        heading: "What Family Medicine Can Help With",
        intro:
          "A family medicine clinic can support many common health needs, from routine checkups to ongoing condition management. Your provider can help assess symptoms, review your health history, discuss treatment options, and recommend follow-up when needed. This includes preventive health visits Edmonton patients book for risk review, medication review Edmonton appointments, and chronic disease follow-up Edmonton care when appropriate.",
        columns: "two",
        items: [
          "General health concerns",
          "Preventive health visits",
          "Medication reviews and renewal discussions",
          "Blood pressure, cholesterol, and diabetes follow-up",
          "Children's health concerns",
          "Seniors' health concerns",
          "Mental health conversations when appropriate",
          "Women's health and men's health concerns",
          "Screening and lab test guidance",
          "Referrals when medically appropriate",
          "Follow-up after walk-in visits, hospital visits, or test results",
        ],
      },
      localSection: {
        eyebrow: "Local Primary Care",
        heading: "Family Medicine in North Edmonton and Northeast Edmonton",
        intro:
          "Edmonton Doctors supports patients across Edmonton, including North Edmonton and Northeast Edmonton. Patients visit for ongoing primary care, preventive health visits, medication reviews, chronic condition follow-up, and family doctor registration support. Patients searching for a North Edmonton family doctor, Northeast Edmonton family medicine, a family medicine clinic Edmonton option, a family doctor Edmonton visit, primary care Edmonton services, or a family doctor accepting new patients Edmonton can call or register to ask about availability.",
        communities: [
          "North Edmonton",
          "Northeast Edmonton",
          "NE Edmonton",
          "Clareview",
          "Londonderry",
          "Castle Downs",
          "Beverly",
          "Manning",
          "Hermitage",
          "Eaux Claires",
          "McConachie",
          "Nearby Edmonton communities",
        ],
      },
      bookingSection: {
        eyebrow: "Patient-Centered Care",
        heading: "Why Patients Choose Edmonton Doctors",
        intro:
          "Patients choose Edmonton Doctors for accessible, clear, and patient-centered primary care support.",
      },
      bookingReasons: [
        {
          title: "Registration Support",
          description:
            "Family doctor registration support for patients looking for ongoing care, with availability that may vary by clinic capacity and provider schedule.",
        },
        {
          title: "Care Across Life Stages",
          description:
            "Primary care for children, adults, seniors, and households looking for practical follow-up over time.",
        },
        {
          title: "Clear Care Planning",
          description:
            "Preventive health visits, screening guidance, medication review, renewal discussions, and clear next steps after each visit.",
        },
      ],
      comparisonSection: {
        eyebrow: "Care Options",
        heading: "Family Medicine vs Walk-In Clinic Care",
        intro:
          "Family medicine is best for ongoing care, prevention, medication management, screening, chronic condition follow-up, and long-term health planning. Walk-in clinic care is useful for timely, non-emergency concerns when a scheduled family medicine appointment is not available.",
        groups: [
          {
            title: "Family Medicine",
            items: [
              "Ongoing relationship with a provider",
              "Preventive care and screening",
              "Medication reviews",
              "Chronic condition follow-up",
              "Long-term health planning",
            ],
          },
          {
            title: "Walk-In Clinic",
            items: [
              "Timely non-emergency concerns",
              "Minor illness or injury assessment",
              "Short-term symptoms",
              "Availability may vary by clinic schedule and patient volume",
            ],
          },
        ],
        note:
          "For chest pain, severe trouble breathing, signs of stroke, severe allergic reaction, major injury, heavy bleeding, or another medical emergency, call 911 or go to the nearest emergency department.",
      },
      helpfulLinksSection: {
        eyebrow: "Related Services",
        heading: "Related Services",
        intro:
          "Explore nearby care pages that connect with ongoing family medicine and primary care follow-up.",
        columns: "four",
      },
      helpfulLinks: [
        {
          title: "Checkups & Physical Exams",
          description:
            "General checkups, physical exams, screening discussions, and preventive health visits in Edmonton.",
          href: "/services/checkups-physicals/",
        },
        {
          title: "Chronic Disease Management",
          description:
            "Primary care support for ongoing health conditions, risk management, medications, and follow-up planning.",
          href: "/services/chronic-disease-management/",
        },
        {
          title: "Women's Health",
          description:
            "Women's health care in Edmonton, including Pap tests, contraception, prenatal counselling, hormone concerns, STI testing, and menopause support.",
          href: "/services/womens-health-edmonton/",
        },
        {
          title: "Walk-In Clinic",
          description:
            "Walk-in clinic care for timely, non-emergency health concerns in Edmonton.",
          href: "/walk-in/",
        },
      ],
      faqSection: {
        eyebrow: "Family Medicine FAQ",
        heading: "Frequently Asked Questions",
        intro:
          "Short answers about family medicine, registration, walk-in care, medication renewals, and who can receive ongoing primary care.",
      },
      faqs: [
        {
          question: "What is family medicine?",
          answer:
            "Family medicine is ongoing primary care for patients of all ages. It can include preventive care, health screening, medication reviews, chronic condition follow-up, new health concerns, and referrals when appropriate.",
        },
        {
          question: "Can I register for a family doctor?",
          answer:
            "Yes. Patients can use the registration option to request a family doctor. Availability may vary by clinic capacity and provider schedule.",
        },
        {
          question: "Is family medicine different from walk-in care?",
          answer:
            "Yes. Family medicine focuses on ongoing care and long-term health planning. Walk-in care is usually for timely, non-emergency concerns when a scheduled visit is not available.",
        },
        {
          question: "Can a family doctor help with medication renewals?",
          answer:
            "Yes. A family doctor can review medications and discuss renewals when appropriate. Some prescriptions may require an assessment, lab work, or follow-up visit.",
        },
        {
          question: "Do family doctors see children, adults, and seniors?",
          answer:
            "Yes. Family medicine supports patients across life stages, including children, adults, seniors, and households looking for ongoing primary care.",
        },
        {
          question: "Can I call before registering?",
          answer:
            "Yes. Call (780) 522-1236 to ask about family doctor availability, registration steps, location details, and next steps.",
        },
      ],
      finalCta: {
        eyebrow: "Register Or Call",
        heading: "Need Help With Family Medicine?",
        description:
          "Register online or call a participating Edmonton clinic to ask about family doctor availability, primary care registration, and next steps.",
      },
    },
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
    relatedSlugs: ["family-medicine-edmonton", "checkups-physicals"],
  },
  {
    slug: "checkups-physicals",
    path: "/services/checkups-physicals/",
    title: "Checkups & Physical Exams Edmonton | Edmonton Doctors",
    description:
      "General checkups, physical exams, screening discussions, and preventive health visits in Edmonton.",
    eyebrow: "Checkups & Physical Exams",
    heading: "General Checkups & Physical Exams",
    intro:
      "Routine visits help patients review health goals, risk factors, screening needs, and changes over time.",
    serviceType: "Checkups and Physicals",
    patientNeeds: [
      "Routine health review",
      "Preventive screening discussion",
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
    relatedSlugs: ["family-medicine-edmonton", "vaccinations-preventative-care"],
  },
  {
    slug: "vaccinations-preventative-care",
    path: "/services/vaccinations-preventative-care/",
    title: "Vaccinations & Preventive Care Edmonton | Edmonton Doctors",
    description:
      "Preventive care and vaccination discussions for Edmonton patients and families.",
    eyebrow: "Vaccinations & Preventive Care",
    heading: "Vaccinations & Preventive Care",
    intro:
      "Preventive visits help patients stay current with recommended care and reduce future health risks.",
    serviceType: "Preventive Care",
    patientNeeds: [
      "Vaccination discussions",
      "Preventive screening",
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
    relatedSlugs: ["checkups-physicals", "family-medicine-edmonton"],
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
    relatedSlugs: ["family-medicine-edmonton", "checkups-physicals"],
  },
  {
    slug: "acute-illness-injury-treatment",
    path: "/services/acute-illness-injury-treatment/",
    title: "Acute Illness & Injury Treatment Edmonton | Edmonton Doctors",
    description:
      "Clinic visits for non-emergency illness and injury concerns in Edmonton.",
    eyebrow: "Acute Illness & Injury",
    heading: "Acute Illness & Injury Treatment",
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
    relatedSlugs: ["prescription-renewals", "family-medicine-edmonton"],
  },
  {
    slug: "prescription-renewals",
    path: "/services/prescription-renewals/",
    title: "Prescription Renewals Edmonton | Edmonton Doctors",
    description:
      "Prescription renewal visits in Edmonton for medication review, follow-up discussions, and practical next steps with a clinic provider.",
    eyebrow: "Prescription Renewals",
    heading: "Prescription Renewals In Edmonton",
    intro:
      "Book a clinic visit to review renewal needs, current medications, and whether follow-up testing or ongoing family medicine care is recommended.",
    serviceType: "Prescription Renewals",
    patientNeeds: [
      "Medication renewal discussions",
      "Reviewing current prescriptions",
      "Follow-up for stable medications",
      "Blood pressure or lab follow-up where appropriate",
      "Pharmacy coordination questions",
      "Ongoing care planning",
    ],
    highlights: [
      "Renewal requests are reviewed by a clinic provider",
      "Medication safety and follow-up come first",
      "Patients can also register for ongoing family medicine",
    ],
    relatedSlugs: [
      "family-medicine-edmonton",
      "chronic-disease-management",
      "acute-illness-injury-treatment",
    ],
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
    relatedSlugs: ["family-medicine-edmonton", "chronic-disease-management"],
  },
  {
    slug: "womens-health-edmonton",
    path: "/services/womens-health-edmonton/",
    title: "Women's Health Clinic Edmonton | North & NE Edmonton",
    description:
      "Women's health care in Edmonton, North Edmonton, and Northeast Edmonton. Pap tests, contraception, prenatal counselling, hormone concerns, STI testing, and menopause support.",
    eyebrow: "Women's Health",
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
    relatedSlugs: [
      "pap-tests-cervical-screening",
      "birth-control-contraception",
      "sti-testing",
    ],
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
          title: "Pap Tests & Cervical Screening",
          description:
            "Review cervical screening, Pap testing, and preventive follow-up options.",
          href: "/services/pap-tests-cervical-screening/",
        },
        {
          title: "Birth Control & Contraception",
          description:
            "Compare contraception options and talk through what may fit your health and preferences.",
          href: "/services/birth-control-contraception/",
        },
        {
          title: "Prenatal Counselling",
          description:
            "Get practical early-pregnancy or preconception counselling and referral guidance.",
          href: "/services/prenatal-counselling/",
        },
        {
          title: "STI Testing",
          description:
            "Book confidential STI testing and sexual health discussions.",
          href: "/services/sti-testing/",
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
  {
    slug: "pap-tests-cervical-screening",
    path: "/services/pap-tests-cervical-screening/",
    title: "Pap Tests & Cervical Screening Edmonton | Edmonton Doctors",
    description:
      "Pap tests and cervical screening in Edmonton with preventive follow-up guidance from Edmonton Doctors.",
    eyebrow: "Pap Tests & Cervical Screening",
    heading: "Pap Tests & Cervical Screening In Edmonton",
    intro:
      "Book a preventive visit to discuss Pap testing, cervical screening, previous results, symptoms, and the next screening interval that fits your history.",
    serviceType: "Cervical Screening",
    patientNeeds: [
      "Pap test questions",
      "Cervical screening eligibility",
      "Preventive health visits",
      "Previous result follow-up",
      "Screening interval guidance",
      "Referral or testing next steps",
    ],
    highlights: [
      "Focused preventive care for patients with a cervix",
      "Screening guidance based on age and health history",
      "Part of respectful women's health care in Edmonton",
    ],
    relatedSlugs: [
      "womens-health-edmonton",
      "checkups-physicals",
      "family-medicine-edmonton",
    ],
    primaryCtaLabel: "Book Appointment",
  },
  {
    slug: "birth-control-contraception",
    path: "/services/birth-control-contraception/",
    title: "Birth Control & Contraception Edmonton | Edmonton Doctors",
    description:
      "Birth control and contraception counselling in Edmonton, including confidential discussions about options and next steps.",
    eyebrow: "Birth Control & Contraception",
    heading: "Birth Control & Contraception In Edmonton",
    intro:
      "Talk with a clinic provider about contraception options, side effects, privacy needs, future pregnancy plans, and what may fit your health.",
    serviceType: "Contraception Counselling",
    patientNeeds: [
      "Birth control counselling",
      "Pill, patch, ring, or injection questions",
      "IUD or implant referral discussions",
      "Emergency contraception questions",
      "Side effect review",
      "Pregnancy planning considerations",
    ],
    highlights: [
      "Confidential contraception conversations",
      "Options reviewed around health, comfort, and preferences",
      "Referral support when a device or specialist pathway is needed",
    ],
    relatedSlugs: [
      "womens-health-edmonton",
      "pap-tests-cervical-screening",
      "sti-testing",
    ],
    primaryCtaLabel: "Book Appointment",
  },
  {
    slug: "prenatal-counselling",
    path: "/services/prenatal-counselling/",
    title: "Prenatal Counselling Edmonton | Edmonton Doctors",
    description:
      "Prenatal counselling in Edmonton for pregnancy planning, early pregnancy questions, medication review, and referral guidance.",
    eyebrow: "Prenatal Counselling",
    heading: "Prenatal Counselling In Edmonton",
    intro:
      "Book a visit for preconception questions, early pregnancy planning, medication review, lifestyle guidance, and next-step referral support.",
    serviceType: "Prenatal Counselling",
    patientNeeds: [
      "Pregnancy planning",
      "Early pregnancy questions",
      "Medication and supplement review",
      "Risk factor discussion",
      "Lifestyle and prevention guidance",
      "Referral planning",
    ],
    highlights: [
      "Practical counselling before or early in pregnancy",
      "Support for medication, risk, and lifestyle questions",
      "Referral guidance when obstetric or specialist care is needed",
    ],
    relatedSlugs: [
      "womens-health-edmonton",
      "family-medicine-edmonton",
      "birth-control-contraception",
    ],
    primaryCtaLabel: "Book Appointment",
  },
  {
    slug: "sti-testing",
    path: "/services/sti-testing/",
    title: "STI Testing Edmonton | Edmonton Doctors",
    description:
      "Confidential STI testing and sexual health care in Edmonton for symptoms, screening questions, prevention advice, and treatment planning.",
    eyebrow: "STI Testing",
    heading: "STI Testing In Edmonton",
    intro:
      "Book a confidential clinic visit for STI screening questions, symptoms, prevention advice, testing discussions, and treatment or follow-up planning.",
    serviceType: "Sexual Health",
    patientNeeds: [
      "Confidential STI testing",
      "Sexual health questions",
      "Symptoms or exposure concerns",
      "Prevention and safer sex advice",
      "Treatment discussions",
      "Follow-up planning",
    ],
    highlights: [
      "Respectful and confidential sexual health care",
      "Support for screening, symptoms, and prevention questions",
      "Part of broader women's health and family medicine services",
    ],
    relatedSlugs: [
      "womens-health-edmonton",
      "birth-control-contraception",
      "pap-tests-cervical-screening",
    ],
    primaryCtaLabel: "Book Appointment",
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
      "Walk-in clinic care is welcome at participating clinics during available hours. Calling the preferred location can help confirm current availability.",
  },
  {
    question: "Which locations are listed?",
    answer:
      "The site lists two clinic locations: Beverly Medical Center & Walk-In and Balwin Medical Centre.",
  },
  {
    question: "What services are available?",
    answer:
      "Common services include family medicine, walk-in clinic care, checkups, prescription renewals, vaccinations and preventive care, chronic disease management, acute illness and injury care, mental health support, and women's health care.",
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

function requireClinicServicePage(slug: string) {
  const page = getClinicServicePage(slug);

  if (!page) {
    throw new Error(`Missing clinic service page: ${slug}`);
  }

  return page;
}

export const serviceNavigationPages = [
  requireClinicServicePage("family-medicine-edmonton"),
  corePages.walkInClinic,
  requireClinicServicePage("new-patient-registration"),
  requireClinicServicePage("checkups-physicals"),
  requireClinicServicePage("acute-illness-injury-treatment"),
  requireClinicServicePage("prescription-renewals"),
  requireClinicServicePage("vaccinations-preventative-care"),
  requireClinicServicePage("chronic-disease-management"),
  requireClinicServicePage("womens-health-edmonton"),
  requireClinicServicePage("mental-health-support"),
] satisfies Array<ClinicServicePage | SitePage>;

export const serviceDirectoryPages = [
  ...serviceNavigationPages,
  requireClinicServicePage("pap-tests-cervical-screening"),
  requireClinicServicePage("birth-control-contraception"),
  requireClinicServicePage("prenatal-counselling"),
  requireClinicServicePage("sti-testing"),
] satisfies Array<ClinicServicePage | SitePage>;

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
