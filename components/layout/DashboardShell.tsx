"use client";

import { useState, type ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import type { NavItem, UserRole } from "@/types";

/**
 * Responsive dashboard shell shared by student, parent, school and admin areas.
 * Desktop: fixed sidebar. Mobile: slide-over drawer.
 */
export function DashboardShell({
  navItems,
  user,
  children,
}: {
  navItems: NavItem[];
  user: { name: string; role: UserRole; avatarColor: string };
  children: ReactNode;
}) {
  const [drawer, setDrawer] = useState(false);

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Desktop sidebar */}
      <div className="sticky top-0 hidden h-screen lg:block">
        <DashboardSidebar items={navItems} />
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setDrawer(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <DashboardSidebar items={navItems} onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader user={user} onMenu={() => setDrawer(true)} />
        <main className="min-w-0 flex-1 overflow-x-clip px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
