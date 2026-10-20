# HighFly AI website

A responsive React + TypeScript + Vite website for HighFly AI. Routing uses Wouter. The experience presents the company’s practical software, AI application, automation and digital solution capabilities, plus accurately labeled project work.

## Run locally

From the workspace root:

```sh
pnpm install
pnpm --filter @workspace/highfly-ai-site run dev
```

## Build and preview

```sh
pnpm --filter @workspace/highfly-ai-site run typecheck
pnpm --filter @workspace/highfly-ai-site run build
pnpm --filter @workspace/highfly-ai-site run serve
```

The Replit-managed workflow supplies the required `PORT` and `BASE_PATH` values for development. The production build is created in `artifacts/highfly-ai-site/dist/public/`. Deploy that static output to a platform that supports SPA history fallback: every requested route should serve `index.html`, including `/services`, `/work/:slug`, `/about`, `/contact` and `/privacy`. Configure the deployment base path to match the hosting environment if it is not mounted at `/`.

## Contact form integration

**The form does not transmit submissions until delivery is enabled.** The API server now has a validated, rate-limited `/api/contact` route that sends inquiries through the connected Replit Resend integration to `m.faizansajid102418@gmail.com`. The frontend remains disabled because the connected Resend account currently has no verified sending domain.

To enable delivery:

1. Verify a sending domain in Resend and choose a sender email at that domain. A personal Gmail address cannot be used as the sender.
2. Set server environment variable `RESEND_FROM_EMAIL` to that verified sender address. The Resend key stays in the Replit-managed integration; do not add a key to source code or `VITE_*` variables.
3. Set the website build environment variable `VITE_CONTACT_ENDPOINT=/api/contact`. Do this only after the server sender is configured. Without it, the form displays that submissions are not sent.
4. Test successful delivery, provider failures, validation, consent, spam controls and the privacy copy with the actual production configuration before publishing. Review retention and privacy wording against the real email account settings.

The form sends `name`, `email`, `description`, `service`, `company`, `phone`, `budget`, `timeline`, `notes`, `consent` and a hidden spam-check field as JSON. The endpoint validates field lengths, requires consent, rejects filled honeypots, and limits each IP address to five submissions per 15 minutes. It does not store inquiry contents in a separate database.

## SEO and domain

Each route sets its own title, description and Open Graph title/description in the browser. No canonical URL is added. The official domain is not yet known, so there is no canonical domain or absolute sitemap URL in this implementation. Replace the sitemap placeholder and configure the production domain before launch; do not submit preview URLs to search engines.

## Launch checklist

- [ ] Decide and configure the official production domain and HTTPS hosting.
- [ ] Add the correct absolute URLs to `public/sitemap.xml`; validate it and submit it after domain confirmation.
- [ ] Re-check route-specific metadata and social previews on the production host.
- [ ] Confirm the logo file and approved favicon presentation.
- [ ] Verify the supplied company email and phone, team roles, personal profile links and photo approvals before launch.
- [ ] Verify a Resend sending domain, set `RESEND_FROM_EMAIL` and `VITE_CONTACT_ENDPOINT=/api/contact`, then test real delivery and failure paths. Until then, the form does not transmit submissions.
- [ ] Review the Privacy Policy against actual data flows, legal obligations, endpoint retention and spam prevention before enabling submissions.
- [ ] Confirm project status and descriptions with the maintainers. HighFly Hospitality is in development; the Centralized Student Information System is an academic prototype; Baba Store is a repository project; AI Studio functionality is unverified; the School Management System is planned only.
- [ ] Replace illustrative portfolio artwork only with authorized, genuine project visuals. Current artwork is explicitly labeled illustrative and is not evidence of working software.
- [ ] Check keyboard navigation, mobile menu, reduced-motion behavior, form validation, external links and direct route refreshes on the selected host.
- [ ] Run `pnpm --filter @workspace/highfly-ai-site run typecheck` and `pnpm --filter @workspace/highfly-ai-site run build` before deployment.

## Content integrity

This site does not include invented customers, testimonials, people, company history, awards, metrics, certifications, launch claims or contact details. School Management System appears only as a planned solution, with potential features clearly described as proposals.
