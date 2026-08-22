import { allProjects, featuredProjects, projectBySlug, projects, site } from "./data/projects.js";
import { localeFromPath, stripLocale } from "./locale.js";

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;
const projectRoutes = allProjects.map((project) => `/projects/${project.slug}/`);

const englishRoutes = ["/", "/about/", "/work/", "/work-with-me/", ...projectRoutes];
export const routes = [...englishRoutes, ...englishRoutes.map((route) => `/nl${route}`)];
export const indexedRoutes = [
  "/",
  "/work/",
  "/work-with-me/",
  ...allProjects.map((project) => `/projects/${project.slug}/`),
];

function absolute(path) {
  return path.startsWith("http") ? path : `${site.url}${path}`;
}

function pageMeta({ path, title, description, graph = [], noindex = false }) {
  return {
    canonical: `${site.url}${path}`,
    title,
    description,
    image: absolute(site.image),
    graph,
    noindex,
  };
}

function projectMeta(project) {
  const path = `/projects/${project.slug}/`;
  const schema = {
    "@type": "CreativeWork",
    "@id": `${site.url}${path}#project`,
    url: `${site.url}${path}`,
    name: project.title,
    description: project.summary,
    creator: { "@id": personId },
    keywords: [...project.technologies, ...(project.keywords ?? [])].join(", "),
    about: project.category,
    sameAs: project.links.map((link) => link.href),
  };
  return pageMeta({
    path,
    title: `Nick Esselman, Project: ${project.title}`,
    description: project.summary,
    graph: [schema],
    noindex: Boolean(project.draft),
  });
}

export function routeMeta(pathname = "/") {
  const locale = localeFromPath(pathname);
  const localizedPath = pathname.replace(/\/+$/, "") || "/";
  const normalized = stripLocale(localizedPath).replace(/\/+$/, "") || "/";
  const localize = (meta) => ({
    ...meta,
    canonical: `${site.url}${locale === "nl" ? `/nl${normalized === "/" ? "/" : `${normalized}/`}` : normalized === "/" ? "/" : `${normalized}/`}`,
    locale,
  });
  if (normalized === "/") {
    return localize(pageMeta({
      path: "/",
      title: "Nick Esselman",
      description: site.description,
      graph: [
        {
          "@type": "WebSite",
          "@id": websiteId,
          url: `${site.url}/`,
          name: site.name,
          alternateName: ["nickesselman.nl", "Nickdev8", "nikkcc"],
          inLanguage: "en",
          publisher: { "@id": personId },
        },
        {
          "@type": "ProfilePage",
          "@id": `${site.url}/#profile`,
          url: `${site.url}/`,
          name: site.title,
          description: site.description,
          mainEntity: { "@id": personId },
          isPartOf: { "@id": websiteId },
        },
        {
          "@type": "Person",
          "@id": personId,
          name: site.name,
          alternateName: ["Nickdev8", "nikkcc"],
          url: `${site.url}/`,
          image: absolute(site.portrait),
          jobTitle: "Full-Stack Software and Hardware Developer",
          homeLocation: { "@type": "Country", name: "Netherlands" },
          knowsAbout: [
            "Custom web development",
            "Web applications",
            "Virtual reality",
            "Game development",
            "Hardware prototyping",
            "PCB design",
            "Embedded systems",
            "Firmware development",
            "LED systems",
          ],
          sameAs: site.sameAs,
        },
        {
          "@type": "ItemList",
          "@id": `${site.url}/#projects`,
          name: "Selected projects by Nick Esselman",
          numberOfItems: featuredProjects.length,
          itemListElement: featuredProjects.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${site.url}/projects/${item.slug}/`,
            name: item.title,
          })),
        },
      ],
    }));
  }
  if (normalized === "/work") {
    return localize(pageMeta({
      path: "/work/",
      title: "Nick, All Work",
      description: "Selected custom websites, web applications, VR experiences, hardware and game projects by Nick Esselman.",
    }));
  }
  if (normalized === "/about") return localize(pageMeta({ path: "/about/", title: "About Nick Esselman", description: "About Nick Esselman, an independent Dutch full-stack developer and maker." }));
  if (normalized === "/work-with-me") {
    return localize(pageMeta({
      path: "/work-with-me/",
      title: "Nick, Work With Me",
      description: "Hire Nick Esselman for custom-coded websites, web applications, interactive experiences, hardware prototypes and embedded systems.",
      graph: [{
        "@type": "Service",
        name: "Custom software and hardware development",
        provider: { "@id": personId },
        areaServed: "Worldwide",
        serviceType: ["Custom website development", "Web application development", "Interactive experience development", "Hardware prototyping"],
      }],
    }));
  }
  const match = normalized.match(/^\/projects\/([^/]+)$/);
  if (match && projectBySlug[match[1]]) return localize(projectMeta(projectBySlug[match[1]]));
  return localize(pageMeta({
    path: "/404.html",
    title: "Page not found — Nick Esselman",
    description: "The requested page could not be found.",
    noindex: true,
  }));
}
