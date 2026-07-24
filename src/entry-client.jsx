import { hydrateRoot } from "react-dom/client";

import Site from "./Site";
import "./styles.css";

hydrateRoot(document.getElementById("root"), <Site url={window.location.pathname} />);
