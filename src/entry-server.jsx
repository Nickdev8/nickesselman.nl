import { renderToString } from "react-dom/server";

import Site from "./Site";
import { routeMeta } from "./seo";
import "./styles.css";

export function render(path) {
  return {
    html: renderToString(<Site url={path} />),
    meta: path === "/" ? routeMeta("/") : null,
  };
}
