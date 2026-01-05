---
layout: post
title:  "Kubernetes + Java = ❤️: What I Learned About Cloud-Native Java at KubeCon"
date:   2025-04-02 22:30:00 +0100
image:  "/assets/img/java-and-quarkus.jpg"
tags: [java, kubernetes, cloud-native]
lang: en
---
> "The Krusty Krab pizza is the pizza for you and me!" - Spongebob SquarePants

_What does a Java developer have to do with Kubernetes?_ 
A lot more than you'd think. At KubeCon 2025, I attended a talk titled **"From 0 To Production-Grade With Kubernetes Native Development"** by [Thomas Vitale](https://thomasvitale.com) and [Kevin Dubois](https://kevindubois.com) that completely clicked with me.

This session wasn’t just about deploying an app—it was about making the Java dev experience in Kubernetes feel smooth, natural, and dare I say… enjoyable? 
I want to share how the talk flowed and how each concept landed for me as a developer trying to make sense of this cloud-native world.

## From Source to Container with Cloud Native Buildpacks
The session started with one of my favorite tools: **Cloud Native Buildpacks**. Instead of writing a Dockerfile, you let Buildpacks do the heavy lifting of turning source code into container images. 
The idea of reproducible builds really resonated with me—no more "works on my machine" moments because of subtle differences in container setups.

Just running something like:
```bash
mvn package
pack build my-java-app --builder paketobuildpacks/builder:base
```
and you’ve got a container image that’s production-ready. That simplicity is gold.

## Building Locally with Podman Desktop + Kind
The next move was running everything locally using **Podman Desktop** and **Kind (Kubernetes IN Docker)**. 
What blew me away was that they did it all from the UI. 
It made Kubernetes feel a lot more accessible. 
No YAMLs, no CLI acrobatics—just click and go.

I’ve always stayed away from running Kubernetes clusters locally—it just felt like too much setup for too little gain.
But seeing how Podman Desktop and Kind work together so seamlessly made me think twice. 
It showed that with the right tools, a full Kubernetes dev environment on your laptop is actually doable.

## Making Apps Production-Ready with Probes
They hit a classic gotcha: your app can be running, but not ready to handle traffic. 
A demo with Quarkus showed how the app technically started, but services like Kafka, DB, and cache weren’t up yet—causing 2.6 seconds of downtime.

That’s where readiness, liveness, and startup probes come in. 
Adding these tells Kubernetes exactly when your app is good to go:

```yaml
readinessProbe:
  httpGet:
    path: /q/health/ready
    port: 8080
  initialDelaySeconds: 5

livenessProbe:
  httpGet:
    path: /q/health/live
    port: 8080
  initialDelaySeconds: 5
```

This hit close to home. 
I’ve definitely shipped apps that technically “worked” but broke under orchestration.

## Quarkus: Kubernetes-Native by Default
Quarkus stole the spotlight when it came to Kubernetes integration. 
From generating `kubernetes.yaml` files to health endpoints, secrets, and config—everything just clicked. 
I appreciated how much boilerplate was eliminated.

Even the deployment step was as simple as:
```bash
./mvnw clean install -Dquarkus.kubernetes.deploy=true
```
It made me want to explore how far I can go without ever writing YAML manually.

## Java in a Serverless World with Knative
When Knative came up, I had a lightbulb moment. 
Serverless isn’t limited to Node.js functions. 
With Knative, your Quarkus or Spring Boot app can scale to zero and only spin up when needed. 
That’s resource-saving magic.

This is one of the areas I haven’t played with much, but seeing it live made me curious. 
Could my side projects live like this?

## Realistic Local Testing with Testcontainers
As a Java dev who writes a lot of tests, I’ve been a big fan of Testcontainers for a while—especially when I need to spin up real dependencies for integration testing. 
So it was awesome to see it being used here too, running things like Kafka and PostgreSQL even inside a Kind cluster.

It’s always validating (and honestly cool) to see a tool you already love being used in production-grade setups. 
This approach really closes the gap between “it runs on my machine” and “it runs in prod.”

## Observability That Just Works with OpenTelemetry
You can’t fix what you can’t see. That’s where **OpenTelemetry** came in. 
They instrumented the app to export traces and metrics, helping pinpoint issues in real-time.
Whether it’s performance bottlenecks or unexpected behavior, this level of observability is game-changing.

Definitely something I want to plug into Grafana or Jaeger soon.

## Service Binding: Cleaner Wiring Between Apps
They also walked through **Service Bindings**—a way to declaratively connect your app to services like Kafka or PostgreSQL without hardcoded configs. 
This felt especially useful in enterprise setups where secret and config sprawl is real.

Here’s what a binding might look like:
```yaml
apiVersion: binding.operators.coreos.com/v1alpha1
kind: ServiceBinding
metadata:
  name: my-binding
spec:
  application:
    name: my-app
    group: apps
    version: v1
    resource: deployments
  services:
    - group: mygroup
      version: v1
      kind: Kafka
      name: my-kafka
```

## Conclusion: Java ❤️ Kubernetes
This session was packed but never overwhelming. 
It painted a full picture—starting with local development and ending with production-readiness. 
It made cloud-native Java feel a lot less daunting and a lot more exciting.

What stood out wasn’t just the tools—it was the developer experience. 
Everything felt smoother, more integrated, and honestly, more fun. I left inspired to try Buildpacks, finally use probes correctly, and rebuild one of my own apps with Knative and OpenTelemetry baked in from the start.

Big shoutout to **Thomas** and **Kevin** for making Kubernetes feel like home for Java devs.

Stay tuned for more experiments—and maybe a follow-up post once I break (and hopefully fix) everything myself.
