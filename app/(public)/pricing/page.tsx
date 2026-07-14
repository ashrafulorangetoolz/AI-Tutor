import Link from "next/link";
import {
  Building2,
  Users,
  BarChart3,
  KeyRound,
  FileBarChart2,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import { CTASection, SectionWrap } from "@/components/public/sections";
import { PricingPlans } from "@/components/public/PricingPlans";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { PLANS, planById } from "@/lib/constants/plans";

export const metadata = { title: "Pricing" };

const school = planById("SCHOOL");

// Feature list paired with icons for the School License block.
const SCHOOL_FEATURES = [
  { icon: Users, label: "Bulk student enrollment" },
  { icon: BarChart3, label: "School-wide analytics dashboard" },
  { icon: KeyRound, label: "License & seat management" },
  { icon: FileBarChart2, label: "Class & subject performance reports" },
  { icon: LifeBuoy, label: "Dedicated support & onboarding" },
] as const;

const SCHOOL_STATS = [
  { value: "Unlimited", label: "AI questions" },
  { value: "Per seat", label: "Flexible billing" },
  { value: "24/7", label: "Priority support" },
] as const;

export default function PricingPage() {
  return (
    <>
      <SectionWrap>
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge border border-line bg-surface text-muted shadow-card">
            Pricing
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Unlock every subject.
            <br />
            Ace every exam.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted">
            Start free and upgrade any time. Every plan includes the bilingual AI
            tutor — schools get custom pricing.
          </p>
        </div>

        <div className="mt-12">
          <PricingPlans plans={PLANS.filter((p) => !p.b2b)} />
        </div>
      </SectionWrap>

      <SectionWrap className="!pt-4">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-900 to-brand-900 p-6 shadow-brand sm:p-10 lg:p-12">
          {/* soft glow orbs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl"
          />
          {/* dotted grid overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />
          {/* top sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-12">
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
                <Building2 className="h-3.5 w-3.5" />
                For institutions · B2B
              </span>

              <h3 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {school.name}
              </h3>
              <p className="mt-1.5 font-bangla text-sm text-white/50">
                {school.nameBn}
              </p>
              <p className="mt-4 max-w-lg text-base text-white/70">
                {school.tagline} — bring the bilingual AI tutor to your entire
                campus with centralized management and reporting.
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {SCHOOL_FEATURES.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-sm text-white/90 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/10"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/20 text-brand-200">
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing panel */}
            <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-7 text-center shadow-pop backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-200">
                Custom license
              </p>
              <div className="mt-3 flex items-baseline justify-center gap-1.5">
                <span className="text-5xl font-extrabold tracking-tight text-white">
                  Custom
                </span>
              </div>
              <p className="mt-2 text-sm text-white/60">
                Priced per seat, invoiced to your institution.
              </p>

              <Link
                href="/contact"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-brand-50"
              >
                Contact sales
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {SCHOOL_STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="text-lg font-extrabold text-white">
                      {s.value}
                    </dt>
                    <dd className="mt-0.5 text-[11px] leading-tight text-white/50">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
          All prices are in Bangladeshi Taka (৳) and billed monthly. Pay with bKash,
          Nagad or card, and cancel any time — schools can be invoiced under a custom
          license.
        </p>
      </SectionWrap>

      <FAQAccordion />

      <SectionWrap>
        <CTASection
          title="Start learning smarter today"
          subtitle="Try the AI tutor free — no card required. Upgrade whenever you're ready."
          secondaryHref="/contact"
          secondaryLabel="Talk to sales"
        />
      </SectionWrap>
    </>
  );
}
