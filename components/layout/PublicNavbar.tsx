"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PUBLIC_NAV } from "@/lib/constants/navigation";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

export function PublicNavbar() {
  const { lang } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 backdrop:blur-lg">
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
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher compact />
            <Link href="/login" className="btn-ghost">
              Log in
            </Link>
            <Link href="/signup" className="btn bg-ink text-white hover:bg-ink/90">
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

          {/* Right cluster — mobile (compact + hamburger) */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher compact />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform hover:-translate-y-0.5"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="mt-2 rounded-3xl border border-line bg-surface p-3 shadow-pop lg:hidden">
            <div className="flex flex-col">
              {PUBLIC_NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                      active ? "bg-brand-50 text-brand-600" : "text-ink hover:bg-canvas",
                      lang === "bn" && "font-bangla",
                    )}
                  >
                    {lang === "bn" ? item.labelBn : item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
              <Link href="/login" onClick={closeMenu} className="btn-secondary w-full">
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={closeMenu}
                className="btn bg-ink text-white hover:bg-ink/90 w-full"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
