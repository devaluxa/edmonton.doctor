import type { Metadata } from "next";
import LegacyMovedPage from "../../components/shared/LegacyMovedPage";

export const metadata: Metadata = {
  title: "Walk-In Clinic Page Moved | Edmonton Doctors",
  description:
    "The Edmonton Doctors walk-in clinic page has moved to a shorter URL.",
  alternates: {
    canonical: "/walk-in/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyWalkInPage() {
  return (
    <LegacyMovedPage
      eyebrow="Page Moved"
      heading="Walk-In Clinic Has A New URL"
      description="This page has moved to the shorter walk-in URL. Use the new page to compare walk-in clinic care, hours, and locations."
      newHref="/walk-in/"
      newLabel="Go To Walk-In Clinic"
    />
  );
}
