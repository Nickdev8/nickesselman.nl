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

## Tailwind Setup

If you start from a fresh Vite React app, install Tailwind and its Vite plugin:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Then add `tailwindcss()` to `vite.config.js` and `@import "tailwindcss";` to your main stylesheet.
