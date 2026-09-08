import { useEffect, useState } from "react";
import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import { allProjects, projectPath } from "../data/projects";
import { localizeProject, t, useLocale } from "../locale";
import ProjectImage from "./ProjectImage";
import { projectContent } from "../data/projectContent";

function WorkPreview({ project, index, locale }) {
  const [slide, setSlide] = useState(0);
  const media = project.media[slide];

  useEffect(() => {
    if (
      project.media.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return undefined;
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % project.media.length),
      4700 + ((index * 733) % 1300),
    );
    return () => window.clearInterval(timer);
  }, [index, project.media.length]);

  return (
    <a
      className="work-preview"
      style={{ "--media-fit": projectContent(project.slug, locale).fit }}
      href={projectPath(project, locale)}
      aria-label={
        locale === "nl" ? `Bekijk ${project.title}` : `View ${project.title}`
      }
    >
      {media.type === "video" ? (
        <video
          src={media.src}
          poster={media.poster}
          muted
          autoPlay
          loop
          playsInline
          aria-label={media.label}
        />
      ) : (
        <ProjectImage media={media} priority={index === 0} />
      )}
    </a>
  );
}

export default function WorkPage() {
  const locale = useLocale();
  return (
    <div className="case-shell">
      <SiteHeader />
      <main>
        <section className="work-intro">
          <h1>{t(locale, "Websites, software, hardware and games.")}</h1>
        </section>
        <section className="work-list" aria-label={t(locale, "Selected work")}>
          {allProjects.map((item, index) => {
            const project = localizeProject(locale, item);
            const repository = project.links.find((link) =>
              link.href.includes("github.com"),
            );
            return (
              <article key={project.slug}>
                <WorkPreview project={project} index={index} locale={locale} />
                <div className="work-copy">
                  <h2>{project.title}</h2>
                  <p>{projectContent(project.slug, locale).summary}</p>
                  <div className="work-actions">
                    <a
                      className="text-link"
                      href={projectPath(project, locale)}
                    >
                      {locale === "nl" ? "Bekijk project" : "View project"} ↗
                    </a>
                    {repository ? (
                      <a
                        className="text-link"
                        href={repository.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {locale === "nl" ? "Repository" : "Repository"} ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
      <Footer />
    </div>
  );
}
