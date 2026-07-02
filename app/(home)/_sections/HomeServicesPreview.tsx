import { HeartPulse, ShieldCheck, Stethoscope, Venus } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../_components/Reveal";
import styles from "./HomeServicesPreview.module.css";

const services = [
  {
    icon: Stethoscope,
    title: "Family Medicine",
    description:
      "Ongoing primary care for children, adults, seniors, and households registering with a family doctor.",
    href: "/services/family-medicine/",
  },
  {
    icon: HeartPulse,
    title: "Walk-In Clinic Care",
    description:
      "Timely visits for non-emergency concerns, minor illnesses, follow-up guidance, and practical next steps.",
    href: "/walk-in/",
  },
  {
    icon: ShieldCheck,
    title: "Preventative Care",
    description:
      "Checkups, vaccinations, screening discussions, and health planning focused on prevention.",
    href: "/services/vaccinations-preventative-care/",
  },
  {
    icon: Venus,
    title: "Women's Health",
    description:
      "Pap tests, contraception advice, prenatal counselling, hormone concerns, STI testing, and menopause support.",
    href: "/services/womens-health-edmonton/",
  },
];

export default function HomeServicesPreview() {
  return (
    <section className="medical-section medical-section-muted" id="services">
      <div className="medical-container">
        <Reveal className="medical-section-header medical-section-header-center">
          <p className="medical-eyebrow">Clinic Services</p>
          <h2
            aria-label="Primary Care Services Built Around Patients"
            className={`brand-h2 medical-section-title ${styles.heading}`}
          >
            <span className={styles.headingLine}>Primary Care Services</span>
            <span className={styles.headingLine}>Built Around Patients</span>
          </h2>
          <p className="medical-section-intro">
            Practical family medicine and walk-in clinic information, organized
            so patients can understand the right path before they call or register.
          </p>
        </Reveal>

        <StaggerGroup className={styles.grid}>
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <StaggerItem key={service.title}>
                <a className={styles.card} href={service.href}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={24} strokeWidth={2.35} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span>Learn More</span>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
