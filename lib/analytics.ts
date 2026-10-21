export const googleAnalyticsId = "G-H0EWZ53PXR";
export const googleTagManagerId = "GTM-NBJH3GNB";

type ClinicEvent = "generate_lead" | "click_to_call" | "booking_click";

// Only aggregate actions belong in Analytics. Never pass form values, doctor
// choices, health information, contact details, or submission IDs here.
export function trackClinicEvent(name: ClinicEvent) {
  try {
    const analyticsWindow = window as Window & {
      gtag?: (...args: unknown[]) => void;
    };
    analyticsWindow.gtag?.("event", name, {
      send_to: googleAnalyticsId,
      transport_type: "beacon",
      page_location: `${window.location.origin}${window.location.pathname}`,
    });
  } catch {
    // Tracking must never interrupt a successful registration or navigation.
  }
}
