import { DashboardShell } from "@/components/layout/DashboardShell";
import { ADMIN_NAV } from "@/lib/constants/navigation";
import { demoUserByRole } from "@/lib/auth/users";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = demoUserByRole("SUPER_ADMIN");
  return (
    <DashboardShell navItems={ADMIN_NAV} user={user}>
      {children}
    </DashboardShell>
  );
}
