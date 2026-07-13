import {
  BookOpen,
  Headphones,
  PenLine,
  Mic,
  Library,
  Type,
  TrendingUp,
  ClipboardCheck,
  Trophy,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading, Badge } from "@/components/ui/primitives";
import { TrackCard, CTASection, SectionWrap } from "@/components/public/sections";
import { ScrollReveal } from "@/components/public/Reveal";
import { GradientBackdrop } from "@/components/ui/GradientBackdrop";
import { cn } from "@/lib/utils/cn";

export const metadata = { title: "IELTS Track" };

const IELTS_FEATURES = [
  {
    icon: BookOpen,
    color: "#7034ea",
    title: "Reading",
    description:
      "Timed academic and general passages with question-type strategies and instant answer explanations.",
  },
  {
    icon: Headphones,
    color: "#2e90fa",
    title: "Listening",
    description:
      "Full four-section listening tests with native-speed audio, transcripts and answer breakdowns.",
  },
  {
    icon: PenLine,
    color: "#ff5714",
    title: "Writing Task 1 & 2 Scorer",
    description:
      "Submit any essay and get an estimated band across all four criteria with line-level improvement notes.",
  },
  {
    icon: Mic,
    color: "#09c07a",
    title: "Speaking Evaluator",
    description:
      "Answer real Part 1–3 prompts out loud and receive fluency, pronunciation and vocabulary feedback.",
  },
  {
    icon: Library,
    color: "#f5a524",
    title: "Vocabulary Builder",
    description:
      "Learn high-band topic vocabulary and collocations with spaced-repetition practice that sticks.",
  },
  {
    icon: Type,
    color: "#5da0b3",
    title: "Grammar Builder",
    description:
      "Target the grammar range examiners reward — complex sentences, tenses and accuracy drills.",
  },
  {
    icon: TrendingUp,
    color: "#2e90fa",
    title: "Band Progress Tracker",
    description:
      "Watch your estimated band climb across every skill over time, with clear next-step targets.",
  },
  {
    icon: ClipboardCheck,
    color: "#7034ea",
    title: "Full Mock Test",
    description:
      "Sit a complete four-skill mock under exam conditions and get a combined overall band estimate.",
  },
  {
    icon: Trophy,
    color: "#ff5714",
    title: "Model Answer Library",
    description:
      "Study Band 7+ sample answers for every task type and speaking topic to see what top scores look like.",
  },
];

const BANDS = [
  { skill: "Listening", current: 6.5, target: 7.5, tone: "bg-brand-500" },
  { skill: "Reading", current: 7.0, target: 8.0, tone: "bg-info" },
  { skill: "Writing", current: 6.0, target: 7.0, tone: "bg-warning" },
  { skill: "Speaking", current: 6.5, target: 7.5, tone: "bg-secondary-500" },
];

const OVERALL = 6.5;

export default function IeltsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-[88px] overflow-hidden pt-[88px]">
        <GradientBackdrop />
        <div className="section flex flex-col items-center py-20 text-center lg:py-28">
          <span className="pill-gradient-border mb-6 inline-flex items-center gap-2 px-5 py-1.5 text-sm font-semibold text-ink">
            <GraduationCap className="h-4 w-4 text-brand-500" />
            IELTS Academic & General
          </span>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[4.5rem]">
            Complete{" "}
            <span className="text-gradient-brand">IELTS Preparation</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            Practice all four skills, get AI-scored writing and speaking against
            the official band descriptors, and track your progress toward your
            target band — all in one place.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/signup" className="btn-primary">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              See IELTS Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <SectionWrap className="!pt-4">
        <SectionHeading
          center
          pill
          eyebrow="Every skill covered"
          title="From practice to"
          accent="a real band estimate"
          subtitle="Reading, listening, writing and speaking — plus the vocabulary and grammar that lift your score."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {IELTS_FEATURES.map((f, i) => (
            <ScrollReveal key={f.title} delay={(i % 3) * 0.05}>
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

      {/* AI scoring */}
      <SectionWrap>
        <SectionHeading
          center
          eyebrow="AI scoring"
          title="Get examiner-style"
          accent="feedback instantly"
          subtitle="The two skills students fear most — scored instantly against the official criteria."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <TrackCard
            visual={
              <Image
                src="/feature-ielts-scorer.png"
                alt="IELTS Writing Scorer interface"
                width={760}
                height={820}
                quality={100}
                sizes="(max-width: 1024px) 90vw, 560px"
                className="h-auto w-full rounded-2xl border border-line shadow-card"
              />
            }
            title="Writing Scorer"
            subtitle="Task 1 & Task 2"
            href="/signup"
            cta="Try writing scorer"
            bullets={[
              "Estimated band across all four criteria",
              "Task achievement & coherence feedback",
              "Line-level grammar and vocabulary notes",
              "Compare against Band 7+ model answers",
            ]}
          />
          <TrackCard
            visual={
              <Image
                src="/feature-ai-tutor.png"
                alt="IELTS Speaking Evaluator interface"
                width={760}
                height={820}
                quality={100}
                sizes="(max-width: 1024px) 90vw, 560px"
                className="h-auto w-full rounded-2xl border border-line shadow-card"
              />
            }
            title="Speaking Evaluator"
            subtitle="Parts 1, 2 & 3"
            href="/signup"
            cta="Try speaking evaluator"
            accent="blue"
            bullets={[
              "Record answers to real exam prompts",
              "Fluency & coherence scoring",
              "Pronunciation and lexical resource feedback",
              "Follow-up questions like a real examiner",
            ]}
          />
        </div>
      </SectionWrap>

      {/* Band progress preview */}
      <SectionWrap>
        <SectionHeading
          center
          eyebrow="Progress"
          title="See your band"
          accent="climb over time"
          subtitle="A sample learner's journey from current estimate toward their target band."
        />
        <ScrollReveal className="mt-12">
          <div className="overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50/70 via-surface to-secondary-50/50 p-4 shadow-card sm:p-8">
            <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
              {/* header */}
              <div className="flex items-center gap-4 border-b border-line pb-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                  <TrendingUp className="h-7 w-7" strokeWidth={1.9} />
                </span>
                <div>
                  <div className="text-sm text-muted">Estimated overall band</div>
                  <div className="font-display text-4xl font-extrabold text-brand-500">
                    {OVERALL.toFixed(1)}
                  </div>
                </div>
                <Badge tone="green" className="ml-auto">
                  On track
                </Badge>
              </div>

              {/* per-skill bands */}
              <ul className="mt-6 space-y-5">
                {BANDS.map((b) => (
                  <li key={b.skill}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-ink">{b.skill}</span>
                      <span className="text-muted">
                        <span className="font-semibold text-ink">
                          {b.current.toFixed(1)}
                        </span>{" "}
                        / target {b.target.toFixed(1)}
                      </span>
                    </div>
                    <div className="relative mt-2 h-2.5 w-full overflow-hidden rounded-full bg-black/5">
                      {/* target marker */}
                      <span
                        className="absolute top-1/2 z-10 h-4 w-0.5 -translate-y-1/2 rounded bg-ink/25"
                        style={{ left: `${(b.target / 9) * 100}%` }}
                      />
                      <span
                        className={cn("block h-full rounded-full", b.tone)}
                        style={{ width: `${(b.current / 9) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrap>

      {/* Future note + CTA */}
      <SectionWrap>
        <CTASection
          badge="IELTS Pro"
          title="Reach your target band faster"
          subtitle="Start free, then unlock unlimited writing and speaking evaluations with IELTS Pro."
          primaryHref="/signup"
          primaryLabel="Start free"
          secondaryHref="/pricing"
          secondaryLabel="See IELTS Pro"
          trust={["4-skill mocks", "AI band scoring", "Model answers"]}
        />
      </SectionWrap>
    </>
  );
}
