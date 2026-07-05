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
- `NEXT_PUBLIC_EDMONTON_DOCTORS_REGISTRATION_FORM_ID`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

The `/register/` funnel has production-safe public defaults for OnBooking:

- API URL: `https://api.onbooking.ca/v1/submissions`
- Form ID: `a8560735-5edd-443a-beba-990bd08cc8d3`
- Submit route: `https://api.onbooking.ca/v1/submissions/a8560735-5edd-443a-beba-990bd08cc8d3`

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

The static export includes a noindex moved page for `/services/walk-in-care/`, but the production host should serve a real permanent redirect for SEO.

Add these exact-match redirects in the CloudPanel NGINX vhost for `edmonton.doctor`:

```nginx
location = /services/walk-in-care {
  return 301 /walk-in/;
}

location = /services/walk-in-care/ {
  return 301 /walk-in/;
}

location = /services/family-medicine {
  return 301 /services/family-medicine-edmonton/;
}

location = /services/family-medicine/ {
  return 301 /services/family-medicine-edmonton/;
}
```

## Cloudflare And SSL

Once DNS points to `148.116.84.122`, enable SSL in CloudPanel for `edmonton.doctor`.

After CloudPanel SSL is active, set Cloudflare SSL mode to **Full (strict)**.
