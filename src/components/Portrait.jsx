import { site } from "../data/projects";

const filmPortrait = {
  src: "/images/nick-portrait-film-960.webp",
  srcSet:
    "/images/nick-portrait-film-480.webp 480w, /images/nick-portrait-film-960.webp 960w",
};

export default function Portrait({ priority = false, variant = "default" }) {
  const portrait = variant === "film" ? filmPortrait : { src: site.portrait };

  return (
    <img
      className="portrait"
      src={portrait.src}
      srcSet={
        portrait.srcSet ??
        "/images/nick-esselman-480.webp 478w, /images/nick-esselman-960.webp 956w"
      }
      sizes="(max-width: 680px) 90vw, 420px"
      alt="Nick Esselman"
      width={variant === "film" ? "960" : "800"}
      height={variant === "film" ? "960" : "800"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
