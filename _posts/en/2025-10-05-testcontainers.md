---
layout: post
title:  "Testcontainers in Spring Boot: From Quick Wins to Power Moves"
date:   2025-10-05 08:00:00 +0100
image:  "/assets/img/spongebob-testcontainers.png"
tags: [java, spring-boot, testing, docker]
lang: en
---
> "Testcontainers is like having SpongeBob at the helm of your CI: cheerful, reliable, and somehow turning chaos into perfection." - Me

As a junior developer, I'm constantly learning new tools and practices.
One lesson from my seniors that really stuck with me was this: _mocking will only take you so far_.
At some point, you need to test against the real thing: a real database, a real message broker, a real service.

That's when I discovered **Testcontainers**, and it completely changed how I write integration tests in Java and Spring Boot.
After experimenting with it and sharing my findings with colleagues, I realized I wanted to capture everything I'd learned in one place.

This post is my attempt to do just that: explaining the why, the how, and the real-world patterns I now use in my projects.

## The Problem I Used to Have
I have to admit.
I used to avoid integration tests whenever I could.
Mocks were my best friends: fast, predictable, and easy to set up.

But as much as I loved them, some things just can't be faked.
A mail server, a real PostgreSQL database, no amount of mocking could truly replicate them.

I quickly ran into the same frustrating scenarios we've all seen: tests that pass on my machine but fail in CI, or teammates spending hours just to get the environment ready to run tests.

For a Spring Boot app that needs PostgreSQL and sends emails, here's how the options stack up:

| Approach                                                    | Pros                                                                                                                          | Cons                                                                                                                                  |
|-------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| **Local Installation**<br/>Install PostgreSQL & SMTP locally | - Tests against real services<br/> - No mocking                                                                               | - Different versions across machines<br/> - "Works on my laptop" syndrome<br/> - Painful CI setup<br/> - Leftover test data pollution |
| **Mock Everything**<br/>Use mock databases & services       | - Fast test execution<br/> - No external dependencies                                                                         | - Not testing real integration<br/> - Mocks drift from reality<br/> - False confidence                                                |
| **Testcontainers**<br/>Real services in Docker              | - Real integration testing<br/> - Consistent across all machines<br/> - Zero installation hassle<br/> - Clean state every run | - Requires Docker<br/> - Slightly slower than mocks                                                                                   |

**Testcontainers** was the game-changer I needed.

## Quick Setup

Before I dive deep, let me get you set up:

**Prerequisites:**
- Java **21+**
- Maven
- Docker Desktop running

**Add the dependencies:**

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
```

## The Standard Approach (Good, But Limited)

Here's what most tutorials show you, and honestly, it's great for simple cases:

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

This is **beautiful** for simple cases. JUnit starts a PostgreSQL container, Spring Boot wires it up via `@DynamicPropertySource`, your test runs against a real database, and the container gets cleaned up afterward.

### What Actually Happens Behind the Scenes?

When you hit "Run Test", here's the magic that unfolds (simplified):

<p align="center">
    <img src="{{ '/assets/img/simplified.svg' | prepend: site.baseurl }}" alt="Behind the scenes (simplified)" style="height: 550px">
</p>

The waiting phase is crucial. 
Testcontainers doesn't just check if the port is open, it waits until the service is actually ready to accept connections. 
This is why your tests "just work" without flaky failures.

But in real projects, I quickly ran into situations where I needed to:

* Start multiple containers that talk to each other
* Preload my database with schema or seed data
* Wait for a REST API to be ready, not just a port
* Test email sending against a fake SMTP server

That's where things get interesting....

## Level Up: ApplicationContextInitializer

When I need more control, Spring Boot gives me a powerful hook:
**`ApplicationContextInitializer<ConfigurableApplicationContext>`**.

This runs **before** your application context starts, letting you:

* Start containers manually with full control
* Configure complex wait strategies
* Inject custom properties into Spring's environment
* Reuse container configurations across multiple test classes

I think of it as the "professional" way to wire up Testcontainers in Spring Boot.

### How the Professional Setup Works

Here's what happens when you use `ApplicationContextInitializer`:

<p align="center">
    <img src="{{ '/assets/img/testcontainers.svg' | prepend: site.baseurl }}" alt="What happens when you use ApplicationContextInitializer" style="height: 550px">
</p>

This gives you complete control over the startup sequence and lets you configure containers exactly how you need them.

### Real-World Example: Testing Email with smtp4dev (or Mailpit)

My app sends emails, and I needed to test that realistically without spamming real inboxes.

**smtp4dev** is a fake SMTP server that catches emails and exposes them via REST API. 
It's been around for years, has a mature codebase, and includes features like relay testing and authentication simulation. 
Perfect for comprehensive email testing scenarios.

**Mailpit** is a modern alternative written in Go, known for its lightweight footprint, faster startup times, and slick UI. 
It also has excellent search capabilities and built-in spam score analysis. 
If you're starting fresh, Mailpit is often the go-to choice in 2025, but smtp4dev remains solid for existing projects.

Both expose REST APIs for programmatic testing, support SMTP authentication, and provide web UIs for manual inspection. 
The main differences:

* **Performance**: Mailpit starts faster and uses less memory (~10-20MB vs ~50-100MB)
* **UI**: Mailpit has a more modern, responsive interface
* **Features**: smtp4dev has more enterprise features (relay, conditional rules); Mailpit focuses on simplicity
* **Docker size**: Mailpit image is smaller (~15MB vs ~200MB)

For most Spring Boot integration tests, either works great. 
I'll show you smtp4dev here, but switching to Mailpit is as simple as changing the image name.

Here's smtp4dev in action:

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

Now in a test:

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

Key things:

* **`withExposedPorts(80, 25)`** exposes the web UI + SMTP port
* **`waitingFor(Wait.forHttp(...))`** waits until the API is really alive
* **`TestPropertyValues`** wires the container config into Spring

Want to use **Mailpit** instead? Here's the equivalent initializer:

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

The key differences:
* Port 8025 for web UI (vs 80 in smtp4dev)
* Port 1025 for SMTP (vs 25)
* API path is `/api/v1/messages` instead of `/api/messages`

Both work identically in your tests. Choose smtp4dev if you need advanced relay features or are already using it. Choose Mailpit if you want faster container startup and a smaller Docker footprint.

### PostgreSQL with Initialization Scripts

Sometimes I don't want an empty database. I want schema + seed data loaded.

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

The trick: **`withCopyFileToContainer`** → place schema in `/docker-entrypoint-initdb.d/`. Postgres runs it automatically on startup.

## Specialized Containers vs GenericContainer

You might have noticed I used both `PostgreSQLContainer` and `GenericContainer`.

Here's the rule of thumb:

* **Use specialized containers** when they exist (`PostgreSQLContainer`, `MongoDBContainer`, `KafkaContainer`, …).
They give you nice defaults and shortcuts.
* **Use `GenericContainer`** when no module exists (smtp4dev, Mailpit, custom APIs, your own Docker images).

Think of `GenericContainer` as the **Swiss Army knife** of Testcontainers.
Everything else is built on top of it.

## Pro Tips from My Experience
#### **Reuse containers across tests**

```java
@Container
static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16.3");
```

Make them `static` to avoid restarting for every method. Here's why this matters:

<p align="center">
    <img src="{{ '/assets/img/static_1.svg' | prepend: site.baseurl }}" alt="Without static" style="height: 550px; margin-bottom: -400px; margin-top: -200px">
    <img src="{{ '/assets/img/static_2.svg' | prepend: site.baseurl }}" alt="With static" style="height: 550px; margin-top: -100px; margin-bottom: -200px">
</p>

#### **Pin image versions**

```java
new PostgreSQLContainer<>("postgres:16-alpine"); // stable
new PostgreSQLContainer<>("postgres:latest"); // risky
```

#### **Share initializers** across test classes

```java
@SpringBootTest
@ContextConfiguration(initializers = {
TestDatabaseInitializer.class,
Smtp4devTestContainerInitializer.class
})
class MyIntegrationTest { ... }
```

#### **Don't worry too much about test speed**
Yes, Docker containers take a few seconds to start. 
But with static containers and proper reuse, I've found the startup cost is negligible compared to the confidence I gain. 
My test suite with PostgreSQL and smtp4dev adds maybe 5-10 seconds total. Well worth it.

#### **Check logs when debugging**

```java
System.out.println(postgres.getLogs());
```

## Wrapping Up
Testcontainers transformed how I think about integration testing.

I started with `@Container` and `@DynamicPropertySource` for simple cases.
When I needed more control, I reached for `ApplicationContextInitializer`.
And when I had to test against any Docker image, `GenericContainer` had my back.

The beauty is that I'm always testing against **the real thing**.
Real databases, real SMTP servers, real APIs and this without any of the traditional headaches of managing those services locally.

If you're not using Testcontainers yet, I encourage you to give it a try on your next Spring Boot project.
Your future self (and your teammates) will thank you.

Now go forth and containerize those tests 

## Resources
**Official Documentation:**
- [Testcontainers Official Documentation](https://www.testcontainers.org/)
- [Testcontainers for Java](https://java.testcontainers.org/)
- [Spring Boot Testing Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing)

**Docker Images Used:**
- [PostgreSQL on Docker Hub](https://hub.docker.com/_/postgres)
- [smtp4dev on GitHub](https://github.com/rnwood/smtp4dev)
- [Mailpit on GitHub](https://github.com/axllent/mailpit)

**Related Tools:**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Maven Central - Testcontainers](https://mvnrepository.com/artifact/org.testcontainers)
