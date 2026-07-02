import {
  businessConfig,
  clinicLocationList,
  doctorProfiles,
  medicalImages,
  socialLinks,
} from "../business/config";
import { absoluteUrl } from "./metadata";
import {
  businessName,
  faqItems,
  siteUrl,
  type BreadcrumbItem,
  type ClinicServicePage,
  type FaqItem,
  type SeoConfig,
} from "../sitePages";

type JsonObject = Record<string, unknown>;

const medicalOrganizationId = `${siteUrl}/#medical-organization`;
const websiteId = `${siteUrl}/#website`;

function locationId(id: string) {
  return `${siteUrl}/#${id}`;
}

function doctorId(name: string) {
  return `${siteUrl}/#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function buildMedicalClinicJsonLd(): JsonObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": medicalOrganizationId,
        name: businessName,
        url: siteUrl,
        description: businessConfig.description,
        image: absoluteUrl(medicalImages.heroClinic.src),
        medicalSpecialty: ["FamilyMedicine", "PrimaryCare"],
        areaServed: {
          "@type": "City",
          name: "Edmonton",
        },
        sameAs: socialLinks.map((link) => link.href),
        department: clinicLocationList.map((location) => ({
          "@id": locationId(location.id),
        })),
      },
      ...clinicLocationList.map((location) => ({
        "@type": "MedicalClinic",
        "@id": locationId(location.id),
        name: location.name,
        url: siteUrl,
        telephone: location.phone,
        image: absoluteUrl(medicalImages.clinicReception.src),
        description: location.serviceArea,
        address: {
          "@type": "PostalAddress",
          streetAddress: location.streetAddress,
          addressLocality: location.addressLocality,
          addressRegion: location.addressRegion,
          postalCode: location.postalCode,
          addressCountry: location.addressCountry,
        },
        openingHoursSpecification: location.schemaHours.map((hours) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: hours.dayOfWeek,
          opens: hours.opens,
          closes: hours.closes,
        })),
        medicalSpecialty: ["FamilyMedicine", "PrimaryCare"],
        parentOrganization: {
          "@id": medicalOrganizationId,
        },
      })),
    ],
  };
}

export function buildPhysicianJsonLd(): JsonObject {
  return {
    "@context": "https://schema.org",
    "@graph": doctorProfiles.map((doctor) => ({
      "@type": "Physician",
      "@id": doctorId(doctor.name),
      name: doctor.name,
      jobTitle: doctor.title,
      description: doctor.intro,
      knowsLanguage: doctor.languages,
      sameAs: doctor.profileUrl ? [doctor.profileUrl] : undefined,
      medicalSpecialty: "FamilyMedicine",
      worksFor: {
        "@id": locationId(doctor.locationId),
      },
      areaServed: {
        "@type": "City",
        name: "Edmonton",
      },
    })),
  };
}

export function buildWebsiteJsonLd(): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: businessName,
    url: siteUrl,
    publisher: {
      "@id": medicalOrganizationId,
    },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildWebPageJsonLd(
  page: SeoConfig,
  breadcrumbs: BreadcrumbItem[],
): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": medicalOrganizationId,
    },
    breadcrumb: breadcrumbs.length
      ? {
          "@id": `${absoluteUrl(page.path)}#breadcrumb`,
        }
      : undefined,
  };
}

export function buildMedicalServiceJsonLd(page: ClinicServicePage): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    name: page.heading,
    serviceType: page.serviceType,
    description: page.description,
    url: absoluteUrl(page.path),
    provider: {
      "@id": medicalOrganizationId,
    },
    areaServed: {
      "@type": "City",
      name: "Edmonton",
    },
  };
}

export function buildFaqPageJsonLd(items: FaqItem[] = faqItems): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
