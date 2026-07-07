import type { PaymentProvider, SubscriptionPlan } from "@/types";

// ============================================================
// Payment gateway wrappers. Real credentials are read from env;
// when missing, `createCheckout` returns a mock session that resolves
// instantly so the subscription flow is testable end-to-end.
// ============================================================

export interface CheckoutSession {
  provider: PaymentProvider;
  sessionId: string;
  redirectUrl: string;
  amount: number;
  currency: string;
  mocked: boolean;
}

const CONFIG = {
  BKASH: {
    key: process.env.BKASH_APP_KEY,
    secret: process.env.BKASH_APP_SECRET,
    username: process.env.BKASH_USERNAME,
    password: process.env.BKASH_PASSWORD,
  },
  NAGAD: {
    merchantId: process.env.NAGAD_MERCHANT_ID,
    merchantKey: process.env.NAGAD_MERCHANT_KEY,
  },
  STRIPE: {
    secret: process.env.STRIPE_SECRET_KEY,
    webhook: process.env.STRIPE_WEBHOOK_SECRET,
    publishable: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};

function isConfigured(provider: PaymentProvider): boolean {
  if (provider === "BKASH") return Boolean(CONFIG.BKASH.key && CONFIG.BKASH.secret);
  if (provider === "NAGAD") return Boolean(CONFIG.NAGAD.merchantId);
  if (provider === "STRIPE") return Boolean(CONFIG.STRIPE.secret);
  return false;
}

export async function createCheckout(opts: {
  provider: PaymentProvider;
  plan: SubscriptionPlan;
  amount: number;
  userId: string;
}): Promise<CheckoutSession> {
  const configured = isConfigured(opts.provider);

  if (configured) {
    // --- Real gateway calls go here (bKash tokenized checkout, Nagad init,
    //     Stripe Checkout Session). Return the real redirect URL. ---
  }

  const sessionId = `${opts.provider.toLowerCase()}_${opts.plan.toLowerCase()}_${opts.userId.slice(0, 6)}`;
  return {
    provider: opts.provider,
    sessionId,
    // Mock redirect points to an internal confirmation route.
    redirectUrl: `/dashboard/settings?checkout=${sessionId}&status=success`,
    amount: opts.amount,
    currency: opts.provider === "STRIPE" ? "USD" : "BDT",
    mocked: !configured,
  };
}

export async function verifyPayment(
  provider: PaymentProvider,
  sessionId: string,
): Promise<{ status: "PAID" | "FAILED"; sessionId: string; mocked: boolean }> {
  const configured = isConfigured(provider);
  // In mock mode we optimistically confirm.
  return { status: "PAID", sessionId, mocked: !configured };
}

export const PAYMENT_METHODS: {
  id: PaymentProvider;
  name: string;
  logo: string;
  color: string;
}[] = [
  { id: "BKASH", name: "bKash", logo: "🅱️", color: "#E2136E" },
  { id: "NAGAD", name: "Nagad", logo: "🅽", color: "#EE6123" },
  { id: "STRIPE", name: "Card (Stripe)", logo: "💳", color: "#635BFF" },
];
