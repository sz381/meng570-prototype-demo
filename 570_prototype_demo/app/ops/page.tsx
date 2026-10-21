"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  LayoutDashboard,
  PackagePlus,
  Truck,
  ArrowUpRight,
} from "lucide-react";

type Pickup = {
  id: string;
  time: string;
  item: string;
  seller: string;
  offer: number;
  image: string;
};

type Stocked = Pickup & {
  tag: string;
  since: string;
  list: number;
  status: "In storage" | "Reserved" | "Out for delivery";
};

const PICKUPS: Pickup[] = [
  { id: "p1", time: "9:00", item: "Velvet sofa", seller: "Allan W.", offer: 95, image: "/img/sofa.jpg" },
  { id: "p2", time: "10:30", item: "Writing desk", seller: "Priya N.", offer: 55, image: "/img/desk.jpg" },
  { id: "p3", time: "13:00", item: "Queen bed frame", seller: "Marcus L.", offer: 70, image: "/img/bed.jpg" },
];

const STOCK: Stocked[] = [
  { id: "s1", time: "—", item: "Six-drawer dresser", seller: "Jingyu L.", offer: 60, image: "/img/dresser.jpg", tag: "RLY-1041", since: "May 27", list: 130, status: "Reserved" },
  { id: "s2", time: "—", item: "Wooden stool", seller: "Nemo K.", offer: 20, image: "/img/chair.jpg", tag: "RLY-1040", since: "May 26", list: 45, status: "In storage" },
  { id: "s3", time: "—", item: "Velvet sofa", seller: "Dana R.", offer: 90, image: "/img/sofa.jpg", tag: "RLY-1039", since: "May 26", list: 220, status: "Out for delivery" },
];

const NAV = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Stock in", icon: PackagePlus, active: false },
  { label: "Inventory", icon: Boxes, active: false },
  { label: "Deliveries", icon: Truck, active: false },
];

function money(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function StatusPill({ status }: { status: Stocked["status"] }) {
  const styles: Record<Stocked["status"], string> = {
    "In storage": "bg-[#122A4E]/8 text-[#122A4E]",
    Reserved: "bg-[#F0A93B]/18 text-[#8A5A12]",
    "Out for delivery": "bg-[#1F8A5B]/12 text-[#1F6B47]",
  };

  return (
    <span className={`rounded-full px-2 py-[3px] text-[11px] font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function OpsPage() {
  const [pickups, setPickups] = useState<Pickup[]>(PICKUPS);
  const [stock, setStock] = useState<Stocked[]>(STOCK);

  function checkIn(pickup: Pickup) {
    setPickups((current) => current.filter((entry) => entry.id !== pickup.id));
    setStock((current) => [
      {
        ...pickup,
        tag: `RLY-${1042 + (STOCK.length - current.length)}`,
        since: "Today",
        list: Math.round(pickup.offer * 2.2),
        status: "In storage",
      },
      ...current,
    ]);
  }

  const inStorage = stock.length;
  const reserved = stock.filter((entry) => entry.status === "Reserved").length;

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[1440px]">
      {/* sidebar */}
      <aside className="sticky top-0 hidden h-svh w-[224px] shrink-0 flex-col border-r border-[#0B1728]/8 bg-white px-5 py-6 lg:flex">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/relay-logo.png" alt="" width={26} height={26} className="rounded-[7px]" />
          <span className="text-[14px] font-medium tracking-[-0.01em]">Relay Ops</span>
        </Link>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9AA7B8]">
          Workspace
        </p>

        <nav className="mt-3 space-y-1">
          {NAV.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                active
                  ? "bg-[#122A4E]/6 font-medium text-[#122A4E]"
                  : "text-[#5A6B82]"
              }`}
            >
              <Icon className="size-4" strokeWidth={1.8} />
              {label}
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#0B1728]/8 pt-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#E4E9F1] text-[11px] font-medium text-[#122A4E]">
              M
            </span>
            <div>
              <p className="text-[12.5px] font-medium">Mihir</p>
              <p className="text-[11px] text-[#9AA7B8]">Operations</p>
            </div>
          </div>
        </div>
      </aside>

      {/* main */}
      <main className="flex-1 px-6 py-7 lg:px-10">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
              Durham · May 28
            </p>
            <h1 className="mt-1.5 text-[26px] font-medium tracking-[-0.03em]">
              Today
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-[#0B1728]/10 bg-white px-2.5 py-1 text-[11px] text-[#5A6B82]">
              <span className="size-1.5 rounded-full bg-[#1F8A5B]" />
              Live
            </span>
            <Link
              href="/"
              className="flex items-center gap-1 rounded-full border border-[#0B1728]/10 bg-white px-2.5 py-1 text-[11px] text-[#5A6B82] transition-colors hover:text-[#122A4E]"
            >
              All prototypes
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </header>

        {/* KPIs */}
        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "In storage", value: `${inStorage}`, sub: "items held" },
            { label: "Reserved", value: `${reserved}`, sub: "for August" },
            { label: "Pickups today", value: `${pickups.length}`, sub: "on the route" },
            { label: "Contribution", value: "$18,420", sub: "since May" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-[#0B1728]/8 bg-white px-4 py-3.5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9AA7B8]">
                {kpi.label}
              </p>
              <p className="mt-2 text-[26px] leading-none font-medium tracking-[-0.03em]">
                {kpi.value}
              </p>
              <p className="mt-1 text-[11px] text-[#9AA7B8]">{kpi.sub}</p>
            </div>
          ))}
        </section>

        <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-[1.45fr_1fr]">
          {/* stock in */}
          <section className="rounded-2xl border border-[#0B1728]/8 bg-white">
            <div className="flex items-center justify-between px-4 pt-4">
              <h2 className="text-[14px] font-medium">Stock in — today</h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9AA7B8]">
                {pickups.length} left
              </span>
            </div>

            <div className="mt-3">
              <div className="grid grid-cols-[56px_1fr_84px_76px] gap-3 border-b border-[#0B1728]/8 px-4 pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA7B8]">
                <span>Time</span>
                <span>Item</span>
                <span className="text-right">Offer</span>
                <span className="text-right">Action</span>
              </div>

              {pickups.map((pickup) => (
                <div
                  key={pickup.id}
                  className="grid grid-cols-[56px_1fr_84px_76px] items-center gap-3 border-b border-[#0B1728]/6 px-4 py-2.5 last:border-b-0"
                >
                  <span className="font-mono text-[12px] text-[#5A6B82]">
                    {pickup.time}
                  </span>
                  <span className="flex items-center gap-2.5">
                    <span className="relative size-8 shrink-0 overflow-hidden rounded-md bg-[#E8EDF3]">
                      <Image src={pickup.image} alt="" fill sizes="32px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium">
                        {pickup.item}
                      </span>
                      <span className="block text-[11px] text-[#9AA7B8]">
                        {pickup.seller}
                      </span>
                    </span>
                  </span>
                  <span className="text-right text-[13px]">{money(pickup.offer)}</span>
                  <span className="text-right">
                    <button
                      type="button"
                      onClick={() => checkIn(pickup)}
                      className="rounded-lg bg-[#122A4E] px-2.5 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-[#0E2140]"
                    >
                      Check in
                    </button>
                  </span>
                </div>
              ))}

              {pickups.length === 0 && (
                <p className="px-4 py-8 text-center text-[12.5px] text-[#9AA7B8]">
                  Route complete. Everything is in storage.
                </p>
              )}
            </div>
          </section>

          {/* stock out */}
          <section className="rounded-2xl border border-[#0B1728]/8 bg-white">
            <div className="flex items-center justify-between px-4 pt-4">
              <h2 className="text-[14px] font-medium">Stock out — August</h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9AA7B8]">
                Week 1
              </span>
            </div>

            <div className="mt-3 space-y-2 px-4 pb-4">
              {[
                { day: "Aug 18", orders: 12, note: "Guaranteed window" },
                { day: "Aug 19", orders: 9, note: "Guaranteed window" },
                { day: "Aug 22", orders: 6, note: "Flexible window" },
              ].map((day) => (
                <div
                  key={day.day}
                  className="flex items-center justify-between rounded-xl border border-[#0B1728]/8 px-3 py-2.5"
                >
                  <div>
                    <p className="text-[13px] font-medium">{day.day}</p>
                    <p className="text-[11px] text-[#9AA7B8]">{day.note}</p>
                  </div>
                  <p className="text-[13px] text-[#5A6B82]">{day.orders} orders</p>
                </div>
              ))}

              <div className="rounded-xl bg-[#122A4E] px-3 py-3 text-white">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                  At risk
                </p>
                <p className="mt-1 text-[13px]">
                  3 items not yet reserved for August
                </p>
                <p className="mt-0.5 text-[11px] text-white/50">
                  Sept 15 fallback applies
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* inventory */}
        <section className="mt-5 rounded-2xl border border-[#0B1728]/8 bg-white">
          <div className="flex items-center justify-between px-4 pt-4">
            <h2 className="text-[14px] font-medium">In storage</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9AA7B8]">
              {stock.length} items
            </span>
          </div>

          <div className="mt-3 overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[1fr_88px_84px_84px_92px_140px] gap-3 border-b border-[#0B1728]/8 px-4 pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA7B8]">
                <span>Item</span>
                <span>Tag</span>
                <span className="text-right">Cost</span>
                <span className="text-right">List</span>
                <span className="text-right">Margin</span>
                <span className="text-right">Status</span>
              </div>

              {stock.map((entry) => (
                <div
                  key={entry.id}
                  className="grid grid-cols-[1fr_88px_84px_84px_92px_140px] items-center gap-3 border-b border-[#0B1728]/6 px-4 py-2.5 last:border-b-0"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="relative size-8 shrink-0 overflow-hidden rounded-md bg-[#E8EDF3]">
                      <Image src={entry.image} alt="" fill sizes="32px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium">
                        {entry.item}
                      </span>
                      <span className="block text-[11px] text-[#9AA7B8]">
                        {entry.seller} · in since {entry.since}
                      </span>
                    </span>
                  </span>
                  <span className="font-mono text-[11.5px] text-[#5A6B82]">
                    {entry.tag}
                  </span>
                  <span className="text-right text-[12.5px] text-[#5A6B82]">
                    {money(entry.offer)}
                  </span>
                  <span className="text-right text-[12.5px]">{money(entry.list)}</span>
                  <span className="text-right text-[12.5px] font-medium text-[#1F6B47]">
                    {money(entry.list - entry.offer)}
                  </span>
                  <span className="text-right">
                    <StatusPill status={entry.status} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <p className="mt-4 pb-2 text-[11px] text-[#9AA7B8]">
          Prototype data. Checking in a pickup moves it into storage and updates
          the counts above.
        </p>
      </main>
    </div>
  );
}
