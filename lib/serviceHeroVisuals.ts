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
  "family-medicine": {
    src: medicalImages.doctorConsultation.src,
    alt: medicalImages.doctorConsultation.alt,
    label: "Family Medicine",
  },
  "walk-in-care": {
    src: medicalImages.walkInCareConsultation.src,
    alt: medicalImages.walkInCareConsultation.alt,
    label: "Walk-In Care",
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
    label: "Preventative Care",
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
  "mental-health-support": {
    src: medicalImages.doctorConsultation.src,
    alt: medicalImages.doctorConsultation.alt,
    label: "Mental Health",
  },
  "womens-mens-childrens-health": {
    src: medicalImages.heroClinic.src,
    alt: medicalImages.heroClinic.alt,
    label: "Family Health",
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
  label: "Walk-In Care",
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
