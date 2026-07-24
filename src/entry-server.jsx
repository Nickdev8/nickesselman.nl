import { renderToString } from "react-dom/server";

import Site from "./Site";
import { projectBySlug } from "./data/projects";
import { routeMeta } from "./seo";
import "./styles.css";

function projectForPath(path) {
  const slug = path.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  return slug ? projectBySlug[slug] : null;
}

export function render(path) {
  const project = projectForPath(path);
  return {
    html: renderToString(<Site url={path} />),
    meta: path === "/" || project ? routeMeta(path === "/" ? "/" : path, project) : null,
  };
}
