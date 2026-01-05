---
layout: post
title:  "What If We Wrote Code Like We Write Poetry?"
date:   2025-03-10 19:00:00 +0100
image:  "/assets/img/software-dev-and-poetry.jpg"
lang: en
---
> "Ravioli, ravioli, give me the formuoli!" - Spongebob SquarePants

We often hear terms like "_clean code,_" "_elegant solutions,_" and "_beautiful architecture_" thrown around in software development. 
But what if we took those concepts a step further? 
What if we started approaching our craft, software engineering, with the same artistry, intention, and mindful attention to detail that poets bring to their verses? 
I'm not suggesting we start writing code that *looks* like a sonnet, but rather, what if we embraced poetic principles in our coding *process*?

As a Java and Angular developer, mostly backend stuff with Spring Boot and a sprinkle of Quarkus, this idea might seem a bit out there. 
I mean, I spend most of my day wrestling with NullPointerExceptions and trying to get my components to render correctly – not exactly a scene that screams artistic inspiration. 
But after diving into Uncle Bob's Clean Code and Clean Coder, I began to see coding as something more than just a technical exercise. 
There's a real art to crafting well-structured, maintainable, and even...dare I say... *beautiful* code.

So, in this post, I want to explore that idea. 
Can we learn anything from poetry that can make us better developers? 
**It may seem a stretch, but let’s give it a try!**
I’ll dive into poetic concepts like rhythm, imagery, conciseness, and even a little bit of rhyme, and see if we can't use them to improve our coding. 
The goal is to explore whether or not such poetic elements can help us write code that is not only functional but more readable, maintainable, and even...dare I say it..._beautiful_.

## Rhythm and Flow (Code Structure and Readability):
Think of one of your favorite poems.
What makes it stick in your head? 
For me, it's how the words flow – you just get it without having to think too hard. 
Code can and should have that, as well! 
I'm talking about more than just making sure your IDE auto-formats the code – it's about creating a structure that is easy to follow.

As *Uncle Bob* emphasizes in "Clean Code," code should read like well-written prose. 
Consistent indentation, meaningful variable names, and clear function signatures are essential for creating code that has a natural rhythm and flow.
I think of it as guiding the reader through the code, making it as easy as possible for them to follow along and understand what’s happening. 
It's more than just aesthetics; it directly improves readability and reduces cognitive load.
Consider the example bellow.
Which one would you like to maintain?

```java
//Before
public class a{public static void main(String[] a){int x=5;int y=10;System.out.println("Sum="+ (x+y));}}

//After
public class Addition {
    public static void main(String[] args) {
        int number1 = 5;
        int number2 = 10;
        int sum = number1 + number2;
        System.out.println("Sum = " + sum);
    }
}
```

_See the difference?_ 
**Even for this small bit of code!**

## Imagery and Metaphor (Abstraction and Design Patterns):
Poetry often uses imagery and metaphors to explain complex ideas in a concise way that really sticks with you. 
As software enginners this is usefull because, we can achieve something similar through abstraction and design patterns.

A well-chosen abstraction is like a powerful metaphor – it hides the underlying complexity and allows us to reason about the system at a higher level.
Take design patterns: Strategy, Observer or Factory - this are just examples. 
They are not just recipes but more complex than that, this is why they represent ways to convey a more complex idea in our code to other devs. 
In the end all of this helps improve and simplify the project and make it easier to work with,

Alright, time for a Java example! 
Let's say you need to connect to different payment gateways (Stripe, PayPal...). 
Using a strategy pattern, you make that process more seamless. 
And when that works. 
All the new hires do not need to search for the best solution anymore.

## Conciseness and Elegance (Code Optimization and Refactoring):
I really don't want that every single line of code is 10x smaller, that is just nuts. 
But at least it can be smaller.
Poets are masters of getting to the point, so you should be also.
As a junior java and doing spring boot. 
Performance really matters. By keeping it less heavy is really helpfull!

Where framework like Quarkus comes in handy. 
Since its fast and light on resources which really lets you create great code in the company.

## Constraints and Creativity (Coding Standards and Best Practices):
When I first started learning programming, honestly, the most annoying thing was all the standards and all the rules I had to follow. 
It felt so restrictive! But then I read *Uncle Bob's* "Clean Code" and things started to click. 
I began to understand that these guidelines weren't just random rules, they were actually a roadmap to writing better code.

But it wasn't just the books themselves. I also had some amazing colleagues who took the time to explain the why behind the rules. 
They showed me how these seemingly restrictive constraints could actually spark creativity and lead to more elegant and maintainable solutions. 
It's like learning the rules of a poetic form – once you understand the structure, you can start to play with it and create something truly unique.

Think of the SOLID principles, for example. At first glance, they might seem like a set of rigid guidelines that stifle creativity. 
But in reality, they provide a framework for building clean, understandable code that can be easily extended and modified.
And that, in turn, frees you up to focus on the more interesting and challenging aspects of your project. 
It's like having a solid foundation to build upon – you can be more creative with the design and features, knowing that the underlying code is rock-solid.

## Emotional Impact (User Experience and Developer Satisfaction):
Code can have an impact on the User and yourself. 
And to be honest, if you create clean code and it does not work... Wel that just not fun anymore. 
So as important is readability and performance as if does the thing you want.
As junior devloper, I do have some part of code that i do think: Man this is *f*cking* awsome!
Having that and learning new stuff is really important.

## Conclusion
So, that's it – our exploration of code and poetry comes to an end. 
Have we unlocked some ancient secret to coding enlightenment? *Probably not*. 
Am I suggesting you start writing code that rhymes? 
_Definitely not (unless you're feeling really ambitious!)._

But hopefully, this thought experiment has given you some new ways to think about writing code. 
At its core, writing "poetic code" is about more than just aesthetics – it's about empathy, about thinking about the other developers who will have to read and maintain your code, and about striving to create something that is not only functional but also elegant, understandable, and even...dare I say it... beautiful.

In the end, it all comes down to communication. 
Just like a poet uses language to connect with their audience on an emotional level, we, as developers, use code to communicate our intentions to both the machine and our fellow humans. 
And by embracing the principles of rhythm, imagery, conciseness, and constraint, we can become better communicators, better developers, and maybe even a little bit more like those coding legends.

**So, go forth and write code that sings!** 
Code that tells a story! Code that makes the world a better place! 
Or, you know, just code that works... but does it with a little bit of style.
