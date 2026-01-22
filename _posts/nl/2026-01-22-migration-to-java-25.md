---
layout: post
title:  "Migratie naar Java 25 en Spring Boot 4: eerlijk, het was chaos"
date:   2026-01-22 12:00:00 +0100
image:  "/assets/img/migration-to-java-25.jpg"
tags: [java, spring, migration, openrewrite, softwaredevelopment]
lang: nl
---

>"I'm ready… to break everything and figure it out later!" – SpongeBob SquarePants

Iedereen zegt altijd dat upgraden van Spring makkelijk is, toch? Gewoon **OpenRewrite** draaien, een paar kleine dingen fixen en klaar.

Nou… laat me vertellen over onze migratie van **Java 17/21 naar Java 25** en **Spring Boot 3 naar 4.0.1**.

Voor één service kost het nu maximaal één uur om alles te fixen. Niet zo erg. Maar ik heb deze migratie al een paar keer gedaan bij de klant. En ik blijf steeds dezelfde problemen tegenkomen, keer op keer.

Dus ik dacht: laat ik dit opschrijven. Misschien helpt het iemand anders die deze migratie moet doen.


## Waarom we dit überhaupt deden

Onze tech lead wilde naar **Java 25**. Zijn reden? Hij wil altijd de nieuwste versie van alles. En eerlijk, ik was wel enthousiast om eens een migratie mee te maken.

Daarnaast moesten we:

* Upgraden naar **Spring Boot 4** en **Spring Framework 7**
* De **Jakarta-migratie** volledig afronden
* Oude code opruimen voordat we nieuwe features toevoegen

Onze applicaties bevatten allemaal:

* REST APIs
* Custom HTTP clients
* JWT security
* File uploads
* Heel veel tests met MockMvc
* Jackson voor JSON overal

## OpenRewrite: helpt, maar is geen magie

We begonnen met **OpenRewrite** en de officiële Spring recipes ([bron](https://docs.openrewrite.org/recipes/java)).

Wat Rewrite goed deed:

* `javax.*` → `jakarta.*`
* Spring imports updaten
* Deprecated APIs fixen
* Config classes aanpassen
* **Try-catch syntax vereenvoudigen**
* `.additionalMessageConverters(new MappingJackson2HttpMessageConverter())` → `.additionalMessageConverters(new JacksonJsonHttpMessageConverter())`
* `.format(...)` → `.formatted(...)`
* **YAML splitsen per profiel**

*Maar… er kwamen ook snel problemen.*

## OpenRewrite + JDK/JRE mismatch

Eerste keer dat ik OpenRewrite draaide op Java 25 crashte het met:

```java
java.lang.LinkageError: loader constraint violation: com.sun.tools.javac.parser.Tokens$Comment$CommentStyle
```

Oorzaak: **JDK en JRE waren niet dezelfde versie**.

**Fix:**

* Check altijd dat JDK en JRE dezelfde versie hebben
* Voor ons: beide op **Java 25** zetten


## "Alles compileert!" … dan exploderen de tests

Na Rewrite en alle compileerfouten fixen, startten we de tests. En dan? Alles faalde.

Problemen zaten vooral in:

* MockMvc tests
* JSON serialization
* HTTP clients
* Jackson config


## Jackson: de pijn die nooit stopt

Spring Boot 4 verhuist Jackson van:

Oude locatie:

```java
com.fasterxml.jackson.*
```

Nieuwe locatie:

```java
tools.jackson.*
```

Problemen die we tegenkwamen:

* Mixed imports in tests
* Constants zoals `WRITE_DATES_AS_TIMESTAMPS` verdwenen
* ObjectMapper conflicts, vooral in tests met meerdere primary beans

Vroeger hadden we:

```java
@Bean
@Primary
ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder) {
    return builder.dateFormat(...).build();
}
```

In Boot 4:

* `Jackson2ObjectMapperBuilder` is **deprecated**
* Boot maakt zijn eigen **primary** `jacksonJsonMapper`

Resultaat:

```
NoUniqueBeanDefinitionException:
more than one 'primary' bean found: [objectMapper, jacksonJsonMapper]
```

**Nieuwe aanpak:**

```java
@Bean
public ObjectMapper objectMapper() {
    var dateFormat = new SimpleDateFormat("dd-MM-yyyy");

    return JsonMapper.builder()
            .defaultDateFormat(dateFormat)
            .findAndAddModules()
            .build();
}
```

**Bron:** [Introducing Jackson 3 support in Spring](https://spring.io/blog/2025/10/07/introducing-jackson-3-support-in-spring)

## RestTemplate & HTTP veranderingen

### RestTemplateBuilder verplaatst

Oude locatie:

```java
org.springframework.web.client.RestTemplateBuilder
```

Nieuwe locatie:

```java
org.springframework.boot.restclient.RestTemplateBuilder
```

> In productiecode migreer je vaak naar **RestClient**, Spring Boot 4 geeft hier voorkeur aan.

### Response API veranderd

Oude manier:

```java
response.getStatusCodeValue()
```

Nieuwe manier:

```java
response.getStatusCode().value()
```

### Headers vervangen

Oude Apache manier:

```java
Header[] headers = response.getAllHeaders();
```

Nieuwe Spring manier:

```java
HttpHeaders headers = response.getHeaders();
```

### Timeouts zijn nu builders

Oude setters bestaan niet meer. Nieuw:

```java
HttpComponentsClientHttpRequestFactory requestFactory =
    ClientHttpRequestFactoryBuilder.httpComponents()
        .withDefaultRequestConfigCustomizer(rc -> rc
            .setConnectTimeout(Timeout.ofSeconds(5))
            .setConnectionRequestTimeout(Timeout.ofSeconds(5))
            .setResponseTimeout(Timeout.ofSeconds(5))
        )
        .build();
```

**Custom HttpClients** moeten nu via `.withHttpClientCustomizer(...)` worden toegevoegd.
**Bron:** [Spring Framework 7 HTTP Client](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-request-factories)

## Apache HttpClient 4 → 5

Alles is veranderd:

* `org.apache.http.*` → `org.apache.hc.*`
* Timeouts, SSL, connection managers, request builders → volledige rewrite

**Bron:** [Apache HttpClient 5 Migration](https://hc.apache.org/httpcomponents-client-5.6.x/migration-guide/preparation.html)

## Swagger & OpenAPI na Jakarta

Na migratie verdwijnen OpenAPI annotaties. Voeg toe:

```xml
<dependency>
    <groupId>io.swagger.core.v3</groupId>
    <artifactId>swagger-annotations-jakarta</artifactId>
</dependency>
```
**Bron:** [Swagger](https://github.com/swagger-api/swagger-core)

## Spring Security 7 WebSocket

`AbstractSecurityWebSocketMessageBrokerConfigurer` is verwijderd. Voor ons werkt deze aanpak:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.messaging.EnableWebSocketSecurity;
import org.springframework.security.messaging.access.intercept.MessageAuthorizationContext;
import org.springframework.security.messaging.access.intercept.MessageMatcherDelegatingAuthorizationManager;

@Configuration
@EnableWebSocketSecurity
public class WebSocketSecurityConfig {

    @Bean
    public AuthorizationManager<Message<?>> messageAuthorizationManager(
            MessageMatcherDelegatingAuthorizationManager.Builder messages) {
        messages
                .nullDestMatcher().permitAll()
                .simpSubscribeDestMatchers("/**").permitAll()
                .simpDestMatchers("/**").permitAll()
                .anyMessage().permitAll();
        return messages.build();
    }

    @Bean
    public AuthorizationManager<MessageAuthorizationContext<?>> authorizationManager() {
        return (_, _) -> new AuthorizationDecision(true);
    }
}
```

**Bron:** [Spring Security 7 WebSocket](https://newreleases.io/project/github/spring-projects/spring-security/release/7.0.0-M1),
[Github Thread](https://github.com/spring-projects/spring-security/pull/17328)


## Terugkerende problemen

Tijdens de migratie kwamen de meeste problemen steeds terug, vooral in tests:

* Jackson namespace breekt constant
* ObjectMapper conflicts in tests
* HTTP client configuratie moet volledig herschreven worden
* Response handling methoden gewijzigd
* RestTemplate en builders hebben nieuwe imports of zijn vervangen door RestClient
* Tests falen vaak ondanks succesvolle compilatie

Daarnaast blijkt dat compiler, serialisatielaag, SSL-configuratie en auto-configuration allemaal tegelijk worden beïnvloed door de upgrade.


## Wat ik zou aanraden

* Plan extra tijd voor tests
* Verwacht Jackson-problemen en ObjectMapper-conflicten
* Bereid je voor op herschrijven van HTTP client code
* Run je volledige test suite vroeg en vaak
* Gebruik OpenRewrite

Persoonlijk ben ik blij dat ik deze migratie zelf mocht doen. Ondanks de frustraties en het vele lezen van documentatie, gaf het me een veel dieper inzicht in hoe Spring Boot en Spring Framework werken en hoe ze de controle over infrastructuur en configuratie hebben.

Wil je meer weten over Spring Boot 4 en Spring Framework 7? Check dan volgende post: [Spring Boot 4 & Spring Framework 7](https://www.baeldung.com/spring-boot-4-spring-framework-7).

## Overzicht van alle bronnen

| Resource | Link |
| --- | --- |
| OpenRewrite recipes | [https://docs.openrewrite.org/recipes/java](https://docs.openrewrite.org/recipes/java) |
| Spring Framework 7 HTTP Client | [https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-request-factories](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-request-factories) |
| Apache HttpClient 5 Migration | [https://hc.apache.org/httpcomponents-client-5.6.x/migration-guide/preparation.html](https://hc.apache.org/httpcomponents-client-5.6.x/migration-guide/preparation.html) |
| Swagger (swagger-core) | [https://github.com/swagger-api/swagger-core](https://github.com/swagger-api/swagger-core) |
| Spring Security 7 WebSocket (PR) | [https://github.com/spring-projects/spring-security/pull/17328](https://github.com/spring-projects/spring-security/pull/17328) |
| Spring Security 7 (discussion thread) | [https://github.com/spring-projects/spring-security/pull/17328](https://github.com/spring-projects/spring-security/pull/17328) |
| Spring Boot 4 & Spring Framework 7 (overview) | [https://www.baeldung.com/spring-boot-4-spring-framework-7](https://www.baeldung.com/spring-boot-4-spring-framework-7) |
