import Footer from "./components/Footer";
import FitbitWidget from "./components/FitbitWidget";
import Hero from "./components/Hero";
import Links from "./components/Links";

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 px-6 py-10 text-stone-900 antialiased sm:px-8">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col font-serif">
        <main className="flex-1 space-y-6">
          <Hero />
          <Links />
          <FitbitWidget />
        </main>
        <Footer />
      </div>
    </div>
  );
}
