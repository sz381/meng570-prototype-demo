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
  },
  {
    href: "/instant",
    index: "02",
    audience: "For sellers",
    name: "Relay Instant",
    line: "Sell it in one pickup.",
  },
  {
    href: "/ops",
    index: "03",
    audience: "For operations",
    name: "Relay Ops",
    line: "Stock in. Stock out.",
  },
];

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
        <section className="flex flex-col justify-between px-8 pb-10 pt-4 lg:px-12 lg:pb-12">
          <div>
            <h1 className="max-w-[13ch] text-[clamp(2.5rem,5.2vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.045em]">
              Three ways to cross the summer.
            </h1>
            <p className="mt-7 max-w-[36ch] text-[15px] leading-[1.65] text-[#5A6B82]">
              Students leave furniture in May. New students need it in August.
              Three prototypes, three bets on who carries it in between.
            </p>
          </div>

          <div className="mt-12">
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A6B82]">
              <span>May</span>
              <span className="h-px flex-1 bg-[#0B1728]/15" />
              <span>August</span>
            </div>
            <p className="mt-6 text-[13px] text-[#5A6B82]">
              Pick the one you&rsquo;d actually use.
            </p>
          </div>
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

                <span className="flex-1">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[#5A6B82] transition-colors duration-300 group-hover:text-white/55">
                    {p.audience}
                  </span>
                  <span className="mt-2.5 block text-[26px] font-medium tracking-[-0.025em] transition-colors duration-300 group-hover:text-white">
                    {p.name}
                  </span>
                  <span className="mt-1.5 block text-[13px] text-[#5A6B82] transition-colors duration-300 group-hover:text-white/65">
                    {p.line}
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
