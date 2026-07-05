import type { Metadata } from "next";
import LegacyMovedPage from "../../../components/shared/LegacyMovedPage";

export const metadata: Metadata = {
  title: "Walk-In Care Page Moved | Edmonton Doctors",
  description:
    "The Edmonton Doctors walk-in care service page now points to the main walk-in clinic page.",
  alternates: {
    canonical: "/walk-in/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyWalkInCareServicePage() {
  return (
    <LegacyMovedPage
      eyebrow="Page Moved"
      heading="Walk-In Care Has Moved"
      description="This service page has been consolidated into the main Walk-In Clinic page. Use the Walk-In Clinic page for current clinic contacts, hours, visit reasons, and next steps."
      newHref="/walk-in/"
      newLabel="Go To Walk-In Clinic"
    />
  );
}
