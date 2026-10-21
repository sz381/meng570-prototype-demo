import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Relay Ops — Stock in, stock out",
};

export default function OpsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-[#EEF1F6] text-[#0B1728] antialiased">
      {children}
    </div>
  );
}
