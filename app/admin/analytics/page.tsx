import type { Metadata } from "next";
import { PageHeader, StatCard } from "@/components/dashboard/cards";
import { LineChart, BarChart, Donut } from "@/components/dashboard/charts";
import { Card, CardBody } from "@/components/ui/primitives";
import { REVENUE_TREND, SIGNUPS_TREND, PLAN_DISTRIBUTION } from "@/lib/mock/admin";
import { CHART_COLORS } from "@/lib/constants/chart";

export const metadata: Metadata = { title: "Analytics" };

const AI_USAGE = [
  { label: "Mon", value: 5200 },
  { label: "Tue", value: 6100 },
  { label: "Wed", value: 5800 },
  { label: "Thu", value: 7200 },
  { label: "Fri", value: 6900 },
  { label: "Sat", value: 8400 },
  { label: "Sun", value: 7600 },
];

export default function AdminAnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="DAU" value={(3120).toLocaleString()} icon={<span>🟢</span>} tone="brand" />
        <StatCard label="WAU" value={(9840).toLocaleString()} icon={<span>📅</span>} tone="blue" />
        <StatCard label="Avg session" value="18m" icon={<span>⏱</span>} tone="amber" />
        <StatCard label="Retention" value="64%" icon={<span>🔁</span>} tone="purple" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold text-ink">Revenue (BDT)</h2>
            <LineChart data={REVENUE_TREND.map((r) => ({ label: r.month, value: r.bdt }))} />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold text-ink">Signups</h2>
            <BarChart data={SIGNUPS_TREND.map((s) => ({ label: s.month, value: s.count }))} />
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
        <Card>
          <CardBody>
            <h2 className="mb-4 text-xl font-semibold text-ink">AI usage (calls this week)</h2>
            <BarChart data={AI_USAGE} color={CHART_COLORS.sky} />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
