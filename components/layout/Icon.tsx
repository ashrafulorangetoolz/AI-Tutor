import {
  LayoutDashboard,
  Sparkles,
  Camera,
  BookOpen,
  FileCheck2,
  CalendarCheck,
  TrendingUp,
  Settings,
  Users,
  BarChart3,
  CreditCard,
  Wallet,
  Bell,
  Languages,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Sparkles,
  Camera,
  BookOpen,
  FileCheck2,
  CalendarCheck,
  TrendingUp,
  Settings,
  Users,
  BarChart3,
  CreditCard,
  Wallet,
  Bell,
  Languages,
};

export function Icon({ name, className }: { name?: string; className?: string }) {
  const C = (name && MAP[name]) || LayoutDashboard;
  return <C className={className} />;
}
