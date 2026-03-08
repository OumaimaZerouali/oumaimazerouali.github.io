---
layout: post
title: "Week 2 – Van Nul Beginnen"
date: 2026-03-08 08:00:00 +0100
series: "weekly-dev-note"
tags: ["weekly"]
lang: nl
---

Deze week heb ik iets vanaf nul gebouwd.

Geen feature bovenop een bestaande codebase.
Geen fix in een service die al een vorm had.
Een nieuwe repository. Een nieuwe service. Een leeg canvas.

In een clientcontext gebeurt dat bijna nooit.

## De Gebruikelijke Werkelijkheid

Meestal bestaat de repository al.
De architectuur is al bepaald.
Je erft conventies, structuur en geschiedenis.

Jouw taak is om het te begrijpen, erin te passen en verder te bouwen.

Dat is prima. Maar het betekent dat je zelden hoeft te vragen: *waar beginnen we eigenlijk?*

Deze week moest ik die vraag beantwoorden.


## Een Nieuwe Architectuur: Boundary-Driven Development

Ik heb altijd gewerkt met een gelaagde structuur: adapters, domein, use cases.

Dit project gebruikt een andere aanpak, **boundary-driven development**.

De grenzen worden bepaald door de OpenAPI spec. 
Alles is georganiseerd rondom wat er blootgesteld wordt, niet rondom interne domeinlogica. 
De database staat in een aparte repository, dus ik bouwde adapters om er verbinding mee te maken zonder de services te koppelen.

Geen bestaand patroon om te kopiëren. Gewoon redeneren vanuit het niets.

## Wat "Vrij Spel" Echt Betekent

Helemaal opnieuw beginnen klinkt als vrijheid. En dat is het ook, maar het is een ander soort druk.

Als je een bestaande service uitbreidt, zijn de beslissingen grotendeels al gemaakt.
Als je vanaf nul begint, is elke beslissing van jou.

Structuur, naamgeving, hoe adapters verbinding maken, wat waar hoort.

Die vrijheid is spannend. Het is ook een herinnering dat conventies ergens voor bestaan en dat ze van de grond af opbouwen nadenken vraagt.

## Wat Ik Heb Geleerd

* Een nieuwe architectuur betekent eerst afleren, dan opnieuw leren.
* Vanaf nul beginnen in een clientcontext is zeldzaam. Behandel het als een leermoment.
* De database in een aparte repo maakt grenzen expliciet en eerlijk.

Code schrijven is vertrouwd.
De vorm van een service vanuit niets ontwerpen is een andere vaardigheid.

Deze week heb ik dat geoefend.
