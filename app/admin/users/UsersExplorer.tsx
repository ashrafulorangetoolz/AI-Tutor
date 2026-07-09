"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/cards";
import { UserTable } from "@/components/admin/tables";
import { useToast } from "@/components/ui/toast";
import { ADMIN_USERS } from "@/lib/mock/admin";

const FILTERS = ["All", "Students", "Parents", "Schools"] as const;

const ROLE_BY_FILTER: Record<string, string> = {
  Students: "STUDENT",
  Parents: "PARENT",
  Schools: "SCHOOL_ADMIN",
};

const ROLE_OPTIONS = [
  { value: "STUDENT", label: "Student" },
  { value: "PARENT", label: "Parent" },
  { value: "SCHOOL_ADMIN", label: "School" },
];

const PLAN_OPTIONS = ["FREE", "SSC_PRO", "IELTS_PRO", "BUNDLE", "SCHOOL"];

type User = (typeof ADMIN_USERS)[number];

export function UsersExplorer() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>(ADMIN_USERS);
  const [addOpen, setAddOpen] = useState(false);

  const rows = useMemo(() => {
    const role = ROLE_BY_FILTER[active];
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (role && u.role !== role) return false;
      if (q && !`${u.name} ${u.email}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [users, active, query]);

  return (
    <>
      <PageHeader
        title="Users"
        action={
          <button className="btn-primary" onClick={() => setAddOpen(true)}>
            ＋ Add user
          </button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            className="input pl-9"
            placeholder="Search users…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={
                active === f
                  ? "rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white"
                  : "rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-muted hover:text-ink"
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <UserTable rows={rows} />

      <AddUserDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={(u) => setUsers((prev) => [u, ...prev])}
      />
    </>
  );
}

function AddUserDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (user: User) => void;
}) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [plan, setPlan] = useState("FREE");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setRole("STUDENT");
      setPlan("FREE");
    }
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast("Name and email are required.", "error");
      return;
    }
    onCreate({
      id: `u${Math.floor(Date.now() % 1_000_000)}`,
      name: name.trim(),
      email: email.trim(),
      role,
      plan,
      status: "active",
      joined: new Date().toISOString().slice(0, 10),
    });
    toast("User added.");
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <form
          role="dialog"
          aria-modal="true"
          aria-label="Add user"
          onSubmit={submit}
          className={`w-full max-w-md rounded-2xl bg-surface shadow-xl transition-all duration-200 ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between border-b border-line px-5 py-4">
            <div>
              <h2 className="text-xl font-semibold text-ink">Add user</h2>
              <p className="mt-0.5 text-sm text-muted">
                Create a new account manually.
              </p>
            </div>
            <button
              type="button"
              className="btn-ghost -mr-2 -mt-1 p-2"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4 px-5 py-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Full name
              </label>
              <input
                className="input"
                placeholder="e.g. Rafi Hasan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <input
                className="input"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  Role
                </label>
                <select
                  className="input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  Plan
                </label>
                <select
                  className="input"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                >
                  {PLAN_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-line px-5 py-4">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
