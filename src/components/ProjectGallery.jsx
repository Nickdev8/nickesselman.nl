import { useEffect, useRef, useState } from "react";

import { featuredProjects, projectPath } from "../data/projects";
import { localizeProject, localePath, t, useLocale } from "../locale";
import ResponsiveImage from "./ProjectImage";
import { projectContent } from "../data/projectContent";

function VideoSlide({ media, active, enabled }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && enabled) video.play().catch(() => {});
    else video.pause();
  }, [active, enabled]);

  return (
    <video
      ref={videoRef}
      poster={media.poster}
      aria-label={media.label}
      autoPlay={active && enabled}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate noremoteplayback"
    >
      {enabled && <source src={media.src} type="video/mp4" />}
    </video>
  );
}

function CarouselChevron({ direction }) {
  const path =
    direction === "previous"
      ? "M15.5 4.5 8 12l7.5 7.5"
      : "M8.5 4.5 16 12l-7.5 7.5";
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function useNearViewport(ref) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) {
      setNear(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "300px 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return near;
}

function ProjectCarousel({ project, index, locale }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const articleRef = useRef(null);
  const nearViewport = useNearViewport(articleRef);
  project = localizeProject(locale, project);
  const slides = project.media;
  const content = projectContent(project.slug, locale);
  const caseStudyPath = projectPath(project, locale);
  const repository = project.links.find((link) =>
    link.href.includes("github.com"),
  );

  useEffect(() => {
    if (
      !nearViewport ||
      paused ||
      slides.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    let intervalId;
    const startId = window.setTimeout(
      () => {
        setSlide((current) => (current + 1) % slides.length);
        intervalId = window.setInterval(
          () => setSlide((current) => (current + 1) % slides.length),
          4700 + ((index * 733) % 1300),
        );
      },
      1700 + index * 260,
    );

    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [index, nearViewport, paused, slides.length]);

  function move(direction) {
    setPaused(true);
    setSlide(
      (current) => (current + direction + slides.length) % slides.length,
    );
  }

  return (
    <article
      ref={articleRef}
      className="project-carousel"
      style={{ "--media-fit": content.fit }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setPaused(false);
      }}
    >
      <div className="carousel-viewport">
        <div className="carousel-media">
          {slides.map((media, mediaIndex) => {
            const distance = Math.abs(mediaIndex - slide);
            const shouldMount =
              mediaIndex === 0 ||
              (nearViewport &&
                (distance <= 1 || distance === slides.length - 1));
            if (!shouldMount) return null;
            return (
              <div
                className={`carousel-slide${slide === mediaIndex ? " is-active" : ""}`}
                key={media.src}
                aria-hidden={slide !== mediaIndex}
              >
                {media.type === "video" ? (
                  <VideoSlide
                    media={media}
                    active={slide === mediaIndex}
                    enabled={nearViewport && slide === mediaIndex}
                  />
                ) : (
                  <ResponsiveImage media={media} />
                )}
              </div>
            );
          })}
        </div>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="carousel-arrow carousel-arrow-left"
              onClick={() => move(-1)}
              aria-label={`Previous ${project.title} image`}
            >
              <CarouselChevron direction="previous" />
            </button>
            <button
              type="button"
              className="carousel-arrow carousel-arrow-right"
              onClick={() => move(1)}
              aria-label={`Next ${project.title} image`}
            >
              <CarouselChevron direction="next" />
            </button>
          </>
        )}
        <a
          className="project-card-link"
          href={caseStudyPath}
          aria-label={
            locale === "nl"
              ? `Lees de case van ${project.title}`
              : `Read the ${project.title} case study`
          }
        />
      </div>

      <div className="project-caption">
        <div>
          <h3>
            <a href={caseStudyPath}>{project.title}</a>
          </h3>
          <p>{content.summary}</p>
          <a className="text-link project-cta" href={caseStudyPath}>
            {locale === "nl" ? "Bekijk project" : "View project"} ↗
          </a>
          {repository ? (
            <a
              className="text-link project-repository"
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
}

export default function ProjectGallery() {
  const locale = useLocale();
  return (
    <section
      className="projects-section"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="recent-work-row">
        <h2 className="section-title" id="work-heading">
          {t(locale, "recent work")}
        </h2>
        <a href={localePath("/work/", locale)}>{t(locale, "view all")}</a>
      </div>
      <div className="project-grid">
        {featuredProjects.slice(0, 3).map((project, index) => (
          <ProjectCarousel
            project={project}
            index={index}
            locale={locale}
            key={project.slug}
          />
        ))}
      </div>
    </section>
  );
}
