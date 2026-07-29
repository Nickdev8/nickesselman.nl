import { projects, site } from "./data/projects.js";

export const routes = ["/"];

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

function absolute(path) {
  return path.startsWith("http") ? path : `${site.url}${path}`;
}

export function routeMeta() {
  const canonical = `${site.url}/`;
  const title = site.title;
  const description = site.description;
  const image = absolute(site.image);

  const graph = [
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
            url: item.links[0]?.href,
            name: item.title,
          })),
        },
      ];

  return { canonical, title, description, image, graph };
}
