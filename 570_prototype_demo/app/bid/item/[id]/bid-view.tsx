"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { BackButton } from "../../_components/back-button";
import {
  INCREMENT,
  bidCount,
  currentBid,
  placeBid,
  useBids,
} from "../../_lib/auctions";
import type { Auction } from "../../_lib/auctions";

export function BidView({ auction }: { auction: Auction }) {
  const { entries, closed } = useBids();
  const entry = entries[auction.id];
  const current = currentBid(auction, entry);
  const minBid = current + INCREMENT;

  const [draft, setDraft] = useState<number | null>(null);
  const [placing, setPlacing] = useState(false);

  const value = Math.max(draft ?? current + 2 * INCREMENT, minBid);
  const winning = entry?.status === "winning";

  function submit() {
    setPlacing(true);
    window.setTimeout(() => {
      placeBid(auction, value);
      setDraft(null);
      setPlacing(false);
    }, 1100);
  }

  return (
    <div className="h-full overflow-y-auto pb-32">
      <div className="relative aspect-[4/3] w-full bg-[#E8EDF3]">
        <Image
          src={auction.image}
          alt=""
          fill
          sizes="390px"
          priority
          className="object-cover"
        />
        <div className="absolute top-[62px] left-6">
          <BackButton href="/bid" />
        </div>
        <span className="absolute right-4 bottom-3 rounded-full bg-white/90 px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.08em] text-[#122A4E] backdrop-blur">
          GRADE {auction.grade}
        </span>
      </div>

      <div className="px-6 pt-5">
        <h1 className="text-[26px] leading-[1.1] font-medium tracking-[-0.03em]">
          {auction.name}
        </h1>
        <p className="mt-1 text-[13px] text-[#5A6B82]">
          {auction.note} · inspected May 28
        </p>

        <div className="mt-5 grid grid-cols-3 divide-x divide-[#0B1728]/8 rounded-2xl border border-[#0B1728]/10 bg-white py-3.5 text-center">
          <div>
            <p className="text-[19px] font-medium">${current}</p>
            <p className="mt-0.5 text-[10px] text-[#9AA7B8]">current bid</p>
          </div>
          <div>
            <p className="text-[19px] font-medium">{bidCount(auction, entry)}</p>
            <p className="mt-0.5 text-[10px] text-[#9AA7B8]">bids</p>
          </div>
          <div>
            <p className="text-[19px] font-medium">{auction.closes}</p>
            <p className="mt-0.5 text-[10px] text-[#9AA7B8]">closes</p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-[#0B1728]/10 bg-white p-3.5 text-[12.5px] leading-relaxed text-[#33415A]">
          <p>
            <span
              className={`mr-1.5 rounded-full px-1.5 py-0.5 text-[10.5px] font-medium ${
                auction.floorMet
                  ? "bg-[#1F8A5B]/12 text-[#1F8A5B]"
                  : "bg-[#0B1728]/6 text-[#5A6B82]"
              }`}
            >
              {auction.floorMet ? "Floor met" : "Floor not met"}
            </span>
            {auction.floorMet
              ? "The seller's minimum is covered, so this will sell."
              : "It only sells if bids reach the seller's hidden minimum."}
          </p>
          <p className="mt-2 text-[#5A6B82]">
            Similar pieces sold for ${auction.similar[0]}–${auction.similar[1]}.
            Delivery is included, and you choose a window after you win.
          </p>
        </div>

        {closed ? (
          <p className="mt-5 rounded-2xl bg-[#0B1728]/5 p-4 text-[13px] text-[#33415A]">
            This auction has closed.{" "}
            <Link href="/bid/mine" className="font-medium underline">
              See the result
            </Link>
          </p>
        ) : winning ? (
          <div className="mt-5 rounded-2xl border border-[#1F8A5B]/40 bg-[#1F8A5B]/8 p-4">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[#1F8A5B]">
              <Check className="size-4" strokeWidth={2.6} />
              You&rsquo;re the high bidder at ${entry.price}
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-[#33415A]">
              Your max of ${entry.max} stays hidden. We&rsquo;ll bid for you if
              someone goes higher, and you never pay more than it takes to win.
            </p>
            <Link
              href="/bid/mine"
              className="mt-3 flex h-11 items-center justify-center rounded-xl bg-[#122A4E] text-[14px] font-medium text-white"
            >
              View my bids
            </Link>
          </div>
        ) : (
          <div className="mt-5">
            {entry?.status === "outbid" && (
              <div className="mb-4 rounded-2xl border border-[#F0A93B]/50 bg-[#F0A93B]/10 p-4 text-[13px] leading-relaxed text-[#7A5415]">
                <p className="font-medium">You were outbid.</p>
                <p className="mt-1">
                  Another student went to ${entry.price}. Your max of ${entry.max}{" "}
                  wasn&rsquo;t enough. Raise it to get back in.
                </p>
              </div>
            )}

            <p className="text-[12px] text-[#5A6B82]">Your max bid</p>
            <div className="mt-2 flex items-center justify-between rounded-2xl border border-[#0B1728]/10 bg-white p-2">
              <button
                type="button"
                aria-label="Lower your max bid"
                disabled={value <= minBid || placing}
                onClick={() => setDraft(Math.max(minBid, value - INCREMENT))}
                className="flex size-11 items-center justify-center rounded-xl bg-[#0B1728]/5 text-[#0B1728] transition-colors hover:bg-[#0B1728]/10 disabled:opacity-35"
              >
                <Minus className="size-4" strokeWidth={2.2} />
              </button>
              <span className="text-[34px] leading-none font-medium tracking-[-0.03em]">
                ${value}
              </span>
              <button
                type="button"
                aria-label="Raise your max bid"
                disabled={placing}
                onClick={() => setDraft(value + INCREMENT)}
                className="flex size-11 items-center justify-center rounded-xl bg-[#0B1728]/5 text-[#0B1728] transition-colors hover:bg-[#0B1728]/10 disabled:opacity-35"
              >
                <Plus className="size-4" strokeWidth={2.2} />
              </button>
            </div>
            <div className="mt-2 flex gap-1.5">
              {[10, 20, 40].map((extra) => (
                <button
                  key={extra}
                  type="button"
                  disabled={placing}
                  onClick={() => setDraft(current + extra)}
                  className="flex-1 rounded-full border border-[#0B1728]/12 bg-white py-1.5 text-[12px] text-[#33415A] transition-colors hover:border-[#0B1728]/25 disabled:opacity-35"
                >
                  +${extra}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-[#5A6B82]">
              We bid for you, ${INCREMENT} at a time, up to your max. The
              minimum bid is ${minBid}.
            </p>

            <button
              type="button"
              disabled={placing}
              onClick={submit}
              className="mt-4 h-[52px] w-full rounded-xl bg-[#122A4E] text-[15px] font-medium text-white transition-all hover:bg-[#0E2140] active:translate-y-px disabled:bg-[#122A4E]/60"
            >
              {placing ? "Placing your bid…" : `Place bid · max $${value}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
