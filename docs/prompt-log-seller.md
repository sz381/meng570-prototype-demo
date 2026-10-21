# Prompt log — Relay Sell (seller)

**Prototype:** `/instant` · **Personas:** Allan (wants it gone) + Nemo (wants the price) · **Build:** Next.js + Tailwind, mobile-first, UI only

Two seller personas share one entry. The prompts below are the ones that decided how — and where — they split apart.

| # | Prompt | What I was trying to learn | What changed |
|---|---|---|---|
| 1 | "Build the seller login at `/instant/login` with email, password and both sign-in and create-account buttons. UI only for now." | Whether the `.edu` verification can be shown as a product step rather than a policy line. | A full-screen sign-in gate, later reused by the buyer prototype with different copy. |
| 2 | "Don't ask the seller which type they are. Put both offers on one screen — cash today versus list it for more — and let them pick." | Whether convenience and price are two user types or two decisions made per item. Asking would have told us what people *say*; a price pair tells us what they *do*. | The fork screen: **$95 cash today** vs **$220 list, ~$198 payout in September**. This became the experiment the whole prototype is built around. |
| 3 | "Add a map to the pickup step and make the bottom half a draggable sheet — address, day and time live in the sheet." | Whether scheduling a pickup can feel like confirming a place, instead of typing an address into a form. | A Mapbox map with a pinned pickup point and a two-position drawer that collapses to "Choose a time." |
| 4 | "At the door, show the price drop with a photo of the defect, and let the seller refuse it." | Whether sellers walk away at the last minute. Our own workbook called this the biggest drop-off risk, so it had to be a real choice, not a notice. | A line-item check, a revised offer (`$95 → $80`), and two equal-weight buttons. Refusing opens a free donation route. |
| 5 | "Add 'Sell another item' to the confirmation screen and reset the whole flow when it is pressed." | Whether the product is built for one object or for clearing an apartment. Allan has four things, not one. | A secondary button on both terminal screens that clears photos, category, mode and dates and returns to step one. |
