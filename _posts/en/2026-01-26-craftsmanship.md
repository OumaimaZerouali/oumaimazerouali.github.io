---
layout: post
title: "The Training I Didn't Understand (Until I Did)"
date: 2026-01-26 14:00:00 +0100
image:  "/assets/img/software_craftsmanship.jpg"
tags: [craftsmanship, training, learning, developer, growth]
lang: en
---

Three years ago, on my very first weeks as a developer, I sat in a room listening to Maarten and Bjorn talk about software craftsmanship.

Clean Code. SOLID. TDD. Feedback loops. Katas. Ethics. Professionalism.

It sounded impressive. It also sounded like… noise.

I had just left school. I had barely written tests. I was still proud when my code simply compiled. And here someone was explaining how software development was an *ethical profession* and why naming was one of the hardest problems in computer science.

I remember leaving that training thinking:

> "This is interesting… but I honestly have no idea what just happened."

A lot went over my head.

And if I'm being completely honest, part of that training didn't just go over my head, it completely overwhelmed me.

We were doing strict mob programming.

For the first time in my life, I had to program in front of a group of experienced developers, with all the attention on me. My hands were shaking, my mind went blank, and I was no longer thinking about design or clean code.

I was thinking:

*What if they see I'm not good enough?*
*What if they fire me?*
*What if I make a mistake and everyone judges me?*

At that point, I wasn't learning craftsmanship.

I was just trying not to panic.

I was so focused on not embarrassing myself that I couldn't absorb the actual lessons. The concepts flew past me while I was busy managing my anxiety. Looking back, I realize how common this experience is for junior developers. That fear of being "found out" can completely block learning.


## Fast forward three years

Last week, I followed (almost) the same training again. Same trainer. Same themes. Same slides in some places.

But this time, something very different happened.

Instead of confusion, I kept thinking:

> "Oh… so *that's* what they meant back then."

And again:

> "Wait, this explains half the problems I've been fighting in my projects."

The training had not changed much. I had.

I no longer care about mob or pair programming, in fact, I now see it as just another tool for collaboration, not something to fear. I am getting more confident giving my ideas, even when they might be wrong. And I am not afraid of being wrong anymore, because I've learned that we are all constantly learning, even the senior developers I was so intimidated by three years ago.

That fear from my first training? Gone.

What replaced it was curiosity. Instead of worrying about judgment, I was genuinely interested in the problems we were solving. I asked questions. I challenged ideas. I contributed. For me the difference was night and day.


## Concrete lessons from the Craftsmanship training

Maarten's training reminded me of *how much there is to practice, even in simple exercises*. These katas aren't just coding puzzles, they're safe spaces to experiment with principles that are risky to try for the first time in production code.

### The Bowling Kata: When confusion leads to learning

Take the Bowling Kata, for example. I struggled to implement the spare. It sounded confusing. What even *is* a spare in bowling terms? How does the scoring work?

But I did write my first test… then my second. I googled the rules, tried it with an online bowling simulator, experimented with different approaches.

Here's what I learned: even when we don't fully understand something, it's important to think before implementing. To really grasp the problem domain before jumping to a solution.

In real life, we often rush to implement without fully grasping the problem. A ticket comes in, we glance at the requirements, and we start coding. This kata reminded me why that's risky. The time spent understanding the problem, really understanding it, saves far more time than it costs.

### Other key takeaways

* **Testing boundaries:** We spent time discussing edge cases. It's not enough to test the happy path. What happens at zero? What happens at the maximum? What happens when inputs are unexpected? Always think about boundaries, not just the middle.

* **SOLID refresher:** I thought I knew SOLID. But seeing these principles applied concretely, in real code, during the katas made them stick again. It's one thing to memorize that the "S" stands for Single Responsibility. It's another to see a class violating it and feel the pain it causes when trying to test it.

* **Pull Requests vs. Boy Scout Rule:** This discussion was particularly interesting. Maarten says PRs/MRs should always do one thing, one feature, one bug fix, one clear change. But the Boy Scout Rule says: leave the code cleaner than you found it. So what happens when you're implementing a feature and you stumble on code that desperately needs refactoring? Do you do it in the same PR, or create a new one?

There's no perfect answer. Context matters. Sometimes the refactoring is essential to your change. Sometimes it's a distraction. But the discussion itself is invaluable, it makes you think about the tradeoffs, about code review burden, about git history, about how changes are communicated to your team.


## Why it didn't work the first time

When you are a junior developer, you simply don't have the mental hooks yet.

You haven't:

* Refactored a 10-year-old codebase where every change feels like defusing a bomb.
* Fought with flaky tests that pass locally but fail in CI, wasting hours of your time.
* Been scared to change a single line because you know, deep down, that *everything might break*.
* Seen how one bad design decision, made in haste, maybe even by you slowly poisons an entire system over months or years.

So when someone tells you:

* "Test behavior, not implementation"
* "Good naming is more important than clever code"
* "Exceptions are part of your domain"
* "Craftsmanship is about responsibility"

…your brain has nowhere to attach those ideas.

They remain abstract. The words sound wise, inspirational even, but they don't stick. You nod along, maybe take some notes, but there's no real understanding. How could there be? You haven't felt the pain these principles are designed to prevent.

At that stage, you mostly care about:

* Making it work just get the green checkmark
* Finishing the ticket so you can move to the next one
* Not breaking the build and getting a message from the team
* Proving you can deliver something, anything

And that is perfectly normal. You have to walk before you can run. You have to make mistakes before you can learn from them.

## Why it suddenly made sense now

Three years later, I have scars.

I have seen:

* Tests that tested the wrong thing mocking so much that the test passed even when the actual feature was broken.
* Code that nobody dared to touch because the original developer left and there were no tests, no documentation, just cryptic variable names and mysterious business logic.
* Classes with five responsibilities, making them impossible to test in isolation and painful to modify.
* Methods that needed comments because the names were meaningless: `processData()`, `handleStuff()`, `doTheThing()`, giving you no clue what they actually did.
* "Quick fixes" that were supposed to be temporary but lived in production for years because no one wanted to be the one to refactor them.

So when Maarten now talks about:

* **Feedback loops:** Getting fast confirmation that your code works, through tests, through small iterations, through quick deployments.
* **Boundaries around infrastructure:** Keeping your business logic separate from databases, APIs, frameworks so you can test without spinning up the entire world.
* **Single Responsibility:** Each class, each method, doing one thing well, so when change comes (and it always does), you know exactly where to look.
* **Craftsmanship as a mindset, not a checklist:** This isn't about following rules blindly. It's about caring. About taking pride in your work. About leaving things better than you found them.

…I wasn't hearing theory anymore.

I was hearing explanations for my own past mistakes. Solutions to problems I had personally struggled with. War stories I could relate to because I had lived through similar battles.

That moment, when a concept suddenly connects to your lived experience, is magical.

That's when learning really starts. Not when you memorize the definition, but when you *feel* why it matters.


## Why I'm grateful I had this training twice

Looking back, I'm actually very grateful I had this training twice.

Even though I didn't understand much the first time, the ideas stayed somewhere in the back of my mind. Like seeds planted in soil, waiting for the right conditions to grow.

They influenced:

* How I look at code, I notice code smells faster now
* How I think about testing, not as a chore, but as a design tool
* How seriously I take my responsibility as an engineer, the code I write today becomes someone else's legacy tomorrow

This second time, the training did not just teach me new things.

It helped me reinterpret my entire first years as a developer. Suddenly, all those frustrating experiences made sense. They weren't just random problems, they were predictable consequences of violating these principles.

The messy codebase? Lack of Single Responsibility and poor boundaries.

The flaky tests? Testing implementation instead of behavior.

The fear of changing code? No safety net of tests, poor naming making intent unclear.

Everything connected. And that is probably the real value of craftsmanship education: Not giving you rules to follow blindly.
But slowly shaping how you think about your work. Building a mental model that helps you make better decisions, even in new situations you've never encountered before.

## What's next

This was only part 1 of the training. Part 2 is coming, and honestly? I can't wait.

If part 1 gave me this many insights, this many "aha!" moments where past experiences suddenly made sense, I'm excited to see what part 2 will reveal. What other patterns will I recognize? What other mistakes will I understand?

The beauty of this journey is that there's always more to learn. Always another layer to uncover. Always another way to improve.

Three years ago, I left that training room confused and overwhelmed.

Today, I leave it energized and ready to dig deeper.


## Thank you

Thank you, Maarten, for the training and for suggesting I take it again. You were right: timing matters, and sometimes the best gift is the same lesson at the right moment.
