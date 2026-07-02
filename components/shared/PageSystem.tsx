/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";
import type { ServiceHeroVisual } from "../../lib/serviceHeroVisuals";

type PageAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow: string;
  heading: ReactNode;
  intro: string;
  visual: ServiceHeroVisual;
  primaryAction: PageAction;
  secondaryAction?: PageAction;
  imagePosition?: string;
  imageShape?: "wide" | "square";
};

type PageSectionProps = {
  children: ReactNode;
  tone?: "surface" | "muted";
  className?: string;
};

type SectionHeaderProps = {
  eyebrow: string;
  heading: ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export type InfoCard = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  actionLabel?: string;
  noWrapTitle?: boolean;
};

type InfoCardGridProps = {
  cards: InfoCard[];
  columns?: "two" | "three" | "four";
  compact?: boolean;
};

export type StepCard = {
  title: string;
  description: string;
};

type StepCardsProps = {
  steps: StepCard[];
};

type CtaBandProps = {
  eyebrow?: string;
  heading: ReactNode;
  headingLabel?: string;
  description: ReactNode;
  primaryAction: PageAction;
  secondaryAction?: PageAction;
  note?: ReactNode;
};

function actionClass(variant: PageAction["variant"] = "primary") {
  return variant === "secondary"
    ? "medical-button medical-button-secondary"
    : "medical-button medical-button-primary";
}

export function PageHero({
  eyebrow,
  heading,
  intro,
  visual,
  primaryAction,
  secondaryAction,
  imagePosition = "center",
  imageShape = "wide",
}: PageHeroProps) {
  return (
    <section className="medical-hero">
      <div className="medical-container medical-hero-grid">
        <div className="medical-hero-copy">
          <p className="medical-eyebrow">{eyebrow}</p>
          <h1 className="brand-h1 medical-hero-title">{heading}</h1>
          <p className="medical-hero-intro">{intro}</p>
          <div className="medical-action-row">
            <a className={actionClass(primaryAction.variant)} href={primaryAction.href}>
              {primaryAction.label}
            </a>
            {secondaryAction ? (
              <a
                className={actionClass(secondaryAction.variant || "secondary")}
                href={secondaryAction.href}
              >
                {secondaryAction.label}
              </a>
            ) : null}
          </div>
        </div>

        <figure
          className={`medical-hero-media ${
            imageShape === "square" ? "medical-hero-media-square" : ""
          }`}
        >
          <img
            alt={visual.alt}
            className="medical-hero-image"
            decoding="async"
            loading="eager"
            src={visual.src}
            style={{ objectPosition: imagePosition }}
          />
        </figure>
      </div>
    </section>
  );
}

export function PageSection({
  children,
  tone = "surface",
  className = "",
}: PageSectionProps) {
  return (
    <section
      className={`medical-section ${
        tone === "muted" ? "medical-section-muted" : ""
      } ${className}`}
    >
      <div className="medical-container">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  heading,
  intro,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`medical-section-header ${
        align === "center" ? "medical-section-header-center" : ""
      } ${className}`}
    >
      <p className="medical-eyebrow">{eyebrow}</p>
      <h2 className="brand-h2 medical-section-title">{heading}</h2>
      {intro ? <p className="medical-section-intro">{intro}</p> : null}
    </div>
  );
}

export function InfoCardGrid({
  cards,
  columns = "three",
  compact = false,
}: InfoCardGridProps) {
  const columnClass =
    columns === "four"
      ? "medical-card-grid-four"
      : columns === "two"
        ? "medical-card-grid-two"
        : "medical-card-grid-three";

  return (
    <div className={`medical-card-grid ${columnClass}`}>
      {cards.map((card) => {
        const body = (
          <>
            {card.eyebrow ? <p className="medical-card-eyebrow">{card.eyebrow}</p> : null}
            <h3
              className={`medical-card-title ${
                card.noWrapTitle ? "medical-nowrap" : ""
              }`}
            >
              {card.title}
            </h3>
            {card.description ? (
              <p className="medical-card-description">{card.description}</p>
            ) : null}
            {card.actionLabel ? (
              <span className="medical-card-action">{card.actionLabel}</span>
            ) : null}
          </>
        );

        return card.href ? (
          <a
            className={`medical-card ${compact ? "medical-card-compact" : ""}`}
            href={card.href}
            key={`${card.href}-${String(card.title)}`}
          >
            {body}
          </a>
        ) : (
          <article
            className={`medical-card ${compact ? "medical-card-compact" : ""}`}
            key={String(card.title)}
          >
            {body}
          </article>
        );
      })}
    </div>
  );
}

export function StepCards({ steps }: StepCardsProps) {
  return (
    <div className="medical-step-grid">
      {steps.map((step, index) => (
        <article className="medical-step-card" key={step.title}>
          <div className="medical-step-number">{index + 1}</div>
          <div>
            <h3 className="medical-card-title">{step.title}</h3>
            <p className="medical-card-description">{step.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function CtaBand({
  eyebrow = "Next Step",
  heading,
  headingLabel,
  description,
  primaryAction,
  secondaryAction,
  note,
}: CtaBandProps) {
  return (
    <div className="medical-cta-band">
      <div>
        <p className="medical-eyebrow">{eyebrow}</p>
        <h2 className="brand-h2 medical-section-title" aria-label={headingLabel}>
          {heading}
        </h2>
        <div className="medical-section-intro">{description}</div>
        {note ? <div className="medical-note">{note}</div> : null}
      </div>
      <div className="medical-cta-actions">
        <a className={actionClass(primaryAction.variant)} href={primaryAction.href}>
          {primaryAction.label}
        </a>
        {secondaryAction ? (
          <a
            className={actionClass(secondaryAction.variant || "secondary")}
            href={secondaryAction.href}
          >
            {secondaryAction.label}
          </a>
        ) : null}
      </div>
    </div>
  );
}
