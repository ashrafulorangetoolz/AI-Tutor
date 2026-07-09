// Mock data for admin, school and parent dashboards.

import { CHART_COLORS } from "@/lib/constants/chart";

export const ADMIN_STATS = {
  totalUsers: 12840,
  activeToday: 3120,
  mrr: 486000, // BDT
  aiCallsToday: 41230,
  activeSubs: 2980,
  conceptCards: 1240,
};

export const REVENUE_TREND = [
  { month: "Jan", bdt: 210000 },
  { month: "Feb", bdt: 248000 },
  { month: "Mar", bdt: 291000 },
  { month: "Apr", bdt: 337000 },
  { month: "May", bdt: 402000 },
  { month: "Jun", bdt: 486000 },
];

export const SIGNUPS_TREND = [
  { month: "Jan", count: 820 },
  { month: "Feb", count: 1100 },
  { month: "Mar", count: 1340 },
  { month: "Apr", count: 1610 },
  { month: "May", count: 2050 },
  { month: "Jun", count: 2480 },
];

export const PLAN_DISTRIBUTION = [
  { plan: "Free", count: 9860, color: CHART_COLORS.violet },
  { plan: "SSC Pro", count: 1420, color: CHART_COLORS.mint },
  { plan: "IELTS Pro", count: 980, color: CHART_COLORS.sky },
  { plan: "Bundle", count: 420, color: CHART_COLORS.sun },
  { plan: "School", count: 160, color: CHART_COLORS.coral },
];

export const ADMIN_USERS = [
  { id: "u1", name: "Rafi Hasan", email: "rafi@example.com", role: "STUDENT", plan: "FREE", status: "active", joined: "2025-01-12" },
  { id: "u2", name: "Nusrat Jahan", email: "nusrat@example.com", role: "STUDENT", plan: "SSC_PRO", status: "active", joined: "2025-02-03" },
  { id: "u3", name: "Tanvir Ahmed", email: "tanvir@example.com", role: "STUDENT", plan: "IELTS_PRO", status: "active", joined: "2025-02-20" },
  { id: "u4", name: "Salma Hasan", email: "salma@example.com", role: "PARENT", plan: "FREE", status: "active", joined: "2025-03-01" },
  { id: "u5", name: "Dhaka Model School", email: "admin@dms.edu.bd", role: "SCHOOL_ADMIN", plan: "SCHOOL", status: "active", joined: "2025-03-15" },
  { id: "u6", name: "Imran Kabir", email: "imran@example.com", role: "STUDENT", plan: "BUNDLE", status: "suspended", joined: "2025-04-02" },
  { id: "u7", name: "Farhana Akter", email: "farhana@example.com", role: "STUDENT", plan: "IELTS_PRO", status: "active", joined: "2025-04-19" },
];

export const ADMIN_PAYMENTS = [
  { id: "p1", user: "Nusrat Jahan", provider: "BKASH", plan: "SSC_PRO", amount: 499, status: "PAID", date: "2025-06-01" },
  { id: "p2", user: "Tanvir Ahmed", provider: "STRIPE", plan: "IELTS_PRO", amount: 799, status: "PAID", date: "2025-06-02" },
  { id: "p3", user: "Imran Kabir", provider: "NAGAD", plan: "BUNDLE", amount: 1099, status: "PAID", date: "2025-06-03" },
  { id: "p4", user: "Farhana Akter", provider: "BKASH", plan: "IELTS_PRO", amount: 799, status: "PENDING", date: "2025-06-05" },
  { id: "p5", user: "Rafi Hasan", provider: "STRIPE", plan: "SSC_PRO", amount: 499, status: "FAILED", date: "2025-06-06" },
];

export const ADMIN_SUBSCRIPTIONS = [
  { id: "s1", user: "Nusrat Jahan", plan: "SSC_PRO", status: "ACTIVE", started: "2025-06-01", renews: "2025-07-01" },
  { id: "s2", user: "Tanvir Ahmed", plan: "IELTS_PRO", status: "ACTIVE", started: "2025-06-02", renews: "2025-07-02" },
  { id: "s3", user: "Imran Kabir", plan: "BUNDLE", status: "CANCELLED", started: "2025-04-02", renews: "—" },
  { id: "s4", user: "Farhana Akter", plan: "IELTS_PRO", status: "TRIALING", started: "2025-06-05", renews: "2025-06-12" },
];

// ---- School dashboard ----

export const SCHOOL_STATS = {
  name: "Dhaka Model School",
  totalStudents: 480,
  activeStudents: 372,
  avgPerformance: 76,
  licenseSeats: 500,
  usedSeats: 480,
};

export const SCHOOL_STUDENTS = [
  { id: "st1", name: "Rafi Hasan", class: "Class 10 · Science", avgScore: 82, streak: 7, status: "active" },
  { id: "st2", name: "Ayesha Siddiqua", class: "Class 10 · Science", avgScore: 91, streak: 21, status: "active" },
  { id: "st3", name: "Sabbir Rahman", class: "Class 9 · Business", avgScore: 64, streak: 2, status: "active" },
  { id: "st4", name: "Mitu Akter", class: "Class 10 · Humanities", avgScore: 78, streak: 5, status: "active" },
  { id: "st5", name: "Jahid Hasan", class: "Class 9 · Science", avgScore: 55, streak: 0, status: "inactive" },
  { id: "st6", name: "Rumana Islam", class: "Class 10 · Science", avgScore: 88, streak: 14, status: "active" },
];

export const SCHOOL_CLASS_PERFORMANCE = [
  { class: "Class 9 · Science", avg: 71, students: 120 },
  { class: "Class 10 · Science", avg: 79, students: 140 },
  { class: "Class 9 · Business", avg: 68, students: 90 },
  { class: "Class 10 · Humanities", avg: 74, students: 130 },
];

export const SCHOOL_SUBJECT_PERFORMANCE = [
  { subject: "Physics", avg: 72 },
  { subject: "Mathematics", avg: 75 },
  { subject: "Chemistry", avg: 80 },
  { subject: "English", avg: 83 },
  { subject: "ICT", avg: 88 },
];

// ---- Parent dashboard ----

export const PARENT_CHILD = {
  name: "Rafi Hasan",
  class: "Class 10 · Science",
  avgScore: 82,
  studyMinThisWeek: 470,
  streak: 7,
  examInDays: 84,
  weakAreas: ["Physics · Vectors", "Math · Trigonometry"],
  goals: [
    { title: "Study 7 hours this week", progress: 78 },
    { title: "Complete Physics chapter 4", progress: 60 },
    { title: "Score 85%+ in next mock", progress: 100 },
  ],
  achievements: ["7-Day Streak", "Chemistry Master", "First Mock Exam"],
  alerts: [
    { level: "warning", text: "Physics mastery dropped 8% this week." },
    { level: "info", text: "Missed 2 study-plan tasks on Wednesday." },
  ],
  weeklyStudy: [
    { day: "Mon", min: 45 },
    { day: "Tue", min: 70 },
    { day: "Wed", min: 30 },
    { day: "Thu", min: 90 },
    { day: "Fri", min: 55 },
    { day: "Sat", min: 120 },
    { day: "Sun", min: 60 },
  ],
};
