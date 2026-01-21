---
layout: post
title: "Testcontainers in Spring Boot: Van Snelle Winst tot Geavanceerde Zetten"
date: 2025-10-05 08:00:00 +0100
image: "/assets/img/spongebob-testcontainers.png"
tags: [java, spring-boot, testing, docker]
lang: nl
ref: testcontainers
---
> "Testcontainers is like having SpongeBob at the helm of your CI: cheerful, reliable, and somehow turning chaos into perfection." - Me

Als junior developer ben ik constant nieuwe tools en werkwijzen aan het leren.  
Een les van mijn senioren die echt bij me bleef hangen was deze: _mocking brengt je maar tot een bepaald punt_.  
Op een gegeven moment moet je testen tegen het echte werk: een echte database, een echte message broker, een echte service.  

Toen ontdekte ik **Testcontainers**, en het veranderde volledig hoe ik integratietests schrijf in Java en Spring Boot.  
Na ermee te hebben geëxperimenteerd en mijn bevindingen te hebben gedeeld met collega’s, besefte ik dat ik alles wat ik had geleerd op één plek wilde vastleggen.  

Deze post is mijn poging dat te doen: het uitleggen van het **waarom**, het **hoe**, en de **praktijkpatronen** die ik nu in mijn projecten gebruik.

## Het Probleem dat Ik Eerder Had
Ik moet toegeven:  
ik probeerde integratietests altijd te vermijden wanneer ik kon.  
Mocks waren mijn beste vrienden: snel, voorspelbaar, en makkelijk op te zetten.  

Maar hoe graag ik ze ook gebruikte, sommige dingen kun je gewoon niet faken.  
Een mailserver, een echte PostgreSQL-database — geen enkele mock kon dat echt repliceren.  

Ik liep al snel tegen dezelfde frustrerende scenario’s aan die we allemaal kennen: tests die op mijn machine slagen maar falen in CI, of collega’s die uren besteden aan het klaarmaken van de omgeving om tests te kunnen draaien.  

Voor een Spring Boot-app die PostgreSQL nodig heeft en e-mails verstuurt, zien de opties er zo uit:

| Benadering                                                  | Voordelen                                                                                                                  | Nadelen                                                                                                                               |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Lokale installatie**<br/>Installeer PostgreSQL & SMTP lokaal | - Testen tegen echte services<br/> - Geen mocking nodig                                                                    | - Verschillende versies op verschillende machines<br/> - “Werkt op mijn laptop” syndroom<br/> - Pijnlijke CI-setup<br/> - Achtergebleven testdata |
| **Alles mocken**<br/>Gebruik mock databases & services      | - Snelle testuitvoering<br/> - Geen externe afhankelijkheden                                                               | - Test geen echte integratie<br/> - Mocks wijken af van de werkelijkheid<br/> - Valse zekerheid                                      |
| **Testcontainers**<br/>Echte services in Docker             | - Echte integratietests<br/> - Consistent op alle machines<br/> - Geen installatie gedoe<br/> - Schone staat bij elke run | - Vereist Docker<br/> - Iets langzamer dan mocks                                                                                      |

**Testcontainers** was de game-changer die ik nodig had.

## Snel aan de Slag

Voordat ik dieper inga, eerst een setup:

**Vereisten:**
- Java **21+**
- Maven
- Docker Desktop draaiend

**Dependencies toevoegen:**

Maven:
```xml
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>postgresql</artifactId>
    <scope>test</scope>
</dependency>
````

## De Standaardaanpak (Goed, Maar Beperkt)

De meeste tutorials laten dit zien, en eerlijk, het werkt prima voor eenvoudige cases:

```java
@Testcontainers
@DataJpaTest
class UserRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");
    
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    @Autowired
    UserRepository userRepository;
    
    @Test
    void givenNewUser_whenSaving_thenUserIsPersisted() {
        User user = new User("Spongebob");
        userRepository.save(user);
        assertEquals(1, userRepository.findAll().size());
    }
}
```

Perfect voor eenvoudige gevallen. JUnit start een PostgreSQL-container, Spring Boot configureert deze via `@DynamicPropertySource`, de test draait tegen een echte database, en de container wordt netjes opgeruimd na afloop.

### Wat Gebeurt Er Achter de Schermen?

Wanneer je op “Run Test” klikt, gebeurt dit (vereenvoudigd):

<p align="center">
    <img src="{{ '/assets/img/simplified.svg' | prepend: site.baseurl }}" alt="Achter de schermen (vereenvoudigd)" style="height: 550px">
</p>

Het wachten is cruciaal.
Testcontainers kijkt niet alleen of de poort open is, maar wacht totdat de service daadwerkelijk klaar is om verbindingen te accepteren.
Daarom werken je tests “gewoon” zonder flakey failures.

Maar in echte projecten liep ik al snel tegen situaties aan waarbij ik moest:

* Meerdere containers starten die met elkaar praten
* Mijn database vooraf vullen met schema of seed data
* Wachten tot een REST API klaar is, niet alleen een poort
* E-mails testen tegen een fake SMTP-server

Daar wordt het pas interessant…

## Volgende Stap: ApplicationContextInitializer

Wanneer ik meer controle nodig heb, biedt Spring Boot een krachtige hook:
**`ApplicationContextInitializer<ConfigurableApplicationContext>`**.

Dit draait **voordat** je applicatiecontext start, en laat je toe om:

* Containers handmatig te starten met volledige controle
* Complexe wachtstrategieën te configureren
* Custom properties in Spring’s environment te injecteren
* Containerconfiguraties te hergebruiken over meerdere testklassen

Ik zie dit als de “professionele” manier om Testcontainers in Spring Boot op te zetten.

### Hoe de Professionele Setup Werkt

Wanneer je `ApplicationContextInitializer` gebruikt, gebeurt dit:

<p align="center">
    <img src="{{ '/assets/img/testcontainers.svg' | prepend: site.baseurl }}" alt="Wat gebeurt bij ApplicationContextInitializer" style="height: 550px">
</p>

Je krijgt volledige controle over de opstartvolgorde en kunt containers precies configureren zoals jij wilt.

### Praktijkvoorbeeld: E-mails testen met smtp4dev (of Mailpit)

Mijn app verstuurt e-mails, en ik moest realistisch testen zonder echte inboxen te spammen.

**smtp4dev** is een fake SMTP-server die e-mails opvangt en via een REST API beschikbaar stelt.
Het bestaat al jaren, is volwassen en biedt features zoals relay-testing en authenticatiesimulatie.
Perfect voor uitgebreide e-mailtests.

**Mailpit** is een modern alternatief geschreven in Go: lichter, sneller opstartend, en met een strakke UI.
Ook uitstekende zoekfunctionaliteit en ingebouwde spam-analyse.
Voor nieuwe projecten in 2025 is Mailpit vaak de go-to, maar smtp4dev blijft solide voor bestaande projecten.

Beide bieden REST APIs, ondersteunen SMTP-authenticatie en hebben een web UI voor handmatige inspectie.
Belangrijkste verschillen:

* **Performance**: Mailpit start sneller en gebruikt minder geheugen (~10-20MB vs ~50-100MB)
* **UI**: Mailpit heeft een moderne, responsive interface
* **Features**: smtp4dev heeft meer enterprise-features; Mailpit focust op eenvoud
* **Docker grootte**: Mailpit image is kleiner (~15MB vs ~200MB)

Voor de meeste Spring Boot integratietests werkt beide prima.
Hier laat ik smtp4dev zien, maar switchen naar Mailpit is simpel door de image naam te veranderen.

```java
public class Smtp4devTestContainerInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    public static final GenericContainer<?> smtp4devContainer = new GenericContainer<>(DockerImageName.parse("rnwood/smtp4dev:3.10.3"))
        .withExposedPorts(80, 25)
        .waitingFor(Wait.forHttp("/api/messages")
        .forPort(80)
        .forStatusCode(200));
    
    @Override
    public void initialize(ConfigurableApplicationContext context) {
        smtp4devContainer.start();
        
        TestPropertyValues.of(
        "spring.mail.host=" + smtp4devContainer.getHost(),
        "spring.mail.port=" + smtp4devContainer.getMappedPort(25)
        ).applyTo(context.getEnvironment());
    }
}
```

Nu in een test:

```java
@SpringBootTest
@ContextConfiguration(initializers = Smtp4devTestContainerInitializer.class)
class KrustyKrabEmailServiceTest {

    @Autowired
    EmailService emailService;
    
    @Test
    void givenBikiniBottomCitizen_whenSendingWelcome_thenMessageSends() {
        emailService.sendWelcome("patrick.star@bikinibottom.com");
        
        RestTemplate rest = new RestTemplate();
        String messagesApi = "http://" +
        Smtp4devTestContainerInitializer.smtp4devContainer.getHost() + ":" +
        Smtp4devTestContainerInitializer.smtp4devContainer.getMappedPort(80) +
        "/api/messages";
        
        List<Map<String, Object>> messages = rest.getForObject(messagesApi, List.class);
        
        assertEquals(1, messages.size());
        assertThat(messages.get(0).get("subject").toString()).isEqualTo("Welcome"));
    }
}
```

Belangrijke punten:

* **`withExposedPorts(80, 25)`** → web UI + SMTP poort openstellen
* **`waitingFor(Wait.forHttp(...))`** → wachten tot de API echt klaar is
* **`TestPropertyValues`** → configureert container-instellingen in Spring

Wil je **Mailpit** gebruiken? Zo ziet de initializer eruit:

```java
public class MailpitTestContainerInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    public static final GenericContainer<?> mailpitContainer = new GenericContainer<>(DockerImageName.parse("axllent/mailpit:v1.27.8"))
        .withExposedPorts(8025, 1025)
        .waitingFor(Wait.forHttp("/api/v1/messages")
        .forPort(8025)
        .forStatusCode(200));
    
    @Override
    public void initialize(ConfigurableApplicationContext context) {
        mailpitContainer.start();
        
        TestPropertyValues.of(
        "spring.mail.host=" + mailpitContainer.getHost(),
        "spring.mail.port=" + mailpitContainer.getMappedPort(1025)
        ).applyTo(context.getEnvironment());
    }
}
```

Verschillen:

* Poort 8025 voor web UI (ipv 80 bij smtp4dev)
* Poort 1025 voor SMTP (ipv 25)
* API pad `/api/v1/messages` ipv `/api/messages`

Beide werken identiek in je tests. Kies smtp4dev voor geavanceerde relay-features of bestaande projecten, Mailpit voor snelle opstart en kleine Docker footprint.

### PostgreSQL met Initialisatie Scripts

Soms wil ik geen lege database, maar schema + seed data laden:

```java
public class TestDatabaseInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    private static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
        .withDatabaseName("myapp")
        .withCopyFileToContainer(MountableFile.forClasspathResource("init_schema.sql"), "/docker-entrypoint-initdb.d/");
    
    @Override
    public void initialize(ConfigurableApplicationContext context) {
        postgres.start();
        
        TestPropertyValues.of(
        "spring.datasource.url=" + postgres.getJdbcUrl(),
        "spring.datasource.username=" + postgres.getUsername(),
        "spring.datasource.password=" + postgres.getPassword()
        ).applyTo(context.getEnvironment());
    }
}
```

De truc: **`withCopyFileToContainer`** → schema in `/docker-entrypoint-initdb.d/` plaatsen. Postgres voert dit automatisch uit bij opstart.

## Gespecialiseerde Containers vs GenericContainer

Je ziet dat ik zowel `PostgreSQLContainer` als `GenericContainer` heb gebruikt.

Regel van thumb:

* **Gebruik gespecialiseerde containers** als ze bestaan (`PostgreSQLContainer`, `MongoDBContainer`, `KafkaContainer`, …) → handige defaults en shortcuts
* **Gebruik `GenericContainer`** voor alles wat geen module heeft (smtp4dev, Mailpit, custom images)

Denk aan `GenericContainer` als het **Zwitsers zakmes** van Testcontainers. Alles anders bouwt hierop voort.

## Tips uit de praktijk

#### **Containers hergebruiken over tests**

```java
@Container
static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16.3");
```

Maak ze `static` om herstarten per methode te vermijden. Waarom dit belangrijk is:

<p align="center">
    <img src="{{ '/assets/img/static_1.svg' | prepend: site.baseurl }}" alt="Zonder static" style="height: 550px; margin-bottom: -400px; margin-top: -200px">
    <img src="{{ '/assets/img/static_2.svg' | prepend: site.baseurl }}" alt="Met static" style="height: 550px; margin-top: -100px; margin-bottom: -200px">
</p>

#### **Pin image versies**

```java
new PostgreSQLContainer<>("postgres:16-alpine"); // stabiel
new PostgreSQLContainer<>("postgres:latest"); // risicovol
```

#### **Initializers delen** tussen testklassen

```java
@SpringBootTest
@ContextConfiguration(initializers = {
TestDatabaseInitializer.class,
Smtp4devTestContainerInitializer.class
})
class MyIntegrationTest { ... }
```

#### **Maak je geen zorgen om test snelheid**

Ja, Docker-containers nemen een paar seconden om te starten.
Maar met static containers en hergebruik is de opstarttijd minimaal vergeleken met de zekerheid die je krijgt.
Mijn test suite met PostgreSQL en smtp4dev voegt misschien 5–10 seconden toe — de moeite waard.

#### **Check logs bij debuggen**

```java
System.out.println(postgres.getLogs());
```

## Afronden

Testcontainers heeft mijn manier van integratietesten volledig veranderd.

Ik begon met `@Container` en `@DynamicPropertySource` voor eenvoudige gevallen.
Wanneer ik meer controle nodig had, gebruikte ik `ApplicationContextInitializer`.
En bij testen tegen elke Docker image bood `GenericContainer` uitkomst.

Het mooie: ik test altijd **tegen het echte werk**.
Echte databases, echte SMTP-servers, echte API’s, zonder de traditionele ellende van lokaal beheer.

Als je Testcontainers nog niet gebruikt, probeer het dan zeker in je volgende Spring Boot-project.
Je toekomstige zelf (en je team) zal je dankbaar zijn.

Ga nu aan de slag en containerize je tests!

## Bronnen

**Officiële documentatie:**

* [Testcontainers Official Documentation](https://www.testcontainers.org/)
* [Testcontainers for Java](https://java.testcontainers.org/)
* [Spring Boot Testing Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing)

**Docker images gebruikt:**

* [PostgreSQL on Docker Hub](https://hub.docker.com/_/postgres)
* [smtp4dev on GitHub](https://github.com/rnwood/smtp4dev)
* [Mailpit on GitHub](https://github.com/axllent/mailpit)

**Gerelateerde tools:**

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Maven Central - Testcontainers](https://mvnrepository.com/artifact/org.testcontainers)

