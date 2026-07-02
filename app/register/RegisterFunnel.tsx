/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clinicLocationList,
  doctorProfiles,
  type DoctorProfile,
} from "../../lib/business/config";
import styles from "./RegisterFunnel.module.css";

type FormStatus =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type FormFields = {
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
  registeringFor: string;
  familySize: string;
  availability: string;
  message: string;
  consent: boolean;
  company: string;
};

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  remove?: (widgetId: string) => void;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type RegisterFunnelProps = {
  initialPreferredLocation?: string;
};

const initialFields: FormFields = {
  name: "",
  phone: "",
  email: "",
  preferredContact: "Phone",
  registeringFor: "Myself",
  familySize: "1",
  availability: "",
  message: "",
  consent: false,
  company: "",
};

const trackingKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
];

const defaultFormsApiUrl = "https://api.onbooking.ca/v1/submissions";
const defaultRegistrationFormId = "a8560735-5edd-443a-beba-990bd08cc8d3";
const formsApiUrl =
  process.env.NEXT_PUBLIC_FORMS_API_URL?.trim() || defaultFormsApiUrl;
const registrationFormId =
  process.env.NEXT_PUBLIC_EDMONTON_DOCTORS_REGISTRATION_FORM_ID?.trim() ||
  defaultRegistrationFormId;
const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";
const turnstileScriptId = "cloudflare-turnstile-script";
const thankYouHref = "/thank-you/";

function getSubmitUrl() {
  if (!formsApiUrl) {
    return "";
  }

  const normalized = formsApiUrl.replace(/\/+$/, "");
  return normalized.endsWith("/v1/submissions")
    ? normalized
    : `${normalized}/v1/submissions`;
}

function getTrackingData() {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const currentTracking = trackingKeys.reduce<Record<string, string>>(
    (tracking, key) => {
      const value = params.get(key);

      if (value) {
        tracking[key] = value;
      }

      return tracking;
    },
    {},
  );

  try {
    const stored = window.localStorage.getItem("edmontondoctors_tracking");
    const storedTracking = stored ? JSON.parse(stored) : {};
    const mergedTracking = { ...storedTracking, ...currentTracking };

    if (Object.keys(currentTracking).length > 0) {
      window.localStorage.setItem(
        "edmontondoctors_tracking",
        JSON.stringify(mergedTracking),
      );
    }

    return mergedTracking;
  } catch {
    return currentTracking;
  }
}

function getClinicForDoctor(doctor: DoctorProfile) {
  return (
    clinicLocationList.find((location) => location.id === doctor.locationId) ||
    clinicLocationList[0]
  );
}

function getLocationBadge(doctor: DoctorProfile) {
  return doctor.locationId === "beverly-medical-center"
    ? "Beverly Location"
    : "Balwin Location";
}

function getInitialDoctorSlug(initialPreferredLocation?: string) {
  const matchedDoctor = initialPreferredLocation
    ? doctorProfiles.find((doctor) => doctor.locationId === initialPreferredLocation)
    : null;

  return matchedDoctor?.slug || doctorProfiles[0]?.slug || "";
}

export default function RegisterFunnel({
  initialPreferredLocation,
}: RegisterFunnelProps) {
  const router = useRouter();
  const [selectedDoctorSlug, setSelectedDoctorSlug] = useState(() =>
    getInitialDoctorSlug(initialPreferredLocation),
  );
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const startedAt = useRef(Date.now());
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const onlineSubmissionConfigured = Boolean(formsApiUrl && registrationFormId);

  const selectedDoctor =
    doctorProfiles.find((doctor) => doctor.slug === selectedDoctorSlug) ||
    doctorProfiles[0];
  const selectedLocation = getClinicForDoctor(selectedDoctor);
  const featuredDoctors = useMemo(() => doctorProfiles.slice(0, 3), []);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileContainerRef.current) {
      return;
    }

    let cancelled = false;

    function renderTurnstile() {
      if (
        cancelled ||
        !window.turnstile ||
        !turnstileContainerRef.current ||
        turnstileWidgetId.current
      ) {
        return;
      }

      turnstileWidgetId.current = window.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: turnstileSiteKey,
          theme: "light",
          callback: (token) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => setTurnstileToken(""),
        },
      );
    }

    if (window.turnstile) {
      renderTurnstile();
    } else {
      let script = document.getElementById(
        turnstileScriptId,
      ) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement("script");
        script.id = turnstileScriptId;
        script.async = true;
        script.defer = true;
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        document.head.appendChild(script);
      }

      script.addEventListener("load", renderTurnstile);
    }

    return () => {
      cancelled = true;
      const script = document.getElementById(turnstileScriptId);

      script?.removeEventListener("load", renderTurnstile);

      if (turnstileWidgetId.current && window.turnstile?.remove) {
        window.turnstile.remove(turnstileWidgetId.current);
      }

      turnstileWidgetId.current = null;
    };
  }, []);

  function updateField(name: keyof FormFields, value: string | boolean) {
    setFields((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetTurnstile() {
    setTurnstileToken("");

    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fields.phone.trim() || !fields.email.trim()) {
      setStatus({
        type: "error",
        message: "Please add your phone number and email so the clinic can reply.",
      });
      return;
    }

    if (!fields.consent) {
      setStatus({
        type: "error",
        message: "Please confirm that Edmonton Doctors can contact you.",
      });
      return;
    }

    if (!onlineSubmissionConfigured) {
      setStatus({
        type: "error",
        message: `Online requests are not connected yet. Please call ${selectedLocation.name} at ${selectedLocation.phone}.`,
      });
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setStatus({
        type: "error",
        message: "Please complete the quick verification before sending.",
      });
      return;
    }

    const submitUrl = getSubmitUrl();

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const payload = {
        siteId: "edmontondoctors",
        formId: registrationFormId,
        ...fields,
        preferredDoctor: selectedDoctor.name,
        preferredDoctorFullName: selectedDoctor.fullName || selectedDoctor.name,
        preferredDoctorSlug: selectedDoctor.slug,
        preferredLocation: selectedLocation.id,
        preferredLocationName: selectedLocation.name,
        bookingHref: selectedLocation.bookingHref,
        fields: [
          { id: "name", label: "Name", type: "text", value: fields.name },
          { id: "phone", label: "Phone", type: "tel", value: fields.phone },
          { id: "email", label: "Email", type: "email", value: fields.email },
          {
            id: "preferred_doctor",
            label: "Preferred Doctor",
            type: "select",
            value: selectedDoctor.name,
          },
          {
            id: "preferred_doctor_slug",
            label: "Preferred Doctor Slug",
            type: "hidden",
            value: selectedDoctor.slug,
          },
          {
            id: "preferred_location",
            label: "Preferred Location",
            type: "select",
            value: selectedLocation.name,
          },
          {
            id: "booking_href",
            label: "Booking Link",
            type: "hidden",
            value: selectedLocation.bookingHref,
          },
          {
            id: "preferred_contact",
            label: "Preferred Contact",
            type: "select",
            value: fields.preferredContact,
          },
          {
            id: "registering_for",
            label: "Registering For",
            type: "select",
            value: fields.registeringFor,
          },
          {
            id: "family_size",
            label: "Family Size",
            type: "number",
            value: fields.familySize,
          },
          {
            id: "availability",
            label: "Availability",
            type: "text",
            value: fields.availability,
          },
          {
            id: "message",
            label: "Scheduling Note",
            type: "textarea",
            value: fields.message,
          },
          {
            id: "consent",
            label: "Consent",
            type: "checkbox",
            value: fields.consent ? "Yes" : "No",
          },
        ],
        pageUrl: window.location.href,
        referrer: document.referrer,
        tracking: getTrackingData(),
        timeOnPageMs: Date.now() - startedAt.current,
        turnstileToken: turnstileToken || undefined,
      };

      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      const hasErrors =
        Array.isArray(result?.errors) && result.errors.length > 0;
      const submissionFailed =
        !response.ok ||
        result?.ok === false ||
        result?.success === false ||
        hasErrors;

      if (submissionFailed) {
        const message =
          result?.message ||
          result?.errors?.[0]?.message ||
          "The request could not be sent. Please call the clinic.";

        throw new Error(message);
      }

      setFields(initialFields);
      resetTurnstile();
      startedAt.current = Date.now();
      router.push(thankYouHref);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "The request could not be sent. Please call the clinic.",
      });
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={`medical-container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className="medical-eyebrow">New Patient Registration</p>
            <h1 className={styles.heroTitle}>Choose Your Edmonton Doctor</h1>
            <p className={styles.heroIntro}>
              Select a preferred physician, confirm the clinic location, and send
              a short request so the team can follow up with the right next step.
            </p>
            <div className={styles.heroActions}>
              <a className="medical-button medical-button-primary" href="#patient-registration-form">
                Start Request
              </a>
              <a
                className="medical-button medical-button-secondary"
                href={selectedLocation.phoneHref}
              >
                Call {selectedLocation.phone}
              </a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="Edmonton doctor portraits">
            <div className={styles.heroPortrait}>
              <img
                alt={selectedDoctor.image?.alt || selectedDoctor.name}
                decoding="async"
                loading="eager"
                src={selectedDoctor.image?.src}
              />
              <div className={styles.heroPortraitCaption}>
                <span>{getLocationBadge(selectedDoctor)}</span>
                <strong>{selectedDoctor.name}</strong>
              </div>
            </div>
            <div className={styles.heroMiniGrid} aria-hidden="true">
              {featuredDoctors.map((doctor) => (
                <img
                  alt=""
                  decoding="async"
                  key={doctor.slug}
                  loading="eager"
                  src={doctor.image?.src}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.funnelSection}>
        <div className={`medical-container ${styles.funnelGrid}`}>
          <div className={styles.selectionPanel}>
            <p className="medical-eyebrow">Step 1</p>
            <h2 className={styles.sectionTitle}>Select Your Preferred Doctor</h2>
            <p className={styles.sectionIntro}>
              Your clinic location is set automatically based on the doctor you
              choose.
            </p>

            <div className={styles.doctorGrid} data-testid="register-doctor-grid">
              {doctorProfiles.map((doctor) => {
                const isSelected = doctor.slug === selectedDoctor.slug;

                return (
                  <button
                    aria-pressed={isSelected}
                    className={`${styles.doctorCard} ${
                      isSelected ? styles.doctorCardSelected : ""
                    }`}
                    data-booking-href={getClinicForDoctor(doctor).bookingHref}
                    data-location={doctor.locationId}
                    data-selected={isSelected ? "true" : "false"}
                    data-testid="register-doctor-card"
                    key={doctor.slug}
                    onClick={() => {
                      setSelectedDoctorSlug(doctor.slug);
                      setStatus({ type: "idle", message: "" });
                    }}
                    type="button"
                  >
                    <span className={styles.doctorImageWrap}>
                      <img
                        alt={doctor.image?.alt || doctor.name}
                        data-testid="register-doctor-image"
                        decoding="async"
                        loading="eager"
                        src={doctor.image?.src}
                      />
                    </span>
                    <span className={styles.doctorContent}>
                      <span className={styles.locationBadge}>
                        {getLocationBadge(doctor)}
                      </span>
                      <strong>{doctor.name}</strong>
                      <small>{doctor.title}</small>
                      <span className={styles.doctorMeta}>
                        {doctor.languages.join(", ")}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <form
            className={styles.formPanel}
            data-testid="register-funnel-form"
            id="patient-registration-form"
            onSubmit={handleSubmit}
          >
            <div className={styles.formHeader}>
              <p className="medical-eyebrow">Step 2</p>
              <h2 className={styles.sectionTitle}>Your Details</h2>
              <div className={styles.selectedSummary} data-testid="selected-doctor-summary">
                <img
                  alt={selectedDoctor.image?.alt || selectedDoctor.name}
                  decoding="async"
                  loading="eager"
                  src={selectedDoctor.image?.src}
                />
                <div>
                  <span>{getLocationBadge(selectedDoctor)}</span>
                  <strong>{selectedDoctor.name}</strong>
                  <small>{selectedLocation.name}</small>
                </div>
              </div>
            </div>

            <input name="preferredDoctor" type="hidden" value={selectedDoctor.name} />
            <input
              name="preferredDoctorSlug"
              type="hidden"
              value={selectedDoctor.slug}
            />
            <input
              name="preferredLocation"
              type="hidden"
              value={selectedLocation.id}
            />
            <input
              name="preferredLocationName"
              type="hidden"
              value={selectedLocation.name}
            />
            <input name="bookingHref" type="hidden" value={selectedLocation.bookingHref} />

            <div className={styles.fieldGrid}>
              <label className={styles.label}>
                Name
                <input
                  autoComplete="name"
                  maxLength={120}
                  name="name"
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Your name"
                  required
                  type="text"
                  value={fields.name}
                />
              </label>

              <label className={styles.label}>
                Phone
                <input
                  autoComplete="tel"
                  maxLength={50}
                  name="phone"
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="(780) 522-1236"
                  required
                  type="tel"
                  value={fields.phone}
                />
              </label>

              <label className={styles.label}>
                Email
                <input
                  autoComplete="email"
                  maxLength={150}
                  name="email"
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={fields.email}
                />
              </label>

              <label className={styles.label}>
                Preferred Contact
                <select
                  name="preferredContact"
                  onChange={(event) =>
                    updateField("preferredContact", event.target.value)
                  }
                  required
                  value={fields.preferredContact}
                >
                  <option value="Phone">Phone</option>
                  <option value="Email">Email</option>
                  <option value="Any method">Any method</option>
                </select>
              </label>

              <label className={styles.label}>
                Registering
                <select
                  name="registeringFor"
                  onChange={(event) =>
                    updateField("registeringFor", event.target.value)
                  }
                  required
                  value={fields.registeringFor}
                >
                  <option value="Myself">Myself</option>
                  <option value="My family">My family</option>
                  <option value="Someone I care for">Someone I care for</option>
                </select>
              </label>

              <label className={styles.label}>
                Family Size
                <input
                  max="12"
                  min="1"
                  name="familySize"
                  onChange={(event) =>
                    updateField("familySize", event.target.value)
                  }
                  required
                  type="number"
                  value={fields.familySize}
                />
              </label>
            </div>

            <label className={styles.label}>
              Availability
              <input
                maxLength={180}
                name="availability"
                onChange={(event) =>
                  updateField("availability", event.target.value)
                }
                placeholder="Weekday mornings, after 3 p.m., flexible..."
                type="text"
                value={fields.availability}
              />
            </label>

            <label className={styles.label}>
              General Scheduling Note
              <textarea
                maxLength={900}
                name="message"
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Optional: share general scheduling preferences."
                value={fields.message}
              />
            </label>

            <label className={styles.consent}>
              <input
                checked={fields.consent}
                name="consent"
                onChange={(event) => updateField("consent", event.target.checked)}
                required
                type="checkbox"
              />
              I agree that Edmonton Doctors may contact me about this request.
            </label>

            <label className={styles.honeypot} htmlFor="company">
              Company
              <input
                autoComplete="off"
                id="company"
                name="company"
                onChange={(event) => updateField("company", event.target.value)}
                tabIndex={-1}
                value={fields.company}
              />
            </label>

            {turnstileSiteKey ? (
              <div className={styles.turnstile}>
                <div ref={turnstileContainerRef} />
              </div>
            ) : null}

            {status.message ? (
              <p
                className={`${styles.status} ${
                  status.type === "success" ? styles.statusSuccess : styles.statusError
                }`}
                role="status"
              >
                {status.message}
              </p>
            ) : null}

            <button
              className={`medical-button medical-button-primary ${styles.submit}`}
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Sending..." : "Send Request"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
