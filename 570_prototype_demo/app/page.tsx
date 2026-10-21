import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const prototypes = [
  {
    href: "/reserve",
    index: "01",
    audience: "For buyers",
    name: "Relay Reserve",
    line: "Furnished before you land.",
    detail:
      "Browse pieces inspected in May, reserve before you fly, and pick a delivery window we guarantee in writing.",
  },
  {
    href: "/instant",
    index: "02",
    audience: "For sellers",
    name: "Relay Instant",
    line: "Sell it in one pickup.",
    detail:
      "Three photos, one offer, one pickup window. Paid at the door — and you can still walk away if the crew marks it down.",
  },
  {
    href: "/ops",
    index: "03",
    audience: "For operations",
    name: "Relay Ops",
    line: "Stock in. Stock out.",
    detail:
      "Every item from pickup to delivery: what came in, what is in storage, what is reserved, and what ships in August.",
  },
];

function SummerGap() {
  return (
    <div className="my-auto hidden md:block">
      <div className="relative h-[132px] w-full">
        {/* the line a piece of furniture travels */}
        <div className="absolute inset-x-0 top-[44px] h-px bg-[#0B1728]/12" />

        {/* the two ends of the year */}
        <div className="absolute left-0 top-[44px] h-3 w-px bg-[#0B1728]/25" />
        <div className="absolute right-0 top-[44px] h-3 w-px bg-[#0B1728]/25" />

        {/* storage: opaque, so the dot disappears behind it */}
        <div className="absolute left-1/2 top-[16px] z-10 flex h-14 w-[86px] -translate-x-1/2 items-center justify-center rounded-md border border-dashed border-[#0B1728]/20 bg-[#F5F7FA]">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#5A6B82]">
            Storage
          </span>
        </div>

        {/* the item itself */}
        <div className="relay-dot absolute top-[39px] z-0 size-[10px] rounded-[2px] bg-[#122A4E]" />

        <div className="absolute left-0 top-[84px]">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#0B1728]">
            May
          </div>
          <div className="mt-1 text-[10px] text-[#5A6B82]">picked up</div>
        </div>

        <div className="absolute left-1/2 top-[84px] -translate-x-1/2 text-center">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#0B1728]">
            12 weeks
          </div>
          <div className="mt-1 text-[10px] text-[#5A6B82]">held</div>
        </div>

        <div className="absolute right-0 top-[84px] text-right">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#0B1728]">
            August
          </div>
          <div className="mt-1 text-[10px] text-[#5A6B82]">delivered</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex h-svh w-full flex-col overflow-hidden bg-[#F5F7FA] text-[#0B1728] antialiased max-lg:overflow-y-auto">
      <header className="flex shrink-0 items-center justify-between px-8 py-6 lg:px-12">
        <div className="flex items-center gap-3">
          <Image
            src="/relay-logo.png"
            alt=""
            width={26}
            height={26}
            priority
            className="rounded-[7px]"
          />
          <span className="text-[15px] font-medium tracking-[-0.01em]">
            Relay
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A6B82]">
          MEng 570 · Team 6
        </span>
      </header>

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] lg:divide-x lg:divide-[#0B1728]/10">
        <section className="flex flex-col px-8 pb-10 pt-4 lg:px-12 lg:pb-12 mt-8">
          <div>
            <h1 className="text-[clamp(2.35rem,4.8vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              <span className="block">Sell in May.</span>
              <span className="block">Furnish in August.</span>
            </h1>
            <p className="mt-7 max-w-[38ch] text-[15px] leading-[1.65] text-[#5A6B82]">
              One class leaves, another arrives. Relay takes the furniture in
              between — pickup, twelve weeks in storage, delivery. Three
              prototypes, three bets on who should own it.
            </p>
          </div>

          <SummerGap />

          <p className="pt-10 text-[13px] text-[#5A6B82]">
            Pick the one you&rsquo;d actually use.
          </p>
        </section>

        <section className="flex flex-col max-lg:mt-10">
          <div className="flex items-center justify-between px-8 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A6B82] lg:px-10">
            <span>Prototypes</span>
            <span>03</span>
          </div>

          <nav className="flex flex-1 flex-col border-t border-[#0B1728]/10">
            {prototypes.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex flex-1 items-center gap-6 border-b border-[#0B1728]/10 px-8 transition-colors duration-300 last:border-b-0 hover:bg-[#122A4E] focus-visible:ring-2 focus-visible:ring-[#122A4E] focus-visible:ring-inset focus-visible:outline-none lg:px-10"
              >
                <span className="w-5 font-mono text-[10px] tracking-[0.18em] text-[#5A6B82] transition-colors duration-300 group-hover:text-[#F0A93B]">
                  {p.index}
                </span>

                <span className="relative flex-1">
                  <span className="flex w-fit items-center rounded-full bg-[#122A4E] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/85 transition-colors duration-300 group-hover:bg-white group-hover:text-[#122A4E]">
                    {p.audience}
                  </span>
                  <span className="mt-2.5 block text-[26px] font-medium tracking-[-0.025em] transition-colors duration-300 group-hover:text-white">
                    {p.name}
                  </span>
                  <span className="mt-1.5 block text-[13px] text-[#5A6B82] transition-colors duration-300 group-hover:text-white/50">
                    {p.line}
                  </span>

                  {/* folds out under the tagline — does not move the row */}
                  <span className="pointer-events-none absolute top-full left-0 mt-3 block max-w-[52ch] translate-y-1.5 text-[13px] leading-[1.55] text-white/75 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {p.detail}
                  </span>
                </span>

                <ArrowUpRight className="size-4 shrink-0 text-[#0B1728]/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
}
