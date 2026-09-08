import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import { localePath, useLocale } from "../locale";
import Portrait from "./Portrait";

export default function AboutPage() {
  const locale = useLocale();
  const dutch = locale === "nl";
  return (
    <div className="case-shell about-shell">
      <SiteHeader />
      <main>
        <section className="about-page about-opening">
          <h1>
            {dutch
              ? "Ik bouw dingen die je kunt gebruiken."
              : "I build things people can use."}
          </h1>
          <Portrait priority />
        </section>
        <section className="about-statement">
          <p>
            {dutch
              ? "Ik ben full-stack developer uit Nederland. Ik reis graag, bouw graag met andere mensen en werk een idee uit tot iets dat echt werkt."
              : "I'm a full-stack developer from the Netherlands. I like travelling, building with other people and taking an idea all the way to something that works."}
          </p>
        </section>
        <section
          className="about-ledger"
          aria-label={dutch ? "Waar ik aan werk" : "What I work on"}
        >
          <div>
            <span>01</span>
            <h2>{dutch ? "Web" : "Web"}</h2>
            <p>
              {dutch
                ? "Maatwerkwebsites, webapps en tools die helder en snel moeten werken."
                : "Custom websites, web apps and tools that need to be clear and fast."}
            </p>
          </div>
          <div>
            <span>02</span>
            <h2>{dutch ? "Fysiek" : "Physical"}</h2>
            <p>
              {dutch
                ? "Elektronica, firmware, LED-systemen en PCB's."
                : "Electronics, firmware, LED systems and PCBs."}
            </p>
          </div>
          <div>
            <span>03</span>
            <h2>{dutch ? "Spelen" : "Play"}</h2>
            <p>
              {dutch
                ? "Games, VR en interfaces voor mensen in dezelfde ruimte."
                : "Games, VR and interfaces for people in the same room."}
            </p>
          </div>
        </section>
        <section className="about-journal">
          <div>
            <p className="about-kicker">
              {dutch ? "Naast het werk" : "Outside work"}
            </p>
            <h2>
              {dutch
                ? "Ik schrijf ook verhalen over bouwen en onderweg zijn."
                : "I also write about building and being on the road."}
            </h2>
          </div>
          <div>
            <p>
              {dutch
                ? "Mijn blog houdt de projecten, mensen en trips bij die niet in een case study passen."
                : "My blog keeps track of the projects, people and trips that do not fit in a case study."}
            </p>
            <a
              className="text-link"
              href="https://blog.nickesselman.nl"
              target="_blank"
              rel="noreferrer"
            >
              {dutch ? "Lees mijn verhalen" : "Read the stories"} ↗
            </a>
          </div>
        </section>
        <section className="about-end">
          <a className="text-link" href={localePath("/work/", locale)}>
            {dutch ? "Bekijk mijn werk" : "See my work"} ↗
          </a>
          <a
            className="text-link"
            href={`https://contact.nickesselman.nl${dutch ? "/nl/" : "/"}`}
          >
            {dutch ? "Neem contact op" : "Get in touch"} ↗
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
