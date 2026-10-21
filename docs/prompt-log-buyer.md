# Prompt log — Relay Reserve (buyer)

**Prototype:** `/reserve` · **Persona:** Ryan, incoming Fuqua student · **Build:** Next.js + Tailwind, mobile-first, UI only

These are the prompts that shaped this prototype, in the order they were issued, with what we were trying to learn from each one. Commands that only changed colour or spacing are left out on purpose — this log records decisions, not keystrokes.

| # | Prompt | What I was trying to learn | What changed |
|---|---|---|---|
| 1 | "Build the buyer login at `/reserve/login`. Same structure as the seller login but with buyer copy — email, password, sign in, create account. UI only, no backend." | Whether one shared trust gate (a `.edu` sign-in) can serve two very different products without feeling copied. | A second sign-in screen that shares layout but not language: *Sign in to furnish* vs *Sign in to sell*. |
| 2 | "Split the app into Home, Market and Me. Home should be personal — my landing date, a few recommendations — and the full catalogue should live in Market." | Whether buyers need a browse-first home or a status-first home. We assumed they arrive with a date, not a shopping mood. | Home leads with **"You land · Aug 18"** and a promise, not a product grid. Market carries the breadth. |
| 3 | "Make the market a two-column grid. Every card needs a grade badge, the delivered price and an arrival promise." | Which of the three buyer doubts — condition, price, date — should be visible before opening an item. | All three sit on the card. Date is written as `Arrives by Aug 20`, not "estimated". |
| 4 | "The item page needs an inspection report, not marketing copy: who inspected it, when, what's wrong with it, and what we refuse to resell." | Whether documentation can substitute for physically seeing the furniture. This was the core objection in our buyer interviews. | A report block with condition, inspector and date, plus the line "we don't resell mattresses or anything stained." |
| 5 | "Put the map into the delivery step so the address is confirmed on a map, and add a payment step — the flow currently jumps from choosing a window straight to a confirmation." | Whether the reservation feels like a real commitment. Without a map and a payment screen it read as a mock-up, not a transaction. | A Mapbox delivery screen with two windows (guaranteed vs flexible, $25 apart) and a hold-payment screen (`$20 today`, rest on delivery). |
