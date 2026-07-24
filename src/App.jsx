import { useEffect, useRef, useState } from "react";

import Footer from "./components/Footer";
import GithubWidget from "./components/GithubWidget";
import Hero from "./components/Hero";
import Links from "./components/Links";
import ProjectGallery from "./components/ProjectGallery";
import SpotifyWidget from "./components/SpotifyWidget";
import FitbitWidget from "./components/FitbitWidget";

function DeferredWidget({ children, className }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) {
      setReady(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={className}>{ready ? children : <span className="signal-message">Waiting for live data…</span>}</div>;
}

export default function App() {
  const [headerIsScrolled, setHeaderIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setHeaderIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <div className="site-shell">
      <header className={`site-header${headerIsScrolled ? " is-scrolled" : ""}`}>
          <span className="brand-space" aria-hidden="true" />
        <nav aria-label="Main navigation">
          <a href="/#work">work</a>
          <a href="/#links">links</a>
          <a href="/#about">about</a>
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
          <p className="about-manifesto">
            I’m a full-stack developer at heart and a maker by nature. I like projects where
            software meets the physical world: multiplayer VR, games, custom electronics,
            LED installations and PCBs. I learn by building the whole thing, testing it in the
            real setting, and shipping a version people can use.
          </p>
        </section>

        <section className="now-section" id="now">
          <div className="section-heading-row">
            <p className="section-index">04 / now</p>
            <p>Small live signals from my corner of the internet.</p>
          </div>
          <div className="live-grid">
            <DeferredWidget className="deferred-signal"><SpotifyWidget /></DeferredWidget>
            <DeferredWidget className="deferred-signal"><FitbitWidget /></DeferredWidget>
          </div>
          <DeferredWidget className="deferred-github"><GithubWidget /></DeferredWidget>
        </section>
      </main>
      <Footer />
    </div>
  );
}
