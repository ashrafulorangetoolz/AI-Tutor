import type { SubjectDef } from "@/types";

// ---- SSC subjects (Bangladesh National Curriculum, Grade 9–10) ----
export const SSC_SUBJECTS: SubjectDef[] = [
  // Common (all students)
  { slug: "bangla", name: "Bangla", nameBn: "বাংলা", icon: "📕", color: "#F6582B", group: "COMMON", track: "SSC", chapters: 14 },
  { slug: "english", name: "English", nameBn: "ইংরেজি", icon: "📗", color: "#0FA06E", group: "COMMON", track: "SSC", chapters: 12 },
  { slug: "mathematics", name: "Mathematics", nameBn: "গণিত", icon: "📐", color: "#2E90FA", group: "COMMON", track: "SSC", chapters: 17 },
  { slug: "ict", name: "ICT", nameBn: "তথ্য ও যোগাযোগ প্রযুক্তি", icon: "💻", color: "#7D69EF", group: "COMMON", track: "SSC", chapters: 6 },
  // Science group
  { slug: "physics", name: "Physics", nameBn: "পদার্থবিজ্ঞান", icon: "🧲", color: "#F5A524", group: "SCIENCE", track: "SSC", chapters: 14 },
  { slug: "chemistry", name: "Chemistry", nameBn: "রসায়ন", icon: "⚗️", color: "#0FA06E", group: "SCIENCE", track: "SSC", chapters: 12 },
  { slug: "biology", name: "Biology", nameBn: "জীববিজ্ঞান", icon: "🧬", color: "#2E90FA", group: "SCIENCE", track: "SSC", chapters: 14 },
  { slug: "higher-mathematics", name: "Higher Mathematics", nameBn: "উচ্চতর গণিত", icon: "📊", color: "#7D69EF", group: "SCIENCE", track: "SSC", chapters: 11 },
  // Business studies (commerce)
  { slug: "accounting", name: "Accounting", nameBn: "হিসাববিজ্ঞান", icon: "🧾", color: "#F6582B", group: "BUSINESS", track: "SSC", chapters: 12 },
  { slug: "finance-banking", name: "Finance & Banking", nameBn: "ফিন্যান্স ও ব্যাংকিং", icon: "🏦", color: "#0FA06E", group: "BUSINESS", track: "SSC", chapters: 11 },
  { slug: "business-entrepreneurship", name: "Business Entrepreneurship", nameBn: "ব্যবসায় উদ্যোগ", icon: "📈", color: "#F5A524", group: "BUSINESS", track: "SSC", chapters: 10 },
  // Humanities (arts)
  { slug: "history", name: "History of Bangladesh & World Civilization", nameBn: "বাংলাদেশ ও বিশ্বসভ্যতার ইতিহাস", icon: "🏛️", color: "#7D69EF", group: "HUMANITIES", track: "SSC", chapters: 12 },
  { slug: "civics", name: "Civics & Citizenship", nameBn: "পৌরনীতি ও নাগরিকতা", icon: "⚖️", color: "#2E90FA", group: "HUMANITIES", track: "SSC", chapters: 12 },
  { slug: "geography", name: "Geography & Environment", nameBn: "ভূগোল ও পরিবেশ", icon: "🌍", color: "#0FA06E", group: "HUMANITIES", track: "SSC", chapters: 14 },
  { slug: "economics", name: "Economics", nameBn: "অর্থনীতি", icon: "💹", color: "#F5A524", group: "HUMANITIES", track: "SSC", chapters: 11 },
];

// ---- IELTS modules ----
export const IELTS_MODULES: SubjectDef[] = [
  { slug: "reading", name: "Reading", nameBn: "রিডিং", icon: "📖", color: "#2E90FA", track: "IELTS", chapters: 8 },
  { slug: "listening", name: "Listening", nameBn: "লিসেনিং", icon: "🎧", color: "#0FA06E", track: "IELTS", chapters: 8 },
  { slug: "writing", name: "Writing", nameBn: "রাইটিং", icon: "✍️", color: "#F5A524", track: "IELTS", chapters: 6 },
  { slug: "speaking", name: "Speaking", nameBn: "স্পিকিং", icon: "🎤", color: "#F6582B", track: "IELTS", chapters: 6 },
  { slug: "vocabulary", name: "Vocabulary", nameBn: "শব্দভাণ্ডার", icon: "📚", color: "#7D69EF", track: "IELTS", chapters: 10 },
  { slug: "grammar", name: "Grammar", nameBn: "ব্যাকরণ", icon: "🔤", color: "#0FA06E", track: "IELTS", chapters: 10 },
];

export const ALL_SUBJECTS = [...SSC_SUBJECTS, ...IELTS_MODULES];

export const SSC_GROUPS = [
  { id: "SCIENCE", name: "Science", nameBn: "বিজ্ঞান" },
  { id: "BUSINESS", name: "Business Studies", nameBn: "ব্যবসায় শিক্ষা" },
  { id: "HUMANITIES", name: "Humanities", nameBn: "মানবিক" },
] as const;

export function subjectBySlug(slug: string): SubjectDef | undefined {
  return ALL_SUBJECTS.find((s) => s.slug === slug);
}

export function sscSubjectsForGroup(group: string): SubjectDef[] {
  return SSC_SUBJECTS.filter(
    (s) => s.group === "COMMON" || s.group === group,
  );
}
