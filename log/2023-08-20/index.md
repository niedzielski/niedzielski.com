---
dateModified: '2023-08-20'
datePublished: '2023-08-20'
keywords: ['blog', 'programming']
headline: 'On Technical Debt.'
title: '2023-08-20: When Do You Press the Button?'
---

> If you could press a button to rewrite your project's history to have 1.5x
> features at 3x the code, would you take
> it? -[gorpomon](https://news.ycombinator.com/item?id=37120968)⁰

In a recent personal project, I cut 30 thousand lines of code to five. Despite
authoring the mess, realizing the kernel was a lengthy effort. It was as if I
had implicitly pressed the button at some point but I don't think I could have
progressed without having done so.

Work projects are different. More authors decrease the holistic view but more
time is available. I estimate I can steward 100k lines across projects
depending. If I press the button on a 50k line repo, I likely lose the kernel.

Consider an extreme like Facebook. The collective presses the button and
acquires a wealth of new features at a staggering cost of 3x code. Does infra
fall over? Does development grind to a halt? Facebook has excellent codemods and
an enormous workforce.

When do you press the button? It depends. What is the state of code? Low feature
/ high code projects probably shouldn't because they already have. If the
opposite is true, you might press it. If commitments demand, you must press it
but you may be _unable_ to ever do so again. It can also be tactical to
intentionally press it when you're stuck but only if you will clean up.

## When Do You Press the Button More Than Once?

This reframes the question as compounding gain / cost. If I press the button
once, I get 1.5x features at 3x code. Press it again, that's 2.25x features and
9x code! Is it ever possible to redeem a 9x code production project? Even if
there was only 50k lines to begin with, it's 450k lines after two presses. Will
the kernel ever be visible again?

You never press the button more than once willingly except when you're not
responsible for the code. I've observed programmers press the button seemingly
as often as they could when their exit was imminent. I've seen nonprogrammers
press the button at the wrong time too.

I repeatedly press it when I'm prototyping. I can declare bankruptcy but keep
the lessons learned.

Understand the context and press wisely.

⁰I reworded to avoid trickery. I intended to compare two possible realistic
futures.
