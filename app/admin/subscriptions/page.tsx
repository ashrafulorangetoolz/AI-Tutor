import type { Metadata } from "next";
import { PageHeader, StatCard } from "@/components/dashboard/cards";
import { Donut } from "@/components/dashboard/charts";
import { Card, CardBody } from "@/components/ui/primitives";
import { SubscriptionTable } from "@/components/admin/tables";
import { ADMIN_SUBSCRIPTIONS, PLAN_DISTRIBUTION } from "@/lib/mock/admin";

export const metadata: Metadata = { title: "Subscriptions" };

export default function AdminSubscriptionsPage() {
  return (
    <>
      <PageHeader title="Subscriptions" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Active" value={(2980).toLocaleString()} icon={<span>💳</span>} tone="brand" />
        <StatCard label="Trialing" value={(120).toLocaleString()} icon={<span>🧪</span>} tone="blue" />
        <StatCard label="Churn" value="2.4%" icon={<span>📉</span>} tone="amber" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SubscriptionTable rows={ADMIN_SUBSCRIPTIONS} />
        </div>
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
    </>
  );
}
