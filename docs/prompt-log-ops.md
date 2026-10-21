# Prompt log — Relay Ops (operations)

**Prototype:** `/ops` · **User:** Relay's own team · **Build:** Next.js + Tailwind, desktop-width console, UI only

This prototype does not serve a customer persona. It exists to answer a different question: **can the promise the other two prototypes make actually be delivered?** The prompts reflect that.

| # | Prompt | What I was trying to learn | What changed |
|---|---|---|---|
| 1 | "Make the operations console a desktop layout. No phone frame, no tab bar — sidebar and tables." | Whether three prototypes can read as three different kinds of product. Two phone apps plus one back-office screen says that before anyone speaks. | A 1440px console with a left sidebar instead of a third phone-shaped app. |
| 2 | "Show stock in and stock out next to each other on the same screen." | What the business actually is. It is not a marketplace; it is a warehouse with two doors and a three-month gap between them. | Two panels side by side: today's pickups on the left, August deliveries on the right. |
| 3 | "Let me check in a pickup and have it appear in the inventory table with a tag, cost, list price and margin." | Whether this is an operable system or a dashboard picture. A console nobody can operate is a slide. | The `Check in` action moves the row, assigns `RLY-1042`, and updates the counters — all in local state. |
| 4 | "Add an at-risk block for items that are not reserved before the September fallback." | Which failure the team actually fears. Unreserved inventory is the cost of the whole model, so it should be visible every morning, not buried in a report. | A dark block under the August schedule: "3 items not yet reserved — Sept 15 fallback applies." |
| 5 | "Use per-item tags, cost, list price and margin. Don't show only totals." | Whether unit economics is legible. The business lives or dies on margin per item, not on GMV. | An inventory table where every row carries its own margin, so a bad category is visible at a glance. |
