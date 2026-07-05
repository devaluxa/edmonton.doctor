"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  businessLocation,
  clinicLocationList,
} from "../../lib/business/config";

type FormStatus =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type FormFields = {
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
  preferredLocation: string;
  registeringFor: string;
  familySize: string;
  careNeed: string;
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
  render: (
    container: HTMLElement,
    options: TurnstileRenderOptions,
  ) => string;
  remove?: (widgetId: string) => void;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const initialFields: FormFields = {
  name: "",
  phone: "",
  email: "",
  preferredContact: "Phone",
  preferredLocation: clinicLocationList[0]?.id || "",
  registeringFor: "Myself",
  familySize: "1",
  careNeed: "",
  availability: "",
  message: "",
  consent: false,
  company: "",
};

type RegistrationLeadFormProps = {
  initialPreferredLocation?: string;
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

const formsApiUrl = process.env.NEXT_PUBLIC_FORMS_API_URL?.trim() || "";
const registrationFormId =
  process.env.NEXT_PUBLIC_EDMONTON_DOCTORS_REGISTRATION_FORM_ID?.trim() || "";
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

export default function RegistrationLeadForm({
  initialPreferredLocation,
}: RegistrationLeadFormProps = {}) {
  const router = useRouter();
  const [fields, setFields] = useState<FormFields>(() => ({
    ...initialFields,
    preferredLocation:
      initialPreferredLocation || initialFields.preferredLocation,
  }));
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

    if (!onlineSubmissionConfigured) {
      setStatus({
        type: "error",
        message: `Online submission is not connected yet. Please call ${businessLocation.name} at ${businessLocation.phone} to register.`,
      });
      return;
    }

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
        message:
          "Please confirm that you are sending a registration request and not emergency or sensitive medical details.",
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
      const selectedLocation = clinicLocationList.find(
        (location) => location.id === fields.preferredLocation,
      );
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siteId: "edmontondoctors",
          formId: registrationFormId,
          ...fields,
          preferredLocationName: selectedLocation?.name || fields.preferredLocation,
          fields: [
            { id: "name", label: "Name", type: "text", value: fields.name },
            { id: "phone", label: "Phone", type: "tel", value: fields.phone },
            { id: "email", label: "Email", type: "email", value: fields.email },
            {
              id: "preferred_contact",
              label: "Preferred Contact",
              type: "select",
              value: fields.preferredContact,
            },
            {
              id: "preferred_location",
              label: "Preferred Location",
              type: "select",
              value: selectedLocation?.name || fields.preferredLocation,
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
              id: "care_need",
              label: "Care Need",
              type: "select",
              value: fields.careNeed,
            },
            {
              id: "availability",
              label: "Availability",
              type: "text",
              value: fields.availability,
            },
            {
              id: "message",
              label: "Message",
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
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.ok !== true) {
        const message =
          result?.message ||
          result?.errors?.[0]?.message ||
          "The registration request could not be sent. Please call the clinic.";

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
            : "The registration request could not be sent. Please call the clinic.",
      });
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-[var(--brand-color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-color-primary)] focus:ring-2 focus:ring-[var(--brand-color-primary)]/20";
  const labelClass =
    "text-xs font-black uppercase tracking-[0.16em] text-slate-600";

  return (
    <form
      className="medical-card"
      id="patient-registration-form"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--brand-color-primary-strong)]">
          New Patient Registration Form
        </p>
        <h2 className="brand-h2 mt-3 text-3xl font-black leading-tight text-[var(--brand-color-ink)]">
          Register As A Patient
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          This form collects only contact and routing details. Do not include
          health card numbers, dates of birth, emergency symptoms, diagnosis
          history, or detailed medical information. For urgent symptoms, call
          911 or visit an emergency department.
        </p>
        {!onlineSubmissionConfigured ? (
          <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-900">
            Online submission is not connected yet. Please call{" "}
            <a
              className="font-black underline-offset-4 hover:underline"
              href={businessLocation.phoneHref}
            >
              {businessLocation.phone}
            </a>{" "}
            to register.
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input
            autoComplete="name"
            className={inputClass}
            maxLength={120}
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
            required
            type="text"
            value={fields.name}
          />
        </label>

        <label className={labelClass}>
          Phone
          <input
            autoComplete="tel"
            className={inputClass}
            maxLength={50}
            name="phone"
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="(780) 522-1236"
            required
            type="tel"
            value={fields.phone}
          />
        </label>

        <label className={labelClass}>
          Email
          <input
            autoComplete="email"
            className={inputClass}
            maxLength={150}
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={fields.email}
          />
        </label>

        <label className={labelClass}>
          Preferred Contact
          <select
            className={inputClass}
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

        <label className={labelClass}>
          Preferred Location
          <select
            className={inputClass}
            name="preferredLocation"
            onChange={(event) =>
              updateField("preferredLocation", event.target.value)
            }
            required
            value={fields.preferredLocation}
          >
            {clinicLocationList.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          Registering
          <select
            className={inputClass}
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

        <label className={labelClass}>
          Family Size
          <input
            className={inputClass}
            min="1"
            max="12"
            name="familySize"
            onChange={(event) => updateField("familySize", event.target.value)}
            required
            type="number"
            value={fields.familySize}
          />
        </label>

        <label className={labelClass}>
          Care Need
          <select
            className={inputClass}
            name="careNeed"
            onChange={(event) => updateField("careNeed", event.target.value)}
            required
            value={fields.careNeed}
          >
            <option value="">Choose a general need</option>
            <option value="Family doctor registration">
              Family doctor registration
            </option>
            <option value="Walk-in clinic visit">Walk-in clinic visit</option>
            <option value="General checkup">General checkup</option>
            <option value="Chronic care follow-up">
              Chronic care follow-up
            </option>
            <option value="Preventive care">Preventive care</option>
            <option value="Other general question">Other general question</option>
          </select>
        </label>
      </div>

      <label className={`${labelClass} mt-4 block`}>
        Availability
        <input
          className={inputClass}
          maxLength={180}
          name="availability"
          onChange={(event) => updateField("availability", event.target.value)}
          placeholder="Weekday mornings, after 3 p.m., flexible..."
          type="text"
          value={fields.availability}
        />
      </label>

      <label className={`${labelClass} mt-4 block`}>
        Message
        <textarea
          className={`${inputClass} min-h-32 resize-y leading-7`}
          maxLength={1200}
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Share only general registration notes or scheduling preferences."
          value={fields.message}
        />
      </label>

      <label className="mt-5 flex gap-3 rounded-md border border-slate-200 bg-[var(--brand-color-paper)] p-4 text-sm font-semibold leading-6 text-slate-700">
        <input
          checked={fields.consent}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--brand-color-primary)]"
          name="consent"
          onChange={(event) => updateField("consent", event.target.checked)}
          required
          type="checkbox"
        />
        I understand this is a registration request only and I will not submit
        emergency symptoms or sensitive medical details through this form.
      </label>

      <label className="hidden" htmlFor="company">
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
        <div className="mt-5 overflow-hidden rounded-md border border-slate-200 bg-slate-50 p-3">
          <div ref={turnstileContainerRef} />
        </div>
      ) : null}

      {status.message ? (
        <p
          className={`mt-4 rounded-md border px-4 py-3 text-sm font-semibold leading-6 ${
            status.type === "success"
              ? "border-[var(--brand-color-primary)]/40 bg-teal-50 text-teal-900"
              : "border-red-300 bg-red-50 text-red-900"
          }`}
          role="status"
        >
          {status.message}
        </p>
      ) : null}

      <div className="mt-5 flex">
        <button
          className="medical-button medical-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send Registration Request"}
        </button>
      </div>
    </form>
  );
}
