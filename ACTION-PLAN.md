# SEO action plan

Target: local `dev` branch before deployment.

## Implementation status — 24 July 2026

All source-controlled high- and medium-priority work in this plan is implemented:

- Static HTML generation for the homepage and six project case studies.
- Shared project content model with visible captions and no hover text pop-up.
- Per-route titles, descriptions, canonicals, social metadata and JSON-LD.
- Person/ProfilePage/WebSite/ItemList, breadcrumb and project schema.
- Responsive AVIF/WebP project media, lazy mounting and deferred video/live data.
- Branded social image, optimized schema portrait and favicon.
- Robots, sitemap, llms.txt and a real branded 404.
- Nginx redirects, true 404s, compression, caching and security headers.
- Mobile navigation, 44 px controls, contrast and laptop-height improvements.
- Optional Cloudflare Web Analytics via `VITE_CLOUDFLARE_ANALYTICS_TOKEN`.

Final local Lighthouse: SEO 100, accessibility 100, best practices 100, performance 99.

Remaining launch operations require production ownership or credentials:

- Deploy the `dev` branch and verify the canonical host/HTTPS redirect.
- Set the Cloudflare Web Analytics token.
- Verify Search Console and Bing Webmaster Tools, then submit `sitemap.xml`.
- Review the drafted project facts and add truthful dates or measurable outcomes where available.
- Establish field CWV and search baselines after the new site has real traffic.

## Critical

No deployed critical indexing block is scored because this branch is not live yet.

## High — before launch

### 1. Make the first HTML response useful

Effort: medium  
Impact: technical, content, on-page, GEO, LCP

- Prerender or statically generate the homepage.
- Put the final title, description, canonical, social metadata, and JSON-LD in initial HTML.
- Keep React for progressive enhancement and live widgets.

Acceptance:

- `curl` of the built homepage contains H1, bio, project headings, project summaries, and primary links.
- The page remains useful with JavaScript disabled.

### 2. Expose project context

Effort: low–medium  
Impact: content, on-page, SXO, GEO

- Render a Work H2.
- Render each project title semantically.
- Show category, one concise outcome, status/date, and visible CTA.
- Add truthful role, stack, and result data.

Acceptance:

- Every project can be understood without hovering or opening an external site.
- Heading order is H1 → section H2 → project H3.

### 3. Add the complete metadata baseline

Effort: low  
Impact: indexation, entity clarity, social sharing

- Canonical `https://nickesselman.nl/`.
- Static final title.
- Open Graph and Twitter card tags.
- 1200×630 social image.
- Person + ProfilePage + WebSite JSON-LD.
- Favicon and touch icon.

### 4. Fix crawl routing

Effort: low–medium  
Impact: crawl budget, duplicate URLs, index quality

- Publish `robots.txt` and a one-URL `sitemap.xml`.
- Redirect `/portfolio`, `/portfolio/`, and `/index.html`.
- Return 404 for unknown paths.
- Add explicit redirects for verified legacy query URLs during deployment.

### 5. Reduce initial media contention

Effort: medium  
Impact: LCP, bandwidth, mobile UX

- Mount only active/adjacent carousel slides.
- Use IntersectionObserver before activating carousels/video.
- Add `loading="lazy"` and `decoding="async"` to noncritical images.
- Do not set the video `src` until near viewport or selected.
- Generate 320/640/960 image variants with `srcset` and `sizes`.

Acceptance:

- Initial project-image transfer is reduced by at least 1 MB.
- Simulated mobile LCP is below 2.5 s.

## Medium — first month

### 6. Add three flagship case studies

Start with PartyVR, LAMP, and MYMacropad.

Each should include:

- Problem and context
- Nick’s role
- Stack and hardware
- Constraints and decisions
- Verifiable result/status
- Date and last updated
- Media
- Repository/demo
- Related project link

### 7. Strengthen About and recruiter paths

- Replace the short generic About copy with 100–180 factual words.
- Add experience/skills or résumé destination.
- Clarify location and collaboration interests.
- Correct grammar and standardize “full-stack.”

### 8. Improve mobile and laptop UX

- Add a height-sensitive breakpoint for 768 px-high laptops.
- Increase touch targets to at least 44×44 px.
- Restore Work/About access on mobile.
- Increase caption text to 14–16 px.
- Darken muted text to AA contrast.

### 9. Add AI-readable support files

- Publish `llms.txt` after crawlable content exists.
- Decide explicit policies for search, retrieval, and training crawlers.
- Add factual, self-contained project summaries.

### 10. Configure production delivery

- Brotli/Gzip text assets.
- Immutable cache headers for hashed assets.
- Suitable versioned caching for `/projects`.
- CSP/frame protection, nosniff, referrer policy.
- HSTS after hostname/HTTPS redirect behavior is confirmed.

## Low — backlog and measurement

- Recompress `lamp/floor-test.webp` below 200 KB.
- Remove or resize unused 11.78 MB `src/assets/me.png`.
- Consider valid `VideoObject` metadata for Monkey Swing.
- Configure Search Console, GA4, CrUX/PageSpeed API, and Bing Webmaster Tools.
- Capture a post-launch SEO drift baseline.
- Measure p75 LCP, INP, and CLS after enough real traffic exists.
- Standardize the same short identity descriptor across external profiles.
- Earn relevant project/client/event links to specific case studies.

## Suggested implementation order

1. Semantic project copy and headings.
2. Static metadata, JSON-LD, social image.
3. Robots, sitemap, redirects, and real 404s.
4. Prerender/SSG.
5. Carousel/media loading.
6. Responsive and accessibility fixes.
7. Case-study routes.
8. Deployment migration and webmaster submissions.
