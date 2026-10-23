"use client";

import Image from "next/image";
import Link from "next/link";
import { AUCTIONS, bidCount, currentBid, useBids } from "./_lib/auctions";

const steps = [
  "Pick a piece we inspected in May",
  "Set your max. We bid for you, $5 at a time",
  "Win it and we deliver it in August",
];

export default function BidHomePage() {
  const { entries } = useBids();

  return (
    <div className="h-full overflow-y-auto px-6 pt-[68px] pb-32">
      <header className="flex items-center gap-2.5">
        <Image
          src="/relay-logo.png"
          alt=""
          width={28}
          height={28}
          priority
          className="rounded-[8px]"
        />
        <span className="text-[15px] font-medium tracking-[-0.01em]">Relay</span>
      </header>

      <h1 className="mt-8 text-[32px] leading-[1.05] font-medium tracking-[-0.035em]">
        Your price. Your move.
      </h1>
      <p className="mt-3 max-w-[32ch] text-[14px] leading-[1.6] text-[#5A6B82]">
        Bid on furniture inspected in May. You only pay what it takes to win.
      </p>

      <section className="mt-7">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
          Open auctions · {AUCTIONS.length}
        </h2>
        <ul className="mt-3 space-y-2.5">
          {AUCTIONS.map((auction) => {
            const entry = entries[auction.id];
            return (
              <li key={auction.id}>
                <Link
                  href={`/bid/item/${auction.id}`}
                  className="flex gap-3 rounded-2xl border border-[#0B1728]/10 bg-white p-2.5 transition-colors hover:border-[#0B1728]/25"
                >
                  <div className="relative size-[72px] shrink-0 overflow-hidden rounded-xl bg-[#E8EDF3]">
                    <Image
                      src={auction.image}
                      alt=""
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium">{auction.name}</p>
                    <p className="mt-0.5 text-[12px] text-[#5A6B82]">
                      Current bid{" "}
                      <span className="font-medium text-[#0B1728]">
                        ${currentBid(auction, entry)}
                      </span>{" "}
                      · {bidCount(auction, entry)} bids
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#9AA7B8]">
                      <span>Closes {auction.closes}</span>
                      {entry && (
                        <span
                          className={`rounded-full px-1.5 py-0.5 font-medium ${
                            entry.status === "winning"
                              ? "bg-[#1F8A5B]/12 text-[#1F8A5B]"
                              : "bg-[#F0A93B]/20 text-[#7A5415]"
                          }`}
                        >
                          {entry.status === "winning" ? "You're winning" : "Outbid"}
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
          How it works
        </h2>
        <ol className="mt-3.5 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] text-[#9AA7B8]">0{index + 1}</span>
              <span className="text-[13.5px] text-[#33415A]">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[12px] leading-relaxed text-[#5A6B82]">
          Every piece is photographed and graded. We don&rsquo;t resell
          mattresses.
        </p>
      </section>
    </div>
  );
}
