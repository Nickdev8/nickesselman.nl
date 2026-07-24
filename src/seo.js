import { projectPath, projects, site } from "./data/projects.js";

export const routes = ["/", ...projects.map(projectPath)];

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

function absolute(path) {
  return path.startsWith("http") ? path : `${site.url}${path}`;
}

function breadcrumb(project) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${site.url}${projectPath(project)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: project.title, item: `${site.url}${projectPath(project)}` },
    ],
  };
}

function projectType(project) {
  if (project.slug === "monkey-swing" || project.slug === "blipstorm") return "VideoGame";
  if (["partyvr", "kennemer"].includes(project.slug)) return "SoftwareSourceCode";
  return "CreativeWork";
}

export function routeMeta(path, project = null) {
  const isHome = path === "/";
  const canonical = isHome ? `${site.url}/` : `${site.url}${projectPath(project)}`;
  const title = isHome ? site.title : `${project.title} — Project by Nick Esselman`;
  const description = isHome ? site.description : project.summary;
  const image = absolute(site.image);

  const graph = isHome
    ? [
        {
          "@type": "WebSite",
          "@id": websiteId,
          url: `${site.url}/`,
          name: site.name,
          alternateName: "nickesselman.nl",
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
          url: `${site.url}/`,
          image: absolute(site.portrait),
          jobTitle: "Full-Stack Developer and Maker",
          homeLocation: { "@type": "Country", name: "Netherlands" },
          knowsAbout: ["Full-stack development", "Virtual reality", "Game development", "Hardware prototyping", "PCB design", "LED systems"],
          sameAs: site.sameAs,
        },
        {
          "@type": "ItemList",
          "@id": `${site.url}/#projects`,
          name: "Selected projects by Nick Esselman",
          numberOfItems: projects.length,
          itemListElement: projects.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${site.url}${projectPath(item)}`,
            name: item.title,
          })),
        },
      ]
    : [
        breadcrumb(project),
        {
          "@type": projectType(project),
          "@id": `${canonical}#project`,
          url: canonical,
          name: project.title,
          description: project.summary,
          image: project.media.filter((media) => media.type === "image").map((media) => absolute(media.src)),
          author: { "@id": personId },
          creator: { "@id": personId },
          keywords: project.technologies.join(", "),
          ...(project.links[0]?.href.includes("github.com") ? { codeRepository: project.links[0].href } : {}),
        },
        {
          "@type": "Person",
          "@id": personId,
          name: site.name,
          url: `${site.url}/`,
        },
      ];

  return { canonical, title, description, image, graph };
}
