# Pepeti Balaji — Portfolio

A personal portfolio presenting Pepeti Balaji's test automation experience, backend engineering projects, technical skills, and resume. Built with React, TypeScript, and Vite.

The site includes project details in a dialog, a theme switcher, a skills overview, professional links, and a downloadable resume. It runs as a static frontend without a backend or environment variables.

## Run locally

Open a terminal in the project directory and run:

```powershell
cd C:\portfolio
npm install
npm run dev
```

Open the local URL printed by Vite. To build and preview the production version:

```powershell
npm run build
npm run preview
```

The production files are generated in `dist/`. Node.js 22 is recommended; the project was built locally with Node.js 22.11.0.

## Publish on Vercel

Push this project to [pepeti-balaji-portfolio](https://github.com/pepetibalaji/pepeti-balaji-portfolio), then select **Add New → Project** in Vercel and import that repository. Use these settings:

| Setting               | Value                          |
| --------------------- | ------------------------------ |
| Root Directory        | Default: repository root (`.`) |
| Framework Preset      | `Vite`                         |
| Install Command       | `npm install`                  |
| Build Command         | `npm run build`                |
| Output Directory      | `dist`                         |
| Environment Variables | None required                  |

Vercel supports Vite applications and Git-connected deployments. Review the settings, select **Deploy**, and open the deployment URL once the build finishes. [Official Vite guide](https://vercel.com/docs/frameworks/frontend/vite).

The application lives at the repository root. If you later move it into a subfolder, update Vercel's **Root Directory** to that folder. [Official Root Directory guidance](https://vercel.com/docs/monorepos).

## Update your portfolio

- Edit `src/data.ts` to update profile details, experience, project descriptions, skills, and links.
- Place static assets in `public/`.
- Replace `public/Pepeti-Balaji-Resume.pdf` to update the resume download while preserving its URL.
- Review the page title and metadata in `index.html` when changing your professional positioning.
- After changes, run `npm run build` and check the preview at desktop and mobile widths. Verify project dialogs, theme switching, navigation, and the resume download.

Contact actions use the published contact links. No form submission service is required.

Content provenance and verification limits are recorded in [SOURCES.md](./SOURCES.md).

## Quality checks

```powershell
npx playwright install chromium
npm test
npm run format:check
```

The Playwright suite checks keyboard navigation, project dialogs and focus restoration, theme persistence, mobile layouts, contact links, clipboard behavior, resume downloads, and automated accessibility with axe. GitHub Actions runs formatting, the production build, and browser tests on pushes to main and pull requests. Automated checks complement manual visual review; they do not establish full WCAG conformance.

DM Sans and Manrope are served locally from `public/fonts/`; their SIL Open Font Licenses are included. After deployment, set the Open Graph and Twitter image URLs in `index.html` to your absolute deployed origin for social crawlers.
