"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BrandMark from "./BrandMark";
import {
  announcement,
  businessName,
  homeContent,
} from "../../lib/business/config";
import { baseNavigation, serviceNavigationPages } from "../../lib/sitePages";

const serviceMenuLabels: Record<string, string> = {
  "/walk-in/": "Walk-In Clinic",
  "/services/new-patient-registration/": "New Patients",
  "/services/checkups-physicals/": "Checkups & Exams",
  "/services/acute-illness-injury-treatment/": "Acute Illness & Injury",
  "/services/vaccinations-preventative-care/": "Vaccinations",
  "/services/chronic-disease-management/": "Chronic Disease",
  "/services/mental-health-support/": "Mental Health",
};

function getServiceMenuLabel(item: { eyebrow: string; path: string }) {
  return serviceMenuLabels[item.path] || item.eyebrow;
}

export default function Header() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  const closeMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const shouldShowAnnouncement =
    announcement.enabled && isAnnouncementVisible;
  const mainLinks = baseNavigation.filter((item) => item.label !== "Services");

  return (
    <header className="sticky inset-x-0 top-0 z-[999] border-b border-[var(--brand-color-border)] bg-white/95 text-[var(--brand-color-ink)] shadow-sm backdrop-blur-md">
      {shouldShowAnnouncement ? (
        <div
          aria-label={announcement.ariaLabel}
          className="relative min-h-8 border-b border-teal-900/10 bg-[var(--brand-color-accent)] px-9 py-1.5 text-[var(--brand-color-ink)] sm:px-10"
          id={announcement.id}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-center text-center">
            <p className="min-w-0 text-[0.68rem] font-black uppercase leading-4 tracking-[0.1em] sm:text-xs sm:tracking-[0.16em]">
              <span className="sm:hidden">{announcement.shortAlertLabel}</span>
              <span className="hidden sm:inline">{announcement.alertLabel}</span>
            </p>
            <button
              aria-label="Dismiss registration announcement"
              className="absolute right-2 top-1 flex h-5 w-5 items-center justify-center text-sm font-black leading-none text-[var(--brand-color-ink)]/75 transition hover:text-[var(--brand-color-ink)] focus:outline-none focus:ring-2 focus:ring-white/70"
              onClick={() => setIsAnnouncementVisible(false)}
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      ) : null}

      <nav className="flex h-20 items-center justify-between gap-4 px-4 sm:px-5 lg:h-[92px] lg:px-6 xl:px-10">
        <a
          aria-label={`${businessName} home`}
          className="relative z-[1001] min-w-0"
          href="/"
          onClick={closeMenu}
        >
          <BrandMark tone="dark" />
        </a>

        <ul className="hidden min-w-0 items-center gap-4 xl:gap-6 lg:flex">
          <li>
            <a
              className={`group relative whitespace-nowrap text-xs font-bold uppercase tracking-[0.05em] transition duration-300 xl:text-sm ${
                isActive("/") ? "text-[var(--brand-color-primary-strong)]" : "text-slate-700"
              } hover:text-[var(--brand-color-primary-strong)]`}
              href="/"
            >
              Home
              <span
                className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-[var(--brand-color-primary)] transition-all duration-300 group-hover:w-full ${
                  isActive("/") ? "w-full" : "w-0"
                }`}
              />
            </a>
          </li>

          <li
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              aria-expanded={isServicesOpen}
              className={`group relative inline-flex items-center gap-2 whitespace-nowrap text-xs font-bold uppercase tracking-[0.05em] transition duration-300 xl:text-sm ${
                pathname.startsWith("/services/")
                  ? "text-[var(--brand-color-primary-strong)]"
                  : "text-slate-700"
              } hover:text-[var(--brand-color-primary-strong)]`}
              onClick={() => setIsServicesOpen((open) => !open)}
              type="button"
            >
              Services
              <svg
                aria-hidden="true"
                className={`h-4 w-4 transition ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.4"
                />
              </svg>
              <span
                className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-[var(--brand-color-primary)] transition-all duration-300 group-hover:w-full ${
                  pathname.startsWith("/services/") ? "w-full" : "w-0"
                }`}
              />
            </button>

            <div
              className={`absolute -left-40 top-full w-[min(820px,calc(100vw-2rem))] pt-4 ${
                isServicesOpen ? "block" : "hidden"
              }`}
            >
              <div className="rounded-lg border border-[var(--brand-color-border)] bg-white p-4 shadow-2xl shadow-slate-950/12">
                <a
                  className="flex items-center justify-between gap-4 rounded-md bg-[var(--brand-color-paper)] px-4 py-3 transition hover:bg-teal-50"
                  href="/services/"
                >
                  <span className="min-w-0">
                    <span className="block text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-color-primary-strong)]">
                      All Services
                    </span>
                    <span className="mt-1 block truncate text-sm font-black text-[var(--brand-color-ink)]">
                      Primary Care Services
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-black uppercase tracking-[0.12em] text-[var(--brand-color-primary-strong)]">
                    View all -&gt;
                  </span>
                </a>

                <div className="mt-4">
                  <p className="px-3 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                    Service Pages
                  </p>
                  <div className="mt-3 grid gap-2 lg:grid-cols-3">
                    {serviceNavigationPages.map((item) => {
                      const label = getServiceMenuLabel(item);

                      return (
                        <a
                          className="block min-w-0 rounded-md px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-teal-50 hover:text-[var(--brand-color-primary-strong)]"
                          href={item.path}
                          key={item.path}
                          title={item.eyebrow}
                        >
                          <span className="block truncate whitespace-nowrap">
                            {label}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </li>

          {mainLinks.slice(1).map((item) => (
            <li key={item.href}>
              <a
                className={`group relative whitespace-nowrap text-xs font-bold uppercase tracking-[0.05em] transition duration-300 xl:text-sm ${
                  isActive(item.href)
                    ? "text-[var(--brand-color-primary-strong)]"
                    : "text-slate-700"
                } hover:text-[var(--brand-color-primary-strong)]`}
                href={item.href}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-[var(--brand-color-primary)] transition-all duration-300 group-hover:w-full ${
                    isActive(item.href) ? "w-full" : "w-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          className="hidden shrink-0 items-center justify-center rounded-md bg-[var(--brand-color-primary)] px-4 py-3 text-xs font-black uppercase tracking-wide text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-color-primary-strong)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-color-primary)]/25 lg:inline-flex xl:px-5 xl:text-sm"
          href={homeContent.header.ctaHref}
        >
          {homeContent.header.ctaLabel}
          <span aria-hidden="true" className="ml-2">
            -&gt;
          </span>
        </a>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="relative z-[1001] flex flex-col gap-1.5 lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span
            className={`h-[3px] w-[30px] rounded-full transition duration-300 ${
              isOpen
                ? "translate-x-[1px] translate-y-[9px] rotate-45 bg-[var(--brand-color-primary)]"
                : "bg-[var(--brand-color-ink)]"
            }`}
          />
          <span
            className={`h-[3px] w-[30px] rounded-full transition duration-300 ${
              isOpen ? "opacity-0" : "bg-[var(--brand-color-ink)]"
            }`}
          />
          <span
            className={`h-[3px] w-[30px] rounded-full transition duration-300 ${
              isOpen
                ? "translate-x-[1px] -translate-y-[9px] -rotate-45 bg-[var(--brand-color-primary)]"
                : "bg-[var(--brand-color-ink)]"
            }`}
          />
        </button>
      </nav>

      <aside
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[1000] flex h-screen w-full flex-col gap-6 overflow-y-auto bg-white px-6 pb-8 pt-32 text-[var(--brand-color-ink)] shadow-[-10px_0_40px_rgba(0,0,0,0.18)] transition-[opacity,transform] duration-300 ease-out sm:px-8 lg:hidden ${
          isOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "hidden pointer-events-none opacity-0"
        }`}
        id="mobile-navigation"
      >
        <ul className="flex flex-col gap-5">
          <li>
            <a
              className="text-lg font-bold uppercase text-[var(--brand-color-ink)]"
              href="/"
              onClick={closeMenu}
            >
              Home
            </a>
          </li>
          <li>
            <button
              aria-controls="mobile-services"
              aria-expanded={isMobileServicesOpen}
              className="flex w-full items-center justify-between gap-4 text-left text-lg font-bold uppercase text-[var(--brand-color-ink)]"
              onClick={() => setIsMobileServicesOpen((open) => !open)}
              type="button"
            >
              Services
              <span
                aria-hidden="true"
                className={`text-2xl leading-none text-[var(--brand-color-primary)] transition ${
                  isMobileServicesOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isMobileServicesOpen ? (
              <div
                className="mt-4 border-l-2 border-[var(--brand-color-primary)] pl-4"
                id="mobile-services"
              >
                <div className="grid max-h-[25rem] gap-3 overflow-y-auto pr-2">
                  <a
                    className="text-sm font-black uppercase text-[var(--brand-color-ink)]"
                    href="/services/"
                    onClick={closeMenu}
                  >
                    All Services
                  </a>
                  {serviceNavigationPages.map((item) => {
                    const label = getServiceMenuLabel(item);

                    return (
                      <a
                        className="text-sm font-bold text-slate-600"
                        href={item.path}
                        key={item.path}
                        onClick={closeMenu}
                      >
                        {label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </li>
          {mainLinks.slice(1).map((item) => (
            <li key={item.href}>
              <a
                className="text-lg font-bold uppercase text-[var(--brand-color-ink)]"
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          className="inline-flex items-center justify-center rounded-md bg-[var(--brand-color-primary)] px-6 py-4 text-sm font-black uppercase text-white transition duration-300 hover:bg-[var(--brand-color-primary-strong)]"
          href={homeContent.header.ctaHref}
          onClick={closeMenu}
        >
          {homeContent.header.ctaLabel}
          <span aria-hidden="true" className="ml-2">
            -&gt;
          </span>
        </a>
      </aside>

      <button
        aria-label="Close navigation menu"
        className={`fixed inset-0 z-[998] bg-slate-950/55 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        type="button"
      />
    </header>
  );
}
