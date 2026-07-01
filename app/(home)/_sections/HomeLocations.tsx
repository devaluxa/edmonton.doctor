import ClinicLocationCards from "../../../components/shared/ClinicLocationCards";
import { clinicLocationList, homeContent } from "../../../lib/business/config";
import { Reveal } from "../_components/Reveal";
import styles from "./HomeLocations.module.css";

const homepageLocations = clinicLocationList.map((location) => {
  const homepageCopy: Record<string, { name?: string; serviceArea?: string }> = {
    "beverly-medical-center": {
      serviceArea:
        "Family medicine, walk-in visits, patient registration, and pharmacy access.",
    },
    "balwin-medical-centre": {
      name: "Balwin Medical Centre",
    },
  };
  const copy = homepageCopy[location.id] ?? {};

  return {
    ...location,
    ...copy,
    addressLines: [`${location.streetAddress}, ${location.addressLocality}`],
  };
});

export default function HomeLocations() {
  return (
    <section className={`medical-section ${styles.section}`} id="locations">
      <div className="medical-container">
        <Reveal className="medical-section-header medical-section-header-center">
          <p className="medical-eyebrow">{homeContent.locations.eyebrow}</p>
          <h2
            aria-label={homeContent.locations.heading}
            className={`brand-h2 medical-section-title ${styles.heading}`}
            data-testid="home-locations-heading"
          >
            <span
              className={styles.headingLine}
              data-testid="home-locations-heading-line"
            >
              Choose The Clinic
            </span>
            <span
              className={styles.headingLine}
              data-testid="home-locations-heading-line"
            >
              That Works For You
            </span>
          </h2>
          <p
            className={`medical-section-intro ${styles.description}`}
            data-testid="home-locations-description"
          >
            {homeContent.locations.description}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ClinicLocationCards
            className={styles.compactCards}
            hidePhone
            locations={homepageLocations}
            showServiceArea
          />
        </Reveal>
      </div>
    </section>
  );
}
