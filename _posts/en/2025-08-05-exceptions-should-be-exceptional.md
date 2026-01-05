---
layout: post
title:  "Exceptions: The Emergency Brake, Not the Steering Wheel"
date:   2025-08-05 08:00:00 +0100
image:  "/assets/img/exceptions.png"
tags: [java, best-practices, architecture]
lang: en
---
> "You don't need a license to drive a sandwich." — SpongeBob SquarePants

As developers, we’re told to handle errors.  
But how we handle them really affects the way our code works.  

A common mistake, especially in Java, is using exceptions to manage normal, expected stuff.  
It's like using your car’s emergency brake every time you hit a red light.  
It kinda works... until it doesn’t.  

Eventually, your code slows down, gets messy, and people avoid touching it like it's cursed.

And hey, I’ve done it too.  
Throwing an exception is easy.  
It feels like a clean escape hatch when logic gets too messy.  
But here’s the thing: exceptions are meant for **unexpected problems**, not everyday flow.

Martin Fowler put it best:  
> **Exceptions should be exceptional.**

Let’s break that down.

## What *Actually* Counts as “Exceptional”?

Think of an exception like a fire alarm.  
It should only go off when something’s seriously wrong. 
Something the code couldn’t have planned for.

Here’s a quick gut check:
- Is this a *normal* part of business logic? → Don’t throw.
- Is this a *weird* failure that makes the method impossible to finish? → Exception time.

### Examples:
**Actually Exceptional**  
- DB is down.  
- Config file is missing or unreadable.  
- API suddenly returns a 500.

**Not Exceptional**  
- No user found for a search.  
- Email format is invalid.  
- List is empty.

If it’s something you *expect might happen*, just handle it with normal logic.

## When Throwing Is the Right Call

Here’s a good example of when an exception makes sense.

```java
public static double squareRoot(double number) {
    if (number < 0) {
        throw new IllegalArgumentException("Cannot calculate the square root of a negative number.");
    }
    return Math.sqrt(number);
}
````

This method’s job is to calculate square roots. If you give it a negative number, it literally can’t do that.
So yeah, an exception is fair. That’s not just “bad input”, it breaks the rules of what the method can even do.

## What to Do When Failures *Aren’t* Exceptional

Let’s talk about validation.

Imagine a user signs up with a bad email *and* a weak password.
Do you want to throw an exception for each issue, stopping after the first one?
Or do you want to show all the problems at once?

### The Wrong Way

```java
if (!email.contains("@")) {
    throw new InvalidUserException("Email is invalid.");
}
if (password.length() < 8) {
    throw new InvalidUserException("Password too short.");
}
```

This stops after the email fails, so the user keeps fixing one thing at a time. 
Super annoying.

### A Better Way: Notification Pattern

Let’s collect all issues in one go:

```java
public class Notification {
    private final List<String> errors = new ArrayList<>();

    public void addError(String message) { errors.add(message); }
    public boolean hasErrors() { return !errors.isEmpty(); }
    public List<String> getErrors() { return errors; }
}

public Notification validate(User user) {
    Notification notification = new Notification();

    if (!user.getEmail().contains("@")) {
        notification.addError("Email is invalid.");
    }
    if (user.getPassword().length() < 8) {
        notification.addError("Password must be at least 8 characters.");
    }

    return notification;
}
```

Now the user gets *all* feedback at once.
The backend stays chill.
No emergency brakes needed.

## Custom Exceptions: When They’re Actually Helpful

Custom exceptions are fine when they *mean* something specific, especially in business logic.

Example: a banking app.

```java
public class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String message) {
        super(message);
    }
}
```

This makes it super clear what went wrong and you can handle it differently than, say, a network error.

```java
try {
    accountService.withdraw(100);
} catch (InsufficientFundsException e) {
    showError("You don’t have enough funds.");
} catch (NetworkException e) {
    showError("Connection error. Please try again.");
}
```

The goal: make errors *understandable* and *actionable*.

## The Hidden Costs of Misusing Exceptions

**1. Performance**
Throwing an exception isn’t free.
The JVM captures the whole stack trace, and that takes time.
If you're throwing exceptions in a tight loop or in a high-traffic app, you're asking for trouble.

**2. Readability**
`try-catch` blocks are loud.
If you use them for stuff that’s not an error, your code becomes harder to read and understand.
Future you, or someone else, has to stop and ask, “Wait, is this *really* an error?”

**3. Bad APIs**
If your backend throws an exception for bad input, it might just send back a generic `500`.
But that’s not a server error, it’s a user mistake.
Instead, return a `400 Bad Request` with a clean JSON response explaining what’s wrong.

## The Bigger Picture: Don’t Be “Clever”, Be Clear

Throwing exceptions for normal stuff feels clever at first.
But clever code ages badly.

Clean code is clear code.
It doesn’t use exceptions like fancy `if` statements.
It uses them when something genuinely breaks.
