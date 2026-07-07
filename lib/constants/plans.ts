import type { PlanDef, PlanLimits, SubscriptionPlan } from "@/types";

export const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  FREE: {
    aiQuestionsPerDay: 30,
    mockTestsPerWeek: 1,
    writingEvalsPerMonth: 3,
    speakingEvalsPerMonth: 3,
    premiumConceptCards: false,
  },
  SSC_PRO: {
    aiQuestionsPerDay: -1,
    mockTestsPerWeek: -1,
    writingEvalsPerMonth: 0,
    speakingEvalsPerMonth: 0,
    premiumConceptCards: true,
  },
  IELTS_PRO: {
    aiQuestionsPerDay: -1,
    mockTestsPerWeek: -1,
    writingEvalsPerMonth: 30,
    speakingEvalsPerMonth: 30,
    premiumConceptCards: true,
  },
  BUNDLE: {
    aiQuestionsPerDay: -1,
    mockTestsPerWeek: -1,
    writingEvalsPerMonth: 60,
    speakingEvalsPerMonth: 60,
    premiumConceptCards: true,
  },
  SCHOOL: {
    aiQuestionsPerDay: -1,
    mockTestsPerWeek: -1,
    writingEvalsPerMonth: -1,
    speakingEvalsPerMonth: -1,
    premiumConceptCards: true,
  },
};

export const PLANS: PlanDef[] = [
  {
    id: "FREE",
    name: "Free",
    nameBn: "ফ্রি",
    price: 0,
    period: "forever",
    tagline: "Start learning at no cost",
    features: [
      "30 AI questions / day",
      "Limited concept cards",
      "1 mock test / week",
      "Limited writing & speaking evaluations",
      "Unlimited reading & listening practice",
    ],
    limits: PLAN_LIMITS.FREE,
  },
  {
    id: "SSC_PRO",
    name: "SSC Pro",
    nameBn: "এসএসসি প্রো",
    price: 499,
    period: "month",
    tagline: "Full SSC Grade 9–10 preparation",
    features: [
      "Unlimited AI tutor questions",
      "All premium concept cards",
      "Unlimited board-style mock exams",
      "Custom exam builder",
      "Previous year questions",
      "Adaptive study plan & weak-topic detection",
    ],
    limits: PLAN_LIMITS.SSC_PRO,
  },
  {
    id: "IELTS_PRO",
    name: "IELTS Pro",
    nameBn: "আইইএলটিএস প্রো",
    price: 799,
    period: "month",
    tagline: "AI-scored writing & speaking",
    featured: true,
    features: [
      "Unlimited AI tutor questions",
      "30 writing evaluations / month",
      "30 speaking evaluations / month",
      "Full 4-skill mock tests",
      "Band progress tracker",
      "Model answer library (Band 7+)",
    ],
    limits: PLAN_LIMITS.IELTS_PRO,
  },
  {
    id: "BUNDLE",
    name: "SSC + IELTS Bundle",
    nameBn: "এসএসসি + আইইএলটিএস বান্ডেল",
    price: 1099,
    period: "month",
    tagline: "Best value for both tracks",
    features: [
      "Everything in SSC Pro",
      "Everything in IELTS Pro",
      "60 writing + 60 speaking evals / month",
      "Priority AI responses",
      "Cross-track study plan",
    ],
    limits: PLAN_LIMITS.BUNDLE,
  },
  {
    id: "SCHOOL",
    name: "School License",
    nameBn: "স্কুল লাইসেন্স",
    price: 0,
    period: "custom",
    tagline: "Bulk seats for institutions",
    b2b: true,
    features: [
      "Bulk student enrollment",
      "School-wide analytics dashboard",
      "License & seat management",
      "Class & subject performance reports",
      "Dedicated support & onboarding",
    ],
    limits: PLAN_LIMITS.SCHOOL,
  },
];

export function planById(id: SubscriptionPlan): PlanDef {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}
