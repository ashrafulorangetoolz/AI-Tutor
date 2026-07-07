import type { NavItem, UserRole } from "@/types";

export const PUBLIC_NAV: NavItem[] = [
  { label: "SSC", labelBn: "এসএসসি", href: "/ssc" },
  { label: "IELTS", labelBn: "আইইএলটিএস", href: "/ielts" },
  { label: "Schools", labelBn: "স্কুল", href: "/schools" },
  { label: "Pricing", labelBn: "মূল্য", href: "/pricing" },
  { label: "Contact", labelBn: "যোগাযোগ", href: "/contact" },
];

export const STUDENT_NAV: NavItem[] = [
  { label: "Overview", labelBn: "সারসংক্ষেপ", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "AI Tutor", labelBn: "এআই টিউটর", href: "/dashboard/ai-tutor", icon: "Sparkles" },
  { label: "Doubt Solver", labelBn: "সমস্যা সমাধান", href: "/dashboard/doubt-solver", icon: "Camera" },
  { label: "Concept Cards", labelBn: "কনসেপ্ট কার্ড", href: "/dashboard/concept-cards", icon: "BookOpen" },
  { label: "Mock Exams", labelBn: "মক পরীক্ষা", href: "/dashboard/mock-exams", icon: "FileCheck2" },
  { label: "IELTS Lab", labelBn: "আইইএলটিএস ল্যাব", href: "/dashboard/ielts", icon: "Languages" },
  { label: "Study Plan", labelBn: "স্টাডি প্ল্যান", href: "/dashboard/study-plan", icon: "CalendarCheck" },
  { label: "Progress", labelBn: "অগ্রগতি", href: "/dashboard/progress", icon: "TrendingUp" },
  { label: "Settings", labelBn: "সেটিংস", href: "/dashboard/settings", icon: "Settings" },
];

export const PARENT_NAV: NavItem[] = [
  { label: "Overview", labelBn: "সারসংক্ষেপ", href: "/parent", icon: "LayoutDashboard" },
];

export const SCHOOL_NAV: NavItem[] = [
  { label: "Overview", labelBn: "সারসংক্ষেপ", href: "/school", icon: "LayoutDashboard" },
  { label: "Students", labelBn: "শিক্ষার্থী", href: "/school/students", icon: "Users" },
  { label: "Reports", labelBn: "রিপোর্ট", href: "/school/reports", icon: "BarChart3" },
];

export const ADMIN_NAV: NavItem[] = [
  { label: "Overview", labelBn: "সারসংক্ষেপ", href: "/admin", icon: "LayoutDashboard" },
  { label: "Users", labelBn: "ব্যবহারকারী", href: "/admin/users", icon: "Users" },
  { label: "Content", labelBn: "কনটেন্ট", href: "/admin/content", icon: "BookOpen" },
  { label: "Subscriptions", labelBn: "সাবস্ক্রিপশন", href: "/admin/subscriptions", icon: "CreditCard" },
  { label: "Analytics", labelBn: "অ্যানালিটিক্স", href: "/admin/analytics", icon: "BarChart3" },
  { label: "Payments", labelBn: "পেমেন্ট", href: "/admin/payments", icon: "Wallet" },
  { label: "Notifications", labelBn: "নোটিফিকেশন", href: "/admin/notifications", icon: "Bell" },
];

export const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  STUDENT: STUDENT_NAV,
  PARENT: PARENT_NAV,
  SCHOOL_ADMIN: SCHOOL_NAV,
  SUPER_ADMIN: ADMIN_NAV,
};

export const ROLE_HOME: Record<UserRole, string> = {
  STUDENT: "/dashboard",
  PARENT: "/parent",
  SCHOOL_ADMIN: "/school",
  SUPER_ADMIN: "/admin",
};

export const ROLE_LABEL: Record<UserRole, { en: string; bn: string }> = {
  STUDENT: { en: "Student", bn: "শিক্ষার্থী" },
  PARENT: { en: "Parent", bn: "অভিভাবক" },
  SCHOOL_ADMIN: { en: "School Admin", bn: "স্কুল অ্যাডমিন" },
  SUPER_ADMIN: { en: "Super Admin", bn: "সুপার অ্যাডমিন" },
};
