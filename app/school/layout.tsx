import { DashboardShell } from "@/components/layout/DashboardShell";
import { SCHOOL_NAV } from "@/lib/constants/navigation";
import { demoUserByRole } from "@/lib/auth/users";

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  const user = demoUserByRole("SCHOOL_ADMIN");
  return (
    <DashboardShell navItems={SCHOOL_NAV} user={user}>
      {children}
    </DashboardShell>
  );
}
