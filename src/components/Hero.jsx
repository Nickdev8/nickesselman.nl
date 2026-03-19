import heroImage from "../assets/me.png";

export default function Hero() {
  return (
    <section className="grid gap-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
      <div className="text-center lg:text-left">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Personal site</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Nick Esselman</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
          I build useful things on the web and share the work through writing, projects, and
          small experiments.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start">
          <a
            href="#links"
            className="rounded-full border border-stone-900 bg-stone-900 px-5 py-3 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-700"
          >
            Explore my links
          </a>
          <p className="self-center text-sm text-stone-500">Start with blog, projects, or contact.</p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-sm">
        <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-100 p-3">
          <img
            src={heroImage}
            alt="Portrait of Nick Esselman"
            className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
