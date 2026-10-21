import Image from "next/image";
import Link from "next/link";
import { ITEMS } from "./_lib/items";

export default function ReserveHomePage() {
  const forYou = [ITEMS[0], ITEMS[2], ITEMS[1]];

  return (
    <div className="h-full overflow-y-auto pt-[64px] pb-32">
      <header className="flex items-center justify-between px-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
            Incoming · Fuqua
          </p>
          <h1 className="mt-1 text-[24px] font-medium tracking-[-0.03em]">
            Hi Ryan
          </h1>
        </div>
        <Link
          href="/reserve/me"
          className="flex size-9 items-center justify-center rounded-full bg-[#E4E9F1] text-[11px] font-medium text-[#122A4E]"
        >
          RS
        </Link>
      </header>

      <section className="mt-6 px-6">
        <div className="rounded-2xl bg-[#122A4E] p-5 text-white">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
            You land
          </p>
          <p className="mt-2 text-[34px] leading-none font-medium tracking-[-0.03em]">
            Aug 18
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">
            Everything below can be in your apartment by then.
          </p>
          <Link
            href="/reserve/market"
            className="mt-4 flex h-10 items-center justify-center rounded-lg bg-white text-[13px] font-medium text-[#122A4E] transition-colors hover:bg-white/90"
          >
            Browse the market
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-baseline justify-between px-6">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
            For you
          </h2>
          <Link href="/reserve/market" className="text-[11px] text-[#5A6B82]">
            See all
          </Link>
        </div>

        <div className="mt-3 flex gap-3 overflow-x-auto px-6 pb-1">
          {forYou.map((item) => (
            <Link
              key={item.id}
              href={`/reserve/item/${item.id}`}
              className="w-[136px] shrink-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#E8EDF3]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="136px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 truncate text-[12.5px] font-medium">
                {item.name}
              </p>
              <p className="text-[12px] text-[#5A6B82]">${item.price}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 px-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
          How it works
        </h2>
        <ol className="mt-3 space-y-3 text-[13px] text-[#33415A]">
          {[
            "Reserve now with a $20 refundable hold",
            "We store it until August and inspect it again",
            "Delivered to your apartment before you land",
          ].map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="font-mono text-[10px] text-[#9AA7B8]">
                0{index + 1}
              </span>
              <span className="leading-snug">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
