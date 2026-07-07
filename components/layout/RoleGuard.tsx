import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import type { UserRole } from "@/types";
import { getCurrentUser } from "@/lib/auth/session";
import { ROLE_HOME } from "@/lib/constants/navigation";

/**
 * Server-side role guard. Wrap a dashboard layout's children with this to
 * ensure only the intended role can view it. In this scaffold the session is
 * mocked (see lib/auth/session.ts); swap in real auth without changing callers.
 */
export async function RoleGuard({
  allow,
  children,
}: {
  allow: UserRole;
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  if (user.role !== allow) {
    // Send users to their own home instead of a hard error.
    redirect(ROLE_HOME[user.role]);
  }
  return <>{children}</>;
}
