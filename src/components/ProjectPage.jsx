import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import ProjectImage from "./ProjectImage";
import { projectContent } from "../data/projectContent";
import { localizeProject, localePath, t, useLocale } from "../locale";

function Media({ media, priority = false }) {
  if (media.type === "video") {
    return (
      <video
        className="case-media"
        poster={media.poster}
        aria-label={media.label}
        controls
        muted
        playsInline
        preload="none"
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }
  return (
    <ProjectImage
      media={media}
      priority={priority}
      className="case-media"
      sizes="(max-width: 680px) min(90vw, 420px), min(40vw, 420px)"
    />
  );
}

function ProjectFigure({ media, priority, className = "" }) {
  return (
    <figure className={`project-figure ${className}`}>
      <Media media={media} priority={priority} />
      <figcaption>{media.alt ?? media.label}</figcaption>
    </figure>
  );
}

export default function ProjectPage({ project }) {
  const locale = useLocale();
  project = localizeProject(locale, project);
  const content = projectContent(project.slug, locale);
  const primary = project.links[0];
  const primaryLabel = primary?.href.includes("itch.io")
    ? locale === "nl"
      ? "Speel het spel"
      : "Play game"
    : primary?.href.includes("github.com")
      ? locale === "nl"
        ? "Bekijk de code"
        : "View source"
      : locale === "nl"
        ? "Bezoek website"
        : "Visit website";

  return (
    <div className="case-shell" style={{ "--media-fit": content.fit }}>
      <SiteHeader />
      <main>
        <nav
          className="breadcrumbs"
          aria-label={locale === "nl" ? "Kruimelpad" : "Breadcrumb"}
        >
          <a href={localePath("/work/", locale)}>
            {locale === "nl" ? "Werk" : "Work"}
          </a>
          <span aria-hidden="true">/</span>
          <span>{project.title}</span>
        </nav>
        <section className="case-overview">
          <div className="case-intro">
            <p>
              {project.category} · {project.status}
            </p>
            <h1>{project.title}</h1>
            <p className="case-summary">{content.summary}</p>
            {primary ? (
              <a
                className="text-link case-primary"
                href={primary.href}
                target="_blank"
                rel="noreferrer"
              >
                {primaryLabel} ↗
              </a>
            ) : null}
          </div>
          {project.media?.[0] && (
            <ProjectFigure
              media={project.media[0]}
              priority
              className="case-lead"
            />
          )}
        </section>
        <section
          className="case-facts"
          aria-label={locale === "nl" ? "Projectgegevens" : "Project facts"}
        >
          <div>
            <h2>{t(locale, "Role")}</h2>
            <p>{project.role}</p>
          </div>
          <div>
            <h2>Stack</h2>
            <p>{project.technologies.join(", ")}</p>
          </div>
          <div>
            <h2>{t(locale, "Status")}</h2>
            <p>{project.status}</p>
          </div>
        </section>
        <div className="case-story">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className={section.mediaIndex !== undefined ? "has-media" : ""}
            >
              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
              {section.mediaIndex !== undefined && (
                <ProjectFigure media={project.media[section.mediaIndex]} />
              )}
            </section>
          ))}
          {content.extraMedia.map((index) => (
            <ProjectFigure key={index} media={project.media[index]} />
          ))}
        </div>
        <section className="case-links">
          {primary ? (
            <a
              className="text-link"
              href={primary.href}
              target="_blank"
              rel="noreferrer"
            >
              {primaryLabel} ↗
            </a>
          ) : null}
          <a className="text-link" href={localePath("/work/", locale)}>
            {t(locale, "More projects")} ↗
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
