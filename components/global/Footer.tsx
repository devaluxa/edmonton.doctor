import BrandMark from "./BrandMark";
import {
  businessName,
  clinicLocationList,
  homeContent,
} from "../../lib/business/config";
import { serviceNavigationPages } from "../../lib/sitePages";

export default function Footer() {
  const year = new Date().getFullYear();
  const footerContent = homeContent.footer;

  return (
    <footer className="border-t border-white/10 bg-[var(--brand-color-footer)] px-5 py-10 text-slate-300 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.25fr_0.95fr] lg:gap-12">
        <div className="min-w-0">
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400 sm:text-base">
            {footerContent.description}
          </p>
        </div>

        <div className="min-w-0">
          <h2 className="brand-h2 footer-heading text-base font-extrabold text-white sm:text-lg">
            {footerContent.contactHeading}
          </h2>
          <div className="mt-6 grid gap-4">
            {clinicLocationList.map((location) => (
              <article
                className="border-l-2 border-[var(--brand-color-primary)] pl-4"
                key={location.id}
              >
                <h3 className="text-sm font-extrabold text-white sm:text-base">
                  {location.name}
                </h3>
                <div className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">
                  {location.addressLines.map((line) => (
                    <p className="break-words" key={`${location.id}-${line}`}>
                      {line}
                    </p>
                  ))}
                </div>
                <a
                  className="mt-3 inline-flex min-h-10 items-center rounded-md bg-white/5 px-3 py-2 text-xs font-bold text-white ring-1 ring-white/10 transition hover:bg-[var(--brand-color-primary)] sm:px-4 sm:text-sm"
                  href={location.phoneHref}
                >
                  {location.phone}
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="brand-h2 footer-heading text-base font-extrabold text-white sm:text-lg">
            {footerContent.socialHeading}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400 sm:mt-7">
            {footerContent.servicesIntro}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
            {footerContent.serviceLinks.map((link) => (
              <a
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-extrabold text-white transition hover:-translate-y-0.5 hover:border-[var(--brand-color-primary)] hover:bg-[var(--brand-color-primary)] sm:px-4 sm:text-sm"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
            {serviceNavigationPages.slice(0, 3).map((link) => (
              <a
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-[var(--brand-color-accent)]/35 bg-[var(--brand-color-accent)]/10 px-3 py-2 text-xs font-extrabold text-[var(--brand-color-accent)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-color-accent)] hover:text-[var(--brand-color-ink)] sm:px-4 sm:text-sm"
                href={link.path}
                key={link.path}
              >
                {link.eyebrow}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 sm:mt-12 sm:pt-7">
        <p className="text-xs leading-6 text-slate-400 sm:text-sm sm:leading-7">
          &copy; {year} {businessName}. {footerContent.copyrightSuffix}
        </p>
      </div>
    </footer>
  );
}
