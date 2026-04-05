---
layout: post
title: "Week 6 – Het Beste Moment om Iets te Leren over Debuggen"
date: 2026-04-05 08:00:00 +0100
series: "weekly-dev-note"
tags: ["weekly"]
lang: nl
---

Deze week legde ik debuggen uit aan mijn stagiair.

Het moment was niet gepland.

## Wat Ik Zei

Ik vertelde hem de gebruikelijke dingen. Dat debuggen zelden gaat over één duidelijke fout.
Dat je een theorie vormt, die test, en daarna een andere theorie vormt. Dat externe afhankelijkheden een laag toevoegen die je niet volledig kunt controleren.

Goed advies. Solide advies.

Ik zei het terwijl ik naar een bug staarde waar ik het grootste deel van de dag al naar keek.

## Wat Simpel Had Moeten Zijn

Een externe partij had hun API gemigreerd naar een nieuwe URL.

In theorie: de URL aanpassen, klaar.

In de praktijk: de credentials werkten niet meer. Dan, na het oplossen van de credentials, klopte er iets anders niet. 
Dan, daarna, kregen we helemaal niets terug. Geen fout. Geen response. Gewoon stilte.

Elke oplossing onthulde een nieuw probleem. 
Niet omdat wij iets verkeerd hadden gedaan. Maar omdat een externe wijziging meer had aangeraakt dan alleen een URL.

## Uitleggen Terwijl Je Zelf Vastloopt

Er is iets vreemds aan het uitleggen van een concept terwijl het je op datzelfde moment actief overkomt.

Ik beschreef debuggen niet in de abstractie. Ik deed het, niet bijzonder goed, in real time, terwijl ik probeerde te klinken alsof ik wist wat ik deed.

Misschien is dat de meest eerlijke vorm van lesgeven. Niet de nette uitleg van de andere kant van het probleem. De live demonstratie dat dingen niet altijd verlopen zoals verwacht, inclusief de oplossing.

Hij zag hoe debuggen er echt uitziet. Niet de terugblik versie. De versie met de verkeerde theorieën en de onverwachte stilte.

Ik weet niet zeker wie van ons het meest heeft geleerd.
