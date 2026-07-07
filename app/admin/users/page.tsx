import type { Metadata } from "next";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/cards";
import { UserTable } from "@/components/admin/tables";
import { ADMIN_USERS } from "@/lib/mock/admin";

export const metadata: Metadata = { title: "Users" };

const FILTERS = ["All", "Students", "Parents", "Schools"];

export default function AdminUsersPage() {
  return (
    <>
      <PageHeader title="Users" action={<button className="btn-primary">＋ Add user</button>} />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input className="input pl-9" placeholder="Search users…" />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className={
                i === 0
                  ? "rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white"
                  : "rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-muted hover:text-ink"
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <UserTable rows={ADMIN_USERS} />
    </>
  );
}
