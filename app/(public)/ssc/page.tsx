import {
  SectionHeading,
  Card,
  CardBody,
  StatPill,
} from "@/components/ui/primitives";
import { LinkButton } from "@/components/ui/primitives";
import {
  FeatureGrid,
  CTASection,
  SectionWrap,
} from "@/components/public/sections";
import { SSC_SUBJECTS, SSC_GROUPS } from "@/lib/constants/subjects";
import type { SubjectDef } from "@/types";
import { GradientBackdrop } from "@/components/ui/GradientBackdrop";

export const metadata = { title: "SSC Track" };

const SSC_FEATURES = [
  {
    icon: "📚",
    title: "Curriculum Mapping",
    description:
      "Every concept card and exercise is mapped to the Bangladesh National Curriculum for Grade 9–10, chapter by chapter.",
  },
  {
    icon: "📝",
    title: "Board-style Mock Exams",
    description:
      "Sit full board-model exams with realistic MCQ, CQ and SQ patterns — then get AI-explained solutions instantly.",
  },
  {
    icon: "🎯",
    title: "Custom Exam Builder",
    description:
      "Build your own practice paper by subject, chapter and difficulty to target exactly what you need to revise.",
  },
  {
    icon: "📂",
    title: "Previous Year Questions",
    description:
      "Practice with a library of past board questions, sorted by topic, with step-by-step model answers.",
  },
  {
    icon: "🎙️",
    title: "Voice AI Tutor",
    description:
      "Ask questions out loud and hear explanations in Bangla or English — like a private tutor available any time.",
  },
  {
    icon: "📉",
    title: "Weak Topic Detection",
    description:
      "The AI spots the chapters you keep losing marks on and quietly moves them to the top of your study list.",
  },
  {
    icon: "🧠",
    title: "Adaptive Study Plan",
    description:
      "Get a weekly roadmap that rebalances itself around your exam date, progress and weak topics automatically.",
  },
];

function SubjectCard({ subject }: { subject: SubjectDef }) {
  return (
    <Card>
      <CardBody className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
          style={{ background: subject.color + "1A" }}
        >
          {subject.icon}
        </div>
        <div className="min-w-0">
          <h4 className="text-xl font-semibold text-ink">{subject.name}</h4>
          <p className="font-bangla text-sm text-muted">{subject.nameBn}</p>
          <p className="mt-1 text-xs text-muted">{subject.chapters} chapters</p>
        </div>
      </CardBody>
    </Card>
  );
}

const COMMON_SUBJECTS = SSC_SUBJECTS.filter((s) => s.group === "COMMON");

export default function SscPage() {
  return (
    <>
      <SectionWrap>
        <GradientBackdrop />
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">
            SSC Grade 9–10 Preparation
          </h1>
          <p className="mt-4 text-lg text-muted">
            A complete, bilingual study platform built around the Bangladesh
            National Curriculum — covering every group, subject and chapter with
            board-style practice and an AI tutor that explains in Bangla and
            English.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="/signup">Start free</LinkButton>
            <LinkButton href="/pricing" variant="secondary">
              See SSC Pro
            </LinkButton>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatPill value="4" label="Groups" />
            <StatPill value="15" label="Subjects" />
            <StatPill value="Board" label="Board-style mocks" />
            <StatPill value="বাংলা" label="Bangla + English" />
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="!pt-4">
        <SectionHeading
          eyebrow="Curriculum"
          title="Every subject, every group"
          subtitle="Common subjects are shared by all students. Choose your group for its specialised subjects."
        />

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-ink">
            Common (all students)
          </h3>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COMMON_SUBJECTS.map((s) => (
              <SubjectCard key={s.slug} subject={s} />
            ))}
          </div>
        </div>

        {SSC_GROUPS.map((group) => {
          const subjects = SSC_SUBJECTS.filter((s) => s.group === group.id);
          return (
            <div key={group.id} className="mt-12">
              <h3 className="text-lg font-semibold text-ink">
                {group.name}{" "}
                <span className="font-bangla text-base font-normal text-muted">
                  · {group.nameBn}
                </span>
              </h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {subjects.map((s) => (
                  <SubjectCard key={s.slug} subject={s} />
                ))}
              </div>
            </div>
          );
        })}
      </SectionWrap>

      <SectionWrap>
        <SectionHeading
          eyebrow="What you get"
          title="Tools built for the board exam"
          subtitle="Everything you need to move from memorising to mastering — in one place."
        />
        <div className="mt-10">
          <FeatureGrid features={SSC_FEATURES} />
        </div>
      </SectionWrap>

      <SectionWrap>
        <CTASection
          title="Ready to ace your SSC exams?"
          subtitle="Start free today and upgrade to SSC Pro whenever you're ready for unlimited practice."
          secondaryHref="/pricing"
          secondaryLabel="See SSC Pro"
        />
      </SectionWrap>
    </>
  );
}
