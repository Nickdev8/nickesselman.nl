const symbols = [
  <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42"/><path d="M50 8v84M22 25c18 7 25 25 28 67M78 25C60 32 53 50 50 92M17 63h66M25 80h50"/></svg>,
  <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M8 49 20 20h60l12 29-14 31H22z"/><circle cx="34" cy="50" r="11"/><circle cx="66" cy="50" r="11"/><path d="M45 70h10"/></svg>,
  <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="10"/><path d="M50 40V5M58 43l25-25M60 50h35M58 57l25 25M50 60v35M42 57 17 82M40 50H5M42 43 17 18"/></svg>,
  <svg viewBox="0 0 100 100" aria-hidden="true"><rect x="20" y="20" width="60" height="60" rx="4"/><path d="M20 40H8v20h12M80 40h12v20H80M40 20V8h20v12M40 80v12h20V80"/><rect x="39" y="38" width="22" height="24" rx="5"/></svg>,
  <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M9 52c10-19 22-19 35 0-13-6-23-6-35 0ZM56 52c10-19 22-19 35 0-13-6-23-6-35 0Z"/><path d="M50 35 67 50 50 65 33 50Z"/><path d="M18 68v23M32 65v26M68 65v26M82 68v23"/></svg>,
  <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42"/><circle cx="50" cy="35" r="8"/><path d="M15 25c6 25 19 32 35 32s29-7 35-32M50 57 29 86M50 57l21 29"/></svg>,
  <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M24 16v68M76 16v68M12 50h76"/><circle cx="24" cy="50" r="15"/><circle cx="76" cy="50" r="15"/><path d="M36 50h28"/></svg>,
  <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M20 14c18 0 30 11 30 28v44M80 14C62 14 50 25 50 42"/><path d="M10 55c8-18 21-18 29 0-11-5-18-5-29 0ZM61 55c8-18 21-18 29 0-11-5-18-5-29 0Z"/><path d="M23 67c15 16 39 16 54 0"/></svg>,
  <svg viewBox="0 0 100 100" aria-hidden="true"><path d="m50 5 9 27 28-10-16 24 24 16-30 1 2 30-18-24-21 21 5-29-30-4 26-14-13-26 27 12Z"/></svg>,
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="symbol-field">
        <p className="hero-copy">
          Netherlands based full-stack developer and maker working across software, games, VR,
          hardware and PCB design.
        </p>
        {symbols.map((symbol, index) => (
          <div className={`hero-symbol hero-symbol-${index + 1}`} key={index}>{symbol}</div>
        ))}
      </div>
      <h1>Nick Esselman</h1>
      <div className="recent-work-row">
        <a href="#work">recent work</a>
        <a href="#work">view all</a>
      </div>
    </section>
  );
}
