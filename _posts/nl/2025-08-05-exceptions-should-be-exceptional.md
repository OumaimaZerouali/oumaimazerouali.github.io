---
layout: post
title: "Exceptions: De Noodrem, niet de stuurwiel"
date:   2025-08-05 08:00:00 +0100
image:  "/assets/img/exceptions.png"
tags: [java, best-practices, architecture]
lang: nl
---
> "You don't need a license to drive a sandwich." — SpongeBob SquarePants

Als developers wordt ons verteld dat we fouten moeten afhandelen.  
Maar hoe we dat doen beïnvloedt echt hoe onze code werkt.  

Een veelgemaakte fout, vooral in Java, is het gebruik van exceptions om normale, verwachte dingen te beheren.  
Het is alsof je elke keer de noodrem van je auto gebruikt bij een rood licht.  
Het werkt een beetje… totdat het dat niet doet.  

Uiteindelijk vertraagt je code, wordt het een rommeltje, en ontwijken mensen het alsof het vervloekt is.

En ja, ik heb het ook gedaan.  
Een exception gooien is makkelijk.  
Het voelt als een nette uitweg wanneer logica te ingewikkeld wordt.  
Maar hier is het punt: exceptions zijn bedoeld voor **onverwachte problemen**, niet voor de dagelijkse flow.

Martin Fowler zei het het beste:  
> **Exceptions moeten uitzonderlijk zijn.**

Laten we dat even uit elkaar halen.

## Wat Telt *Echt* als “Uitzonderlijk”?

Denk aan een exception als een brandalarm.  
Het mag alleen afgaan wanneer er echt iets mis is.  
Iets waar de code niet op had kunnen plannen.

Een snelle check:  
- Is dit een *normaal* onderdeel van de businesslogica? → Niet gooien.  
- Is dit een *vreemde* fout waardoor de methode onmogelijk afgemaakt kan worden? → Tijd voor een exception.

### Voorbeelden
**Echt Uitzonderlijk**  
- De database ligt eruit.  
- Configuratiebestand ontbreekt of is niet leesbaar.  
- API geeft ineens een 500 terug.

**Niet Uitzonderlijk**  
- Geen gebruiker gevonden bij een zoekopdracht.  
- Ongeldig e-mailadres.  
- Lijst is leeg.

Als het iets is dat je *zou verwachten*, handel het gewoon af met normale logica.

## Wanneer Een Exception Wél Sinnig Is

Hier is een goed voorbeeld van wanneer een exception logisch is.

```java
public static double wortel(double getal) {
    if (getal < 0) {
        throw new IllegalArgumentException("Kan de wortel van een negatief getal niet berekenen.");
    }
    return Math.sqrt(getal);
}
````

Deze methode moet wortels berekenen. Als je er een negatief getal in stopt, kan hij dat letterlijk niet doen.
Dus ja, een exception is terecht. Dit is niet zomaar “foute input”, het breekt de regels van wat de methode überhaupt kan doen.

## Wat Te Doen Wanneer Fouten *Niet* Uitzonderlijk Zijn

Laten we het hebben over validatie.

Stel, een gebruiker registreert zich met een slecht e-mailadres *en* een zwak wachtwoord.
Wil je voor elk probleem een exception gooien en stoppen na het eerste?
Of wil je alle problemen tegelijk tonen?

### De Verkeerde Manier

```java
if (!email.contains("@")) {
    throw new InvalidUserException("E-mail is ongeldig.");
}
if (password.length() < 8) {
    throw new InvalidUserException("Wachtwoord te kort.");
}
```

Dit stopt na de eerste fout, dus de gebruiker moet één probleem tegelijk oplossen.
Super irritant.

### Een Betere Manier: Notification Pattern

Verzamel alle problemen tegelijk:

```java
public class Notificatie {
    private final List<String> fouten = new ArrayList<>();

    public void voegFoutToe(String bericht) { fouten.add(bericht); }
    public boolean heeftFouten() { return !fouten.isEmpty(); }
    public List<String> getFouten() { return fouten; }
}

public Notificatie valideer(Gebruiker gebruiker) {
    Notificatie notificatie = new Notificatie();

    if (!gebruiker.getEmail().contains("@")) {
        notificatie.voegFoutToe("E-mail is ongeldig.");
    }
    if (gebruiker.getPassword().length() < 8) {
        notificatie.voegFoutToe("Wachtwoord moet minstens 8 tekens bevatten.");
    }

    return notificatie;
}
```

Nu krijgt de gebruiker *alle* feedback tegelijk.
De backend blijft rustig.
Geen noodrem nodig.

## Custom Exceptions: Wanneer Ze Wél Handig Zijn

Custom exceptions zijn prima wanneer ze iets *specifieks* betekenen, vooral in businesslogica.

Voorbeeld: een bankapplicatie.

```java
public class OnvoldoendeSaldoException extends RuntimeException {
    public OnvoldoendeSaldoException(String message) {
        super(message);
    }
}
```

Dit maakt meteen duidelijk wat er misging, en je kunt dit anders afhandelen dan bijvoorbeeld een netwerkfout.

```java
try {
    rekeningService.opnemen(100);
} catch (OnvoldoendeSaldoException e) {
    toonFout("Je hebt niet genoeg saldo.");
} catch (NetworkException e) {
    toonFout("Verbindingsfout. Probeer opnieuw.");
}
```

Doel: fouten *begrijpelijk* en *handelbaar* maken.

## De Verborgen Kosten van Misbruik van Exceptions

**1. Performance**
Exceptions gooien is niet gratis.
De JVM legt de volledige stacktrace vast, en dat kost tijd.
Als je dit in een strakke loop of in een drukke app doet, vraag je om problemen.

**2. Leesbaarheid**
`try-catch` blokken zijn luid.
Gebruik je ze voor dingen die geen fout zijn, dan wordt je code moeilijker te lezen.
Toekomstig jij, of een collega, moet stoppen en denken: “Is dit *echt* een fout?”

**3. Slechte API’s**
Gooi je een exception voor foute input in de backend, dan stuurt hij misschien gewoon een generieke `500`.
Maar dat is geen serverfout, het is een gebruikersfout.
Stuur liever een `400 Bad Request` met een nette JSON die uitlegt wat er mis is.

## Het Grote Geheel: Wees Duidelijk, Niet “Slim”

Exceptions gooien voor normale dingen voelt eerst slim.
Maar slimme code veroudert slecht.

Schone code is duidelijke code.
Het gebruikt exceptions niet als fancy `if` statements.
Het gebruikt ze alleen wanneer iets echt stuk gaat.
