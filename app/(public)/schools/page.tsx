import { SectionHeading, Card, CardBody, Badge, LinkButton } from "@/components/ui/primitives";
import { FeatureGrid, CTASection, SectionWrap } from "@/components/public/sections";
import { FUTURE_TRACKS } from "@/lib/constants/site";

export const metadata = { title: "For Schools" };

const SCHOOL_FEATURES = [
  {
    icon: "👥",
    title: "Bulk Enrollment",
    description:
      "Onboard hundreds of students at once by uploading a single CSV — no manual account creation.",
  },
  {
    icon: "📊",
    title: "School-wide Analytics",
    description:
      "See engagement, mastery and mock results across your whole institution in one live dashboard.",
  },
  {
    icon: "🎫",
    title: "License & Seat Management",
    description:
      "Assign, reassign and reclaim seats through the year as students join or leave your school.",
  },
  {
    icon: "📈",
    title: "Class & Subject Reports",
    description:
      "Drill into performance by class, group and subject to see exactly where support is needed.",
  },
  {
    icon: "📉",
    title: "Student Progress Tracking",
    description:
      "Follow each student's study time, weak topics and improvement over the term at a glance.",
  },
  {
    icon: "🤝",
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
    title: "Upload CSV",
    description: "Export your student roster and upload it — names, emails and classes.",
  },
  {
    title: "Assign classes",
    description: "Map students to classes and subjects so reports stay neatly organised.",
  },
  {
    title: "Students get access",
    description: "Each student receives their login and starts learning right away.",
  },
];

export default function SchoolsPage() {
  return (
    <>
      <SectionWrap>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">
            AI learning for your whole school
          </h1>
          <p className="mt-4 text-lg text-muted">
            A B2B license that brings the bilingual AI tutor, board-style mocks and
            progress analytics to every student — with the management tools your
            administrators and teachers need.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="/contact">Request a demo</LinkButton>
            <LinkButton href="/pricing" variant="secondary">
              See pricing
            </LinkButton>
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="!pt-4">
        <SectionHeading
          eyebrow="For institutions"
          title="Everything your school needs"
          subtitle="Built to scale from a single class to your entire student body."
        />
        <div className="mt-10">
          <FeatureGrid features={SCHOOL_FEATURES} />
        </div>
      </SectionWrap>

      <SectionWrap>
        <SectionHeading
          eyebrow="Dashboard preview"
          title="See your school at a glance"
          subtitle="A snapshot of the live analytics your administrators get on day one."
        />
        <div className="mt-10">
          <Card>
            <CardBody>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {DASHBOARD_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-line bg-brand-50 px-5 py-6 text-center"
                  >
                    <div className="text-3xl font-extrabold text-ink">{s.value}</div>
                    <div className="mt-1 text-xs font-medium text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </SectionWrap>

      <SectionWrap>
        <SectionHeading
          eyebrow="Bulk enrollment"
          title="Get every student online in minutes"
          subtitle="Three steps from a spreadsheet to a classroom that's ready to learn."
        />
        <div className="mt-10">
          <Card>
            <CardBody>
              <ol className="grid gap-6 sm:grid-cols-3">
                {ENROLL_STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-base font-semibold text-ink">{step.title}</h4>
                      <p className="mt-1 text-sm text-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </div>
      </SectionWrap>

      <SectionWrap className="!pt-4">
        <div className="rounded-2xl border border-line bg-surface p-6 text-center">
          <p className="text-sm font-semibold text-ink">More tracks on the way</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {FUTURE_TRACKS.map((t) => (
              <Badge key={t.name} tone="amber">
                Coming soon: {t.name}
              </Badge>
            ))}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap>
        <CTASection
          title="Bring AI tutoring to your school"
          subtitle="Book a demo and we'll walk your team through enrollment, analytics and licensing."
          primaryHref="/contact"
          primaryLabel="Request a demo"
          secondaryHref="/contact"
          secondaryLabel="Talk to sales"
        />
      </SectionWrap>
    </>
  );
}
