export function isRepositoryLink(link) {
  return new URL(link.href).hostname === "github.com";
}

export function projectLinkLabel(link, locale = "en") {
  const dutch = locale === "nl";
  if (isRepositoryLink(link)) return dutch ? "Bekijk de code" : "View source";
  const hostname = new URL(link.href).hostname;
  if (hostname === "itch.io" || hostname.endsWith(".itch.io")) {
    return dutch ? "Speel het spel" : "Play game";
  }
  return dutch ? "Bezoek website" : "Visit website";
}
