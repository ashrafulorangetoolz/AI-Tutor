"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, TrendingUp } from "lucide-react";
import { Card, CardBody } from "@/components/ui/primitives";
import { bdt } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { PlanDef } from "@/types";
import { GradientBackdrop } from "../ui/GradientBackdrop";

type Billing = "monthly" | "yearly";

// Yearly billing charges 10 months up front (2 months free).
const YEARLY_MULTIPLIER = 10;

// Per-plan CTA styling, echoing the reference (outlined → violet → ink → green).
const CTA_STYLE: Record<string, string> = {
  FREE: "btn-secondary",
  SSC_PRO: "btn-primary",
  IELTS_PRO: "btn bg-ink text-white hover:bg-ink/90 hover:-translate-y-0.5",
  BUNDLE: "btn-cta",
};

function PriceBlock({ plan, billing }: { plan: PlanDef; billing: Billing }) {
  if (plan.price === 0) {
    return (
      <>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold tracking-tight text-ink">
            Free
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">Free forever</p>
      </>
    );
  }

  const amount =
    billing === "yearly" ? plan.price * YEARLY_MULTIPLIER : plan.price;
  const saved = plan.price * 2; // two months free on the yearly plan

  return (
    <>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-extrabold tracking-tight text-ink">
          {bdt(amount)}
        </span>
        <span className="text-sm font-medium text-muted">
          /{billing === "yearly" ? "yr" : "mo"}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">
        {billing === "yearly" ? (
          <>
            Billed yearly ·{" "}
            <span className="font-semibold text-brand-600">
              save {bdt(saved)}
            </span>
          </>
        ) : (
          "Billed monthly"
        )}
      </p>
    </>
  );
}

function PlanCard({ plan, billing }: { plan: PlanDef; billing: Billing }) {
  const ctaLabel = plan.price === 0 ? "Start for free" : `Get ${plan.name}`;

  return (
    <Card
      className={cn(
        "flex h-full flex-col transition-shadow hover:shadow-pop",
        plan.featured && "ring-2 ring-brand-500",
      )}
    >
      <CardBody className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-ink">{plan.name}</h3>
          {plan.featured && (
            <span className="badge-green text-[11px]">Popular</span>
          )}
        </div>

        <div className="mt-4">
          <PriceBlock plan={plan} billing={billing} />
        </div>

        <Link
          href="/signup"
          className={cn("mt-6 w-full", CTA_STYLE[plan.id] ?? "btn-primary")}
        >
          {ctaLabel}
        </Link>

        <ul className="mt-7 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {f}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

export function PricingPlans({ plans }: { plans: PlanDef[] }) {
  const [billing, setBilling] = useState<Billing>("yearly");

  return (
    <div>
      <GradientBackdrop></GradientBackdrop>
      {/* Billing toggle */}
      <div className="flex flex-col items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-line bg-surface p-1 shadow-card">
          {(["yearly", "monthly"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBilling(option)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors",
                billing === option
                  ? "bg-ink text-white"
                  : "text-muted hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-sm font-medium text-muted">
          Big savings on yearly
          <TrendingUp className="h-4 w-4 text-brand-500" />
        </p>
      </div>

      {/* Plans */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} />
        ))}
      </div>
    </div>
  );
}
