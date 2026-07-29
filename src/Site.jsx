import App from "./App";
import NotFoundPage from "./components/NotFoundPage";
import PrivacyAnalytics from "./components/PrivacyAnalytics";

export default function Site({ url = "/" }) {
  const pathname = url.split("?")[0].replace(/\/+$/, "") || "/";

  return (
    <>
      {pathname === "/" ? <App /> : <NotFoundPage />}
      <PrivacyAnalytics />
    </>
  );
}
