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

**The form does not transmit submissions until delivery is configured.** There is no email provider, verified company email, or backend endpoint configured. Without configuration, the frontend validates the fields and displays a clear notice that nothing was sent; it does not display a false success state.

To connect delivery:

1. Implement and deploy a secure server-side endpoint (for example, a serverless function) that accepts a validated JSON `POST`, sanitizes and rate-limits input, applies suitable spam prevention, and sends the enquiry using a provider configured only on the server.
2. Return a successful HTTP status only after the endpoint has accepted the enquiry. Return a non-success status for errors. Configure CORS/CSRF protections as appropriate for the deployment.
3. Set the frontend environment variable `VITE_CONTACT_ENDPOINT` to the endpoint URL in the deployment environment. Do not put provider API keys or private credentials in `VITE_*` variables or frontend code.
4. Test delivery, failure, validation, privacy copy, spam controls and retention with the actual production configuration before publishing. Update the privacy policy to reflect the real data handling.

The form sends the fields `name`, `email`, `description`, `service`, `company`, `phone`, `budget`, `timeline`, `notes`, and `consent` as JSON with `credentials: "include"`. Do not store more personal information than needed.

## SEO and domain

Each route sets its own title, description and Open Graph title/description in the browser. No canonical URL is added. The official domain is not yet known, so there is no canonical domain or absolute sitemap URL in this implementation. Replace the sitemap placeholder and configure the production domain before launch; do not submit preview URLs to search engines.

## Launch checklist

- [ ] Decide and configure the official production domain and HTTPS hosting.
- [ ] Add the correct absolute URLs to `public/sitemap.xml`; validate it and submit it after domain confirmation.
- [ ] Re-check route-specific metadata and social previews on the production host.
- [ ] Confirm the logo file and approved favicon presentation.
- [ ] Supply and verify an official contact method before adding it to the site. No email address, phone number, office address, social profiles or business registration information has been invented here.
- [ ] Configure the secure contact-form delivery endpoint and `VITE_CONTACT_ENDPOINT`; test real delivery and failure paths. Until then, the form does not transmit submissions.
- [ ] Review the Privacy Policy against actual data flows, legal obligations, endpoint retention and spam prevention before enabling submissions.
- [ ] Confirm project status and descriptions with the maintainers. HighFly Hospitality is in development; the Centralized Student Information System is an academic prototype; Baba Store is a repository project; AI Studio functionality is unverified; the School Management System is planned only.
- [ ] Replace illustrative portfolio artwork only with authorized, genuine project visuals. Current artwork is explicitly labeled illustrative and is not evidence of working software.
- [ ] Check keyboard navigation, mobile menu, reduced-motion behavior, form validation, external links and direct route refreshes on the selected host.
- [ ] Run `npm run typecheck` and `npm run build` before deployment.

## Content integrity

This site does not include invented customers, testimonials, people, company history, awards, metrics, certifications, launch claims or contact details. School Management System appears only as a planned solution, with potential features clearly described as proposals.
