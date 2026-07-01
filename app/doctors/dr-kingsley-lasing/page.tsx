import type { Metadata } from "next";
import LegacyMovedPage from "../../../components/shared/LegacyMovedPage";

export const metadata: Metadata = {
  title: "Doctor Page Moved | Edmonton Doctors",
  description:
    "The Edmonton Doctors individual doctor page has moved to the family doctor directory.",
  alternates: {
    canonical: "/family-doctor/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyDrKingsleyPage() {
  return (
    <LegacyMovedPage
      eyebrow="Page Moved"
      heading="Doctor Profiles Are Now In One Directory"
      description="This individual doctor page has moved. Use the family doctor directory to compare Beverly and Balwin doctors."
      newHref="/family-doctor/"
      newLabel="View Family Doctors"
    />
  );
}
