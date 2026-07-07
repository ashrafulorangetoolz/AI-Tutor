import { Check } from "lucide-react";
import { SectionHeading, Card, CardBody, Badge, LinkButton } from "@/components/ui/primitives";
import { CTASection, SectionWrap } from "@/components/public/sections";
import { PricingPlans } from "@/components/public/PricingPlans";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { PLANS, planById } from "@/lib/constants/plans";

export const metadata = { title: "Pricing" };

const school = planById("SCHOOL");

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
        <Card>
          <CardBody className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-ink">{school.name}</h3>
                <Badge tone="blue">B2B</Badge>
              </div>
              <p className="font-bangla text-sm text-muted">{school.nameBn}</p>
              <p className="mt-3 text-muted">{school.tagline}</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {school.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-brand-50 p-6 text-center">
              <div className="text-3xl font-extrabold text-ink">Custom</div>
              <p className="mt-1 text-sm text-muted">
                Priced per seat, invoiced to your institution.
              </p>
              <LinkButton href="/contact" className="mt-5 w-full">
                Contact sales
              </LinkButton>
            </div>
          </CardBody>
        </Card>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
          All prices are in Bangladeshi Taka (৳) and billed monthly. Pay with bKash,
          Nagad or card, and cancel any time — schools can be invoiced under a custom
          license.
        </p>
      </SectionWrap>

      <SectionWrap>
        <SectionHeading center eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10">
          <FAQAccordion />
        </div>
      </SectionWrap>

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
