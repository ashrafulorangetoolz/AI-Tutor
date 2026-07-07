import { DashboardShell } from "@/components/layout/DashboardShell";
import { STUDENT_NAV } from "@/lib/constants/navigation";
import { demoUserByRole } from "@/lib/auth/users";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Scaffold uses the student demo account. Swap for getCurrentUser() + RoleGuard
  // once real auth is wired (see components/layout/RoleGuard.tsx).
  const user = demoUserByRole("STUDENT");
  return (
    <DashboardShell navItems={STUDENT_NAV} user={user}>
      {children}
    </DashboardShell>
  );
}
