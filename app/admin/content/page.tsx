import type { Metadata } from "next";
import { PageHeader, StatCard } from "@/components/dashboard/cards";
import { ContentManagerTable } from "@/components/admin/tables";

export const metadata: Metadata = { title: "Content" };

const CONTENT_ROWS = [
  { id: "c1", title: "Newton's Laws of Motion", type: "Concept Card", subject: "Physics", status: "active" },
  { id: "c2", title: "Quadratic Equations", type: "Concept Card", subject: "Mathematics", status: "active" },
  { id: "c3", title: "IELTS Task 2 Structure", type: "Concept Card", subject: "English", status: "active" },
  { id: "c4", title: "Physics Board Model Test", type: "Mock Exam", subject: "Physics", status: "active" },
  { id: "c5", title: "Organic Chemistry Basics", type: "Concept Card", subject: "Chemistry", status: "draft" },
  { id: "c6", title: "IELTS Reading Full Mock", type: "Mock Exam", subject: "English", status: "active" },
  { id: "c7", title: "Balancing Redox Reactions", type: "Question", subject: "Chemistry", status: "draft" },
  { id: "c8", title: "Trigonometric Identities", type: "Question", subject: "Mathematics", status: "active" },
];

export default function AdminContentPage() {
  return (
    <>
      <PageHeader
        title="Content Management"
        action={<button className="btn-primary">＋ New concept card</button>}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Concept cards" value={(1240).toLocaleString()} icon={<span>📚</span>} tone="brand" />
        <StatCard label="Mock exams" value={(86).toLocaleString()} icon={<span>📝</span>} tone="blue" />
        <StatCard label="Questions" value={(5400).toLocaleString()} icon={<span>❓</span>} tone="amber" />
      </div>

      <ContentManagerTable rows={CONTENT_ROWS} />
    </>
  );
}
