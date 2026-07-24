import { useEffect, useRef, useState } from "react";

import { projectPath, projects } from "../data/projects";

function ResponsiveImage({ media, priority = false }) {
  const base = media.src.replace(/\.webp$/, "");
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${base}-320.avif 320w, ${base}-640.avif 640w, ${base}-960.avif 960w`}
        sizes="(max-width: 680px) calc(100vw - 36px), (max-width: 980px) 48vw, 31vw"
      />
      <source
        type="image/webp"
        srcSet={`${base}-320.webp 320w, ${base}-640.webp 640w, ${base}-960.webp 960w`}
        sizes="(max-width: 680px) calc(100vw - 36px), (max-width: 980px) 48vw, 31vw"
      />
      <img
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

function ProjectCarousel({ project, index }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const articleRef = useRef(null);
  const nearViewport = useNearViewport(articleRef);
  const slides = project.media;

  useEffect(() => {
    if (!nearViewport || paused || slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let intervalId;
    const startId = window.setTimeout(() => {
      setSlide((current) => (current + 1) % slides.length);
      intervalId = window.setInterval(
        () => setSlide((current) => (current + 1) % slides.length),
        4700 + ((index * 733) % 1300),
      );
    }, 1700 + index * 260);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [index, nearViewport, paused, slides.length]);

  function move(direction) {
    setPaused(true);
    setSlide((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <article
      ref={articleRef}
      className="project-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="carousel-viewport">
        <div className="carousel-media">
          {slides.map((media, mediaIndex) => {
            const distance = Math.abs(mediaIndex - slide);
            const shouldMount = mediaIndex === 0 || (nearViewport && (distance <= 1 || distance === slides.length - 1));
            if (!shouldMount) return null;
            return (
              <div
                className={`carousel-slide${slide === mediaIndex ? " is-active" : ""}`}
                key={media.src}
                aria-hidden={slide !== mediaIndex}
              >
                {media.type === "video" ? (
                  <VideoSlide media={media} active={slide === mediaIndex} enabled={nearViewport && slide === mediaIndex} />
                ) : (
                  <ResponsiveImage media={media} priority={index === 0 && mediaIndex === 0} />
                )}
              </div>
            );
          })}
        </div>

        {slides.length > 1 && (
          <>
            <button type="button" className="carousel-arrow carousel-arrow-left" onClick={() => move(-1)} aria-label={`Previous ${project.title} image`}>←</button>
            <button type="button" className="carousel-arrow carousel-arrow-right" onClick={() => move(1)} aria-label={`Next ${project.title} image`}>next</button>
            <span className="carousel-counter" aria-hidden="true">{slide + 1} / {slides.length}</span>
          </>
        )}
        <a className="project-card-link" href={projectPath(project)} aria-label={`Read the ${project.title} case study`} />
      </div>

      <div className="project-caption">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3><a href={projectPath(project)}>{project.title}</a></h3>
          <p>{project.summary}</p>
        </div>
        <span>{project.status}</span>
      </div>
    </article>
  );
}

export default function ProjectGallery() {
  return (
    <section className="projects-section" id="work" aria-labelledby="work-heading">
      <h2 className="visually-hidden" id="work-heading">Selected work</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCarousel project={project} index={index} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
