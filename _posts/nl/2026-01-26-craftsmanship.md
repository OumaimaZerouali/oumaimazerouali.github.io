---
layout: post
title: "De training die ik niet begreep (tot ik het wel deed)"
date: 2026-01-26 14:00:00 +0100
image:  "/assets/img/software_craftsmanship.jpg"
tags: [craftsmanship, training, leren, developer, groei]
lang: nl
---

Drie jaar geleden, in mijn allereerste weken als developer, zat ik in een lokaal te luisteren naar Maarten en Bjorn die spraken over software craftsmanship.

Clean Code. SOLID. TDD. Feedback loops. Katas. Ethiek. Professionaliteit.

Het klonk indrukwekkend.  
Het klonk ook als… ruis.

Ik kwam net van school. Ik had amper tests geschreven. Ik was al trots als mijn code gewoon compileerde. En daar zat iemand uit te leggen dat softwareontwikkeling een *ethisch beroep* is en dat naming één van de moeilijkste problemen in computerwetenschap is.

Ik weet nog dat ik die training verliet met de gedachte:

> "Dit is interessant… maar ik heb eerlijk gezegd geen idee wat hier net gebeurd is."

Veel ging volledig over mijn hoofd.

En als ik helemaal eerlijk ben: een deel van die training ging niet alleen over mijn hoofd heen, het overweldigde me compleet.

We deden strikte mob programming.

Voor het eerst in mijn leven moest ik programmeren voor een groep ervaren developers, met alle aandacht op mij gericht. Mijn handen trilden, mijn hoofd blokkeerde, en ik was niet langer bezig met design of clean code.

Ik dacht:

*Wat als ze zien dat ik niet goed genoeg ben?*  
*Wat als ze me ontslaan?*  
*Wat als ik een fout maak en iedereen me beoordeelt?*

Op dat moment was ik geen craftsmanship aan het leren.

Ik probeerde gewoon niet in paniek te raken.

Ik was zo gefocust op mezelf niet belachelijk te maken dat ik de echte lessen niet kon opnemen. De concepten vlogen voorbij terwijl ik mijn eigen angst probeerde te managen. Achteraf besef ik hoe herkenbaar dit is voor junior developers. Die angst om “ontmaskerd” te worden kan leren volledig blokkeren.


## Drie jaar later

Vorige week volgde ik (bijna) dezelfde training opnieuw. Dezelfde trainer. Dezelfde thema’s. Op sommige plaatsen zelfs dezelfde slides.

Maar deze keer gebeurde er iets totaal anders.

In plaats van verwarring dacht ik voortdurend:

> "Ah… dus dát bedoelden ze toen."

En opnieuw:

> "Wacht, dit verklaart de helft van de problemen waar ik in mijn projecten tegenaan liep."

De training was nauwelijks veranderd. Ik wel.

Mob of pair programming schrikt me niet meer af, integendeel, ik zie het nu als gewoon een extra samenwerkingstool. Ik durf mijn ideeën te delen, zelfs als ze fout kunnen zijn. En ik ben niet meer bang om fout te zijn, omdat ik geleerd heb dat we allemaal constant aan het leren zijn, zelfs de senior developers waar ik drie jaar geleden zo tegenop keek.

Die angst van mijn eerste training? Weg.

Wat ervoor in de plaats kwam, was nieuwsgierigheid. In plaats van bezig te zijn met oordeel, was ik oprecht geïnteresseerd in de problemen die we oplosten. Ik stelde vragen. Ik daagde ideeën uit. Ik droeg bij. Voor mij was het verschil dag en nacht.


## Concrete lessen uit de Craftsmanship training

Maartens training herinnerde me eraan hoeveel er te oefenen valt, zelfs in eenvoudige oefeningen. Deze katas zijn geen gewone codepuzzels, het zijn veilige omgevingen om principes uit te proberen die je niet voor het eerst in productiecode wilt testen.

### De Bowling Kata: Wanneer verwarring leidt tot leren

Neem bijvoorbeeld de Bowling Kata. Ik had moeite met het implementeren van een spare. Het klonk verwarrend. Wat *is* een spare eigenlijk? Hoe werkt de puntentelling precies?

Maar ik schreef wel mijn eerste test… dan mijn tweede. Ik zocht de regels op, probeerde een online bowlingsimulator, experimenteerde met verschillende aanpakken.

Wat ik leerde: zelfs wanneer we iets niet volledig begrijpen, is het cruciaal om eerst na te denken voor we implementeren. Om het probleemdomein echt te begrijpen voordat we naar een oplossing springen.

In het echte leven haasten we ons vaak om te implementeren zonder het probleem volledig te doorgronden. Er komt een ticket binnen, we lezen snel de requirements, en we beginnen te coderen. Deze kata herinnerde me eraan waarom dat gevaarlijk is. De tijd die je investeert in het begrijpen van het probleem bespaart uiteindelijk veel meer tijd dan hij kost.

### Andere belangrijke inzichten

* **Grenzen testen:** We besteedden veel aandacht aan edge cases. Het is niet genoeg om enkel het happy path te testen. Wat gebeurt er bij nul? Wat gebeurt er bij de maximale waarde? Wat gebeurt er bij onverwachte input? Denk altijd aan de grenzen, niet alleen aan het midden.

* **SOLID-opfrissing:** Ik dacht dat ik SOLID kende. Maar deze principes concreet toegepast zien worden in echte code tijdens de katas, deed ze opnieuw landen. Het is één ding om te weten dat de “S” staat voor Single Responsibility. Het is iets anders om een klasse te zien die het principe schendt en de pijn te voelen wanneer je ze probeert te testen.

* **Pull Requests vs. Boy Scout Rule:** Deze discussie was bijzonder interessant. Maarten zegt dat PR’s/MR’s altijd één ding moeten doen: één feature, één bugfix, één duidelijke wijziging. Maar de Boy Scout Rule zegt: laat de code properder achter dan je ze vond. Wat doe je dan wanneer je tijdens een feature-implementatie code tegenkomt die dringend refactoring nodig heeft? Doe je dat in dezelfde PR, of maak je een aparte?

Er is geen perfect antwoord. Context is alles. Soms is de refactoring essentieel voor je wijziging. Soms is het een afleiding. Maar de discussie op zich is waardevol: ze dwingt je na te denken over trade-offs, over de belasting van code reviews, over git-historiek, over hoe veranderingen gecommuniceerd worden binnen je team.


## Waarom het de eerste keer niet werkte

Als junior developer heb je simpelweg nog niet de mentale kapstokken.

Je hebt nog niet:

* Een 10 jaar oude codebase gerefactord waar elke wijziging voelt als een bom ontmantelen.
* Gevochten met flaky tests die lokaal slagen maar falen in CI en uren van je tijd verspillen.
* Gevreesd om één lijn code aan te passen omdat je diep vanbinnen weet dat *alles kan breken*.
* Gezien hoe één slechte designbeslissing, misschien zelfs door jezelf genomen, een volledig systeem langzaam vergiftigt over maanden of jaren.

Dus wanneer iemand zegt:

* "Test gedrag, niet implementatie."
* "Goede naming is belangrijker dan slimme code."
* "Exceptions maken deel uit van je domein."
* "Craftsmanship draait om verantwoordelijkheid."

…dan heeft je brein nergens om die ideeën aan vast te hangen.

Ze blijven abstract. De woorden klinken wijs, misschien zelfs inspirerend, maar ze blijven niet hangen. Je knikt, je neemt misschien wat notities, maar er is geen echte begrip. Hoe zou dat ook kunnen? Je hebt de pijn nog niet gevoeld die deze principes proberen te voorkomen.

Op dat moment geef je vooral om:

* Het werkend krijgen gewoon die groene checkmark halen
* Je ticket afronden zodat je verder kan
* De build niet breken en een bericht krijgen van het team
* Bewijzen dat je iets kan opleveren, wat dan ook

En dat is perfect normaal. Je moet leren stappen voor je kan lopen. Je moet fouten maken voor je eruit kan leren.


## Waarom het nu plots wel logisch was

Drie jaar later heb ik littekens.

Ik heb gezien:

* Tests die het verkeerde testten zoveel gemockt dat de test slaagde terwijl de feature kapot was.
* Code waar niemand aan durfde te komen omdat de originele developer weg was en er geen tests of documentatie waren, enkel cryptische variabelen en mysterieuze businesslogica.
* Klassen met vijf verantwoordelijkheden die onmogelijk geïsoleerd te testen waren en pijnlijk om aan te passen.
* Methodes die comments nodig hadden omdat de namen betekenisloos waren: `processData()`, `handleStuff()`, `doTheThing()` zonder enige indicatie van wat ze echt deden.
* "Snelle fixes" die tijdelijk moesten zijn maar jaren in productie bleven omdat niemand de refactoring wou aanpakken.

Dus wanneer Maarten nu spreekt over:

* **Feedback loops:** Snel bevestiging krijgen dat je code werkt via tests, kleine iteraties, snelle deployments.
* **Grenzen rond infrastructuur:** Je businesslogica scheiden van databases, API’s en frameworks zodat je kan testen zonder de hele wereld op te starten.
* **Single Responsibility:** Elke klasse, elke methode doet één ding goed zodat je bij verandering precies weet waar je moet zijn.
* **Craftsmanship als mindset, niet als checklist:** Dit gaat niet over blind regels volgen. Het gaat over zorg dragen. Trots zijn op je werk. Dingen beter achterlaten dan je ze vond.

…dan hoor ik geen theorie meer.

Ik hoor verklaringen voor mijn eigen fouten uit het verleden. Oplossingen voor problemen waar ik persoonlijk mee geworsteld heb. Oorlogsverhalen die resoneren omdat ik gelijkaardige veldslagen heb meegemaakt.

Dat moment waarop een concept plots aansluit bij je eigen ervaring is magisch.

Dan begint echt leren. Niet wanneer je een definitie kan opdreunen, maar wanneer je *voelt* waarom het ertoe doet.


## Waarom ik dankbaar ben dat ik deze training twee keer kreeg

Achteraf ben ik eigenlijk heel dankbaar dat ik deze training twee keer heb gevolgd.

Ook al begreep ik de eerste keer niet veel, de ideeën bleven ergens op de achtergrond aanwezig. Als zaadjes in de grond, wachtend op de juiste omstandigheden om te groeien.

Ze beïnvloedden:

* Hoe ik naar code kijk ik zie code smells sneller
* Hoe ik testen zie niet als een last, maar als een designtool
* Hoe serieus ik mijn verantwoordelijkheid als engineer neem de code die ik vandaag schrijf is morgen iemands legacy

Deze tweede keer leerde de training me niet alleen nieuwe dingen.

Ze hielp me mijn eerste jaren als developer herinterpreteren. Plots vielen al die frustrerende ervaringen op hun plaats. Het waren geen willekeurige problemen, maar voorspelbare gevolgen van het negeren van bepaalde principes.

De rommelige codebase? Gebrek aan Single Responsibility en duidelijke grenzen.

De flaky tests? Implementatie testen in plaats van gedrag.

De angst om code aan te passen? Geen safety net van tests en slechte naming waardoor intentie onduidelijk was.

Alles viel samen. En dat is waarschijnlijk de echte waarde van craftsmanship-educatie: niet regels geven om blind te volgen, maar langzaam je manier van denken vormen. Een mentaal model opbouwen dat je helpt betere beslissingen te nemen, zelfs in nieuwe situaties die je nog nooit eerder bent tegengekomen.


## Wat nu

Dit was nog maar deel 1 van de training. Deel 2 komt eraan, en eerlijk? Ik kijk ernaar uit.

Als deel 1 al zoveel inzichten en “aha!”-momenten gaf waarbij ervaringen uit het verleden plots logisch werden, ben ik benieuwd wat deel 2 zal brengen. Welke patronen zal ik nog herkennen? Welke fouten zal ik beter begrijpen?

Het mooie aan deze reis is dat er altijd meer te leren valt. Altijd een nieuwe laag om te ontdekken. Altijd een manier om te verbeteren.

Drie jaar geleden verliet ik die trainingsruimte verward en overweldigd.

Vandaag verlaat ik ze energiek en klaar om dieper te graven.


## Dankjewel

Dankjewel, Maarten, voor de training en om me aan te moedigen ze opnieuw te volgen. Je had gelijk: timing is alles, en soms is de beste les gewoon dezelfde les op het juiste moment.
