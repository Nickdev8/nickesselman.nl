import { useEffect, useRef } from "react";

export default function BackToTop({ label }) {
  const wheelRef = useRef(null);

  useEffect(() => {
    let frame;

    const updateRotation = () => {
      frame = undefined;
      const wheel = wheelRef.current;
      if (!wheel) return;

      wheel.style.setProperty(
        "--back-to-top-rotation",
        `${window.scrollY}deg`,
      );
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateRotation);
    };

    updateRotation();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      className="back-to-top"
      type="button"
      ref={wheelRef}
      onClick={scrollToTop}
      aria-label={label}
    >
      <span aria-hidden="true">{label}</span>
    </button>
  );
}
