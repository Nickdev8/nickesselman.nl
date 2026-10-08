import { useLocale } from "../locale";

export default function Hero() {
  const locale = useLocale();
  const isDutch = locale === "nl";

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <h1 className="hero-name" id="hero-name">
        <span>Nick</span> <span>Esselman</span>
      </h1>
    </section>
  );
}
