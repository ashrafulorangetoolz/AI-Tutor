"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, Bell } from "lucide-react";
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
        <div className="flex items-center gap-2.5 rounded-xl border border-line bg-surface py-1.5 pl-1.5 pr-3">
          <Avatar name={user.name} color={user.avatarColor} size={32} />
          <div className="hidden leading-tight sm:block">
            <div className="text-sm font-semibold text-ink">{user.name}</div>
            <div className="text-[11px] text-muted">{ROLE_LABEL[user.role].en}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
