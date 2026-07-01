import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClinicServicePageTemplate from "../../../components/shared/ClinicServicePageTemplate";
import { buildPageMetadata } from "../../../lib/seo/metadata";
import {
  allClinicServicePages,
  getClinicServicePage,
} from "../../../lib/sitePages";

type ServiceRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return allClinicServicePages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getClinicServicePage(slug);

  if (!page) {
    return {};
  }

  return buildPageMetadata(page);
}

export default async function ServiceDetailPage({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const page = getClinicServicePage(slug);

  if (!page) {
    notFound();
  }

  return <ClinicServicePageTemplate page={page} />;
}
