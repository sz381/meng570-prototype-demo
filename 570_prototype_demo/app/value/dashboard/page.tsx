"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { useListing } from "../_lib/listing";
import type { Fallback } from "../_lib/listing";

const COMMISSION = 0.1;
const STORAGE_FEE = 8;
const DAYS_TO_FALLBACK = 63;
const FALLBACK_LABEL: Record<Fallback, string> = {
  donate: "Donate it",
  return: "Return it to me",
  auto: "Auto-reduce 20%",
};

type Phase = "open" | "passed" | "sold";

const round5 = (value: number) => Math.round(value / 5) * 5;
const net = (sale: number) =>
  Math.round(sale - sale * COMMISSION - STORAGE_FEE);

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-[17px] font-medium">{value}</p>
      <p className="mt-0.5 text-[10px] text-[#9AA7B8]">{label}</p>
    </div>
  );
}

function Primary({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-12 flex-1 rounded-xl bg-[#122A4E] text-[14px] font-medium text-white transition-colors hover:bg-[#0E2140] active:translate-y-px"
    >
      {children}
    </button>
  );
}

function Secondary({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-12 flex-1 rounded-xl border border-[#0B1728]/15 text-[14px] font-medium transition-colors hover:bg-[#0B1728]/[0.04] active:translate-y-px"
    >
      {children}
    </button>
  );
}

export default function DashboardPage() {
  const { listing, seeded } = useListing();
  const { category, price, floor, fallback, day } = listing;

  // one buyer offer, never below the seller's floor
  const offer = Math.min(price, Math.max(floor, round5(price - 40)));
  const canCounter = price - offer >= 10;
  // the buyer meets a counter up to the halfway point
  const meetsAt = round5(offer + (price - offer) / 2);

  const [phase, setPhase] = useState<Phase>("open");
  const [countering, setCountering] = useState(false);
  const [counter, setCounter] = useState<number | null>(null);
  const [soldAt, setSoldAt] = useState(offer);

  const counterValue = counter ?? meetsAt;

  function accept(value: number) {
    setSoldAt(value);
    setPhase("sold");
    setCountering(false);
  }

  function sendCounter() {
    if (counterValue <= meetsAt) {
      accept(counterValue);
    } else {
      setPhase("passed");
      setCountering(false);
    }
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 pt-[68px] pb-32">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
        {phase === "sold" ? "Sold" : "Listed · in storage"}
      </p>
      <h1 className="mt-2 text-[26px] font-medium tracking-[-0.03em]">
        Your listing
      </h1>

      <div className="mt-5 flex gap-3 rounded-2xl border border-[#0B1728]/10 bg-white p-3">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
          <Image src="/img/sofa.jpg" alt="" fill sizes="64px" className="object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-[14px] font-medium">{category}</p>
          <p className="mt-0.5 text-[12px] text-[#5A6B82]">
            Listed at ${price} · floor ${floor}
          </p>
          <p className="mt-1 text-[12px] text-[#5A6B82]">
            Stored since {day}
            {seeded ? " · example listing" : ""}
          </p>
        </div>
      </div>

      {phase !== "sold" && (
        <div className="mt-3 grid grid-cols-4 divide-x divide-[#0B1728]/8 rounded-2xl border border-[#0B1728]/10 bg-white py-4 text-center">
          <Stat value="14" label="views" />
          <Stat value="3" label="saves" />
          <Stat value="1" label="offer" />
          <Stat value={String(DAYS_TO_FALLBACK)} label="days to Sept 15" />
        </div>
      )}

      {phase !== "sold" && (
        <div className="mt-3 rounded-2xl border border-[#0B1728]/10 bg-white p-4 text-[13px]">
          <div className="flex justify-between py-1">
            <span className="text-[#5A6B82]">Projected payout at ${price}</span>
            <span className="font-medium text-[#1F8A5B]">${net(price)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#5A6B82]">If unsold on Sept 15</span>
            <span>{FALLBACK_LABEL[fallback]}</span>
          </div>
        </div>
      )}

      {phase === "open" && (
        <section className="mt-5">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
            New offer
          </h2>
          <div className="mt-2 rounded-2xl border border-[#122A4E]/30 bg-white p-4">
            <div className="flex items-end justify-between">
              <p className="text-[34px] leading-none font-medium tracking-[-0.03em]">
                ${offer}
              </p>
              <p className="text-[12px] text-[#5A6B82]">
                You&rsquo;d get ${net(offer)}
              </p>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-[#5A6B82]">
              From a student arriving Aug 18. Above your ${floor} floor.
            </p>

            {!countering ? (
              <div className="mt-4 flex gap-2">
                {canCounter && (
                  <Secondary onClick={() => setCountering(true)}>Counter</Secondary>
                )}
                <Primary onClick={() => accept(offer)}>Accept ${offer}</Primary>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex items-end justify-between">
                  <span className="text-[12px] text-[#5A6B82]">Your counter</span>
                  <span className="text-[26px] leading-none font-medium tracking-[-0.03em]">
                    ${counterValue}
                  </span>
                </div>
                <input
                  type="range"
                  min={offer + 5}
                  max={price}
                  step={5}
                  value={counterValue}
                  onChange={(event) => setCounter(Number(event.target.value))}
                  aria-label="Your counter-offer"
                  className="mt-3 w-full accent-[#122A4E]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#9AA7B8]">
                  <span>${offer + 5}</span>
                  <span>${price}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Secondary onClick={() => setCountering(false)}>Cancel</Secondary>
                  <Primary onClick={sendCounter}>Send ${counterValue}</Primary>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {phase === "passed" && (
        <section className="mt-5">
          <div className="rounded-2xl border border-[#F0A93B]/50 bg-[#F0A93B]/10 p-4">
            <p className="text-[14px] font-medium">They passed on ${counterValue}.</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[#7A5415]">
              Your ${offer} offer is still open for 48 hours. After that it goes
              back on the market at ${price}.
            </p>
            <div className="mt-4 flex gap-2">
              <Secondary onClick={() => setPhase("open")}>Counter again</Secondary>
              <Primary onClick={() => accept(offer)}>Accept ${offer}</Primary>
            </div>
          </div>
        </section>
      )}

      {phase === "sold" && (
        <section className="mt-5">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#1F8A5B]/12">
            <Check className="size-6 text-[#1F8A5B]" strokeWidth={2.6} />
          </div>
          <h2 className="mt-4 text-[28px] leading-[1.1] font-medium tracking-[-0.03em]">
            Sold for ${soldAt}.
          </h2>
          <p className="mt-2 text-[14px] leading-[1.6] text-[#5A6B82]">
            We deliver it before the buyer lands. Your payout is on its way.
          </p>

          <div className="mt-5 divide-y divide-[#0B1728]/8 rounded-2xl border border-[#0B1728]/10 bg-white px-4 text-[13px]">
            <div className="flex justify-between py-2.5">
              <span className="text-[#5A6B82]">Sale price</span>
              <span>${soldAt}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-[#5A6B82]">Commission (10%)</span>
              <span>−${Math.round(soldAt * COMMISSION)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-[#5A6B82]">Storage</span>
              <span>−${STORAGE_FEE}</span>
            </div>
            <div className="flex justify-between py-3 text-[15px] font-medium">
              <span>Your payout</span>
              <span className="text-[#1F8A5B]">${net(soldAt)}</span>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Secondary
              onClick={() => {
                setPhase("open");
                setCounter(null);
              }}
            >
              Replay
            </Secondary>
            <Link
              href="/value/sell"
              className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#122A4E] text-[14px] font-medium text-white transition-colors hover:bg-[#0E2140] active:translate-y-px"
            >
              List another item
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
