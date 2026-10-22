import Link from "next/link";
import { LogOut } from "lucide-react";

export default function ValueProfilePage() {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 pt-[68px] pb-32">
      <h1 className="text-[26px] font-medium tracking-[-0.03em]">Me</h1>

      <div className="mt-6 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-[#E4E9F1] text-[14px] font-medium text-[#122A4E]">
          NK
        </span>
        <div>
          <p className="text-[15px] font-medium">Nemo K.</p>
          <p className="text-[13px] text-[#5A6B82]">nemo.k@duke.edu</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#0B1728]/10 bg-white p-4">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6B82]">
          Your listings
        </h2>
        <p className="mt-3 text-[13.5px] leading-relaxed text-[#33415A]">
          Everything you have listed, with its views, offers and payout, is in
          Listings.
        </p>
        <Link
          href="/value/dashboard"
          className="mt-4 inline-flex h-10 items-center rounded-xl bg-[#122A4E] px-4 text-[13px] font-medium text-white"
        >
          Open Listings
        </Link>
      </div>

      <Link
        href="/value/login"
        className="mt-auto flex items-center gap-2 pt-8 text-[13px] text-[#5A6B82] transition-colors hover:text-[#122A4E]"
      >
        <LogOut className="size-4" strokeWidth={1.8} />
        Sign out
      </Link>
    </div>
  );
}
