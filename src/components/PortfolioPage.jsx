import { useEffect } from "react";

import Footer from "./Footer";

const paragraphs = [
  "Im Nick Esselman, a fullstack developer, but i like to think myself as a swissarmy knife, i can do lot of things from hardware, pcb design to web, mobile and desktop apps. games and vr experinces.",
  "I have a passion of starting random sidequests of projects and seeing where they go, I always finish my projects some are good and some can go directly in the bin. and i think that is the fun part, the unknown.",
  "I'm full of stories and adventures that I would love to talk about.",
  "If you read this and can meet me in person, just mension anything from my VR experinces, my hardware projects, hackathons ive been to. like the 2 times i went to a hackathon at Github HQ or the time i went to Shanhai, China for a hackathon. I'm happy to yap and yap and yap",
];

export default function PortfolioPage() {
  useEffect(() => {
    document.title = "Portfolio | Nick Esselman";
  }, []);

  return (
    <>
      <main className="flex-1 py-4">
        <section className="overflow-hidden rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface-cool)] shadow-[var(--shadow-soft)]">
          <div className="border-b border-[var(--color-border)] px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">Portfolio</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                  ME!
                </h1>
              </div>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
              >
                Back to link hub
              </a>
            </div>
          </div>

          <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.7fr]">
            <div className="space-y-5 text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <aside className="space-y-4 rounded-[1rem] bg-[var(--color-surface-cool-strong)] p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">Projects</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  This is a list of some of my projects.
                </h2>
              </div>
              <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
                all projects from hardware to software can be found here. in general just stuff im proud of.
              </p>
              <a
                href="https://projects.nickesselman.nl"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-[var(--color-accent-contrast)] transition-colors hover:bg-[color:color-mix(in_oklab,var(--color-accent)_86%,black)]"
              >
                Projects.nickesselman.nl
              </a>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
