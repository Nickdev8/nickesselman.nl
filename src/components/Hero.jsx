import { localePath, t, useLocale } from "../locale";

export default function Hero() {
  const locale = useLocale();
  return (
    <section className="hero" id="top">
      <div className="symbol-field">
        <span aria-hidden="true" />
      </div>
      <h1>Nick Esselman</h1>
      <div className="recent-work-row">
        <span className="recent-work-label">{t(locale, "recent work")}</span>
        <a href={localePath("/work/", locale)}>{t(locale, "view all")}</a>
      </div>
    </section>
  );
}
