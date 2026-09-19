import { useEffect, useRef, useState } from "react";

import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import { cv } from "../data/cv";
import { useLocale } from "../locale";

function EntryList({ entries, className = "" }) {
  return (
    <div className={`cv-entry-list ${className}`}>
      {entries.map((entry) => (
        <article className="cv-entry" key={entry.title}>
          <div className="cv-entry-heading">
            <h3>{entry.title}</h3>
            {(entry.date || entry.place) && <span>{entry.date ?? entry.place}</span>}
          </div>
          <p>{entry.body}</p>
        </article>
      ))}
    </div>
  );
}

export default function CvPage() {
  const locale = useLocale();
  const content = cv[locale];
  const contact = cv.contact;
  const pageRef = useRef(null);
  const [dockPrintControl, setDockPrintControl] = useState(false);

  useEffect(() => {
    const updatePrintControl = () => {
      const pageBottom = pageRef.current?.getBoundingClientRect().bottom;
      setDockPrintControl(pageBottom !== undefined && pageBottom <= window.innerHeight - 22);
    };

    updatePrintControl();
    window.addEventListener("scroll", updatePrintControl, { passive: true });
    window.addEventListener("resize", updatePrintControl);
    return () => {
      window.removeEventListener("scroll", updatePrintControl);
      window.removeEventListener("resize", updatePrintControl);
    };
  }, []);

  return (
    <div className="cv-shell">
      <SiteHeader />
      <main className="cv-page" ref={pageRef}>
        <header className="cv-intro">
          <div className="cv-intro-copy">
            <p className="cv-kicker">Nick Esselman</p>
            <h1>{content.title}</h1>
            <p className="cv-summary">{content.intro}</p>
          </div>
          <figure className="cv-portrait">
            <img
              src="/images/cv/nick-temporary-portrait.webp"
              width="960"
              height="1280"
              alt="Nick Esselman outdoors"
              fetchPriority="high"
            />
          </figure>
        </header>

        <section className="cv-contact" aria-labelledby="cv-contact-heading">
          <h2 id="cv-contact-heading">{content.contact}</h2>
          <div>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`https://${contact.site}`}>{contact.site}</a>
            <a href={`https://${contact.github}`} target="_blank" rel="noreferrer">{contact.github}</a>
            <a href={`https://${contact.linkedin}`} target="_blank" rel="noreferrer">{contact.linkedin}</a>
          </div>
        </section>

        <section className="cv-section" aria-labelledby="cv-work-heading">
          <h2 id="cv-work-heading">{content.selectedWork}</h2>
          <EntryList entries={content.projects} />
        </section>

        <section className="cv-section" aria-labelledby="cv-client-heading">
          <h2 id="cv-client-heading">{content.clientWork}</h2>
          <EntryList entries={content.clients} />
        </section>

        <section className="cv-section cv-details" aria-label={`${content.skills} and ${content.education}`}>
          <div>
            <h2>{content.skills}</h2>
            <dl className="cv-skills">
              {content.skillGroups.map(([name, values]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{values}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="cv-education">
            <h2>{content.education}</h2>
            <p>{content.educationBody}</p>
            <p>{content.languages}</p>
          </div>
        </section>

        <section className="cv-section cv-events" aria-labelledby="cv-events-heading">
          <h2 id="cv-events-heading">{content.hackathons}</h2>
          <EntryList entries={content.events} />
        </section>
        <p className="cv-document-footer">{content.footer}</p>
        <div className={`cv-print-control${dockPrintControl ? " is-docked" : ""}`}>
          <button className="cv-print-button" type="button" onClick={() => window.print()}>
            {content.print} <span aria-hidden="true">↗</span>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
