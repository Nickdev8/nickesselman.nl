import { useEffect, useRef, useState } from "react";

import Footer from "./components/Footer";
import GithubWidget, { GithubSkeleton } from "./components/GithubWidget";
import Hero from "./components/Hero";
import Links from "./components/Links";
import ProjectGallery from "./components/ProjectGallery";
import SiteHeader from "./components/SiteHeader";
import SpotifyWidget, { SpotifySkeleton } from "./components/SpotifyWidget";
import FitbitWidget, { FitbitSkeleton } from "./components/FitbitWidget";
import { useLocale } from "./locale";

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

  return <div ref={ref} className={className}>{ready ? children : fallback}</div>;
}

export default function App() {
  const locale = useLocale();
  return (
    <div className="site-shell">
      <SiteHeader />

      <main>
        <Hero />
        <ProjectGallery />
        <Links />

        <section className="about-section" id="about">
          <div className="about-heading">
            <p className="section-index">{locale === "nl" ? "over mij" : "about"}</p>
          </div>
          <div className="about-manifesto">
            {locale === "nl" ? (
              <>
                <p>Ik ben in de kern een full-stack developer en van nature een maker.</p>
                <p>Ik bouw maatwerkwebsites en webapps, en volg een project daarna waar het heen moet: multiplayer-VR, games, eigen elektronica, LED-installaties en PCB&apos;s.</p>
                <p>Ik leer door het hele ding te bouwen, in de echte situatie te testen en een versie op te leveren die mensen kunnen gebruiken.</p>
              </>
            ) : (
              <>
                <p>I’m a full-stack developer at heart and a maker by nature.</p>
                <p>I build custom websites and web applications, then follow projects wherever they need to go: multiplayer VR, games, custom electronics, LED installations and PCBs.</p>
                <p>I learn by building the whole thing, testing it in the real setting, and shipping a version people can use.</p>
              </>
            )}
          </div>
        </section>

        <section className="now-section" id="now" data-nosnippet>
          <div className="live-grid">
            <DeferredWidget className="deferred-signal" fallback={<SpotifySkeleton />}><SpotifyWidget /></DeferredWidget>
            <DeferredWidget className="deferred-signal" fallback={<FitbitSkeleton />}><FitbitWidget /></DeferredWidget>
          </div>
          <DeferredWidget className="deferred-github" fallback={<GithubSkeleton />}><GithubWidget /></DeferredWidget>
        </section>
      </main>
      <Footer />
    </div>
  );
}
