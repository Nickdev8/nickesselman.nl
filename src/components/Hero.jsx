import { ArrowDownRight, Briefcase } from "lucide-react";
import { useEffect } from "react";

import heroImage from "../assets/me.png";

export default function Hero() {
  useEffect(() => {
    document.title = "Nick Esselman";
  }, []);

  return (
    <section className="grid gap-8 overflow-hidden rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface-cool)] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-stretch">
      <div className="flex flex-col justify-center text-center lg:text-left">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">Link hub</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
          Nick Esselman
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
          Developer, maker, and photographer. The fastest way to find my work, socials, and the
          places I actually post.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start">
          <a
            href="#links"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-[var(--color-accent-contrast)] transition-colors hover:bg-[color:color-mix(in_oklab,var(--color-accent)_86%,black)]"
          >
            <ArrowDownRight size={16} aria-hidden="true" />
            Open my links
          </a>
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
          >
            <Briefcase size={16} aria-hidden="true" />
            View portfolio
          </a>
        </div>
      </div>
      <div className="mx-auto w-full max-w-sm lg:max-w-none">
        <div className="relative h-full min-h-[24rem] overflow-hidden rounded-[1.25rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,var(--color-surface-cool-strong),var(--color-surface-soft)_48%,var(--color-surface-cool-deep))] p-4 sm:p-5">
          <div className="absolute inset-x-6 top-4 h-24 rounded-full bg-[var(--color-accent-softer)] blur-3xl" />
          <img
            src={heroImage}
            alt="Portrait of Nick Esselman"
            className="relative h-full w-full rounded-[1rem] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
