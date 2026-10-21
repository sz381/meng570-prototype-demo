"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, House, User } from "lucide-react";

const items = [
  { href: "/instant", label: "Home", icon: House },
  { href: "/instant/sell", label: "Sell", icon: Camera },
  { href: "/instant/me", label: "Me", icon: User },
];

export function AppNav() {
  const pathname = usePathname();

  // the login screen is the only full-screen route — it sits outside the app
  if (pathname.startsWith("/instant/login")) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center pb-[28px]">
      <nav className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/70 bg-white/75 p-[6px] shadow-[0_12px_32px_-10px_rgba(11,23,40,0.28)] backdrop-blur-xl">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/instant" ? pathname === "/instant" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex w-[80px] flex-col items-center gap-[3px] rounded-full py-[7px] text-[10px] font-medium transition-colors duration-200 ${
                active
                  ? "bg-[#122A4E] text-white"
                  : "text-[#5A6B82] hover:text-[#0B1728]"
              }`}
            >
              <Icon
                className="size-[17px]"
                strokeWidth={active ? 2.2 : 1.8}
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
