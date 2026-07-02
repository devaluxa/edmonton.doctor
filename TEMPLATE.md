# Edmonton Doctors Project Guide

This static Next.js site was bootstrapped from a reference Next.js template
and rebuilt for Edmonton Doctors.

## Primary Files To Edit

- `lib/business/config.ts`
  - Business name, clinic locations, doctors, navigation, hero copy, contact copy, generated image references, and brand colors.
- `lib/sitePages.ts`
  - Page routes, SEO titles, service pages, FAQ items, sitemap entries, and the placeholder domain.
- `lib/serviceData.ts`
  - Homepage service cards and service list sections.
- `styles/brand.css`
  - Global brand colors, typography, and reusable theme variables.
- `public/images/medical/`
  - Generated medical visuals used by the homepage and page templates.

## Launch Checklist

1. Replace the placeholder `siteUrl` in `lib/sitePages.ts` with the production domain.
2. Confirm the `/register/` OnBooking defaults or override them with `NEXT_PUBLIC_FORMS_API_URL` and `NEXT_PUBLIC_EDMONTON_DOCTORS_REGISTRATION_FORM_ID`.
3. Confirm clinic hours and phone numbers before publishing.
4. Review the generated imagery and replace it with real clinic photos if available.
5. Run `npm run build` and `npm run review:home` before publishing.

## Notes

- The registration form is intentionally a minimal lead form. It does not request health card numbers, dates of birth, diagnosis history, or detailed medical intake.
- Components should stay content-driven so future edits remain centralized in the config and data files.
