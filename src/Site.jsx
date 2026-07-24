import App from "./App";
import NotFoundPage from "./components/NotFoundPage";
import PrivacyAnalytics from "./components/PrivacyAnalytics";
import ProjectPage from "./components/ProjectPage";
import { projectBySlug } from "./data/projects";

function resolvePath(pathname) {
  const normalized = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  const match = normalized.match(/^\/projects\/([^/]+)$/);
  if (match) return { project: projectBySlug[match[1]] };
  if (normalized === "/") return { home: true };
  return {};
}

export default function Site({ url = "/" }) {
  const route = resolvePath(url);

  return (
    <>
      {route.home ? <App /> : route.project ? <ProjectPage project={route.project} /> : <NotFoundPage />}
      <PrivacyAnalytics />
    </>
  );
}
