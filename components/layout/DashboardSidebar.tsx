"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import type { NavItem } from "@/types";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

export function DashboardSidebar({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { lang } = useI18n();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-line bg-surface">
      <div className="flex h-16 items-center border-b border-line px-5">
        <Logo subtitle={false} />
      </div>
      <nav className="scroll-thin flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/school" &&
              item.href !== "/admin" &&
              pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "bg-brand-500 text-white"
                  : "text-muted hover:bg-brand-50 hover:text-ink",
              )}
            >
              <Icon name={item.icon} className="h-[18px] w-[18px]" />
              <span className={cn(lang === "bn" && "font-bangla")}>
                {lang === "bn" && item.labelBn ? item.labelBn : item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted hover:bg-brand-50 hover:text-ink"
        >
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
