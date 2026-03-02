---
layout: post
title: "Week 1 – 30 Deployments and the Weight of Production"
date: 2026-03-01 08:00:00 +0100
series: "weekly-dev-note"
tags: ["weekly"]
lang: en
---

This week I didn't build new features.
I didn't refactor complex logic.
I deployed.

Around 30 services moved across environments: TA → INT → PROD.

On paper, deployments are semi-automated. Pipelines run, pods spin up, logs appear. But in reality, production work is less about pressing a button and more about discipline.

## It's Never Just "Run the Pipeline"

Each deployment required manual attention:

* Adjusting configuration per environment
* Verifying the correct service version
* Running scripts (sometimes Windows-only, while I'm on macOS)
* Waiting for pods to initialize
* Monitoring logs in Kibana
* Confirming stability before promoting to the next environment

And then repeating the process. Again. And again.

Technically, none of it was extremely complex.
Mentally, it required focus.

## The Real Difficulty: Context Switching

When you're deploying one service, it's manageable.

When you're deploying many services back-to-back, the risk shifts. The challenge becomes cognitive load:

* Is this the correct version?
* Did someone forget to update the tag?
* Is this config aligned with the target environment?
* Am I deploying the right artifact to the right cluster?

Not everyone followed the same conventions. Sometimes versions were missing. Sometimes scripts weren't available for all platforms. That meant extra verification, extra caution, extra attention.

The biggest risk wasn't the tooling.
It was human error.

## Production Changes Your Mindset

Deploying to TA feels routine.
Deploying to INT requires validation.
Deploying to PROD feels different.

In production, mistakes have impact.

You double-check versions.
You re-read configs.
You monitor logs more closely.
You prepare for rollback before you need it.

## What I Learned

This week reinforced a few things:

* Deployment is engineering.
* Consistency in versioning and configuration reduces stress.
* Observability (logs, monitoring) is not optional.
* Context switching increases the probability of mistakes.
* Discipline beats speed in production.

Writing code is creative.
Deploying code is responsibility.

And production doesn't reward cleverness, it rewards precision.
