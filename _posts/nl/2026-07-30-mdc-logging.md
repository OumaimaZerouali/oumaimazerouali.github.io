---
layout: post
title: "MDC Logging: ik had geen idee wat ik deed (en dat was het punt)"
date: 2026-07-30 10:00:00 +0100
image: "/assets/img/mdc-logging.png"
tags: [java, logging, kibana, dev-life, learning]
lang: nl
---

Iemand van het team vroeg me om MDC logging toe te voegen aan het project.
"Geen probleem," zei ik.
Ik had absoluut geen idee wat MDC logging was.

Dit is het verhaal daarvan. 
Niet hoe ik het in tien minuten uitgevogeld had en alles prima was. 
Maar over de specifieke ervaring van een term meekrijgen die je nog nooit gehoord hebt, die implementeren over meerdere projecten, en zien hoe het stilletjes iets wordt dat je écht begrijpt. 
Inclusief de momenten waarop het niet werkte zoals verwacht.

Het andere wat ik wil doen is MDC uitleggen op de manier die ik zelf had willen lezen. 
De meeste resources die ik vond gaan er óf van uit dat je al weet wat het is, óf eindigen met "het is een krachtige tool!" zonder echt te vertellen wat dat in de praktijk betekent. 
De enige die me echt hielp was het [Logback manual, hoofdstuk 8](https://logback.qos.ch/manual/mdc.html). 
De rest bleef oppervlakkig. Dus ik ga mijn best doen om het beter te doen.

## Het echte probleem dat MDC oplost

Stel je voor: een webapplicatie die requests verwerkt.
Meerdere gebruikers tegelijk.
Je server verwerkt elk request op zijn eigen thread, en je code logt dingen terwijl het bezig is.

Het probleem is dat al die logregels terechtkomen in hetzelfde logbestand, volledig door elkaar:

```
INFO  Processing request
INFO  Processing request
INFO  Validation passed
INFO  Processing request
ERROR Something went wrong
INFO  Validation passed
INFO  Flow completed
```

Welk request is mislukt?
Welk heeft het gehaald?
_Geen idee._

Je kunt kijken naar timestamps en proberen te raden, maar in een druk systeem waar requests in milliseconden afgehandeld worden, is dat effectief onmogelijk.

De naïeve fix is om op elke log call manueel identificerende informatie toe te voegen:

```java
log.info("Processing request for user {}", userId);
log.info("Validation passed for user {}", userId);
log.error("Something went wrong for user {}", userId, e);
```

Dit werkt, maar het is vervelend, makkelijk te vergeten, en het betekent dat je `userId` door elke methode moet doorgeven alleen maar zodat het in logregels kan verschijnen.
Dat wordt snel een rommel.
MDC is de nette oplossing voor dit probleem.

## Wat MDC eigenlijk is

MDC staat voor Mapped Diagnostic Context. Het is onderdeel van SLF4J, en intern is het precies dit:

```
ThreadLocal<Map<String, String>>
```

Dat is het.
Een map van strings, opgeslagen op de huidige thread.
De `MDC`-klasse heeft alleen statische methoden — `MDC.put(key, value)` om iets toe te voegen, `MDC.get(key)` om iets op te halen, `MDC.remove(key)` om één entry te verwijderen, en `MDC.clear()` om de hele map leeg te maken.

Omdat het een `ThreadLocal` is, is alles wat je in de MDC stopt beperkt tot de huidige thread.
Andere threads hebben elk hun eigen aparte map — `MDC.put()` en `MDC.get()` beïnvloeden alleen de MDC van de thread die ze aanroept.
In een webserver waarbij elk HTTP-request op zijn eigen thread draait, betekent dit dat elk request zijn eigen geïsoleerde context heeft, zonder risico dat threads elkaar beïnvloeden.

Logback leest automatisch uit deze map wanneer het log messages formatteert.
Je configureert welke velden in je log pattern komen via `%X{key}`:

```xml
<pattern>%d{yyyy-MM-dd HH:mm:ss} [%X{userId}] [%X{requestId}] %-5level %logger - %msg%n</pattern>
```

Elke logregel die die thread produceert bevat nu automatisch `userId` en `requestId` uit de MDC, zonder dat je ze ooit als parameters aan je log calls meegeeft.
Één keer zetten, overal aanwezig.

Met dat op zijn plek zien je logs er zo uit:

```
INFO  [userId=u-4821] [requestId=req-99x] Processing request
INFO  [userId=u-4821] [requestId=req-99x] Validation passed
ERROR [userId=u-4821] [requestId=req-99x] Something went wrong
INFO  [userId=u-1337] [requestId=req-01a] Processing request
INFO  [userId=u-1337] [requestId=req-01a] Flow completed
```

Nu kun je in Kibana filteren op `requestId : req-99x` en precies zien wat er is gebeurd voor dat ene request, in volgorde, over elke methode en servicelaag die het aanraakte.

Nog iets wat de moeite waard is om te weten: een MDC map lookup is goedkoop.
Je leest uit een map die op de huidige thread staat: geen I/O, geen netwerkaanroep, geen database lookup.
De overhead is verwaarloosbaar. Laat performancezorgen je er niet van weerhouden het te gebruiken.

## De cleanup-regel

Er is één regel die je niet mag vergeten: **clear de MDC altijd als je klaar bent.**

Dit is waar de `ThreadLocal`-aard van MDC een valkuil wordt.
Webservers gebruiken thread pools, wat betekent dat threads hergebruikt worden.
Als een request afgerond is op een thread, gaat die thread terug in de pool.
Het volgende request dat hem oppikt, erft wat er in de MDC achterblijft van het vorige: verkeerde userId, verkeerde requestId, verkeerd alles.

Clear altijd in een `finally` blok, zodat het ook bij exceptions wordt uitgevoerd:

```java
try {
    MDC.put("userId", userId);
    MDC.put("requestId", requestId);
    // ... je logica
} finally {
    MDC.clear();
}
```

Het Logback manual zegt dit expliciet: een `put()` operatie hoort altijd gebalanceerd te worden door een corresponderende `remove()` en dat doen in een `finally` blok is de veiligste manier om te garanderen dat het altijd gebeurt, ongeacht het uitvoerpad.

## De simpele versie

De eerste keer dat ik MDC implementeerde, hield ik het rechttoe rechtaan.
Velden zetten aan het begin van een flow, updaten terwijl dingen vorderen, alles clearen in een `finally` blok op het einde.

```java
try {
    MDC.put("version", "3.0");
    MDC.put("response", "102"); // in verwerking

    log.info("Flow gestart");

    var result = doHetEchteWerk();

    MDC.put("response", "201"); // success
    log.info("Flow afgerond");

    return result;

} catch (Exception e) {
    MDC.put("response", "500");
    MDC.put("error", e.getClass().getSimpleName());
    log.error("Flow mislukt", e);
    throw e;

} finally {
    MDC.clear();
}
```

Het `response`-veld dat meegaat terwijl je verder gaat: 102 tijdens verwerking, 201 bij success, 500 bij error, betekent dat je in Kibana niet alleen ziet dát iets misliep, maar op welk punt in de flow het gebeurde. Dat voelde verrassend krachtig voor iets zo eenvoudigs om toe te voegen.

## Het wordt interessanter

Het tweede project was complexer.
Meer services, meer asynchrone verwerking, meer gevallen waarbij de simpele inline aanpak niet meer genoeg was.
Dus werd het architecturaler.

In plaats van `MDC.put()` calls door de code te strooien, begon ik ze te encapsuleren in dedicated context classes: een klasse verantwoordelijk voor het zetten, updaten en clearen van een specifieke set MDC-velden, met een duidelijke `start()` / `finish()` lifecycle.

```java
public final class ProcessingMdcContext {

    public static final String STATUS_KEY   = "process.status";
    public static final String DURATION_KEY = "process.durationMs";
    public static final String ERROR_KEY    = "process.errorReason";

    private static final ThreadLocal<Long> START_NANOS = new ThreadLocal<>();

    public static void start() {
        START_NANOS.set(System.nanoTime());
        MDC.put(STATUS_KEY, "PROCESSING");
        MDC.remove(DURATION_KEY);
        MDC.remove(ERROR_KEY);
    }

    public static void finish(boolean success, Throwable cause) {
        MDC.put(STATUS_KEY, success ? "SUCCESS" : "FAILED");
        MDC.put(DURATION_KEY, String.valueOf(computeDurationMs()));
        if (!success) {
            MDC.put(ERROR_KEY, classifyError(cause));
        }
    }

    public static void clear() {
        START_NANOS.remove();
        MDC.remove(STATUS_KEY);
        MDC.remove(DURATION_KEY);
        MDC.remove(ERROR_KEY);
    }

    private static long computeDurationMs() {
        Long start = START_NANOS.get();
        return start == null ? 0 : TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - start);
    }
}
```

Dit is netter om een paar redenen.
De veldnamen zijn constanten, dus je kunt ze niet fout typen. Het `start()` / `finish()` patroon maakt de lifecycle expliciet en moeilijker om te verknallen.
En duration bijhouden via `ThreadLocal<Long>` betekent dat je `process.durationMs` automatisch in elke logregel krijgt, wat in Kibana dashboards laat bouwen die tonen hoe lang operaties duren, waar de trage ones clusteren, welke error types de meeste tijd kosten.

Merk op dat `ProcessingMdcContext` zelf een `ThreadLocal` gebruikt voor de starttijd, precies zoals MDC intern werkt.
Eens je begrijpt dat MDC gewoon `ThreadLocal<Map<String,String>>` is, voelt het vanzelfsprekend om `ThreadLocal` zelf te gebruiken voor gerelateerde tracking.

## Het thread pool probleem

Hier is de valkuil die Google je pas waarschuwt nadat je hem al gevonden hebt.

MDC is thread-local.
Dat is het hele punt.
Maar het betekent ook: als je async werk start op een thread pool, begint die nieuwe thread met een lege MDC.
Je context propageert niet automatisch.
De velden die je zorgvuldig hebt ingesteld op de originele thread zijn onzichtbaar op elke thread waar het werk aan doorgegeven wordt.

Dit valt stil op.
Je async logs hebben gewoon lege velden waar je waarden verwachtte, of erger, de waarden van de vorige context die die pooled thread had.
Het is verwarrend en neemt een tijdje om te diagnosticeren als je niet weet waarnaar je zoekt.

De aanbevolen aanpak is om een snapshot van de MDC te capturen voor je de taak indient en die te herstellen op de worker thread:

```java
public static Runnable wrap(Runnable runnable) {
    Map<String, String> capturedContext = MDC.getCopyOfContextMap();
    return () -> {
        Map<String, String> previous = MDC.getCopyOfContextMap();
        try {
            if (capturedContext == null) {
                MDC.clear();
            } else {
                MDC.setContextMap(capturedContext);
            }
            runnable.run();
        } finally {
            if (previous == null) {
                MDC.clear();
            } else {
                MDC.setContextMap(previous);
            }
        }
    };
}
```

`MDC.getCopyOfContextMap()` geeft je een snapshot van de MDC map van de huidige thread op het moment dat je hem aanroept.
De teruggegeven `Runnable` stelt dan die snapshot in als context op welke thread de taak ook uiteindelijk uitvoert, en herstelt wat er daarvoor stond wanneer die klaar is.

Je roept het zo aan voor je naar een executor indient:

```java
executor.submit(ProcessingMdcContext.wrap(() -> doAsyncWork()));
```

De context reist mee met de taak.
Je async logregels hebben dezelfde MDC-velden als de thread die het werk heeft ingediend.

## HTTP context via een filter

Voor de HTTP-laag is de netstste aanpak een `OncePerRequestFilter`.
Dit is een Spring-klasse die garandeert dat je filterlogica precies één keer per request wordt uitgevoerd, zelfs in complexe filterchaïnes.
Je gebruikt het om MDC-velden te vullen aan het begin van elk request: method, path, client IP, zodat ze meevloeien door elke logregel die het request produceert, ongeacht welke serviceklasse of methode ze genereert.

```java
public class RequestLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        try {
            MDC.put("request.method", request.getMethod());
            MDC.put("request.path",   request.getRequestURI());
            MDC.put("request.clientIp", request.getRemoteAddr());
            chain.doFilter(request, response);
        } finally {
            MDC.put("response.status", String.valueOf(response.getStatus()));
            MDC.clear();
        }
    }
}
```

`response.status` gaat in het `finally` blok, niet vóór `chain.doFilter()`.
Op het moment dat de filter uitvoert, is de response nog niet gecommit, de chain is wat het request verwerkt en de status instelt.
Dus je leest de status na de chain, niet ervoor.

Logback levert zelf ook een ingebouwde filter hiervoor, `MDCInsertingServletFilter`, die automatisch een standaard set request-velden vult. Goed om te weten dat hij bestaat, al geeft je eigen implementatie controle over precies welke velden er in komen.

## Wat het er uitziet in Kibana

Hier betaalt het zich terug.
Logback (via logstash-logback-encoder of equivalent) kan je MDC-velden serialiseren als gestructureerde JSON-velden, die Elasticsearch individueel indexeert.
Dat betekent dat je er in Kibana direct op kunt zoeken.

Eenmaal je MDC-velden geïndexeerd zijn, kun je filteren op `structured.version : 3.0` en alles zien wat er in die flow is gebeurd over alle services.
Je kunt filteren op `structured.process.status : FAILED` en sorteren op `structured.process.durationMs` om te vinden welke failures het langst duurden.
Je kunt een dashboard bouwen dat je foutdistributie per `structured.process.errorReason` over de tijd toont.
Je kunt een enkele async operatie tracen over threads, omdat je de runnable gewrapt hebt en de context meereisd is.

Voor MDC: een muur van logregels, timestamps, en manueel detectivewerk.
Na MDC: je stelt Kibana een concrete vraag en het antwoordt.

---

## Bronnen

- SLF4J API — [MDC class documentatie](https://www.slf4j.org/api/org/slf4j/MDC.html). De MDC-klasse heeft alleen statische methoden en beheert contextuele informatie per thread.
- Logback Manual, Hoofdstuk 8 — [Mapped Diagnostic Context](https://logback.qos.ch/manual/mdc.html). "MDC operations such as put() and get() affect only the MDC of the current thread, and the children of the current thread. The MDC in other threads remain unaffected."
- Logback Manual, Hoofdstuk 6 — [Layouts](https://logback.qos.ch/manual/layouts.html). Het `%X{key}` conversiewoord is gedocumenteerd onder de PatternLayout-sectie.
- Logback Manual, Hoofdstuk 8. "Normally, a put() operation should be balanced by the corresponding remove() operation. Otherwise, the MDC will contain stale values for certain keys. We would recommend that whenever possible, remove() operations be performed within finally blocks, ensuring their invocation regardless of the execution path of the code."
- Logback Manual, Hoofdstuk 8, sectie "MDC And Managed Threads". "It is recommended that MDC.getCopyOfContextMap() is invoked on the original (master) thread before submitting a task to the executor. When the task runs, as its first action, it should invoke MDC.setContextMap() to associate the stored copy of the original MDC values with the new Executor managed thread."
- Logback Manual, Hoofdstuk 8, sectie "MDCInsertingServletFilter" — [MDCInsertingServletFilter source](https://logback.qos.ch/xref/ch/qos/logback/classic/helpers/MDCInsertingServletFilter.html). Een ingebouwde Logback-filter die automatisch standaard HTTP request-velden in de MDC vult.

**Verder lezen:**
- Neil Harrison, "Patterns for Logging Diagnostic Messages," in *Pattern Languages of Program Design 3*, red. R. Martin, D. Riehle, en F. Buschmann (Addison-Wesley, 1997). De originele paper waarop het concept van MDC gebaseerd is.
- [logstash-logback-encoder](https://github.com/logfellow/logstash-logback-encoder) — voor het doorsturen van gestructureerde MDC-velden naar Elasticsearch/Kibana.
- Spring Framework — [OncePerRequestFilter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/filter/OncePerRequestFilter.html) API docs.