# Nick Esselman - Portfolio refresh

This repo contains the full source for [nickesselman.nl](https://nickesselman.nl), now rebuilt with a lean PHP front controller, a tiny router, and custom CSS.

## Highlights

- **New MVC-lite structure** - `index.php` boots an autoloaded `App` namespace with controllers, data files, and reusable helpers stored in `/app`.
- **Content-first views** - Blade-style PHP views live in `/resources/views`, keeping layout/partials/pages separate.
- **Single CSS entrypoint** - `/css/app.css` holds the new visual language (Space Grotesk + neon accents) without any third-party frameworks.
- **Vanilla JS sprinkles** - `/scripts/app.js` powers nav toggles, project filtering, clipboard actions, and the interactive project tree.
- **Markdown project content** - Every project is a Markdown file stored in `/content/projects`, so adding/editing work is copy + paste instead of hacking PHP arrays.

## Structure

```
site/
- app/                # bootstrap, router, controllers, data
- content/projects/   # Markdown source for project pages
- resources/views/    # layout, partials, and page templates
- css/app.css         # global styles
- scripts/app.js      # lightweight UI behaviour
- images/, fonts/, ...  # static assets
- index.php           # single entry point
```

## Local usage

Serve the `site/` directory with PHP 8.1+:

```bash
php -S localhost:8080 -t site
```

Navigate to [http://localhost:8080](http://localhost:8080) to explore the new build.

## Editing projects

Projects now live as Markdown files with YAML front matter inside `site/content/projects/`:

```markdown
---
slug: "monkeyswing"
title: "Monkey Swing"
summary: "Jam project for Hack Club HighSeas"
year: 2024
cover: "images/projectsimages/monkey.jpg"
enabled: true
categories:
  - "jam"
  - "web"
links:
  - label: "Play the jam entry"
    url: "https://example.com"
---

## Design sprint

Wrote the first prototype in the Schiphol lounge.

![Cabin render](images/projectsimages/monkey-thumb.jpg)

## Shipping the jam

Bundled the build with a recap video and self-hosted assets.
```

- Duplicate any existing `.md` file to start a new project.
- Update the front matter fields (slug, dates, links, gallery, etc.).
- Use `##` headings for sections; everything under a heading is parsed as Markdown and becomes a project section.
- Add inline images with standard Markdown syntax (`![alt](path)`); they become the side-by-side media gallery for that section.
- Optional `gallery` entries in the front matter keep the grid at the bottom of the page.
- Set `enabled: false` to keep drafts hidden without deleting them.

The loader sorts projects by `year`, so once the file exists it immediately appears everywhere (home hero count, grids, related sections, etc.).

## Contact

- Email: [info@nickesselman.nl](mailto:info@nickesselman.nl)
- GitHub: [@Nickdev8](https://github.com/Nickdev8)
