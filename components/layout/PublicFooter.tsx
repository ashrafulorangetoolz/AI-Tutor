import Link from "next/link";
import { Logo } from "./Logo";
import { SITE } from "@/lib/constants/site";

const COLUMNS = [
  {
    title: "Learn",
    links: [
      { label: "SSC Track", href: "/ssc" },
      { label: "IELTS Track", href: "/ielts" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "For Institutions",
    links: [
      { label: "Schools", href: "/schools" },
      { label: "Bulk Enrollment", href: "/schools" },
      { label: "Contact Sales", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/contact" },
      { label: "Log in", href: "/login" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="section grid gap-10 py-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm text-muted">{SITE.tagline}</p>
          <p className="mt-4 text-sm text-muted">{SITE.email}</p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-semibold text-ink">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted hover:text-brand-500">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="section flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p>© {2025} {SITE.name}. Built for students in Bangladesh 🇧🇩</p>
          <p>Made with AI · English + বাংলা</p>
        </div>
      </div>
    </footer>
  );
}
