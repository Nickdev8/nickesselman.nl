import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import { useLocale } from "../locale";

export default function AboutPage() {
  const locale = useLocale();
  const dutch = locale === "nl";
  return <div className="case-shell"><SiteHeader /><main><section className="work-intro about-page"><h1>{dutch ? "Over Nick." : "About Nick."}</h1><p>{dutch ? "Nick Esselman is een zelfstandige Nederlandse full-stack developer en maker. Hij bouwt maatwerkwebsites en webapps, maar werkt net zo graag aan VR, games, hardware en PCB's." : "Nick Esselman is an independent Dutch full-stack developer and maker. He builds custom websites and web applications, and also works across VR, games, hardware and PCBs."}</p></section></main><Footer /></div>;
}
