import { clinicLocationList, doctorProfiles } from "./business/config";

export const clinicPages = [
  {
    slug: "beverly-medical-center",
    locationId: "beverly-medical-center",
    path: "/locations/beverly-medical-center/",
    title: "Beverly Medical Center | Family Doctor in Northeast Edmonton",
    description:
      "Find Beverly Medical Center & Walk-In at 3347 118 Ave NW in Edmonton. View family doctor information, clinic hours, directions, and registration options.",
    heading: "Beverly Medical Center & Walk-In",
    area: "Northeast Edmonton",
    intro:
      "Family medicine and walk-in care on 118 Avenue in Beverly. Review Dr. Kingsley's information, check the clinic hours, and contact the team about becoming a patient.",
    visit:
      "Beverly Medical Center is at 3347 118 Ave NW in Edmonton. The clinic lists family medicine, walk-in visits, pharmacy access, and travel clinic support. Call the clinic to confirm the service and appointment arrangements you need before visiting.",
    registrationPath: "/register-bev/",
  },
  {
    slug: "balwin-medical-centre",
    locationId: "balwin-medical-centre",
    path: "/locations/balwin-medical-centre/",
    title: "Balwin Medical Centre | Family Doctor in North Edmonton",
    description:
      "Find Balwin Medical Centre at 8103 127 Ave NW, Unit 17, Edmonton. Compare family physicians, languages, new-patient options, hours, and directions.",
    heading: "Balwin Medical Centre",
    area: "North Edmonton",
    intro:
      "Compare family physicians at Balwin Medical Centre on 127 Avenue. Find each doctor's languages and intake status, then contact the clinic or request registration with your preferred physician.",
    visit:
      "Balwin Medical Centre is at 8103 127 Ave NW, Unit 17, in North Edmonton. The clinic provides family medicine and walk-in medical visits. Physician schedules and new-patient availability vary, so confirm the appropriate doctor and visit type with the clinic.",
    registrationPath: "/register-balwin/",
  },
] as const;

export function clinicPath(locationId: string) {
  return (
    clinicPages.find((page) => page.locationId === locationId)?.path ||
    "/locations/"
  );
}

export function getClinicPage(slug: string) {
  const page = clinicPages.find((entry) => entry.slug === slug);
  if (!page) return undefined;
  const location = clinicLocationList.find(
    (entry) => entry.id === page.locationId,
  );
  if (!location) return undefined;
  return {
    ...page,
    location,
    doctors: doctorProfiles.filter(
      (doctor) => doctor.locationId === page.locationId,
    ),
  };
}

export const kingsleyPage = {
  path: "/doctors/dr-kingsley-lasing/",
  title: "Dr. Kingsley Lasing | Family Doctor in Edmonton",
  description:
    "Meet Dr. Kingsley Lasing, a family physician at Beverly Medical Center in Edmonton. Learn about his care interests, languages, location, and new-patient registration.",
};
