import { t, useLocale } from "../locale";

const links = [
  { name: "GitHub", detail: "code & projects", href: "https://github.com/nickdev8/" },
  { name: "LinkedIn", detail: "work & experience", href: "https://www.linkedin.com/in/nick-esselman/" },
  { name: "Instagram", detail: "photos & places", href: "https://www.instagram.com/nick.esselman/" },
  { name: "Travel Blog", detail: "travel journals & build notes", href: "https://blog.nickesselman.nl" },
  { name: "SpaceHey", detail: "the old internet", href: "https://spacehey.com/profile?id=4533565" },
];

export default function Links() {
  const locale = useLocale();
  return (
    <section className="links-section" id="links">
      <nav className="link-list" aria-label="Find Nick elsewhere">
        {links.map((link) => (
          <a key={link.name} href={link.href} target="_blank" rel="noreferrer">
            <span>{t(locale, link.name)} ↗</span>
            <span>{t(locale, link.detail)}</span>
          </a>
        ))}
      </nav>
      <a className="links-contact" href={`https://contact.nickesselman.nl${locale === "nl" ? "/nl/" : "/"}`}>
        <span></span>
        <strong>{t(locale, "Contact Nick Esselman ↗")}</strong>
      </a>
    </section>
  );
}
