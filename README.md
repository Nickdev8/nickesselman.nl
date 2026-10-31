# NickEsselman.nl

Minimal personal site built with React, Vite, and Tailwind CSS.

## Docker

```bash
docker compose up --build -d
```

The site will be available at `http://localhost:3012`.

If Docker on your machine is missing the `buildx` plugin, use:

```bash
DOCKER_BUILDKIT=0 COMPOSE_DOCKER_CLI_BUILD=0 docker compose up --build -d
```

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build produces prerendered HTML for the homepage and every project case study. JavaScript
hydrates the carousels and live widgets after the static content is visible.

## CV click notifications

Clicking the CV print/PDF button sends browser and device details to `/api/cv-download`.
Production nginx adds the connection IP and any forwarded IP/country headers, then posts
the message to `https://ntfy.sh/nickesselman-nickcvdownload`. The Vite development proxy
forwards the browser details without nginx's IP fields. This tracks clicks, not completed
PDF saves. The ntfy.sh topic is publicly readable, so its messages are not confidential.

## Google Analytics

GA4 stream `G-F6V07ZW9PS` loads only after the visitor accepts analytics cookies.
The EN/NL banner stores the choice locally; the footer Cookies button reopens it.
Rejecting after acceptance disables GA, clears its cookies and reloads the page.
Advertising consent stays denied. Page URLs and referrers omit query strings and
fragments. No Measurement Protocol secret or backend endpoint is needed.

Build and deploy the site **and** `docker/nginx.conf` together: nginx permits the
Google tag and Analytics collection hosts. After deployment, accept cookies on
`https://nickesselman.nl` without an ad blocker and confirm the visit in GA4 Realtime
or Google Tag Assistant. Local browser checks stub Google requests to avoid test traffic.
The Google property’s Enhanced Measurement settings control automatic interactions;
review them before collecting form or other potentially identifying content.

Optional privacy-first traffic measurement uses Cloudflare Web Analytics:

```bash
VITE_CLOUDFLARE_ANALYTICS_TOKEN=your-token npm run build
```

## Tailwind Setup

If you start from a fresh Vite React app, install Tailwind and its Vite plugin:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Then add `tailwindcss()` to `vite.config.js` and `@import "tailwindcss";` to your main stylesheet.
