---
layout: post
title:  "Migration to Java 25 and Spring Boot 4: honestly, it was chaos"
date:   2026-01-22 12:00:00 +0100
image:  "/assets/img/migration-to-java-25.jpg"
tags: [java, spring, migration, openrewrite, softwaredevelopment]
lang: en
---

> "I'm ready… to break everything and figure it out later!" – SpongeBob SquarePants

Everyone always says that upgrading Spring is easy, right? Just run **OpenRewrite**, fix a few small things, and you’re done.

Well… let me tell you about our migration from **Java 17/21 to Java 25** and from **Spring Boot 3 to 4.0.1**.

For a single service it now takes at most an hour to fix everything. Not too bad. But I’ve already done this migration a few times for clients. And I keep running into the same problems, over and over again.

So I thought: let me write this down. Maybe it helps someone else who has to go through this migration.

## Why we did this in the first place

Our tech lead wanted to move to **Java 25**. His reason? He always wants the newest version of everything. And honestly, I was pretty excited to experience a migration like this.

On top of that, we had to:

* Upgrade to **Spring Boot 4** and **Spring Framework 7**
* Fully finish the **Jakarta migration**
* Clean up old code before adding new features

All of our applications contain:

* REST APIs
* Custom HTTP clients
* JWT security
* File uploads
* A lot of tests with MockMvc
* Jackson for JSON everywhere

## OpenRewrite: helpful, but not magic

We started with **OpenRewrite** and the official Spring recipes ([source](https://docs.openrewrite.org/recipes/java)).

What Rewrite did well:

* `javax.*` → `jakarta.*`
* Updating Spring imports
* Fixing deprecated APIs
* Adjusting config classes
* **Simplifying try-catch syntax**
* `.additionalMessageConverters(new MappingJackson2HttpMessageConverter())` → `.additionalMessageConverters(new JacksonJsonHttpMessageConverter())`
* `.format(...)` → `.formatted(...)`
* **Splitting YAML per profile**

*But… problems showed up pretty quickly.*

## OpenRewrite + JDK/JRE mismatch

The first time I ran OpenRewrite on Java 25 it crashed with:

```java
java.lang.LinkageError: loader constraint violation: com.sun.tools.javac.parser.Tokens$Comment$CommentStyle
```

Cause: **JDK and JRE were not the same version**.

**Fix:**

* Always check that JDK and JRE are the same version
* For us: set both to **Java 25**

## "Everything compiles!" … then the tests explode

After Rewrite and fixing all compilation errors, we started the tests. And then? Everything failed.

Most problems were in:

* MockMvc tests
* JSON serialization
* HTTP clients
* Jackson config

## Jackson: the pain that never ends

Spring Boot 4 moves Jackson from:

Old location:

```java
com.fasterxml.jackson.*
```

New location:

```java
tools.jackson.*
```

Problems we ran into:

* Mixed imports in tests
* Constants like `WRITE_DATES_AS_TIMESTAMPS` disappeared
* ObjectMapper conflicts, especially in tests with multiple primary beans

Before we had:

```java
@Bean
@Primary
ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder) {
    return builder.dateFormat(...).build();
}
```

In Boot 4:

* `Jackson2ObjectMapperBuilder` is **deprecated**
* Boot creates its own **primary** `jacksonJsonMapper`

Result:

```
NoUniqueBeanDefinitionException:
more than one 'primary' bean found: [objectMapper, jacksonJsonMapper]
```

**New approach:**

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

**Source:** [Introducing Jackson 3 support in Spring](https://spring.io/blog/2025/10/07/introducing-jackson-3-support-in-spring)

## RestTemplate & HTTP changes

### RestTemplateBuilder moved

Old location:

```java
org.springframework.web.client.RestTemplateBuilder
```

New location:

```java
org.springframework.boot.restclient.RestTemplateBuilder
```

> In production code you’ll often migrate to **RestClient**, which Spring Boot 4 prefers.

### Response API changed

Old way:

```java
response.getStatusCodeValue()
```

New way:

```java
response.getStatusCode().value()
```

### Headers replaced

Old Apache way:

```java
Header[] headers = response.getAllHeaders();
```

New Spring way:

```java
HttpHeaders headers = response.getHeaders();
```

### Timeouts are now builders

The old setters no longer exist. New:

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

**Custom HttpClients** now have to be added via `.withHttpClientCustomizer(...)`.

**Source:** [Spring Framework 7 HTTP Client](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-request-factories)

## Apache HttpClient 4 → 5

Everything changed:

* `org.apache.http.*` → `org.apache.hc.*`
* Timeouts, SSL, connection managers, request builders → complete rewrite

**Source:** [Apache HttpClient 5 Migration](https://hc.apache.org/httpcomponents-client-5.6.x/migration-guide/preparation.html)

## Swagger & OpenAPI after Jakarta

After the migration, OpenAPI annotations disappear. Add:

```xml
<dependency>
    <groupId>io.swagger.core.v3</groupId>
    <artifactId>swagger-annotations-jakarta</artifactId>
</dependency>
```

**Source:** [Swagger](https://github.com/swagger-api/swagger-core)

## Spring Security 7 WebSocket

`AbstractSecurityWebSocketMessageBrokerConfigurer` is gone. For us, this approach works:

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

**Source:** [Spring Security 7 WebSocket](https://newreleases.io/project/github/spring-projects/spring-security/release/7.0.0-M1),
[Github Thread](https://github.com/spring-projects/spring-security/pull/17328)

## Recurring problems

During the migration, most issues kept coming back, especially in tests:

* Jackson namespace constantly breaks
* ObjectMapper conflicts in tests
* HTTP client configuration has to be fully rewritten
* Response handling methods changed
* RestTemplate and builders have new imports or are replaced by RestClient
* Tests often fail even though compilation succeeds

On top of that, the compiler, serialization layer, SSL configuration, and auto-configuration all get affected at the same time by the upgrade.

## What I would recommend

* Plan extra time for tests
* Expect Jackson problems and ObjectMapper conflicts
* Be prepared to rewrite HTTP client code
* Run your full test suite early and often
* Use OpenRewrite

Personally, I’m glad I got to do this migration myself. Despite the frustrations and all the documentation reading, it gave me a much deeper understanding of how Spring Boot and Spring Framework work and how much control they have over infrastructure and configuration.

Want to learn more about Spring Boot 4 and Spring Framework 7? Check out this post: [Spring Boot 4 & Spring Framework 7](https://www.baeldung.com/spring-boot-4-spring-framework-7).

## Overview of all sources

| Resource                                      | Link                                                                                                                                                                                                             |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenRewrite recipes                           | [https://docs.openrewrite.org/recipes/java](https://docs.openrewrite.org/recipes/java)                                                                                                                           |
| Spring Framework 7 HTTP Client                | [https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-request-factories](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-request-factories) |
| Apache HttpClient 5 Migration                 | [https://hc.apache.org/httpcomponents-client-5.6.x/migration-guide/preparation.html](https://hc.apache.org/httpcomponents-client-5.6.x/migration-guide/preparation.html)                                         |
| Swagger (swagger-core)                        | [https://github.com/swagger-api/swagger-core](https://github.com/swagger-api/swagger-core)                                                                                                                       |
| Spring Security 7 WebSocket (PR)              | [https://github.com/spring-projects/spring-security/pull/17328](https://github.com/spring-projects/spring-security/pull/17328)                                                                                   |
| Spring Security 7 (discussion thread)         | [https://github.com/spring-projects/spring-security/pull/17328](https://github.com/spring-projects/spring-security/pull/17328)                                                                                   |
| Spring Boot 4 & Spring Framework 7 (overview) | [https://www.baeldung.com/spring-boot-4-spring-framework-7](https://www.baeldung.com/spring-boot-4-spring-framework-7)                                                                                           |
