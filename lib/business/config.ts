import type { CSSProperties } from "react";

export type SiteImage = {
  src: string;
  alt: string;
  fileName: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type BrandAssets = {
  favicon: string;
  logo?: string;
};

export type BrandTheme = {
  cssVariables: Record<`--${string}`, string>;
};

export type HeroHighlight = {
  value: string;
  label: string;
};

export type ContentCard = {
  title: string;
  description: string;
  href?: string;
};

export type AnnouncementConfig = {
  enabled: boolean;
  id: string;
  ariaLabel: string;
  alertLabel: string;
  shortAlertLabel: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ContactMethod = {
  label: string;
  value: string;
  description: string;
  href?: string;
};

export type ClinicLocation = {
  id: string;
  name: string;
  addressLines: string[];
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  serviceArea: string;
  phone: string;
  phoneHref: string;
  bookingHref: string;
  mapEmbedUrl: string;
  directionsHref: string;
  hours: string[];
  schemaHours: Array<{
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }>;
};

export type DoctorProfile = {
  slug: string;
  name: string;
  fullName?: string;
  title: string;
  clinicName: string;
  locationId: string;
  intro: string;
  biography: string[];
  focusAreas: string[];
  languages: string[];
  status: "accepting" | "walk-in-family-practice" | "aesthetics" | "not-accepting";
  statusLabel: string;
  profileUrl?: string;
  image?: SiteImage;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type BusinessConfig = {
  businessName: string;
  description: string;
  market: string;
  assets: BrandAssets;
  theme: BrandTheme;
  navItems: NavItem[];
  announcement: AnnouncementConfig;
  locations: ClinicLocation[];
  primaryLocationId: string;
  contactMethods: ContactMethod[];
  socialLinks: SocialLink[];
  doctors: DoctorProfile[];
  media: {
    heroImage: SiteImage;
    doctorConsultationImage: SiteImage;
    doctorPortraitImage: SiteImage;
    clinicReceptionImage: SiteImage;
    galleryImages: SiteImage[];
  };
  content: {
    header: {
      ctaLabel: string;
      ctaHref: string;
    };
    hero: {
      eyebrow: string;
      heading: string;
      description: string;
      primaryCtaLabel: string;
      primaryCtaHref: string;
      secondaryCtaLabel: string;
      secondaryCtaHref: string;
      highlights: HeroHighlight[];
    };
    about: {
      eyebrow: string;
      heading: string;
      description: string;
      primaryCtaLabel: string;
      primaryCtaHref: string;
      secondaryCtaLabel: string;
      secondaryCtaHref: string;
      promotion: {
        heading: string;
      };
      visual: SiteImage;
      highlights: ContentCard[];
    };
    doctor: {
      eyebrow: string;
      heading: string;
      description: string;
      ctaLabel: string;
      ctaHref: string;
    };
    featuredServices: {
      eyebrow: string;
      heading: string;
      description: string;
    };
    access: {
      eyebrow: string;
      heading: string;
      description: string;
      cards: ContentCard[];
    };
    services: {
      eyebrow: string;
      heading: string;
      description: string;
      itemCountLabel: string;
    };
    process: {
      eyebrow: string;
      heading: string;
      description: string;
      steps: ProcessStep[];
      ctaLabel: string;
      ctaHref: string;
    };
    locations: {
      eyebrow: string;
      heading: string;
      description: string;
    };
    contact: {
      eyebrow: string;
      heading: string;
      description: string;
      hoursHeading: string;
      detailsHeading: string;
      primaryCtaLabel: string;
      secondaryCtaLabel: string;
    };
    footer: {
      description: string;
      contactHeading: string;
      socialHeading: string;
      servicesIntro: string;
      serviceLinks: NavItem[];
      copyrightSuffix: string;
    };
  };
};

const configuredBusinessName = "Edmonton Doctors";
const configuredMarket =
  "Family medicine, walk-in care, and new patient registration in Edmonton";
const registrationHref = "/register/";

export const businessTheme: BrandTheme = {
  cssVariables: {
    "--brand-font-body":
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    "--brand-font-display": "var(--brand-font-body)",
    "--brand-font-accent": "var(--brand-font-body)",
    "--brand-font-editorial": 'Georgia, "Times New Roman", serif',
    "--brand-color-primary": "#0f766e",
    "--brand-color-primary-strong": "#115e59",
    "--brand-color-secondary": "#2563eb",
    "--brand-color-accent": "#f4b860",
    "--brand-color-ink": "#12202a",
    "--brand-color-charcoal": "#17303a",
    "--brand-color-footer": "#0d1c22",
    "--brand-color-cream": "#f8fbfb",
    "--brand-color-paper": "#f6faf9",
    "--brand-color-surface": "#ffffff",
    "--brand-color-border": "#dbe7e4",
    "--brand-color-muted": "#64748b",
    "--brand-color-white": "#ffffff",
    "--brand-section-y": "4.5rem",
    "--brand-section-y-mobile": "3rem",
    "--brand-container": "80rem",
    "--brand-card-shadow": "0 16px 48px rgba(18, 32, 42, 0.08)",
  },
};

export const brandAssetConfig: BrandAssets = {
  favicon: "/favicon.svg",
};

export const medicalImages = {
  heroClinic: {
    fileName: "edmonton-doctors-hero-clinic.png",
    src: "/images/medical/edmonton-doctors-hero-clinic.png",
    alt: "Bright family medicine clinic reception with a doctor welcoming patients",
  },
  doctorConsultation: {
    fileName: "doctor-consultation.png",
    src: "/images/medical/doctor-consultation.png",
    alt: "Family doctor speaking with a patient in a calm consultation room",
  },
  clinicReception: {
    fileName: "clinic-reception.png",
    src: "/images/medical/clinic-reception.png",
    alt: "Clean walk-in clinic reception area with soft daylight",
  },
  walkInCareConsultation: {
    fileName: "walk-in-care-consultation.png",
    src: "/images/medical/walk-in-care-consultation.png",
    alt: "Family doctor speaking with a patient in a bright walk-in clinic",
  },
  drKingsleyPortrait: {
    fileName: "lasing_kingely.jpg",
    src: "https://res.cloudinary.com/dcb389szc/image/upload/f_auto,q_auto,w_900,c_fill,g_face/v1782676373/EdmontonDoctors/lasing_kingely.jpg",
    alt: "Dr. Kingsley Lasing, Edmonton family physician",
  },
  drNosaPortrait: {
    fileName: "Dr_Nosa.jpg",
    src: "https://res.cloudinary.com/dcb389szc/image/upload/v1782859914/EdmontonDoctors/Dr_Nosa.jpg",
    alt: "Dr. Nosa, Edmonton family physician",
  },
  drAsimPortrait: {
    fileName: "Dr_Asim_Bilal_-_MD.jpg",
    src: "https://res.cloudinary.com/dcb389szc/image/upload/v1782860057/EdmontonDoctors/Dr_Asim_Bilal_-_MD.jpg",
    alt: "Dr. Asim Bilal, Edmonton family physician",
  },
  drOlatayoPortrait: {
    fileName: "Dr._Olatayo_Idowu-Araade.jpg",
    src: "https://res.cloudinary.com/dcb389szc/image/upload/v1782859914/EdmontonDoctors/Dr._Olatayo_Idowu-Araade.jpg",
    alt: "Dr. Olatayo Idowu-Araade, Edmonton family physician",
  },
  drSameerPortrait: {
    fileName: "Dr._Sameer_Sardesai.jpg",
    src: "https://res.cloudinary.com/dcb389szc/image/upload/v1782859914/EdmontonDoctors/Dr._Sameer_Sardesai.jpg",
    alt: "Dr. Sameer Sardesai, Edmonton family physician",
  },
  drRahulPortrait: {
    fileName: "Dr._Rahul_Chaturvedi_MD.jpg",
    src: "https://res.cloudinary.com/dcb389szc/image/upload/v1782859914/EdmontonDoctors/Dr._Rahul_Chaturvedi_MD.jpg",
    alt: "Dr. Rahul Chaturvedi, Edmonton family physician",
  },
} satisfies Record<string, SiteImage>;

const navItems: NavItem[] = [
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

const clinicLocations: ClinicLocation[] = [
  {
    id: "beverly-medical-center",
    name: "Beverly Medical Center & Walk-In",
    addressLines: ["3347 118 Ave NW", "Edmonton, AB T5W 4X1"],
    streetAddress: "3347 118 Ave NW",
    addressLocality: "Edmonton",
    addressRegion: "AB",
    postalCode: "T5W 4X1",
    addressCountry: "CA",
    serviceArea:
      "Family medicine, walk-in clinic visits, patient registration, pharmacy access, and travel clinic support in North East Edmonton.",
    phone: "(780) 522-1236",
    phoneHref: "tel:+17805221236",
    bookingHref: "https://cloud.healthquest.ca:45254/onlinebooking",
    mapEmbedUrl:
      "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=3347%20118%20Ave%20NW%20Edmonton%20AB%20T5W%204X1&t=&z=15&ie=UTF8&iwloc=B&output=embed",
    directionsHref:
      "https://www.google.com/maps/dir/?api=1&destination=3347%20118%20Ave%20NW%20Edmonton%20AB%20T5W%204X1",
    hours: [
      "Mon-Fri: 10:00 a.m. - 6:30 p.m.",
      "Sat: Closed",
      "Sun: Closed",
    ],
    schemaHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:30",
      },
    ],
  },
  {
    id: "balwin-medical-centre",
    name: "Balwin Medical Centre",
    addressLines: ["8103 127 Ave NW #17", "Edmonton, AB T5C 1R9"],
    streetAddress: "8103 127 Ave NW #17",
    addressLocality: "Edmonton",
    addressRegion: "AB",
    postalCode: "T5C 1R9",
    addressCountry: "CA",
    serviceArea:
      "Primary care and walk-in medical visits for Edmonton patients and families.",
    phone: "(587) 415-1251",
    phoneHref: "tel:+15874151251",
    bookingHref: "https://qstb8.healthquest.ca:3000/onlinebooking",
    mapEmbedUrl:
      "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=8103%20127%20Ave%20NW%20%2317%20Edmonton%20AB%20T5C%201R9&t=&z=15&ie=UTF8&iwloc=B&output=embed",
    directionsHref:
      "https://www.google.com/maps/dir/?api=1&destination=8103%20127%20Ave%20NW%20%2317%20Edmonton%20AB%20T5C%201R9",
    hours: [
      "Mon-Fri: 9:00 a.m. - 5:00 p.m.",
      "Sat: 10:00 a.m. - 2:00 p.m.",
      "Sun: Closed",
    ],
    schemaHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      {
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
  },
];

const primaryLocation = clinicLocations[0];

const doctors: DoctorProfile[] = [
  {
    slug: "dr-kingsley",
    name: "Dr. Kingsley",
    fullName: "Dr. Kingsley Lasing",
    title: "Family Physician",
    clinicName: "Beverly Medical Doctors",
    locationId: "beverly-medical-center",
    intro:
      "A UK-trained family physician known for a patient-centered approach to family medicine, prevention, chronic disease care, and long-term health planning.",
    biography: [
      "Dr. Kingsley is a UK-trained family physician who received his Primary Medical Qualification from the University of Jos, Nigeria, in 2012. After practising medicine in diverse clinical settings, he moved to the United Kingdom, where he completed his Family Medicine training.",
      "His approach to care is centred on listening carefully, understanding each person's full story, and working collaboratively toward practical steps for better health and quality of life.",
      "He provides general medical care for children, adults, older adults, and families who want an accessible family doctor relationship in Edmonton.",
    ],
    focusAreas: [
      "Alberta Health-registered PrEP provider",
      "Weight management",
      "Opioid use disorder treatment",
      "Cardiovascular risk management",
      "Raised blood pressure, cholesterol, blood sugars, and fatty liver",
      "Elderly care and frailty",
      "Mental health difficulties",
    ],
    languages: ["English"],
    status: "accepting",
    statusLabel: "Accepting New Patients",
    image: medicalImages.drKingsleyPortrait,
  },
  {
    slug: "dr-nosa",
    name: "Dr. Nosa",
    fullName: "Dr. Nosakhare Lawrence Ologbosere",
    title: "Full-Scope Family Medicine",
    clinicName: "Beverly Medical Doctors",
    locationId: "beverly-medical-center",
    intro:
      "A compassionate family physician serving Beverly, East Edmonton, North Edmonton, and Sherwood Park with warm, clear, patient-centered care.",
    biography: [
      "Dr. Nosakhare Lawrence Ologbosere, widely known as Dr. Nosa, provides full-scope family medicine with a focus on attentive listening, clear communication, and practical care for patients and families.",
    ],
    focusAreas: ["Full-scope family medicine", "Walk-in care", "Family practice"],
    languages: ["English"],
    status: "walk-in-family-practice",
    statusLabel: "Accepting Walk-In And Family Practice Patients",
    image: medicalImages.drNosaPortrait,
  },
  {
    slug: "dr-asim-bilal",
    name: "Dr. Asim Bilal",
    fullName: "Dr. Asim Bilal, MD",
    title: "Family Physician",
    clinicName: "Balwin Medical Clinic Doctors",
    locationId: "balwin-medical-centre",
    intro:
      "A seasoned family physician with 20+ years of international medical experience across emergency medicine, family medicine, and chronic disease care.",
    biography: [
      "Dr. Asim Bilal brings more than two decades of medical experience from Pakistan, Oman, Australia, Ireland, and the United Kingdom, including emergency medicine and family medicine training.",
    ],
    focusAreas: [
      "Family Medicine",
      "Emergency Medicine",
      "Menopause",
      "Andropause",
      "Depression",
      "Type 2 Diabetes",
      "Hypertension",
      "Insomnia",
      "Pediatric Care",
      "Chronic Disease Management",
    ],
    languages: ["English"],
    status: "accepting",
    statusLabel: "Now Accepting New Patients",
    profileUrl: "https://balwinmedical.ca/our-doctors/dr-asim-bilal-md",
    image: medicalImages.drAsimPortrait,
  },
  {
    slug: "dr-olatayo-idowu-araade",
    name: "Dr. Olatayo Idowu-Araade",
    fullName: "Dr. Olatayo Idowu-Araade, MD",
    title: "Family Physician | Walk-In | Women's Health",
    clinicName: "Balwin Medical Clinic Doctors",
    locationId: "balwin-medical-centre",
    intro:
      "A dedicated family physician focused on culturally sensitive, evidence-based, patient-centered primary care and women's health.",
    biography: [
      "Dr. Olatayo Idowu-Araade provides comprehensive primary care with an emphasis on strong patient relationships, prevention, chronic disease management, women's health, and mental health support.",
    ],
    focusAreas: [
      "Comprehensive primary care",
      "Chronic disease management",
      "Women's health",
      "Preventive medicine",
      "Mental health support",
    ],
    languages: ["English", "Yoruba"],
    status: "accepting",
    statusLabel: "Now Accepting New Patients",
    profileUrl: "https://balwinmedical.ca/our-doctors/dr-olatayo-idowu-araade-md",
    image: medicalImages.drOlatayoPortrait,
  },
  {
    slug: "dr-sameer-sardesai",
    name: "Dr. Sameer Sardesai",
    fullName: "Dr. Sameer Sardesai, MD",
    title: "Family Physician",
    clinicName: "Balwin Medical Clinic Doctors",
    locationId: "balwin-medical-centre",
    intro:
      "A compassionate, detail-oriented family physician offering primary care in North Edmonton with an interest in family medicine and cosmetic services.",
    biography: [
      "Dr. Sameer Sardesai is known for a professional, patient-centered approach, strong communication, and a commitment to long-term relationships with patients and families.",
    ],
    focusAreas: ["Family Medicine", "Cosmetic Services"],
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
    status: "aesthetics",
    statusLabel: "Book Your Aesthetic Consultation",
    profileUrl: "https://balwinmedical.ca/our-doctors/dr-sameer-sardesai-md",
    image: medicalImages.drSameerPortrait,
  },
  {
    slug: "dr-rahul-chaturvedi",
    name: "Dr. Rahul Chaturvedi",
    fullName: "Dr. Rahul Chaturvedi, MD",
    title: "Family Physician",
    clinicName: "Balwin Medical Clinic Doctors",
    locationId: "balwin-medical-centre",
    intro:
      "An experienced family physician with a dedicated clinical focus on mental health care, emotional wellness, and calm, empathetic support.",
    biography: [
      "Dr. Rahul Chaturvedi supports patients dealing with depression, anxiety, ADHD, stress-related conditions, and emotional wellness needs through a safe and supportive clinical approach.",
    ],
    focusAreas: ["Mental Health"],
    languages: ["English", "Hindi", "Punjabi", "Tamil", "Urdu"],
    status: "not-accepting",
    statusLabel: "Not Accepting New Patients",
    profileUrl: "https://balwinmedical.ca/our-doctors/dr-rahul-chaturvedi-md",
    image: medicalImages.drRahulPortrait,
  },
];

export const businessConfig = {
  businessName: configuredBusinessName,
  description:
    "Edmonton Doctors connects patients with family doctors and walk-in clinic care in Edmonton, including new patient registration with no waitlist at participating locations.",
  market: configuredMarket,
  assets: brandAssetConfig,
  theme: businessTheme,
  navItems,
  announcement: {
    enabled: true,
    id: "new-patient-registration-announcement",
    ariaLabel: "Edmonton Doctors new patient registration announcement",
    alertLabel: "Register Now, No Waitlist",
    shortAlertLabel: "Register Now",
  },
  locations: clinicLocations,
  primaryLocationId: primaryLocation.id,
  contactMethods: [
    {
      label: "Register Online",
      value: "New Patient Registration",
      description:
        "Send a minimal registration request and the clinic team will follow up with next steps.",
      href: registrationHref,
    },
    {
      label: "Call Beverly",
      value: primaryLocation.phone,
      description:
        "Call Beverly Medical Center & Walk-In for registration and clinic availability.",
      href: primaryLocation.phoneHref,
    },
    {
      label: "Call Balwin",
      value: clinicLocations[1].phone,
      description:
        "Call Balwin Medical Centre for hours, walk-in availability, and care questions.",
      href: clinicLocations[1].phoneHref,
    },
  ],
  socialLinks: [] as SocialLink[],
  doctors,
  media: {
    heroImage: medicalImages.heroClinic,
    doctorConsultationImage: medicalImages.doctorConsultation,
    doctorPortraitImage: medicalImages.drKingsleyPortrait,
    clinicReceptionImage: medicalImages.clinicReception,
    galleryImages: [
      medicalImages.heroClinic,
      medicalImages.doctorConsultation,
      medicalImages.clinicReception,
      medicalImages.walkInCareConsultation,
    ],
  },
  content: {
    header: {
      ctaLabel: "Register Now",
      ctaHref: registrationHref,
    },
    hero: {
      eyebrow: "Register Now, No Waitlist",
      heading: "Family Doctors in Edmonton Accepting New Patients",
      description:
        "Finding a family doctor accepting new patients in Edmonton can feel frustrating, but you are finally in the right place. Edmonton Doctors helps patients register for accessible family medicine and walk-in clinic care across Edmonton.",
      primaryCtaLabel: "Register Now",
      primaryCtaHref: registrationHref,
      secondaryCtaLabel: "Meet The Doctors",
      secondaryCtaHref: "/family-doctor/",
      highlights: [
        { value: "No Waitlist", label: "new patient registration available" },
        { value: "2 Clinics", label: "Edmonton care options listed clearly" },
        { value: "Walk-Ins", label: "welcome at participating clinics" },
      ],
    },
    about: {
      eyebrow: "Meet Your New Family Doctor in Edmonton",
      heading: "Doctor Officially Accepting New Patients",
      description:
        "Dr. Kingsley is welcoming new patients with an approach rooted in prevention, long-term health, and personalized treatment. Whether you are new to the area, switching doctors, or registering your household, this is your opportunity to join a clinic focused on accessible, patient-centered care.",
      primaryCtaLabel: "Register Now, While Spots Last",
      primaryCtaHref: registrationHref,
      secondaryCtaLabel: "View Locations",
      secondaryCtaHref: "/locations/",
      promotion: {
        heading: "Register Now, No Waitlist",
      },
      visual: medicalImages.doctorConsultation,
      highlights: [
        {
          title: "Full-Scope Family Care",
          description:
            "Comprehensive primary care for children, adults, seniors, and families.",
        },
        {
          title: "Prevention First",
          description:
            "Support for checkups, screenings, risk management, and long-term health planning.",
        },
        {
          title: "Flexible Access",
          description:
            "Registration, appointments, and walk-in options across Edmonton clinic locations.",
        },
        {
          title: "One Convenient Stop",
          description:
            "Beverly Medical Center offers convenient access beside pharmacy and travel clinic services.",
        },
      ],
    },
    doctor: {
      eyebrow: "Family Doctor Accepting Patients",
      heading: "Meet Dr. Kingsley - Now Accepting New Patients in Edmonton",
      description:
        "Dr. Kingsley takes time to understand each patient's full story, what matters most to them, and how care can be tailored to their life and family context.",
      ctaLabel: "Start Registration",
      ctaHref: registrationHref,
    },
    featuredServices: {
      eyebrow: "Our Family Doctor Services",
      heading: "Primary Care Designed For Every Stage Of Life",
      description:
        "No more endless calls and waitlists. Edmonton Doctors highlights practical family medicine and walk-in clinic services for patients across the city.",
    },
    access: {
      eyebrow: "Edmonton, We Are Dedicated To Your Care",
      heading: "Convenient Access To Doctors And Walk-In Clinics",
      description:
        "The site framework keeps registration, service pages, doctor information, and location details easy to find from every page.",
      cards: [
        {
          title: "Family Doctors Accepting Patients",
          description:
            "Clear registration paths for patients looking for a long-term family physician in Edmonton.",
          href: "/family-doctor/",
        },
        {
          title: "Walk-In Clinic Care",
          description:
            "Location information and care options for patients who need timely medical attention.",
          href: "/walk-in/",
        },
        {
          title: "Registration Support",
          description:
            "A minimal online lead form helps clinics follow up without collecting sensitive medical intake online.",
          href: registrationHref,
        },
      ],
    },
    services: {
      eyebrow: "Service List",
      heading: "Family Medicine, Walk-In Care, And Preventative Health",
      description:
        "Explore common primary care services including checkups, vaccinations, chronic disease management, acute care, mental health support, and women's health care.",
      itemCountLabel: "Services",
    },
    process: {
      eyebrow: "Ready To Register?",
      heading: "Spots Are Limited",
      description:
        "Fill out the simple form to request registration. The clinic team will confirm availability, preferred location, and next steps.",
      steps: [
        {
          title: "Send A Request",
          description:
            "Share contact details, preferred clinic, family size, and general appointment needs.",
        },
        {
          title: "Clinic Review",
          description:
            "The team reviews availability and determines the best follow-up path.",
        },
        {
          title: "Confirm Details",
          description:
            "Staff contact you to confirm registration steps and appointment options.",
        },
        {
          title: "Begin Care",
          description:
            "Start with a family doctor or clinic visit suited to your current needs.",
        },
      ],
      ctaLabel: "Take Me To The Registration Form",
      ctaHref: registrationHref,
    },
    locations: {
      eyebrow: "Edmonton Clinic Locations",
      heading: "Choose The Clinic That Works For You",
      description:
        "Compare the Edmonton locations below and choose the clinic that is closest or easiest for your schedule. You can call directly, check current hours, or open directions.",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Register Or Contact A Clinic",
      description:
        "Use the registration form or call the clinic location that best fits your needs.",
      hoursHeading: "Hours",
      detailsHeading: "Clinic Details",
      primaryCtaLabel: "Register Online",
      secondaryCtaLabel: "Call Beverly",
    },
    footer: {
      description:
        "Finding a family doctor accepting new patients in Edmonton should not be this hard. Edmonton Doctors connects patients with participating doctors and clinics accepting patients now.",
      contactHeading: "Locations",
      socialHeading: "Useful Links",
      servicesIntro:
        "Family medicine, walk-in clinic care, patient registration, preventative care, and chronic disease support in Edmonton.",
      serviceLinks: [
        {
          label: "Edmonton Family Doctors Accepting Patients",
          href: "/family-doctor/",
        },
        { label: "Patient Registration Form", href: registrationHref },
        { label: "Walk-In Clinic Edmonton", href: "/walk-in/" },
      ],
      copyrightSuffix: "All rights reserved.",
    },
  },
} satisfies BusinessConfig;

export function formatBusinessTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    values[key] === undefined ? match : String(values[key]),
  );
}

export const businessName = businessConfig.businessName;
export const siteDescription = businessConfig.description;
export const brandAssets = businessConfig.assets;
export const clinicLocationList = businessConfig.locations;
export const primaryClinicLocation = primaryLocation;
export const businessLocation = primaryClinicLocation;
export const doctorProfiles = businessConfig.doctors;
export const contactMethods = businessConfig.contactMethods;
export const socialLinks = businessConfig.socialLinks;
export const announcement = businessConfig.announcement;
export const homeContent = businessConfig.content;
export const themeStyle = businessConfig.theme.cssVariables as CSSProperties;
export { navItems };
