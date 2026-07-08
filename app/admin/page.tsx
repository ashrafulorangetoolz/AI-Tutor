import type { Metadata } from "next";
import { PageHeader, StatCard } from "@/components/dashboard/cards";
import { LineChart, Donut, BarChart } from "@/components/dashboard/charts";
import { Card, CardBody } from "@/components/ui/primitives";
import { PaymentTable } from "@/components/admin/tables";
import {
  ADMIN_STATS,
  REVENUE_TREND,
  SIGNUPS_TREND,
  PLAN_DISTRIBUTION,
  ADMIN_PAYMENTS,
} from "@/lib/mock/admin";
import { bdt } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Admin Overview" };

export default function AdminPage() {
  const a = ADMIN_STATS;

  return (
    <>
      <PageHeader title="Platform Overview" subtitle="Everything at a glance" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total users" value={a.totalUsers.toLocaleString()} icon={<span>👥</span>} tone="brand" />
        <StatCard label="Active today" value={a.activeToday.toLocaleString()} icon={<span>🟢</span>} tone="blue" />
        <StatCard label="MRR" value={bdt(a.mrr)} icon={<span>💰</span>} tone="amber" />
        <StatCard label="AI calls today" value={a.aiCallsToday.toLocaleString()} icon={<span>🤖</span>} tone="purple" />
        <StatCard label="Active subs" value={a.activeSubs.toLocaleString()} icon={<span>💳</span>} tone="brand" />
        <StatCard label="Concept cards" value={a.conceptCards.toLocaleString()} icon={<span>📚</span>} tone="blue" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold text-ink">Revenue (BDT)</h2>
            <LineChart data={REVENUE_TREND.map((r) => ({ label: r.month, value: r.bdt }))} />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold text-ink">Plan distribution</h2>
            <Donut
              segments={PLAN_DISTRIBUTION.map((p) => ({
                label: p.plan,
                value: p.count,
                color: p.color,
              }))}
            />
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardBody>
          <h2 className="mb-4 text-xl font-semibold text-ink">New signups</h2>
          <BarChart data={SIGNUPS_TREND.map((s) => ({ label: s.month, value: s.count }))} />
        </CardBody>
      </Card>

      <div className="mt-6">
        <h2 className="mb-3 text-xl font-semibold text-ink">Recent payments</h2>
        <PaymentTable rows={ADMIN_PAYMENTS.slice(0, 5)} />
      </div>
    </>
  );
}
