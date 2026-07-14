import {
  BookMarked,
  ClipboardCheck,
  SlidersHorizontal,
  FolderClosed,
  Mic,
  ScanSearch,
  CalendarRange,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/primitives";
import { StatStrip, CTASection, SectionWrap } from "@/components/public/sections";
import { ScrollReveal } from "@/components/public/Reveal";
import { SSC_SUBJECTS, SSC_GROUPS } from "@/lib/constants/subjects";
import type { SubjectDef } from "@/types";
import { GradientBackdrop } from "@/components/ui/GradientBackdrop";

export const metadata = { title: "SSC Track" };

const HERO_STATS = [
  { value: "4", label: "Groups" },
  { value: "15", label: "Subjects" },
  { value: "Board", label: "Board-style mocks" },
  { value: "বাংলা", label: "Bangla + English" },
];

const SSC_FEATURES = [
  {
    icon: BookMarked,
    color: "#7034ea",
    title: "Curriculum Mapping",
    description:
      "Every concept card and exercise is mapped to the Bangladesh National Curriculum for Grade 9–10, chapter by chapter.",
  },
  {
    icon: ClipboardCheck,
    color: "#2e90fa",
    title: "Board-style Mock Exams",
    description:
      "Sit full board-model exams with realistic MCQ, CQ and SQ patterns — then get AI-explained solutions instantly.",
  },
  {
    icon: SlidersHorizontal,
    color: "#09c07a",
    title: "Custom Exam Builder",
    description:
      "Build your own practice paper by subject, chapter and difficulty to target exactly what you need to revise.",
  },
  {
    icon: FolderClosed,
    color: "#f5a524",
    title: "Previous Year Questions",
    description:
      "Practice with a library of past board questions, sorted by topic, with step-by-step model answers.",
  },
  {
    icon: Mic,
    color: "#ff5714",
    title: "Voice AI Tutor",
    description:
      "Ask questions out loud and hear explanations in Bangla or English — like a private tutor available any time.",
  },
  {
    icon: ScanSearch,
    color: "#5da0b3",
    title: "Weak Topic Detection",
    description:
      "The AI spots the chapters you keep losing marks on and quietly moves them to the top of your study list.",
  },
  {
    icon: CalendarRange,
    color: "#2e90fa",
    title: "Adaptive Study Plan",
    description:
      "Get a weekly roadmap that rebalances itself around your exam date, progress and weak topics automatically.",
  },
];

function SubjectCard({ subject }: { subject: SubjectDef }) {
  return (
    <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-surface p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-brand">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl transition-transform group-hover:scale-110"
        style={{ background: subject.color + "1A" }}
      >
        {subject.icon}
      </div>
      <div className="min-w-0">
        <h4 className="text-lg font-semibold text-ink">{subject.name}</h4>
        <p className="mt-1 text-xs text-muted">{subject.chapters} chapters</p>
      </div>
    </div>
  );
}

const COMMON_SUBJECTS = SSC_SUBJECTS.filter((s) => s.group === "COMMON");

export default function SscPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-[88px] overflow-hidden pt-[88px]">
        <GradientBackdrop />
        <div className="section flex flex-col items-center py-20 text-center lg:py-28">
          <span className="pill-gradient-border mb-6 inline-flex items-center gap-2 px-5 py-1.5 text-sm font-semibold text-ink">
            <GraduationCap className="h-4 w-4 text-brand-500" />
            Bangladesh National Curriculum
          </span>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[4.5rem]">
            SSC Grade 9–10{" "}
            <span className="text-gradient-brand">Preparation</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            A complete, bilingual study platform built around the Bangladesh
            National Curriculum — covering every group, subject and chapter with
            board-style practice and an AI tutor that explains in Bangla and
            English.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/signup" className="btn-primary">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              See SSC Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-line bg-linear-to-b from-brand-50/50 via-surface to-secondary-50/30 py-8">
        <div className="section">
          <StatStrip stats={HERO_STATS} />
        </div>
      </section>

      {/* Curriculum */}
      <SectionWrap>
        <SectionHeading
          center
          pill
          eyebrow="Curriculum"
          title="Every subject,"
          accent="every group"
          subtitle="Common subjects are shared by all students. Choose your group for its specialised subjects."
        />

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-ink">
            Common (all students)
          </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COMMON_SUBJECTS.map((s, i) => (
              <ScrollReveal key={s.slug} delay={(i % 4) * 0.05}>
                <SubjectCard subject={s} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {SSC_GROUPS.map((group) => {
          const subjects = SSC_SUBJECTS.filter((s) => s.group === group.id);
          return (
            <div key={group.id} className="mt-14">
              <h3 className="text-lg font-semibold text-ink">
                {group.name}{" "}
                <span className="font-bangla text-base font-normal text-muted">
                  · {group.nameBn}
                </span>
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {subjects.map((s, i) => (
                  <ScrollReveal key={s.slug} delay={(i % 4) * 0.05}>
                    <SubjectCard subject={s} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          );
        })}
      </SectionWrap>

      {/* Features */}
      <section className="border-y border-line bg-linear-to-b from-brand-50/50 via-surface to-secondary-50/30 py-16 sm:py-20">
        <div className="section">
          <SectionHeading
            center
            pill
            eyebrow="What you get"
            title="Tools built for"
            accent="the board exam"
            subtitle="Everything you need to move from memorising to mastering — in one place."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SSC_FEATURES.map((f, i) => (
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
        </div>
      </section>

      {/* CTA */}
      <SectionWrap>
        <CTASection
          badge="SSC Pro"
          title="Ready to ace your SSC exams?"
          subtitle="Start free today and upgrade to SSC Pro whenever you're ready for unlimited practice."
          primaryHref="/signup"
          primaryLabel="Start free"
          secondaryHref="/pricing"
          secondaryLabel="See SSC Pro"
          trust={["Board-style mocks", "Bangla + English", "15 subjects"]}
        />
      </SectionWrap>
    </>
  );
}
