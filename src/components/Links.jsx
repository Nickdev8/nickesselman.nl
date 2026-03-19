const links = [
  {
    name: "Blog",
    href: "https://blog.nickesselman.nl",
    description: "Writing, notes, and longer-form thoughts.",
  },
  {
    name: "Projects",
    href: "https://projects.nickesselman.nl",
    description: "Selected work, experiments, and shipped ideas.",
  },
  {
    name: "Contact",
    href: "https://contact.nickesselman.nl",
    description: "A simple way to get in touch.",
  },
];

export default function Links() {
  return (
    <section id="links" className="space-y-4 rounded-3xl border border-stone-200 bg-stone-100/70 p-6 sm:p-8">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Start here</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Pick a direction</h2>
        <p className="mt-2 text-stone-600">The main places to read, browse, or reach out.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-stone-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">{link.name}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{link.description}</p>
              </div>
              <span className="text-sm text-stone-400 transition-colors group-hover:text-stone-900">
                -&gt;
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
