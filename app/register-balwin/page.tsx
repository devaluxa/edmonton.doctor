import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/seo/metadata";
import { corePages } from "../../lib/sitePages";
import RegistrationPageView from "../register/RegistrationPageView";

const page = {
  ...corePages.patientRegistration,
  path: "/register-balwin/",
  title: "Balwin Patient Registration | Edmonton Doctors",
  description:
    "Request new patient registration with Balwin Medical Centre through Edmonton Doctors.",
  eyebrow: "Balwin Registration",
  heading: "Register With Balwin Medical Centre",
  intro:
    "Send a minimal registration request for Balwin Medical Centre. The clinic team will follow up with next steps.",
};

export const metadata: Metadata = buildPageMetadata(page);

export default function BalwinRegistrationPage() {
  return (
    <RegistrationPageView
      breadcrumbLabel="Balwin Registration"
      initialPreferredLocation="balwin-medical-centre"
      page={page}
    />
  );
}
