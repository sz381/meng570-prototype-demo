import type { ReactNode } from "react";
import { AppNav } from "./_components/app-nav";

function StatusBar() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[52px] items-center justify-between px-7 text-[#0B1728]">
      {/* time */}
      <span className="ml-[20px] w-[54px] text-[15px] font-semibold tracking-[-0.01em]">
        9:41
      </span>

      {/* signal · wifi · battery */}
      <div className="flex items-center gap-[7px]">
        <div className="flex items-end gap-[2px]" aria-hidden>
          {[5, 7, 9, 11].map((height) => (
            <span
              key={height}
              className="w-[3px] rounded-[1px] bg-[#0B1728]"
              style={{ height }}
            />
          ))}
        </div>

        <span className="text-[13px] font-semibold tracking-[0.01em]">5G</span>

        <svg
          width="25"
          height="12"
          viewBox="0 0 25 12"
          fill="none"
          aria-hidden
          className="ml-[1px]"
        >
          <rect
            x="0.6"
            y="0.6"
            width="21"
            height="10.8"
            rx="3"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.2"
          />
          <rect x="2.2" y="2.2" width="14.6" height="7.6" rx="1.6" fill="currentColor" />
          <path
            d="M23.2 4.2v3.6a2 2 0 0 0 0-3.6z"
            fill="currentColor"
            fillOpacity="0.35"
          />
        </svg>
      </div>
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[8px] z-30 hidden justify-center md:flex">
      <span className="h-[5px] w-[134px] rounded-full bg-[#0B1728]/85" />
    </div>
  );
}

export default function InstantLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#E9EDF3] md:px-8 md:py-10">
      <div className="relative flex h-svh w-full flex-col overflow-hidden bg-[#F5F7FA] text-[#0B1728] antialiased md:h-[844px] md:max-h-[94vh] md:w-[390px] md:rounded-[44px] md:border md:border-black/5 md:shadow-[0_40px_90px_-30px_rgba(11,23,40,0.45)]">
        <StatusBar />
        {children}
        <AppNav />
        <HomeIndicator />
      </div>
    </div>
  );
}
