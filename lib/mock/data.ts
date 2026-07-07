// ============================================================
// Rich mock datasets that power the dashboards in scaffold mode.
// The same shapes map onto the Prisma models, so swapping to real
// DB queries later is a drop-in change.
// ============================================================

export interface ConceptCardMock {
  id: string;
  title: string;
  subjectSlug: string;
  subject: string;
  chapter: string;
  track: "SSC" | "IELTS";
  language: "EN" | "BN";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  premium: boolean;
  explanation: string;
  example: string;
  commonMistakes: string[];
  practice: string[];
}

export const CONCEPT_CARDS: ConceptCardMock[] = [
  {
    id: "cc-newton-laws",
    title: "Newton's Laws of Motion",
    subjectSlug: "physics",
    subject: "Physics",
    chapter: "Force & Motion",
    track: "SSC",
    language: "EN",
    difficulty: "MEDIUM",
    premium: false,
    explanation:
      "Newton's three laws describe how objects move under the action of forces. The first law is about inertia, the second relates force to acceleration (F = ma), and the third states every action has an equal and opposite reaction.",
    example:
      "A 2 kg book pushed with 10 N accelerates at a = F/m = 10/2 = 5 m/s².",
    commonMistakes: [
      "Confusing mass with weight",
      "Forgetting that net force determines acceleration",
    ],
    practice: [
      "State Newton's second law and its formula.",
      "A 5 N force acts on a 1 kg object. Find its acceleration.",
    ],
  },
  {
    id: "cc-quadratic",
    title: "Solving Quadratic Equations",
    subjectSlug: "mathematics",
    subject: "Mathematics",
    chapter: "Algebra",
    track: "SSC",
    language: "EN",
    difficulty: "MEDIUM",
    premium: false,
    explanation:
      "A quadratic equation ax² + bx + c = 0 can be solved by factoring, completing the square, or the quadratic formula x = (-b ± √(b²−4ac)) / 2a.",
    example: "x² − 5x + 6 = 0 factors to (x−2)(x−3) = 0, so x = 2 or 3.",
    commonMistakes: ["Sign errors in the discriminant", "Forgetting the ± in the formula"],
    practice: ["Solve x² − 7x + 12 = 0.", "Find the discriminant of 2x² + 3x − 5 = 0."],
  },
  {
    id: "cc-periodic-table",
    title: "The Periodic Table",
    subjectSlug: "chemistry",
    subject: "Chemistry",
    chapter: "Periodic Properties",
    track: "SSC",
    language: "EN",
    difficulty: "EASY",
    premium: false,
    explanation:
      "Elements are arranged by increasing atomic number into periods (rows) and groups (columns). Elements in the same group share similar chemical properties.",
    example: "Group 1 (alkali metals) all react vigorously with water.",
    commonMistakes: ["Mixing up period and group", "Assuming atomic mass orders the table"],
    practice: ["Which group are the noble gases in?", "What property increases across a period?"],
  },
  {
    id: "cc-photosynthesis",
    title: "Photosynthesis",
    subjectSlug: "biology",
    subject: "Biology",
    chapter: "Plant Physiology",
    track: "SSC",
    language: "BN",
    difficulty: "MEDIUM",
    premium: false,
    explanation:
      "সালোকসংশ্লেষণ হলো এমন প্রক্রিয়া যেখানে সবুজ উদ্ভিদ সূর্যালোক, পানি ও কার্বন ডাই-অক্সাইড ব্যবহার করে গ্লুকোজ ও অক্সিজেন তৈরি করে।",
    example: "6CO₂ + 6H₂O + আলোকশক্তি → C₆H₁₂O₆ + 6O₂",
    commonMistakes: ["আলোক ও অন্ধকার বিক্রিয়া গুলিয়ে ফেলা", "ক্লোরোফিলের ভূমিকা ভুলে যাওয়া"],
    practice: ["সালোকসংশ্লেষণের সমীকরণ লেখো।", "কোন অঙ্গাণুতে এটি ঘটে?"],
  },
  {
    id: "cc-ohms-law",
    title: "Ohm's Law",
    subjectSlug: "physics",
    subject: "Physics",
    chapter: "Electricity",
    track: "SSC",
    language: "EN",
    difficulty: "EASY",
    premium: false,
    explanation:
      "Ohm's law states that the current through a conductor is proportional to the voltage across it: V = IR.",
    example: "A 12 V battery across a 4 Ω resistor drives I = V/R = 3 A.",
    commonMistakes: ["Confusing resistance and resistivity", "Unit mismatch"],
    practice: ["Find R if V = 9 V and I = 3 A.", "State Ohm's law."],
  },
  {
    id: "cc-tenses",
    title: "English Tenses Overview",
    subjectSlug: "english",
    subject: "English",
    chapter: "Grammar",
    track: "SSC",
    language: "EN",
    difficulty: "EASY",
    premium: false,
    explanation:
      "Tenses show the time of an action. The three main tenses (past, present, future) each have simple, continuous, perfect, and perfect-continuous forms.",
    example: "Present perfect: 'I have finished my homework.'",
    commonMistakes: ["Mixing past simple and present perfect", "Wrong auxiliary verb"],
    practice: ["Write a sentence in future continuous.", "Identify the tense: 'She was reading.'"],
  },
  {
    id: "cc-ict-networks",
    title: "Computer Networks Basics",
    subjectSlug: "ict",
    subject: "ICT",
    chapter: "Networking",
    track: "SSC",
    language: "EN",
    difficulty: "MEDIUM",
    premium: true,
    explanation:
      "A network connects devices to share data. LANs cover small areas, WANs span large distances, and the Internet is a global network of networks.",
    example: "Your home Wi-Fi is a LAN; connecting to a website uses a WAN.",
    commonMistakes: ["Confusing LAN and WAN", "Mixing up IP and MAC addresses"],
    practice: ["Define LAN.", "Name two network topologies."],
  },
  {
    id: "cc-ielts-task2",
    title: "IELTS Writing Task 2 Structure",
    subjectSlug: "writing",
    subject: "Writing",
    chapter: "Essay Writing",
    track: "IELTS",
    language: "EN",
    difficulty: "HARD",
    premium: true,
    explanation:
      "A high-scoring Task 2 essay has a clear introduction (paraphrase + thesis), two body paragraphs each with one main idea, and a concise conclusion.",
    example:
      "Intro → Body 1 (advantage + example) → Body 2 (disadvantage + example) → Conclusion.",
    commonMistakes: ["No clear thesis", "Under 250 words", "Memorised phrases overused"],
    practice: ["Write a thesis for a 'technology in education' essay.", "List 3 cohesive devices."],
  },
  {
    id: "cc-ielts-skimming",
    title: "Reading: Skimming & Scanning",
    subjectSlug: "reading",
    subject: "Reading",
    chapter: "Reading Strategies",
    track: "IELTS",
    language: "EN",
    difficulty: "MEDIUM",
    premium: false,
    explanation:
      "Skimming means reading quickly for the main idea; scanning means searching for specific details like names or numbers. Use both to manage the 60-minute test.",
    example: "Scan for a date to answer a 'when' question without reading every line.",
    commonMistakes: ["Reading every word", "Ignoring paragraph headings"],
    practice: ["When would you scan vs skim?", "Practise finding a keyword in 20 seconds."],
  },
  {
    id: "cc-ielts-collocations",
    title: "Academic Collocations",
    subjectSlug: "vocabulary",
    subject: "Vocabulary",
    chapter: "Lexical Resource",
    track: "IELTS",
    language: "EN",
    difficulty: "MEDIUM",
    premium: true,
    explanation:
      "Collocations are words that naturally go together (e.g. 'make a decision', 'conduct research'). Using them accurately lifts your Lexical Resource band.",
    example: "'Draw a conclusion' is correct; 'make a conclusion' is not.",
    commonMistakes: ["Direct translation from Bangla", "Wrong verb + noun pairing"],
    practice: ["Give a collocation with 'research'.", "Correct: 'do/make a mistake'?"],
  },
];

export interface MockExamInfo {
  id: string;
  title: string;
  kind: "SSC_BOARD" | "SSC_CUSTOM" | "IELTS_FULL" | "IELTS_SECTION";
  track: "SSC" | "IELTS";
  subject?: string;
  durationMin: number;
  totalMarks: number;
  questions: number;
  premium: boolean;
}

export const MOCK_EXAMS: MockExamInfo[] = [
  { id: "ex-phy-1", title: "Physics Board Model Test 1", kind: "SSC_BOARD", track: "SSC", subject: "Physics", durationMin: 180, totalMarks: 100, questions: 40, premium: false },
  { id: "ex-math-1", title: "Mathematics Half-Yearly Mock", kind: "SSC_BOARD", track: "SSC", subject: "Mathematics", durationMin: 180, totalMarks: 100, questions: 35, premium: false },
  { id: "ex-chem-1", title: "Chemistry Chapter 1–5 Test", kind: "SSC_CUSTOM", track: "SSC", subject: "Chemistry", durationMin: 90, totalMarks: 50, questions: 25, premium: true },
  { id: "ex-ielts-full", title: "IELTS Full Mock Test (4 skills)", kind: "IELTS_FULL", track: "IELTS", durationMin: 165, totalMarks: 40, questions: 40, premium: true },
  { id: "ex-ielts-read", title: "IELTS Reading Section Test", kind: "IELTS_SECTION", track: "IELTS", subject: "Reading", durationMin: 60, totalMarks: 40, questions: 40, premium: false },
];

export const SAMPLE_QUESTIONS = [
  { id: "q1", type: "MCQ", subject: "physics", prompt: "The SI unit of force is:", options: ["Joule", "Newton", "Watt", "Pascal"], correct: "Newton", marks: 1 },
  { id: "q2", type: "MCQ", subject: "physics", prompt: "Acceleration due to gravity (g) is approximately:", options: ["9.8 m/s²", "8.9 m/s²", "10.8 m/s²", "1.6 m/s²"], correct: "9.8 m/s²", marks: 1 },
  { id: "q3", type: "MCQ", subject: "mathematics", prompt: "The roots of x² − 5x + 6 = 0 are:", options: ["2 and 3", "1 and 6", "−2 and −3", "0 and 5"], correct: "2 and 3", marks: 1 },
  { id: "q4", type: "TRUE_FALSE", subject: "chemistry", prompt: "Noble gases are highly reactive.", options: ["True", "False"], correct: "False", marks: 1 },
  { id: "q5", type: "MCQ", subject: "chemistry", prompt: "The atomic number of Oxygen is:", options: ["6", "7", "8", "16"], correct: "8", marks: 1 },
  { id: "q6", type: "SHORT", subject: "biology", prompt: "Name the pigment responsible for photosynthesis.", options: [], correct: "Chlorophyll", marks: 2 },
  { id: "q7", type: "MCQ", subject: "english", prompt: "Choose the correct present-perfect sentence:", options: ["I finish work", "I have finished work", "I finishing work", "I finished works"], correct: "I have finished work", marks: 1 },
  { id: "q8", type: "MCQ", subject: "ict", prompt: "Which is a wide-area network?", options: ["Home Wi-Fi", "The Internet", "Bluetooth", "USB"], correct: "The Internet", marks: 1 },
  { id: "q9", type: "FILL_BLANK", subject: "mathematics", prompt: "The discriminant of ax²+bx+c is b² − ____.", options: [], correct: "4ac", marks: 1 },
  { id: "q10", type: "MCQ", subject: "reading", prompt: "Reading quickly for the main idea is called:", options: ["Scanning", "Skimming", "Parsing", "Drafting"], correct: "Skimming", marks: 1 },
];

// ---- Student dashboard data ----

export const WEAK_TOPICS = [
  { subject: "Physics", subjectSlug: "physics", topic: "Vectors & Resolution", mastery: 42, priority: "HARD" as const },
  { subject: "Mathematics", subjectSlug: "mathematics", topic: "Trigonometry", mastery: 55, priority: "HARD" as const },
  { subject: "Chemistry", subjectSlug: "chemistry", topic: "Mole Concept", mastery: 61, priority: "MEDIUM" as const },
  { subject: "Writing", subjectSlug: "writing", topic: "Task 2 Coherence", mastery: 58, priority: "MEDIUM" as const },
];

export const SUBJECT_MASTERY = [
  { subject: "Physics", mastery: 68 },
  { subject: "Mathematics", mastery: 74 },
  { subject: "Chemistry", mastery: 81 },
  { subject: "Biology", mastery: 77 },
  { subject: "English", mastery: 85 },
  { subject: "ICT", mastery: 90 },
];

export const RECENT_ACTIVITY = [
  { icon: "✅", text: "Completed 'Newton's Laws' concept card", time: "2h ago" },
  { icon: "📝", text: "Scored 82% on Physics Board Model Test 1", time: "Yesterday" },
  { icon: "🤖", text: "Asked AI Tutor 6 questions in Mathematics", time: "Yesterday" },
  { icon: "✍️", text: "IELTS Writing Task 2 evaluated — Band 6.5", time: "2 days ago" },
  { icon: "🔥", text: "Reached a 7-day study streak", time: "3 days ago" },
];

export const STUDY_TIME_WEEK = [
  { day: "Mon", min: 45 },
  { day: "Tue", min: 70 },
  { day: "Wed", min: 30 },
  { day: "Thu", min: 90 },
  { day: "Fri", min: 55 },
  { day: "Sat", min: 120 },
  { day: "Sun", min: 60 },
];

export const MOCK_SCORES = [
  { label: "Physics MT1", score: 82 },
  { label: "Math HY", score: 74 },
  { label: "Chem T1", score: 88 },
  { label: "IELTS Read", score: 79 },
];

export const STUDY_PLAN_TASKS = [
  { day: "Mon", title: "Revise Vectors & Resolution", subject: "Physics", estMinutes: 45, priority: "HARD" as const, completed: true },
  { day: "Mon", title: "10 MCQ practice — Algebra", subject: "Mathematics", estMinutes: 20, priority: "MEDIUM" as const, completed: true },
  { day: "Tue", title: "Trigonometry worked examples", subject: "Mathematics", estMinutes: 40, priority: "HARD" as const, completed: false },
  { day: "Tue", title: "Read: Skimming & Scanning card", subject: "Reading", estMinutes: 25, priority: "MEDIUM" as const, completed: false },
  { day: "Wed", title: "Mole Concept concept card", subject: "Chemistry", estMinutes: 35, priority: "MEDIUM" as const, completed: false },
  { day: "Thu", title: "Writing Task 2 — full essay", subject: "Writing", estMinutes: 40, priority: "HARD" as const, completed: false },
  { day: "Fri", title: "Physics Board Model Test 2", subject: "Physics", estMinutes: 60, priority: "HARD" as const, completed: false },
  { day: "Sat", title: "Vocabulary: 20 collocations", subject: "Vocabulary", estMinutes: 30, priority: "MEDIUM" as const, completed: false },
];

export const BAND_PROGRESS = [
  { skill: "Listening", current: 7.0, target: 7.5 },
  { skill: "Reading", current: 6.5, target: 7.5 },
  { skill: "Writing", current: 6.0, target: 7.0 },
  { skill: "Speaking", current: 6.5, target: 7.0 },
];

export const ACHIEVEMENTS = [
  { title: "7-Day Streak", icon: "🔥" },
  { title: "First Mock Exam", icon: "📝" },
  { title: "Chemistry Master", icon: "⚗️" },
  { title: "100 AI Questions", icon: "🤖" },
];

export const NOTIFICATIONS = [
  { type: "EXAM_COUNTDOWN", title: "SSC exam in 84 days", body: "Stay on track with your study plan.", time: "1h ago", read: false },
  { type: "STREAK_ALERT", title: "Keep your streak alive!", body: "Study 30 minutes today to keep your 7-day streak.", time: "5h ago", read: false },
  { type: "REPORT_READY", title: "Weekly report ready", body: "Your progress report for this week is available.", time: "1d ago", read: true },
  { type: "ACHIEVEMENT", title: "New achievement unlocked", body: "You earned 'Chemistry Master'.", time: "2d ago", read: true },
];
