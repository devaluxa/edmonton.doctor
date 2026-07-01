import type { Metadata } from "next";
import LegacyMovedPage from "../../components/shared/LegacyMovedPage";

export const metadata: Metadata = {
  title: "Registration Page Moved | Edmonton Doctors",
  description:
    "The Edmonton Doctors patient registration page has moved to a shorter URL.",
  alternates: {
    canonical: "/register/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyPatientRegistrationPage() {
  return (
    <LegacyMovedPage
      eyebrow="Page Moved"
      heading="Registration Has A New URL"
      description="This page has moved to the shorter registration URL. Use the new page to request patient registration."
      newHref="/register/"
      newLabel="Go To Registration"
    />
  );
}
