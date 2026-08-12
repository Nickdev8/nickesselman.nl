import Footer from "./Footer";
import { projectPath } from "../data/projects";
import SiteHeader from "./SiteHeader";
import { localizeProject, localePath, t, useLocale } from "../locale";

function Media({ media, project, priority }) {
  if (media.type === "video") {
    return (
      <video
        className="case-media"
        poster={media.poster}
        aria-label={media.label}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  const base = media.src.replace(/\.webp$/, "");
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${base}-320.avif 320w, ${base}-640.avif 640w, ${base}-960.avif 960w`}
        sizes="(max-width: 700px) 100vw, 50vw"
      />
      <source
        type="image/webp"
        srcSet={`${base}-320.webp 320w, ${base}-640.webp 640w, ${base}-960.webp 960w`}
        sizes="(max-width: 700px) 100vw, 50vw"
      />
      <img
        className="case-media"
        src={media.src}
        alt={media.alt}
        width="960"
        height="1280"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

export default function ProjectPage({ project }) {
  const locale = useLocale();
  project = localizeProject(locale, project);
  const hasMedia = project.media?.length > 0;
  return (
    <div className="case-shell">
      <SiteHeader />
      <main>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href={localePath("/", locale)}>Nick Esselman</a><span aria-hidden="true">/</span><span>{project.title}</span>
        </nav>
        <section className="case-intro">
          <div>
            <p>{project.category} — {project.status}</p>
            <h1>{project.title}</h1>
          </div>
          <p className="case-summary">{project.summary}</p>
        </section>

        {hasMedia ? (
          <figure className="case-lead">
            <Media media={project.media[0]} project={project} priority />
            <figcaption>{project.media[0].alt ?? project.media[0].label}</figcaption>
          </figure>
        ) : null}

        <section className="case-facts" aria-label="Project facts">
          <div><h2>{t(locale, "Role")}</h2><p>{project.role}</p></div>
          <div><h2>{t(locale, "Tools")}</h2><p>{project.technologies.join(", ")}</p></div>
          <div><h2>{t(locale, "Status")}</h2><p>{project.status}</p></div>
        </section>

        <div className="case-story">
          <section><h2>{t(locale, "The challenge")}</h2><p>{project.challenge}</p></section>
          <section><h2>{t(locale, "The approach")}</h2><p>{project.approach}</p></section>
          <section><h2>{t(locale, "The result")}</h2><p>{project.outcome}</p></section>
        </div>

        {hasMedia && project.media.length > 1 && (
          <section className="case-gallery" aria-label={`${project.title} project media`}>
            {project.media.slice(1).map((media, index) => (
              <figure key={media.src}>
                <Media media={media} project={project} />
                <figcaption>{media.alt ?? media.label}</figcaption>
              </figure>
            ))}
          </section>
        )}

        <section className="case-links">
          <h2>{t(locale, "Continue with")} {project.title}</h2>
          <div>
            {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}
            <a href={localePath("/work/", locale)}>{t(locale, "More projects")}</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
