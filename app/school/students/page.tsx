"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/cards";
import { Avatar, Badge, Card, CardBody } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/admin/tables";
import { useToast } from "@/components/ui/toast";
import { SCHOOL_STUDENTS } from "@/lib/mock/admin";

function scoreTone(score: number): "green" | "blue" | "amber" {
  return score >= 80 ? "green" : score >= 60 ? "blue" : "amber";
}

export default function SchoolStudentsPage() {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const filtered = SCHOOL_STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeader
        title="Students"
        action={
          <button
            className="btn-primary"
            onClick={() => toast("Bulk enrollment started", "info")}
          >
            ＋ Bulk enroll
          </button>
        }
      />

      <div className="relative mb-5 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          className="input pl-9"
          placeholder="Search students…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
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
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted">
                  No students match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Card className="mt-6">
        <CardBody>
          <h2 className="text-base font-semibold text-ink">Bulk enrollment</h2>
          <p className="mt-1 text-sm text-muted">
            Add a whole class in three quick steps.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { n: 1, title: "Upload CSV", body: "Drop a spreadsheet of student names and emails." },
              { n: 2, title: "Map classes", body: "Match each student to a class and section." },
              { n: 3, title: "Invite", body: "We email login links and activate seats." },
            ].map((step) => (
              <div key={step.n} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-sm font-bold text-brand-600">
                  {step.n}
                </div>
                <div className="mt-3 text-sm font-semibold text-ink">{step.title}</div>
                <p className="mt-1 text-xs text-muted">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-canvas px-6 py-10 text-center">
            <div className="text-3xl">📄</div>
            <p className="mt-2 text-sm font-medium text-ink">Drag &amp; drop a CSV file here</p>
            <p className="mt-1 text-xs text-muted">or click to browse — max 5MB</p>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
