export default function ProjectImage({
  media,
  priority = false,
  className,
  sizes = "(max-width: 680px) min(90vw, 360px), min(30vw, 360px)",
}) {
  const src = media.type === "video" ? media.poster : media.src;
  const base = src.replace(/\.webp$/, "");
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${base}-320.avif 320w, ${base}-640.avif 640w, ${base}-960.avif 960w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${base}-320.webp 320w, ${base}-640.webp 640w, ${base}-960.webp 960w`}
        sizes={sizes}
      />
      <img
        className={className}
        src={src}
        alt={media.alt ?? media.label}
        width="960"
        height="1280"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
