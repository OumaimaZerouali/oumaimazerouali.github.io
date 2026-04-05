---
layout: post
title: "Week 6 – The Best Time to Learn About Debugging"
date: 2026-04-05 08:00:00 +0100
series: "weekly-dev-note"
tags: ["weekly"]
lang: en
---

This week I explained debugging to my intern.

The timing was not planned.

## What I Said

I told him the usual things. That debugging is rarely about finding one clear mistake. That you form a theory, test it, and then form a different theory. That external dependencies add a layer you can't fully control.

Good advice. Solid advice.

I said it while looking at a bug I had been staring at for most of the day.

## What Was Supposed to Be Simple

An external party had migrated their API to a new URL.

In theory: change the URL, done.

In practice: the credentials no longer worked. Then, after fixing the credentials, something else was wrong. Then, after that, we got nothing back at all. No error. No response. Just silence.

Each fix revealed a new problem. Not because we had done anything wrong. Because an external change had touched more than a URL.

## Teaching While Drowning

There's something strange about explaining a concept to someone while it's actively happening to you.

I wasn't describing debugging in the abstract. I was doing it, badly, in real time, while trying to sound like I knew what I was doing.

Maybe that's the most honest version of teaching. Not the clean explanation from the other side of the problem. The live demonstration that things don't always go as expected, including the fix.

He saw what debugging actually looks like. Not the retrospective version. The one with the wrong theories and the unexpected silence.

I'm not sure which of us learned more.
