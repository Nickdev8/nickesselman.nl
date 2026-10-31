export const cookieChoiceKey = "nickesselman-cookie-choice";
const measurementId = "G-F6V07ZW9PS";
let started = false;

export function readCookieChoice() {
  try {
    return localStorage.getItem(cookieChoiceKey);
  } catch {
    return null;
  }
}

export function startAnalytics() {
  if (started) return;
  started = true;
  window[`ga-disable-${measurementId}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_referrer: document.referrer ? document.referrer.split(/[?#]/)[0] : "",
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
}

export function saveCookieChoice(value) {
  try {
    localStorage.setItem(cookieChoiceKey, value);
  } catch {
    // The choice still applies to this page when storage is unavailable.
  }
  if (value === "accepted") {
    startAnalytics();
  } else {
    window[`ga-disable-${measurementId}`] = true;
    for (const entry of document.cookie.split(";")) {
      const name = entry.trim().split("=")[0];
      if (name !== "_ga" && !name.startsWith("_ga_")) continue;
      const domains = [null, window.location.hostname, ".nickesselman.nl"];
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}; SameSite=Lax`;
      }
    }
    // Unload Google's running timers without sending a denied-consent ping.
    if (started) window.location.reload();
  }
}
