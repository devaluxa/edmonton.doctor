import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/seo/metadata";
import { corePages } from "../../lib/sitePages";
import RegistrationPageView from "./RegistrationPageView";

export const metadata: Metadata = buildPageMetadata(
  corePages.patientRegistration,
);

export default function PatientRegistrationPage() {
  return (
    <RegistrationPageView
      breadcrumbLabel="Patient Registration"
      page={corePages.patientRegistration}
    />
  );
}
