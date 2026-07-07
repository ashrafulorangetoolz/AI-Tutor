import "dotenv/config";
import {
  PrismaClient,
  type TrackType,
  type SscGroup,
  type QuestionType,
  type DifficultyLevel,
} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { SSC_SUBJECTS, IELTS_MODULES } from "../lib/constants/subjects";
import { CONCEPT_CARDS, MOCK_EXAMS, SAMPLE_QUESTIONS } from "../lib/mock/data";
import { DEMO_USERS } from "../lib/auth/users";

// Prisma 7 connects via a driver adapter (no Rust engine).
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding AI Tutor Platform…");

  // ---- Subjects + one intro chapter each ----
  const subjectDefs = [...SSC_SUBJECTS, ...IELTS_MODULES];
  const subjectIdBySlug: Record<string, string> = {};

  for (const s of subjectDefs) {
    const subject = await prisma.subject.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        name: s.name,
        nameBn: s.nameBn,
        track: (s.track === "SSC" ? "SSC" : "IELTS") as TrackType,
        group: (s.group && s.group !== "COMMON" ? s.group : null) as SscGroup | null,
        icon: s.icon,
        color: s.color,
      },
    });
    subjectIdBySlug[s.slug] = subject.id;

    // A default chapter so concept cards & questions have a home.
    await prisma.chapter.create({
      data: {
        subjectId: subject.id,
        title: `${s.name} — Introduction`,
        order: 1,
      },
    });
  }

  // ---- Concept cards (10) ----
  for (const cc of CONCEPT_CARDS) {
    const chapter = await prisma.chapter.findFirst({
      where: { subject: { slug: cc.subjectSlug } },
    });
    if (!chapter) continue;
    await prisma.conceptCard.create({
      data: {
        chapterId: chapter.id,
        title: cc.title,
        subjectSlug: cc.subjectSlug,
        track: cc.track as TrackType,
        language: cc.language,
        explanation: cc.explanation,
        example: cc.example,
        commonMistakes: cc.commonMistakes,
        practice: cc.practice,
        difficulty: cc.difficulty as DifficultyLevel,
        premium: cc.premium,
      },
    });
  }

  // ---- Sample questions (10) ----
  const questionIds: string[] = [];
  for (const q of SAMPLE_QUESTIONS) {
    const subjectId = subjectIdBySlug[q.subject];
    if (!subjectId) continue;
    const created = await prisma.question.create({
      data: {
        subjectId,
        type: q.type as QuestionType,
        prompt: q.prompt,
        options: q.options,
        correctAnswer: q.correct,
        marks: q.marks,
      },
    });
    questionIds.push(created.id);
  }

  // ---- Mock exams (attach a few questions each) ----
  for (const ex of MOCK_EXAMS) {
    const exam = await prisma.mockExam.create({
      data: {
        title: ex.title,
        kind: ex.kind,
        track: ex.track as TrackType,
        subjectSlug: ex.subject?.toLowerCase(),
        durationMin: ex.durationMin,
        totalMarks: ex.totalMarks,
        premium: ex.premium,
      },
    });
    // Link up to 5 questions for demonstration.
    for (let i = 0; i < Math.min(5, questionIds.length); i++) {
      await prisma.mockExamQuestion.create({
        data: { examId: exam.id, questionId: questionIds[i], order: i },
      });
    }
  }

  // ---- Demo users + subscriptions + profiles ----
  for (const u of DEMO_USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        avatarColor: u.avatarColor,
      },
    });

    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: { plan: u.plan },
      create: { userId: user.id, plan: u.plan },
    });

    if (u.role === "STUDENT") {
      await prisma.studentProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          track: "BOTH",
          grade: "Class 10",
          sscGroup: "SCIENCE",
          targetBand: 7.5,
          studyStreak: 7,
          totalStudyMin: 4820,
          examDate: new Date(Date.now() + 84 * 86_400_000),
        },
      });

      // A study plan with tasks
      const plan = await prisma.studyPlan.create({
        data: { userId: user.id, title: "This Week's Adaptive Plan" },
      });
      await prisma.studyPlanTask.createMany({
        data: [
          { planId: plan.id, title: "Revise Vectors & Resolution", subjectSlug: "physics", day: "Mon", estMinutes: 45, priority: "HARD", completed: true },
          { planId: plan.id, title: "Trigonometry worked examples", subjectSlug: "mathematics", day: "Tue", estMinutes: 40, priority: "HARD" },
          { planId: plan.id, title: "Writing Task 2 — full essay", subjectSlug: "writing", day: "Thu", estMinutes: 40, priority: "HARD" },
        ],
      });

      await prisma.weakTopic.createMany({
        data: [
          { userId: user.id, subjectSlug: "physics", topic: "Vectors & Resolution", mastery: 42, priority: "HARD" },
          { userId: user.id, subjectSlug: "mathematics", topic: "Trigonometry", mastery: 55, priority: "HARD" },
        ],
      });

      await prisma.achievement.createMany({
        data: [
          { userId: user.id, title: "7-Day Streak", icon: "🔥" },
          { userId: user.id, title: "Chemistry Master", icon: "⚗️" },
        ],
      });

      await prisma.notification.createMany({
        data: [
          { userId: user.id, type: "EXAM_COUNTDOWN", title: "SSC exam in 84 days", body: "Stay on track with your study plan." },
          { userId: user.id, type: "STREAK_ALERT", title: "Keep your streak alive!", body: "Study 30 minutes today." },
        ],
      });
    }
  }

  // ---- Link parent ↔ student ----
  const parentUser = DEMO_USERS.find((u) => u.role === "PARENT");
  if (parentUser) {
    const parent = await prisma.parentProfile.upsert({
      where: { userId: parentUser.id },
      update: {},
      create: { userId: parentUser.id },
    });
    await prisma.studentProfile.updateMany({
      where: { userId: "usr_student" },
      data: { parentId: parent.id },
    });
  }

  // ---- School + enrollment ----
  const schoolAdmin = DEMO_USERS.find((u) => u.role === "SCHOOL_ADMIN");
  if (schoolAdmin) {
    const school = await prisma.school.create({
      data: {
        name: "Dhaka Model School",
        address: "Dhaka, Bangladesh",
        adminId: schoolAdmin.id,
        licenseSeats: 500,
        usedSeats: 480,
      },
    });
    await prisma.schoolEnrollment.create({
      data: { schoolId: school.id, studentId: "usr_student", className: "Class 10 · Science" },
    });
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
