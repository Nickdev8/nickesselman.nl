import { localePath, t, useLocale } from "../locale";

export default function Footer() {
  const locale = useLocale();
  return (
    <footer>
      <a href={localePath("/about/", locale)}>
        © {new Date().getFullYear()} Nick Esselman
      </a>
      <button className="cookie-settings" type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>
        Cookies
      </button>
    </footer>
  );
}
