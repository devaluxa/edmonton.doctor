"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "motion/react";
import { homeContent } from "../../../lib/business/config";
import { MotionLink, Reveal, StaggerGroup, StaggerItem } from "../_components/Reveal";
import styles from "./HomeProcess.module.css";

const steps = [
  {
    label: "Step 1",
    title: "Register Online",
    description:
      "Send a short request with your contact details, preferred clinic, and whether you are registering yourself or your family.",
  },
  {
    label: "Step 2",
    title: "Clinic Team Follows Up",
    description:
      "Staff review availability and contact you with the right next step for new patient registration or clinic access.",
  },
  {
    label: "Step 3",
    title: "Start Care",
    description:
      "Begin with a family doctor or walk-in clinic visit suited to your current needs, location, and schedule.",
  },
];

type Step = (typeof steps)[number];

function StepItem({
  index,
  isActive,
  setActiveStep,
  step,
}: {
  index: number;
  isActive: boolean;
  setActiveStep: (index: number) => void;
  step: Step;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: 0.48,
    margin: "-36% 0px -36% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setActiveStep(index);
    }
  }, [index, isInView, setActiveStep]);

  return (
    <StaggerItem
      className={`${styles.step} ${
        isActive ? styles.stepActive : styles.stepInactive
      }`}
      data-active={isActive ? "true" : "false"}
      data-testid="home-process-step"
      ref={ref}
    >
      <div className={styles.markerWrap}>
        <span
          className={styles.marker}
          data-testid="home-process-marker"
          aria-hidden="true"
        >
          {index + 1}
        </span>
      </div>
      <div className={styles.content}>
        <p>{step.label}</p>
        <h3>{step.title}</h3>
        <span>{step.description}</span>
      </div>
    </StaggerItem>
  );
}

export default function HomeProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const progress =
    steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0;

  return (
    <section className="medical-section medical-section-muted" id="process">
      <div className={`medical-container ${styles.wrap}`}>
        <Reveal className={styles.header}>
          <p className="medical-eyebrow">Easy As 1-2-3</p>
          <h2
            aria-label="Getting Care Is Simple"
            className={`brand-h2 ${styles.title}`}
          >
            <span className={styles.titleLine}>Getting Care</span>
            <span className={styles.titleLine}>
              Is <span className={styles.titleAccent}>Simple</span>
            </span>
          </h2>
          <p className="medical-section-intro">
            No endless clinic calls. Use one clear registration path, choose a
            preferred Edmonton location, and let the clinic team guide the next step.
          </p>
        </Reveal>

        <StaggerGroup
          className={styles.timeline}
          data-testid="process-timeline"
          style={
            {
              "--timeline-progress": `${progress}%`,
            } as CSSProperties
          }
        >
          {steps.map((step, index) => (
            <StepItem
              index={index}
              isActive={activeStep === index}
              key={step.title}
              setActiveStep={setActiveStep}
              step={step}
            />
          ))}
        </StaggerGroup>

        <Reveal className={styles.ctaWrap} delay={0.08}>
          <MotionLink
            className={`medical-button medical-button-primary ${styles.cta}`}
            href={homeContent.process.ctaHref}
          >
            {homeContent.process.ctaLabel}
          </MotionLink>
        </Reveal>
      </div>
    </section>
  );
}
