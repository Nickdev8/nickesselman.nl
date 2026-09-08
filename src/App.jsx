import { useEffect, useRef, useState } from "react";

import Footer from "./components/Footer";
import GithubWidget, { GithubSkeleton } from "./components/GithubWidget";
import Hero from "./components/Hero";
import Links from "./components/Links";
import ProjectGallery from "./components/ProjectGallery";
import SiteHeader from "./components/SiteHeader";
import SpotifyWidget, { SpotifySkeleton } from "./components/SpotifyWidget";
import FitbitWidget, { FitbitSkeleton } from "./components/FitbitWidget";
import { localePath, useLocale } from "./locale";
import Portrait from "./components/Portrait";

function DeferredWidget({ children, className, fallback }) {
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

  return (
    <div ref={ref} className={className}>
      {ready ? children : fallback}
    </div>
  );
}

export default function App() {
  const locale = useLocale();
  return (
    <div className="site-shell">
      <SiteHeader />

      <main>
        <Hero />
        <section className="about-section" id="about">
          <Portrait />
          <div className="about-manifesto">
            {locale === "nl" ? (
              <>
                <p>
                  Ik ben een full-stack developer en maker uit Nederland. Ik
                  bouw websites, webapps en elektronica.
                </p>
                <p className="skills-line">
                  Maatwerkwebsites en webapps · Games en VR · Hardware, firmware
                  en PCB-ontwerp
                </p>
              </>
            ) : (
              <>
                <p>
                  I'm a full-stack developer and maker based in the Netherlands.
                  I build websites, web apps and electronics.
                </p>
                <p className="skills-line">
                  Custom websites and web apps · Games and VR · Hardware,
                  firmware and PCB design
                </p>
              </>
            )}
            <a className="text-link" href={localePath("/about/", locale)}>
              {locale === "nl" ? "Over mij" : "About me"} ↗
            </a>
          </div>
        </section>

        <ProjectGallery />

        <Links />

        <section className="now-section" id="now" data-nosnippet>
          <h2 className="section-title">
            {locale === "nl" ? "Wat me nu bezighoudt" : "What I'm up to"}
          </h2>
          <div className="live-grid">
            <DeferredWidget
              className="deferred-signal"
              fallback={<SpotifySkeleton />}
            >
              <SpotifyWidget />
            </DeferredWidget>
            <DeferredWidget
              className="deferred-signal"
              fallback={<FitbitSkeleton />}
            >
              <FitbitWidget />
            </DeferredWidget>
          </div>
          <DeferredWidget
            className="deferred-github"
            fallback={<GithubSkeleton />}
          >
            <GithubWidget />
          </DeferredWidget>
        </section>
      </main>
      <Footer />
    </div>
  );
}
