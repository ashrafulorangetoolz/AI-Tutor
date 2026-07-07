import { DashboardShell } from "@/components/layout/DashboardShell";
import { PARENT_NAV } from "@/lib/constants/navigation";
import { demoUserByRole } from "@/lib/auth/users";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const user = demoUserByRole("PARENT");
  return (
    <DashboardShell navItems={PARENT_NAV} user={user}>
      {children}
    </DashboardShell>
  );
}
