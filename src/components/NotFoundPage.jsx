import SiteHeader from "./SiteHeader";

export default function NotFoundPage() {
  return (
    <div className="case-shell">
      <SiteHeader />
      <main className="not-found">
        <div>
          <p>404</p>
          <h1>This page is not here.</h1>
          <a href="/">Return to the portfolio</a>
        </div>
      </main>
    </div>
  );
}
