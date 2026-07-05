import type { Metadata } from "next";
import LegacyMovedPage from "../../../components/shared/LegacyMovedPage";

export const metadata: Metadata = {
  title: "Family Medicine Page Moved | Edmonton Doctors",
  description:
    "The Edmonton Doctors family medicine service page has moved to the Edmonton family medicine URL.",
  alternates: {
    canonical: "/services/family-medicine-edmonton/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyFamilyMedicineServicePage() {
  return (
    <LegacyMovedPage
      eyebrow="Page Moved"
      heading="Family Medicine Has A New URL"
      description="This service page has moved to the updated Family Medicine in Edmonton page for ongoing primary care, prevention, medication reviews, screening guidance, and care planning."
      newHref="/services/family-medicine-edmonton/"
      newLabel="View Family Medicine"
    />
  );
}
