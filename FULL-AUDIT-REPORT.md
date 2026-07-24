# SEO audit — Nick Esselman portfolio

Analyzed: 24 July 2026  
Target: local `dev` branch in this repository  
Intended canonical URL: `https://nickesselman.nl/`

## Post-implementation result

The source-controlled implementation is complete. A final local production build measured:

| Lighthouse category | Final |
|---|---:|
| SEO | **100** |
| Accessibility | **100** |
| Best practices | **100** |
| Performance | **99** |

Key mobile lab metrics:

- FCP: 1.2 s
- LCP: 2.1 s, down from 4.88 s
- CLS: 0
- TBT: 0 ms
- Total transfer: 408 KiB, down from 1.91 MiB

All seven intended routes contain their H1, headings, copy, canonical, social metadata and
valid JSON-LD in the built HTML before JavaScript runs. The production container returns 200
for real routes, 301 for `/portfolio`, `/portfolio/` and `/index.html`, and 404 for an unknown
route. `robots.txt`, `sitemap.xml` and `llms.txt` all return 200.

This does not make the original baseline below obsolete: it records what was found and why
the implementation changed. Search Console/Bing verification, analytics token configuration,
deployment, indexing and off-site authority still depend on production access and real traffic.

The current live domain is an older site. It was excluded from branch scores and visual findings. Its stale indexed URLs are covered only under deployment migration.

## Executive summary

**SEO Health Score: 48/100**

Business type: personal developer and maker portfolio.

The branch has a distinctive visual identity, original project evidence, good image alt text, a clear H1, and modest JavaScript/CSS bundles. Its main SEO weakness is not design quality; it is that most useful information is unavailable to crawlers and visitors. The initial HTML is nearly empty, project descriptions and headings are disabled, and no canonical, structured data, sitemap, social metadata, or dedicated project URLs exist.

The fastest path to a much stronger result is:

1. Prerender the homepage so identity and project content exist in the first HTML response.
2. Render concise project context and semantic headings.
3. Add canonical, social metadata, Person/ProfilePage/WebSite JSON-LD, robots, and sitemap.
4. Stop requesting every carousel asset during initial load.
5. Fix unknown routes so they return real 404 responses.

## Scores

| Category | Weight | Score | Weighted |
|---|---:|---:|---:|
| Technical SEO | 22% | 47 | 10.34 |
| Content quality | 23% | 57 | 13.11 |
| On-page SEO | 20% | 48 | 9.60 |
| Schema / structured data | 10% | 0 | 0.00 |
| Performance / CWV | 10% | 82 | 8.20 |
| AI search readiness | 10% | 35 | 3.50 |
| Images | 5% | 66 | 3.30 |
| **Overall** | **100%** |  | **48.05 → 48** |

Additional diagnostics:

- Visual/SXO: 76/100
- Search-experience alignment: 54/100
- Backlinks: insufficient data for a defensible numeric score

## Highest-priority findings

### High — meaningful content requires JavaScript

The production HTML contains only an empty `#root`. The H1, bio, project names, links, and live signals appear only after React runs. Google can render JavaScript, but first-wave indexing, non-rendering crawlers, social scrapers, and AI agents receive almost no page content.

Prerender or statically generate the homepage. Keep React hydration for carousels and live widgets.

### High — the strongest project copy is hidden

`SHOW_PROJECT_DETAILS = false` prevents six project headings, types, descriptions, and actions from rendering. Visible static narrative is extremely thin, despite the repository already containing useful descriptions and strong original media.

Keep the cards visually quiet, but expose a semantic project heading plus one concise sentence, role/stack, status/date, and visible destination.

### High — missing canonical and entity metadata

The initial title is `NickEsselman.nl` and changes only after React runs. There is no canonical URL, Open Graph/Twitter metadata, favicon/social image, or structured data.

Add the final title and canonical in `index.html`, plus an initial-HTML JSON-LD `@graph` containing:

- `WebSite`
- `ProfilePage`
- `Person`
- `sameAs` links for GitHub, LinkedIn, Instagram, blog, and SpaceHey

### High — unknown routes become soft 404s

Nginx sends every missing path to `index.html` with HTTP 200. This makes `/anything`, `/portfolio/`, and a missing `/sitemap.xml` look indexable.

Serve the one real page at `/`, explicitly redirect known legacy paths, and return a real 404 for everything else.

### High — eager gallery media delays mobile LCP

Lighthouse 13 mobile:

- Performance: 82
- FCP: 1.20 s
- LCP: 4.88 s — fail
- CLS: 0.00 — pass
- TBT: 0 ms
- INP: unknown until real-user field data exists

The H1 is the LCP element. All 16 project WebPs, Spotify art, and a video metadata request compete during initial load. Lighthouse recorded 1.91 MB across 26 requests and estimated 931 KB of image-delivery savings.

Mount only the active/adjacent slide, gate each carousel and video with `IntersectionObserver`, add lazy/async image loading, and create responsive 320/640/960 variants.

## Technical SEO

### Strengths

- Valid `lang="en"` and viewport metadata.
- Accurate local meta description.
- Successful production build.
- Small application bundles: about 66 KB JS and 6 KB CSS gzip.
- Responsive breakpoints and reduced-motion support.
- Carousel aspect ratio reserves media space.

### Issues

- CSR-only body and client-only title.
- No canonical.
- No `robots.txt` or sitemap.
- SPA fallback creates soft 404s.
- `/portfolio` redirect occurs only in browser JavaScript.
- No source-controlled security headers.
- No explicit immutable caching/compression policy in Nginx.
- Brand control and carousel arrows are below recommended touch size.

Recommended deployment headers include CSP or `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, and HSTS after HTTPS/host consolidation is confirmed at the reverse proxy.

## Content, on-page SEO, and E-E-A-T

### Strengths

- Natural use of Nick Esselman, full-stack developer, maker, software, games, VR, hardware, and PCB design.
- Six authentic projects with original photos, repos, and playable demos.
- Concrete technologies include RP2040, Unity, Godot, Shelly, VR, and PCB work.
- Good readability; the issue is lack of depth, not complexity.
- GitHub, LinkedIn, blog, Instagram, and contact paths are easy to find.

### Issues

- One H1, no visible H2s, and a possible jump to dynamic H3 content.
- Project names are small spans, not headings.
- About copy is short, generic, and grammatically rough.
- No role, stack, constraints, decisions, outcomes, dates, or freshness per project.
- No internal project-detail pages, résumé, or experience path.
- External links end the journey before the site establishes expertise.

Recommended content model:

- Homepage: concise factual bio of 100–180 words.
- Each card: title, category, one-sentence outcome, status/date, destination.
- Three flagship case studies first: PartyVR, LAMP, and MYMacropad.
- Each case study: problem, role, stack, constraints, decisions, result, media, repo/demo, and updated date.

## Structured data and sitemap

Schema score is 0 because no JSON-LD, Microdata, or RDFa exists. This is absence, not an invalid implementation.

Recommended homepage graph:

- `WebSite` with canonical URL, name, language, and Person publisher.
- `ProfilePage` with the Person as `mainEntity`.
- `Person` with job title, skills/`knowsAbout`, and verified `sameAs` profiles.

Do not use `Organization` or `LocalBusiness` for this personal portfolio. Add `VideoObject` for Monkey Swing only when a truthful upload date is available.

The sitemap should contain only:

```xml
<loc>https://nickesselman.nl/</loc>
```

Add project URLs later when real case-study routes exist.

## Images and media

Image score: 66/100.

### Strengths

- All 16 project images use WebP.
- All are consistently cropped to 960×1280.
- All project alt texts are unique, descriptive, and naturally worded.
- No meaningful image is missing alt text.
- Descriptive, crawlable filenames and folder paths.

### Issues

- All carousel images are eager candidates.
- No `srcset`, `sizes`, or AVIF alternatives.
- No intrinsic `width`/`height` attributes.
- Spotify art space is not fully reserved before the API result.
- Missing 1200×630 social image and Open Graph/Twitter image metadata.
- `lamp/floor-test.webp` is 295 KB and should be recompressed.
- The unused `src/assets/me.png` is 11.78 MB; remove or resize it before any future use.

## Visual and mobile findings

Correct local screenshots:

- [Desktop](screenshots/local_current_desktop.png)
- [Laptop](screenshots/local_current_laptop.png)
- [Tablet](screenshots/local_current_tablet.png)
- [Mobile](screenshots/local_current_mobile.png)

Strengths:

- Distinctive visual identity and clear role statement.
- No horizontal overflow at tested widths.
- CLS measured 0 across all four captures.
- Contact remains visible.
- Mobile H1, intro, and recent-work cue fit above the fold.

Issues:

- At 1366×768, roughly half the H1 and all recent work sit below the first viewport.
- Project context is too small and sparse.
- Mobile removes Work and About from navigation.
- Several controls are 31–32 px rather than 44–48 px.
- Muted 12 px text is approximately 4.23:1 contrast, below AA for normal text.

## AI search / GEO

GEO score: 35/100.

The project media is strong, but AI systems have little crawlable explanatory text to quote. There is no visible factual bio, project answer block, Person entity graph, project authorship, dates, outcomes, or `llms.txt`.

Recommended:

- Prerender identity and project summaries.
- Add semantic headings and concise factual passages.
- Add Person/ProfilePage/WebSite schema.
- Publish `robots.txt`, `sitemap.xml`, and `llms.txt`.
- Add project pages with self-contained 130–170 word summaries.

Crawler rules should be an explicit deployment decision. Search crawlers and user-triggered retrieval agents can be allowed while training crawlers are controlled separately.

## Authority and backlinks

No numeric backlink score is reported because Moz/Bing credentials and usable Common Crawl metrics were unavailable.

Confirmed public evidence includes:

- GitHub profile linking the domain.
- LinkedIn profile listing the portfolio/blog.
- A client credit on `mariahoogland.nl`.

Identity is broadly consistent, but positioning varies. Use one canonical descriptor across profiles, for example: “Nick Esselman — full-stack developer and maker in the Netherlands.”

Build links through genuine project READMEs, Hack Club/event profiles, client credits, school/alumni profiles, and substantive case studies. Do not use generic directories or keyword-rich sitewide footer links.

## Deployment migration note

Excluded from the branch score: search results still contain older site content and legacy query URLs. When deploying this branch:

1. Redirect known legacy paths and query states to the closest relevant destination.
2. Enforce one HTTPS apex hostname.
3. Deploy the canonical and sitemap in the same release.
4. Submit the sitemap in Google Search Console and Bing Webmaster Tools.
5. Request recrawl of the homepage and important retired URLs.
6. Monitor coverage, soft 404s, duplicate canonicals, and snippets for several weeks.

## Measurement limitations

- No Google Search Console, GA4, PageSpeed API, or CrUX credentials were configured.
- INP cannot be established for an undeployed local branch.
- Backlink data was insufficient for a numeric score.
- Performance results are local Lighthouse lab data, not field p75 data.
