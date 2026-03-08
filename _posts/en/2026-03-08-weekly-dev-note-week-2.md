---
layout: post
title: "Week 2 – Starting From Scratch"
date: 2026-03-08 08:00:00 +0100
series: "weekly-dev-note"
tags: ["weekly"]
lang: en
---

This week I built something from zero.

Not a feature on top of an existing codebase.
Not a fix in a service that already had a shape.
A new repository. A new service. A blank slate.

In a client context, that almost never happens.

## The Usual Reality

Most of the time, the repository already exists.
The architecture is already decided.
You inherit conventions, structure, and history.

Your job is to understand it, fit into it, and build forward.

That's fine. But it means you rarely have to ask: *where do we even start?*

This week, I had to answer that question.

## A New Architecture: Boundary-Driven Development

I've always worked with a layered structure: adapters, domain, use cases.

This project uses a different approach, **boundary-driven development**.

The boundaries are defined by the OpenAPI spec. Everything is organized around what's exposed, not around internal domain logic. 
The database lives in a separate repository, so I built adapters to connect to it without coupling the services.

No existing pattern to copy. Just reasoning through it from scratch.

## What "Free Play" Actually Means

Starting fresh sounds like freedom. And it is, but it's a different kind of pressure.

When you extend an existing service, the decisions are mostly made.
When you start from zero, every decision is yours.

Structure, naming, how adapters connect, what goes where.

That freedom is exciting. It's also a reminder that conventions exist for a reason and that building them from scratch takes thought.

## What I Learned

* New architecture means unlearning before relearning.
* Starting from scratch in a client context is rare. Treat it as a learning opportunity.
* The database living in a separate repo makes boundaries explicit and honest.

Writing code is familiar.
Designing the shape of a service from nothing is a different skill.

This week, I practiced that.
