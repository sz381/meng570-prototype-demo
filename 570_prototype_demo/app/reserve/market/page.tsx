"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ITEMS, ROOMS } from "../_lib/items";

export default function MarketPage() {
  const [room, setRoom] = useState<(typeof ROOMS)[number]>("All");

  const list = ITEMS.filter((item) => room === "All" || item.room === room);

  return (
    <div className="h-full overflow-y-auto pt-[64px] pb-32">
      <header className="px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
          Market · {ITEMS.length} items
        </p>
        <h1 className="mt-2 text-[26px] leading-[1.1] font-medium tracking-[-0.03em]">
          Inspected in May.
          <br />
          Delivered in August.
        </h1>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#5A6B82]">
          Every piece is photographed and graded. We don&rsquo;t resell
          mattresses.
        </p>
      </header>

      <div className="mt-5 flex gap-1.5 overflow-x-auto px-6 pb-1">
        {ROOMS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRoom(value)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] transition-colors ${
              room === value
                ? "border-[#122A4E] bg-[#122A4E] text-white"
                : "border-[#0B1728]/12 bg-white text-[#33415A]"
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 px-6">
        {list.map((item) => (
          <Link key={item.id} href={`/reserve/item/${item.id}`} className="block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#E8EDF3]">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
              <span className="absolute top-2 left-2 rounded-full bg-white/90 px-1.5 py-0.5 font-mono text-[9px] font-medium tracking-[0.08em] text-[#122A4E] backdrop-blur">
                GRADE {item.grade}
              </span>
            </div>
            <p className="mt-2 truncate text-[13px] font-medium">{item.name}</p>
            <p className="text-[12px] text-[#5A6B82]">
              ${item.price} · delivered
            </p>
            <p className="mt-0.5 text-[10.5px] text-[#9AA7B8]">
              Arrives by Aug 20
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-6 px-6 text-[11px] leading-relaxed text-[#9AA7B8]">
        Prices include delivery. A $20 refundable hold reserves any item until
        you arrive.
      </p>
    </div>
  );
}
