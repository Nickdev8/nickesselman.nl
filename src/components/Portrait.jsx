import { site } from "../data/projects";

export default function Portrait({ priority = false }) {
  return (
    <img
      className="portrait"
      src={site.portrait}
      srcSet="/images/nick-esselman-480.webp 478w, /images/nick-esselman-960.webp 956w"
      sizes="(max-width: 680px) 90vw, 420px"
      alt="Nick Esselman"
      width="800"
      height="800"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
