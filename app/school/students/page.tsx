"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/cards";
import { Avatar, Badge } from "@/components/ui/primitives";
import {
  DateRangePicker,
  type DateRange,
} from "@/components/ui/date-range-picker";
import { StatusBadge } from "@/components/admin/tables";
import { useToast } from "@/components/ui/toast";
import { SCHOOL_CLASS_PERFORMANCE, SCHOOL_STUDENTS } from "@/lib/mock/admin";

function scoreTone(score: number): "green" | "blue" | "amber" {
  return score >= 80 ? "green" : score >= 60 ? "blue" : "amber";
}

export default function SchoolStudentsPage() {
  const [query, setQuery] = useState("");
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const { toast } = useToast();

  const filtered = SCHOOL_STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeader
        title="Students"
        action={
          <button className="btn-primary" onClick={() => setEnrollOpen(true)}>
            ＋ Bulk enroll
          </button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            className="input pl-9"
            placeholder="Search students…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <DateRangePicker value={range} onChange={setRange} />
      </div>

      <div className="overflow-x-auto rounded-md border border-line bg-surface">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">Student</th>
              <th className="px-4 py-3 font-semibold">Class</th>
              <th className="px-4 py-3 font-semibold">Avg score</th>
              <th className="px-4 py-3 font-semibold">Streak</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-brand-50/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={s.name} size={32} />
                    <span className="font-medium text-ink">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{s.class}</td>
                <td className="px-4 py-3">
                  <Badge tone={scoreTone(s.avgScore)}>{s.avgScore}%</Badge>
                </td>
                <td className="px-4 py-3 text-ink">🔥 {s.streak}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={s.status} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-muted"
                >
                  No students match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <BulkEnrollDrawer
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        onSubmit={() => {
          setEnrollOpen(false);
          toast("Bulk enrollment started", "info");
        }}
      />
    </>
  );
}

function BulkEnrollDrawer({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
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

  const steps = [
    {
      n: 1,
      title: "Upload CSV",
      body: "Drop a spreadsheet of student names and emails.",
    },
    {
      n: 2,
      title: "Map classes",
      body: "Match each student to a class and section.",
    },
    {
      n: 3,
      title: "Invite",
      body: "We email login links and activate seats.",
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Bulk enroll students"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="text-xl font-semibold text-ink">Bulk enroll</h2>
            <p className="mt-0.5 text-sm text-muted">
              Add a whole class in three quick steps.
            </p>
          </div>
          <button
            className="btn-ghost -mr-2 -mt-1 p-2"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <ol className="space-y-3">
            {steps.map((step) => (
              <li
                key={step.n}
                className="flex gap-3 rounded-xl border border-line bg-canvas p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-sm font-bold text-brand-600">
                  {step.n}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">
                    {step.title}
                  </div>
                  <p className="mt-1 text-xs text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Default class
            </label>
            <select className="input">
              {SCHOOL_CLASS_PERFORMANCE.map((c) => (
                <option key={c.class} value={c.class}>
                  {c.class}
                </option>
              ))}
            </select>
          </div>

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-canvas px-6 py-10 text-center transition-colors hover:border-brand-300">
            <div className="text-3xl">📄</div>
            <p className="mt-2 text-sm font-medium text-ink">
              Drag &amp; drop a CSV file here
            </p>
            <p className="mt-1 text-xs text-muted">
              or click to browse — max 5MB
            </p>
            <input type="file" accept=".csv" className="hidden" />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-line px-5 py-4">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onSubmit}>
            Start enrollment
          </button>
        </div>
      </div>
    </div>
  );
}
