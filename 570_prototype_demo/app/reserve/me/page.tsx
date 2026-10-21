import Link from "next/link";
import { LogOut } from "lucide-react";

export default function BuyerMePage() {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 pt-[64px] pb-32">
      <h1 className="text-[26px] font-medium tracking-[-0.03em]">Me</h1>

      <div className="mt-6 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-[#E4E9F1] text-[14px] font-medium text-[#122A4E]">
          RS
        </span>
        <div>
          <p className="text-[15px] font-medium">Ryan Santos</p>
          <p className="text-[13px] text-[#5A6B82]">ryan.s@duke.edu</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#0B1728]/10 bg-white p-4">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
          Your reservation
        </h2>
        <p className="mt-3 text-[13.5px] leading-relaxed text-[#33415A]">
          Nothing reserved yet. Pick a few pieces and we&rsquo;ll hold them
          until you land — a $20 refundable hold per item.
        </p>
        <Link
          href="/reserve/market"
          className="mt-4 inline-flex h-10 items-center rounded-xl bg-[#122A4E] px-4 text-[13px] font-medium text-white"
        >
          Browse the market
        </Link>
      </div>

      <div className="mt-4 rounded-2xl border border-[#0B1728]/10 bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13.5px] text-[#33415A]">Move-in date</span>
          <span className="text-[13.5px] font-medium">Aug 18</span>
        </div>
        <div className="my-3 h-px bg-[#0B1728]/8" />
        <div className="flex items-center justify-between">
          <span className="text-[13.5px] text-[#33415A]">Delivery address</span>
          <span className="text-[13.5px] text-[#5A6B82]">Not set</span>
        </div>
      </div>

      <Link
        href="/reserve/login"
        className="mt-auto flex items-center gap-2 pt-8 text-[13px] text-[#5A6B82] transition-colors hover:text-[#122A4E]"
      >
        <LogOut className="size-4" strokeWidth={1.8} />
        Sign out
      </Link>
    </div>
  );
}
