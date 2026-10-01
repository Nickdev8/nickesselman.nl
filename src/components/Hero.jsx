import { useLocale } from "../locale";

export default function Hero() {
  const locale = useLocale();
  const isDutch = locale === "nl";

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <p className="hero-description">
        {isDutch
          ? "Ik ben een full-stackontwikkelaar uit Nederland en bouw maatwerkwebsites, webapplicaties, games, VR-ervaringen en hardware."
          : "Netherlands-based full-stack developer building custom websites, web applications, games, VR experiences, and hardware."}
      </p>
      <h1 className="hero-name" id="hero-name">
        <span>Nick</span> <span>Esselman</span>
      </h1>
    </section>
  );
}
