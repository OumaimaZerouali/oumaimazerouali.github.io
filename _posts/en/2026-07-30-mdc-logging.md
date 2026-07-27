---
layout: post
title: "MDC Logging: I Had No Idea What I Was Doing (And That's the Point)"
date: 2026-07-30 10:00:00 +0100
image: "/assets/img/mdc-logging.png"
tags: [java, logging, kibana, dev-life, learning]
lang: en
---

Someone from the team asked me to add MDC logging to the project.
"Sure," I said.
I had absolutely no idea what MDC logging was.

This is a story about that. Not about how I figured it out in ten minutes and everything was fine.
But about the specific experience of being handed a term you've never heard before, implementing it across multiple projects, and watching it quietly turn into something you actually understand.
Including the parts where it didn't work the way you expected.

The other thing I want to do is explain MDC the way I wish someone had explained it to me. 
Most resources I found either assume you already know what it is, or end with "it's a powerful tool!" without really telling you what that means in practice. 
The one resource that actually helped me was the [Logback manual, chapter 8](https://logback.qos.ch/manual/mdc.html). 
Everything else was surface level. So let me try to do better.

## The actual problem MDC solves

Imagine you have a web application handling requests.
Multiple users are making requests at the same time.
Your server handles each request on its own thread, and your code logs things as it processes.

The problem is that all of those log lines end up in the same log file, completely mixed together:

```
INFO  Processing request
INFO  Processing request
INFO  Validation passed
INFO  Processing request
ERROR Something went wrong
INFO  Validation passed
INFO  Flow completed
```

Which request failed?
Which one completed?
_You have no idea._

You can look at timestamps and try to guess, but in a busy system with requests completing in milliseconds, this is effectively hopeless.

The naive fix is to add identifying information to every single log call manually:

```java
log.info("Processing request for user {}", userId);
log.info("Validation passed for user {}", userId);
log.error("Something went wrong for user {}", userId, e);
```

This works, but it's tedious, it's easy to forget, and it means your `userId` has to be passed down through every method just so it can show up in log lines.
That gets messy fast.
MDC is the clean solution to this problem.

## What MDC actually is

MDC stands for Mapped Diagnostic Context. It's part of SLF4J, and under the hood it is exactly this:

```
ThreadLocal<Map<String, String>>
```

That's it.
A map of strings, stored on the current thread.
The `MDC` class has only static methods[^1]: `MDC.put(key, value)` to add something, `MDC.get(key)` to retrieve it, `MDC.remove(key)` to remove one entry, and `MDC.clear()` to wipe the whole map.

Because it's backed by a `ThreadLocal`, whatever you put in the MDC is scoped to the current thread only.
Other threads each have their own separate map: `MDC.put()` and `MDC.get()` affect only the MDC of the thread that calls them.[^2]
In a web server where each HTTP request runs on its own thread, this means each request gets its own isolated context with no risk of threads interfering with each other.

Logback reads from this map automatically when it formats log messages.
You configure which fields to include in your log pattern using `%X{key}`[^3]:

```xml
<pattern>%d{yyyy-MM-dd HH:mm:ss} [%X{userId}] [%X{requestId}] %-5level %logger - %msg%n</pattern>
```

Every log line that thread produces will now include `userId` and `requestId` from the MDC, without you ever passing them as parameters to your log calls.
Set them once, get them everywhere.

With that in place, your logs look like this:

```
INFO  [userId=u-4821] [requestId=req-99x] Processing request
INFO  [userId=u-4821] [requestId=req-99x] Validation passed
ERROR [userId=u-4821] [requestId=req-99x] Something went wrong
INFO  [userId=u-1337] [requestId=req-01a] Processing request
INFO  [userId=u-1337] [requestId=req-01a] Flow completed
```

Now you can filter on `requestId : req-99x` and see exactly what happened for that one request, in order, across every method and service layer that touched it.

One more thing worth knowing: MDC map lookup is cheap.
You're reading from a map stored on the current thread: no I/O, no network call, no database lookup.
The overhead is negligible. Don't let performance concerns talk you out of using it.

## The cleanup rule

There is one rule you cannot forget: **always clear the MDC when you're done.**

This is where the `ThreadLocal` nature of MDC becomes a footgun.
Web servers use thread pools, which means threads are reused.
When a request finishes on a thread, that thread goes back into the pool.
The next request to pick it up will inherit whatever was left in the MDC from the previous one: wrong userId, wrong requestId, wrong everything.

Always clear in a `finally` block so it runs even when exceptions are thrown:

```java
try {
    MDC.put("userId", userId);
    MDC.put("requestId", requestId);
    // ... your logic
} finally {
    MDC.clear();
}
```

The Logback manual makes this point directly: a `put()` operation should always be balanced by a corresponding `remove()` and doing that in a `finally` block is the safest way to ensure it happens regardless of the execution path.[^4]

## The simple version

The first time I implemented MDC, I kept it straightforward.
Set some fields at the start of a flow, update them as things progress, clear everything in a `finally` block at the end.

```java
try {
    MDC.put("version", "3.0");
    MDC.put("response", "102"); // in progress

    log.info("Starting flow");

    var result = doTheActualWork();

    MDC.put("response", "201"); // success
    log.info("Flow completed");

    return result;

} catch (Exception e) {
    MDC.put("response", "500");
    MDC.put("error", e.getClass().getSimpleName());
    log.error("Flow failed", e);
    throw e;

} finally {
    MDC.clear();
}
```

The `response` field updating as you go: 102 while processing, 201 on success, 500 on error. This means you can see in Kibana not just that something failed but at what point in the flow it failed.
That felt surprisingly powerful for something so simple to add.

## It gets more interesting

The second project was more complex.
More services, more async processing, more cases where the simple inline approach stopped being enough.
So things got more architectural.

Instead of scattering `MDC.put()` calls throughout the code, I started encapsulating them in dedicated context classes: a class responsible for setting, updating, and clearing a specific set of MDC fields, with a clear `start()` / `finish()` lifecycle.

```java
public final class ProcessingMdcContext {

    public static final String STATUS_KEY   = "process.status";
    public static final String DURATION_KEY = "process.durationMs";
    public static final String ERROR_KEY    = "process.errorReason";

    private static final ThreadLocal<Long> START_NANOS = new ThreadLocal<>();

    public static void start() {
        START_NANOS.set(System.nanoTime());
        MDC.put(STATUS_KEY, "PROCESSING");
        MDC.remove(DURATION_KEY);
        MDC.remove(ERROR_KEY);
    }

    public static void finish(boolean success, Throwable cause) {
        MDC.put(STATUS_KEY, success ? "SUCCESS" : "FAILED");
        MDC.put(DURATION_KEY, String.valueOf(computeDurationMs()));
        if (!success) {
            MDC.put(ERROR_KEY, classifyError(cause));
        }
    }

    public static void clear() {
        START_NANOS.remove();
        MDC.remove(STATUS_KEY);
        MDC.remove(DURATION_KEY);
        MDC.remove(ERROR_KEY);
    }

    private static long computeDurationMs() {
        Long start = START_NANOS.get();
        return start == null ? 0 : TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - start);
    }
}
```

This is nicer for a few reasons.
The field names are constants, so you can't typo them. The `start()` / `finish()` pattern makes the lifecycle explicit and harder to mess up.
And tracking duration via a separate `ThreadLocal<Long>` means you get `process.durationMs` in every log line automatically, which in Kibana lets you build dashboards showing how long operations take, where the slow ones cluster, which error types cost the most time.

Notice that `ProcessingMdcContext` is itself using a `ThreadLocal` for the start time, mirroring exactly how MDC works internally.
Once you understand that MDC is just `ThreadLocal<Map<String,String>>`, reaching for `ThreadLocal` yourself for related tracking feels natural.

## The thread pool problem

Here is the catch that Google doesn't warn you about until you've already hit it.

MDC is thread-local.
That's the whole point of it.
But it also means: if you kick off async work on a thread pool, that new thread starts with an empty MDC.
Your context does not propagate automatically.
The fields you carefully set up on the original thread are invisible on any thread that work gets handed off to.

This shows up silently.
Your async logs just have blank fields where you expected values, or worse, the values from whatever context that pooled thread previously held.
It's confusing and takes a while to diagnose if you don't know what to look for.

The recommended approach[^5] is to capture a snapshot of the MDC before submitting the task and restore it on the worker thread:

```java
public static Runnable wrap(Runnable runnable) {
    Map<String, String> capturedContext = MDC.getCopyOfContextMap();
    return () -> {
        Map<String, String> previous = MDC.getCopyOfContextMap();
        try {
            if (capturedContext == null) {
                MDC.clear();
            } else {
                MDC.setContextMap(capturedContext);
            }
            runnable.run();
        } finally {
            if (previous == null) {
                MDC.clear();
            } else {
                MDC.setContextMap(previous);
            }
        }
    };
}
```

`MDC.getCopyOfContextMap()` gives you a snapshot of the current thread's MDC map at the moment you call it.
The returned `Runnable` then sets that snapshot as the context on whatever thread eventually executes the task, and restores whatever was there before when it's done.

You call it like this before submitting to an executor:

```java
executor.submit(ProcessingMdcContext.wrap(() -> doAsyncWork()));
```

The context travels with the task.
Your async log lines have the same MDC fields as the thread that submitted the work.

## HTTP context via a filter

For the HTTP layer, the cleanest approach is a `OncePerRequestFilter`.
This is a Spring class that guarantees your filter logic runs exactly once per request, even in complex filter chains.
You use it to populate MDC fields at the start of every request: method, path, client IP, so they flow through every log line the request produces, regardless of which service class or method generates them.

```java
public class RequestLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        try {
            MDC.put("request.method", request.getMethod());
            MDC.put("request.path",   request.getRequestURI());
            MDC.put("request.clientIp", request.getRemoteAddr());
            chain.doFilter(request, response);
        } finally {
            MDC.put("response.status", String.valueOf(response.getStatus()));
            MDC.clear();
        }
    }
}
```

`response.status` goes in the `finally` block, not before `chain.doFilter()`.
At the point the filter runs, the response hasn't been committed yet, the chain is what actually processes the request and sets the status.
So you read the status after the chain executes, not before.

Logback actually ships a built-in filter for this called `MDCInsertingServletFilter`[^6] that automatically populates a standard set of request fields. Worth knowing it exists, though building your own gives you control over exactly which fields go in.

## What it looks like in Kibana

This is where it all pays off.
Logback (via logstash-logback-encoder or equivalent) can serialize your MDC fields as structured JSON fields, which Elasticsearch indexes individually.
That means in Kibana you can query on them directly.

Once your MDC fields are indexed, you can filter on `structured.version : 3.0` and see everything that happened in that flow across all services.
You can filter on `structured.process.status : FAILED` and sort by `structured.process.durationMs` to find which failures took the longest.
You can build a dashboard that shows your error distribution by `structured.process.errorReason` over time.
You can trace a single async operation across threads because you wrapped the runnable and the context traveled with it.

Before MDC: a wall of log lines, timestamps, and manual detective work.
After MDC: you ask Kibana a specific question and it answers.

---

## References

[^1]: SLF4J API — [MDC class documentation](https://www.slf4j.org/api/org/slf4j/MDC.html). The MDC class exposes only static methods and manages contextual information on a per-thread basis.

[^2]: Logback Manual, Chapter 8 — [Mapped Diagnostic Context](https://logback.qos.ch/manual/mdc.html). "MDC operations such as put() and get() affect only the MDC of the current thread, and the children of the current thread. The MDC in other threads remain unaffected."

[^3]: Logback Manual, Chapter 6 — [Layouts](https://logback.qos.ch/manual/layouts.html). The `%X{key}` conversion word is documented under the PatternLayout section.

[^4]: Logback Manual, Chapter 8. "Normally, a put() operation should be balanced by the corresponding remove() operation. Otherwise, the MDC will contain stale values for certain keys. We would recommend that whenever possible, remove() operations be performed within finally blocks, ensuring their invocation regardless of the execution path of the code."

[^5]: Logback Manual, Chapter 8, section "MDC And Managed Threads". "It is recommended that MDC.getCopyOfContextMap() is invoked on the original (master) thread before submitting a task to the executor. When the task runs, as its first action, it should invoke MDC.setContextMap() to associate the stored copy of the original MDC values with the new Executor managed thread."

[^6]: Logback Manual, Chapter 8, section "MDCInsertingServletFilter" — [MDCInsertingServletFilter source](https://logback.qos.ch/xref/ch/qos/logback/classic/helpers/MDCInsertingServletFilter.html). A built-in Logback filter that automatically populates standard HTTP request fields into the MDC.

**Further reading:**
- Neil Harrison, "Patterns for Logging Diagnostic Messages," in *Pattern Languages of Program Design 3*, ed. R. Martin, D. Riehle, and F. Buschmann (Addison-Wesley, 1997). The original paper that described the technique MDC is built on.
- [logstash-logback-encoder](https://github.com/logfellow/logstash-logback-encoder) — for shipping structured MDC fields to Elasticsearch/Kibana.
- Spring Framework — [OncePerRequestFilter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/filter/OncePerRequestFilter.html) API docs.