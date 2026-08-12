import { createContext, createElement, useContext } from "react";

const LocaleContext = createContext({ locale: "en", pathname: "/" });

export function localeFromPath(pathname = "/") {
  return pathname === "/nl" || pathname.startsWith("/nl/") ? "nl" : "en";
}

export function stripLocale(pathname = "/") {
  const stripped = pathname.replace(/^\/nl(?=\/|$)/, "");
  return stripped || "/";
}

export function localePath(pathname, locale) {
  const path = stripLocale(pathname);
  return locale === "nl" ? `/nl${path === "/" ? "/" : path}` : path;
}

export function LocaleProvider({ locale, pathname, children }) {
  return createElement(LocaleContext.Provider, { value: { locale, pathname } }, children);
}

export function useLocale() {
  return useContext(LocaleContext).locale;
}

export function useLocalePath() {
  return useContext(LocaleContext).pathname;
}

export function copy(locale, english, dutch) {
  return locale === "nl" ? dutch : english;
}

const dutch = new Map([
  ["Netherlands based full-stack developer and maker working across software, games, VR, hardware and PCB design.", "Nederlandse full-stack developer en maker, werkzaam met software, games, VR, hardware en PCB-ontwerp."],
  ["recent work", "recent werk"], ["view all", "bekijk alles"], ["Selected work", "Geselecteerd werk"],
  ["A bespoke portfolio website for Architectuur AMH, designed to make an architecture practice and its projects easy to explore online.", "Een op maat gemaakte portfoliosite voor Architectuur AMH, waarmee de praktijk en projecten prettig online te ontdekken zijn."],
  ["A custom photography portfolio and booking website with an editable content system for Beau Robijn Fotografie.", "Een op maat gemaakte fotografieportfolio- en boekingswebsite met een bewerkbaar contentsysteem voor Beau Robijn Fotografie."],
  ["Room-scale multiplayer games with a server-authoritative LAN setup and a spectator screen for everyone outside the headset.", "Multiplayer games op kamerschaal met een servergestuurde LAN-opstelling en een scherm voor iedereen buiten de headset."],
  ["A custom RP2040 board for driving chains of LED panels and large xLights-style installations.", "Een eigen RP2040-bord voor ketens van LED-panelen en grote xLights-achtige installaties."],
  ["A 4×4 macropad designed from PCB to case, including firmware, switches and soldering.", "Een 4×4-macropad, van PCB en firmware tot behuizing, switches en soldeerwerk."],
  ["Kennemer is a local-first control surface for running a room full of Shelly-powered devices without relying on the cloud.", "Kennemer is een local-first bedieningspaneel voor een ruimte vol Shelly-apparaten, zonder afhankelijkheid van de cloud."],
  ["Live", "Live"], ["Active", "Actief"], ["PCB ready", "PCB klaar"], ["Built", "Gebouwd"], ["Shipped", "Uitgebracht"], ["Playable", "Speelbaar"], ["Draft case study", "Conceptcase"],
  ["Architecture portfolio website", "Architectuur-portfoliosite"], ["Photography portfolio and booking website", "Fotografieportfolio en boekingswebsite"], ["VR party platform", "VR-partyplatform"], ["LED hardware", "LED-hardware"], ["Custom input device", "Aangepast invoerapparaat"], ["Local event system", "Lokaal eventsysteem"], ["2D game", "2D-game"], ["Island defence game", "Eiland-verdedigingsgame"], ["Custom clothing and print website", "Website voor kleding en textieldruk"],
  ["Timmermans Werkplaats building in Haarlem, photographed for the Maria Hoogland Architectuur website case study", "Timmermans Werkplaats in Haarlem, gefotografeerd voor de case van de website van Maria Hoogland Architectuur"],
  ["Photography presented on the Robijn Fotografie website", "Fotografie op de website van Robijn Fotografie"],
  ["A custom portfolio website and simple editing system for architect Maria Hoogland, built to help local clients discover her work and get in touch.", "Een maatwerkportfoliosite met een eenvoudig bewerksysteem voor architect Maria Hoogland, gebouwd om lokale klanten haar werk te laten ontdekken en contact op te laten nemen."],
  ["Wireframing, custom website development, admin development and hosting", "Wireframing, maatwerkwebsiteontwikkeling, adminontwikkeling en hosting"],
  ["Maria had outgrown a slow WordPress-based setup and wanted a website that felt like her own practice: professional, individual and easy for a potential local client to understand. The first job was to turn that feeling into a clear, practical direction without a long agency process.", "Maria was een trage WordPress-oplossing ontgroeid en wilde een website die als haar eigen praktijk voelde: professioneel, persoonlijk en duidelijk voor een potentiële lokale klant. De eerste stap was dit gevoel omzetten naar een heldere, praktische richting zonder lang bureautraject."],
  ["I made a working wireframe in one day, then used it as the shared foundation for the finished SvelteKit website. The result includes a custom admin area so Maria can update text and choose or upload images herself. I also set up the site for responsive use, search visibility and Google Search Console. For bigger changes, I remain available to work directly with her.", "Ik maakte in één dag een werkend wireframe en gebruikte dat als gezamenlijke basis voor de uiteindelijke SvelteKit-website. Het resultaat heeft een eigen adminomgeving, zodat Maria zelf tekst kan aanpassen en afbeeldingen kan kiezen of uploaden. Ik richtte de site ook in voor responsive gebruik, vindbaarheid en Google Search Console. Voor grotere wijzigingen ben ik direct beschikbaar."],
  ["Maria now has one clear place to introduce AMH and her work without taking unnecessary time away from clients. The website is live at mariahoogland.nl, fully custom-built by me and hosted on my own hardware, with the domain at Hostinger and DNS managed through Cloudflare.", "Maria heeft nu één duidelijke plek om AMH en haar werk te introduceren, zonder onnodig tijd van klanten weg te nemen. De website staat live op mariahoogland.nl, is volledig door mij op maat gebouwd en draait op mijn eigen hardware; het domein staat bij Hostinger en DNS wordt via Cloudflare beheerd."],
  ["A custom photography portfolio website and editing system that helps Robijn Fotografie turn social discovery into enquiries.", "Een maatwerk fotografieportfoliosite met bewerksysteem dat Robijn Fotografie helpt om ontdekking via social media om te zetten in aanvragen."],
  ["Custom website, responsive gallery and admin development", "Maatwerkwebsite, responsive galerie en adminontwikkeling"],
  ["Robijn wanted a website that could turn people discovering her through social media into future clients. She had a clear visual idea and drew it out herself; the challenge was to make that direction real while keeping the site and its editing tools straightforward.", "Robijn wilde een website die mensen die haar via social media ontdekken, kan omzetten in toekomstige klanten. Ze had een helder visueel idee en tekende het zelf uit; de uitdaging was die richting echt maken en tegelijk de site en bewerkingstools eenvoudig houden."],
  ["I built the website in SvelteKit from Robijn’s visual direction. The custom admin lets her edit text, images and photo categories, and add pages for new work without having to touch code. The site is responsive, Docker-containerised and uses multiple image sizes so photography loads appropriately on different devices.", "Ik bouwde de website in SvelteKit vanuit de visuele richting van Robijn. Met de eigen admin kan ze tekst, afbeeldingen en fotocategorieën aanpassen, en pagina's voor nieuw werk toevoegen zonder code aan te raken. De site is responsive, draait in Docker en gebruikt meerdere afbeeldingsformaten zodat fotografie passend laadt op verschillende apparaten."],
  ["Robijn now has a custom, editable home for her work at robijnfotografie.nl. It is built to help visitors remember her work, browse it easily and reach out when they are ready. The public case study intentionally uses no photography from the site until image permission is confirmed.", "Robijn heeft nu een eigen, bewerkbare plek voor haar werk op robijnfotografie.nl. De site helpt bezoekers haar werk te onthouden, makkelijk te bekijken en contact op te nemen wanneer ze daar klaar voor zijn. De openbare case gebruikt bewust geen fotografie van de site totdat toestemming voor beeldgebruik is bevestigd."],
  ["Portrait photography presented on the Robijn Fotografie website", "Portretfotografie op de website van Robijn Fotografie"],
  ["PartyVR rendering and device logs during development", "PartyVR-rendering en apparaatlogs tijdens de ontwikkeling"], ["PartyVR host panel for rounds, players, and hardware", "PartyVR-hostpaneel voor rondes, spelers en hardware"], ["PartyVR multi-client avatar and synchronization test", "PartyVR-test met meerdere clients, avatars en synchronisatie"],
  ["LAMP LED panel and controller prototype on a workbench", "LAMP LED-paneel en controllerprototype op een werkbank"], ["Multiple LAMP LED panels connected for a floor test", "Meerdere gekoppelde LAMP LED-panelen tijdens een vloertest"], ["Assembled LAMP panel showing multicolored LEDs", "Gemonteerd LAMP-paneel met gekleurde leds"],
  ["Finished MYMacropad with coral keycaps and blue enclosure", "Afgewerkte MYMacropad met koraalkleurige keycaps en blauwe behuizing"], ["Back of the MYMacropad PCB with custom artwork", "Achterkant van de MYMacropad-PCB met eigen artwork"], ["Assembled MYMacropad circuit board held in one hand", "Gemonteerde MYMacropad-printplaat in een hand"],
  ["Shelly Control Board interface running on a portable display", "Shelly Control Board-interface op een draagbaar scherm"], ["Hand-wired Shelly relay and button control board", "Met de hand bedraad Shelly-relais- en knoppenpaneel"],
  ["code & projects", "code & projecten"], ["work & experience", "werk & ervaring"], ["photos & places", "foto's & plekken"], ["travel journals & build notes", "reisverhalen & bouwnotities"], ["the old internet", "het oude internet"], ["Travel Blog", "Reisblog"], ["Contact Nick Esselman ↗", "Neem contact op met Nick Esselman ↗"],
  ["I’m a full-stack developer at heart and a maker by nature. I build custom websites and web applications, then follow projects wherever they need to go: multiplayer VR, games, custom electronics, LED installations and PCBs. I learn by building the whole thing, testing it in the real setting, and shipping a version people can use.", "Ik ben in de kern een full-stack developer en van nature een maker. Ik bouw maatwerkwebsites en webapps, en volg een project daarna waar het heen moet: multiplayer-VR, games, eigen elektronica, LED-installaties en PCB's. Ik leer door het hele ding te bouwen, in de echte situatie te testen en een versie op te leveren die mensen kunnen gebruiken."],
  ["Small live signals from my corner of the internet.", "Kleine live signalen uit mijn hoek van het internet."], ["Waiting for live data…", "Wachten op live gegevens…"], ["back to top ↑", "terug naar boven ↑"],
  ["Websites, software, hardware and games.", "Websites, software, hardware en games."], ["Nick Esselman is a Netherlands-based full-stack developer building custom websites, web applications, interactive experiences and physical technology projects.", "Nick Esselman is een Nederlandse full-stack developer die maatwerkwebsites, webapps, interactieve ervaringen en fysieke technologieprojecten bouwt."],
  ["For projects that need to be built properly.", "Voor projecten die goed gebouwd moeten worden."], ["Custom websites and web applications", "Maatwerkwebsites en webapplicaties"], ["Interactive software and experiences", "Interactieve software en ervaringen"], ["Hardware and physical computing", "Hardware en physical computing"],
  ["Bespoke coded websites, portfolio sites, internal tools and web interfaces. Nick works directly in code rather than using template-site builders.", "Maatwerkwebsites, portfoliosites, interne tools en webinterfaces. Nick werkt direct in code, niet met templatebouwers."],
  ["Multiplayer systems, games, VR experiences, event interfaces and projects where screens need to work with people in a real place.", "Multiplayersystemen, games, VR-ervaringen, eventinterfaces en projecten waarin schermen moeten werken met mensen in een echte ruimte."],
  ["Custom PCBs, firmware, LED systems, hardware prototypes and connected controls when a project needs software to meet the physical world.", "Eigen PCB's, firmware, LED-systemen, hardwareprototypes en verbonden bediening wanneer software de fysieke wereld moet raken."],
  ["Contact Nick Esselman ↗", "Contact Nick Esselman ↗"], ["Role", "Rol"], ["Tools", "Tools"], ["Status", "Status"], ["The challenge", "De uitdaging"], ["The approach", "De aanpak"], ["The result", "Het resultaat"], ["More projects", "Meer projecten"], ["Continue with", "Verder met"], ["Case study in progress", "Case wordt uitgewerkt"], ["Keywords:", "Trefwoorden:"],
]);

export function t(locale, value) {
  return locale === "nl" ? dutch.get(value) ?? value : value;
}

export function localizeProject(locale, project) {
  if (locale !== "nl") return project;
  const translated = { ...project };
  for (const key of ["category", "status", "summary", "role", "challenge", "approach", "outcome"]) translated[key] = t(locale, project[key]);
  translated.media = project.media?.map((media) => ({ ...media, alt: t(locale, media.alt), label: t(locale, media.label) }));
  return translated;
}
