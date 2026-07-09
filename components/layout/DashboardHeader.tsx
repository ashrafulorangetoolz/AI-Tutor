"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/primitives";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ROLE_LABEL } from "@/lib/constants/navigation";
import type { UserRole } from "@/types";

export function DashboardHeader({
  user,
  onMenu,
}: {
  user: { name: string; role: UserRole; avatarColor: string };
  onMenu?: () => void;
}) {
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-canvas/85 px-4 backdrop-blur sm:px-6">
      <button className="btn-secondary !px-2.5 lg:hidden" onClick={onMenu} aria-label="Menu">
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search topics, concepts, questions…"
          className="input !pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <LanguageSwitcher compact />
        <Link
          href="/dashboard/settings"
          className="relative rounded-xl border border-line bg-surface p-2.5 text-muted hover:text-ink"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
        </Link>
        <ProfileMenu user={user} />
      </div>
    </header>
  );
}

function ProfileMenu({
  user,
}: {
  user: { name: string; role: UserRole; avatarColor: string };
}) {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function logout() {
    setLoggingOut(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json().catch(() => ({ redirect: "/" }));
      router.push(data.redirect ?? "/");
      router.refresh();
    } catch {
      router.push("/");
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2.5 rounded-xl border border-line bg-surface py-1.5 pl-1.5 pr-2.5 transition-colors hover:border-brand-300"
      >
        <Avatar name={user.name} color={user.avatarColor} size={32} />
        <div className="hidden leading-tight sm:block">
          <div className="text-left text-sm font-semibold text-ink">{user.name}</div>
          <div className="text-left text-[11px] text-muted">
            {ROLE_LABEL[user.role].en}
          </div>
        </div>
        <ChevronDown
          className={`hidden h-4 w-4 text-muted transition-transform sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-xl"
        >
          <div className="border-b border-line px-4 py-3">
            <div className="text-sm font-semibold text-ink">{user.name}</div>
            <div className="text-xs text-muted">{ROLE_LABEL[user.role].en}</div>
          </div>

          <Link
            href="/dashboard/settings"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-canvas"
          >
            <User className="h-4 w-4 text-muted" />
            Your profile
          </Link>
          <Link
            href="/dashboard/settings"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-canvas"
          >
            <Settings className="h-4 w-4 text-muted" />
            Settings
          </Link>

          <div className="my-1 border-t border-line" />

          <button
            type="button"
            role="menuitem"
            onClick={logout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-danger hover:bg-danger/10 disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {loggingOut ? "Logging out…" : "Log out"}
          </button>
        </div>
      )}
    </div>
  );
}
