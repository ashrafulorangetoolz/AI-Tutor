import type { SubscriptionPlan, UserRole } from "@/types";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  plan: SubscriptionPlan;
  avatarColor: string;
  meta?: Record<string, string>;
}

// Demo accounts used by the mock auth layer. In production these come from the DB.
export const DEMO_USERS: DemoUser[] = [
  {
    id: "usr_student",
    name: "Rafi Hasan",
    email: "student@aitutor.com.bd",
    phone: "+8801700000001",
    role: "STUDENT",
    plan: "FREE",
    avatarColor: "#0FA06E",
    meta: { track: "BOTH", grade: "Class 10", group: "SCIENCE", targetBand: "7.5" },
  },
  {
    id: "usr_parent",
    name: "Salma Hasan",
    email: "parent@aitutor.com.bd",
    phone: "+8801700000002",
    role: "PARENT",
    plan: "FREE",
    avatarColor: "#F5A524",
    meta: { child: "Rafi Hasan" },
  },
  {
    id: "usr_school",
    name: "Kamal Uddin",
    email: "school@aitutor.com.bd",
    phone: "+8801700000003",
    role: "SCHOOL_ADMIN",
    plan: "SCHOOL",
    avatarColor: "#2E90FA",
    meta: { school: "Dhaka Model School" },
  },
  {
    id: "usr_admin",
    name: "Admin",
    email: "admin@aitutor.com.bd",
    phone: "+8801700000004",
    role: "SUPER_ADMIN",
    plan: "BUNDLE",
    avatarColor: "#7D69EF",
  },
];

export function demoUserByRole(role: UserRole): DemoUser {
  return DEMO_USERS.find((u) => u.role === role) ?? DEMO_USERS[0];
}

export function demoUserById(id: string): DemoUser | undefined {
  return DEMO_USERS.find((u) => u.id === id);
}
