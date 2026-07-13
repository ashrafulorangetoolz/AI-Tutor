import {
  Users,
  BarChart3,
  Ticket,
  ClipboardList,
  LineChart,
  LifeBuoy,
  ArrowRight,
  Building2,
  Upload,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { SectionHeading, Badge } from "@/components/ui/primitives";
import { StatStrip, CTASection, SectionWrap } from "@/components/public/sections";
import { ScrollReveal } from "@/components/public/Reveal";
import { FUTURE_TRACKS } from "@/lib/constants/site";
import { GradientBackdrop } from "@/components/ui/GradientBackdrop";
import { cn } from "@/lib/utils/cn";

export const metadata = { title: "For Schools" };

const SCHOOL_FEATURES = [
  {
    icon: Users,
    color: "#7034ea",
    title: "Bulk Enrollment",
    description:
      "Onboard hundreds of students at once by uploading a single CSV — no manual account creation.",
  },
  {
    icon: BarChart3,
    color: "#2e90fa",
    title: "School-wide Analytics",
    description:
      "See engagement, mastery and mock results across your whole institution in one live dashboard.",
  },
  {
    icon: Ticket,
    color: "#09c07a",
    title: "License & Seat Management",
    description:
      "Assign, reassign and reclaim seats through the year as students join or leave your school.",
  },
  {
    icon: ClipboardList,
    color: "#f5a524",
    title: "Class & Subject Reports",
    description:
      "Drill into performance by class, group and subject to see exactly where support is needed.",
  },
  {
    icon: LineChart,
    color: "#ff5714",
    title: "Student Progress Tracking",
    description:
      "Follow each student's study time, weak topics and improvement over the term at a glance.",
  },
  {
    icon: LifeBuoy,
    color: "#5da0b3",
    title: "Dedicated Support",
    description:
      "Get priority onboarding and a dedicated point of contact to help your teachers get started.",
  },
];

const DASHBOARD_STATS = [
  { value: "480", label: "Students" },
  { value: "76%", label: "Avg score" },
  { value: "500", label: "Seats" },
  { value: "12", label: "Classes" },
];

const ENROLL_STEPS = [
  {
    icon: Upload,
    title: "Upload CSV",
    description:
      "Export your student roster and upload it — names, emails and classes.",
  },
  {
    icon: Building2,
    title: "Assign classes",
    description:
      "Map students to classes and subjects so reports stay neatly organised.",
  },
  {
    icon: GraduationCap,
    title: "Students get access",
    description:
      "Each student receives their login and starts learning right away.",
  },
];

const CLASS_ROWS = [
  { name: "Class 10 — Science A", score: 82, tone: "bg-brand-500" },
  { name: "Class 10 — Business B", score: 74, tone: "bg-info" },
  { name: "Class 9 — Science A", score: 68, tone: "bg-warning" },
  { name: "IELTS Batch 3", score: 71, tone: "bg-secondary-500" },
];

export default function SchoolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-[88px] overflow-hidden pt-[88px]">
        <GradientBackdrop />
        <div className="section flex flex-col items-center py-20 text-center lg:py-28">
          <span className="pill-gradient-border mb-6 inline-flex items-center gap-2 px-5 py-1.5 text-sm font-semibold text-ink">
            <Building2 className="h-4 w-4 text-brand-500" />
            For institutions
          </span>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[4.5rem]">
            AI learning for your{" "}
            <span className="text-gradient-brand">whole school</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            A B2B license that brings the bilingual AI tutor, board-style mocks
            and progress analytics to every student — with the management tools
            your administrators and teachers need.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Request a demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <SectionWrap className="!py-8">
        <StatStrip stats={DASHBOARD_STATS} />
      </SectionWrap>

      {/* Features */}
      <SectionWrap>
        <SectionHeading
          center
          pill
          eyebrow="For institutions"
          title="Everything"
          accent="your school needs"
          subtitle="Built to scale from a single class to your entire student body."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SCHOOL_FEATURES.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.05}>
              <div className="group h-full rounded-3xl border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-brand">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                  style={{ background: `${f.color}1A`, color: f.color }}
                >
                  <f.icon className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrap>

      {/* Dashboard preview */}
      <SectionWrap>
        <SectionHeading
          center
          eyebrow="Dashboard preview"
          title="See your school"
          accent="at a glance"
          subtitle="A snapshot of the live analytics your administrators get on day one."
        />
        <ScrollReveal className="mt-12">
          <div className="overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50/70 via-surface to-secondary-50/50 p-4 shadow-card sm:p-8">
            <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
              {/* window chrome */}
              <div className="flex items-center gap-2 border-b border-line pb-4">
                <span className="h-3 w-3 rounded-full bg-coral-500/70" />
                <span className="h-3 w-3 rounded-full bg-warning/70" />
                <span className="h-3 w-3 rounded-full bg-secondary-500/70" />
                <span className="ml-3 text-sm font-semibold text-ink">
                  School Analytics
                </span>
                <Badge tone="green" className="ml-auto">
                  Live
                </Badge>
              </div>

              {/* stat tiles */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {DASHBOARD_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-line bg-brand-50/60 px-4 py-5 text-center"
                  >
                    <div className="font-display text-3xl font-extrabold text-brand-500">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs font-medium text-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* class performance bars */}
              <div className="mt-6 rounded-2xl border border-line bg-canvas/40 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <TrendingUp className="h-4 w-4 text-brand-500" />
                  Average score by class
                </div>
                <ul className="mt-4 space-y-3.5">
                  {CLASS_ROWS.map((r) => (
                    <li key={r.name} className="flex items-center gap-4">
                      <span className="w-40 shrink-0 truncate text-sm text-muted">
                        {r.name}
                      </span>
                      <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-black/5">
                        <span
                          className={cn("block h-full rounded-full", r.tone)}
                          style={{ width: `${r.score}%` }}
                        />
                      </span>
                      <span className="w-10 shrink-0 text-right text-sm font-semibold text-ink">
                        {r.score}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrap>

      {/* Bulk enrollment steps */}
      <SectionWrap>
        <SectionHeading
          center
          pill
          eyebrow="Bulk enrollment"
          title="Get every student"
          accent="online in minutes"
          subtitle="Three steps from a spreadsheet to a classroom that's ready to learn."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ENROLL_STEPS.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.08}>
              <div className="relative h-full rounded-3xl border border-line bg-surface p-7 shadow-card">
                <span className="absolute right-6 top-6 font-display text-5xl font-extrabold text-brand-100">
                  {i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                  <step.icon className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <h4 className="mt-5 text-xl font-semibold text-ink">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrap>

      {/* Future tracks */}
      <SectionWrap className="!pt-4">
        <ScrollReveal>
          <div className="rounded-3xl border border-line bg-gradient-to-br from-secondary-50/60 to-surface p-8 text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <Sparkles className="h-4 w-4 text-secondary-600" />
              More tracks on the way
            </span>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {FUTURE_TRACKS.map((t) => (
                <Badge key={t.name} tone="amber">
                  Coming soon: {t.name}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </SectionWrap>

      {/* CTA */}
      <SectionWrap>
        <CTASection
          badge="B2B license"
          title="Bring AI tutoring to your school"
          subtitle="Book a demo and we'll walk your team through enrollment, analytics and licensing."
          primaryHref="/contact"
          primaryLabel="Request a demo"
          secondaryHref="/contact"
          secondaryLabel="Talk to sales"
          trust={["Bulk enrollment", "Dedicated support", "Custom pricing"]}
        />
      </SectionWrap>
    </>
  );
}
