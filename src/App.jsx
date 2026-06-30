import Footer from "./components/Footer";
import FitbitWidget from "./components/FitbitWidget";
import GithubWidget from "./components/GithubWidget";
import Hero from "./components/Hero";
import Links from "./components/Links";
import PortfolioPage from "./components/PortfolioPage";
import SpotifyWidget from "./components/SpotifyWidget";

function HomePage() {
  return (
    <>
      <main className="flex-1 space-y-6">
        <Hero />
        <Links />
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <SpotifyWidget />
          <FitbitWidget />
        </div>
        <GithubWidget />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const isPortfolioPage = window.location.pathname === "/portfolio";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--color-bg-start),_var(--color-bg-mid)_45%,_var(--color-bg-end)_100%)] px-6 py-8 text-[var(--color-text-primary)] antialiased sm:px-8 sm:py-10">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col font-serif">
        {isPortfolioPage ? <PortfolioPage /> : <HomePage />}
      </div>
    </div>
  );
}
