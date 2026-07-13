import {
  Bot,
  ScanText,
  Languages,
  ClipboardCheck,
  Target,
  PenLine,
  LineChart,
} from "lucide-react";
import Image from "next/image";
import { Hero } from "@/components/public/Hero";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { TutorVisual, DoubtVisual } from "@/components/public/HighlightVisuals";
import { FeatureStack } from "@/components/public/FeatureStack";
import {
  FeatureHighlight,
  StatStrip,
  ProgramCard,
  TrackCard,
  TestimonialSection,
  CTASection,
  SectionWrap,
} from "@/components/public/sections";
import { PricingPlans } from "@/components/public/PricingPlans";
import { ProductDemo } from "@/components/public/ProductDemo";
import { SectionHeading } from "@/components/ui/primitives";
import { PLANS } from "@/lib/constants/plans";

const STATS = [
  { value: "12,000+", label: "Students learning" },
  { value: "15", label: "SSC subjects" },
  { value: "50k+", label: "Questions solved" },
  { value: "4.9★", label: "Average rating" },
];

const ICON_CLS = "h-9 w-9 sm:h-11 sm:w-11";
const shot = (src: string, alt: string) => (
  <Image
    src={src}
    alt={alt}
    width={760}
    height={820}
    quality={100}
    sizes="(max-width: 1024px) 90vw, 460px"
    className="h-auto w-full rounded-2xl border border-line shadow-card"
  />
);
const FEATURES = [
  {
    icon: <Languages className={ICON_CLS} strokeWidth={1.75} />,
    visual: shot("/feature-ai-tutor.png", "Bilingual AI Tutor chat interface"),
    title: "Bilingual AI Tutor",
    description:
      "Step-by-step explanations in English and Bangla for every SSC subject and IELTS skill.",
    ctaHref: "/signup",
    ctaLabel: "Try the AI tutor",
  },
  {
    icon: <ScanText className={ICON_CLS} strokeWidth={1.75} />,
    visual: shot("/feature-doubt-solver.png", "Photo Doubt Solver interface"),
    title: "Photo Doubt Solver",
    description:
      "Snap a question — OCR reads it and the AI explains the full solution instantly.",
    ctaHref: "/signup",
    ctaLabel: "Solve a doubt",
  },
  {
    icon: <ClipboardCheck className={ICON_CLS} strokeWidth={1.75} />,
    visual: shot("/feature-mock-exams.png", "Board-style Mock Exams interface"),
    title: "Board-style Mock Exams",
    description:
      "Full SSC board models and 4-skill IELTS mocks with AI explanations and scoring.",
    ctaHref: "/signup",
    ctaLabel: "Take a mock exam",
  },
  {
    icon: <Target className={ICON_CLS} strokeWidth={1.75} />,
    visual: shot("/feature-study-plan.png", "Adaptive Study Plans interface"),
    title: "Adaptive Study Plans",
    description:
      "Personalized weekly roadmaps that focus on your weak topics automatically.",
    ctaHref: "/signup",
    ctaLabel: "Build my study plan",
  },
  {
    icon: <PenLine className={ICON_CLS} strokeWidth={1.75} />,
    visual: shot(
      "/feature-ielts-scorer.png",
      "IELTS Writing & Speaking Scorer interface",
    ),
    title: "IELTS Writing & Speaking Scorer",
    description:
      "Instant band estimates against official descriptors with targeted feedback.",
    ctaHref: "/signup",
    ctaLabel: "Score my IELTS",
  },
  {
    icon: <LineChart className={ICON_CLS} strokeWidth={1.75} />,
    visual: shot("/feature-progress.png", "Progress & Analytics dashboard"),
    title: "Progress & Parent Reports",
    description:
      "Track mastery, streaks and band progress — with weekly reports for parents.",
    ctaHref: "/signup",
    ctaLabel: "See my progress",
  },
];

const PROGRAMS = [
  {
    image: "/feature-mock-exams.png",
    emoji: "🧪",
    color: "#0FA06E",
    title: "SSC Science",
    description:
      "Physics, Chemistry, Biology & Higher Math with board-style mocks.",
    level: "Class 9–10",
    lessons: "8 subjects",
    duration: "Board mocks",
    rating: "4.9",
    priceLabel: "৳499/mo",
    href: "/ssc",
  },
  {
    image: "/feature-progress.png",
    emoji: "📊",
    color: "#F5A524",
    title: "SSC Business",
    description:
      "Accounting, Finance & Banking and Entrepreneurship, exam-ready.",
    level: "Class 9–10",
    lessons: "7 subjects",
    duration: "Prev. years",
    rating: "4.8",
    priceLabel: "৳499/mo",
    href: "/ssc",
  },
  {
    image: "/feature-ielts-scorer.png",
    emoji: "🌍",
    color: "#2E90FA",
    title: "IELTS Academic",
    description: "Reading, Listening, Writing & Speaking with AI band scoring.",
    level: "All levels",
    lessons: "4 skills",
    duration: "AI scoring",
    rating: "4.9",
    priceLabel: "৳799/mo",
    href: "/ielts",
  },
  {
    image: "/feature-ai-tutor.png",
    emoji: "🎓",
    color: "#7D69EF",
    title: "SSC + IELTS Bundle",
    description:
      "Everything in both tracks — the best value for serious students.",
    level: "Both tracks",
    lessons: "All modules",
    duration: "Best value",
    rating: "5.0",
    priceLabel: "৳1099/mo",
    href: "/pricing",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Stats band */}
      <SectionWrap className="!py-8">
        <StatStrip stats={STATS} />
      </SectionWrap>

      {/* 3. Why choose us — alternating feature highlights */}
      <SectionWrap>
        <SectionHeading
          center
          pill
          eyebrow="Why AI Tutor"
          title="Learn smarter,"
          accent="in the language you think in"
          subtitle="Two flagship tools that make studying for SSC and IELTS faster and less stressful."
        />
        <div className="mt-12 space-y-16">
          <FeatureHighlight
            tone="brand"
            icon={<Bot className="h-4 w-4" />}
            eyebrow="Bilingual AI Tutor"
            title="A tutor that explains —"
            accent="not just answers"
            description="Ask anything about your subjects and get patient, step-by-step teaching in English or বাংলা, with examples and practice questions."
            points={[
              "Step-by-step explanations, never just answers",
              "Switch between English and Bangla instantly",
              "Regenerate or explain more simply",
              "Save answers to revisit before exams",
            ]}
            ctaHref="/signup"
            ctaLabel="Try the AI tutor"
            rating="4.9/5.0"
            ratedBy="6,650 students"
            visual={<TutorVisual />}
          />
          <FeatureHighlight
            reverse
            tone="mint"
            icon={<ScanText className="h-4 w-4" />}
            eyebrow="Photo Doubt Solver + OCR"
            title="Stuck on a question?"
            accent="Just snap a photo"
            description="Upload a photo of any question — printed or handwritten. OCR reads it and the AI walks you through the full solution."
            points={[
              "Works with printed & handwritten questions",
              "OCR extracts text — edit before solving",
              "Full step-by-step worked solutions",
              "Save solved doubts for revision",
            ]}
            ctaHref="/signup"
            ctaLabel="Solve a doubt"
            rating="4.9/5.0"
            ratedBy="6,650 students"
            visual={<DoubtVisual />}
          />
        </div>
      </SectionWrap>

      <SectionWrap>
        {/* 4. Interactive product demo + project overview (full-width band) */}
        <section className=" border-y border-line bg-linear-to-b from-brand-50/50 via-surface to-secondary-50/30 py-16 sm:py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-10">
            <SectionHeading
              center
              pill
              eyebrow="See it in action"
              title="A full demo,"
              accent="every tool in one place"
              subtitle="Watch the complete walkthrough — the AI Tutor, Doubt Solver, Mock Exams and Progress, all in one place."
            />
            <div className="mt-12">
              <ProductDemo />
            </div>
          </div>
        </section>
      </SectionWrap>

      {/* 5. Programs grid (course-style) */}
      <SectionWrap>
        <SectionHeading
          center
          pill
          eyebrow="Programs"
          title="Pick your track,"
          accent="start today"
          subtitle="Structured programs mapped to the Bangladesh curriculum and the IELTS band descriptors."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <ProgramCard key={p.title} {...p} />
          ))}
        </div>
      </SectionWrap>

      {/* 5. Benefits — sticky-stacking feature cards */}
      <SectionWrap>
        <SectionHeading
          center
          pill
          eyebrow="Everything included"
          title="Steady progress,"
          accent="endless potential"
        />
        <div className="mt-12">
          <FeatureStack features={FEATURES} />
        </div>
      </SectionWrap>

      {/* 6. For families & schools (replaces instructors row) */}
      <SectionWrap>
        <SectionHeading
          center
          pill
          eyebrow="For families & schools"
          title="Everyone stays"
          accent="in the loop"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <TrackCard
            visual={
              <Image
                src="/parent-dashboard.png"
                alt="Parent Dashboard preview"
                width={2560}
                height={1640}
                quality={100}
                sizes="(max-width: 1024px) 90vw, 560px"
                className="h-auto w-full rounded-2xl border border-line shadow-card"
              />
            }
            title="Parent Dashboard"
            subtitle="Read-only monitoring"
            href="/signup"
            cta="Monitor progress"
            bullets={[
              "Weekly performance reports",
              "Study time & streak tracking",
              "Weak areas & early alerts",
              "Goals and achievements",
            ]}
          />
          <TrackCard
            visual={
              <Image
                src="/school-dashboard.png"
                alt="School Dashboard preview"
                width={2560}
                height={1640}
                quality={100}
                sizes="(max-width: 1024px) 90vw, 560px"
                className="h-auto w-full rounded-2xl border border-line shadow-card"
              />
            }
            title="School Dashboard"
            subtitle="B2B license for institutions"
            href="/schools"
            cta="For schools"
            accent="blue"
            bullets={[
              "Bulk student enrollment",
              "School-wide analytics",
              "License & seat management",
              "Class & subject performance reports",
            ]}
          />
        </div>
      </SectionWrap>

      {/* 7. Mid-page CTA band */}
      <SectionWrap className="!py-8">
        <CTASection
          title="Start free — no card required"
          subtitle="Join thousands of Bangladeshi students preparing smarter for SSC and IELTS."
          secondaryHref="/pricing"
          secondaryLabel="See pricing"
        />
      </SectionWrap>

      {/* 8. Testimonials */}
      <SectionWrap>
        <SectionHeading
          center
          pill
          eyebrow="Loved by students"
          title="Real results,"
          accent="in two languages"
        />
        <div className="mt-10">
          <TestimonialSection />
        </div>
      </SectionWrap>

      {/* 9. Pricing */}
      <SectionWrap id="pricing">
        <SectionHeading
          center
          eyebrow="Pricing"
          title="Plans for every learner"
          subtitle="Start free, upgrade any time. Schools get custom pricing."
        />
        <div className="mt-12">
          <PricingPlans plans={PLANS.filter((p) => !p.b2b)} />
        </div>
      </SectionWrap>

      {/* 10. FAQ */}
      <SectionWrap>
        <FAQAccordion />
      </SectionWrap>

      {/* 11. Final CTA */}
      <SectionWrap>
        <CTASection
          title="Start learning smarter today"
          subtitle="An AI tutor that speaks your language — for SSC and IELTS success."
          secondaryHref="/pricing"
          secondaryLabel="See pricing"
        />
      </SectionWrap>
    </>
  );
}
