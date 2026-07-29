const links = [
  { name: "GitHub", detail: "code & projects", href: "https://github.com/nickdev8/" },
  { name: "LinkedIn", detail: "work & experience", href: "https://www.linkedin.com/in/nick-esselman/" },
  { name: "Instagram", detail: "photos & places", href: "https://www.instagram.com/nick.esselman/" },
  { name: "Travel Blog", detail: "travel journals & build notes", href: "https://blog.nickesselman.nl" },
  { name: "SpaceHey", detail: "the old internet", href: "https://spacehey.com/profile?id=4533565" },
];

export default function Links() {
  return (
    <section className="links-section" id="links">
      <div className="links-intro">
        <p>02 / links</p>
      </div>
      <nav className="link-list" aria-label="Find Nick elsewhere">
        {links.map((link) => (
          <a key={link.name} href={link.href} target="_blank" rel="noreferrer">
            <span>{link.name} ↗</span>
            <span>{link.detail}</span>
          </a>
        ))}
      </nav>
      <a className="links-contact" href="https://contact.nickesselman.nl">
        <span></span>
        <strong>Contact Nick Esselman ↗</strong>
      </a>
    </section>
  );
}
