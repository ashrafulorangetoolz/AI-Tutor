import { cookies } from "next/headers";
import type { UserRole } from "@/types";
import { DEMO_USERS, demoUserById, demoUserByRole, type DemoUser } from "./users";

const COOKIE = "ai_tutor_role";

/**
 * Mock session resolver. Reads a role cookie set at login and returns the
 * matching demo user. Defaults to the student demo account so every dashboard
 * is viewable without a real auth backend.
 *
 * Replace with NextAuth (email + phone OTP) — the return shape can stay the same.
 */
export async function getCurrentUser(): Promise<DemoUser> {
  // Next.js 15+ makes cookies() async.
  const store = await cookies();
  const roleCookie = store.get(COOKIE)?.value as UserRole | undefined;
  const idCookie = store.get("ai_tutor_uid")?.value;

  if (idCookie) {
    const byId = demoUserById(idCookie);
    if (byId) return byId;
  }
  if (roleCookie) return demoUserByRole(roleCookie);
  return demoUserByRole("STUDENT");
}

export async function requireRole(role: UserRole): Promise<DemoUser | null> {
  const user = await getCurrentUser();
  return user.role === role ? user : null;
}

export { DEMO_USERS };
