import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";

const steps = ["Take three photos", "Get an offer", "We pick it up"];
const accepted = ["Sofas", "Desks", "Chairs", "Dressers", "Bed frames"];

export default function SellerHomePage() {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 pt-[68px] pb-32">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image
            src="/relay-logo.png"
            alt=""
            width={28}
            height={28}
            priority
            className="rounded-[8px]"
          />
          <span className="text-[15px] font-medium tracking-[-0.01em]">Relay</span>
        </div>

        <Link
          href="/instant/me"
          className="flex size-8 items-center justify-center rounded-full bg-[#E4E9F1] text-[11px] font-medium text-[#122A4E]"
        >
          AW
        </Link>
      </header>

      <h1 className="mt-10 text-[34px] leading-[1.05] font-medium tracking-[-0.035em]">
        Get it gone.
      </h1>
      <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.6] text-[#5A6B82]">
        Three photos, one pickup, paid at the door.
      </p>

      <Link
        href="/instant/sell"
        className="mt-8 flex items-center gap-3 rounded-2xl bg-[#122A4E] p-3.5 text-white transition-colors hover:bg-[#0E2140] active:translate-y-px"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-white/12">
          <Camera className="size-[18px]" strokeWidth={1.9} />
        </span>
        <span className="flex-1">
          <span className="block text-[15px] font-medium">Start with photos</span>
          <span className="block text-[12px] text-white/55">
            Takes about a minute
          </span>
        </span>
        <ArrowRight className="mr-1 size-4 text-white/50" />
      </Link>

      <section className="mt-9">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
          How it works
        </h2>
        <ol className="mt-3.5 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] text-[#9AA7B8]">
                0{index + 1}
              </span>
              <span className="text-[13.5px] text-[#33415A]">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
          We take
        </h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {accepted.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#0B1728]/10 bg-white px-2.5 py-[5px] text-[11.5px] text-[#33415A]"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-[#5A6B82]">
          No mattresses, no broken frames, nothing with stains.
        </p>
      </section>

      <div className="mt-auto rounded-2xl border border-[#0B1728]/10 bg-white/60 p-3.5">
        <p className="text-[12.5px] leading-relaxed text-[#33415A]">
          Moving out? We can take several things in one visit — one truck, one
          time window.
        </p>
      </div>
    </div>
  );
}
