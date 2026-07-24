import { useEffect } from "react";

export default function PrivacyAnalytics() {
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
