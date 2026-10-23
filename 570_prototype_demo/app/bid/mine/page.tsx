"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AUCTIONS,
  closeAuctions,
  currentBid,
  resetBids,
  useBids,
} from "../_lib/auctions";

export default function MyBidsPage() {
  const { entries, closed } = useBids();
  const mine = AUCTIONS.filter((auction) => entries[auction.id]);

  return (
    <div className="h-full overflow-y-auto px-6 pt-[68px] pb-32">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
        {closed ? "Auctions closed" : "Open auctions"}
      </p>
      <h1 className="mt-2 text-[26px] font-medium tracking-[-0.03em]">My bids</h1>

      {mine.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-[#0B1728]/10 bg-white p-4">
          <p className="text-[13.5px] leading-relaxed text-[#33415A]">
            No bids yet. Set a max on a piece and we&rsquo;ll bid for you.
          </p>
          <Link
            href="/bid"
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-[#122A4E] px-4 text-[13px] font-medium text-white"
          >
            Browse auctions
          </Link>
        </div>
      ) : (
        <ul className="mt-5 space-y-2.5">
          {mine.map((auction) => {
            const entry = entries[auction.id];
            const won = entry.status === "winning";
            return (
              <li
                key={auction.id}
                className="rounded-2xl border border-[#0B1728]/10 bg-white p-3"
              >
                <div className="flex gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[#E8EDF3]">
                    <Image
                      src={auction.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-[14px] font-medium">{auction.name}</p>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-medium ${
                          won
                            ? "bg-[#1F8A5B]/12 text-[#1F8A5B]"
                            : "bg-[#F0A93B]/20 text-[#7A5415]"
                        }`}
                      >
                        {closed ? (won ? "Won" : "Lost") : won ? "Winning" : "Outbid"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12px] text-[#5A6B82]">
                      {closed && won
                        ? `You pay $${entry.price}`
                        : `Current $${currentBid(auction, entry)} · your max $${entry.max}`}
                    </p>
                  </div>
                </div>

                {closed ? (
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#33415A]">
                    {won
                      ? `Pay $${entry.price} and choose a delivery window. Delivery is included.`
                      : "Another student bid higher. You weren't charged."}
                  </p>
                ) : (
                  !won && (
                    <Link
                      href={`/bid/item/${auction.id}`}
                      className="mt-2.5 flex h-10 items-center justify-center rounded-lg bg-[#122A4E] text-[13px] font-medium text-white"
                    >
                      Raise your max
                    </Link>
                  )
                )}
              </li>
            );
          })}
        </ul>
      )}

      {mine.length > 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-[#0B1728]/20 p-3.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
            Demo controls
          </p>
          <div className="mt-2.5 flex gap-2">
            {!closed && (
              <button
                type="button"
                onClick={closeAuctions}
                className="h-10 flex-1 rounded-lg border border-[#0B1728]/15 text-[12.5px] font-medium transition-colors hover:bg-[#0B1728]/[0.04]"
              >
                Jump to auction close
              </button>
            )}
            <button
              type="button"
              onClick={resetBids}
              className="h-10 flex-1 rounded-lg text-[12.5px] text-[#5A6B82]"
            >
              Reset demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
