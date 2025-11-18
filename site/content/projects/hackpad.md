---
slug: "hackpad"
title: "HackPad"
subtitle: "Custom macropad built during a Hack Club PCB sprint"
summary: "Designed a 16-key macropad PCB, modeled a snap-fit case, and soldered everything with my grandpa in a weekend."
description: "HackPad is a fully custom macropad powered by a Seeed XIAO RP2040. I routed the PCB in KiCad, milled the case, and flashed QMK-style firmware so each layer controls a different creative tool."
year: 2024
location: "Almere, NL"
status: "Shipped"
cover: "images/projectsimages/hackpad.png"
featured: true
categories:
  - "hardware"
  - "hackclub"
links:
  -
    label: "View PCB on GitHub"
    url: "https://github.com/Nickdev8/macropad"
---

## Routing a clean PCB

<p>I laid out a 4×4 matrix with hot-swappable sockets, per-key diodes, and two SK6812 Mini-E LEDs for accent lighting. The copper pours double as a heatsink for the LEDs, keeping the board tiny.</p>

![HackPad PCB render](images/innerprojects/hackpad/pcbfront.png)

## Hardware weekend with grandpa

<p>We soldered everything together in an afternoon - he taught me the “heat the pad, feed the solder” trick that made the joints look factory clean. Firmware was written in CircuitPython so I could iterate keys without reflashing.</p>

![Macropad schematic](images/innerprojects/hackpad/schematic.png)
