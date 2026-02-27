---
layout: post
title: "Het is echt zo makkelijk: AI-chatbots bouwen met Java"
date: 2026-02-25 14:00:00 +0100
image:  "/assets/img/its-really-that-easy.png"
tags: [java, ai, chatbot, spring-ai]
lang: nl
---

>  "I’m ready to try something new!" – SpongeBob SquarePants

Een paar weken geleden gaven Gabriel en ik een talk met een bewuste stelling:  

**Java-ontwikkelaars hoeven geen Python te leren om serieuze AI-toepassingen te bouwen.**  

De titel van de talk was eenvoudig:  

> *Het is echt zo makkelijk: AI-chatbots bouwen met Java.*  

In deze post blik ik terug op wat we hebben gebouwd, hoe we het hebben gebouwd, en waarom het Java-ecosysteem veel AI-klaarder is dan veel mensen denken.


## Het probleem dat we wilden oplossen

Zoek vijf minuten op “build a chatbot” en je ziet dit patroon:  

* Python  
* FastAPI  
* LangChain  
* Meer Python  

Python verdient zijn populariteit. Maar wat met de miljoenen ontwikkelaars die productieomgevingen draaien op Spring Boot?  

Als je al volwassen Java-services onderhoudt, schone architectuurlagen hebt en CI/CD pipelines hebt lopen,  
waarom zou je dan beginnen experimenteren met LLMs die een compleet nieuwe taalstack vereisen?  

Die vraag werd het startpunt van ons project.  

We wilden geen slides vol theorie.  
We wilden live demos. Draaiende code. Echte architectuur.  

En alles binnen het Java-ecosysteem.


## Wat we hebben gebouwd

Uiteindelijk leverden we een full-stack AI-chatbot platform:

* **Backend:** Spring Boot 3.5 + Java 21  
* **Frontend:** React 19 + TypeScript + Tailwind CSS  
* **AI-laag:** Spring AI  
* **Vector DB:** Qdrant  
* **Lokale modellen:** Ollama  

Hierbovenop bouwden we meerdere AI-gedreven features.  

Maar wat de talk echt deed werken, was niet alleen *wat* we bouwden.  
Het was *hoe* we het presenteerden.


## Hoe we de presentatie hebben opgezet

Onze slides waren geen PowerPoint.  

Het waren kleine React-applicaties. Elke slide was een React-component. Dat gaf ons:

* Volledige design control  
* Ingebedde code snippets  
* Naadloos schakelen tussen slides en live demos  
* Geen contextswitch tussen “presentatiemodus” en “applicatiemodus”  

Belangrijker nog: we structureerden de hele talk rond **drie progressieve stappen**:

1. **Laat het praten**  
2. **Laat het slim worden**  
3. **Laat het krachtig zijn**  

Elke stap voegde één nieuwe capability toe.  
Elke stap verminderde angst.  
Elke stap versterkte dezelfde boodschap:  

Je schrijft nog steeds Java.  
Je gebruikt nog steeds Spring.  
Je past nog steeds dezelfde architectuurprincipes toe.  

AI is gewoon een andere adapter.


# Stap 1 — Laat het praten

We begonnen simpel.  

Geen vector databases.  
Geen tool-calls.  
Geen RAG.  

Gewoon:

* Een system prompt  
* Conversatiestorage  
* Een call naar de chatclient  

Zo introduceerden we twee features.


## De Duck Debugger

Een sarcastische rubber duck.  
Een senior developer persona vast in debugging-mode.  

Het omvat:

* Een 30-bericht conversatievenster  
* Socratische vragen  
* Net genoeg snark om je aannames te laten heroverwegen  

De hele persoonlijkheid leeft in de system prompt.  

Geen rule engine.  
Geen branching logic.  

Gewoon zorgvuldig ontworpen instructies.  

Het is een krachtig voorbeeld van hoeveel leverage prompt-engineering kan geven.


## Test Genie

Test Genie neemt een Java-methode en genereert:

* JUnit 5-tests  
* AssertJ assertions  
* Given–When–Then-naming  

Het controleert zelfs dat je Java-code hebt aangeleverd, geen Python of JavaScript, voordat er iets gegenereerd wordt.  

Tests schrijven is niet moeilijk.  
Maar het kost onevenredig veel mentale energie.  

Laat het model de boilerplate doen.  
Focus op de edge-cases.


## Spring AI in de praktijk

Wat me het meest verraste aan Spring AI is hoeveel minder ceremonie het vereist.  

Als je WebClient hebt gebruikt, voelt dit bekend:

```java
ChatClient.create(chatModel)
    .prompt()
    .advisors(new MessageChatMemoryAdvisor(chatMemory))
    .system(DUCK_SYSTEM_PROMPT)
    .user(request.requestMessage())
    .call()
    .content();
```

Conversatiestorage? Een advisor.
Persoonlijkheid? Een system prompt.
Response? Een vloeiende API-call.

Dat is alles.
En op dat moment realiseerde het publiek zich al:
Het is niet ingewikkeld.


# Stap 2 — Laat het slim worden

Zodra het publiek prompting begreep, introduceerden we kennis.

Hier komt **Retrieval-Augmented Generation (RAG)** in beeld.

We bouwden een feature genaamd **Bot Factory**.

Het laat je toe om:

* Een persoonlijkheid te definiëren
* Een doel te definiëren
* Restricties toe te voegen
* Documenten te uploaden (PDF, TXT, DOCX)

Onder de motorkap:

1. Documenten worden gesplitst met Spring AI’s `TokenTextSplitter`
2. Elke chunk wordt embedded via Ollama
3. Embeddings worden opgeslagen in een aparte Qdrant-collectie
4. User queries worden embedded
5. Gelijkaardige chunks worden opgehaald
6. Context wordt geïnjecteerd in de prompt

Elke bot krijgt een eigen geïsoleerde vector-collectie.

Een HR-policy bot.
Een technische documentatie-bot.
Een creatieve assistent.

Geen kennislekkage.

De belangrijkste les:

> Je retraint het model niet.
> Je verrijkt het.

En met Spring AI kost dit verrassend weinig code.


# Stap 3 — Laat het krachtig zijn

De laatste stap: van *praten* naar *doen*.

Hier wordt het **Model Context Protocol (MCP)** krachtig.

Met Spring AI kun je een gewone Spring service-methode annoteren als een tool.

Geen handmatige JSON parsing.
Geen glue-code.

Gewoon:

Methode blootstellen → annoteren → het model kan het aanroepen.

We demonstreerden dit met een afspraakplanner voor een fictief autogaragebedrijf.

De chatbot:

* Leest het nummerbord uit
* Leest de datum uit
* Roept de geannoteerde servicemethode aan
* Slaat de afspraak op

Op dat moment stopte de chatbot met een demo te zijn.

Het werd functionaliteit.

En architecturaal?

Het past nog steeds binnen schone grenzen.


## Clean Architecture blijft gelden

De backend volgt strikte lagen:

* **Domain** — business-entities
* **Usecase** — applicatielogica
* **Adapter** — controllers, repositories, integraties

Dependencies stromen alleen naar binnen.

De LLM-integratie zit aan de rand.

AI valt je domein niet binnen.
Het is een implementatiedetail.


# Bonus — Laat het spreken

We sloten de talk af met spraak.

Speech → LLM → Speech.

* Audio opnemen in de browser
* Transcriberen
* Verwerken met het model
* Gesproken output genereren
* Terugstreamen

We koppelden het zelfs aan de Duck Debugger.

Je bug hardop beschrijven en een sarcastische reactie terugkrijgen is chaotisch, maar ontzettend leerzaam.
En zodra mensen het systeem in een stem horen reageren, voelt alles ineens echt.


## Wat ik heb meegenomen

De instapdrempel voor LLM-powered applicaties is echt laag.

De moeilijke problemen zijn niet:

* Hoe roep ik het model aan?
* Hoe koppel ik embeddings?

Frameworks zoals Spring AI regelen dat.

De echte uitdagingen zijn:

* Het ontwerpen van nuttige persoonlijkheden
* Goede chunking-strategieën kiezen
* Hallucinaties voorkomen
* Natuurlijke conversatiestromen ontwerpen

Dat zijn productproblemen.
Geen taalproblemen.


## Conclusie

Als je een Java-ontwikkelaar bent en aan de zijlijn blijft staan omdat “AI is een Python-ding”:

Het is dat niet.

Jouw stack is klaar.
Je ecosysteem heeft de tools.
Je architectuurpatronen gelden nog steeds.

Dus ja.

Het is echt zo makkelijk.