import type { Metadata } from "next";
import LegacyMovedPage from "../../components/shared/LegacyMovedPage";

export const metadata: Metadata = {
  title: "Family Doctor Page Moved | Edmonton Doctors",
  description:
    "The Edmonton Doctors family doctor page has moved to a shorter URL.",
  alternates: {
    canonical: "/family-doctor/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyFamilyDoctorsPage() {
  return (
    <LegacyMovedPage
      eyebrow="Page Moved"
      heading="Family Doctors Has A New URL"
      description="This page has moved to the shorter family doctor URL. Use the new page to compare Edmonton family doctors and registration options."
      newHref="/family-doctor/"
      newLabel="Go To Family Doctors"
    />
  );
}
