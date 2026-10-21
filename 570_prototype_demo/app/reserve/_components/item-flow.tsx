"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, MapPin } from "lucide-react";
import { BackButton } from "../../instant/_components/back-button";
import type { Item } from "../_lib/items";

type Step = "detail" | "delivery" | "pay" | "done";
type DeliveryWindow = "guaranteed" | "flexible";

const HOLD = 20;
const FLEX_DISCOUNT = 25;

function Rise({
  delay = 0,
  children,
  className = "",
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rise ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function ItemFlow({ item }: { item: Item }) {
  const [step, setStep] = useState<Step>("detail");
  const [address, setAddress] = useState("1200 Campus Walk Ave, Durham");
  const [editing, setEditing] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryWindow>("guaranteed");
  const [method, setMethod] = useState<"apple" | "card">("apple");
  const [paying, setPaying] = useState(false);

  const total = delivery === "flexible" ? item.price - FLEX_DISCOUNT : item.price;

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const mapSrc = token
    ? `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-78.9382,36.0014,15,0/780x420?access_token=${token}`
    : null;

  /* ── 1 · detail ─────────────────────────────────────────────────────── */
  if (step === "detail") {
    return (
      <div className="relative h-full">
        <div className="h-full overflow-y-auto pb-[190px]">
          <div className="relative aspect-[4/3] w-full bg-[#E8EDF3]">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="390px"
              priority
              className="object-cover"
            />
            <div className="absolute top-[62px] left-5">
              <BackButton href="/reserve/market" />
            </div>
          </div>

          <div className="px-6 pt-5">
            <Rise delay={140}>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#122A4E] px-2 py-[3px] font-mono text-[9px] tracking-[0.08em] text-white">
                  GRADE {item.grade}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6B82]">
                  Inspected May 28
                </span>
              </div>
            </Rise>

            <Rise delay={110}>
              <h1 className="mt-3 text-[26px] leading-[1.15] font-medium tracking-[-0.03em]">
                {item.name}
              </h1>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[22px] font-medium">${item.price}</span>
                <span className="text-[12.5px] text-[#5A6B82]">
                  delivered by Aug 20
                </span>
              </div>
            </Rise>

            <Rise delay={80} className="mt-5">
              <div className="rounded-2xl border border-[#0B1728]/10 bg-white p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
                  Inspection report
                </p>
                <div className="mt-3 space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-[#5A6B82]">Condition</span>
                    <span className="text-right">{item.note}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A6B82]">Inspected by</span>
                    <span>Marcus · May 28</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A6B82]">Stored in</span>
                    <span>Durham · climate controlled</span>
                  </div>
                </div>
                <p className="mt-3 border-t border-[#0B1728]/8 pt-3 text-[11.5px] leading-relaxed text-[#9AA7B8]">
                  Photos of the actual piece, taken at inspection. We don&rsquo;t
                  resell mattresses or anything stained.
                </p>
              </div>
            </Rise>

            <Rise delay={50} className="mt-3">
              <div className="rounded-2xl border border-[#0B1728]/10 bg-white p-4">
                <p className="text-[13px] font-medium">
                  In your apartment by Aug 20
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-[#5A6B82]">
                  Or delivery is free and we credit you $100. 48 hours to change
                  your mind after it arrives.
                </p>
              </div>
            </Rise>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#F5F7FA] via-[#F5F7FA] to-transparent px-6 pt-6 pb-[96px]">
          <Rise delay={0}>
            <button
              type="button"
              onClick={() => setStep("delivery")}
              className="h-[52px] w-full rounded-xl bg-[#122A4E] text-[15px] font-medium text-white transition-colors hover:bg-[#0E2140] active:translate-y-px"
            >
              Reserve for ${HOLD}
            </button>
            <p className="mt-2 text-center text-[10.5px] text-[#9AA7B8]">
              Refundable until Aug 10
            </p>
          </Rise>
        </div>
      </div>
    );
  }

  /* ── 2 · delivery ───────────────────────────────────────────────────── */
  if (step === "delivery") {
    return (
      <div className="relative h-full">
        <div className="h-full overflow-y-auto pb-[190px]">
          <div className="relative h-[200px] w-full overflow-hidden bg-[#E8EDF3]">
            {mapSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mapSrc}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
              />
            ) : null}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F5F7FA]/95 via-[#F5F7FA]/45 to-transparent" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#122A4E] shadow-[0_6px_16px_rgba(11,23,40,0.4)] ring-4 ring-white/70">
                <MapPin className="size-4 text-white" strokeWidth={2.2} />
              </span>
            </div>
            <div className="absolute top-[62px] left-5">
              <BackButton onClick={() => setStep("detail")} />
            </div>
            <p className="absolute right-2 bottom-1 text-[8px] text-[#5A6B82]/70">
              © Mapbox © OpenStreetMap
            </p>
          </div>

          <div className="px-6 pt-5">
            <Rise delay={120}>
              <h1 className="text-[24px] leading-[1.15] font-medium tracking-[-0.03em]">
                Where should we deliver?
              </h1>
            </Rise>

            <Rise delay={90} className="mt-4">
              <div className="flex items-start gap-3 rounded-2xl border border-[#0B1728]/10 bg-white p-3.5">
                <MapPin
                  className="mt-0.5 size-[18px] shrink-0 text-[#122A4E]"
                  strokeWidth={2}
                />
                <div className="min-w-0 flex-1">
                  {editing ? (
                    <input
                      autoFocus
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      onBlur={() => setEditing(false)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") setEditing(false);
                      }}
                      className="w-full bg-transparent text-[13.5px] outline-none"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="text-left text-[13.5px] leading-snug"
                    >
                      {address}
                    </button>
                  )}
                  <p className="mt-0.5 text-[11px] text-[#9AA7B8]">
                    Tap to change
                  </p>
                </div>
              </div>
            </Rise>

            <Rise delay={60} className="mt-5">
              <p className="text-[12px] text-[#5A6B82]">Delivery window</p>
              <div className="mt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => setDelivery("guaranteed")}
                  className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                    delivery === "guaranteed"
                      ? "border-[#122A4E] bg-[#122A4E]/5"
                      : "border-[#0B1728]/10 bg-white"
                  }`}
                >
                  <span>
                    <span className="block text-[13.5px] font-medium">
                      Guaranteed Aug 18–20
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-snug text-[#5A6B82]">
                      In your apartment before you land, or delivery is free.
                    </span>
                  </span>
                  <span className="shrink-0 text-[13px] font-medium">
                    ${item.price}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDelivery("flexible")}
                  className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                    delivery === "flexible"
                      ? "border-[#122A4E] bg-[#122A4E]/5"
                      : "border-[#0B1728]/10 bg-white"
                  }`}
                >
                  <span>
                    <span className="block text-[13.5px] font-medium">
                      Flexible Aug 20–27
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-snug text-[#5A6B82]">
                      Same piece, a week later. No date guarantee.
                    </span>
                  </span>
                  <span className="shrink-0 text-[13px] font-medium">
                    ${item.price - FLEX_DISCOUNT}
                  </span>
                </button>
              </div>
            </Rise>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#F5F7FA] via-[#F5F7FA] to-transparent px-6 pt-6 pb-[96px]">
          <Rise delay={0}>
            <button
              type="button"
              onClick={() => setStep("pay")}
              className="h-[52px] w-full rounded-xl bg-[#122A4E] text-[15px] font-medium text-white transition-colors hover:bg-[#0E2140] active:translate-y-px"
            >
              Continue
            </button>
          </Rise>
        </div>
      </div>
    );
  }

  /* ── 3 · pay ────────────────────────────────────────────────────────── */
  if (step === "pay") {
    return (
      <div className="relative h-full">
        <div className="h-full overflow-y-auto px-6 pt-[70px] pb-[190px]">
          <Rise delay={180}>
            <BackButton onClick={() => setStep("delivery")} />
          </Rise>

          <Rise delay={140}>
            <h1 className="mt-6 text-[24px] leading-[1.15] font-medium tracking-[-0.03em]">
              Pay the hold.
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-[#5A6B82]">
              ${HOLD} today reserves it. The rest is due on delivery.
            </p>
          </Rise>

          <Rise delay={100} className="mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
              Pay with
            </p>
            <div className="mt-2 space-y-2">
              <button
                type="button"
                onClick={() => setMethod("apple")}
                className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-colors ${
                  method === "apple"
                    ? "border-[#122A4E] bg-[#122A4E]/5"
                    : "border-[#0B1728]/10 bg-white"
                }`}
              >
                <span className="text-[13.5px] font-medium">Apple Pay</span>
                <span
                  className={`size-4 rounded-full border ${
                    method === "apple"
                      ? "border-[#122A4E] bg-[#122A4E]"
                      : "border-[#0B1728]/20"
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setMethod("card")}
                className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-colors ${
                  method === "card"
                    ? "border-[#122A4E] bg-[#122A4E]/5"
                    : "border-[#0B1728]/10 bg-white"
                }`}
              >
                <span className="text-[13.5px] font-medium">
                  Visa ending 4242
                </span>
                <span
                  className={`size-4 rounded-full border ${
                    method === "card"
                      ? "border-[#122A4E] bg-[#122A4E]"
                      : "border-[#0B1728]/20"
                  }`}
                />
              </button>
            </div>
          </Rise>

          <Rise delay={60} className="mt-6">
            <div className="rounded-2xl border border-[#0B1728]/10 bg-white p-4 text-[13px]">
              <div className="flex justify-between py-1">
                <span className="text-[#5A6B82]">{item.name}</span>
                <span>${item.price}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#5A6B82]">Delivery</span>
                <span>Included</span>
              </div>
              {delivery === "flexible" && (
                <div className="flex justify-between py-1">
                  <span className="text-[#5A6B82]">Flexible window</span>
                  <span>−${FLEX_DISCOUNT}</span>
                </div>
              )}
              <div className="my-2 h-px bg-[#0B1728]/8" />
              <div className="flex justify-between py-1 font-medium">
                <span>Today</span>
                <span>${HOLD}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#5A6B82]">On delivery</span>
                <span>${total - HOLD}</span>
              </div>
            </div>
          </Rise>

          <Rise delay={30} className="mt-3">
            <p className="text-[11.5px] leading-relaxed text-[#9AA7B8]">
              Refundable until Aug 10. After that, cancel and the hold comes
              back as Relay credit.
            </p>
          </Rise>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#F5F7FA] via-[#F5F7FA] to-transparent px-6 pt-6 pb-[96px]">
          <Rise delay={0}>
            <button
              type="button"
              disabled={paying}
              onClick={() => {
                setPaying(true);
                window.setTimeout(() => {
                  setPaying(false);
                  setStep("done");
                }, 1100);
              }}
              className={`h-[52px] w-full rounded-xl text-[15px] font-medium text-white transition-colors ${
                paying
                  ? "bg-[#122A4E]/50"
                  : "bg-[#122A4E] hover:bg-[#0E2140] active:translate-y-px"
              }`}
            >
              {paying ? "Processing…" : `Pay $${HOLD}`}
            </button>
          </Rise>
        </div>
      </div>
    );
  }

  /* ── 3 · done ───────────────────────────────────────────────────────── */
  return (
    <div className="flex h-full flex-col px-6 pt-[70px] pb-[110px]">
      <Rise delay={200}>
        <span className="flex size-12 items-center justify-center rounded-full bg-[#1F8A5B]/12">
          <Check className="size-6 text-[#1F8A5B]" strokeWidth={2.6} />
        </span>
      </Rise>

      <Rise delay={160}>
        <h1 className="mt-5 text-[30px] leading-[1.1] font-medium tracking-[-0.03em]">
          Reserved.
        </h1>
        <p className="mt-2 text-[14px] leading-[1.6] text-[#5A6B82]">
          {delivery === "guaranteed"
            ? "In your apartment by Aug 20. We'll text you the delivery window two days before."
            : "Arriving Aug 20–27. We'll text you the exact day."}
        </p>
      </Rise>

      <Rise delay={110} className="mt-6">
        <div className="rounded-2xl border border-[#0B1728]/10 bg-white p-4 text-[13px]">
          <div className="flex justify-between py-1">
            <span className="text-[#5A6B82]">Item</span>
            <span>{item.name}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#5A6B82]">Delivering to</span>
            <span className="max-w-[60%] text-right">{address}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#5A6B82]">Window</span>
            <span>{delivery === "guaranteed" ? "Aug 18–20" : "Aug 20–27"}</span>
          </div>
          <div className="my-2 h-px bg-[#0B1728]/8" />
          <div className="flex justify-between py-1">
            <span className="text-[#5A6B82]">Paid today</span>
            <span>${HOLD}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#5A6B82]">On delivery</span>
            <span>${total - HOLD}</span>
          </div>
        </div>
      </Rise>

      <Rise delay={70} className="mt-3">
        <p className="text-[11.5px] leading-relaxed text-[#9AA7B8]">
          Paid with {method === "apple" ? "Apple Pay" : "Visa ending 4242"}. The
          ${HOLD} is refundable until Aug 10.
        </p>
      </Rise>

      <div className="mt-auto space-y-2.5 pt-6">
        <Rise delay={0}>
          <Link
            href="/reserve/me"
            className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#122A4E] text-[15px] font-medium text-white transition-colors hover:bg-[#0E2140]"
          >
            View in Me
          </Link>
          <Link
            href="/reserve/market"
            className="mt-2.5 flex h-[52px] w-full items-center justify-center rounded-xl border border-[#0B1728]/15 text-[15px] font-medium transition-colors hover:bg-[#0B1728]/[0.04]"
          >
            Keep browsing
          </Link>
        </Rise>
      </div>
    </div>
  );
}
