# Agents Playbook

Welcome to **nickesselman.nl**. This document is for whoever jumps in next-follow it to keep the site cohesive, fast, and fun.

---

## 1. Stack refresher
- **Runtime**: PHP 8+ (no framework). `site/index.php` is the only entry point.
- **App kernel**: Custom MVC-lite under `site/app/`  
  - `bootstrap.php` wires autoloading + loads data arrays (projects, timeline, etc.).  
  - `App\Controllers\PageController` returns view names + data arrays.  
  - `App/Core/Router.php` maps `?page=` / `?project=` to controller actions.
- **Views**: `site/resources/views/…`  
  - `layout.php` loads fonts + `css/app.css` + `scripts/app.js`.  
  - `partials/` holds nav + footer.  
  - `pages/` cover each screen (`home`, `projects`, `contact`, `cv`, `now`, `404`, etc.).  
  - `projects/` contains special templates (e.g. `projects/mytree.php`).
- **Styles**: Single file `site/css/app.css`. Uses CSS variables, Space Grotesk + General Sans, no utility frameworks.
- **JS**: `site/scripts/app.js`. Lightweight features only (nav toggle, project filters, copy-to-clipboard). Keep it small & framework-free.

## 2. Development basics
```bash
php -S localhost:8080 -t site
```
Visit [http://localhost:8080](http://localhost:8080). No build steps.

## 3. Content/data
- `site/app/Data/` stores normalized arrays:
  - `projects.php` → each case study (slug, summary, sections, links, etc.).  
  - `timeline.php`, `now.php`, `contact.php`, `skills.php`.
- Editing content? Update these arrays; the views render them automatically.

## 4. Styling principles
- Dark theme, neon accents, generous whitespace.
- Use existing CSS tokens (e.g. `var(--accent)`, `var(--border)`).
- Components prefer card/grid layouts already defined in `app.css`; extend them if needed rather than introducing new global patterns.

## 5. JS guidelines
- Vanilla only. Keep bundles tiny.
- Put new behavior in `site/scripts/app.js`. Use progressive enhancement. No external deps unless absolutely necessary.

## 6. Pages & routes
- Supported `?page=` values: `home`, `projects`, `about`, `contact`, `cv`, `now`.  
  - `?project=slug` renders a single project.  
  - Missing slugs → `pages/404.php`.
- If you add a new public page, update:
  1. `Router::$map`
  2. `PageController` with a method returning `['view' => ..., 'data' => ..., 'meta' => ...]`
  3. `resources/views/pages/{page}.php`
  4. Nav/footer links if user-facing.

## 7. Assets & media
- Images live under `site/images/`. Keep the structure (e.g. `images/projectsimages`, `images/innerprojects/...`).
- Favicon is `images/logo.png`.
- If you add large assets, ensure they’re optimized (PNG/JPEG compression, GIF alternatives, etc.).

## 8. Testing / validation checklist
- `php -l site/index.php` and `find site/app site/resources -name "*.php" -print0 | xargs -0 php -l`
- Manual QA:
  - Home hero, project cards, contact copy.  
  - `?project=` variations.  
  - Mobile nav toggle.  
  - Clipboard buttons on Contact.  
  - Filter chips on Projects page.  
  - Canvas tree (`?project=mytree`) still functional.

## 9. Design ethos
- Keep it playful but usable. Motion should be minimal and purposeful.
- Prioritize text legibility: max width set via `.page-shell`. Don’t force full-bleed blocks unless they’re imagery.
- Easter eggs are welcome, but ensure nonintrusive toggles and a11y-friendly fallbacks.

## 10. Quick commands
```bash
# lint PHP files
find site -name "*.php" -print0 | xargs -0 php -l

# run local server
php -S localhost:8080 -t site

# check git status (root of repo)
git status -sb
```

Happy shipping! Keep commits tight, document anything sneaky, and leave this file updated if the architecture shifts. 🚀
