import { Hero } from "@/components/public/Hero";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { TutorVisual, DoubtVisual } from "@/components/public/HighlightVisuals";
import {
  FeatureGrid,
  FeatureHighlight,
  StatStrip,
  ProgramCard,
  TrackCard,
  PricingCard,
  TestimonialSection,
  CTASection,
  SectionWrap,
} from "@/components/public/sections";
import { SectionHeading } from "@/components/ui/primitives";
import { PLANS } from "@/lib/constants/plans";

const STATS = [
  { value: "12,000+", label: "Students learning" },
  { value: "15", label: "SSC subjects" },
  { value: "50k+", label: "Questions solved" },
  { value: "4.9★", label: "Average rating" },
];

const FEATURES = [
  { icon: "🤖", title: "Bilingual AI Tutor", description: "Step-by-step explanations in English and Bangla for every SSC subject and IELTS skill." },
  { icon: "📸", title: "Photo Doubt Solver", description: "Snap a question — OCR reads it and the AI explains the full solution instantly." },
  { icon: "📝", title: "Board-style Mock Exams", description: "Full SSC board models and 4-skill IELTS mocks with AI explanations and scoring." },
  { icon: "🎯", title: "Adaptive Study Plans", description: "Personalized weekly roadmaps that focus on your weak topics automatically." },
  { icon: "✍️", title: "IELTS Writing & Speaking Scorer", description: "Instant band estimates against official descriptors with targeted feedback." },
  { icon: "📊", title: "Progress & Parent Reports", description: "Track mastery, streaks and band progress — with weekly reports for parents." },
];

const PROGRAMS = [
  { emoji: "🧪", color: "#0FA06E", title: "SSC Science", description: "Physics, Chemistry, Biology & Higher Math with board-style mocks.", level: "Class 9–10", lessons: "8 subjects", duration: "Board mocks", rating: "4.9", priceLabel: "৳499/mo", href: "/ssc" },
  { emoji: "📊", color: "#F5A524", title: "SSC Business", description: "Accounting, Finance & Banking and Entrepreneurship, exam-ready.", level: "Class 9–10", lessons: "7 subjects", duration: "Prev. years", rating: "4.8", priceLabel: "৳499/mo", href: "/ssc" },
  { emoji: "🌍", color: "#2E90FA", title: "IELTS Academic", description: "Reading, Listening, Writing & Speaking with AI band scoring.", level: "All levels", lessons: "4 skills", duration: "AI scoring", rating: "4.9", priceLabel: "৳799/mo", href: "/ielts" },
  { emoji: "🎓", color: "#7D69EF", title: "SSC + IELTS Bundle", description: "Everything in both tracks — the best value for serious students.", level: "Both tracks", lessons: "All modules", duration: "Best value", rating: "5.0", priceLabel: "৳1099/mo", href: "/pricing" },
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
          eyebrow="Why AI Tutor"
          title="Learn smarter, in the language you think in"
          subtitle="Two flagship tools that make studying for SSC and IELTS faster and less stressful."
        />
        <div className="mt-12 space-y-16">
          <FeatureHighlight
            eyebrow="Bilingual AI Tutor"
            title="A tutor that explains — not just answers"
            description="Ask anything about your subjects and get patient, step-by-step teaching in English or বাংলা, with examples and practice questions."
            points={[
              "Step-by-step explanations, never just the final answer",
              "Switch between English and Bangla with one tap",
              "Save answers, regenerate, or ask it to explain more simply",
            ]}
            ctaHref="/signup"
            ctaLabel="Try the AI tutor"
            visual={<TutorVisual />}
          />
          <FeatureHighlight
            reverse
            eyebrow="Photo Doubt Solver + OCR"
            title="Stuck on a question? Just snap a photo"
            description="Upload a photo of any question — printed or handwritten. OCR reads it and the AI walks you through the full solution."
            points={[
              "Works with printed and handwritten questions",
              "OCR extracts the text, you can edit before solving",
              "Save solved doubts to revisit before exams",
            ]}
            ctaHref="/signup"
            ctaLabel="Solve a doubt"
            visual={<DoubtVisual />}
          />
        </div>
      </SectionWrap>

      {/* 4. Programs grid (course-style) */}
      <SectionWrap>
        <SectionHeading
          center
          eyebrow="Programs"
          title="Pick your track and start today"
          subtitle="Structured programs mapped to the Bangladesh curriculum and the IELTS band descriptors."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((p) => (
            <ProgramCard key={p.title} {...p} />
          ))}
        </div>
      </SectionWrap>

      {/* 5. Benefits grid */}
      <SectionWrap>
        <SectionHeading
          center
          eyebrow="Everything included"
          title="Steady progress, endless potential"
        />
        <div className="mt-10">
          <FeatureGrid features={FEATURES} />
        </div>
      </SectionWrap>

      {/* 6. For families & schools (replaces instructors row) */}
      <SectionWrap>
        <SectionHeading center eyebrow="For families & schools" title="Everyone stays in the loop" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <TrackCard
            emoji="👨‍👩‍👧"
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
            emoji="🏫"
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
        <SectionHeading center eyebrow="Loved by students" title="Real results, in two languages" />
        <div className="mt-10">
          <TestimonialSection />
        </div>
      </SectionWrap>

      {/* 9. Pricing */}
      <SectionWrap id="pricing">
        <SectionHeading center eyebrow="Pricing" title="Plans for every learner" subtitle="Start free, upgrade any time. Schools get custom pricing." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.filter((p) => !p.b2b).map((p) => (
            <PricingCard key={p.id} plan={p} />
          ))}
        </div>
      </SectionWrap>

      {/* 10. FAQ */}
      <SectionWrap>
        <SectionHeading center eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10">
          <FAQAccordion />
        </div>
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
