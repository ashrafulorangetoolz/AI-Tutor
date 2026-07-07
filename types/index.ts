// ============================================================
// Shared domain types for the AI Tutor Platform
// Mirror the Prisma enums so the UI can be built without a live DB.
// ============================================================

export type UserRole = "STUDENT" | "PARENT" | "SCHOOL_ADMIN" | "SUPER_ADMIN";

export type TrackType = "SSC" | "IELTS" | "BOTH";

export type Language = "EN" | "BN";

export type SscGroup = "SCIENCE" | "BUSINESS" | "HUMANITIES";

export type SubscriptionPlan =
  | "FREE"
  | "SSC_PRO"
  | "IELTS_PRO"
  | "BUNDLE"
  | "SCHOOL";

export type PaymentProvider = "BKASH" | "NAGAD" | "STRIPE";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type QuestionType = "MCQ" | "SHORT" | "BROAD" | "TRUE_FALSE" | "FILL_BLANK";

export type DifficultyLevel = "EASY" | "MEDIUM" | "HARD";

export type ExamStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "GRADED";

// ---- UI helper types ----

export interface NavItem {
  label: string;
  labelBn?: string;
  href: string;
  icon?: string;
}

export interface SubjectDef {
  slug: string;
  name: string;
  nameBn: string;
  icon: string;
  color: string;
  group?: SscGroup | "COMMON";
  track: "SSC" | "IELTS";
  chapters: number;
}

export interface PlanDef {
  id: SubscriptionPlan;
  name: string;
  nameBn: string;
  price: number; // BDT / month
  period: string;
  tagline: string;
  featured?: boolean;
  b2b?: boolean;
  features: string[];
  limits: PlanLimits;
}

export interface PlanLimits {
  aiQuestionsPerDay: number; // -1 = unlimited
  mockTestsPerWeek: number;
  writingEvalsPerMonth: number;
  speakingEvalsPerMonth: number;
  premiumConceptCards: boolean;
}

// ---- AI service types ----

export interface TutorRequest {
  userId: string;
  track: TrackType;
  subject: string;
  topic: string;
  language: Language;
  question: string;
}

export interface TutorResponse {
  explanation: string;
  steps: string[];
  example: string;
  practiceQuestions: string[];
  recommendedConceptCards: { id: string; title: string }[];
  provider: string;
  mocked: boolean;
}

export interface WritingScoreRequest {
  taskType: "TASK1" | "TASK2";
  essay: string;
  targetBand: number;
}

export interface WritingScoreResponse {
  estimatedBand: number;
  taskAchievement: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammar: number;
  improvementSuggestions: string[];
  rewrittenSample: string;
  mocked: boolean;
}

export interface SpeakingScoreRequest {
  transcript?: string;
  audioFileName?: string;
  question: string;
  targetBand: number;
}

export interface SpeakingScoreResponse {
  fluency: number;
  pronunciation: number;
  grammar: number;
  vocabulary: number;
  estimatedBand: number;
  improvementTips: string[];
  mocked: boolean;
}

export interface OcrResult {
  text: string;
  confidence: number;
  provider: string;
  mocked: boolean;
}
