---
layout: post
title: "Testcontainers in Spring Boot: Van Snelle Winst tot Geavanceerde Zetten"
date: 2025-10-05 08:00:00 +0100
image: "/assets/img/spongebob-testcontainers.png"
tags: [java, spring-boot, testing, docker]
lang: nl
ref: testcontainers
---
> "Testcontainers is als SpongeBob aan het roer van je CI: vrolijk, betrouwbaar, en op de een of andere manier verandert chaos in perfectie." - Ik

Als junior developer ben ik constant nieuwe tools en werkwijzen aan het leren.
Een les van mijn seniors die echt bij me bleef hangen was deze: _mocken brengt je maar tot een bepaald punt_.
Op een gegeven moment moet je testen tegen het echte ding: een echte database, een echte message broker, een echte service.

Toen ontdekte ik **Testcontainers**, en het veranderde compleet hoe ik integratietests schrijf in Java en Spring Boot.
Na ermee te experimenteren en mijn bevindingen met collega's te delen, realiseerde ik me dat ik alles wat ik geleerd had op één plek wilde vastleggen.

Deze post is mijn poging om precies dat te doen: het waarom uitleggen, het hoe, en de real-world patronen die ik nu gebruik in mijn projecten.

## Waarom Testcontainers?

Mocking is geweldig voor unit tests, maar voor integratie tests wil je de echte dependencies testen.
Met Testcontainers draai je echte Docker containers tijdens je tests - databases, message brokers, wat je maar nodig hebt.

Het is eenvoudig te gebruiken en maakt je tests veel betrouwbaarder.

_Dit is een voorbeeldpost om de meertalige structuur te demonstreren. De volledige Nederlandse vertaling kan later toegevoegd worden._

