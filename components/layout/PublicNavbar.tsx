"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  GraduationCap,
  Languages,
  Building2,
  Tag,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PUBLIC_NAV } from "@/lib/constants/navigation";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

// Icons for the mobile bottom bar, keyed by route.
const BOTTOM_ICONS: Record<string, LucideIcon> = {
  "/ssc": GraduationCap,
  "/ielts": Languages,
  "/schools": Building2,
  "/pricing": Tag,
  "/contact": Mail,
};

export function PublicNavbar() {
  const { lang } = useI18n();
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      {/* Top bar — background matches the page canvas (no colored strip) */}
      <header className="sticky top-0 z-40 backdrop:blur-lg ">
        <div className="section py-3">
          <nav className="relative flex h-16 items-center justify-between gap-4 rounded-full border border-line bg-surface pl-5 pr-2 shadow-card sm:pr-3">
            <Logo subtitle={false} />

            {/* Center links with active underline (desktop) */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
              {PUBLIC_NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative text-sm font-semibold transition-colors",
                      active ? "text-ink" : "text-muted hover:text-ink",
                      lang === "bn" && "font-bangla",
                    )}
                  >
                    {lang === "bn" ? item.labelBn : item.label}
                    {active && (
                      <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-ink" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right cluster — desktop */}
            <div className="hidden items-center gap-2 md:flex">
              <LanguageSwitcher compact />
              <Link href="/login" className="btn-ghost">
                Log in
              </Link>
              <Link
                href="/signup"
                className="btn bg-ink text-white hover:bg-ink/90"
              >
                Get started
              </Link>
              <Link
                href="/signup"
                aria-label="Get started"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral-500 text-white transition-transform hover:-translate-y-0.5"
              >
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Right cluster — mobile (compact; navigation lives in the bottom bar) */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher compact />
              <Link href="/signup" className="btn bg-ink text-white !px-4">
                Get started
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile bottom navigation bar */}
      <nav className="fixed inset-x-3 bottom-3 z-50 md:hidden">
        <div className="flex items-center justify-around rounded-full border border-line bg-surface/95 px-1.5 py-2 shadow-pop backdrop-blur">
          {PUBLIC_NAV.map((item) => {
            const Icon = BOTTOM_ICONS[item.href] ?? GraduationCap;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 text-[10px] font-semibold transition-colors",
                  active ? "text-brand-600" : "text-muted",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    active && "bg-brand-100",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className={cn(lang === "bn" && "font-bangla")}>
                  {lang === "bn" ? item.labelBn : item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
