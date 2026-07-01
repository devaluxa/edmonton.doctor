import { CtaBand, PageSection } from "./PageSystem";

type LegacyMovedPageProps = {
  eyebrow: string;
  heading: string;
  description: string;
  newHref: string;
  newLabel: string;
};

export default function LegacyMovedPage({
  eyebrow,
  heading,
  description,
  newHref,
  newLabel,
}: LegacyMovedPageProps) {
  return (
    <main className="medical-page">
      <PageSection>
        <CtaBand
          eyebrow={eyebrow}
          heading={heading}
          description={description}
          primaryAction={{
            href: newHref,
            label: newLabel,
          }}
        />
      </PageSection>
    </main>
  );
}
