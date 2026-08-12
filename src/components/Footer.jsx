import { localePath, t, useLocale } from "../locale";

export default function Footer() {
  const locale = useLocale();
  return (
    <footer>
      <a href={localePath("/about/", locale)}>© {new Date().getFullYear()} Nick Esselman</a>
      <a href={localePath("/#top", locale)}>{locale === "nl" ? "terug naar boven" : "back to top"}</a>
    </footer>
  );
}
