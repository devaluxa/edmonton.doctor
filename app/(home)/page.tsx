import type { Metadata } from "next";
import JsonLd from "../../components/seo/JsonLd";
import { buildPageMetadata } from "../../lib/seo/metadata";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildMedicalClinicJsonLd,
  buildPhysicianJsonLd,
  buildWebPageJsonLd,
  buildWebsiteJsonLd,
} from "../../lib/seo/schema";
import { homePageSeo } from "../../lib/sitePages";
import HomeDoctorIntro from "./_sections/HomeDoctorIntro";
import HomeFaq from "./_sections/HomeFaq";
import HomeFinalCta from "./_sections/HomeFinalCta";
import HomeHero from "./_sections/HomeHero";
import HomeLocations from "./_sections/HomeLocations";
import HomeProcess from "./_sections/HomeProcess";
import HomeServicesPreview from "./_sections/HomeServicesPreview";

export const metadata: Metadata = buildPageMetadata(homePageSeo);

export default function Home() {
  const breadcrumbs = [{ label: "Home", href: "/" }];

  return (
    <main className="medical-page">
      <JsonLd
        data={[
          buildMedicalClinicJsonLd(),
          buildPhysicianJsonLd(),
          buildWebsiteJsonLd(),
          buildWebPageJsonLd(homePageSeo, breadcrumbs),
          buildBreadcrumbJsonLd(breadcrumbs),
          buildFaqPageJsonLd(),
        ]}
      />
      <HomeHero />
      <HomeProcess />
      <HomeDoctorIntro />
      <HomeServicesPreview />
      <HomeLocations />
      <HomeFaq />
      <HomeFinalCta />
    </main>
  );
}
