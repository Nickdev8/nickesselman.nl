import { useEffect, useRef, useState } from "react";
import { copy, useLocale } from "../locale";

import { readCookieChoice, saveCookieChoice } from "../analytics";

export default function CookieBanner() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const acceptButton = useRef(null);
  const opener = useRef(null);

  useEffect(() => {
    try {
      const saved = readCookieChoice();
      setVisible(saved !== "accepted" && saved !== "rejected");
    } catch {
      setVisible(true);
    }
    const open = () => {
      opener.current = document.activeElement;
      setVisible(true);
      requestAnimationFrame(() => acceptButton.current?.focus());
    };
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);

  function choose(value) {
    saveCookieChoice(value);
    setVisible(false);
    opener.current?.focus();
  }

  if (!visible) return null;

  return (
    <section className="cookie-banner" aria-labelledby="cookie-question">
      <p id="cookie-question">
        {copy(locale, "Allow analytics cookies?", "Analytische cookies toestaan?")}
      </p>
      <div className="cookie-actions">
        <button className="cookie-accept" ref={acceptButton} type="button" onClick={() => choose("accepted")}>
          {copy(locale, "Accept", "Accepteren")}
        </button>
        <button type="button" onClick={() => choose("rejected")}>
          {copy(locale, "Reject", "Weigeren")}
        </button>
      </div>
    </section>
  );
}
