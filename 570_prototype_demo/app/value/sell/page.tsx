"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Locate, MapPin } from "lucide-react";
import { BackButton } from "../_components/back-button";
import { saveListing } from "../_lib/listing";
import type { Fallback } from "../_lib/listing";

type Step = "describe" | "price" | "terms" | "pickup" | "listed" | "rejected";


const CATEGORIES = ["Sofa", "Desk", "Chair", "Bed frame", "Dresser", "Mattress"];
const DAYS = ["Wed 28", "Thu 29", "Fri 30"];
const WINDOWS = ["9–11", "11–1", "1–3"];

const ASK = 220;
const FLOOR = 150;
const RANGE = { low: 180, high: 240 };
const STORAGE_FEE = 8;
const FALLBACKS = [
  { key: "donate" as Fallback, title: "Donate it", sub: "To a Duke program, free" },
  { key: "return" as Fallback, title: "Return it to me", sub: "$45 handling" },
  { key: "auto" as Fallback, title: "Auto-reduce 20%", sub: "We relist it and try again" },
];

/* ── building blocks ─────────────────────────────────────────────────── */

function Rise({
  delay = 0,
  children,
  className = "",
}: {
  delay?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rise ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Primary({
  children,
  disabled = false,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`h-[52px] w-full rounded-xl text-[15px] font-medium text-white transition-all ${
        disabled
          ? "bg-[#122A4E]/30"
          : "bg-[#122A4E] hover:bg-[#0E2140] active:translate-y-px"
      }`}
    >
      {children}
    </button>
  );
}

function Chip({
  active,
  children,
  onClick,
  className = "",
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-[13px] transition-colors ${
        active
          ? "border-[#122A4E] bg-[#122A4E] text-white"
          : "border-[#0B1728]/12 bg-white text-[#33415A] hover:border-[#0B1728]/25"
      } ${className}`}
    >
      {children}
    </button>
  );
}


/* ── map helpers ─────────────────────────────────────────────────────── */

const ZOOM = 15;
const TILE = 256;

function project(lng: number, lat: number, z: number) {
  const scale = 2 ** z;
  const x = ((lng + 180) / 360) * scale;
  const rad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * scale;
  return { x, y };
}

/* ── the flow ────────────────────────────────────────────────────────── */

export default function SellPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("describe");
  const [photos, setPhotos] = useState<number[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [wear, setWear] = useState<boolean | null>(null);

  const [price, setPrice] = useState(ASK);
  const [floor, setFloor] = useState(FLOOR);
  const [fallback, setFallback] = useState<Fallback | null>(null);

  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const [coords, setCoords] = useState({ lat: 36.0014, lng: -78.9382 });
  const [address, setAddress] = useState("1200 Campus Walk Ave, Durham");
  const [editingAddress, setEditingAddress] = useState(false);
  const [sheetFrac, setSheetFrac] = useState(0.58);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ y: number; frac: number; h: number } | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const canDescribe = photos.length === 3 && category !== null && wear !== null;
  const canPickup = day !== null && time !== null;
  const canBook = fallback !== null;
  const sitting = price > RANGE.high;
  const floorMax = price;

  function restart() {
    setPhotos([]);
    setCategory(null);
    setWear(null);
    setPrice(ASK);
    setFloor(FLOOR);
    setFallback(null);
    setDay(null);
    setTime(null);
    setSheetFrac(0.58);
    setStep("describe");
  }

  function togglePhoto(index: number) {
    setPhotos((current) =>
      current.includes(index)
        ? current.filter((value) => value !== index)
        : [...current, index]
    );
  }

  /* ── 1 · describe ──────────────────────────────────────────────────── */
  if (step === "describe") {
    return (
      <div className="flex h-full flex-col px-6 pt-[62px] pb-[104px]">
        <Rise delay={260}>
          <BackButton href="/value" />
        </Rise>

        <Rise delay={210}>
          <h1 className="mt-7 text-[28px] leading-[1.1] font-medium tracking-[-0.03em]">
            What are you selling?
          </h1>
        </Rise>
        <Rise delay={170}>
          <p className="mt-2 text-[14px] text-[#5A6B82]">
            Three photos and we&rsquo;ll suggest a price range.
          </p>
        </Rise>

        <Rise delay={130} className="mt-7">
          <div className="grid grid-cols-3 gap-2.5">
            {["Front", "Any wear", "Close-up"].map((label, index) => {
              const filled = photos.includes(index);
              return (
                <div key={label}>
                  <button
                    type="button"
                    onClick={() => togglePhoto(index)}
                    className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border transition-colors ${
                      filled
                        ? "border-transparent"
                        : "border-dashed border-[#0B1728]/20 bg-white/40 text-[18px] text-[#9AA7B8]"
                    }`}
                  >
                    {filled ? (
                      <>
                        <Image
                          src="/img/sofa.jpg"
                          alt=""
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                        <span className="absolute right-1.5 bottom-1.5 flex size-5 items-center justify-center rounded-full bg-[#122A4E] text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                      </>
                    ) : (
                      "+"
                    )}
                  </button>
                  <p className="mt-1.5 text-center text-[10px] text-[#9AA7B8]">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </Rise>

        <Rise delay={90} className="mt-6">
          <p className="text-[12px] text-[#5A6B82]">What is it?</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CATEGORIES.map((item) => (
              <Chip
                key={item}
                active={category === item}
                onClick={() => {
                  if (item === "Mattress") {
                    setCategory(item);
                    setStep("rejected");
                    return;
                  }
                  setCategory(item);
                }}
              >
                {item}
              </Chip>
            ))}
          </div>
        </Rise>

        <Rise delay={50} className="mt-5">
          <p className="text-[12px] text-[#5A6B82]">
            Any stains, tears, or wobbles?
          </p>
          <div className="mt-2 flex gap-1.5">
            <Chip active={wear === false} onClick={() => setWear(false)}>
              No
            </Chip>
            <Chip active={wear === true} onClick={() => setWear(true)}>
              Yes
            </Chip>
          </div>
        </Rise>

        <div className="mt-auto pt-6">
          <Rise delay={0}>
            <Primary
              disabled={!canDescribe}
              onClick={() => setStep("price")}
            >
              Set my price
            </Primary>
          </Rise>
        </div>
      </div>
    );
  }

  /* ── rejected ──────────────────────────────────────────────────────── */
  if (step === "rejected") {
    return (
      <div className="flex h-full flex-col px-6 pt-[62px] pb-[104px]">
        <Rise delay={220}>
          <BackButton
            onClick={() => {
              setCategory(null);
              setStep("describe");
            }}
          />
        </Rise>

        <Rise delay={160}>
          <h1 className="mt-7 text-[28px] leading-[1.1] font-medium tracking-[-0.03em]">
            We don&rsquo;t take mattresses.
          </h1>
        </Rise>
        <Rise delay={120}>
          <p className="mt-3 text-[14px] leading-[1.6] text-[#5A6B82]">
            We only resell things we can inspect and guarantee. A mattress
            can&rsquo;t pass that bar.
          </p>
        </Rise>

        <Rise delay={60} className="mt-7 space-y-2.5">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-2xl border border-[#0B1728]/10 bg-white p-4 text-left"
          >
            <span>
              <span className="block text-[14px] font-medium">
                Find a donation drop-off
              </span>
              <span className="mt-0.5 block text-[12px] text-[#5A6B82]">
                Two sites within 3 miles of Duke
              </span>
            </span>
            <span className="text-[#9AA7B8]">→</span>
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-2xl border border-[#0B1728]/10 bg-white p-4 text-left"
          >
            <span>
              <span className="block text-[14px] font-medium">
                Book a junk pickup
              </span>
              <span className="mt-0.5 block text-[12px] text-[#5A6B82]">
                Around $45–70, we can call for you
              </span>
            </span>
            <span className="text-[#9AA7B8]">→</span>
          </button>
        </Rise>

        <div className="mt-auto pt-6">
          <Rise delay={0}>
            <button
              type="button"
              onClick={() => {
                setCategory(null);
                setStep("describe");
              }}
              className="h-[52px] w-full rounded-xl border border-[#0B1728]/15 text-[15px] font-medium"
            >
              Sell something else
            </button>
          </Rise>
        </div>
      </div>
    );
  }

  /* ── 2 · price ─────────────────────────────────────────────────────── */
  if (step === "price") {
    return (
      <div className="flex h-full flex-col px-6 pt-[62px] pb-[104px]">
        <Rise delay={200}>
          <BackButton onClick={() => setStep("describe")} />
        </Rise>

        <Rise delay={150}>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
            {category} · {wear ? "some wear" : "no wear"}
          </p>
        </Rise>
        <Rise delay={120}>
          <h1 className="mt-2 text-[28px] leading-[1.1] font-medium tracking-[-0.03em]">
            Set your price.
          </h1>
        </Rise>
        <Rise delay={90}>
          <p className="mt-2 text-[14px] text-[#5A6B82]">
            Similar {category?.toLowerCase()}s sold for ${RANGE.low}–${RANGE.high}.
          </p>
        </Rise>

        <Rise delay={60} className="mt-8">
          <div className="flex items-end justify-between">
            <span className="text-[12px] text-[#5A6B82]">Your asking price</span>
            <span className="text-[40px] leading-none font-medium tracking-[-0.035em]">
              ${price}
            </span>
          </div>
          <input
            type="range"
            min={120}
            max={300}
            step={5}
            value={price}
            onChange={(event) => {
              const next = Number(event.target.value);
              setPrice(next);
              setFloor((current) => Math.min(current, next));
            }}
            aria-label="Asking price"
            className="mt-4 w-full accent-[#122A4E]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-[#9AA7B8]">
            <span>$120</span>
            <span>$300</span>
          </div>
        </Rise>

        <Rise delay={30} className="mt-5">
          <div
            className={`rounded-2xl border p-3.5 text-[12.5px] leading-relaxed ${
              sitting
                ? "border-[#F0A93B]/50 bg-[#F0A93B]/10 text-[#7A5415]"
                : "border-[#0B1728]/10 bg-white text-[#33415A]"
            }`}
          >
            {sitting
              ? `Likely to sit. Pieces priced above $${RANGE.high} rarely sell before September.`
              : price < RANGE.low
                ? `Below the usual range. It will probably sell fast, but you may be leaving money behind.`
                : `Inside the range. Pieces priced here usually find a buyer by mid-August.`}
          </div>
        </Rise>

        <div className="mt-auto pt-6">
          <Rise delay={0}>
            <Primary onClick={() => setStep("terms")}>Continue</Primary>
          </Rise>
        </div>
      </div>
    );
  }

  /* ── 3 · floor and fallback ────────────────────────────────────────── */
  if (step === "terms") {
    return (
      <div className="flex h-full flex-col overflow-y-auto px-6 pt-[62px] pb-[104px]">
        <Rise delay={200}>
          <BackButton onClick={() => setStep("price")} />
        </Rise>

        <Rise delay={150}>
          <h1 className="mt-7 text-[28px] leading-[1.1] font-medium tracking-[-0.03em]">
            Set your floor.
          </h1>
        </Rise>
        <Rise delay={110}>
          <p className="mt-2 text-[14px] leading-[1.6] text-[#5A6B82]">
            We never show you an offer below this.
          </p>
        </Rise>

        <Rise delay={80} className="mt-6">
          <div className="flex items-end justify-between">
            <span className="text-[12px] text-[#5A6B82]">Lowest price you&rsquo;d take</span>
            <span className="text-[34px] leading-none font-medium tracking-[-0.03em]">
              ${Math.min(floor, floorMax)}
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={floorMax}
            step={5}
            value={Math.min(floor, floorMax)}
            onChange={(event) => setFloor(Number(event.target.value))}
            aria-label="Lowest price you would take"
            className="mt-4 w-full accent-[#122A4E]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-[#9AA7B8]">
            <span>$100</span>
            <span>${floorMax} (your price)</span>
          </div>
        </Rise>

        <Rise delay={50} className="mt-6">
          <p className="text-[12px] text-[#5A6B82]">
            If it hasn&rsquo;t sold by Sept 15 <span className="text-[#B42318]">*</span>
          </p>
          <div className="mt-2 space-y-2">
            {FALLBACKS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setFallback(option.key)}
                aria-pressed={fallback === option.key}
                className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors ${
                  fallback === option.key
                    ? "border-[#122A4E] bg-[#122A4E]/5"
                    : "border-[#0B1728]/10 bg-white"
                }`}
              >
                <span>
                  <span className="block text-[13.5px] font-medium">
                    {option.title}
                  </span>
                  <span className="block text-[11.5px] text-[#5A6B82]">
                    {option.sub}
                  </span>
                </span>
                <span
                  className={`size-4 rounded-full border ${
                    fallback === option.key
                      ? "border-[#122A4E] bg-[#122A4E]"
                      : "border-[#0B1728]/20"
                  }`}
                />
              </button>
            ))}
          </div>
        </Rise>

        <div className="mt-auto pt-6">
          <Rise delay={0}>
            <Primary disabled={!canBook} onClick={() => setStep("pickup")}>
              Book pickup
            </Primary>
            {!canBook && (
              <p className="mt-2 text-center text-[11px] text-[#9AA7B8]">
                Choose what happens on Sept 15 to book a pickup.
              </p>
            )}
          </Rise>
        </div>
      </div>
    );
  }

  /* ── 3 · pickup ────────────────────────────────────────────────────── */
  if (step === "pickup") {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const mapSrc = token
      ? `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${coords.lng},${coords.lat},16,0/780x912?access_token=${token}`
      : null;

    const collapsed = sheetFrac < 0.51;

    function locate() {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setAddress("Current location");
        },
        () => setAddress("Location unavailable")
      );
    }

    return (
      <div ref={frameRef} className="relative h-full">
        {/* map */}
        <div className="absolute inset-x-0 top-0 h-[64%] overflow-hidden bg-[#E8EDF3]">
          {mapSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={mapSrc}
              src={mapSrc}
              alt=""
              draggable={false}
              className="h-full w-full object-cover"
            />
          ) : null}

          <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#122A4E] shadow-[0_8px_20px_rgba(11,23,40,0.45)] ring-4 ring-white/70">
              <MapPin className="size-5 text-white" strokeWidth={2.2} />
            </span>
            <span className="-mt-1 size-2.5 rotate-45 bg-[#122A4E]" />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F5F7FA]/95 via-[#F5F7FA]/45 to-transparent" />

          <div className="absolute top-[62px] left-6">
            <BackButton
              onClick={() => setStep("terms")}
            />
          </div>

          <button
            type="button"
            onClick={locate}
            aria-label="Use my location"
            className="absolute right-5 bottom-5 flex size-10 items-center justify-center rounded-full border border-[#0B1728]/8 bg-white/95 text-[#33415A] shadow-[0_4px_14px_-4px_rgba(11,23,40,0.3)] backdrop-blur transition-all hover:bg-white active:scale-95"
          >
            <Locate className="size-[18px]" strokeWidth={2} />
          </button>

          <p className="absolute right-2 bottom-1 text-[8px] text-[#5A6B82]/70">
            © Mapbox © OpenStreetMap
          </p>
        </div>

        {/* drawer */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 overflow-hidden rounded-t-[28px] bg-[#F5F7FA] shadow-[0_-10px_34px_-14px_rgba(11,23,40,0.35)]"
          style={{
            height: `${sheetFrac * 100}%`,
            transition: dragging
              ? "none"
              : "height 320ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="touch-none px-6 pt-2.5 pb-1"
            onPointerDown={(event) => {
              dragStart.current = {
                y: event.clientY,
                frac: sheetFrac,
                h: frameRef.current?.clientHeight ?? 844,
              };
              setDragging(true);
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!dragStart.current) return;
              const dy = event.clientY - dragStart.current.y;
              const next = dragStart.current.frac - dy / dragStart.current.h;
              setSheetFrac(Math.min(0.72, Math.max(0.36, next)));
            }}
            onPointerUp={(event) => {
              if (!dragStart.current) return;
              setSheetFrac(sheetFrac > 0.51 ? 0.58 : 0.42);
              dragStart.current = null;
              setDragging(false);
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
          >
            <span className="mx-auto block h-1 w-10 rounded-full bg-[#0B1728]/20" />
          </div>

          <div className="px-6">
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
              Pickup address
            </p>

            <div className="mt-2 flex items-start gap-3 rounded-2xl border border-[#0B1728]/10 bg-white p-3.5">
              <MapPin
                className="mt-0.5 size-[18px] shrink-0 text-[#122A4E]"
                strokeWidth={2}
              />
              <div className="min-w-0 flex-1">
                {editingAddress ? (
                  <input
                    autoFocus
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    onBlur={() => setEditingAddress(false)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") setEditingAddress(false);
                    }}
                    className="w-full bg-transparent text-[13.5px] outline-none"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditingAddress(true)}
                    className="text-left text-[13.5px] leading-snug"
                  >
                    {address}
                  </button>
                )}
                <p className="mt-0.5 text-[11px] text-[#9AA7B8]">
                  Tap to change · or use your location
                </p>
              </div>
            </div>

            {!collapsed && (
              <>
                <div className="mt-5">
                  <p className="text-[12px] text-[#5A6B82]">Day</p>
                  <div className="mt-2 flex gap-1.5">
                    {DAYS.map((value) => (
                      <Chip
                        key={value}
                        active={day === value}
                        onClick={() => setDay(value)}
                        className="flex-1"
                      >
                        {value}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[12px] text-[#5A6B82]">Time</p>
                  <div className="mt-2 flex gap-1.5">
                    {WINDOWS.map((value) => (
                      <Chip
                        key={value}
                        active={time === value}
                        onClick={() => setTime(value)}
                        className="flex-1"
                      >
                        {value}
                      </Chip>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 px-6 pb-[96px]">
            <Primary
              disabled={!collapsed && !canPickup}
              onClick={() => {
                if (collapsed) {
                  setSheetFrac(0.58);
                  return;
                }
                saveListing({
                  category: category ?? "Sofa",
                  price,
                  floor: Math.min(floor, price),
                  fallback: fallback ?? "donate",
                  day: day ?? "Thu 29",
                });
                setStep("listed");
              }}
            >
              {collapsed ? "Choose a time" : "Confirm pickup"}
            </Primary>
          </div>
        </div>
      </div>
    );
  }

  /* ── 5 · listed ────────────────────────────────────────────────────── */
  if (step === "listed") {
    const chosen = FALLBACKS.find((option) => option.key === fallback);
    return (
      <div className="flex h-full flex-col overflow-y-auto px-6 pt-[62px] pb-[104px]">
        <Rise delay={220}>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
            Listed · in storage
          </p>
        </Rise>

        <Rise delay={180}>
          <h1 className="mt-2 text-[30px] leading-[1.1] font-medium tracking-[-0.03em]">
            We&rsquo;ll take it from here.
          </h1>
        </Rise>
        <Rise delay={140}>
          <p className="mt-2 text-[14px] leading-[1.6] text-[#5A6B82]">
            We pick it up on {day}, photograph its condition, and list it for
            buyers arriving in August.
          </p>
        </Rise>

        <Rise delay={100} className="mt-6">
          <div className="flex gap-3 rounded-2xl border border-[#0B1728]/10 bg-white p-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
              <Image src="/img/sofa.jpg" alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-medium">{category}</p>
              <p className="mt-0.5 text-[12px] text-[#5A6B82]">
                Listed at ${price} · floor ${Math.min(floor, price)}
              </p>
              <p className="mt-1 text-[12px] text-[#1F8A5B]">
                You&rsquo;d get about ${Math.round(price * 0.9) - STORAGE_FEE} at ${price}
              </p>
            </div>
          </div>
        </Rise>

        <Rise delay={60} className="mt-3">
          <div className="divide-y divide-[#0B1728]/8 rounded-2xl border border-[#0B1728]/10 bg-white px-4 text-[13px]">
            {[
              ["Pickup", day ?? ""],
              ["Storage fee", `$${STORAGE_FEE} flat, taken from the sale`],
              ["Commission", "10% of the sale price"],
              ["On Sept 15", chosen?.title ?? ""],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-2.5">
                <span className="text-[#5A6B82]">{label}</span>
                <span className="text-right">{value}</span>
              </div>
            ))}
          </div>
        </Rise>

        <div className="mt-auto pt-6">
          <Rise delay={0}>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={restart}
                className="h-[52px] w-full rounded-xl border border-[#0B1728]/15 text-[15px] font-medium transition-colors hover:bg-[#0B1728]/[0.04] active:translate-y-px"
              >
                List another item
              </button>
              <Primary onClick={() => router.push("/value/dashboard")}>
                View your listing
              </Primary>
            </div>
          </Rise>
        </div>
      </div>
    );
  }

  return null;
}
