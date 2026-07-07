import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      {/* Clearance so the fixed mobile bottom nav doesn't cover footer content */}
      <div aria-hidden className="h-24 md:hidden" />
    </div>
  );
}
