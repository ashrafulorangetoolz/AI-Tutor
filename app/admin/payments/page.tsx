import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/cards";
import { PaymentTable } from "@/components/admin/tables";
import { ADMIN_PAYMENTS } from "@/lib/mock/admin";
import { bdt } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Payments" };

const PROVIDERS = [
  { name: "bKash", color: "#E2136E" },
  { name: "Nagad", color: "#F6821F" },
  { name: "Stripe", color: "#635BFF" },
];

export default function AdminPaymentsPage() {
  return (
    <>
      <PageHeader
        title="Payments & Revenue"
        action={
          <button className="btn-secondary">
            <Download className="h-4 w-4" />
            Export
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Revenue this month" value={bdt(486000)} icon={<span>💰</span>} tone="brand" />
        <StatCard label="Successful" value={(1240).toLocaleString()} icon={<span>✅</span>} tone="blue" />
        <StatCard label="Failed" value={(32).toLocaleString()} icon={<span>⚠️</span>} tone="amber" />
      </div>

      <PaymentTable rows={ADMIN_PAYMENTS} />

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Providers</span>
        {PROVIDERS.map((p) => (
          <span
            key={p.name}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
            {p.name}
          </span>
        ))}
      </div>
    </>
  );
}
