---
layout: post
title: "Week 1 – 30 Deployments en het Gewicht van Productie"
date: 2026-03-01 08:00:00 +0100
series: "weekly-dev-note"
tags: ["weekly"]
lang: nl
---

Deze week heb ik geen nieuwe features gebouwd.
Ik heb geen complexe logica gerefactored.
Ik heb gedeployed.

Ongeveer 30 services zijn verplaatst over omgevingen: TA → INT → PROD.

Op papier zijn deployments semi-geautomatiseerd. Pipelines draaien, pods starten op, logs verschijnen. Maar in werkelijkheid draait productiewerk minder om het indrukken van een knop en meer om discipline.

## Het Is Nooit Gewoon "Run the Pipeline"

Elke deployment vroeg om handmatige aandacht:

* Configuratie aanpassen per omgeving
* De juiste serviceversie verifiëren
* Scripts uitvoeren (soms alleen beschikbaar voor Windows, terwijl ik op macOS werk)
* Wachten tot pods geïnitialiseerd zijn
* Logs monitoren in Kibana
* Stabiliteit bevestigen voordat je doorpromoot naar de volgende omgeving

En dan het proces herhalen. Opnieuw. En opnieuw.

Technisch gezien was niets hiervan extreem complex.
Mentaal vereiste het focus.

## De Echte Uitdaging: Context Switching

Eén service deployen is beheersbaar.

Veel services achter elkaar deployen verschuift het risico. De uitdaging wordt cognitieve belasting:

* Is dit de juiste versie?
* Heeft iemand vergeten de tag bij te werken?
* Klopt deze config voor de doelomgeving?
* Deploy ik het juiste artifact naar het juiste cluster?

Niet iedereen hanteerde dezelfde conventies. Soms ontbraken versies. Soms waren scripts niet beschikbaar voor alle platforms. Dat betekende extra verificatie, extra voorzichtigheid, extra aandacht.

Het grootste risico was niet de tooling.
Het was menselijke fout.

## Productie Verandert Je Mindset

Deployen naar TA voelt routinematig.
Deployen naar INT vereist validatie.
Deployen naar PROD voelt anders.

In productie hebben fouten impact.

Je controleert versies nogmaals.
Je herleest configs.
Je monitort logs nauwkeuriger.
Je bereidt een rollback voor voordat je hem nodig hebt.

## Wat Ik Heb Geleerd

Deze week bevestigde een aantal dingen:

* Deployment is engineering.
* Consistentie in versiebeheer en configuratie vermindert stress.
* Observability (logs, monitoring) is niet optioneel.
* Context switching vergroot de kans op fouten.
* Discipline verslaat snelheid in productie.

Code schrijven is creatief.
Code deployen is verantwoordelijkheid.

En productie beloont geen slimheid, het beloont precisie.
