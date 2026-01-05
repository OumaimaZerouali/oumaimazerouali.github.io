---
layout: post
title:  "Spring Boot vs. Quarkus: Which One Should You Use?"
date:   2025-02-09 20:25:00 +0100
image:  "/assets/img/quarkus-vs-springboot.jpg"
tags: [java, spring-boot, quarkus]
lang: en
---
>"It took us three days to make that potato salad... three days!" - Spongebob SquarePants

_Spring Boot or Quarkus?_ 

The age-old question for Java developers building microservices. 
We know Quarkus is fast, and Spring Boot is mature, but which one is actually more enjoyable to work with? 
Which one feels less like a chore and more like a joy? 
To find out, I put both frameworks to the test, building the same application. 
A simple CRUD API, *Spongebob* themed with the same frontend. 
This blog post is aimed at Java developers who are interested in learning more about Spring Boot and Quarkus.

This isn't another benchmark-driven comparison; it's a deep dive into the developer experience. 
Let's explore which framework feels better and why.

## Project Setup and Initial Impressions
This section details the initial steps of creating a new project in both Spring Boot and Quarkus, focusing on the ease of the setup, project structure and overall first impressions.

### Spring Boot

* **Project Creation:**

I opted to use IntelliJ IDEA to generate a new Spring Boot project.
The process was familiar and comfortable.
After entering the project name, and java version, I was presented with a dependency selection screen.
The whole process, from initial setup to running the application, took about 3 minutes.
It felt like coming home, a familiar and well-trodden path.
* **Dependency Management:**

Spring Boot leverages Maven for dependency management, a system I've grown accustomed to.
Adding dependencies is as simple as modifying the **pom.xml** file.
What's particularly convenient is IntelliJ's ability to suggest dependencies based on the annotations I use in my code.
It's a subtle but helpful feature that streamlines the development process.

The Spring Boot Starters are real time-saver. 
For instance, adding **spring-boot-starter-web** automatically pulled in all the necessary dependencies for building REST API's.
It felt like having a pre-packaged toolkit, ready to use.
* **Project Structure:**

The initial project structure is well-organized and predictable, with separate directories for source code (**src/main/java**), resources (**src/main/resources**), and configuration files. 
The **src/main/java** directory adheres to a standard package structure, making it easy to locate and organize my code. 
It's a structure that promotes clarity and maintainability.

* **First Run:**

Running the application was straightforward: a simple mvn spring-boot:run command from the command line. 
Spring Boot spun up the embedded Tomcat server and had the application listening on port 8080 in about 5 seconds. 
While not instantaneous, it was quick enough to maintain a good development flow.

Overall, my initial impression of Spring Boot was positive, largely due to my familiarity with the framework. 
It felt very "homey" and "cozy," as you put it. 
The combination of IntelliJ IDEA's project generation wizard, Maven's dependency management, and Spring Boot Starters made the initial setup process relatively painless. 
It's a framework that feels mature, well-established, and easy to get started with, especially if you're already familiar with the Spring ecosystem.

## Quarkus
* **Project Creation:**

Similar to Spring Boot, I used IntelliJ IDEA to generate a new Quarkus project. 
The process was comparable, requiring me to enter the project name, Java version, and select dependencies (or, in Quarkus terminology, "extensions"). 
The project was up and running in about 2 minutes, slightly faster than Spring Boot.

* **Extension Management:**

Quarkus utilizes extensions to add functionality to the application, a concept similar to Spring Boot Starters. 
Adding extensions can be done through the Quarkus CLI or by directly adding dependencies to the **pom.xml** file. 
The dependencies were relatively easy to find in the documentation. 
It felt like a more streamlined approach to dependency management, focusing on essential components.

* **Project Structure:**

The initial project structure mirrored Spring Boot's, with separate directories for source code, resources, and configuration files. 
Notably, Quarkus also includes a **src/test/java** directory by default, encouraging a test-driven development approach from the outset.

* **First Run:**

Running the application in development mode was as simple as executing quarkus dev from the command line. 
Quarkus spun up the application and enabled hot reloading in a blazing-fast 1 second. 
This rapid startup time was immediately noticeable and created a sense of responsiveness.


Quarkus impressed me with its incredibly fast startup time and the inclusion of a developer dashboard. 
The dashboard provided easy access to information about the application, its configuration, and available extensions.
While the framework didn't feel quite as immediately intuitive as Spring Boot, it still felt like a cool and modern framework. 
The noticeably faster startup time definitely contributed to a more responsive and enjoyable development experience.

## Development Workflow and Hot Reloading
This section explores the development workflow in Spring Boot and Quarkus, with a particular focus on the speed and reliability of hot reloading – a crucial aspect of developer productivity. 
It's about how each framework gets out of your way (or doesn't) while you're actively coding.

### Spring Boot
* **Typical Workflow:**

My typical workflow with Spring Boot involved writing code in IntelliJ IDEA, saving the changes, and then... waiting. 
To see those changes reflected, I'd typically restart the application. 
This manual restart process became a familiar, albeit somewhat tedious, part of my development cycle.

* **Hot Reloading (Devtools):**

Confession time: I never actually used Spring Boot's Devtools for hot reloading in this project. 
I realized that it requires adding a specific dependency, and since it wasn't part of the default project setup, I simply didn't explore it. 

In retrospect, this might have impacted my overall experience, but it also reflects a common scenario: developers sometimes stick to what they know and don't always explore every feature. 
The lack of automatic reloading significantly slowed down my development process in Spring Boot, as I had to manually restart the application every time I made a change.

* **Debugging:**

Debugging Spring Boot applications in IntelliJ IDEA was straightforward and reliable. 
Setting breakpoints, stepping through the code, and inspecting variables felt intuitive and familiar. 
The debugging tools themselves were excellent and provided a solid foundation for troubleshooting issues.


The development workflow in Spring Boot, without hot reloading, felt generally productive but also somewhat disruptive. 
The need for manual restarts, while not a major obstacle, did break my flow and added a layer of friction to the development process. 
The excellent debugging tools were a definite plus, but the overall process felt a bit heavier and less responsive compared to my experience with Quarkus.

### Quarkus
* **Typical Workflow:**

My typical workflow with Quarkus was significantly different. 
I'd write code in IntelliJ IDEA, save the changes, and then simply refresh the browser to see the updated results. 
Quarkus's dev mode automatically detected the changes and reloaded the application, creating a much more fluid and responsive development experience.

* **Hot Reloading (Dev Mode):**

Quarkus's dev mode provided incredibly fast hot reloading. 
Changes to the codebase were typically reflected in the running application within milliseconds – almost instantaneously. 
This was a game-changer. 
Quarkus's hot reloading was also remarkably reliable. Even changes to application properties or more complex code modifications were typically picked up without requiring a full restart. 
It felt like working with a dynamic language, where changes are immediately visible.

* **Debugging:**

Debugging Quarkus applications in IntelliJ IDEA was similar to Spring Boot. 
I could set breakpoints, step through the code, and inspect variables with ease. 
The debugging experience was comparable to Spring Boot, providing a solid foundation for troubleshooting.


The development workflow in Quarkus felt incredibly fast, responsive, and enjoyable. 
The hot reloading was so quick and reliable that it almost disappeared into the background, allowing me to focus on the code itself. 
The debugging tools were also excellent, making the overall process feel significantly more streamlined and productive than my experience with Spring Boot (without hot reloading).

## Configuration and Dependency Injection
This section examines the configuration mechanisms and dependency injection approaches in Spring Boot and Quarkus, focusing on ease of use, flexibility, and overall developer experience. 
It's about how each framework helps you manage the complexity of your application's settings and dependencies.

### Spring Boot
* **Configuration:**

I primarily used application.properties to configure my Spring Boot application. 
I found it straightforward to set properties for the database connection, server port, and other application settings. 
The properties themselves are quite self-explanatory, which made the configuration process relatively painless.

```yaml
spring.application.name=spongebob-meets-springboot

spring.datasource.url=jdbc:postgresql://localhost:5432/spongebob_db
spring.datasource.username=spongebob_user
spring.datasource.password=secret
spring.datasource.driver-class-name=org.postgresql.Driver

spring.web.cors.allowed-origins=http://localhost:4200
spring.web.cors.allowed-methods=GET,PUT,POST,DELETE,PATCH,OPTIONS
spring.web.cors.allowed-headers=Accept,Authorization,Content-Type,Origin
spring.web.cors.exposed-headers=Authorization,Content-Disposition
spring.web.cors.max-age=86400 # 24 hours in seconds
```

As you can see, the configuration is fairly declarative and easy to understand at a glance.

* **Dependency Injection:**

I'm a firm believer in constructor injection, and that's the approach I used in Spring Boot. 
It's the recommended practice by many, including the Spring Boot team, for good reason. 
Constructor injection promotes immutability, testability, and clear dependency declaration. 
If you're curious about the benefits, I highly recommend this article: https://medium.com/devdomain/spring-boots-autowired-vs-constructor-injection-a-detailed-guide-1b19970d828e

Fortunately, this small project didn't present any challenges with circular dependencies. 
Defining everything in the constructor made it easy to manage the dependencies and ensure a clean and well-defined component graph.


Configuration and dependency injection in Spring Boot felt well-established, mature, and reliable. 
The combination of **application.properties** and constructor injection provided a solid foundation for managing the application's settings and dependencies. 
It's a system that feels robust and predictable.

### Quarkus
* **Configuration:**

I primarily used application.properties to configure my Quarkus application, mirroring my approach in Spring Boot. 
The configuration process felt very familiar, and the properties themselves were remarkably similar, making the transition between frameworks seamless.

```yaml
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=spongebob_user
quarkus.datasource.password=secret
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/spongebob_db

quarkus.http.cors=true
quarkus.http.cors.origins=http://localhost:4200
quarkus.http.cors.methods=GET,PUT,POST,DELETE,PATCH,OPTIONS
quarkus.http.cors.headers=Accept,Authorization,Content-Type,Origin
quarkus.http.cors.exposed-headers=Authorization,Content-Disposition
quarkus.http.cors.max-age=24H
```

The similarity in configuration properties made it incredibly easy to switch between the two frameworks. 
It felt like I was working with a familiar language, regardless of the underlying framework.

* **Dependency Injection:**

Now, here's where things get interesting. 
Despite my strong advocacy for constructor injection, I found myself gravitating towards @Inject in Quarkus. 
I can't fully explain why, but it simply felt more natural and efficient in this context. 
The @Inject annotation felt more lightweight and less verbose than @Autowired in Spring Boot.


Configuration and dependency injection in Quarkus felt very similar to Spring Boot, but with a subtle sense of simplicity and streamlining. 
The @Inject annotation, while functionally equivalent to @Autowired, contributed to a more lightweight and modern feel. 
The configuration process was familiar and straightforward, making the transition from Spring Boot almost effortless.

## Building REST APIs
This section compares the process of building REST APIs in Spring Boot and Quarkus, focusing on the ease of defining endpoints, handling requests, and managing responses. 
It's about how each framework empowers you to create well-structured and functional APIs.

### Spring Boot
* **Endpoint Definition:**

In Spring Boot, I used @RestController to designate my class as a REST controller and then employed annotations like @GetMapping, @PostMapping, @PutMapping, and @DeleteMapping to map HTTP methods to specific handler methods. 
This is a very common and well-established approach, and it's relatively easy to grasp, especially for those familiar with Spring's annotation-based configuration.

```java
@RestController
@RequestMapping("/characters")
@RequiredArgsConstructor
public class CharacterController {
private final GetCharacterByIdUseCase getCharacterByIdUseCase;
private final DeleteCharacterByIdUseCase deleteCharacterByIdUseCase;
private final CreateOrUpdateCharacterUseCase createOrUpdateCharacterUseCase;

    @GetMapping("/{id}")
    public ResponseEntity<Character> getCharacterById(@PathVariable String id) {
        return getCharacterByIdUseCase.execute(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Void> createOrUpdate(@RequestBody Character character) {
        createOrUpdateCharacterUseCase.execute(character);
        return ResponseEntity.status(201).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacter(@PathVariable String id) {
        deleteCharacterByIdUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}
```

As you can see, the code is fairly readable and the intent is clear. 
The annotations provide a concise way to define the API endpoints and their corresponding HTTP methods.

* **Request Handling:**

For request handling, I primarily used @PathVariable to extract path parameters and @RequestBody to access the request body. 
Given the simplicity of this API, these two annotations were sufficient for my needs.

* **Response Handling:**

To manage responses, I relied on ResponseEntity to set the appropriate HTTP status codes based on the outcome of each request. 
Since I didn't need to implement any complex content negotiation, ResponseEntity provided the necessary flexibility and control.


Building REST APIs in Spring Boot felt generally intuitive and efficient. 
The annotations made it easy to define endpoints and handle requests, and the ResponseEntity class provided a flexible way to construct responses. 
The overall experience felt familiar and comfortable, thanks to Spring Boot's well-established conventions and comprehensive documentation.

### Quarkus
* **Endpoint Definition:**

Quarkus takes a slightly different approach to defining REST controllers, leveraging JAX-RS annotations. 
Instead of @RestController, you define the base path using @Path at the class level, and then specify the HTTP methods and more specific paths at the method level using annotations like @GET, @DELETE, and @POST.

```java
@Path("/characters")
public class CharacterController {

    @Inject
    GetCharacterByIdUseCase getCharacterByIdUseCase;
    @Inject
    DeleteCharacterByIdUseCase deleteCharacterByIdUseCase;
    @Inject
    CreateOrUpdateCharacterUseCase createOrUpdateCharacterUseCase;

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Character getCharacterById(@PathParam("id") String id) {
        return getCharacterByIdUseCase.execute(id)
                .orElseThrow(NotFoundException::new);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createOrUpdate(Character character) {
        createOrUpdateCharacterUseCase.execute(character);
        return Response.status(Response.Status.CREATED).build();
    }

    @DELETE
    @Path("{id}")
    public void deleteCharacter(@PathParam("id") String id) {
        deleteCharacterByIdUseCase.execute(id);
    }
}
```

I found this approach to be equally easy to use, and it provided a slightly more concise overview of the API endpoints within each controller. 
The use of Jakarta annotations felt clean and standardized.

* **Request Handling:**

For request handling, I used @PathParam to extract path parameters, which felt very similar to @PathVariable in Spring Boot. 
Given the simplicity of the API, this was sufficient for my needs.

* **Response Handling:**

To manage responses, I used @Produces to specify the content type of the response and relied on exceptions to handle error conditions. 
This approach felt slightly more streamlined than using ResponseEntity in Spring Boot, as it allowed me to focus on the core logic of the API without getting bogged down in response construction.


Building REST APIs in Quarkus felt very similar to Spring Boot, but with a slightly more streamlined and modern feel. 
The JAX-RS annotations were easy to use and understand, and the exception-based error handling felt clean and efficient. 
The overall process felt lightweight and focused.

## Testing
Testing is a crucial part of building reliable applications, and both Spring Boot and Quarkus provide excellent support for writing unit tests and integration tests. 
This section compares the testing capabilities of Spring Boot and Quarkus, focusing on the ease of writing unit tests and integration tests. 
It's about how each framework helps you ensure the quality and reliability of your application.

### Spring Boot
* **Unit Testing:**

For unit testing in Spring Boot, I used JUnit 5 and Mockito. 
The process was relatively straightforward. 
I used Mockito to mock the dependencies of the **DeleteCharacterByIdUseCase** and then verified that the **deleteCharacter** method on the **CharacterRepository** was called with the correct ID.

```java
@ExtendWith(MockitoExtension.class)
public class DeleteCharacterByIdUseCaseTest {

    @Mock
    private CharacterRepository characterRepository;

    @InjectMocks
    private DeleteCharacterByIdUseCase deleteCharacterByIdUseCase;

    @Test
    public void givenCharacterId_whenExecute_thenDeleteCharacter() {
        String characterId = "character-id";

        deleteCharacterByIdUseCase.execute(characterId);

        verify(characterRepository).deleteCharacter(characterId);
    }
}
```

Setting up the testing environment and writing basic unit tests was relatively easy, thanks to Spring Boot's excellent integration with JUnit and Mockito.

* **Integration Testing:**

For integration testing, I used Spring Test and MockMvc to test the CharacterController. 
This allowed me to simulate HTTP requests and verify that the controller returned the correct responses.
I used @SpringBootTest and @AutoConfigureMockMvc to set up the testing environment and @MockBean to mock the use cases.

```java
@SpringBootTest
@AutoConfigureMockMvc
class CharacterControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DeleteCharacterByIdUseCase deleteCharacterByIdUseCase;

    @Nested
    class DeleteCharacter {
        @Test
        void givenCharacterId_whenDeleteCharacter_thenShouldDeleteCharacter() throws Exception {
            String characterId = "b3158f8e-5e10-4e94-aaf2-3049e7a5e6a3";

            doNothing().when(deleteCharacterByIdUseCase).execute(characterId);

            mockMvc.perform(MockMvcRequestBuilders.delete("/characters/{id}", characterId))
                    .andExpect(MockMvcResultMatchers.status().isNoContent());

            Mockito.verify(deleteCharacterByIdUseCase).execute(characterId);
        }
    }
}
```

This approach allowed me to test the entire flow of the application, from the controller to the use cases, without actually hitting the database.


Testing in Spring Boot felt well-supported and relatively easy to use. 
The Spring Test framework provided a comprehensive set of tools for writing unit tests and integration tests, and the documentation was excellent. 
The ability to mock dependencies and simulate HTTP requests made it easy to test different scenarios and ensure the quality of the application.

### Quarkus
* **Unit Testing:**

The unit testing experience in Quarkus was very similar to Spring Boot. 
I used JUnit 5 and Mockito to write unit tests for the use cases. The process felt familiar and straightforward.

```java
@ExtendWith(MockitoExtension.class)
public class DeleteCharacterByIdUseCaseTest {

    @Mock
    private CharacterRepository characterRepository;

    @InjectMocks
    private DeleteCharacterByIdUseCase deleteCharacterByIdUseCase;

    @Test
    public void givenCharacterId_whenExecute_thenDeleteCharacter() {
        String characterId = "character-id";

        deleteCharacterByIdUseCase.execute(characterId);

        verify(characterRepository).deleteCharacter(characterId);
    }
}
```

Integration Testing:

For integration testing in Quarkus, I used REST Assured to test the REST endpoints. 
This allowed me to send HTTP requests to the application and verify that the responses were correct. 
The @QuarkusTest annotation automatically set up the testing environment and injected the necessary dependencies.

```java
@QuarkusTest
class CharacterControllerTest {
@InjectMock
DeleteCharacterByIdUseCase deleteCharacterByIdUseCase;

    @Nested
    class DeleteCharacter {
        @Test
        public void givenCharacterId_whenDeleteCharacter_thenShouldDeleteCharacter() {
            String characterId = "b3158f8e-5e10-4e94-aaf2-3049e7a5e6a3";

            doNothing().when(deleteCharacterByIdUseCase).execute(characterId);

            given().when()
                    .delete("/characters/{id}", characterId)
                    .then()
                    .statusCode(Response.Status.NO_CONTENT.getStatusCode());

            Mockito.verify(deleteCharacterByIdUseCase).execute(characterId);
        }
    }
}
```

REST Assured provided a fluent API for writing integration tests, making it easy to define the request and assert the response.


Testing in Quarkus felt streamlined and efficient. 
The combination of JUnit 5, Mockito, and REST Assured provided a solid foundation for writing unit tests and integration tests. 
The testing process felt fast and responsive, thanks to Quarkus's fast startup time.

## Conclusion
After building the same application with both Spring Boot and Quarkus, I'm struck by how similar the overall development experience was, at least for a project of this scale. 
Both frameworks provided a solid foundation for building REST APIs, with intuitive configuration options, straightforward dependency injection, and excellent testing support.

Spring Boot felt familiar and comfortable, like an old friend. 
Its mature ecosystem, comprehensive documentation, and wide range of features made it easy to get started and build a functional application. 
Quarkus, on the other hand, felt more modern and streamlined, with its incredibly fast startup time, hot reloading, and developer-friendly dashboard.

_Interestingly, I didn't encounter any major pain points or "gotchas" that significantly hindered my development process with either framework. 
Both Spring Boot and Quarkus proved to be relatively smooth and straightforward to work with, at least for this particular project._

Ultimately, my experience suggests that for smaller projects, Spring Boot and Quarkus are surprisingly interchangeable. 
The core concepts and development workflows are similar enough that switching between the two frameworks is relatively easy. 
However, I suspect that the differences between Spring Boot and Quarkus would become more pronounced in larger, more complex applications. 
With more intricate configurations, more dependencies, and more demanding performance requirements, one framework might prove to be a better fit than the other.

In my case, both frameworks proved to be excellent tools for the job. 
They each offered a unique blend of features and benefits, and I wouldn't hesitate to use either one for future projects. 
The key takeaway is that the best framework depends on the specific context and the developer's individual preferences. 
There's no one-size-fits-all answer, and the best way to find out which framework works best for you is to try them both and see for yourself.
