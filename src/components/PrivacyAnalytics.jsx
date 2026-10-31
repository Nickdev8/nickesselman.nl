import { useEffect } from "react";
import { cookieChoiceKey, readCookieChoice, saveCookieChoice, startAnalytics } from "../analytics";

export default function PrivacyAnalytics() {
  useEffect(() => {
    if (readCookieChoice() === "accepted") startAnalytics();
    const sync = (event) => {
      if (event.key === cookieChoiceKey || event.key === null) {
        saveCookieChoice(readCookieChoice() === "accepted" ? "accepted" : "rejected");
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    const token = import.meta.env.VITE_CLOUDFLARE_ANALYTICS_TOKEN;
    if (!token || document.querySelector("[data-cf-beacon]")) return;

    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.dataset.cfBeacon = JSON.stringify({ token });
    document.head.append(script);
  }, []);

  return null;
}
