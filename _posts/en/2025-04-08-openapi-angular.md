---
layout: post
title:  "OpenAPI in Angular: From Manual Services to Generated Goodness (and a Lot of Refactoring)"
date:   2025-04-08 07:00:00 +0100
image:  "/assets/img/angular-vs-manual.jpg"
tags: [angular, openapi, frontend]
lang: en
---
> "Firmly grasp it in your hand!" - Patrick Star

## The Motivation: From Repetitive Code to a Better Way

We already had OpenAPI set up in the backend. 
So naturally, I asked myself — why am I still writing Angular services by hand?

Creating HTTP services manually was becoming tedious and error-prone. 
Not to mention, every change in the backend required me to double-check if the frontend stayed in sync. 
I wanted something cleaner. 
Smarter. 
More *streamlined*. 
That’s when I decided to bring OpenAPI to the frontend too.

## The Setup: Generating Angular Code with OpenAPI

Enter `openapi-generator-cli`.

Before anything else, you’ll need to have your OpenAPI spec (in my case, `my-openapi.yaml`) available in your frontend project — either committed directly or pulled in through your pipeline. 
This file is the blueprint that tells the generator what to build.

Once that’s in place, I ran:

```bash
npx openapi-generator-cli generate -i my-openapi.yaml -g typescript-angular -o libs/api
```

This generated a fully-typed Angular client based on our backend's OpenAPI definition. 
Clean. 
Structured. 
No more manually writing request/response interfaces or services.

To make it easily reusable, I added this to my `package.json` scripts:

```json
"scripts": {
  "generate-api": "npx openapi-generator-cli generate -i my-openapi.yaml -g typescript-angular -o libs/api"
}
```

So anytime the backend changes, I can just regenerate the frontend with one command. 
No fuss.

## The Configuration: Making It Work with Angular

Next, I had to configure Angular to use the generated code properly.

You’ll need to provide a custom `Configuration` so the generated services know where your API lives:

```ts
{
  provide: Configuration,
  useFactory: (): Configuration => {
    const params: ConfigurationParameters = {
      basePath: environment.baseUrl
    };
    return new Configuration(params);
  }
}
```

Pro tip: Don’t generate inside `src/`. 
I placed everything in a `libs/api` folder to keep things modular and outside the core app.

## The Great Refactor: Painful but Worth It

This is where things got *real*.

I started replacing all our old manually written services with the auto-generated ones. 
It was painful at first — services had different naming, method signatures weren’t exactly the same, and mocking in tests needed updates too.

Example: Before, I used a custom service to fetch attachments. 
Now I just call:

```ts
this.attachmentsService.getAllAttachments()
```

Much cleaner. 
Less boilerplate. 
More consistency.

### Testing Adjustments

Tests needed some love too. 
I replaced a bunch of old `MockProvider` with simpler mocks using the generated interfaces.

Example:

```ts
{
  provide: AttachmentsService,
  useValue: { getAllAttachments: jest.fn() }
}
```

Simple. 
Maintainable. 
And way easier to understand when revisiting tests later.

## Syncing OpenAPI Across Teams

One thing I had to think about was **how to keep the OpenAPI spec in sync** between backend and frontend. 
If you're working in a monorepo — lucky you. 
But if your backend and frontend are in separate repos (like ours), there are a few ways to handle it:

- **Option 1: Commit the OpenAPI YAML directly into the frontend repo.**  
  Simple and works well if the spec doesn't change too often.

- **Option 2: Automate fetching the spec in your CI/CD pipeline.**  
  For example, have a script that pulls the latest `openapi.yaml` from the backend before generating the client.

- **Option 3: Use a shared package or Git submodule.**  
  Slightly more complex but very reusable across multiple frontends.

Whatever you pick, just make sure you’re not manually copying files around. 
That defeats the purpose of automation.

## Gotchas & Gains
Let’s be real — bringing OpenAPI to Angular isn’t *just* plug-and-play. 
There were a few bumps on the road:

- **Casing and naming conventions**  
  The generated models didn’t always match our style. Thankfully, you can tweak this with options like `--additional-properties=modelPropertyNaming=camelCase`.

- **Enum weirdness**  
  Enums behaved a bit unexpectedly — especially when the backend used patterns that didn’t translate neatly to TypeScript.

- **Circular references**  
  These can mess with the generator in complex specs. Keeping the OpenAPI doc clean and well-structured helped.

- **Massive PRs**  
  The initial PR introducing the generated client? Huge. But 90% of it was boilerplate. Reviewers just needed coffee and patience.

Despite the hiccups, it was absolutely worth it. Here’s why:

- ✅ No more duplicating DTOs between frontend and backend
- ✅ Backend changes? Just regenerate — no guesswork
- ✅ Strongly typed services made refactors way safer
- ✅ Test mocks became leaner and easier to write
- ✅ This setup now lives in *every* project I touch

Yes, the refactor took time. 
But it simplified the future. 
I’d do it all over again — and sooner.

## Final Thoughts
Bringing OpenAPI to Angular wasn’t just a technical upgrade — it was a mindset shift.

We talk a lot about automation, DevOps, and building smarter systems.
But this is that same philosophy applied at the code level. 
Why keep writing the same HTTP service over and over when your tools can generate it for you — strongly typed, documented, and ready to go?

By introducing OpenAPI to the frontend, I made Angular feel like a first-class citizen in our API ecosystem. 
I stopped duplicating DTOs, stopped guessing request shapes, and started focusing on the things that actually need a human brain: logic, UX, and problem-solving.

Yes, the refactor was painful. 
Yes, it took time to get the mocks right and the tests stable again. 
But now? 
Future me is thankful.

So if you're staring at yet another service you have to hand-code — maybe that’s the sign. 
Automate what can be automated. 
Let the machines do the boilerplate. 
And use your time for the parts that matter.
