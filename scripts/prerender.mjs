import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { routes } from "../src/seo.js";

const root = resolve(import.meta.dirname, "..");
const template = await readFile(resolve(root, "dist/index.html"), "utf8");
const { render } = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.js")));

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function head(meta) {
  const english = meta.locale === "nl" ? meta.canonical.replace("/nl/", "/") : meta.canonical;
  const dutch = meta.locale === "nl" ? meta.canonical : meta.canonical.replace("https://nickesselman.nl/", "https://nickesselman.nl/nl/");
  return [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${escapeAttribute(meta.description)}">`,
    `<link rel="canonical" href="${meta.canonical}">`,
    `<link rel="alternate" hreflang="en" href="${english}">`,
    `<link rel="alternate" hreflang="nl" href="${dutch}">`,
    `<link rel="alternate" hreflang="x-default" href="${english}">`,
    `<meta name="robots" content="${meta.noindex ? "noindex,follow" : "index,follow"},max-image-preview:large">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="Nick Esselman">`,
    `<meta property="og:title" content="${escapeAttribute(meta.title)}">`,
    `<meta property="og:description" content="${escapeAttribute(meta.description)}">`,
    `<meta property="og:url" content="${meta.canonical}">`,
    `<meta property="og:image" content="${meta.image}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeAttribute(meta.title)}">`,
    `<meta name="twitter:description" content="${escapeAttribute(meta.description)}">`,
    `<meta name="twitter:image" content="${meta.image}">`,
    `<script type="application/ld+json">${safeJson({ "@context": "https://schema.org", "@graph": meta.graph })}</script>`,
  ].join("\n    ");
}

for (const route of routes) {
  const { html, meta } = render(route);
  const output = template
    .replace('<html lang="en">', `<html lang="${meta.locale}">`)
    .replace("<!--seo-head-->", head(meta))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const target = route === "/" ? resolve(root, "dist/index.html") : resolve(root, `dist${route}index.html`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, output);
}

const notFoundMeta = {
  title: "Page not found — Nick Esselman",
  description: "The requested page could not be found.",
  canonical: "https://nickesselman.nl/404.html",
  image: "https://nickesselman.nl/og/nick-esselman.jpg",
  graph: [],
  noindex: true,
};
const notFoundHtml = render("/404").html;
await writeFile(
  resolve(root, "dist/404.html"),
  template
    .replace("<!--seo-head-->", head(notFoundMeta))
    .replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`),
);
