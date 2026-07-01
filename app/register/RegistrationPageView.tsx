import JsonLd from "../../components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildMedicalClinicJsonLd,
  buildWebPageJsonLd,
} from "../../lib/seo/schema";
import { type SitePage } from "../../lib/sitePages";
import RegisterFunnel from "./RegisterFunnel";

type RegistrationPageViewProps = {
  page: SitePage;
  breadcrumbLabel: string;
  initialPreferredLocation?: string;
};

export default function RegistrationPageView({
  page,
  breadcrumbLabel,
  initialPreferredLocation,
}: RegistrationPageViewProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: breadcrumbLabel, href: page.path },
  ];

  return (
    <main className="medical-page">
      <JsonLd
        data={[
          buildMedicalClinicJsonLd(),
          buildWebPageJsonLd(page, breadcrumbs),
          buildBreadcrumbJsonLd(breadcrumbs),
        ]}
      />
      <RegisterFunnel initialPreferredLocation={initialPreferredLocation} />
    </main>
  );
}
