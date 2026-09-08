// Each project chooses its own story order and supporting media.
const content = {
  "maria-hoogland": {
    summary: [
      "A custom architecture portfolio with an admin Maria can update herself.",
      "Een architectuurportfolio met een eigen admin die Maria zelf kan bijwerken.",
    ],
    fit: "cover",
    sections: [
      [
        "The website",
        "De website",
        "Maria wanted to replace a slow WordPress site with a website that felt like her practice. I made a working wireframe in one day, then built the site in SvelteKit.",
        "Maria wilde haar trage WordPress-site vervangen door een website die bij haar praktijk past. Ik maakte in één dag een werkend wireframe en bouwde de site daarna in SvelteKit.",
      ],
      [
        "Editing and hosting",
        "Beheer en hosting",
        "Maria can edit text and upload or choose images in a custom admin. I host the site on my own hardware, with the domain at Hostinger and DNS through Cloudflare. I also set up Google Search Console and remain available for larger changes.",
        "Maria kan tekst aanpassen en afbeeldingen uploaden of kiezen in een eigen admin. De site draait op mijn hardware, met het domein bij Hostinger en DNS via Cloudflare. Ik stelde ook Google Search Console in en help bij grotere wijzigingen.",
      ],
    ],
  },
  "robijn-fotografie": {
    summary: [
      "A photography portfolio with custom galleries and simple editing tools.",
      "Een fotografieportfolio met eigen galerijen en eenvoudig beheer.",
    ],
    fit: "cover",
    sections: [
      [
        "Her design, built in code",
        "Haar ontwerp, gebouwd in code",
        "Robijn drew the visual direction herself. I built it in SvelteKit so people discovering her on social media have a place to browse her photography and get in touch.",
        "Robijn tekende zelf de visuele richting. Ik bouwde die in SvelteKit, zodat mensen die haar via sociale media vinden haar fotografie kunnen bekijken en contact kunnen opnemen.",
      ],
      [
        "Galleries and editing",
        "Galerijen en beheer",
        "The custom admin lets her change text, images and photo categories, and add pages without editing code. The site runs in Docker and serves different image sizes for different screens.",
        "Met de eigen admin past ze tekst, afbeeldingen en fotocategorieën aan en voegt ze pagina's toe zonder code te wijzigen. De site draait in Docker en levert passende afbeeldingsformaten voor verschillende schermen.",
      ],
    ],
  },
  partyvr: {
    summary: [
      "Local multiplayer VR with host controls and a spectator screen.",
      "Lokale multiplayer-VR met hostbediening en een toeschouwersscherm.",
    ],
    fit: "contain",
    sections: [
      [
        "Running the room",
        "De kamer bedienen",
        "The host panel manages players, rounds and hardware. A spectator screen keeps people outside the headset involved in the game.",
        "Het hostpaneel beheert spelers, rondes en hardware. Een toeschouwersscherm houdt mensen zonder headset bij het spel betrokken.",
        1,
      ],
      [
        "Multiplayer",
        "Multiplayer",
        "Devices share game state over the local network. Debugging tools show avatar synchronization and device logs while I test the system.",
        "Apparaten delen de spelstatus via het lokale netwerk. Debugtools tonen avatarsynchronisatie en apparaatlogs terwijl ik het systeem test.",
        2,
      ],
      [
        "Avatars",
        "Avatars",
        "I make custom avatars and cosmetics in Blender. PartyVR is still in active development.",
        "Ik maak eigen avatars en cosmetische items in Blender. PartyVR is nog in ontwikkeling.",
        3,
      ],
    ],
  },
  lamp: {
    summary: [
      "An RP2040 controller for chained LED panels and large installations.",
      "Een RP2040-controller voor gekoppelde LED-panelen en grote installaties.",
    ],
    fit: "cover",
    sections: [
      [
        "Testing panel chains",
        "Paneelketens testen",
        "I started with hand-wired matrices on the bench, then connected multiple panels on the floor to test wiring, power and the display as a whole.",
        "Ik begon met handbedrade matrices op de werkbank en koppelde daarna meerdere panelen op de vloer om bedrading, voeding en het hele display te testen.",
        1,
      ],
      [
        "The controller",
        "De controller",
        "The controller moved toward a custom RP2040 PCB for repeatable panel chains and xLights-style installations. The PCB is ready, and the project has already driven assembled displays.",
        "De controller groeide uit tot een eigen RP2040-PCB voor herhaalbare paneelketens en installaties zoals met xLights. Het PCB-ontwerp is klaar en het project heeft al samengestelde displays aangestuurd.",
        3,
      ],
    ],
    extraMedia: [2],
  },
  mymacropad: {
    summary: [
      "A working 4×4 macropad, built from custom PCB to enclosure.",
      "Een werkende 4×4-macropad, van eigen PCB tot behuizing.",
    ],
    fit: "cover",
    sections: [
      [
        "Board and firmware",
        "Printplaat en firmware",
        "I designed the 4×4 switch layout and a custom PCB with artwork on the back, then assembled and soldered the electronics and wrote the firmware.",
        "Ik ontwierp de 4×4-schakelaarindeling en een eigen PCB met artwork op de achterkant. Daarna monteerde en soldeerde ik de elektronica en schreef ik de firmware.",
        1,
      ],
      [
        "Assembly and enclosure",
        "Montage en behuizing",
        "The working board fits inside a purpose-built blue enclosure with coral keycaps. Switch spacing, electronics and the case were designed together.",
        "De werkende printplaat zit in een eigen blauwe behuizing met koraalkleurige keycaps. De afstand tussen schakelaars, de elektronica en de behuizing zijn samen ontworpen.",
        2,
      ],
    ],
  },
  kennemer: {
    summary: [
      "A touch interface for controlling Shelly devices over a local network.",
      "Een touchinterface om Shelly-apparaten via het lokale netwerk te bedienen.",
    ],
    fit: "contain",
    sections: [
      [
        "Room controls",
        "Ruimtebediening",
        "Kennemer brings the room's controls together on a portable touch display. It communicates with Shelly devices over the local network, so operating the room does not depend on internet access.",
        "Kennemer brengt de bediening van de ruimte samen op een draagbaar touchdisplay. Het communiceert via het lokale netwerk met Shelly-apparaten, zodat de bediening niet afhankelijk is van internet.",
      ],
      [
        "Physical controls",
        "Fysieke bediening",
        "A hand-wired relay and button board connects the interface to the physical system. The project combines working software with the hardware it operates.",
        "Een handbedraad relais- en knoppenpaneel verbindt de interface met het fysieke systeem. Het project combineert werkende software met de hardware die het aanstuurt.",
        1,
      ],
    ],
  },
  "monkey-swing": {
    summary: [
      "My first published Unity game. Swing, fall, try again.",
      "Mijn eerste gepubliceerde Unity-game. Slinger, val en probeer opnieuw.",
    ],
    fit: "contain",
    sections: [
      [
        "The game",
        "Het spel",
        "Swing through a pixel-art forest, fail fast and try again. I built and tuned the movement in Unity around that one action.",
        "Slinger door een pixelbos, val en probeer opnieuw. Ik bouwde en verfijnde de beweging in Unity rond die ene actie.",
      ],
      [
        "Finishing it",
        "Het afmaken",
        "Keeping the scope small gave me time to work on feedback and release. Monkey Swing became my first finished and published Unity game.",
        "Door het klein te houden had ik tijd voor feedback en de release. Monkey Swing werd mijn eerste afgeronde en gepubliceerde Unity-game.",
      ],
    ],
  },
  blipstorm: {
    summary: [
      "A Godot island-defence game with autonomous bots and attacking birds.",
      "Een eilandverdedigingsgame in Godot met zelfstandige bots en aanvallende vogels.",
    ],
    fit: "contain",
    sections: [
      [
        "Defending the island",
        "Het eiland verdedigen",
        "Small bots fight off attacking birds. I built the island, defenders and gameplay in Godot, focusing on making their actions readable without controlling each unit.",
        "Kleine bots vechten tegen aanvallende vogels. Ik bouwde het eiland, de verdedigers en de gameplay in Godot, met aandacht voor begrijpelijk gedrag zonder elke eenheid te bedienen.",
        1,
      ],
      [
        "Play in the browser",
        "Speel in de browser",
        "The prototype is available as a browser game. The wider island view shows how each bot's actions affect the defence.",
        "Het prototype is beschikbaar als browsergame. Het overzicht van het eiland laat zien hoe elke bot bijdraagt aan de verdediging.",
      ],
    ],
  },
};

export function projectContent(slug, locale = "en") {
  const project = content[slug];
  const nl = locale === "nl";
  return {
    summary: project.summary[nl ? 1 : 0],
    fit: project.fit,
    extraMedia: project.extraMedia ?? [],
    sections: project.sections.map(
      ([enTitle, nlTitle, enText, nlText, mediaIndex]) => ({
        title: nl ? nlTitle : enTitle,
        text: nl ? nlText : enText,
        mediaIndex,
      }),
    ),
  };
}
