import { NextResponse } from "next/server";
import { demoUserByRole } from "@/lib/auth/users";
import { ROLE_HOME } from "@/lib/constants/navigation";
import type { UserRole } from "@/types";

/**
 * Mock login: sets a role cookie and returns the destination.
 * Real implementation would verify email/password or phone OTP.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const role: UserRole = ["STUDENT", "PARENT", "SCHOOL_ADMIN", "SUPER_ADMIN"].includes(
    body.role,
  )
    ? body.role
    : "STUDENT";

  const user = demoUserByRole(role);
  const res = NextResponse.json({ ok: true, redirect: ROLE_HOME[role], user });
  res.cookies.set("ai_tutor_role", role, { httpOnly: false, path: "/", maxAge: 60 * 60 * 24 * 30 });
  res.cookies.set("ai_tutor_uid", user.id, { httpOnly: false, path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
