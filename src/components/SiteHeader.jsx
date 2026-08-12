import { useEffect, useState } from "react";
import { localePath, useLocale, useLocalePath } from "../locale";

export default function SiteHeader() {
  const [headerIsScrolled, setHeaderIsScrolled] = useState(false);
  const locale = useLocale();
  const pathname = useLocalePath();

  useEffect(() => {
    const updateHeader = () => setHeaderIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`site-header${headerIsScrolled ? " is-scrolled" : ""}`}>
      <span className="brand-space" aria-hidden="true" />
      <nav aria-label="Main navigation">
        <a href={localePath("/", locale)}>{locale === "nl" ? "home" : "home"}</a>
        <a href={localePath("/work/", locale)}>{locale === "nl" ? "al het werk" : "all work"}</a>
        <a href={localePath("/work-with-me/", locale)}>{locale === "nl" ? "werk met mij" : "work with me"}</a>
        <a className="contact-link" href={`https://contact.nickesselman.nl${locale === "nl" ? "/nl/" : "/"}`}>{locale === "nl" ? "contact" : "contact"} <span aria-hidden="true">↗</span></a>
        <span className="language-switch" aria-label="Language">
          <a href={localePath(pathname, "en")} lang="en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined}>EN</a>
          <span aria-hidden="true">/</span>
          <a href={localePath(pathname, "nl")} lang="nl" hrefLang="nl" aria-current={locale === "nl" ? "page" : undefined}>NL</a>
        </span>
      </nav>
    </header>
  );
}
