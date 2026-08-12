import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import { t, useLocale } from "../locale";

const capabilities = [
  [
    "Custom websites and web applications",
    "Bespoke coded websites, portfolio sites, internal tools and web interfaces. Nick works directly in code rather than using template-site builders.",
  ],
  [
    "Interactive software and experiences",
    "Multiplayer systems, games, VR experiences, event interfaces and projects where screens need to work with people in a real place.",
  ],
  [
    "Hardware and physical computing",
    "Custom PCBs, firmware, LED systems, hardware prototypes and connected controls when a project needs software to meet the physical world.",
  ],
];

export default function WorkWithMePage() {
  const locale = useLocale();
  return (
    <div className="case-shell">
      <SiteHeader />
      <main>
        <section className="work-intro work-with-me-intro">
          <h1>{locale === "nl" ? "Ik maak dingen die werken." : "I make things that work."}</h1>
        </section>
        <section className="work-with-me-note">
          <p>{locale === "nl" ? "Ik werk het liefst aan projecten waar een idee, een echte gebruiker en een technisch probleem samenkomen. Soms is dat een kleine website; soms een fysieke installatie, een game of een systeem dat alles verbindt." : "I work best on projects where an idea, a real user and a technical problem meet. Sometimes that is a small website; sometimes a physical installation, a game or a system that ties everything together."}</p>
          <p>{locale === "nl" ? "Beschikbaar voor lokaal klein werk, remote samenwerking en internationale projecten." : "Available for local small jobs, remote collaboration and international projects."}</p>
        </section>
        <section className="capability-list" aria-label="Capabilities">
          {capabilities.map(([title, description]) => (
            <article key={title}>
              <h2>{t(locale, title)}</h2>
              <p>{t(locale, description)}</p>
            </article>
          ))}
        </section>
        <section className="work-contact">
          <a href={`https://contact.nickesselman.nl${locale === "nl" ? "/nl/" : "/"}`}>Contact Nick Esselman ↗</a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
