---
enabled: false
slug: "partyvr"
title: "PartyVR"
subtitle: "A living-room-sized VR party built with Unity + Meta XR"
summary: "The multiplayer game I prototyped at Juice kept evolving into a polished VR playground."
description: "PartyVR is a networked party room with throwable props, rhythm-based minigames, and a goofy vibe that makes demos fun - even for first-time VR players."
year: 2024
location: "Remote"
status: "In progress"
cover: "images/innerprojects/juice/storepage.png"
categories:
  - "game"
  - "vr"
links:
  -
    label: "Watch on Meta"
    url: "https://www.meta.com/en-gb/experiences/partyvr/9355384034552901/?require_login=true"
stats:
  -
    label: "Engine"
    value: "Unity"
  -
    label: "Netcode"
    value: "Photon"
---

## Keeping chaos multiplayer-friendly

<p>PartyVR looks silly, but the underlying system keeps every cake, speaker, and avatar in sync. I leaned on Photon for transport, wrote custom interpolation for props, and built a debugging overlay so I could see packet loss inside the headset.</p>

## Comfort-first interactions

<p>The main goal was to create something that passes the “grandma test.” Every prop has a visible hand-hold, UI floats inside the scene, and locomotion gently eases players along predefined rails.</p>

## Next steps

<p>I am rebuilding the minigame system so content packs can load from JSON, opening the door for seasonal themes and community-built rooms.</p>
