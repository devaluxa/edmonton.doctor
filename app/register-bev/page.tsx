import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/seo/metadata";
import { corePages } from "../../lib/sitePages";
import RegistrationPageView from "../register/RegistrationPageView";

const page = {
  ...corePages.patientRegistration,
  path: "/register-bev/",
  title: "Beverly Patient Registration | Edmonton Doctors",
  description:
    "Request new patient registration with Beverly Medical Center & Walk-In through Edmonton Doctors.",
  eyebrow: "Beverly Registration",
  heading: "Register With Beverly Medical Center",
  intro:
    "Send a minimal registration request for Beverly Medical Center & Walk-In. The clinic team will follow up with next steps.",
};

export const metadata: Metadata = buildPageMetadata(page);

export default function BeverlyRegistrationPage() {
  return (
    <RegistrationPageView
      breadcrumbLabel="Beverly Registration"
      initialPreferredLocation="beverly-medical-center"
      page={page}
    />
  );
}
