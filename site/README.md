# Nick Esselman - Portfolio refresh

This repo contains the full source for [nickesselman.nl](https://nickesselman.nl), now rebuilt with a lean PHP front controller, a tiny router, and custom CSS.

## Highlights

- **New MVC-lite structure** - `index.php` boots an autoloaded `App` namespace with controllers, data files, and reusable helpers stored in `/app`.
- **Content-first views** - Blade-style PHP views live in `/resources/views`, keeping layout/partials/pages separate.
- **Single CSS entrypoint** - `/css/app.css` holds the new visual language (Space Grotesk + neon accents) without any third-party frameworks.
- **Vanilla JS sprinkles** - `/scripts/app.js` powers nav toggles, project filtering, clipboard actions, and the interactive project tree.

## Structure

```
site/
- app/                # bootstrap, router, controllers, data
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

## Contact

- Email: [info@nickesselman.nl](mailto:info@nickesselman.nl)
- GitHub: [@Nickdev8](https://github.com/Nickdev8)
- Discord: `@nikkcc.nick`
