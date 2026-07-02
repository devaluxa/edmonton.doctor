import type { Metadata } from "next";
import LegacyMovedPage from "../../../components/shared/LegacyMovedPage";

export const metadata: Metadata = {
  title: "Women's Health Page Moved | Edmonton Doctors",
  description:
    "This page has moved to the women's health clinic Edmonton service page.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/services/womens-health-edmonton/",
  },
};

export default function WomensMensChildrensHealthMovedPage() {
  return (
    <LegacyMovedPage
      eyebrow="Page Moved"
      heading="Women's Health Has A New Page"
      description="This older mixed health page has moved to a dedicated women's health page for Edmonton, North Edmonton, Northeast Edmonton, Beverly, and Balwin patients."
      newHref="/services/womens-health-edmonton/"
      newLabel="View Women's Health"
    />
  );
}
