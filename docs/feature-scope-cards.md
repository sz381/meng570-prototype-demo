# Relay — Three Prototype Scope Cards

**The experiment.** Three prototypes, one problem, one brand, one catalog. The single variable we are changing is **who owns the furniture — and who carries the risk — during the May-to-August gap.**

Our Define-phase workbook names our biggest open question: *"Are students actually willing to hand their furniture over to Relay, just to save some hassle — and accept its pricing, fees, and the risk of damage?"*

A, B, and C are three different answers to that question. They are not three skins of one product.

---

## Held constant (so the comparison is fair)

| Constant | Why |
|---|---|
| Brand, logo, type, color | Otherwise the vote measures visual taste, not the model |
| Seed catalog: sofa, desk, chair, dresser, bed frame, bookshelf | Same items appear in all three, so users compare **models**, not inventory |
| 4–5 screens per prototype, no login, no payment, no backend | Prototype scope, not product scope |
| Every screen explains itself without a narrator | Grading criterion: usable without a guided tour |
| Entry hub describing all three experiments | The class needs to know what they are voting on |

## What actually varies

| Dimension | **A · Instant** | **B · Reserve** | **C · Consign** |
|---|---|---|---|
| Side of market | Seller | Buyer | Seller |
| Ownership | Relay buys outright | Relay holds, pre-sells | Seller keeps title |
| Who carries the risk | Relay (inventory) | Buyer (delivery promise) | Seller (price / time) |
| Time horizon | 4 minutes | 6 weeks ahead | 3 months |
| Emotion we serve | Relief | Certainty | Control |
| Core moment | The price drops at the door | The guaranteed delivery date | The floor price + fallback |

---

# CARD A — Relay Instant

**Persona:** Allan, graduating undergraduate. Lease ends, job starts in another city, no car, couch is the problem.
**Evidence:** Allan kept the bed until his last night and said $150 vs. $80 "isn't really the main thing." Jingyu had 2–3 days and paid his apartment's cleaning fee. The Duke PhD candidate paid a junk removal service.

**Hypothesis (falsifiable):**
> A seller with days left will accept a below-market instant offer — and still convert after the price drops at inspection — because one scheduled pickup removes every human interaction from the last week.

**What would prove us wrong:** users accept the photo offer, then abandon at the door when the price drops. If that happens, "instant certainty" is a promise the model cannot keep, and A is dead.

### In scope
1. **Snap.** Three photos (pre-seeded, tap-to-add), category, three condition taps.
2. **Offer.** A single number, plus a "why this price" breakdown: two comparables, condition, August demand. Accept / decline-with-reason.
3. **Book pickup.** One window picker, one address, "2-person crew, 20 minutes."
4. **At the door.** Crew flags two defects → offer drops $60 → **$45**. Accept or take it back. *(This is the screen that decides the product.)*
5. **Paid.** Instant payout confirmation + "your sofa is now in Relay storage; it goes on sale in August."

### Explicitly out of scope
Rejection path for items Relay won't take (a real product needs it — we cut it to keep one flow), real AI pricing, payments, scheduling logic, buyer side.

### Scorecard
| | |
|---|---|
| **Value** | Sellers get a certain exit in under 5 minutes. Relay captures inventory in May, when nobody else has buyers. |
| **Effort** | ~6 h build. Highest-risk screen is the door re-price; everything else is form + reveal. |
| **Complexity** | Low technical, **high assumption risk**. The whole model rests on one behavioral bet: will they take less for certainty? |
| **Success signal** | Offer acceptance rate; % completing in < 5 min; **door re-price acceptance** (target > 70% of those who reach it); abandonment after the drop. |

### 90-second demo
Photos → offer appears → accept → pick Thursday 9–11 → crew finds a stain → $60 becomes $45 → accept → paid.

**Why this isn't B or C:** the user never waits and never chooses a price. Relay owns the item from the moment it leaves the apartment.

---

# CARD B — Relay Reserve

**Persona:** Ryan, incoming Fuqua student, moving from California, unfurnished apartment, lands days before orientation.
**Evidence:** Kevin said the most stressful part was "simply getting all of the furniture to where I was going to be living." Ryan paid more for a new bed frame *only* to get a definite arrival date, and refused a used mattress.

**Hypothesis (falsifiable):**
> Incoming students will commit to furniture weeks before they arrive — if the delivery date is a guarantee and condition is documented — and that date guarantee matters more than price.

**What would prove us wrong:** users browse, then bail at the reserve step to "wait until I'm there." That would mean pre-arrival commitment is not a real behavior, only a nice idea.

### In scope
1. **Set the landing.** Move-in date, budget, apartment size.
2. **Browse.** Six inspected items, grade A/B/C, delivery-included price, "not sold used: mattresses" stated up front.
3. **Inspection report.** Defect photos, measurements, "inspected May 28 by Relay," date guarantee, refundable $20 hold.
4. **Build the room.** Add desk + bed frame + chair → bundle total.
5. **Guarantee + reserve.** Delivery window Aug 18–20, "not there by Aug 20 → delivery free + $100 back." Confirmation + arrival tracker.

### Explicitly out of scope
Seller side, real inventory, payments, route planning, chat with support, returns.

### Scorecard
| | |
|---|---|
| **Value** | Buyers arrive to a furnished apartment without a truck, a friend, or a Marketplace negotiation. |
| **Effort** | ~8 h build. Highest-risk screen is the inspection report — it has to feel like evidence, not marketing. |
| **Complexity** | Medium. Catalog + bundle logic is simple; the hard part is making a promise feel credible on screen. |
| **Success signal** | Reservation conversion before arrival; drop-off at the guarantee step; share who pick the **guaranteed** date over the cheaper flexible one. |

### 90-second demo
"I land Aug 18, $800 budget, one bedroom" → filter to desk → open inspection report → add bed frame → bundle $340 → guarantee screen → reserved → tracker shows "in storage, 24 days to delivery."

**Why this isn't A or C:** the user is a buyer, not a seller; nothing is bought outright; the product's core promise is a date, not a price.

---

# CARD C — Relay Consign

**Persona:** Nemo, PhD candidate moving between schools. Long distance, no car, low-demand town, paid to have furniture hauled away, attached to items that cost real money.
**Evidence:** the 2025 Duke graduate said holding items until August "would have given him more time to sell," but raised cost, damage, and fees. The PhD candidate wanted to sell as much as possible and ended up paying a junk service.

**Hypothesis (falsifiable):**
> Value-focused sellers will hand over storage and listing — but not pricing — and will accept three months of uncertainty in exchange for a floor price and a stated fallback.

**What would prove us wrong:** users set a floor, see zero offers for weeks, and ask to be bought out. That means consignment is a feature sellers *say* they want and never *use*.

### In scope
1. **List it.** Photos, condition, suggested range from comparables.
2. **Set the price.** Seller's own asking price on a slider; the card warns "likely to sit" above the range.
3. **Set the floor and the fallback.** Minimum acceptable price, plus a required choice for Sept 15: donate to the Duke program / return to me ($ fee) / auto-reduce 20%. **Cannot book pickup until this is chosen.**
4. **Pickup + storage record.** Condition photos at pickup, "stored since May 29," storage fee stated in dollars.
5. **Seller dashboard.** Views, saves, offers, days listed, projected payout, countdown to the fallback date. Accept / counter an offer.
6. **Sold.** Payout breakdown: sale − commission − storage.

### Explicitly out of scope
Buyer storefront, real messaging, contracts, insurance, logistics.

### Scorecard
| | |
|---|---|
| **Value** | Sellers keep the upside and the decision; Relay earns without taking inventory risk. |
| **Effort** | ~10 h build. Most screens, most state (listing → stored → offer → sold). |
| **Complexity** | Highest. Three states of one item, a countdown, and a counter-offer interaction — and the dashboard must make "your stuff is safe" tangible through updates, not copy. |
| **Success signal** | Listing completion rate; **% who set a floor above the instant-offer price** (willingness to wait); which fallback they choose; offer response rate. |

### 90-second demo
List sofa → suggested $180–240 → set $220 → floor $150 → fallback "donate" → pickup booked → dashboard shows 14 views, 3 saves, offer of $180 → counter $200 → accepted → payout $172 after commission.

**Why this isn't A or B:** the seller keeps the item's upside and the risk; Relay is a warehouse plus a storefront, not a buyer.

---

## How we will read the class vote

| Result | What it tells us | What we do next |
|---|---|---|
| **A wins** | Sellers are the wedge; certainty beats price | Build buy-out, fix the door re-price, source inventory in May |
| **B wins** | Demand is the wedge; the date is the product | Build pre-sale, invest in inspection reports and delivery guarantees |
| **C wins** | Sellers want upside, not a payout | Build consignment; accept heavier ops and slower cash |
| **Split by persona** | One product will not serve all three | Pick the segment with the best unit economics, not the loudest vote |

**A split vote is a finding, not a failure.** Our discovery already suggests sellers and buyers want opposite things; if the room splits the same way, the hypothesis "one product for all three personas" is what we actually disproved this week.

---

## Build order and cuts

1. Hub page first — it frames all three and makes the vote legible.
2. **A** (smallest, highest-risk assumption), then **B**, then **C**.
3. Cut first if time runs short: C's counter-offer, B's room bundle, A's decline-with-reason.
4. Never cut: the door re-price (A), the inspection report (B), the fallback choice (C). Those three screens **are** the hypotheses.

**Total prototype effort: ~24 h.** No backend, no auth, no payments — browser-local state and a shared six-item catalog.
