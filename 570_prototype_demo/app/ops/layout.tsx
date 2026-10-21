import Link from "next/link";
import type { ReactNode } from "react";

export default function OpsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-[#F5F7FA] text-[#0B1728] antialiased">
      <header className="flex shrink-0 items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A6B82] transition-colors hover:text-[#122A4E]"
        >
          ← Relay
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A6B82]">
          03 / Operations
        </span>
      </header>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
