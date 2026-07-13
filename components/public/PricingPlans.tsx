"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, TrendingUp } from "lucide-react";
import { bdt } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { PlanDef } from "@/types";
import { GradientBackdrop } from "../ui/GradientBackdrop";

type Billing = "monthly" | "yearly";

// Yearly billing charges 10 months up front (2 months free).
const YEARLY_MULTIPLIER = 10;

function PriceBlock({
  plan,
  billing,
  featured,
}: {
  plan: PlanDef;
  billing: Billing;
  featured?: boolean;
}) {
  const priceColor = featured ? "text-white" : "text-ink";
  const subColor = featured ? "text-white/70" : "text-muted";

  if (plan.price === 0) {
    return (
      <>
        <div className="flex items-baseline gap-1">
          <span
            className={cn("text-5xl font-extrabold tracking-tight", priceColor)}
          >
            {plan.b2b ? "Contact Us" : "Free"}
          </span>
        </div>
        <p className={cn("mt-1 text-sm", subColor)}>
          {plan.b2b ? "Custom pricing for institutions" : "Free forever"}
        </p>
      </>
    );
  }

  const amount =
    billing === "yearly" ? plan.price * YEARLY_MULTIPLIER : plan.price;
  const saved = plan.price * 2; // two months free on the yearly plan

  return (
    <>
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn("text-5xl font-extrabold tracking-tight", priceColor)}
        >
          {bdt(amount)}
        </span>
        <span className={cn("text-sm font-medium", subColor)}>
          /{billing === "yearly" ? "yr" : "mo"}
        </span>
      </div>
      <p className={cn("mt-1 text-sm", subColor)}>
        {billing === "yearly" ? (
          <>
            Billed yearly ·{" "}
            <span
              className={cn(
                "font-semibold",
                featured ? "text-white" : "text-brand-600",
              )}
            >
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
  const featured = plan.featured;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl p-4 transition-shadow",
        featured
          ? "bg-brand-500 text-white shadow-pop"
          : "border border-line bg-brand-50 hover:shadow-pop",
      )}
    >
      {/* Header */}
      <h3
        className={cn(
          "text-xl font-bold",
          featured ? "text-white" : "text-ink",
        )}
      >
        {plan.name}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          featured ? "text-white/80" : "text-muted",
        )}
      >
        {plan.tagline}
      </p>

      {/* Price */}
      <div className="mt-6">
        <PriceBlock plan={plan} billing={billing} featured={featured} />
      </div>

      {/* CTA */}
      <Link
        href="/signup"
        className={cn(
          "mt-6 w-full rounded-full py-3.5 text-center text-sm font-semibold transition hover:-translate-y-0.5",
          featured
            ? "bg-white text-ink hover:bg-white/90"
            : "bg-ink text-white hover:bg-ink/90",
        )}
      >
        Get Started
      </Link>

      {/* Features panel */}
      <div className="mt-6 flex-1 rounded-xl bg-surface p-5">
        <ul className="space-y-3.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
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
      <div className="relative mt-12">
        {/* Blurred aurora glow behind the cards */}
        <div
          aria-hidden
          className=" absolute left-1/2 top-1/2 -z-10 h-[814px] w-[1200px] max-w-full -translate-x-1/2 -translate-y-1/2 opacity-20"
          style={{
            background:
              "linear-gradient(269.3deg, #AA3FFF 4.46%, #09FF9B 42.73%, #FF5714 55.98%, #B285FF 95.69%)",
            filter: "blur(100px)",
          }}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>
      </div>
    </div>
  );
}
