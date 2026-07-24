import { useEffect, useState } from "react";

import Footer from "./components/Footer";
import GithubWidget from "./components/GithubWidget";
import Hero from "./components/Hero";
import Links from "./components/Links";
import ProjectGallery from "./components/ProjectGallery";
import SpotifyWidget from "./components/SpotifyWidget";
import FitbitWidget from "./components/FitbitWidget";

export default function App() {
  const [headerIsScrolled, setHeaderIsScrolled] = useState(false);

  useEffect(() => {
    document.title = "Nick Esselman — developer & maker";

    if (window.location.pathname === "/portfolio") {
      window.history.replaceState({}, "", "/#work");
      requestAnimationFrame(() => document.querySelector("#work")?.scrollIntoView());
    }
  }, []);

  useEffect(() => {
    const updateHeader = () => setHeaderIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <div className="site-shell">
      <header className={`site-header${headerIsScrolled ? " is-scrolled" : ""}`}>
        <a className="brand-mark" href="#top" aria-label="Nick Esselman, back to top">
          NE
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">work <span aria-hidden="true">→</span></a>
          <a href="#links">links <span aria-hidden="true">→</span></a>
          <a href="#about">about <span aria-hidden="true">→</span></a>
          <a className="contact-link" href="https://contact.nickesselman.nl">contact <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <Hero />
        <ProjectGallery />
        <Links />

        <section className="about-section" id="about">
          <div className="about-heading">
            <p className="section-index">03 / about</p>
          </div>
          {/* <p className="about-manifesto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris.
          </p> */}
          <p className="about-manifesto">
            Me. I'm a Fullstack Developer at heart, Maker by nature. <br/>
            I love to start new project and try new things. 
            {/* Im a fast learner and try to understand everything around me */}
          </p>
        </section>

        <section className="now-section" id="now">
          <div className="section-heading-row">
            <p className="section-index">04 / now</p>
            <p>Small live signals from my corner of the internet.</p>
          </div>
          <div className="live-grid">
            <SpotifyWidget />
            <FitbitWidget />
          </div>
          <GithubWidget />
        </section>
      </main>
      <Footer />
    </div>
  );
}
