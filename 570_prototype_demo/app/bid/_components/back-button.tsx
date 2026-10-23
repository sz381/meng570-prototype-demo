import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const base =
  "flex size-9 items-center justify-center rounded-full border border-[#0B1728]/8 bg-white/95 text-[#33415A] shadow-[0_2px_10px_-2px_rgba(11,23,40,0.14)] backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#0B1728] active:scale-95";

/**
 * Circular back control. Pass `href` to navigate, or `onClick` to move
 * between in-flow steps without a page reload.
 */
export function BackButton({
  href,
  onClick,
}: {
  href?: string;
  onClick?: () => void;
}) {
  if (onClick) {
    return (
      <button type="button" aria-label="Back" onClick={onClick} className={base}>
        <ChevronLeft className="size-[18px]" strokeWidth={2.2} />
      </button>
    );
  }

  return (
    <Link href={href ?? "/bid"} aria-label="Back" className={base}>
      <ChevronLeft className="size-[18px]" strokeWidth={2.2} />
    </Link>
  );
}
