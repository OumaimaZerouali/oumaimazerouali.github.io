---
layout: post
title: "It's really that easy: Building AI Chatbots with Java"
date: 2026-02-25 14:00:00 +0100
image:  "/assets/img/its-really-that-easy.png"
tags: [java, ai, chatbot, spring-ai]
lang: en
---

A few weeks ago, Gabriel and I gave a talk with a deliberately provocative premise:

**Java developers don’t need to learn Python to build serious AI applications.**

The title of the talk was simple:

> *It’s Really That Easy: Building AI Chatbots with Java.*

This post is a recap of what we built, how we built it, and why the Java ecosystem is far more AI-ready than many people assume.

## The Problem We Wanted to Solve

Spend five minutes searching for “build a chatbot” and you’ll see the pattern:

* Python
* FastAPI
* LangChain
* More Python

Python deserves its popularity. But what about the millions of developers running production systems on Spring Boot?

If you already maintain mature Java services, clean architecture boundaries, and established CI/CD pipelines.
Why should you start experimenting with LLMs, that will require introducing an entirely new language stack?

That question became the seed of the project.

We didn’t want slides full of theory.
We wanted live demos. Running code. Real architecture.

And we wanted everything inside the Java ecosystem.

## What We Built

We ended up shipping a full-stack AI chatbot platform:

* **Backend:** Spring Boot 3.5 + Java 21
* **Frontend:** React 19 + TypeScript + Tailwind CSS
* **AI Layer:** Spring AI
* **Vector DB:** Qdrant
* **Local Models:** Ollama

On top of that foundation, we built multiple AI-driven features.

But what made the talk work wasn’t just *what* we built.

It was *how* we revealed it.

## How We Structured the Presentation

Our slides weren’t PowerPoint.

They were a small React application. Each slide was just a React component. That gave us:

* Full design control
* Embedded code snippets
* Seamless switching between slides and live demos
* No context switching between “presentation mode” and “application mode”

More importantly, we structured the entire talk around **three progressive steps**:

1. **Make It Talk**
2. **Make It Smart**
3. **Make It Powerful**

Each step added one new capability.
Each step reduced fear.
Each step reinforced the same message:

You’re still writing Java.
You’re still using Spring.
You’re still applying the same architectural principles.

AI is just another adapter.

# Step 1 — Make It Talk

We started simple.

No vector databases.
No tool calling.
No RAG.

Just:

* A system prompt
* Conversation memory
* A call to the chat client

That’s how we introduced two features.

## The Duck Debugger

A sarcastic rubber duck.
A senior developer persona trapped in debugging mode.

It includes:

* A 30-message conversation window
* Socratic questioning
* Just enough snark to make you rethink your assumptions

The entire personality lives inside the system prompt.

No rule engine.
No branching logic.

Just carefully designed instructions.

It’s a powerful reminder of how much leverage prompt engineering gives you.

## Test Genie

Test Genie takes a Java method and generates:

* JUnit 5 tests
* AssertJ assertions
* Given–When–Then naming

It even validates that you passed Java code, not Python, not JavaScript, before generating anything.

Writing tests isn’t intellectually hard.

But it consumes disproportionate mental energy.

Let the model generate the boilerplate.
Keep your focus for the edge cases.

## Spring AI in Practice

What surprised me most about Spring AI is how little ceremony it requires.

If you’ve used WebClient, this feels familiar:

```java
ChatClient.create(chatModel)
    .prompt()
    .advisors(new MessageChatMemoryAdvisor(chatMemory))
    .system(DUCK_SYSTEM_PROMPT)
    .user(request.requestMessage())
    .call()
    .content();
```

Conversation memory? An advisor.
Personality? A system prompt.
Response? A fluent API call.

That’s it.
And at this point in the talk, people already realized:
This isn’t complicated.

# Step 2 — Make It Smart

Once the audience understood prompting, we introduced knowledge.

This is where **Retrieval-Augmented Generation (RAG)** came in.

We built a feature called the **Bot Factory**.

It allows you to:

* Define a personality
* Define a purpose
* Add restrictions
* Upload documents (PDF, TXT, DOCX)

Under the hood:

1. Documents are chunked using Spring AI’s `TokenTextSplitter`
2. Each chunk is embedded via Ollama
3. Embeddings are stored in a dedicated collection in Qdrant
4. User queries are embedded
5. Similar chunks are retrieved
6. Context is injected into the prompt

Each bot gets its own isolated vector collection.

An HR policy bot.
A technical documentation bot.
A creative assistant.

No knowledge leakage.

The key teaching moment:

> You don’t retrain the model.
> You augment it.

And with Spring AI, it’s surprisingly little code.

# Step 3 — Make It Powerful

The final step was moving from *talking* to *doing*.

This is where the **Model Context Protocol (MCP)** becomes powerful.

With Spring AI, you can annotate a normal Spring service method as a tool.

No manual JSON parsing.
No glue code.

Just:

Expose a method → annotate it → the model can call it.

We demonstrated this with an appointment booking assistant for a fictional car service center.

The chatbot:

* Extracts license plate
* Extracts date
* Calls the annotated service method
* Persists the appointment

At that moment, the chatbot stopped being a demo.

It became application functionality.

And architecturally?

It still fits clean boundaries.


## Clean Architecture Still Applies

The backend follows strict layers:

* **Domain** — business entities
* **Usecase** — application logic
* **Adapter** — controllers, repositories, integrations

Dependencies flow inward only.

The LLM integration sits at the edge.

AI does not invade your domain.

It’s an implementation detail.

# Bonus — Make It Speak

We ended the talk with voice.

Speech → LLM → Speech.

Record audio in the browser.
Transcribe.
Process with the model.
Generate spoken output.
Stream it back.

We even connected it to the Duck Debugger.

Describing your bug out loud and receiving a sarcastic spoken response back is a chaotic but highly educational experience.
And once people hear the system respond in a voice, everything suddenly feels real.

## What I Took Away

The barrier to entry for LLM-powered applications is genuinely low.

The difficult problems are not:

* How do I call the model?
* How do I wire embeddings?

Frameworks like Spring AI handle that.

The real challenges are:

* Designing useful personalities
* Choosing good chunking strategies
* Preventing hallucinations
* Designing natural conversational flows

Those are product problems.
Not language problems.

## Final Thought

If you’re a Java developer waiting on the sidelines because “AI is a Python thing”:

It isn’t.

Your stack is ready.
Your ecosystem has the tools.
Your architecture patterns still apply.

So yes.

It really is that easy.
