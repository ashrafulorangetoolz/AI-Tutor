import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/payments/gateways";
import { planById } from "@/lib/constants/plans";
import type { PaymentProvider, SubscriptionPlan } from "@/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const plan = (body.plan ?? "SSC_PRO") as SubscriptionPlan;
    const provider = (body.provider ?? "BKASH") as PaymentProvider;
    const session = await createCheckout({
      provider,
      plan,
      amount: planById(plan).price,
      userId: body.userId ?? "usr_student",
    });
    return NextResponse.json(session);
  } catch {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
