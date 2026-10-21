# Edmonton Doctors Deployment

This site is a static Next.js export. GitHub Actions builds the site and deploys the generated `out/` directory to CloudPanel when changes are pushed to `main`.

## Production Target

- Domain: `edmonton.doctor`
- CloudPanel host: `148.116.84.122`
- CloudPanel user: `edmonton`
- Web root: `/home/edmonton/htdocs/edmonton.doctor`
- GitHub branch: `main`

## Required GitHub Secrets

Add these in GitHub under **Settings -> Secrets and variables -> Actions -> Repository secrets**:

- `CLOUDPANEL_HOST`: `148.116.84.122`
- `CLOUDPANEL_USER`: `edmonton`
- `CLOUDPANEL_PORT`: `22`
- `CLOUDPANEL_SSH_KEY`: private deploy key for the `edmonton` CloudPanel user

Optional production form secrets:

- `NEXT_PUBLIC_FORMS_API_URL`
- `NEXT_PUBLIC_EDMONTON_DOCTORS_BEVERLY_REGISTRATION_FORM_ID`
- `NEXT_PUBLIC_EDMONTON_DOCTORS_BALWIN_REGISTRATION_FORM_ID`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

The `/register/` funnel has production-safe public defaults for OnBooking. It routes by selected clinic:

- API URL: `https://api.onbooking.ca/v1/submissions`
- Beverly/Kingsley form ID: `a8560735-5edd-443a-beba-990bd08cc8d3`
- Beverly/Kingsley submit route: `https://api.onbooking.ca/v1/submissions/a8560735-5edd-443a-beba-990bd08cc8d3`
- Balwin form ID: `284f30f7-d0d2-4973-80d3-2d06533b8e64`
- Balwin submit route: `https://api.onbooking.ca/v1/submissions/284f30f7-d0d2-4973-80d3-2d06533b8e64`

Only add the form secrets above if these values need to be overridden for a future environment or a new form.

## Create The Deploy Key

Generate a dedicated key that is only used for GitHub Actions deploys:

```powershell
ssh-keygen -t ed25519 -C "github-actions-edmonton-doctor" -f "$env:USERPROFILE\.ssh\edmonton_doctor_github_actions" -N ""
```

Copy the public key and add it to CloudPanel under the `edmonton` site user's SSH keys:

```powershell
Get-Content "$env:USERPROFILE\.ssh\edmonton_doctor_github_actions.pub"
```

Add the private key to GitHub as `CLOUDPANEL_SSH_KEY`. Do not commit this key:

```powershell
Get-Content -Raw "$env:USERPROFILE\.ssh\edmonton_doctor_github_actions" | gh secret set CLOUDPANEL_SSH_KEY
```

You can also set the other secrets with GitHub CLI:

```powershell
"148.116.84.122" | gh secret set CLOUDPANEL_HOST
"edmonton" | gh secret set CLOUDPANEL_USER
"22" | gh secret set CLOUDPANEL_PORT
```

## Verify SSH

After adding the public key in CloudPanel, test SSH access:

```powershell
ssh -i "$env:USERPROFILE\.ssh\edmonton_doctor_github_actions" edmonton@148.116.84.122
```

Confirm the web root exists:

```bash
ls -la /home/edmonton/htdocs/edmonton.doctor
```

## Deploy Flow

1. Push to `main`.
2. GitHub Actions runs `npm ci`.
3. GitHub Actions runs `npm run build`.
4. GitHub Actions uploads `out/` to `/home/edmonton/htdocs/edmonton.doctor/` with `rsync --delete`.
5. `.well-known/` is excluded so SSL/ACME files are not removed.

Pull requests only run the build and do not deploy.

## Production Redirects

The Next.js build is a static export. Permanent redirects are applied in the CloudPanel NGINX vhost, not through Next.js server redirects. The complete snippet is in `deploy/seo-redirects.conf`; add it inside the `edmonton.doctor` server block, before the asset location. It preserves query parameters and supports URLs with and without a trailing slash.

Do not redirect `/doctors/dr-kingsley-lasing/`: it is an indexable physician profile again.

Verify each legacy route returns HTTP 301 with the expected Location header, then confirm the destination returns 200. Keep the moved-page fallbacks for static previews.

## Search Console and Analytics

`public/googlece79505fe13cdbe6.html` is the Search Console ownership verification file for the HTTPS URL-prefix property. Keep it in all deployments.

Google Tag Manager `GTM-NBJH3GNB` configures GA4 `G-H0EWZ53PXR`. Do not add a second direct gtag configuration for the same ID. The runtime only loads tags on the production hostname, keeping localhost and preview tests out of production reporting.

Successful registration responses emit `generate_lead`; rejected responses do not. Phone and Healthquest booking links emit `click_to_call` and `booking_click`. These events contain no form values, doctor choices, health information, or contact details. Mark `generate_lead` as a key event in GA4. Do not count thank-you page refreshes as new registrations.

The GA4 property also contains older EdmontonMDs page titles. Use a hostname filter when comparing domains rather than deleting historic data.

## Image Assets

Responsive WebP variants of the four existing medical PNG illustrations are committed under `public/images/medical/`. To regenerate them with the installed Sharp package, run `node scripts/optimize-medical-images.mjs`. The original PNGs remain available for existing external references.

## Cloudflare And SSL

Once DNS points to `148.116.84.122`, enable SSL in CloudPanel for `edmonton.doctor`.

After CloudPanel SSL is active, set Cloudflare SSL mode to **Full (strict)**.
