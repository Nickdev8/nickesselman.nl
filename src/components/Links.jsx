import { ArrowUpRight, BookOpen, Briefcase, Camera, Code2, IdCard, Mail } from "lucide-react";

const links = [
  {
    name: "GitHub",
    href: "http://github.com/nickdev8/",
    eyebrow: "Builds",
    icon: Code2,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nick-esselman/",
    eyebrow: "Network",
    icon: IdCard,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/nick.esselman/",
    eyebrow: "Photos",
    icon: Camera,
  },
  {
    name: "Blog site",
    href: "https://blog.nickesselman.nl",
    eyebrow: "Writing",
    icon: BookOpen,
  },
  {
    name: "Contact Site",
    href: "https://contact.nickesselman.nl",
    eyebrow: "Reach out",
    icon: Mail,
  },
  {
    name: "Portfolio",
    href: "https://spacehey.com/profile?id=4533565",
    eyebrow: "Showcase",
    icon: Briefcase,
  },
];

export default function Links() {
  return (
    <section
      id="links"
      className="space-y-5 rounded-[1.25rem] border border-[var(--color-panel-dark-border)] bg-[var(--color-panel-dark)] px-6 py-6 text-[var(--color-accent-contrast)] shadow-[var(--shadow-strong)] sm:px-8 sm:py-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">Best places to click</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Find the digital me!
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-[rgba(255,248,243,0.72)]">
          Quick links to find me online.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="group rounded-[1rem] border border-[var(--color-panel-dark-border)] bg-[var(--color-panel-dark-soft)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[color:color-mix(in_oklab,var(--color-panel-dark-soft)_92%,white)]"
            >
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[0.85rem] border border-[var(--color-panel-dark-border)] bg-[rgba(9,23,23,0.26)] text-[rgba(255,248,243,0.82)] transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[rgba(255,248,243,0.58)]">
                      {link.eyebrow}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">{link.name}</h3>
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  aria-hidden="true"
                  className="text-[rgba(255,248,243,0.45)] transition-colors group-hover:text-[var(--color-accent)]"
                />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
