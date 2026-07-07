import Link from "next/link";
import { SITE } from "@/lib/constants/site";
import { LogoMark } from "./LogoMark";
import { cn } from "@/lib/utils/cn";

export function Logo({
  href = "/",
  subtitle = true,
  className,
}: {
  href?: string;
  subtitle?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10 shrink-0" />
      <div className="leading-tight">
        <div className="font-display text-lg font-bold text-ink">{SITE.name}</div>
        {subtitle && (
          <div className="font-bangla text-[11px] font-medium text-muted">
            এআই টিউটর · SSC + IELTS
          </div>
        )}
      </div>
    </Link>
  );
}
