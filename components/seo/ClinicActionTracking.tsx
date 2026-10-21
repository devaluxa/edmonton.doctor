"use client";

import { useEffect } from "react";
import { trackClinicEvent } from "../../lib/analytics";

export default function ClinicActionTracking() {
  useEffect(() => {
    function trackClick(event: MouseEvent) {
      const link =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.protocol === "tel:") {
        trackClinicEvent("click_to_call");
      } else {
        const url = new URL(link.href);
        if (
          url.hostname.endsWith(".healthquest.ca") &&
          url.pathname.startsWith("/onlinebooking")
        ) {
          trackClinicEvent("booking_click");
        }
      }
    }
    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);
  return null;
}
