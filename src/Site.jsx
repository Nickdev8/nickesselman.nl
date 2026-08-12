import App from "./App";
import AboutPage from "./components/AboutPage";
import NotFoundPage from "./components/NotFoundPage";
import ProjectPage from "./components/ProjectPage";
import PrivacyAnalytics from "./components/PrivacyAnalytics";
import WorkPage from "./components/WorkPage";
import WorkWithMePage from "./components/WorkWithMePage";
import { projectBySlug } from "./data/projects";
import { LocaleProvider, localeFromPath, stripLocale } from "./locale";

export default function Site({ url = "/" }) {
  const requestedPath = url.split("?")[0].replace(/\/+$/, "") || "/";
  const locale = localeFromPath(requestedPath);
  const pathname = stripLocale(requestedPath).replace(/\/+$/, "") || "/";

  return (
    <LocaleProvider locale={locale} pathname={requestedPath}>
      {pathname === "/" ? <App /> : null}
      {pathname === "/about" ? <AboutPage /> : null}
      {pathname === "/work" ? <WorkPage /> : null}
      {pathname === "/work-with-me" ? <WorkWithMePage /> : null}
      {pathname.startsWith("/projects/") && projectBySlug[pathname.slice("/projects/".length)] ? (
        <ProjectPage project={projectBySlug[pathname.slice("/projects/".length)]} />
      ) : null}
      {pathname !== "/" && pathname !== "/about" && pathname !== "/work" && pathname !== "/work-with-me" && !(pathname.startsWith("/projects/") && projectBySlug[pathname.slice("/projects/".length)]) ? <NotFoundPage /> : null}
      <PrivacyAnalytics />
    </LocaleProvider>
  );
}
