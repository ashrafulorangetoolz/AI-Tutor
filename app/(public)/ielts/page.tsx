import { SectionHeading, Card, CardBody, ProgressBar, LinkButton } from "@/components/ui/primitives";
import { FeatureGrid, TrackCard, CTASection, SectionWrap } from "@/components/public/sections";

export const metadata = { title: "IELTS Track" };

const IELTS_FEATURES = [
  {
    icon: "📖",
    title: "Reading",
    description:
      "Timed academic and general passages with question-type strategies and instant answer explanations.",
  },
  {
    icon: "🎧",
    title: "Listening",
    description:
      "Full four-section listening tests with native-speed audio, transcripts and answer breakdowns.",
  },
  {
    icon: "✍️",
    title: "Writing Task 1 & 2 Scorer",
    description:
      "Submit any essay and get an estimated band across all four criteria with line-level improvement notes.",
  },
  {
    icon: "🎤",
    title: "Speaking Evaluator",
    description:
      "Answer real Part 1–3 prompts out loud and receive fluency, pronunciation and vocabulary feedback.",
  },
  {
    icon: "📚",
    title: "Vocabulary Builder",
    description:
      "Learn high-band topic vocabulary and collocations with spaced-repetition practice that sticks.",
  },
  {
    icon: "🔤",
    title: "Grammar Builder",
    description:
      "Target the grammar range examiners reward — complex sentences, tenses and accuracy drills.",
  },
  {
    icon: "📈",
    title: "Band Progress Tracker",
    description:
      "Watch your estimated band climb across every skill over time, with clear next-step targets.",
  },
  {
    icon: "📝",
    title: "Full Mock Test",
    description:
      "Sit a complete four-skill mock under exam conditions and get a combined overall band estimate.",
  },
  {
    icon: "🏆",
    title: "Model Answer Library",
    description:
      "Study Band 7+ sample answers for every task type and speaking topic to see what top scores look like.",
  },
];

const BANDS = [
  { skill: "Listening", current: 6.5, target: 7.5, tone: "brand" as const },
  { skill: "Reading", current: 7.0, target: 8.0, tone: "blue" as const },
  { skill: "Writing", current: 6.0, target: 7.0, tone: "amber" as const },
  { skill: "Speaking", current: 6.5, target: 7.5, tone: "brand" as const },
];

export default function IeltsPage() {
  return (
    <>
      <SectionWrap>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">
            Complete IELTS Preparation
          </h1>
          <p className="mt-4 text-lg text-muted">
            Practice all four skills, get AI-scored writing and speaking against the
            official band descriptors, and track your progress toward your target band —
            all in one place.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="/signup">Start free</LinkButton>
            <LinkButton href="/pricing" variant="secondary">
              See IELTS Pro
            </LinkButton>
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="!pt-4">
        <SectionHeading
          eyebrow="Every skill covered"
          title="From practice to a real band estimate"
          subtitle="Reading, listening, writing and speaking — plus the vocabulary and grammar that lift your score."
        />
        <div className="mt-10">
          <FeatureGrid features={IELTS_FEATURES} columns={3} />
        </div>
      </SectionWrap>

      <SectionWrap>
        <SectionHeading
          eyebrow="AI scoring"
          title="Get examiner-style feedback"
          subtitle="The two skills students fear most — scored instantly against the official criteria."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <TrackCard
            emoji="✍️"
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
            emoji="🎤"
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

      <SectionWrap>
        <SectionHeading
          eyebrow="Progress"
          title="See your band climb"
          subtitle="A sample learner's journey from current estimate toward their target band."
        />
        <div className="mt-10">
          <Card>
            <CardBody className="space-y-6">
              {BANDS.map((b) => (
                <div key={b.skill}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-ink">{b.skill}</span>
                    <span className="text-muted">
                      <span className="font-semibold text-ink">{b.current.toFixed(1)}</span>{" "}
                      / target {b.target.toFixed(1)}
                    </span>
                  </div>
                  <ProgressBar
                    className="mt-2"
                    tone={b.tone}
                    value={(b.current / 9) * 100}
                  />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </SectionWrap>

      <SectionWrap>
        <CTASection
          title="Reach your target band faster"
          subtitle="Start free, then unlock unlimited writing and speaking evaluations with IELTS Pro."
          secondaryHref="/pricing"
          secondaryLabel="See IELTS Pro"
        />
      </SectionWrap>
    </>
  );
}
