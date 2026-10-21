"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SellerLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-full flex-col px-6 pt-16 pb-8">
      {/* mark */}
      <div className="flex items-center gap-2.5">
        <Image
          src="/relay-logo.png"
          alt=""
          width={30}
          height={30}
          priority
          className="rounded-[8px]"
        />
        <span className="text-[15px] font-medium tracking-[-0.01em]">Relay</span>
      </div>

      {/* headline */}
      <div className="mt-14">
        <h1 className="text-[32px] leading-[1.05] font-medium tracking-[-0.035em]">
          Sign in to sell.
        </h1>
        <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.6] text-[#5A6B82]">
          Three photos, one offer, one pickup. Takes about a minute.
        </p>
      </div>

      {/* form */}
      <form
        className="mt-9 space-y-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <label
            htmlFor="email"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6B82]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@school.edu"
            className="mt-2 h-12 w-full rounded-xl border border-[#0B1728]/12 bg-white px-4 text-[15px] text-[#0B1728] outline-none transition placeholder:text-[#9AA7B8] focus:border-[#122A4E] focus:ring-4 focus:ring-[#122A4E]/8"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="password"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5A6B82]"
            >
              Password
            </label>
            <button
              type="button"
              className="text-[12px] text-[#5A6B82] transition-colors hover:text-[#122A4E]"
            >
              Forgot?
            </button>
          </div>

          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Your password"
              className="h-12 w-full rounded-xl border border-[#0B1728]/12 bg-white pr-12 pl-4 text-[15px] text-[#0B1728] outline-none transition placeholder:text-[#9AA7B8] focus:border-[#122A4E] focus:ring-4 focus:ring-[#122A4E]/8"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-[#5A6B82] transition-colors hover:text-[#0B1728]"
            >
              {showPassword ? (
                <EyeOff className="size-[18px]" strokeWidth={1.6} />
              ) : (
                <Eye className="size-[18px]" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 h-[52px] w-full rounded-xl bg-[#122A4E] text-[15px] font-medium text-white transition-colors hover:bg-[#0E2140] focus-visible:ring-4 focus-visible:ring-[#122A4E]/25 focus-visible:outline-none active:translate-y-px"
        >
          Sign in
        </button>
      </form>

      {/* signup */}
      <button
        type="button"
        className="mt-3 h-[52px] w-full rounded-xl border border-[#0B1728]/15 text-[15px] font-medium text-[#0B1728] transition-colors hover:bg-[#0B1728]/[0.04] active:translate-y-px"
      >
        Create an account
      </button>

      <p className="mt-auto pb-1 text-center text-[11px] leading-relaxed text-[#5A6B82]">
        Students only. Use your .edu email to buy or sell.
      </p>
    </div>
  );
}
