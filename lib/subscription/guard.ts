import type { SubscriptionPlan } from "@/types";
import { PLAN_LIMITS } from "@/lib/constants/plans";

export type FeatureKey =
  | "aiQuestion"
  | "mockTest"
  | "writingEval"
  | "speakingEval"
  | "premiumConceptCard";

export interface UsageSnapshot {
  aiQuestionsToday: number;
  mockTestsThisWeek: number;
  writingEvalsThisMonth: number;
  speakingEvalsThisMonth: number;
}

export interface GuardResult {
  allowed: boolean;
  limit: number; // -1 = unlimited
  used: number;
  remaining: number; // -1 = unlimited
  reason?: string;
  upgradeTo?: SubscriptionPlan;
}

/**
 * Central subscription-limit check. UI and API routes both call this so the
 * rules live in exactly one place.
 */
export function checkFeature(
  plan: SubscriptionPlan,
  feature: FeatureKey,
  usage: UsageSnapshot,
): GuardResult {
  const limits = PLAN_LIMITS[plan];

  switch (feature) {
    case "aiQuestion":
      return build(limits.aiQuestionsPerDay, usage.aiQuestionsToday, "daily AI questions");
    case "mockTest":
      return build(limits.mockTestsPerWeek, usage.mockTestsThisWeek, "weekly mock tests");
    case "writingEval":
      return build(limits.writingEvalsPerMonth, usage.writingEvalsThisMonth, "monthly writing evaluations");
    case "speakingEval":
      return build(limits.speakingEvalsPerMonth, usage.speakingEvalsThisMonth, "monthly speaking evaluations");
    case "premiumConceptCard":
      return {
        allowed: limits.premiumConceptCards,
        limit: limits.premiumConceptCards ? -1 : 0,
        used: 0,
        remaining: limits.premiumConceptCards ? -1 : 0,
        reason: limits.premiumConceptCards ? undefined : "Premium concept cards require a Pro plan",
        upgradeTo: limits.premiumConceptCards ? undefined : "SSC_PRO",
      };
  }
}

function build(limit: number, used: number, label: string): GuardResult {
  if (limit === -1) {
    return { allowed: true, limit: -1, used, remaining: -1 };
  }
  const remaining = Math.max(0, limit - used);
  return {
    allowed: remaining > 0,
    limit,
    used,
    remaining,
    reason: remaining > 0 ? undefined : `You've reached your ${label} limit on the Free plan.`,
    upgradeTo: remaining > 0 ? undefined : "BUNDLE",
  };
}
