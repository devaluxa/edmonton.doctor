import { medicalImages } from "./business/config";
import type { ClinicServicePage } from "./sitePages";

export type ServiceHeroVisual = {
  src: string;
  alt: string;
  label: string;
};

const defaultServiceVisual: ServiceHeroVisual = {
  src: medicalImages.clinicReception.src,
  alt: medicalImages.clinicReception.alt,
  label: "Edmonton Doctors",
};

const serviceVisualsBySlug: Record<string, ServiceHeroVisual> = {
  "family-medicine-edmonton": {
    src: medicalImages.doctorConsultation.src,
    alt: "Family doctor speaking with a patient in a calm consultation room in Edmonton",
    label: "Family Medicine",
  },
  "new-patient-registration": {
    src: medicalImages.heroClinic.src,
    alt: medicalImages.heroClinic.alt,
    label: "Patient Registration",
  },
  "checkups-physicals": {
    src: medicalImages.doctorConsultation.src,
    alt: medicalImages.doctorConsultation.alt,
    label: "Checkups",
  },
  "vaccinations-preventative-care": {
    src: medicalImages.clinicReception.src,
    alt: medicalImages.clinicReception.alt,
    label: "Preventive Care",
  },
  "chronic-disease-management": {
    src: medicalImages.doctorConsultation.src,
    alt: medicalImages.doctorConsultation.alt,
    label: "Chronic Care",
  },
  "acute-illness-injury-treatment": {
    src: medicalImages.clinicReception.src,
    alt: medicalImages.clinicReception.alt,
    label: "Acute Care",
  },
  "prescription-renewals": {
    src: medicalImages.walkInCareConsultation.src,
    alt: medicalImages.walkInCareConsultation.alt,
    label: "Prescription Renewals",
  },
  "mental-health-support": {
    src: medicalImages.doctorConsultation.src,
    alt: medicalImages.doctorConsultation.alt,
    label: "Mental Health",
  },
  "womens-health-edmonton": {
    src: "https://res.cloudinary.com/dcb389szc/image/upload/f_auto,q_auto,w_1000,c_fill,ar_1:1/v1782974897/EdmontonDoctors/womens_health_1.png",
    alt: "Women's health care at Edmonton Doctors",
    label: "Women's Health",
  },
  "pap-tests-cervical-screening": {
    src: "https://res.cloudinary.com/dcb389szc/image/upload/f_auto,q_auto,w_1000,c_fill,ar_1:1/v1782974897/EdmontonDoctors/womens_health_1.png",
    alt: "Women's health care at Edmonton Doctors",
    label: "Cervical Screening",
  },
  "birth-control-contraception": {
    src: "https://res.cloudinary.com/dcb389szc/image/upload/f_auto,q_auto,w_1000,c_fill,ar_1:1/v1782974897/EdmontonDoctors/womens_health_1.png",
    alt: "Women's health consultation at Edmonton Doctors",
    label: "Birth Control",
  },
  "prenatal-counselling": {
    src: medicalImages.doctorConsultation.src,
    alt: medicalImages.doctorConsultation.alt,
    label: "Prenatal Counselling",
  },
  "sti-testing": {
    src: "https://res.cloudinary.com/dcb389szc/image/upload/f_auto,q_auto,w_1000,c_fill,ar_1:1/v1782974897/EdmontonDoctors/womens_health_1.png",
    alt: "Confidential women's health care at Edmonton Doctors",
    label: "STI Testing",
  },
};

export const servicesIndexVisual: ServiceHeroVisual = {
  src: medicalImages.clinicReception.src,
  alt: medicalImages.clinicReception.alt,
  label: "Clinic Services",
};

export const walkInPageVisual: ServiceHeroVisual = {
  src: medicalImages.walkInCareConsultation.src,
  alt: medicalImages.walkInCareConsultation.alt,
  label: "Walk-In Clinic",
};

export const registrationPageVisual: ServiceHeroVisual = {
  src: medicalImages.heroClinic.src,
  alt: medicalImages.heroClinic.alt,
  label: "Registration",
};

export const doctorPageVisual: ServiceHeroVisual = {
  src: medicalImages.doctorConsultation.src,
  alt: medicalImages.doctorConsultation.alt,
  label: "Family Physician",
};

export const faqPageVisual: ServiceHeroVisual = {
  src: medicalImages.clinicReception.src,
  alt: medicalImages.clinicReception.alt,
  label: "Patient Questions",
};

export const contactPageVisual: ServiceHeroVisual = {
  src: medicalImages.clinicReception.src,
  alt: medicalImages.clinicReception.alt,
  label: "Contact Clinics",
};

export function getServiceHeroVisual(
  page: ClinicServicePage,
): ServiceHeroVisual {
  return serviceVisualsBySlug[page.slug] || defaultServiceVisual;
}
