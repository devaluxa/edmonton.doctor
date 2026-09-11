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
import BlogCards from "../../components/shared/BlogCards";
import { PageSection, SectionHeader } from "../../components/shared/PageSystem";
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
      <PageSection>
        <SectionHeader eyebrow="Blog & News" heading="Helpful guides for your next visit" intro="Learn about finding a family doctor, choosing care, and preparing for a health checkup." />
        <BlogCards />
        <a className="medical-button medical-button-secondary mt-8" href="/blog/">Visit Blog & News</a>
      </PageSection>
      <HomeFinalCta />
    </main>
  );
}
