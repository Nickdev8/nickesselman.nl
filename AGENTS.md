# Repository notes

- React/Vite site. `npm run build` produces the client, SSR bundle, and prerendered pages.
- Production serves `dist/` through `docker/nginx.conf`; Docker Compose maps port 3012.
- The CV print button posts to `/api/cv-download`. Production nginx adds connection and proxy IP headers before forwarding to ntfy; the Vite dev proxy forwards browser details only. See README for the public-topic caveat.
- Verified 2026-10-03: `npm run build` and `nginx -t` with `nginx:1.27-alpine` passed after the CV notification change.
- Verified 2026-10-06: `npm run build` passed with today's laptop/phone screen time replacing calories; prefer `todayMinutes`, falling back to hours. Device-state and phone-state refresh every minute in `FitbitWidget.jsx`.
- Commit messages must not add Copilot as an author, co-author, contributor, or trailer. Use only human author information provided by Nick.
- Verified 2026-10-09: shorter English/Dutch CV copy and compact layout; `npm run build` passed. Browser checked mobile overflow and print layout. CV content: `src/data/cv.js`; layout: `src/components/CvPage.jsx`, `src/styles/cv.css`.
- Verified 2026-10-09: Bloesem, Edith and Jayden have English/Dutch project pages. Cards link to project + website/game; source links live on project pages. `npm run build`, six prerender/sitemap checks, mobile layout and keyboard/carousel checks passed. Stories: `src/data/projectContent.js`; link labels: `src/data/projectLinks.js`.
