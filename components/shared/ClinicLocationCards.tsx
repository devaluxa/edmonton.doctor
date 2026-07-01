import type { ClinicLocation } from "../../lib/business/config";

type ClinicLocationCardsProps = {
  locations: ClinicLocation[];
  columns?: "one" | "three";
  className?: string;
  hidePhone?: boolean;
  showServiceArea?: boolean;
};

export default function ClinicLocationCards({
  locations,
  columns = "three",
  className = "",
  hidePhone = false,
  showServiceArea = false,
}: ClinicLocationCardsProps) {
  const gridClass =
    columns === "one"
      ? "medical-location-grid-one"
      : "medical-location-grid-three";

  return (
    <div className={`medical-location-grid ${gridClass} ${className}`}>
      {locations.map((location) => (
        <article
          className="medical-location-card"
          data-testid="clinic-location-card"
          key={location.id}
        >
          {!hidePhone ? (
            <p
              className="medical-location-phone"
              data-testid="clinic-location-phone"
            >
              {location.phone}
            </p>
          ) : null}
          <h3 className="medical-location-title">
            {location.name}
          </h3>

          <div
            className="medical-location-address"
            data-testid="clinic-location-address"
          >
            {location.addressLines.map((line) => (
              <p key={`${location.id}-${line}`}>{line}</p>
            ))}
          </div>

          {showServiceArea ? (
            <p
              className="medical-location-service"
              data-testid="clinic-location-description"
            >
              {location.serviceArea}
            </p>
          ) : null}

          <div className="medical-location-hours">
            <p className="medical-card-eyebrow">Hours</p>
            {location.hours.map((hours) => (
              <p key={`${location.id}-${hours}`}>{hours}</p>
            ))}
          </div>

          <div className="medical-location-actions">
            <a
              className="medical-button medical-button-primary"
              href={location.phoneHref}
            >
              Call Clinic
            </a>
            <a
              className="medical-button medical-button-secondary"
              href={location.directionsHref}
              rel="noreferrer"
              target="_blank"
            >
              Directions
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
