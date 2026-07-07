import type { TutorRequest, TutorResponse } from "@/types";
import { textProvider } from "./provider";
import { TUTOR_SYSTEM_PROMPT, tutorUserPrompt } from "./prompts";

/**
 * Bilingual step-by-step tutoring.
 * Wire a real provider inside the `!mocked` branch; the mock keeps the same shape.
 */
export async function runTutor(req: TutorRequest): Promise<TutorResponse> {
  const { name, mocked } = textProvider();

  if (!mocked) {
    // --- Real provider integration goes here ---
    // Build with TUTOR_SYSTEM_PROMPT + tutorUserPrompt(req), call the model,
    // and parse the structured result. Falls through to mock on any failure.
    try {
      // Placeholder: intentionally not calling network in this scaffold.
      void tutorUserPrompt(req);
      void TUTOR_SYSTEM_PROMPT;
    } catch {
      /* fall through to mock */
    }
  }

  return mockTutor(req, name);
}

function mockTutor(req: TutorRequest, provider: string): TutorResponse {
  const bn = req.language === "BN";
  const t = req.topic || req.subject;

  const explanation = bn
    ? `চলো ধাপে ধাপে "${t}" বুঝি। প্রথমে মূল ধারণাটা সহজ করে ভাবো, তারপর আমরা একটা উদাহরণ দিয়ে এগোবো। ভয় পেয়ো না — অনুশীলন করলেই আয়ত্তে চলে আসবে।`
    : `Let's understand "${t}" step by step. First we'll get the core idea in plain language, then work through an example together. Don't worry — with a little practice this becomes second nature.`;

  const steps = bn
    ? [
        `মূল সংজ্ঞা ও কেন এটি "${req.subject}"-এ গুরুত্বপূর্ণ তা বোঝো।`,
        "সম্পর্কিত সূত্র বা নিয়মটি চিহ্নিত করো।",
        "একটি সহজ উদাহরণে নিয়মটি প্রয়োগ করে দেখাও।",
        "নিজে একটি অনুরূপ সমস্যা সমাধান করার চেষ্টা করো।",
      ]
    : [
        `Understand the core definition and why "${t}" matters in ${req.subject}.`,
        "Identify the key rule, formula, or principle involved.",
        "Apply the rule to a simple example, showing each move.",
        "Try a similar problem yourself to lock it in.",
      ];

  const example = bn
    ? `উদাহরণ: "${t}" বিষয়ে একটি সাধারণ বোর্ড-স্টাইল প্রশ্ন নাও এবং উপরের ধাপগুলো একে একে প্রয়োগ করো। প্রতিটি ধাপে নিজেকে জিজ্ঞাসা করো — "এখন কী জানি, পরের ধাপে কী দরকার?"`
    : `Example: take a typical board-style question on "${t}" and apply the steps above one by one. At each step ask yourself: "What do I know now, and what do I need next?"`;

  const practiceQuestions = bn
    ? [
        `"${t}" নিজের ভাষায় একটি বাক্যে ব্যাখ্যা করো।`,
        `"${t}" ব্যবহার করে একটি সহজ সমস্যা সমাধান করো।`,
        "একটি সাধারণ ভুল উল্লেখ করো এবং কীভাবে এড়াবে বলো।",
      ]
    : [
        `Explain "${t}" in one sentence in your own words.`,
        `Solve one easy problem that uses "${t}".`,
        "Name one common mistake and how to avoid it.",
      ];

  return {
    explanation,
    steps,
    example,
    practiceQuestions,
    recommendedConceptCards: [
      { id: `${req.subject}-intro`, title: `${t}: Core Concept` },
      { id: `${req.subject}-practice`, title: `${t}: Worked Examples` },
    ],
    provider,
    mocked: true,
  };
}

/** Doubt solving reuses the tutor engine but frames it around a single problem. */
export async function solveDoubt(opts: {
  userId: string;
  language: "EN" | "BN";
  subject?: string;
  question: string;
}): Promise<TutorResponse> {
  return runTutor({
    userId: opts.userId,
    track: "SSC",
    subject: opts.subject || "General",
    topic: opts.question.slice(0, 40),
    language: opts.language,
    question: opts.question,
  });
}
